import React, { useState, ChangeEvent, useEffect } from 'react';
import { generatePromptPayQR, validateThaiMobileNumber, validateAmount } from '../lib/promptpay';
import { FormData, Language, Translations, URLParams } from '../types';
import { getTranslation, getURLParams, updateURLParams, createShareableLink } from '../lib/translations';
import LanguageThemeToggle from './LanguageThemeToggle';

const SimpleQRGenerator: React.FC = () => {
    // Initialize form data from URL parameters or defaults
    const getInitialFormData = (): FormData => {
        const urlParams = getURLParams();
        return {
            mobileNumber: urlParams.phone || '0885942380',
            amount: urlParams.amount || '0.01'
        };
    };

    const getInitialLanguage = (): Language => {
        const urlParams = getURLParams();
        return (urlParams.lang as Language) || 'th';
    };

    const getInitialTheme = (): 'dark' | 'light' => {
        const urlParams = getURLParams();
        return (urlParams.theme as 'dark' | 'light') || 'dark';
    };

    const [formData, setFormData] = useState<FormData>(getInitialFormData);
    const [qrCode, setQrCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [language, setLanguage] = useState<Language>(getInitialLanguage);
    const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

    // Apply theme to body
    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-theme' : '';
        // Update URL with theme
        updateURLParams({ theme });
    }, [theme]);

    // Update URL when language changes
    useEffect(() => {
        updateURLParams({ lang: language });
    }, [language]);

    // Update URL when form data changes
    useEffect(() => {
        updateURLParams({ 
            phone: formData.mobileNumber, 
            amount: formData.amount 
        });
    }, [formData.mobileNumber, formData.amount]);

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

    const copyShareableLink = async (): Promise<void> => {
        const shareableLink = createShareableLink({
            phone: formData.mobileNumber,
            amount: formData.amount,
            lang: language,
            theme
        });
        
        try {
            await navigator.clipboard.writeText(shareableLink);
            // You could add a toast notification here
            alert(t('linkCopied'));
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareableLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert(t('linkCopied'));
        }
    };

    const shareViaWebAPI = async (): Promise<void> => {
        if (navigator.share) {
            try {
                const shareableLink = createShareableLink({
                    phone: formData.mobileNumber,
                    amount: formData.amount,
                    lang: language,
                    theme
                });
                
                await navigator.share({
                    title: t('title'),
                    text: `${t('subtitle')} - ${t('phoneNumber')}: ${formData.mobileNumber}, ${t('amount')}: ${formData.amount}`,
                    url: shareableLink
                });
            } catch (err) {
                console.error('Error sharing:', err);
                // Fallback to copy link
                copyShareableLink();
            }
        } else {
            // Fallback to copy link for browsers that don't support Web Share API
            copyShareableLink();
        }
    };

    const t = (key: keyof Translations['th']) => getTranslation(language, key);

    return (
        <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} flex items-center justify-center p-2 sm:p-4 overflow-auto relative`}>
            {/* Language and Theme Toggle */}
            <LanguageThemeToggle
                currentLanguage={language}
                onLanguageChange={setLanguage}
                currentTheme={theme}
                onThemeChange={setTheme}
            />

            <div className="w-full max-w-4xl min-h-screen flex flex-col py-6 sm:py-4">
                <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-xl rounded-2xl sm:rounded-3xl border ${theme === 'dark' ? 'border-white/20' : 'border-gray-200'} p-6 sm:p-6 lg:p-8 shadow-2xl flex-1 flex flex-col`}>
                    <div className="text-center mb-6 sm:mb-6 lg:mb-8 flex-shrink-0">
                        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                            {t('title')}
                        </h1>
                        <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {t('subtitle')}
                        </p>
                        {/* Current URL display - hidden on mobile */}
                        <div className="mt-4 p-2 sm:p-3 bg-black/20 rounded-lg backdrop-blur-sm hidden sm:block">
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                                {t('currentLink')}
                            </p>
                            <p className={`text-xs font-mono break-all ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                {createShareableLink({
                                    phone: formData.mobileNumber,
                                    amount: formData.amount,
                                    lang: language,
                                    theme
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 sm:space-y-10 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 items-center flex-1">
                        <div className="space-y-6 sm:space-y-8 flex-shrink-0 w-full order-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-700'} font-semibold mb-2 sm:mb-3 text-base sm:text-lg`}>
                                        {t('phoneNumber')}
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        placeholder={t('phonePlaceholder')}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={`block ${theme === 'dark' ? 'text-white' : 'text-gray-700'} font-semibold mb-2 sm:mb-3 text-base sm:text-lg`}>
                                        {t('amount')}
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder={t('amountPlaceholder')}
                                        step="0.01"
                                        min="0.01"
                                        max="1000000"
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full order-2 lg:order-2">
                            <div className="w-40 h-80 sm:w-48 sm:h-48 lg:w-80 lg:h-80 flex items-center justify-center">
                                {loading ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent rounded-2xl">
                                        <div className="relative mb-2 sm:mb-3">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-20 lg:h-20 border-4 ${theme === 'dark' ? 'border-white/20 border-t-white' : 'border-gray-300 border-t-purple-500'} rounded-full animate-spin`}></div>
                                            <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-20 lg:h-20 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
                                            <div className="absolute inset-2 w-4 h-4 sm:w-6 sm:h-6 lg:w-16 lg:h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDelay: '-1s' }}></div>
                                        </div>
                                        
                                        <div className="text-center">
                                            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold text-xs sm:text-sm lg:text-lg mb-1 sm:mb-2`}>
                                                {t('loading')}
                                            </p>
                                            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-xs`}>
                                                {t('pleaseWait')}
                                            </p>
                                        </div>
                                        
                                        <div className="flex space-x-1 sm:space-x-2 mt-2 sm:mt-3">
                                            <div className={`w-1 h-1 sm:w-2 sm:h-2 ${theme === 'dark' ? 'bg-white' : 'bg-purple-500'} rounded-full animate-bounce`}></div>
                                            <div className={`w-1 h-1 sm:w-2 sm:h-2 ${theme === 'dark' ? 'bg-white' : 'bg-purple-500'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                                            <div className={`w-1 h-1 sm:w-2 sm:h-2 ${theme === 'dark' ? 'bg-white' : 'bg-purple-500'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                ) : qrCode ? (
                                    <div className="text-center w-full h-full flex flex-col items-center justify-center">
                                        <img 
                                            src={qrCode} 
                                            alt="PromptPay QR Code" 
                                            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-80 lg:h-80 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl bg-white p-1 sm:p-2 lg:p-4 transition-all duration-300 hover:scale-105"
                                        />
                                        <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4 lg:mt-6 w-full max-w-xs">
                                            <button
                                                onClick={downloadQR}
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-2 lg:py-3 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-base"
                                            >
                                                {t('downloadQR')}
                                            </button>
                                            <button
                                                onClick={shareViaWebAPI}
                                                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-2 sm:py-2 lg:py-3 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-base"
                                            >
                                                {t('shareLink')}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center border-2 border-dashed ${theme === 'dark' ? 'border-white/20' : 'border-gray-300'} rounded-xl sm:rounded-2xl bg-transparent`}>
                                        <div className={`text-center ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
                                            <div className="text-xl sm:text-2xl lg:text-6xl mb-2 sm:mb-3 lg:mb-4 animate-pulse">📱</div>
                                            <p className="text-xs sm:text-sm lg:text-lg">{t('enterData')}</p>
                                            {!isValid && (
                                                <p className={`text-xs mt-1 sm:mt-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-500'}`}>
                                                    {t('invalidData')}
                                                </p>
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
