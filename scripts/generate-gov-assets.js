import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

const govEntities = [
  { key: 'sadad', name: 'SADAD - سداد', color: '#F58220', bg: '#FFF8F0' },
  { key: 'jaywan', name: 'Jaywan - جيوان', color: '#CE1126', bg: '#FFF5F5' },
  { key: 'dirham', name: 'Dirham - درهم', color: '#007CC2', bg: '#E3F2FD' },
  { key: 'knet', name: 'KNET - كي نت', color: '#007A3D', bg: '#E8F5E9' },
  { key: 'benefit', name: 'BENEFIT - بنفت', color: '#CE1126', bg: '#FFF5F5' },
  { key: 'maal', name: 'Maal - مال', color: '#D0032C', bg: '#FFF5F5' },
  { key: 'qatar', name: 'Qatar Gov', color: '#8D1B3D', bg: '#FFF5F5' },
  { key: 'nafath', name: 'Nafath - نفذ', color: '#006C35', bg: '#E8F5E9' },
  { key: 'absher', name: 'Absher - أبشر', color: '#006C35', bg: '#E8F5E9' },
  { key: 'uae-pass', name: 'UAE Pass', color: '#007CC2', bg: '#E3F2FD' },
  { key: 'sahel', name: 'Sahel - سهل', color: '#006C35', bg: '#E8F5E9' },
  { key: 'metrash2', name: 'Metrash2', color: '#8D1B3D', bg: '#FFF5F5' },
];

const bankEntities = [
  { key: 'alrajhi', name: 'Al Rajhi Bank', color: '#1B3A6B', bg: '#F0F4F8' },
  { key: 'snb', name: 'SNB', color: '#1A1A6E', bg: '#F0F0FF' },
  { key: 'enbd', name: 'Emirates NBD', color: '#F37021', bg: '#FFF8F0' },
  { key: 'nbk', name: 'NBK', color: '#1A1A6E', bg: '#F0F0FF' },
  { key: 'qnb', name: 'QNB', color: '#F7B500', bg: '#FFF8E1' },
  { key: 'bank-muscat', name: 'Bank Muscat', color: '#003A63', bg: '#E3F2FD' },
  { key: 'stc-pay', name: 'STC Pay', color: '#5F259F', bg: '#F3E8FF' },
  { key: 'mada', name: 'mada', color: '#004D8F', bg: '#E3F2FD' },
  { key: 'riyad-bank', name: 'Riyad Bank', color: '#004D8F', bg: '#E3F2FD' },
  { key: 'alahli-bank', name: 'Al Ahli Bank', color: '#1A1A6E', bg: '#F0F0FF' },
  { key: 'alinma-bank', name: 'Alinma Bank', color: '#006C35', bg: '#E8F5E9' },
];

function createLogoSVG(name, color, width = 200, height = 80) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="${color}" rx="8"/>
  <text x="50%" y="55%" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${name}</text>
</svg>`;
}

function createOGImage(name, color, width = 1200, height = 630) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.7"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <text x="50%" y="45%" font-family="Arial,sans-serif" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${name}</text>
  <text x="50%" y="58%" font-family="Arial,sans-serif" font-size="22" fill="rgba(255,255,255,0.85)" text-anchor="middle" dominant-baseline="middle">Secure Payment Gateway</text>
</svg>`;
}

let count = 0;

// Gov logos
govEntities.forEach(e => {
  const logoPath = path.join(publicDir, `gov-${e.key}.png`);
  fs.writeFileSync(logoPath, createLogoSVG(e.name, e.color));
  count++;
});

// Gov OG images
govEntities.forEach(e => {
  const ogPath = path.join(publicDir, `og-${e.key}.jpg`);
  fs.writeFileSync(ogPath, createOGImage(e.name, e.color));
  count++;
});

// Bank OG images (logos already exist in bank-logos/)
bankEntities.forEach(e => {
  const ogPath = path.join(publicDir, `og-bank-${e.key}.jpg`);
  fs.writeFileSync(ogPath, createOGImage(e.name, e.color));
  count++;
});

console.log(`✅ ${count} SVG assets generated (gov logos + og images + bank og images)`);
