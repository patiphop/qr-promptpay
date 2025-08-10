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
 * สร้าง PromptPay QR Code ตามมาตรฐานของประเทศไทย
 * @param mobileNumber - เบอร์โทรศัพท์ (เช่น 0885942380)
 * @param amount - จำนวนเงิน (เช่น 0.01)
 * @returns QR Code payload string
 */
export const generatePromptPayPayload = (mobileNumber: string, amount: number): string => {
    try {
        // ใช้ library promptpay-qr ที่ถูกต้อง
        // API ที่ถูกต้อง: generatePayload(idOrPhoneNo, { amount })
        const payload = generatePayload(mobileNumber, { amount: parseFloat(amount.toString()) });
        
        return payload;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to generate PromptPay payload: ${errorMessage}`);
    }
};

/**
 * สร้าง QR Code image จาก PromptPay payload
 * @param mobileNumber - เบอร์โทรศัพท์
 * @param amount - จำนวนเงิน
 * @param options - ตัวเลือกสำหรับ QR Code
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
            margin: 2, // เพิ่ม margin ให้สแกนง่ายขึ้น
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            width: options.width || 512, // เพิ่มขนาดให้ชัดเจนขึ้น
            errorCorrectionLevel: 'M' as const, // เพิ่ม error correction level
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
 * ตรวจสอบความถูกต้องของเบอร์โทรศัพท์ไทย
 * @param mobileNumber - เบอร์โทรศัพท์
 * @returns true ถ้าเบอร์ถูกต้อง
 */
export const validateThaiMobileNumber = (mobileNumber: string): boolean => {
    // ลบช่องว่างและขีด
    const cleaned = mobileNumber.replace(/[\s-]/g, '');
    
    // ตรวจสอบรูปแบบเบอร์โทรไทย (08x-xxx-xxxx หรือ 09x-xxx-xxxx)
    const thaiMobilePattern = /^(08|09)\d{8}$/;
    
    return thaiMobilePattern.test(cleaned);
};

/**
 * ตรวจสอบความถูกต้องของจำนวนเงิน
 * @param amount - จำนวนเงิน
 * @returns true ถ้าจำนวนเงินถูกต้อง
 */
export const validateAmount = (amount: number | string): boolean => {
    const numAmount = parseFloat(amount.toString());
    return !isNaN(numAmount) && numAmount > 0 && numAmount <= 1000000;
};

/**
 * ตรวจสอบความถูกต้องของ PromptPay payload
 * @param payload - PromptPay payload
 * @returns true ถ้า payload ถูกต้อง
 */
export const validatePromptPayPayload = (payload: string): boolean => {
    if (!payload || typeof payload !== 'string') {
        return false;
    }
    
    // ตรวจสอบว่า payload เริ่มต้นด้วย EMV QR Code format
    if (!payload.startsWith('000201')) {
        return false;
    }
    
    // ตรวจสอบความยาวขั้นต่ำ
    if (payload.length < 50) {
        return false;
    }
    
    return true;
};
