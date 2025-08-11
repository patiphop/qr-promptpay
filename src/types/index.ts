export interface FormData {
    mobileNumber: string;
    amount: string;
}

export interface URLParams {
    phone?: string;
    amount?: string;
    lang?: string;
    theme?: string;
}

export type Language = 'th' | 'en';

export interface Translations {
    th: {
        title: string;
        subtitle: string;
        phoneNumber: string;
        amount: string;
        amountPlaceholder: string;
        phonePlaceholder: string;
        generateQR: string;
        downloadQR: string;
        shareLink: string;
        linkCopied: string;
        currentLink: string;
        loading: string;
        pleaseWait: string;
        enterData: string;
        invalidData: string;
        language: string;
        theme: string;
    };
    en: {
        title: string;
        subtitle: string;
        phoneNumber: string;
        amount: string;
        amountPlaceholder: string;
        phonePlaceholder: string;
        generateQR: string;
        downloadQR: string;
        shareLink: string;
        linkCopied: string;
        currentLink: string;
        loading: string;
        pleaseWait: string;
        enterData: string;
        invalidData: string;
        language: string;
        theme: string;
    };
}
