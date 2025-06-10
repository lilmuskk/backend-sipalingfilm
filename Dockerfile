# Gunakan image Node.js LTS (Long Term Support) yang berbasis Debian/Ubuntu (GLIBC)
# node:20-slim adalah pilihan yang baik karena ukurannya kecil dan menggunakan GLIBC.
FROM node:20-slim

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# --- Perbaikan untuk masalah bcrypt / native modules ---
# 1. Hapus node_modules dan cache npm yang mungkin ada
RUN rm -rf node_modules && npm cache clean --force

# 2. Instal ulang semua dependencies dari awal dengan --production
# 3. Lakukan npm rebuild untuk memastikan native modules dikompilasi ulang untuk lingkungan ini.
# Gunakan || true untuk mencegah build gagal jika clean cache gagal (jarang)
RUN npm install --production && npm rebuild || true

# ----------------------------------------------------

# Salin seluruh isi proyek ke direktori kerja container
COPY . .

# Paparkan port yang akan digunakan aplikasi di dalam container
EXPOSE 8080

# Perintah untuk menjalankan aplikasi ketika container dimulai
# Gunakan "npm start" karena script ini sudah didefinisikan di package.json
CMD ["npm", "start"]