# Gunakan image Node.js LTS (Long Term Support) yang berbasis Debian/Ubuntu (GLIBC)
# node:20-slim adalah pilihan yang baik karena ukurannya kecil dan menggunakan GLIBC.
FROM node:20-slim

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan Docker cache.
COPY package*.json ./

# --- PERBAIKAN LEBIH AGRESIF UNTUK MASALAH bcrypt / native modules ---
# 1. Hapus node_modules secara total dan pastikan cache npm bersih.
RUN rm -rf node_modules && npm cache clean --force

# 2. Instal ulang semua dependencies, dan *secara eksplisit* minta npm untuk membangun ulang native modules.
#    Menggunakan `npm rebuild --unsafe-perm` sebagai langkah terpisah atau sebagai bagian dari `npm install`
#    dengan jaminan bahwa `node-gyp` (tool yang digunakan untuk kompilasi) memiliki izin yang cukup.
#    `npm ci` lebih ketat dalam menggunakan `package-lock.json`
RUN npm ci --only=production && npm rebuild --unsafe-perm

# ------------------------------------------------------------------

# Salin seluruh isi proyek ke direktori kerja container
COPY . .

# Paparkan port yang akan digunakan aplikasi di dalam container
EXPOSE 8080

# Perintah untuk menjalankan aplikasi ketika container dimulai
CMD ["npm", "start"]