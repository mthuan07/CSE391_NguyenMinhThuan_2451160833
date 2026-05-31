# PHẦN A 

## CÂU A1 

### 1. Bảng dự đoán cấu trúc Layout ở 3 kích thước:

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
| :--- | :---: | :---: | :---: |
| **Số cột** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Xếp chồng dọc thành 1 hàng 4 ô | Xếp thành 2 hàng, mỗi hàng 2 ô | Xếp ngang thành 1 hàng duy nhất 4 ô |

### 2. Sơ đồ bố cục dạng Text (Hệ lưới 12 cột)

* **Kích thước Mobile (< 768px):** Ăn theo class `col-12` (chiếm 12/12 cột = 100% độ rộng).
+------------------------------------------+
| [                  Box 1               ] |
| [                  Box 2               ] |
| [                  Box 3               ] |
| [                  Box 4               ] |
+------------------------------------------+

* **Kích thước Tablet (768px - 991px):** Ăn theo class `col-md-6` (chiếm 6/12 cột = 50% độ rộng).
+--------------------+---------------------+
| [      Box 1     ] | [      Box 2      ] |
+--------------------+---------------------+
| [      Box 3     ] | [      Box 4      ] |
+--------------------+---------------------+

* **Kích thước Desktop (≥ 992px):** Ăn theo class `col-lg-3` (chiếm 3/12 cột = 25% độ rộng).
+----------+-----------+-----------+-------+
| [ Box 1 ] [ Box 2 ] [ Box 3 ] [ Box 4 ] |
+----------+-----------+-----------+-------+

### 3. Trả lời câu hỏi thêm:
* **`col-md-6` nghĩa là gì?** Class này có nghĩa là trên các thiết bị màn hình có kích thước trung bình (Medium devices - từ mốc 768px trở lên như Máy tính bảng dọc), phần tử này sẽ chiếm kích thước là 6 ô trên tổng số 12 ô của hệ thống lưới (tương đương với 50% chiều rộng của hàng `row`).
* **Tại sao không cần viết `col-sm-12`?** Bởi vì trong tư duy thiết kế Mobile-First của hệ thống lưới, các class nhỏ hơn (ở đây là class mặc định `col-12`) sẽ tự động được kế thừa lên các mốc màn hình lớn hơn (`sm`) nếu chúng ta không khai báo đè một thuộc tính mới cho mốc đó. Do đó, viết `col-12` là đã bao trùm luôn cả mốc `sm` rồi, không cần viết thừa `col-sm-12`.

---

## CÂU A2

### 1. Giải thích class `d-none d-md-block`
Đây là sự kết hợp của hai tiện ích hiển thị (Display utilities) hoạt động theo tư duy Mobile-First để ẩn/hiện phần tử:
* `d-none`: Có nghĩa là mặc định ở kích thước màn hình nhỏ nhất (Mobile), phần tử này sẽ bị ẩn hoàn toàn khỏi giao diện (`display: none`).
* `d-md-block`: Có nghĩa là khi màn hình đạt kích thước trung bình (Medium - từ 768px trở lên), thuộc tính hiển thị sẽ bị ghi đè thành dạng khối (`display: block`).
* **Kết luận:** Phần tử này sẽ **ẩn trên các thiết bị di động (màn hình < 768px)** và **bắt đầu hiển thị từ màn hình máy tính bảng/máy tính trở lên (màn hình ≥ 768px)**. *(Ví dụ thực tế: Thanh menu ngang của máy tính bị ẩn trên điện thoại).*

### 2. Liệt kê và giải thích 5 Spacing Utilities (Margin/Padding):
* `mt-3` (Margin Top): Thiết lập khoảng cách căn lề **phía trên** của phần tử ra một khoảng bằng mức số 3 (thường tương đương với 1rem = 16px).
* `px-4` (Padding X): Thiết lập khoảng đệm thụt vào lề ở cả hai bên **bên trái (Left) và bên phải (Right)** của phần tử với mức số 4 (thường tương đương với 1.5rem = 24px).
* `mb-auto` (Margin Bottom Auto): Tự động tính toán để đẩy khoảng cách căn lề **phía dưới** của phần tử lên mức tối đa có thể. *(Rất hay dùng trong Flexbox để ép phần tử khác dính xuống đáy).*
* `ms-2` (Margin Start): Căn lề **bên trái** (phần bắt đầu của dòng văn bản) ra một khoảng mức số 2 (thường tương đương với 0.5rem = 8px).
* `py-5` (Padding Y): Thiết lập khoảng đệm thụt vào lề ở cả hai đầu **phía trên (Top) và phía dưới (Bottom)** của phần tử với mức lớn số 5 (thường tương đương với 3rem = 48px).

