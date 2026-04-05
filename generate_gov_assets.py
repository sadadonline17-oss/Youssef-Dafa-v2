#!/usr/bin/env python3
"""Generate GCC government hero images for payment integration."""

from PIL import Image, ImageDraw, ImageFont
import os

# Asset definitions: (filename, primary_color, label_en, label_ar)
GCC_ENTITIES = [
    ("gov-uae-hero.jpg", "#006B3F", "UAE Ministry of Finance", "الإمارات - وزارة المالية"),
    ("gov-ksa-hero.jpg", "#006C35", "KSA Ministry of Finance", "السعودية - وزارة المالية"),
    ("gov-qatar-hero.jpg", "#8A1538", "Qatar Ministry of Finance", "قطر - وزارة المالية"),
    ("gov-kuwait-hero.jpg", "#007A3D", "Kuwait Ministry of Finance", "الكويت - وزارة المالية"),
    ("gov-bahrain-hero.jpg", "#CE1126", "Bahrain Ministry of Finance", "البحرين - وزارة المالية"),
    ("gov-oman-hero.jpg", "#C8102E", "Oman Ministry of Finance", "عمان - وزارة المالية"),
    ("gov-gcc-secretariat-hero.jpg", "#1D3A5F", "GCC Secretariat", "مجلس التعاون الخليجي"),
]

ASSETS_DIR = "src/assets"
WIDTH, HEIGHT = 1200, 630

def find_font():
    """Find an available TTF font."""
    common_paths = [
        "/data/data/com.termux/files/usr/share/fonts/ttf/DejaVuSans.ttf",
        "/system/fonts/DroidSans.ttf",
        "/data/data/com.termux/files/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in common_paths:
        if os.path.exists(path):
            return path
    return None

def generate_hero_image(filename, color, label_en, label_ar):
    """Create a hero image with centered text."""
    im = Image.new("RGB", (WIDTH, HEIGHT), color)
    draw = ImageDraw.Draw(im)
    font_path = find_font()
    
    if font_path:
        font_lg = ImageFont.truetype(font_path, 48)
        font_sm = ImageFont.truetype(font_path, 32)
    else:
        font_lg = ImageFont.load_default()
        font_sm = ImageFont.load_default()

    # Center both labels vertically offset
    text_y_ar = HEIGHT // 2 - 40
    text_y_en = HEIGHT // 2 + 20

    draw.text((WIDTH // 2, text_y_ar), label_ar, fill="white", font=font_lg, anchor="mm")
    draw.text((WIDTH // 2, text_y_en), label_en, fill="white", font=font_sm, anchor="mm")
    
    out_path = os.path.join(ASSETS_DIR, filename)
    im.save(out_path, "JPEG", quality=90)
    print(f"✓ Created {out_path}")

def main():
    os.makedirs(ASSETS_DIR, exist_ok=True)
    for args in GCC_ENTITIES:
        generate_hero_image(*args)
    print(f"\n✅ Generated {len(GCC_ENTITIES)} GCC government hero assets.")

if __name__ == "__main__":
    main()
