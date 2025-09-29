# Dockerfile
FROM node:20

# Tạo thư mục app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start"]
