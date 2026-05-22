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
