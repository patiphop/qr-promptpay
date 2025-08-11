# 🏦 QR PromptPay Generator

แอปพลิเคชันสร้าง QR Code สำหรับ PromptPay ตามมาตรฐานของธนาคารแห่งประเทศไทย

## ✨ คุณสมบัติ

- 🎯 สร้าง QR Code สำหรับ PromptPay ตามมาตรฐาน EMV QR Code
- 📱 รองรับเบอร์โทรศัพท์มือถือไทย (08x-xxx-xxxx, 09x-xxx-xxxx)
- 💰 กำหนดจำนวนเงินได้ (0.01 - 1,000,000 บาท)
- 🔍 การตรวจสอบข้อมูลแบบ Real-time
- 📥 ดาวน์โหลด QR Code เป็นไฟล์ PNG
- 📱 Responsive Design รองรับทุกอุปกรณ์
- 🎨 UI/UX ที่สวยงามและทันสมัย

## 🚀 การติดตั้ง

1. Clone โปรเจค
```bash
git clone <repository-url>
cd qr-promptpay
```

2. ติดตั้ง Dependencies
```bash
npm install
```

3. รันโปรเจคในโหมด Development
```bash
npm run dev
```

4. เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **QR Code**: qrcode library
- **PromptPay**: promptpay-qr library

## 📱 การใช้งาน

1. **กรอกเบอร์โทรศัพท์**: ใส่เบอร์โทรศัพท์มือถือที่ต้องการรับเงิน
2. **กำหนดจำนวนเงิน**: ใส่จำนวนเงินที่ต้องการรับ (บาท)
3. **สร้าง QR Code**: กดปุ่ม "สร้าง QR Code"
4. **ดาวน์โหลด**: ดาวน์โหลด QR Code เป็นไฟล์ PNG
5. **ใช้งาน**: แสดง QR Code ให้ผู้ชำระเงินสแกนผ่านแอป PromptPay

## 🎨 การออกแบบ

- **สีหลัก**: Blue-Purple Gradient
- **Font**: Inter + Noto Sans Thai
- **Layout**: Grid-based responsive design
- **Animation**: Smooth transitions และ hover effects
- **Theme**: Modern, clean และ professional

## 📱 Responsive Design

- **Desktop**: 2-column layout
- **Tablet**: Adaptive grid
- **Mobile**: Single column layout
- **Touch-friendly**: Optimized สำหรับการใช้งานบนมือถือ

## 🔧 การพัฒนา

### Scripts

```bash
npm run dev          # รันในโหมด Development
npm run build        # Build สำหรับ Production
npm run preview      # Preview build
npm run lint         # ตรวจสอบ Code quality
```

### โครงสร้างไฟล์

```
src/
├── components/          # React Components
│   └── QRGenerator.tsx # หน้าหลักของแอป
├── lib/                # Utility functions
│   └── promptpay.ts    # PromptPay logic
├── App.tsx             # App component
├── index.css           # Global styles + Tailwind
└── main.tsx            # Entry point
```

## 📋 ข้อกำหนด

- Node.js 18+
- npm หรือ yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

## 🚀 การ Deploy

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder ไปยัง GitHub Pages
```

### Vercel

```bash
npm run build
# Deploy ผ่าน Vercel CLI หรือ GitHub integration
```

### Netlify

```bash
npm run build
# Deploy dist/ folder ไปยัง Netlify
```

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 🙏 ขอบคุณ

- ธนาคารแห่งประเทศไทย สำหรับมาตรฐาน PromptPay
- React และ Tailwind CSS communities
- ผู้ใช้งานทุกท่านที่ให้คำแนะนำและ feedback

---

**Made with ❤️ for Thailand 🇹🇭**