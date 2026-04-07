import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../public/assets/dynamic-identity');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// Shipping carriers + GCC entities + banks + service types
const heroAssets = [
  // Shipping
  'aramex','dhl','fedex','smsa','naqel','ups','zajil','empost',
  'saudipost','qpost','kwpost','omanpost','bahpost',
  'albaraka','alfuttaim','alshaya','national','shipco',
  'hellmann','dsv','agility','jinaken','jinakum',
  // Government
  'sadad','jaywan','knet','benefit','maal','qatar-gov',
  'nafath','absher','uae-pass','sahel','metrash2',
  // Banks
  'alrajhi','snb','enbd','nbk','qnb','bank-muscat',
  'stc-pay','mada','riyad-bank','alahli-bank','alinma-bank',
  // Service types
  'gov','bank','chalets','health','invoice','contract','local',
];

const createHeroSVG = (name, primaryColor, width = 1200, height = 400) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad-${name}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad-${name})"/>
  <text x="50%" y="45%" font-family="Arial,sans-serif" font-size="42" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${name.replace(/-/g, ' ').toUpperCase()}</text>
  <text x="50%" y="60%" font-family="Arial,sans-serif" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle" dominant-baseline="middle">GCC Chameleon Sovereign Mirror — Entity Header</text>
</svg>`;
};

const colorMap = {
  aramex:'#DC291E', dhl:'#FFCC00', fedex:'#4D148C', smsa:'#662D91', naqel:'#E61838',
  ups:'#351C15', zajil:'#1C4587', empost:'#C8102E', saudipost:'#006C35', qpost:'#8E1838',
  kwpost:'#007A33', omanpost:'#ED1C24', bahpost:'#EF3F32', albaraka:'#D89A00',
  alfuttaim:'#00559B', alshaya:'#D71920', national:'#003366', shipco:'#0A5FB4',
  hellmann:'#0C4DA2', dsv:'#0056A6', agility:'#003A63', jinaken:'#E82424', jinakum:'#0EA5E9',
  sadad:'#F58220', jaywan:'#CE1126', knet:'#007A3D', benefit:'#CE1126', maal:'#D0032C',
  'qatar-gov':'#8D1B3D', nafath:'#006C35', absher:'#006C35', 'uae-pass':'#007CC2',
  sahel:'#006C35', metrash2:'#8D1B3D',
  alrajhi:'#1B3A6B', snb:'#1A1A6E', enbd:'#F37021', nbk:'#1A1A6E', qnb:'#F7B500',
  'bank-muscat':'#003A63', 'stc-pay':'#5F259F', mada:'#004D8F', 'riyad-bank':'#004D8F',
  'alahli-bank':'#1A1A6E', 'alinma-bank':'#006C35',
  gov:'#004080', bank:'#0000FF', chalets:'#FF6F00', health:'#008080', invoice:'#800000',
  contract:'#000080', local:'#008000',
};

let generated = 0;
heroAssets.forEach(name => {
  const color = colorMap[name] || '#6366F1';
  const svg = createHeroSVG(name, color);
  fs.writeFileSync(path.join(assetsDir, `hero-${name}.svg`), svg);
  generated++;
});

console.log(`✅ ${generated} hero SVGs generated in ${assetsDir}`);
