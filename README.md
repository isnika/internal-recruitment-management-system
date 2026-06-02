# Recruitment Management System

Hệ thống Web Quản lý Quy trình Tuyển dụng cho Doanh nghiệp

---

# Giới thiệu

**Recruitment Management System (RMS)** là hệ thống web hỗ trợ doanh nghiệp quản lý toàn bộ quy trình tuyển dụng từ đăng tin tuyển dụng, tiếp nhận hồ sơ ứng viên, sàng lọc hồ sơ, theo dõi tiến độ tuyển dụng đến quản lý kết quả phỏng vấn.

Dự án được xây dựng nhằm số hóa quy trình tuyển dụng, giúp doanh nghiệp tối ưu thời gian xử lý hồ sơ, nâng cao hiệu quả quản lý và cải thiện trải nghiệm của ứng viên.

---

# Mục tiêu dự án

* Xây dựng hệ thống tuyển dụng trực tuyến cho doanh nghiệp.
* Quản lý thông tin ứng viên tập trung.
* Theo dõi trạng thái tuyển dụng theo từng vị trí.
* Hỗ trợ doanh nghiệp đánh giá và quản lý hồ sơ hiệu quả.
* Tăng tính minh bạch trong quy trình tuyển dụng.
* Áp dụng kiến thức Công nghệ Phần mềm vào thực tiễn.

---

# Chức năng chính

## Quản lý tài khoản

### Nhà tuyển dụng

* Đăng ký tài khoản doanh nghiệp.
* Đăng nhập và xác thực người dùng.
* Cập nhật thông tin doanh nghiệp.
* Quản lý hồ sơ công ty.

### Ứng viên

* Đăng ký tài khoản.
* Đăng nhập hệ thống.
* Cập nhật hồ sơ cá nhân.
* Quản lý CV và thông tin ứng tuyển.

---

## Quản lý tin tuyển dụng

* Tạo tin tuyển dụng mới.
* Chỉnh sửa tin tuyển dụng.
* Xóa tin tuyển dụng.
* Đăng hoặc ẩn tin tuyển dụng.
* Quản lý nhiều vị trí tuyển dụng cùng lúc.

Thông tin tuyển dụng bao gồm:

* Tên vị trí.
* Mô tả công việc.
* Yêu cầu ứng viên.
* Mức lương.
* Địa điểm làm việc.
* Hạn nộp hồ sơ.

---

## Quản lý hồ sơ ứng tuyển

* Tiếp nhận hồ sơ từ ứng viên.
* Lưu trữ CV.
* Xem chi tiết hồ sơ.
* Tìm kiếm ứng viên.
* Lọc ứng viên theo nhiều tiêu chí.

---

## Quản lý quy trình tuyển dụng

Các trạng thái tuyển dụng:

1. Applied (Đã ứng tuyển)
2. Reviewing (Đang xem xét)
3. Interview Scheduled (Đã lên lịch phỏng vấn)
4. Interviewed (Đã phỏng vấn)
5. Accepted (Trúng tuyển)
6. Rejected (Từ chối)

Doanh nghiệp có thể theo dõi tiến trình tuyển dụng của từng ứng viên theo thời gian thực.

---

## Quản lý phỏng vấn

* Lập lịch phỏng vấn.
* Theo dõi lịch phỏng vấn.
* Cập nhật kết quả phỏng vấn.
* Đánh giá ứng viên.

---

## Dashboard thống kê

Hệ thống cung cấp các báo cáo:

* Tổng số ứng viên.
* Tổng số tin tuyển dụng.
* Tỷ lệ ứng tuyển.
* Tỷ lệ trúng tuyển.
* Số lượng ứng viên theo trạng thái.
* Thống kê hoạt động tuyển dụng.

---

# Kiến trúc hệ thống

Hệ thống được xây dựng theo mô hình Client - Server.

```text
Frontend (React + TypeScript)
            │
            ▼
      RESTful API
            │
            ▼
Backend (Spring Boot)
            │
            ▼
        Database
```

---

# Công nghệ sử dụng

## Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST API
* Maven

## Frontend

* React
* TypeScript (TS)
* TSX
* HTML5
* CSS3
* Axios
* React Router

## Database

* MySQL

## DevOps & Tools

* Docker
* Docker Compose
* Git
* GitHub
* Postman
* Swagger UI
* IntelliJ IDEA
* Visual Studio Code

---

# Cấu trúc dự án

```text
recruitment-management-system/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
│
└── README.md
```

---

# Cơ sở dữ liệu

Các thực thể chính:

* User
* Company
* Job
* Application
* Candidate
* Interview
* Role
* Notification

Mối quan hệ:

```text
Company
    │
    ├── Job
    │       │
    │       └── Application
    │                 │
    │                 └── Candidate
    │
    └── Interview
```

---

# Quy trình tuyển dụng

```text
Ứng viên
    │
    ▼
Nộp hồ sơ
    │
    ▼
Xét duyệt hồ sơ
    │
    ▼
Lên lịch phỏng vấn
    │
    ▼
Phỏng vấn
    │
    ▼
Đánh giá
    │
    ▼
Trúng tuyển / Từ chối
```

---

# Hướng dẫn cài đặt

## Clone Repository

```bash
git clone https://github.com/isnika/internal-recruitment-management-system
cd recruitment-management-system
```

---

## Chạy Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend mặc định chạy tại:

```text
http://localhost:8080
```

---

## Chạy Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

---

## Chạy bằng Docker

Build và chạy toàn bộ hệ thống:

```bash
docker-compose up --build
```

Dừng hệ thống:

```bash
docker-compose down
```

---

# Các tính năng nổi bật

* Quản lý doanh nghiệp và ứng viên.
* Quản lý tin tuyển dụng.
* Theo dõi trạng thái ứng tuyển.
* Quản lý lịch phỏng vấn.
* Dashboard thống kê trực quan.
* Hệ thống phân quyền người dùng.
* RESTful API.
* Hỗ trợ triển khai bằng Docker.
* Quản lý mã nguồn bằng GitHub.

---

# Kết quả đạt được

* Xây dựng thành công hệ thống quản lý tuyển dụng trực tuyến.
* Tự động hóa quy trình tuyển dụng.
* Tăng hiệu quả quản lý hồ sơ ứng viên.
* Hỗ trợ doanh nghiệp theo dõi tiến độ tuyển dụng.
* Áp dụng mô hình Client-Server hiện đại.
* Triển khai được trên môi trường Docker.

---

# Thông tin đồ án

**Đề tài:**
Thiết kế và Xây dựng Hệ thống Web Quản lý Quy trình Tuyển dụng cho Doanh nghiệp

**Môn học:**
Nhập môn Công nghệ Phần mềm

**Giảng viên hướng dẫn:**
Huỳnh Lưu Quốc Linh

---

# Thành viên nhóm

| Họ và tên          | Mã sinh viên | Vai trò     |
| ------------------ | ------------ | ----------- |
| Nguyễn Khánh Huyền | N23DCCN027   | Trưởng nhóm |
| Nguyễn Gia Quân    | N23DCCN117   | Thành viên  |
| Nguyễn Chánh Khuê  | N23DCCN101   | Thành viên  |
| Đào Văn Khoa       | N23DCCN098   | Thành viên  |

---

# Tài liệu tham khảo

1. Spring Boot Documentation
2. React Documentation
3. TypeScript Documentation
4. MySQL Documentation
5. Docker Documentation
6. GitHub Documentation
7. Software Engineering Principles

---

# Giấy phép
Dự án này được phát triển nhằm phục vụ cho mục đích học tập, nghiên cứu và trình diễn.

Hệ thống được xây dựng trong khuôn khổ môn học Công nghệ Phần mềm nhằm nghiên cứu và áp dụng các công nghệ phát triển web hiện đại như:

* Spring Boot
* React
* TypeScript
* RESTful API
* Quản lý cơ sở dữ liệu
* Các phương pháp và quy trình phát triển phần mềm tốt nhất