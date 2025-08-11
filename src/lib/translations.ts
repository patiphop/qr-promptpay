import { Translations, URLParams } from '../types';

export const translations: Translations = {
    th: {
        title: 'PromptPay QR',
        subtitle: 'สร้าง QR Code สำหรับรับเงิน',
        phoneNumber: 'เบอร์โทรศัพท์',
        amount: 'จำนวนเงิน (บาท)',
        amountPlaceholder: '0.01',
        phonePlaceholder: '08x-xxx-xxxx',
        generateQR: 'สร้าง QR Code',
        downloadQR: '📥 ดาวน์โหลด QR Code',
        shareLink: '📤 แชร์ลิงก์',
        linkCopied: 'ลิงก์ถูกคัดลอกแล้ว!',
        currentLink: 'ลิงก์ปัจจุบัน:',
        loading: 'กำลังสร้าง QR Code...',
        pleaseWait: 'กรุณารอสักครู่',
        enterData: 'กรอกข้อมูลเพื่อสร้าง QR Code',
        invalidData: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        language: 'ภาษา',
        theme: 'ธีม'
    },
    en: {
        title: 'PromptPay QR',
        subtitle: 'Generate QR Code for receiving payments',
        phoneNumber: 'Phone Number',
        amount: 'Amount (THB)',
        amountPlaceholder: '0.01',
        phonePlaceholder: '08x-xxx-xxxx',
        generateQR: 'Generate QR Code',
        downloadQR: '📥 Download QR Code',
        shareLink: '📤 Share Link',
        linkCopied: 'Link copied to clipboard!',
        currentLink: 'Current Link:',
        loading: 'Generating QR Code...',
        pleaseWait: 'Please wait a moment',
        enterData: 'Enter data to generate QR Code',
        invalidData: 'Please enter valid data',
        language: 'Language',
        theme: 'Theme'
    }
};

export const getTranslation = (lang: 'th' | 'en', key: keyof Translations['th']) => {
    return translations[lang][key];
};

// URL parameter utilities
export const getURLParams = (): URLParams => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        phone: urlParams.get('phone') || undefined,
        amount: urlParams.get('amount') || undefined,
        lang: urlParams.get('lang') || undefined,
        theme: urlParams.get('theme') || undefined
    };
};

export const updateURLParams = (params: Partial<URLParams>): void => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
    });
    
    // Update URL without reloading the page
    window.history.replaceState({}, '', url.toString());
};

export const createShareableLink = (params: URLParams): string => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, value);
        }
    });
    
    return url.toString();
};
