# Sử dụng image Node.js chính thức
FROM node:14

# Cài đặt các gói cần thiết bao gồm distutils
RUN apt-get update && apt-get install -y python3-distutils

# Tạo và đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở cổng 8080
EXPOSE 8080

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]

