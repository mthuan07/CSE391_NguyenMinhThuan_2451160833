# Phần A

## CÂU A1 — 5 LOẠI POSITIONING

### 1. Bảng so sánh 5 thuộc tính Position trong CSS:

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use cases (Trường hợp sử dụng) |
| :--- | :--- | :--- | :--- | :--- |
| **static** | Có (Mặc định) | Theo luồng tự nhiên của văn bản | Có | Các phần tử văn bản, hình ảnh thông thường không cần dịch chuyển đặc biệt. |
| **relative** | Có | Vị trí ban đầu của chính nó | Có | Làm điểm tựa (gốc tọa độ) cho phần tử con dùng `absolute`; hoặc dịch chuyển nhẹ bằng top/left mà không làm xê dịch khối khác. |
| **absolute** | **Không** (Bị tách khỏi flow) | Phần tử tổ tiên gần nhất có position khác static | Có | Làm các icon thông báo trên góc ảnh, nút Close $(\times)$ của hộp thoại popup, hoặc các thẻ tag nhỏ nằm đè lên hình ảnh. |
| **fixed** | **Không** (Bị tách khỏi flow) | Khung hình trình duyệt (Viewport) | **Không** (Đứng yên một chỗ) | Thanh điều hướng (Navbar) luôn dính trên đỉnh đầu, nút "Cuộn lên đầu trang" hoặc hộp chat ở góc dưới màn hình. |
| **sticky** | Có (Khi chưa cuộn tới) $\rightarrow$ Không (Khi dính) | Luồng tự nhiên $\rightarrow$ Khung hình trình duyệt khi đạt điều kiện | Có | Tiêu đề của một bảng dữ liệu hoặc thanh danh mục chuyên mục (Sidebar) chạy dọc theo nội dung bài viết khi cuộn chuột. |

### 2. Trả lời câu hỏi thêm về Absolute Positioning:

* **Khái niệm "nearest positioned ancestor" (Tổ tiên được định vị gần nhất):** Có nghĩa là khi một phần tử được đặt `position: absolute`, trình duyệt sẽ lội ngược dòng lên các phần tử bọc bên ngoài nó (cha, ông, cố...) để tìm phần tử đầu tiên có thuộc tính `position` được cấu hình là một trong các giá trị: `relative`, `absolute`, `fixed`, hoặc `sticky` (tức là khác `static`).
* **Khi nào `absolute` tham chiếu parent?** Khi phần tử cha trực tiếp (parent) của nó được thiết lập thuộc tính `position: relative` (hoặc absolute/fixed/sticky). Lúc này, tọa độ `top: 0; left: 0;` của con sẽ nằm khít ở góc trên bên trái của cha.
* **Khi nào `absolute` tham chiếu body?** Khi tất cả các phần tử tổ tiên bao bọc bên ngoài nó đều **không** khai báo thuộc tính position (hoặc chỉ mang giá trị mặc định là `static`). Khi không tìm được điểm tựa nào, phần tử `absolute` sẽ lội ngược lên tận cùng và lấy khung chứa ban đầu của trang web (gốc tọa độ của thẻ `<body>` hoặc `<html>`) làm điểm tựa để tính toán vị trí.

---

## CÂU A2 — FLEXBOX VS GRID (DỰ ĐOÁN BỐ CỤC)

### /* Trường hợp 1 */
* **Bố cục:** 4 items nằm trên 1 hàng duy nhất. Chiều rộng của 4 items bằng nhau tuyệt đối (mỗi item chiếm đúng 25% chiều rộng của container) và chúng tự động co giãn để chia đều 100% không gian nhờ thuộc tính `flex: 1`.
* **Sơ đồ bố cục:**
```text
+-----------------------------------------------------------+
| [ Item 1 (25%) ] [ Item 2 (25%) ] [ Item 3 (25%) ] [ Item 4 (25%) ] |
+-----------------------------------------------------------+
```

