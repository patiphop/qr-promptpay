# 🚀 QR PromptPay Generator

แอปพลิเคชันสร้าง QR Code สำหรับ PromptPay ที่ใช้งานง่าย สวยงาม และรองรับมาตรฐานของประเทศไทย

![QR PromptPay](https://img.shields.io/badge/QR-PromptPay-blue?style=for-the-badge&logo=qr-code)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ คุณสมบัติ

- 🎯 **สร้าง QR Code PromptPay** ตามมาตรฐานของประเทศไทย
- 📱 **รองรับเบอร์โทรศัพท์ไทย** (08x-xxx-xxxx, 09x-xxx-xxxx)
- 💰 **ระบุจำนวนเงิน** ได้ตั้งแต่ 0.01 บาท ถึง 1,000,000 บาท
- 🎨 **UI/UX ที่สวยงาม** ด้วย Tailwind CSS และ gradient design
- ⚡ **Real-time Generation** สร้าง QR Code ทันทีเมื่อกรอกข้อมูล
- 📥 **ดาวน์โหลด QR Code** เป็นไฟล์ PNG คุณภาพสูง
- 🔍 **Validation** ตรวจสอบความถูกต้องของข้อมูล
- 📱 **Responsive Design** รองรับทุกขนาดหน้าจอ

## 🚀 การติดตั้ง

### Prerequisites
- Node.js (เวอร์ชัน 18 หรือสูงกว่า)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone โปรเจ็ค**
```bash
git clone https://github.com/username/qr-promptpay-web.git
cd qr-promptpay-web
```

2. **ติดตั้ง Dependencies**
```bash
npm install
# หรือ
yarn install
```

3. **รัน Development Server**
```bash
npm run dev
# หรือ
yarn dev
```

4. **เปิดเบราว์เซอร์**
```
http://localhost:5173
```

## 🛠️ การใช้งาน

### การสร้าง QR Code PromptPay

1. **กรอกเบอร์โทรศัพท์** ในรูปแบบ 08x-xxx-xxxx หรือ 09x-xxx-xxxx
2. **ระบุจำนวนเงิน** ที่ต้องการรับ (ขั้นต่ำ 0.01 บาท)
3. **QR Code จะถูกสร้างอัตโนมัติ** เมื่อข้อมูลถูกต้อง
4. **คลิกปุ่มดาวน์โหลด** เพื่อบันทึก QR Code เป็นไฟล์ PNG

### ตัวอย่างการใช้งาน

```typescript
import { generatePromptPayQR } from './lib/promptpay';

// สร้าง QR Code สำหรับเบอร์ 0885942380 จำนวน 100 บาท
const qrCode = await generatePromptPayQR('0885942380', 100, {
    width: 300,
    quality: 0.92
});
```

## 🏗️ โครงสร้างโปรเจ็ค

```
qr-promptpay/
├── src/
│   ├── components/
│   │   └── SimpleQRGenerator.tsx    # Component หลักสำหรับสร้าง QR
│   ├── lib/
│   │   └── promptpay.ts             # ฟังก์ชันสร้าง PromptPay QR
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── App.tsx                      # App component หลัก
│   └── main.tsx                     # Entry point
├── public/                           # Static files
├── package.json                      # Dependencies และ scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.ts                   # Vite configuration
└── tsconfig.json                    # TypeScript configuration
```

## 📚 API Reference

### `generatePromptPayQR(mobileNumber, amount, options?)`

สร้าง QR Code สำหรับ PromptPay

**Parameters:**
- `mobileNumber` (string): เบอร์โทรศัพท์ไทย
- `amount` (number): จำนวนเงิน
- `options` (object, optional): ตัวเลือกเพิ่มเติม

**Returns:** Promise<string> - Base64 encoded QR Code image

### `validateThaiMobileNumber(mobileNumber)`

ตรวจสอบความถูกต้องของเบอร์โทรศัพท์ไทย

**Parameters:**
- `mobileNumber` (string): เบอร์โทรศัพท์

**Returns:** boolean - true ถ้าเบอร์ถูกต้อง

### `validateAmount(amount)`

ตรวจสอบความถูกต้องของจำนวนเงิน

**Parameters:**
- `amount` (number | string): จำนวนเงิน

**Returns:** boolean - true ถ้าจำนวนเงินถูกต้อง

## 🎨 Customization

### การปรับแต่ง QR Code

```typescript
const qrOptions = {
    width: 512,                    // ขนาด QR Code
    quality: 0.92,                 // คุณภาพภาพ
    margin: 2,                     // ขอบรอบ QR Code
    color: {
        dark: '#000000',           // สีของ QR Code
        light: '#FFFFFF'           // สีพื้นหลัง
    },
    errorCorrectionLevel: 'M'      // ระดับการแก้ไขข้อผิดพลาด
};
```

### การปรับแต่ง UI

แอปใช้ Tailwind CSS สามารถปรับแต่งได้ผ่าน:
- `tailwind.config.js` - การตั้งค่าหลัก
- CSS classes ใน components
- CSS variables สำหรับสีและขนาด

## 🧪 การทดสอบ

```bash
# รัน linter
npm run lint

# Build สำหรับ production
npm run build

# Preview build
npm run preview
```

## 📦 Dependencies

### Production Dependencies
- `react` ^19.1.1 - React framework
- `react-dom` ^19.1.1 - React DOM
- `promptpay-qr` ^0.5.0 - สร้าง PromptPay payload
- `qrcode` ^1.5.4 - สร้าง QR Code image

### Development Dependencies
- `typescript` ^5.6.3 - TypeScript compiler
- `vite` ^7.1.0 - Build tool
- `tailwindcss` ^4.1.11 - CSS framework
- `eslint` ^9.32.0 - Code linting

## 🌟 Features ที่จะเพิ่มในอนาคต

- [ ] **QR Code Scanner** - สแกน QR Code เพื่อดูข้อมูล
- [ ] **History** - บันทึกประวัติการสร้าง QR Code
- [ ] **Templates** - เทมเพลต QR Code สำหรับธุรกิจ
- [ ] **Bulk Generation** - สร้าง QR Code หลายรายการพร้อมกัน
- [ ] **Export Options** - รองรับไฟล์ SVG, PDF
- [ ] **Dark/Light Theme** - ธีมมืด/สว่าง
- [ ] **PWA Support** - ติดตั้งเป็นแอปได้

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วมจากทุกคน! กรุณา:

1. Fork โปรเจ็ค
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจ็คนี้อยู่ภายใต้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 🙏 ขอบคุณ

- [promptpay-qr](https://github.com/jojoee/promptpay-qr) - Library สำหรับสร้าง PromptPay payload
- [qrcode](https://github.com/soldair/node-qrcode) - Library สำหรับสร้าง QR Code
- [React](https://reactjs.org/) - JavaScript library สำหรับสร้าง UI
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Build tool ที่รวดเร็ว

## 📞 ติดต่อ

หากมีคำถามหรือข้อเสนอแนะ กรุณาติดต่อ:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/username/qr-promptpay-web/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/username/qr-promptpay-web/discussions)

---

⭐ **หากโปรเจ็คนี้มีประโยชน์ กรุณาให้ดาวน์โหลดและแชร์!** ⭐