### 3. Sự khác nhau giữa .container, .container-fluid, và .container-md:
* `.container`: Là khung chứa có độ rộng cố định (Fixed width) theo từng mốc màn hình. Trình duyệt sẽ tự động chừa khoảng trống đều hai bên lề để nội dung gom vào giữa trang, kích thước tối đa sẽ bị giới hạn (ví dụ: tối đa 1140px trên màn hình lớn).
* `.container-fluid`: Là khung chứa có độ rộng full-width **luôn luôn chiếm 100% chiều rộng** của màn hình ở mọi kích thước thiết bị, kéo tràn lề từ trái qua phải mà không bị giới hạn cố định.
* `.container-md`: Là khung chứa có tính chất lai ghép: Ở kích thước màn hình nhỏ dưới 768px, nó sẽ hành xử giống `.container-fluid` (chiếm trọn 100% chiều rộng). Tuy nhiên, kể từ mốc màn hình `md` (768px) trở lên, nó sẽ tự động kích hoạt tính chất cố định, gom nội dung vào giữa trang giống hệt `.container` thông thường.

### Phần C


## CÂU C1 

### 1. Quy trình đổi màu biến $primary sang #E63946:
Để đổi màu chủ đạo hệ thống của Bootstrap một cách chính thống, chúng ta không sửa trực tiếp vào file CSS đã biên dịch mà phải can thiệp vào mã nguồn SASS của Bootstrap thông qua các bước sau:
* **Công cụ cần thiết:** * Cài đặt NodeJS và gói biên dịch Sass (Dart-Sass) hoặc Extension **Live Sass Compiler** trên VS Code.
  * Tải mã nguồn Bootstrap định dạng SASS về máy (thông qua lệnh `npm install bootstrap` hoặc tải trực tiếp thư mục `scss` từ trang chủ Bootstrap).
* **Quy trình modify file:**
  1. Tạo một file SASS riêng của dự án, ví dụ đặt tên là `custom.scss`.
  2. Tiến hành khai báo đè giá trị màu mới cho biến `$primary` ngay trên đầu file: `$primary: #E63946;`
  3. Dùng lệnh `@import` để triệu hồi file cấu hình gốc của Bootstrap nằm trong thư mục node_modules ngay phía dưới biến vừa đổi.
  4. Chạy công cụ biên dịch file `custom.scss` này ra file `custom.css` để nhúng vào dự án HTML. Lúc này, toàn bộ các class liên quan như `.btn-primary`, `.bg-primary`, `.text-primary` sẽ tự động chuyển sang màu đỏ mới một cách đồng bộ.

### 2. Tại sao KHÔNG nên override trực tiếp kiểu `.btn-primary { background: red; }`?
* **Làm hỏng tính đồng bộ hệ thống:** Trong Bootstrap, màu `$primary` không chỉ áp dụng cho mỗi nút bấm. Nó còn liên kết chặt chẽ với hàng loạt class khác như màu nền (`.bg-primary`), màu chữ (`.text-primary`), màu viền bảng (`.table-primary`), trạng thái hoạt động của menu, các đường viền input khi click chuột vào, hiệu ứng đổ bóng... Nếu ta chỉ override cục bộ kiểu `.btn-primary`, tất cả các phần tử còn lại vẫn sẽ giữ màu xanh mặc định, khiến giao diện bị lệch lạc và thiếu nhất quán.
* **Tốn công sức viết đè trạng thái:** Một nút bấm tiêu chuẩn có rất nhiều trạng thái động (Hover, Active, Focus, Disabled). Nếu override thủ công bằng CSS thuần, ta sẽ phải viết đè cho từng trạng thái `.btn-primary:hover`, `.btn-primary:active`... Việc này cực kỳ mất thời gian và dễ sót. Trong khi đó, sửa biến SASS giúp Bootstrap tự động tính toán lại tất cả các trạng thái động này cho chúng ta chỉ bằng 1 dòng code.

