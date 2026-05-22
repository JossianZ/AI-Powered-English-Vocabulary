# AI-Powered English Vocabulary Trainer for Vocational Terms

Modern ve interaktif bir İngilizce kelime öğrenme platformu. Bilişim teknolojileri alanına özel (network, coding, hardware) terimler içerir.

## 🚀 Özellikler

- ✨ **Adaptif Öğrenme**: Kullanıcı seviyesine göre otomatik zorluk ayarı
- 📚 **Kategori Bazlı Öğrenme**: Network, Coding, Hardware kategorileri
- 🎯 **İnteraktif Quiz'ler**: Çoktan seçmeli, eşleştirme ve yazma testleri
- 📊 **İlerleme Takibi**: Detaylı istatistikler ve başarı grafikleri
- 🎨 **Modern UI/UX**: Framer Motion animasyonları ile akıcı deneyim
- 🌙 **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animasyonlar**: Framer Motion
- **Backend**: Express.js (Next.js API Routes)
- **Database**: PostgreSQL
- **HTTP Client**: Axios

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
npm start
```

## 🗄️ Veritabanı Kurulumu

```bash
# PostgreSQL veritabanı oluştur
createdb vocabulary_db

# .env.local dosyasını düzenle ve veritabanı bilgilerini gir
```

## 📱 Kullanım

1. Ana sayfadan kategori seçin (Network, Coding, Hardware)
2. Seviye seçin (Beginner, Intermediate, Advanced)
3. Quiz'e başlayın ve kelime öğrenmeye başlayın
4. İlerlemenizi takip edin

## 🎯 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── learn/             # Öğrenme sayfaları
│   ├── quiz/              # Quiz sayfaları
│   └── progress/          # İlerleme sayfası
├── components/            # React bileşenleri
│   ├── layout/           # Layout bileşenleri
│   ├── ui/               # UI bileşenleri
│   └── features/         # Özellik bileşenleri
├── lib/                  # Yardımcı fonksiyonlar
├── types/                # TypeScript tipleri
└── styles/               # Global stiller
```

## 📄 Lisans

Copyright <2026> <JossianZ>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
