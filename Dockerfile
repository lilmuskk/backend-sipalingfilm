# Gunakan image Node.js LTS (Long Term Support) yang berbasis Debian/Ubuntu (GLIBC)
# node:20-slim adalah pilihan yang baik karena ukurannya kecil dan menggunakan GLIBC.
# node:20 (tanpa -slim) juga bisa, tapi lebih besar.
FROM node:20-slim

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan Docker cache untuk instalasi dependencies.
COPY package*.json ./

# Hapus folder node_modules yang mungkin sudah ada dari cache build (opsional tapi bagus untuk bersih-bersih)
RUN rm -rf node_modules

# Instal semua dependencies proyek.
# `--production` memastikan hanya dependencies produksi yang diinstal.
# `npm rebuild` sangat penting untuk mengkompilasi ulang native modules (seperti bcrypt)
# agar sesuai dengan arsitektur dan libc lingkungan container.
RUN npm install --production && npm rebuild

# Salin seluruh isi proyek ke direktori kerja container
# Ini akan menyalin semua file kode kamu (app.js, controllers, models, routes, dll.)
COPY . .

# Paparkan port yang akan digunakan aplikasi di dalam container
# Ini harus sesuai dengan PORT=8080 yang diharapkan oleh Cloud Run.
EXPOSE 8080

# Perintah untuk menjalankan aplikasi ketika container dimulai
# Kita menggunakan "npm start" karena script ini sudah didefinisikan di package.json
# dan akan menjalankan "node app.js"
CMD ["npm", "start"]