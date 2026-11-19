# 📋 TaskFlow Duo - Ứng Dụng Quản Lý Công Việc, Chi Tiêu & Lịch Biểu 2 Người

Ứng dụng web độc lập, hiện đại dành riêng cho **bạn và cộng sự**, tích hợp 3 trụ cột quản lý trong 1 giao diện duy nhất mà không cần cài đặt phần mềm nào.

---

## 🌟 3 Phân Hệ Chính

### 1. 🎯 Bảng Hôm Nay & Đếm Ngược Deadline (Today's Focus)
- Tự động phát hiện và cảnh báo các công việc **quá hạn** hoặc **đến hạn trong hôm nay**.
- Danh sách đếm ngược các dự án và công việc sắp tới hạn trong 7 ngày tới (với dải màu cảnh báo Đỏ / Vàng / Xanh).

### 2. 📋 Quản Lý Dự Án & Công Việc (Kanban)
- **Quản lý theo Dự án:** Theo dõi tiến độ hoàn thành (%) từng dự án lớn.
- **Phân vai 2 người:** Phân công rõ ràng giữa **Bạn** và **Cộng sự**, có nút bấm 1-click lọc: *Xem tất cả* | *Chỉ việc của Bạn* | *Chỉ việc của Cộng sự*.
- **Kanban Board:** Kéo thả linh hoạt giữa 3 cột *Cần làm (To Do)*, *Đang làm (Doing)*, *Hoàn thành (Done)*.

### 3. 💰 Sổ Quỹ Chi Tiêu & Đối Soát Công Nợ (Expenses & Settlement)
- Ghi nhanh từng khoản chi tiêu: Ngày chi, Số tiền, Thuộc dự án nào, Ai đã trả tiền.
- **Tự động tính toán công nợ 50/50:**
  - Tổng số tiền Bạn đã chi.
  - Tổng số tiền Cộng sự đã chi.
  - Hệ thống tính toán chính xác số tiền cấn trừ: Ai nợ ai bao nhiêu tiền để thanh toán sòng phẳng.

---

## 🚀 Cách Mở Ứng Dụng

- Click đúp vào file [`index.html`](file:///e:/Khóa%20học/AI4S/task_manager/index.html) để mở trực tiếp trong trình duyệt Chrome / Edge.
- Ứng dụng đã có sẵn dữ liệu mẫu thực tế để bạn trải nghiệm ngay.

---

## ☁️ Đồng Bộ Google Sheets 2 Chiều (Cho 2 Người Dùng Chung)

1. Mở trang Google Sheet của bạn.
2. Vào **Tiện ích mở rộng (Extensions) > Apps Script**.
3. Dán toàn bộ mã nguồn từ file [`google_apps_script.js`](file:///e:/Khóa%20học/AI4S/task_manager/google_apps_script.js) vào.
4. Bấm **Triển khai (Deploy) > Triển khai mới (New deployment)**:
   - Loại: **Ứng dụng web (Web app)**
   - Thực thi dưới dạng: **Tôi (Me)**
   - Người có quyền truy cập: **Bất kỳ ai (Anyone)**
5. Sao chép URL ứng dụng web dán vào nút **Google Sheets** trên ứng dụng TaskFlow Duo để đồng bộ cả 2 tab `Tasks` và `Expenses`.