---

## CÂU C2 

### 1. Bảng so sánh các tiêu chí dựa trên trải nghiệm thực tế:

| Tiêu chí so sánh | Phiên bản CSS thuần (Bài tập trước) | Phiên bản Bootstrap (Bài tập B1/B2) |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | Rất nhiều (Khoảng từ **150 - 300 dòng CSS** bao gồm cả reset, chia cột Grid, Flexbox, viết Media Queries thủ công cho Navbar và Card). | Gần như bằng **0 dòng CSS** (Chỉ cần tận dụng 100% hệ thống class tiện ích bổ trợ có sẵn trong thư viện). |
| **Thời gian phát triển** | **Chậm**. Phải tự tính toán tỉ lệ phần trăm, xử lý lỗi vỡ layout trên các trình duyệt, tự cấu hình hiệu ứng hover và responsive. | **Cực kỳ nhanh**. Chỉ cần ghép các class mẫu có sẵn lại với nhau là layout tự động lên phom khít tăm tắp, tiết kiệm đến 70% thời gian. |
| **Khả năng tùy biến** | **Vô hạn**. Bạn có toàn quyền kiểm soát cấu trúc code, muốn vẽ giao diện độc lạ, bo góc hay đổ bóng phức tạp thế nào cũng được. | **Bị giới hạn**. Giao diện dễ bị đóng khung theo "phong cách Bootstrap" đặc trưng trừ khi bạn có kỹ năng can thiệp sâu vào biến SASS nâng cao. |

### 2. Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?

* **NÊN dùng Bootstrap khi:**
  * Cần phát triển nhanh các dự án thương mại, dự án có thời gian gấp (Deadline ngắn).
  * Làm các trang quản trị (Admin Dashboard), trang quản lý nội dung nội bộ không đặt nặng tính sáng tạo độc nhất về mặt nghệ thuật mà ưu tiên tính mạch lạc, chuẩn hóa.
  * Khi làm việc trong các nhóm lớn (Teamwork), Bootstrap cung cấp một hệ thống quy chuẩn chung giúp tất cả lập trình viên nhìn vào class là hiểu ngay layout, tránh việc mỗi người viết CSS một kiểu lộn xộn.

* **KHÔNG NÊN dùng Bootstrap khi:**
  * Dự án đòi hỏi tính sáng tạo nghệ thuật cao, giao diện độc lạ, đậm chất thương hiệu riêng (như trang web portfolio nghệ sĩ, landing page giới thiệu sản phẩm xa xỉ sáng tạo).
  * Dự án cần tối ưu hóa dung lượng tuyệt đối (Lightweight web). Nhúng cả thư viện Bootstrap sẽ làm dư thừa rất nhiều CSS không dùng tới, làm chậm tốc độ tải trang ban đầu.
  * Khi bạn đang trong giai đoạn học lập trình Web căn bản. Lạm dụng Bootstrap quá sớm sẽ khiến bạn bị hổng tư duy cốt lõi về cách hoạt động của Flexbox, Grid Layout và Media Queries.

### TAILWIND

## Phần A

## CÂU A1 

Dưới đây là ý nghĩa chi tiết từng class được bóc tách từ đoạn mã HTML theo đúng định dạng yêu cầu:

### 1. Các class thuộc thẻ cha bao bọc ngoại vi (thẻ <div>):
* `flex` → display: flex (Kích hoạt bố cục Flexbox)
* `items-center` → align-items: center (Căn giữa các phần tử con theo trục dọc)
* `justify-content` -> justify-content: space-between (Đẩy khoảng cách các khối con ra hai đầu)
* `p-4` → padding: 1rem (16px) (Tạo khoảng đệm thụt vào lề 4 phía)
* `bg-white` → background-color: rgb(255 255 255) (Đổ màu nền trắng)
* `shadow-md` → box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06) (Đổ bóng mờ mức độ trung bình)
* `rounded-lg` → border-radius: 0.5rem (8px) (Bo tròn các góc kích thước lớn)
* `hover:shadow-xl` → Khi di chuột vào: box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1) (Tăng mạnh đổ bóng khi hover)
* `transition-shadow` → transition-property: box-shadow (Chỉ định hiệu ứng chuyển động mượt mà cho riêng thuộc tính đổ bóng)
* `duration-300` → transition-duration: 300ms (Thời gian chuyển động kéo dài 0.3 giây)

