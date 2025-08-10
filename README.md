# 🏦 QR PromptPay Generator - React App

แอปพลิเคชันสร้าง QR Code PromptPay สำหรับประเทศไทย ที่ใช้งานได้เลยโดยไม่ต้องมี backend server

## ✨ คุณสมบัติ

- 🎯 **สร้าง QR Code PromptPay ที่ถูกต้อง** - ตามมาตรฐานของธนาคารแห่งประเทศไทย
- 💰 **รองรับจำนวนเงิน** - QR Code มีจำนวนเงินตามที่ระบุจริงๆ
- 📱 **ใช้งานได้ทันที** - ไม่ต้องมี backend server
- 🎨 **UI/UX ที่สวยงาม** - ใช้งานง่าย สวยงาม
- 📥 **ดาวน์โหลด QR Code** - บันทึกเป็นไฟล์ PNG
- 🔍 **ตรวจสอบความถูกต้อง** - ตรวจสอบเบอร์โทรและจำนวนเงินแบบ real-time
- 📱 **Responsive Design** - ใช้งานได้ทั้งมือถือและคอมพิวเตอร์

## 🚀 การใช้งาน

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รันในโหมด Development

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

### 3. Build สำหรับ Production

```bash
npm run build
```

ไฟล์จะถูกสร้างในโฟลเดอร์ `dist/` ที่สามารถ deploy ได้เลย

### 4. Preview Production Build

```bash
npm run preview
```

## 📱 วิธีการใช้งาน

1. **กรอกเบอร์โทรศัพท์** - รูปแบบ 08x-xxx-xxxx หรือ 09x-xxx-xxxx
2. **กรอกจำนวนเงิน** - ระหว่าง 0.01 - 1,000,000 บาท
3. **คลิก "สร้าง QR Code"** - ระบบจะสร้าง QR Code ที่ถูกต้อง
4. **สแกนด้วยแอป PromptPay** - หรือดาวน์โหลดเก็บไว้

## 🛠️ เทคโนโลยีที่ใช้

- **React 19** - Frontend Framework
- **Vite** - Build Tool
- **promptpay-qr** - Library สำหรับสร้าง PromptPay payload
- **qrcode** - Library สำหรับสร้าง QR Code image
- **CSS3** - Styling และ Responsive Design

## 📋 การตรวจสอบความถูกต้อง

### เบอร์โทรศัพท์
- ต้องขึ้นต้นด้วย 08 หรือ 09
- ต้องมี 10 หลัก
- รูปแบบ: 08x-xxx-xxxx หรือ 09x-xxx-xxxx

### จำนวนเงิน
- ต้องมากกว่า 0
- ไม่เกิน 1,000,000 บาท
- รองรับทศนิยม 2 ตำแหน่ง

## 🔧 การปรับแต่ง

### เปลี่ยนขนาด QR Code

```javascript
const qrCodeDataURL = await generatePromptPayQR(
    mobileNumber, 
    amount,
    { width: 400 } // ปรับขนาดตามต้องการ
);
```

### เปลี่ยนสี QR Code

```javascript
const qrCodeDataURL = await generatePromptPayQR(
    mobileNumber, 
    amount,
    { 
        color: {
            dark: '#000000',  // สีดำ
            light: '#FFFFFF'  // สีขาว
        }
    }
);
```

## 📚 Library ที่ใช้

### promptpay-qr
- สร้าง PromptPay payload ตามมาตรฐาน EMV QR Code
- รองรับจำนวนเงินใน payload
- ผ่านการทดสอบและใช้งานจริง

### qrcode
- สร้าง QR Code image จาก payload
- รองรับหลายรูปแบบไฟล์ (PNG, SVG, etc.)
- ปรับแต่งคุณภาพและขนาดได้

## 🌐 การ Deploy

### GitHub Pages
```bash
npm run build
# อัปโหลดไฟล์ในโฟลเดอร์ dist/ ไปยัง GitHub Pages
```

### Netlify
```bash
npm run build
# อัปโหลดไฟล์ในโฟลเดอร์ dist/ ไปยัง Netlify
```

### Vercel
```bash
npm run build
# อัปโหลดไฟล์ในโฟลเดอร์ dist/ ไปยัง Vercel
```

## 🧪 การทดสอบ

```bash
# ทดสอบการ build
npm run build

# ทดสอบการ preview
npm run preview

# ทดสอบการ lint
npm run lint
```

## 📱 การใช้งานจริง

QR Code ที่สร้างจากแอปนี้:
- ✅ **สามารถสแกนได้จริง** ด้วยแอป PromptPay
- ✅ **มีจำนวนเงินตามที่ระบุ** ใน payload
- ✅ **ตามมาตรฐาน PromptPay** ของประเทศไทย
- ✅ **ผ่านการทดสอบ** การใช้งานจริง

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ MIT License - ดูรายละเอียดในไฟล์ [LICENSE](../LICENSE)

## 🙏 ขอบคุณ

- ธนาคารแห่งประเทศไทย สำหรับมาตรฐาน PromptPay
- [dtinth/promptpay-qr](https://github.com/dtinth/promptpay-qr) สำหรับ library ที่ยอดเยี่ยม
- [qrcode](https://github.com/soldair/node-qrcode) สำหรับการสร้าง QR Code

---

**หมายเหตุ**: QR Code ที่สร้างจากแอปนี้ผ่านการทดสอบและสามารถสแกนได้จริงด้วยแอป PromptPay ตามมาตรฐานของประเทศไทย 🇹🇭