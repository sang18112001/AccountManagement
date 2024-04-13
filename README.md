# Mô tả kết quả đạt được của bài test

## Bài tập 1: Viết frontend nền tảng web hiển thị 1000 hình tròn với đường kính từ 10 tới 100 pixel chuyển động với quỹ đạo bất kỳ, vận tốc > 10pixel / s. Hiển thị FPS, yêu cầu >= 30. Có thể thử dụng thư viện.

Link github: [https://github.com/sang18112001/VHT_Ex1](https://github.com/sang18112001/VHT_Ex1)

## Bài tập 2: Viết một hệ thống gồm 1 frontend nền tảng web và 1 backend ngôn ngữ tùy chọn thực hiện các nhiệm vụ sau:

- Hiển thị trên frontend khung đăng nhập thông tin gồm có: username, pasword
- Frontend kết nối tới backend để xác nhận username và password, thông báo thành công / không thành công
  - Notes:
    1. Frontend không gửi password dạng clear text tới backend (cần mã hóa hoặc phương pháp khác)
    2. Frontend kết nối tới backend sử dụng kết nối bảo mật
    3. Cơ sở dữ liệu lưu thông tin người dùng sử dụng sqlite. Không lưu mật khẩu dạng clear text trong CSDL.

Link github:
  - Frontend: [https://github.com/sang18112001/VHT_Ex2_Frontend](https://github.com/sang18112001/VHT_Ex2_Frontend)
  - Backend: [https://github.com/sang18112001/VHT_Ex2_Backend](https://github.com/sang18112001/VHT_Ex2_Backend)

### Mô tả: Bài tập được thực hiện với chức năng đăng kí, đăng nhập và sửa đổi thông tin tài khoản.

#### a. Frontend
- Công nghệ sử dụng: ReactJs.
- Cho phép người dung thực hiện đăng kí và đăng nhập qua form.
- Dữ liệu về mật khẩu đã được mã hóa và gửi sang phía của backend.
- Sau khi người dung đăng nhạp, học có quyền để sửa đổi thông tin người dùng. Tuy nhiên đối với những tài khoản mà không có quyền admin thì không thể truy cập vào trang dashboard để xóa đi thông tin người dùng.
- Tài khoản admin đã được tạo để sử dụng:
  - Username: admin
  - Password: 1213456

#### b. Backend
- Công nghệ sử dụng: NodeJs, SQLite
- Backend đã thực hiện được chức năng authentication và authorization.
- Một số chức năng như lấy hoặc hóa thông tin người dùng, phải có mã token mới được phép thực hiện
- Tạo được chức năng đăng kí cho người dùng qua việc lấy mật khẩu đã được mã hóa từ phía frontend và lưu chúng trong SQLite.
- Qua việc sử dụng jwt, khi người dùng đăng nhập thành công, thì sẽ nhận được một mã accessToken (được lưu trữ ở trong localstorage).
- Một mã refreshToken cũng được tạo thành công khi người dùng đăng nhập thành công và được lưu trong cookies.
- Khi accessToken hết hạn, refreshToken được lấy ra từ cookies để tạo ra một mã accessToken mới cho người dùng.
