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
