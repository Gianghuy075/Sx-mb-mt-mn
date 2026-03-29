# Docker Deployment Guide

Hướng dẫn deploy ứng dụng Next.js Xổ Số bằng Docker Compose

## Yêu cầu

- Docker >= 20.10
- Docker Compose >= 2.0
- Máy chủ Linux (Ubuntu/Debian/CentOS)

## Cài đặt Docker (nếu chưa có)

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Cài Docker Compose
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Kiểm tra
docker --version
docker compose version
```

## Triển khai

### 1. Copy project lên server

```bash
# Từ máy local
scp -r /path/to/project user@server:/opt/lottery-app/

# Hoặc clone từ git
git clone your-repo-url /opt/lottery-app/
cd /opt/lottery-app/
```

### 2. Cấu hình environment variables

```bash
cd /opt/lottery-app/

# Copy và chỉnh sửa .env.production
cp .env.production.example .env.production
nano .env.production
```

**Cập nhật giá trị quan trọng:**

- `NEXTAUTH_URL`: Đổi thành domain thực tế (ví dụ: `https://xoso.example.com`)
- `DATABASE_URL`: MongoDB connection string
- `NEXTAUTH_SECRET`: Generate key mới bằng `openssl rand -base64 32`
- `XOSOAPI_KEY`: API key của bạn

### 3. Build và chạy containers

```bash
# Build images và start services
docker compose up -d --build

# Xem logs
docker compose logs -f

# Chờ khoảng 1-2 phút cho Next.js build
```

### 4. Kiểm tra trạng thái

```bash
# Kiểm tra containers đang chạy
docker compose ps

# Kiểm tra logs
docker compose logs nextjs
docker compose logs nginx
```

### 5. Truy cập ứng dụng

- Trang chủ: `http://YOUR_SERVER_IP`
- Đăng nhập admin: `http://YOUR_SERVER_IP/login`
- Tin tức: `http://YOUR_SERVER_IP/tin-tuc`

## Các lệnh thường dùng

```bash
# Dừng services
docker compose down

# Khởi động lại
docker compose up -d

# Xem logs realtime
docker compose logs -f nextjs

# Rebuild sau khi update code
docker compose down
docker compose up -d --build

# Xóa volumes (cẩn thận: mất dữ liệu upload)
docker compose down -v
```

## Backup & Restore

### Backup uploaded files

```bash
# Backup uploads directory
docker compose exec nextjs tar czf /tmp/uploads-backup.tar.gz /app/public/uploads
docker compose cp nextjs:/tmp/uploads-backup.tar.gz ./uploads-backup-$(date +%Y%m%d).tar.gz
```

### Restore uploaded files

```bash
# Restore uploads
docker compose cp ./uploads-backup.tar.gz nextjs:/tmp/
docker compose exec nextjs tar xzf /tmp/uploads-backup.tar.gz -C /
```

## Troubleshooting

### Container bị exit ngay sau khi start

```bash
# Kiểm tra logs
docker compose logs nextjs

# Thường do:
# - Environment variables thiếu/sai
# - Database connection lỗi
# - Port đã được sử dụng
```

### Không truy cập được web

```bash
# Kiểm tra nginx logs
docker compose logs nginx

# Kiểm tra port mapping
docker compose ps

# Thử truy cập trực tiếp Next.js
docker compose exec nginx wget -O- http://nextjs:3000
```

### Upload file lỗi

```bash
# Kiểm tra permissions
docker compose exec nextjs ls -la /app/public/uploads

# Kiểm tra disk space
df -h

# Kiểm tra upload size limit
docker compose exec nginx cat /etc/nginx/nginx.conf | grep client_max_body_size
```

### Database connection lỗi

```bash
# Verify environment variables
docker compose exec nextjs env | grep DATABASE_URL

# Test connection từ container
docker compose exec nextjs node -e "console.log(process.env.DATABASE_URL)"
```

## Production Best Practices

### 1. HTTPS với Let's Encrypt

Thêm SSL certificate (khuyến nghị cho production):

```bash
# Cài Certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx config để dùng SSL
# Thêm vào docker-compose.yml volumes:
# - /etc/letsencrypt:/etc/letsencrypt:ro
```

### 2. Firewall

```bash
# Chỉ mở port 80 và 443
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Auto-restart on boot

```bash
# Docker compose services đã có restart: always
# Đảm bảo Docker service tự start
sudo systemctl enable docker
```

### 4. Monitoring

```bash
# Xem resource usage
docker stats

# Theo dõi disk space
df -h
```

## Update ứng dụng

```bash
# Pull code mới (nếu dùng git)
git pull

# Rebuild và restart
docker compose down
docker compose up -d --build

# Hoặc rebuild không downtime:
docker compose build
docker compose up -d
```

## Xóa toàn bộ

```bash
# Dừng và xóa containers
docker compose down

# Xóa cả volumes (mất dữ liệu!)
docker compose down -v

# Xóa images
docker rmi lottery-nextjs nginx:alpine
```

## Support

Nếu gặp vấn đề, kiểm tra:

1. Logs: `docker compose logs -f`
2. Container status: `docker compose ps`
3. Network: `docker network ls`
4. Volumes: `docker volume ls`
