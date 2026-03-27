# Sổ Xố Online – Miền Bắc · Miền Trung · Miền Nam

Website tra cứu kết quả xổ số ba miền (Miền Bắc, Miền Trung, Miền Nam) của Việt Nam.

## Tính năng

- 🏙️ **Miền Bắc** – kết quả quay số hàng ngày tại Hà Nội (8 giải)
- 🌄 **Miền Trung** – lịch quay theo ngày trong tuần, nhiều tỉnh thành (9 giải)
- 🌴 **Miền Nam** – lịch quay theo ngày trong tuần, nhiều tỉnh thành (9 giải)
- 📅 Chọn ngày, điều hướng qua lại giữa các ngày
- ⚡ Tự động tải từ API ([xsapi.vn](https://xsapi.vn)); fallback sang dữ liệu demo nếu không có kết nối
- 📱 Responsive – hiển thị đẹp trên cả điện thoại và máy tính

## Cách dùng

Mở file `index.html` trực tiếp trong trình duyệt, hoặc host lên bất kỳ web server tĩnh nào (GitHub Pages, Netlify, v.v.).

```
# Ví dụ dùng Python để chạy local:
python3 -m http.server 8080
# Truy cập http://localhost:8080
```

## Cấu trúc

```
├── index.html      # Trang chính
├── css/
│   └── style.css   # Giao diện (chủ đề đỏ-vàng)
└── js/
    └── app.js      # Logic tải dữ liệu và render
```

## Nguồn dữ liệu

API miễn phí: **https://xsapi.vn**  
Khi API không khả dụng, ứng dụng tự tạo dữ liệu demo để giao diện luôn hoạt động.