### 2. Các class thuộc thẻ hình ảnh đại diện (thẻ <img>):
* `w-16` → width: 4rem (64px) (Độ rộng khối ảnh)
* `h-16` → height: 4rem (64px) (Chiều cao khối ảnh)
* `rounded-full` → border-radius: 9999px (Bo tròn tuyệt đối tạo thành hình tròn)
* `object-cover` → object-fit: cover (Ép ảnh tự động cắt cúp lấp đầy khung chứa mà không bị méo/móp hình)

### 3. Các class thuộc khối bọc nội dung văn bản (thẻ <div> con):
* `ml-4` → margin-left: 1rem (16px) (Dịch lề căn cách về bên trái)
* `flex-1` → flex: 1 1 0% (Cho phép khối văn bản tự động phình to chiếm hết không gian còn trống ở giữa)

### 4. Các class thuộc thẻ tiêu đề Tên khách hàng (thẻ <h3>):
* `text-lg` → font-size: 1.125rem (18px); line-height: 1.75rem (Chỉnh cỡ chữ lớn)
* `font-semibold` → font-weight: 600 (Chỉnh nét chữ đậm vừa)
* `text-gray-800` → color: rgb(31 41 55) (Đổi màu chữ sang màu xám tối)
* `truncate` → overflow: hidden; text-overflow: ellipsis; white-space: nowrap (Nếu tên quá dài sẽ tự ngắt và thêm dấu ba chấm "...")

### 5. Các class thuộc thẻ đoạn văn Mô tả chức danh (thẻ <p>):
* `text-sm` → font-size: 0.875rem (14px); line-height: 1.25rem (Chỉnh cỡ chữ nhỏ)
* `text-gray-500` → color: rgb(107 114 128) (Đổi màu chữ sang màu xám nhạt)

### 6. Các class thuộc thẻ nút bấm tương tác (thẻ <button>):
* `px-4` → padding-left: 1rem (16px); padding-right: 1rem (16px) (Khoảng đệm lề trái/phải)
* `py-2` → padding-top: 0.5rem (8px); padding-bottom: 0.5rem (8px) (Khoảng đệm lề trên/dưới)
* `bg-blue-500` → background-color: rgb(59 130 246) (Đổ màu nền xanh dương tiêu chuẩn)
* `text-white` → color: rgb(255 255 255) (Màu chữ trắng)
* `rounded-md` → border-radius: 0.375rem (6px) (Bo tròn góc vừa)
* `hover:bg-blue-600` → Khi di chuột vào: background-color: rgb(37 99 235) (Đổi màu nền tối hơn khi hover)
* `focus:ring-2` → Khi click/tab tiêu điểm: box-shadow: 0 0 0 2px ... (Tạo vòng tròn viền ngoài dày 2px)
* `focus:ring-blue-300` → Chỉ định màu cho vòng viền tập trung là màu xanh nhạt để làm nổi bật nút bấm khi focus.

---

## CÂU A2 

### 1. Giải thích các Prefix Responsive:
TailwindCSS áp dụng triết lý thiết kế di động trước (Mobile-First). Các mốc kích thước được biểu diễn dưới dạng tiền tố (prefix) kết hợp với dấu hai chấm:
* `md:` (Medium) → Kích thước màn hình từ 768px trở lên (Máy tính bảng).
* `lg:` (Large) → Kích thước màn hình từ 1024px trở lên (Laptop).
* `xl:` (Extra Large) → Kích thước màn hình từ 1280px trở lên (Desktop PC).
* **Ví dụ:** Cụm class `md:grid-cols-2 lg:grid-cols-4` có nghĩa là: Mặc định trên màn hình điện thoại nhỏ sẽ hiển thị 1 cột; khi màn hình đạt kích thước máy tính bảng trở lên (`md`), lưới tự chia thành **2 cột**; và khi màn hình mở rộng lên kích thước máy tính lớn trở lên (`lg`), lưới sẽ tự động bẻ ra thành **4 cột**.

