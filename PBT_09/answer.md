# PHẦN A 

## CÂU A1 — DOM TREE VISUALIZATION & SELECTORS

### 1. Sơ đồ cây DOM Tree biểu diễn cấu trúc HTML:

document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── #text: "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── #text: "All"
            │       ├── a
            │       │   └── #text: "Active"
            │       └── a
            │           └── #text: "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput
                │   └── button
                │       └── #text: "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── #text: "Learn HTML"
                    └── li.todo-item.completed
                        └── #text: "Learn CSS"

### 2. Viết câu lệnh querySelector / querySelectorAll cho từng yêu cầu:

* Chọn thẻ <h1>:
  const h1 = document.querySelector("h1");

* Chọn input trong form:
  const input = document.querySelector("#todoForm input");

* Chọn tất cả .todo-item:
  const items = document.querySelectorAll(".todo-item");

* Chọn link đang active:
  const activeLink = document.querySelector("nav a.active");

* Chọn <li> đầu tiên trong #todoList:
  const firstLi = document.querySelector("#todoList li:first-child");

* Chọn tất cả <a> bên trong <nav>:
  const navLinks = document.querySelectorAll("nav a");

---

## CÂU A2 — INNERHTML VS TEXTCONTENT (SECURITY & XSS)

### 1. Phân biệt bản chất:
* innerHTML: Đọc hoặc ghi nội dung dạng HTML thô (Raw HTML). Nếu ta truyền vào một chuỗi chữ chứa các thẻ định dạng, trình duyệt sẽ parse (biên dịch) các thẻ đó thành các phần tử DOM thật và hiển thị lên màn hình.
* textContent: Đọc hoặc ghi nội dung thuần dạng Văn bản thô (Plain Text). Nếu ta truyền vào một chuỗi chữ chứa thẻ HTML, trình duyệt sẽ giữ nguyên chữ đó, tự động mã hóa các dấu ngoặc nhọn và in trơ trọi ra màn hình chứ không hề biên dịch thành thẻ DOM.

### 2. Khi nào nên dùng từng loại?
* Dùng textContent khi: Bạn chỉ muốn thay đổi chữ hiển thị thông thường (Ví dụ: cập nhật tên sản phẩm, hiển thị số điểm, thông báo lỗi văn bản). Đây là giải pháp an toàn tuyệt đối và giúp tối ưu hiệu năng tốt hơn.
* Dùng innerHTML khi: Bạn thực sự muốn chèn hoặc vẽ cả một khối cấu trúc cấu trúc HTML phức tạp từ file JavaScript vào giao diện (Ví dụ: render một danh sách mảng dữ liệu thành các khối thẻ div lồng ảnh và nút bấm).

### 3. Câu hỏi bảo mật: Tại sao innerHTML gây ra lỗ hổng XSS (Cross-Site Scripting)?
Bởi vì innerHTML tin tưởng tuyệt đối vào chuỗi dữ liệu truyền vào mà không hề có bộ lọc. Nếu mã nguồn của bạn lấy dữ liệu do người dùng nhập từ ô input mà không kiểm duyệt (sanitize), kẻ tấn công có thể cố tình chèn vào một đoạn mã độc (như thẻ img kèm sự kiện onerror hoặc thẻ script). Khi bạn gán chuỗi này vào innerHTML, trình duyệt sẽ hiểu lầm đó là code hợp pháp của hệ thống và tự động thực thi đoạn mã JavaScript độc hại đó, dẫn đến nguy cơ bị đánh cắp cookie, session token hoặc chiếm quyền tài khoản.

### 4. Cách khắc phục lỗ hổng XSS:
Đối với các trường hợp chỉ hiển thị chuỗi văn bản thông thường, biện pháp sửa lỗi triệt để nhất là thay thế hoàn toàn innerHTML bằng textContent.

* Đoạn code sau khi sửa lỗi an toàn:
  const userInput = document.querySelector("#search").value;
  document.querySelector("#result").textContent = userInput; 
  // Lúc này, chuỗi mã độc sẽ bị coi là văn bản thô, hiển thị vô hại lên màn hình!

---

## CÂU A3 — EVENT BUBBLING (CƠ CHẾ SỰ KIỆN NỔ BỌT)

### 1. Trạng thái 1: Khi bấm vào button (Mặc định code giữ nguyên)
* Thứ tự in ra console.log:
  BUTTON
  INNER
  OUTER
* Giải thích chi tiết: Đây là cơ chế Event Bubbling (Nổi bọt sự kiện) mặc định của JavaScript. Khi một hành vi click xảy ra trên phần tử sâu nhất là #btn (Target), sự kiện sẽ được kích hoạt tại đó trước, sau đó giống như một bong bóng nước, sự kiện tiếp tục nổi bọt lan ngược lên trên, kích hoạt lần lượt các hàm lắng nghe sự kiện của các thẻ cha bao bọc nó là #inner và cuối cùng là #outer.

### 2. Trạng thái 2: Khi bỏ comment dòng lệnh e.stopPropagation(); ở nút button
* Thứ tự in ra console.log mới:
  BUTTON
* Giải thích chi tiết: Hàm e.stopPropagation() có nhiệm vụ chặn đứng hành vi nổi bọt của sự kiện ngay lập tức. Khi click vào nút bấm, hàm xử lý của nút bấm chạy xong và gặp câu lệnh này, bong bóng sự kiện sẽ bị bóp vỡ ngay tại chỗ, không cho phép lan truyền ngược lên các thẻ cha #inner và #outer nữa. Do đó, màn hình lúc này duy nhất chỉ in ra chữ BUTTON.

