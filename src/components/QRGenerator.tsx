import React, { useState, ChangeEvent, FormEvent } from 'react';
import { generatePromptPayQR, validateThaiMobileNumber, validateAmount } from '../lib/promptpay';
import './QRGenerator.css';

interface FormData {
    mobileNumber: string;
    amount: string;
}

interface FormErrors {
    mobileNumber?: string;
    amount?: string;
    general?: string;
}

const QRGenerator = (): React.JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        mobileNumber: '0885942380',
        amount: '0.01'
    });
    const [qrCode, setQrCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation
        const newErrors = { ...errors };
        
        if (name === 'mobileNumber') {
            if (value && !validateThaiMobileNumber(value)) {
                newErrors.mobileNumber = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (08x-xxx-xxxx หรือ 09x-xxx-xxxx)';
            } else {
                delete newErrors.mobileNumber;
            }
        }
        
        if (name === 'amount') {
            if (value && !validateAmount(value)) {
                newErrors.amount = 'จำนวนเงินต้องอยู่ระหว่าง 0.01 - 1,000,000 บาท';
            } else {
                delete newErrors.amount;
            }
        }
        
        setErrors(newErrors);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        
        // Validate form
        const newErrors: FormErrors = {};
        
        if (!validateThaiMobileNumber(formData.mobileNumber)) {
            newErrors.mobileNumber = 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง';
        }
        
        if (!validateAmount(formData.amount)) {
            newErrors.amount = 'กรุณากรอกจำนวนเงินที่ถูกต้อง';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setLoading(true);
        setErrors({});
        
        try {
            const qrCodeDataURL = await generatePromptPayQR(
                formData.mobileNumber, 
                parseFloat(formData.amount),
                { width: 300 }
            );
            setQrCode(qrCodeDataURL);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setErrors({ general: 'เกิดข้อผิดพลาดในการสร้าง QR Code: ' + errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const downloadQR = (): void => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.download = `promptpay-${formData.mobileNumber}-${formData.amount}.png`;
        link.href = qrCode;
        link.click();
    };

    return (
        <div className="qr-generator">
            <div className="container">
                <header className="header">
                    <h1>🏦 QR PromptPay Generator</h1>
                    <p>สร้าง QR Code สำหรับรับเงินผ่าน PromptPay</p>
                </header>

                <div className="content">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="mobileNumber">เบอร์โทรศัพท์</label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="08x-xxx-xxxx"
                                className={errors.mobileNumber ? 'error' : ''}
                                required
                            />
                            {errors.mobileNumber && (
                                <span className="error-message">{errors.mobileNumber}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">จำนวนเงิน (บาท)</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="0.01"
                                step="0.01"
                                min="0.01"
                                max="1000000"
                                className={errors.amount ? 'error' : ''}
                                required
                            />
                            {errors.amount && (
                                <span className="error-message">{errors.amount}</span>
                            )}
                        </div>

                        {errors.general && (
                            <div className="error-message general-error">{errors.general}</div>
                        )}

                        <button 
                            type="submit" 
                            className="generate-btn"
                            disabled={loading || Object.keys(errors).length > 0}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    กำลังสร้าง QR Code...
                                </>
                            ) : (
                                'สร้าง QR Code'
                            )}
                        </button>
                    </form>

                    {qrCode && (
                        <div className="qr-result">
                            <div className="qr-image-container">
                                <img src={qrCode} alt="PromptPay QR Code" className="qr-image" />
                            </div>
                            
                            <div className="qr-info">
                                <h3>✅ QR Code สำเร็จ!</h3>
                                <p><strong>เบอร์โทรศัพท์:</strong> {formData.mobileNumber}</p>
                                <p><strong>จำนวนเงิน:</strong> {parseFloat(formData.amount).toFixed(2)} บาท</p>
                                <p className="instruction">✅ QR Code ถูกสร้างเรียบร้อยแล้ว สามารถสแกนได้ด้วยแอป PromptPay</p>
                                <p className="success-note">🎯 QR Code นี้มีจำนวนเงินตามที่ระบุ ตามมาตรฐาน PromptPay ของประเทศไทย</p>
                                
                                <button onClick={downloadQR} className="download-btn">
                                    📥 ดาวน์โหลด QR Code
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="footer">
                    <p>Made with ❤️ for Thailand 🇹🇭</p>
                    <p>ตามมาตรฐาน EMV QR Code และ PromptPay ของธนาคารแห่งประเทศไทย</p>
                </footer>
            </div>
        </div>
    );
};

export default QRGenerator;