### /* Trường hợp 2 */
* **Bố cục:** Gồm 3 hàng và 2 cột (tổng cộng 6 items). Do có thuộc tính `flex-wrap: wrap`, các item được phép rớt dòng khi hết chỗ. Mỗi item rộng 45% cộng với lề margin hai bên là 5% (tổng cộng 50% cho một item), vì vậy mỗi hàng chỉ chứa vừa khít đúng 2 items.
* **Sơ đồ bố cục:**
```text
+-----------------------------------------------------------+
|  [   Item 1 (45%)   ]           [   Item 2 (45%)   ]      |
|  [   Item 3 (45%)   ]           [   Item 4 (45%)   ]      |
|  [   Item 5 (45%)   ]           [   Item 6 (45%)   ]      |
+-----------------------------------------------------------+
```

### /* Trường hợp 3 */
* **Bố cục:** 3 items nằm trên 1 hàng duy nhất. Nhờ thuộc tính `justify-content: space-between`, Item 1 sẽ nằm dính sát vào lề bên trái, Item 3 dính sát vào lề bên phải, và Item 2 tự động căn vào chính giữa hàng. Thuộc tính `align-items: center` giúp cả 3 items được căn đều ở giữa theo chiều dọc (chiều cao) của khung chứa.
* **Sơ đồ bố cục:**
```text
+-----------------------------------------------------------+
| [Item 1]                 [Item 2]                 [Item 3]| -> (Căn giữa dọc)
+-----------------------------------------------------------+
```

### /* Trường hợp 4 */
* **Bố cục:** Gồm 1 hàng và 3 cột. Cột bên trái cố định kích thước 200px, cột bên phải cố định kích thước 200px. Cột ở giữa sử dụng đơn vị `1fr` nên sẽ tự động kéo giãn để chiếm trọn toàn bộ không gian còn lại ở giữa sau khi đã trừ đi kích thước hai cột hai bên và khoảng cách gap (20px).
* **Sơ đồ bố cục:**
```text
+-----------------------------------------------------------+
| [Col Left: 200px] |gap| [Col Center: 1fr] |gap| [Col Right: 200px] |
+-----------------------------------------------------------+
```

### /* Trường hợp 5 */
* **Bố cục:** Layout dạng lưới được chia cố định thành 3 cột bằng nhau nhờ lệnh `repeat(3, 1fr)`. Với tổng số 7 items, chúng sẽ được tự động xếp đều thành 3 hàng:
  * Hàng 1: Chứa Item 1, Item 2, Item 3.
  * Hàng 2: Chứa Item 4, Item 5, Item 6.
  * Hàng 3: Chỉ chứa duy nhất một mình Item 7 nằm ở ô đầu tiên bên trái (Cột 1). Hai ô còn lại của hàng này (Cột 2 và Cột 3) sẽ hoàn toàn để trống rỗng.
* **Sơ đồ bố cục:**
```text
+-----------------------------------------------------------+
| [  Item 1 (1fr)  ]    [  Item 2 (1fr)  ]    [  Item 3 (1fr)  ] |
| [  Item 4 (1fr)  ]    [  Item 5 (1fr)  ]    [  Item 6 (1fr)  ] |
| [  Item 7 (1fr)  ]    (Trống rỗng)          (Trống rỗng)       |
+-----------------------------------------------------------+
```


---

## 2. Các bước tiếp theo