### 2. Giải thích State Modifiers (Trạng thái tương tác):
Là các bộ bổ trợ giúp viết trực tiếp các pseudo-class của CSS vào class HTML:
* `hover:` → Áp dụng thuộc tính CSS khi người dùng **di con trỏ chuột** qua phần tử (tương đương `:hover` trong CSS).
* `focus:` → Áp dụng thuộc tính khi phần tử đang được **chọn trúng/nhấp chuột vào** hoặc chuyển tab tới (tương đương `:focus` trong CSS, rất quan trọng với input và button).
* `active:` → Áp dụng thuộc tính tại đúng thời điểm người dùng **nhấn giữ chuột trái xuống** phần tử nhưng chưa thả ra (tương đương `:active`).
* `group-hover:` → Trạng thái nâng cao. Khi ta đặt class `group` ở thẻ cha, bất kỳ khi nào thẻ cha bị hover, thẻ con chứa class `group-hover:` sẽ tự động được kích hoạt hiệu ứng theo, dù chuột chưa trực tiếp chạm vào thẻ con đó.

### 3. Viết class Tailwind tương đương `d-none d-md-flex` của Bootstrap:
Cú pháp Tailwind chuẩn chỉnh áp dụng Mobile-First:
```text
hidden md:flex
```
# Phần C


## CÂU C1 

Để so sánh trực quan, em xin lấy cấu trúc của Component Product Card (Thẻ sản phẩm) được viết bằng hai phương pháp để phân tích:

### 1. HTML File Size (Kích thước file):
* Phiên bản CSS thuần: File HTML rất gọn và nhẹ (chỉ chứa cấu trúc thẻ và tên class ngắn gọn như class="product-card"). Tuy nhiên, dung lượng tổng thể bị phình to ở file .css đi kèm (nơi chứa hàng chục dòng thuộc tính chi tiết).
* Phiên bản TailwindCSS: Dung lượng file HTML sẽ lớn hơn (nặng hơn) do phải gánh một chuỗi dài các class tiện ích bổ trợ xếp chồng lên nhau (như class="w-full bg-white rounded-lg shadow-md hover:shadow-xl...").
* Kết luận: Tailwind dịch chuyển gánh nặng dung lượng từ file CSS sang file HTML. Xét về tổng dung lượng tải trang ban đầu (HTML + CSS), Tailwind vẫn tối ưu hơn nhờ thuật toán tái sử dụng class.

### 2. Maintainability (Khả năng bảo trì, dễ đọc, dễ sửa):
* Dễ sửa: TailwindCSS thắng thế tuyệt đối. Khi cần sửa giao diện của một card (ví dụ: đổi từ màu nền xám sang trắng, tăng độ bo góc), ta chỉ cần can thiệp trực tiếp vào file HTML của chính card đó. Hoàn toàn loại bỏ được nỗi sợ kinh điển của CSS thuần: Sửa một dòng CSS ở file bên ngoài vô tình làm vỡ layout của các trang khác sử dụng chung class.
* Dễ đọc: CSS thuần dễ đọc cấu trúc hơn. File HTML của Tailwind rất dễ bị rối mắt (hiện tượng Soup of Classes) do có quá nhiều ký tự viết liền nhau, đòi hỏi lập trình viên phải mất thời gian làm quen với các từ viết tắt của thư viện.

### 3. Reusability (Khả năng tái sử dụng):
* Với CSS thuần, ta tái sử dụng bằng cách gọi lại một tên class duy nhất (.product-card) ở nhiều nơi.
* Với TailwindCSS, nếu viết HTML thuần túy, ta phải copy-paste cả cụm class dài dòng rất bất tiện. Để giải quyết bài toán này, Tailwind cung cấp tính năng @apply trong file CSS cấu hình, cho phép gom một đống utility classes thành một class tên duy nhất (ví dụ gom thành .product-card-custom). Tuy nhiên trong thực tế với React, Vue hoặc Blade, người ta ưu tiên tái sử dụng bằng cách đóng gói nguyên cả đoạn HTML đó thành một Component độc lập để gọi lại cho gọn.

