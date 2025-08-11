import QRCode from 'qrcode';
import generatePayload from 'promptpay-qr';

interface QROptions {
    type?: 'image/png';
    quality?: number;
    margin?: number;
    color?: {
        dark: string;
        light: string;
    };
    width?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * Generate PromptPay QR Code according to Thailand standards
 * @param mobileNumber - Mobile number (e.g., 0885942380)
 * @param amount - Amount (e.g., 0.01)
 * @returns QR Code payload string
 */
export const generatePromptPayPayload = (mobileNumber: string, amount: number): string => {
    try {
        const payload = generatePayload(mobileNumber, { amount: parseFloat(amount.toString()) });
        
        return payload;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to generate PromptPay payload: ${errorMessage}`);
    }
};

/**
 * Generate QR Code image from PromptPay payload
 * @param mobileNumber - Mobile number
 * @param amount - Amount
 * @param options - QR Code options
 * @returns Base64 encoded QR Code image
 */
export const generatePromptPayQR = async (
    mobileNumber: string, 
    amount: number, 
    options: QROptions = {}
): Promise<string> => {
    try {
        const payload = generatePromptPayPayload(mobileNumber, amount);
        
        const qrOptions = {
            type: 'image/png' as const,
            quality: 0.92,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            width: options.width || 512,
            errorCorrectionLevel: 'M' as const,
            ...options
        };
        
        const qrCodeDataURL = await QRCode.toDataURL(payload, qrOptions);
        return qrCodeDataURL;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to generate PromptPay QR Code: ${errorMessage}`);
    }
};

/**
 * Validate Thai mobile number format
 * @param mobileNumber - Mobile number
 * @returns true if number is valid
 */
export const validateThaiMobileNumber = (mobileNumber: string): boolean => {
    const cleaned = mobileNumber.replace(/[\s-]/g, '');
    
    const thaiMobilePattern = /^(08|09)\d{8}$/;
    
    return thaiMobilePattern.test(cleaned);
};

/**
 * Validate amount format
 * @param amount - Amount
 * @returns true if amount is valid
 */
export const validateAmount = (amount: number | string): boolean => {
    const numAmount = parseFloat(amount.toString());
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= 1000000;
};

/**
 * Validate PromptPay payload format
 * @param payload - PromptPay payload
 * @returns true if payload is valid
 */
export const validatePromptPayPayload = (payload: string): boolean => {
    if (!payload || typeof payload !== 'string') {
        return false;
    }
    
    if (!payload.startsWith('000201')) {
        return false;
    }
    
    if (payload.length < 50) {
        return false;
    }
    
    return true;
};