Sau khi Thuận nhấn Copy khối mã bên trên và dán vào file thành công:
1. Lưu file `answers.md` lại (`Ctrl + S`).
2. Chạy lần lượt 3 câu lệnh Git thần thánh ở Git Bash để đẩy bài tập lên:
   ```bash
   git add .
   git commit -m "Hoàn thành toàn bộ câu trả lời Flexbox và Grid"
   git push
``

### Phần B
## Câu B1
# ảnh minh chứng 1
![alt text](screenshots/1.png)
# ảnh minh chứng 2
![alt text](screenshots/2.png)
# ảnh minh chứng 3
![alt text](screenshots/3.png)

# PHẦN C 

## CÂU C1 

### 1. Navigation bar ngang (logo + menu + buttons)
* **Lựa chọn:** Flexbox
* **Giải thích:** Thanh điều hướng là bố cục hiển thị theo 1 chiều (hàng ngang). Flexbox mạnh nhất ở khoản phân bổ không gian 1 chiều, giúp căn giữa các phần tử theo chiều dọc (align-items: center) và đẩy các khối ra hai đầu (justify-content: space-between) cực kỳ dễ dàng.

### 2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
* **Lựa chọn:** Grid
* **Giải thích:** Đây là bố cục dạng lưới 2 chiều (hàng và cột) đồng đều tăm tắp. Sử dụng Grid với thuộc tính `grid-template-columns: repeat(3, 1fr);` sẽ giúp các hình ảnh tự động lấp đầy vào lưới theo đúng tỷ lệ 3 cột mà không cần tính toán phần trăm lề phức tạp như Flexbox.

### 3. Layout blog: main content + sidebar
* **Lựa chọn:** Grid
* **Giải thích:** Với bộ khung lớn tổng thể của cả trang web (Page Layout) chia thành các vùng cố định rõ rệt (Cột nội dung chính chiếm phần lớn không gian, cột sidebar cố định 250px hoặc 300px), CSS Grid là lựa chọn tối ưu nhất để quản lý cấu trúc vĩ mô bền vững, không sợ bị xê dịch khi nội dung thay đổi.

### 4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
* **Lựa chọn:** Flexbox
* **Giải thích:** Mặc dù trông giống lưới nhưng thực chất Footer chỉ cần các cột sắp xếp nối đuôi nhau trên 1 chiều ngang và tự động rớt dòng hoặc co giãn linh hoạt tùy theo kích thước màn hình thiết bị (flex-wrap: wrap), không cần ép các hàng bên dưới phải khít ô tuyệt đối với hàng trên như Grid.

### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
* **Lựa chọn:** Flexbox
* **Giải thích:** Trục bố cục bên trong card chạy theo 1 chiều dọc (thành hàng dọc - column). Khi đặt `display: flex; flex-direction: column;` cho card, ta có thể áp dụng thuộc tính `margin-top: auto` cho nút bấm, ép nó luôn bám chặt vào đáy card dù đoạn text miêu tả ở giữa có dài ngắn không đều.

---

## CÂU C2 

### 1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
* **Nguyên nhân:** Do thuộc tính `display: flex` mặc định của khối cha `.card-container` chỉ làm cho các `.card` có chiều cao bằng nhau, nhưng bản thân bên trong mỗi `.card` chưa được kích hoạt Flexbox theo chiều dọc. Vì thế, nếu tiêu đề `h3` của card nào dài 2 dòng, nó sẽ đẩy nút bấm xuống dưới; card nào tiêu đề ngắn, nút bấm sẽ bị giật lên cao.
* **Code sửa lại:**
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}
.card { 
    width: 30%; 
    margin: 1.5%; 
    display: flex;
    flex-direction: column; 
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto; 
}

### 2. Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
* **Nguyên nhân:** Khối cha `.hero` tuy đã khai báo `display: flex` để kích hoạt Flexbox, nhưng lại thiếu hai thuộc tính căn chỉnh cốt lõi là `justify-content` (căn giữa theo trục ngang) và `align-items` (căn giữa theo trục dọc). Thiếu chúng, các phần tử con sẽ bị dồn về góc trái trên mặc định theo luồng văn bản.
* **Code sửa lại:**
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero-content {
    text-align: center;
}

### 3. Lỗi 3: Sidebar bị co lại khi content quá dài
* **Nguyên nhân:** Trong Flexbox, các phần tử con mặc định đều có thuộc tính `flex-shrink: 1`. Điều này có nghĩa là khi vùng không gian chứa nội dung chính (`.content`) quá dài và phình to ra, trình duyệt sẽ tự động bóp nghẹt chiều rộng của thằng bên cạnh (`.sidebar`) nhỏ hơn mức 250px quy định ban đầu để nhường chỗ.
* **Code sửa lại:**
.layout { display: flex; }
.sidebar { 
    width: 250px; 
    flex-shrink: 0; 
}
.content { flex: 1; }
