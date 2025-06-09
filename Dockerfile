# For x86_64
FROM node:20-alpine

# For ARM64 (e.g., AWS Graviton, Apple Silicon)
# FROM node:20-alpine-arm64

WORKDIR /app

COPY package*.json ./
RUN npm install --production --unsafe-perm # --unsafe-perm might be needed for native modules in some environments

COPY . .
expose 8080
CMD ["node", "app.js"]