---

## CÂU C2 

### 1. Tại sao file CSS cuối cùng của Tailwind lại NHỎ HƠN Bootstrap CSS?
* Cơ chế của Bootstrap: File bootstrap.css chứa hàng ngàn dòng code được viết sẵn cho mọi component (từ Carousel, Modal, Accordion, Dropdown, hệ lưới Grid cho đến hàng trăm màu sắc...). Cho dù dự án của bạn vô cùng nhỏ và chỉ xài duy nhất một cái nút bấm, trình duyệt của người dùng vẫn bắt buộc phải tải về toàn bộ file CSS cồng kềnh đó (nặng khoảng 150KB - 200KB).
* Cơ chế của Tailwind: File CSS xuất xưởng (Production build) của Tailwind cực kỳ tí hon (thường chỉ dưới 10KB). Lý do là vì Tailwind không định nghĩa sẵn component. Số lượng utility classes là hữu hạn (chỉ xoay quanh margin, padding, color, flexbox). Dù trang web của bạn có phình to ra thêm 100 trang HTML mới, dung lượng file CSS của Tailwind vẫn giữ nguyên không tăng lên, vì các trang mới cũng chỉ tái sử dụng lại đống class padding/margin cũ mà thôi.

### 2. Giải thích cơ chế Tailwind PurgeCSS (Tailwind JIT - Just-In-Time):
* Bản chất: Kể từ phiên bản v3, Tailwind kích hoạt bộ engine biên dịch JIT (Just-In-Time). Thay vì tạo ra một file CSS khổng lồ chứa hàng triệu class từ đầu, Tailwind sẽ đứng im và quan sát hành vi viết code của bạn.
* Cơ chế hoạt động: Khi bạn nhấn Ctrl + S lưu file HTML, JIT sẽ quét qua toàn bộ các ký tự chữ trong file HTML đó. Chỉ những class nào thực sự được bạn gõ tên vào code thì JIT mới biên dịch thuộc tính CSS tương ứng của class đó bỏ vào file CSS cuối cùng.
* Nó loại bỏ gì? Nó loại bỏ 99% toàn bộ các class tiện ích còn lại trong thư viện mà bạn không dùng tới (ví dụ: bạn dùng màu xanh bg-blue-500 thì nó giữ lại thuộc tính đó, còn đống màu từ bg-red-100 đến bg-zinc-900 mà bạn không gõ vào sẽ bị quét sạch và xóa bỏ hoàn toàn, không cho lọt vào file build cuối cùng).

### 3. Khi nào KHÔNG nên dùng TailwindCSS? (2 tình huống cụ thể)

* Tình huống 1: Dự án làm việc với mã nguồn CMS cũ hoặc đối tác yêu cầu giao diện thô (Raw HTML/CSS).
Nếu bạn tham gia vào một dự án bảo trì hệ thống cũ không cấu hình được môi trường Webpack/Vite/NodeJS để chạy trình biên dịch JIT của Tailwind, việc nhúng file CDN Tailwind bừa bãi sẽ làm chậm tiến độ và gây xung đột nghiêm trọng với hệ thống CSS kế thừa có sẵn.

* Tình huống 2: Xây dựng các trang nội dung dài, thuần văn bản dạng Rich Text (Blog, Báo chí, Tài liệu học thuật).
Các nội dung này thường đổ ra từ cơ sở dữ liệu dưới dạng thẻ HTML thô (thẻ h1, p, ul) do người dùng nhập từ trình soạn thảo văn bản. Vì các thẻ này không thể chèn class Tailwind trực tiếp vào được, việc ép dùng Tailwind sẽ rất cực khổ. Lúc này, viết CSS thuần theo kiểu chọn thẻ truyền thống hoặc dùng plugin typography chuyên dụng sẽ nhanh và hiệu quả hơn rất nhiều.
