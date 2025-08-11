export interface FormData {
    mobileNumber: string;
    amount: string;
}

export interface FormErrors {
    mobileNumber?: string;
    amount?: string;
    general?: string;
}
