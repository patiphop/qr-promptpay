/// <reference types="vite/client" />

declare module 'promptpay-qr' {
  const generatePayload: (idOrPhoneNo: string, options?: { amount?: number }) => string;
  export default generatePayload;
}
