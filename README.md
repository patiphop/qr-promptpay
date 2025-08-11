# 🚀 QR PromptPay Generator

A modern, beautiful, and easy-to-use application for generating PromptPay QR codes that follows Thailand's payment standards.

![QR PromptPay](https://img.shields.io/badge/QR-PromptPay-blue?style=for-the-badge&logo=qr-code)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎯 **Generate PromptPay QR Codes** following Thailand's payment standards
- 📱 **Thai Mobile Number Support** (08x-xxx-xxxx, 09x-xxx-xxxx)
- 💰 **Amount Specification** from 0.01 THB to 1,000,000 THB
- 🎨 **Beautiful UI/UX** with Tailwind CSS and gradient design
- ⚡ **Real-time Generation** creates QR codes instantly when data is entered
- 📥 **Download QR Code** as high-quality PNG files
- 🔍 **Input Validation** ensures data accuracy
- 📱 **Responsive Design** works on all screen sizes
- 🌙 **Dark/Light Theme** toggle for better user experience
- 🌍 **Multi-language Support** (Thai/English)
- 🔗 **Shareable Links** with URL parameters
- 📱 **Mobile-First Design** optimized for mobile devices

## 🚀 Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the project**
```bash
git clone https://github.com/patiphop/qr-promptpay.git
cd qr-promptpay
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open browser**
```
http://localhost:5173
```

## 🛠️ Usage

### Generating PromptPay QR Codes

1. **Enter mobile number** in format 08x-xxx-xxxx or 09x-xxx-xxxx
2. **Specify amount** you want to receive (minimum 0.01 THB)
3. **QR Code is generated automatically** when data is valid
4. **Click download button** to save QR Code as PNG file

### Usage Example

```typescript
import { generatePromptPayQR } from './lib/promptpay';

// Generate QR Code for mobile 0885942380 with amount 100 THB
const qrCode = await generatePromptPayQR('0885942380', 100, {
    width: 300,
    quality: 0.92
});
```

## 🏗️ Project Structure

```
qr-promptpay/
├── src/
│   ├── components/
│   │   ├── SimpleQRGenerator.tsx    # Main QR generation component
│   │   └── LanguageThemeToggle.tsx  # Language and theme toggle
│   ├── lib/
│   │   ├── promptpay.ts             # PromptPay QR generation functions
│   │   └── translations.ts          # Multi-language support
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── App.tsx                      # Main App component
│   └── main.tsx                     # Entry point
├── public/                           # Static files
├── package.json                      # Dependencies and scripts
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.ts                   # Vite configuration
└── tsconfig.json                    # TypeScript configuration
```

## 📚 API Reference

### `generatePromptPayQR(mobileNumber, amount, options?)`

Generates a QR Code for PromptPay

**Parameters:**
- `mobileNumber` (string): Thai mobile number
- `amount` (number): Amount in THB
- `options` (object, optional): Additional options

**Returns:** Promise<string> - Base64 encoded QR Code image

### `validateThaiMobileNumber(mobileNumber)`

Validates Thai mobile number format

**Parameters:**
- `mobileNumber` (string): Mobile number

**Returns:** boolean - true if number is valid

### `validateAmount(amount)`

Validates amount value

**Parameters:**
- `amount` (number | string): Amount value

**Returns:** boolean - true if amount is valid

## 🎨 Customization

### QR Code Customization

```typescript
const qrOptions = {
    width: 512,                    // QR Code size
    quality: 0.92,                 // Image quality
    margin: 2,                     // QR Code margin
    color: {
        dark: '#000000',           // QR Code color
        light: '#FFFFFF'           // Background color
    },
    errorCorrectionLevel: 'M'      // Error correction level
};
```

### UI Customization

The app uses Tailwind CSS and can be customized through:
- `tailwind.config.js` - Main configuration
- CSS classes in components
- CSS variables for colors and sizes

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview build
npm run preview
```

## 📦 Dependencies

### Production Dependencies
- `react` ^19.1.1 - React framework
- `react-dom` ^19.1.1 - React DOM
- `promptpay-qr` ^0.5.0 - PromptPay payload generation
- `qrcode` ^1.5.4 - QR Code image generation

### Development Dependencies
- `typescript` ^5.6.3 - TypeScript compiler
- `vite` ^7.1.0 - Build tool
- `tailwindcss` ^4.1.11 - CSS framework
- `eslint` ^9.32.0 - Code linting

## 🌟 Upcoming Features

- [ ] **QR Code Scanner** - Scan QR codes to view information
- [ ] **History** - Save QR code generation history
- [ ] **Templates** - QR code templates for businesses
- [ ] **Bulk Generation** - Generate multiple QR codes at once
- [ ] **Export Options** - Support for SVG, PDF files
- [ ] **Advanced Customization** - More QR code styling options
- [ ] **PWA Support** - Installable as an app

## 🤝 Contributing

We welcome contributions from everyone! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [promptpay-qr](https://github.com/jojoee/promptpay-qr) - Library for generating PromptPay payloads
- [qrcode](https://github.com/soldair/node-qrcode) - Library for generating QR codes
- [React](https://reactjs.org/) - JavaScript library for building UIs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Fast build tool

## 📞 Contact

If you have questions or suggestions, please contact:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/patiphop/qr-promptpay/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/patiphop/qr-promptpay/discussions)

---

⭐ **If this project is helpful, please give it a star and share!** ⭐
