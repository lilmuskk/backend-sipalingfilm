FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules && npm cache clean --force
# Hanya instal dependencies, tidak perlu rebuild lagi karena bcryptjs murni JS
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]