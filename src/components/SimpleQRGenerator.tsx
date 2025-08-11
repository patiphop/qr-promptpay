import React, { useState, ChangeEvent, useEffect } from 'react';
import { generatePromptPayQR, validateThaiMobileNumber, validateAmount } from '../lib/promptpay';
import { FormData } from '../types/index';

const SimpleQRGenerator: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        mobileNumber: '0885942380',
        amount: '0.01'
    });
    const [qrCode, setQrCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        const isValidData = validateThaiMobileNumber(formData.mobileNumber) && validateAmount(formData.amount);
        setIsValid(isValidData);

        if (!isValidData) {
            setQrCode('');
            setLoading(false);
            return;
        }

        setLoading(true);

        const generateQR = async () => {
            try {
                const qrCodeDataURL = await generatePromptPayQR(
                    formData.mobileNumber, 
                    parseFloat(formData.amount),
                    { width: 300 }
                );
                setQrCode(qrCodeDataURL);
            } catch (error) {
                console.error('Error generating QR code:', error);
                setQrCode('');
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(generateQR, 300);
        return () => clearTimeout(timeoutId);
    }, [formData.mobileNumber, formData.amount]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const downloadQR = (): void => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.download = `promptpay-${formData.mobileNumber}-${formData.amount}.png`;
        link.href = qrCode;
        link.click();
    };

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl flex-1 flex flex-col">
                    <div className="text-center mb-8 flex-shrink-0">
                        <h1 className="text-4xl font-bold text-white mb-2">PromptPay QR</h1>
                        <p className="text-gray-300">สร้าง QR Code สำหรับรับเงิน</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center flex-1">
                        <div className="space-y-6 flex-shrink-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white font-semibold mb-3 text-lg">
                                        เบอร์โทรศัพท์
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        placeholder="08x-xxx-xxxx"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-3 text-lg">
                                        จำนวนเงิน (บาท)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="0.01"
                                        step="0.01"
                                        min="0.01"
                                        max="1000000"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-80 h-80 flex items-center justify-center">
                                {loading ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent rounded-2xl">
                                        <div className="relative mb-6">
                                            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                                            <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDelay: '-1s' }}></div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <p className="text-white font-semibold text-lg mb-2">กำลังสร้าง QR Code...</p>
                                            <p className="text-gray-300 text-sm">กรุณารอสักครู่</p>
                                        </div>
                                        
                                        <div className="flex space-x-2 mt-4">
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                ) : qrCode ? (
                                    <div className="text-center w-full h-full flex flex-col items-center justify-center">
                                        <img 
                                            src={qrCode} 
                                            alt="PromptPay QR Code" 
                                            className="w-80 h-80 rounded-2xl shadow-2xl bg-white p-4 transition-all duration-300 hover:scale-105"
                                        />
                                        <button
                                            onClick={downloadQR}
                                            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            📥 ดาวน์โหลด QR Code
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/20 rounded-2xl bg-transparent">
                                        <div className="text-center text-white/50">
                                            <div className="text-6xl mb-4 animate-pulse">📱</div>
                                            <p className="text-lg">กรอกข้อมูลเพื่อสร้าง QR Code</p>
                                            {!isValid && (
                                                <p className="text-sm mt-2 text-red-300">กรุณากรอกข้อมูลให้ถูกต้อง</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleQRGenerator;
