# PHẦN A 

## CÂU A1 — VAR / LET / CONST (HOISTING & SCOPE)

### 1. Dự đoán và kết quả chạy thực tế:

* **Đoạn 1:**
  * Dự đoán & Thực tế: `undefined`
  * Giải thích kết quả bất ngờ: Do cơ chế **Hoisting** của từ khóa `var`. Trình duyệt tự động đẩy phần khai báo `var x;` lên đỉnh đầu file trước khi chạy lệnh console.log, nhưng giá trị `= 5` thì vẫn nằm lại ở dòng dưới. Nên dòng code tương đương việc in một biến đã khai báo nhưng chưa gán giá trị $\rightarrow$ kết quả là `undefined`.

* **Đoạn 2:**
  * Dự đoán & Thực tế: `ReferenceError: Cannot access 'y' before initialization`
  * Giải thích: Từ khóa `let` và `const` cũng bị hoisting nhưng chúng bị đưa vào một vùng nhớ tạm gọi là **Temporal Dead Zone (Vùng chết tạm thời)**. Bạn tuyệt đối không được phép sờ hay gọi biến đó trước dòng khai báo chính thức, nếu không hệ thống sẽ lập tức báo lỗi chết chương trình.

* **Đoạn 3:**
  * Dự đoán & Thực tế: `TypeError: Assignment to constant variable.`
  * Giải thích: Biến khai báo bằng từ khóa `const` là hằng số dữ liệu thô (primitive), sau khi gán giá trị lần đầu tiên thì không bao giờ được phép dùng dấu `=` để gán hoặc thay đổi sang một giá trị khác nữa.

* **Đoạn 4:**
  * Dự đoán & Thực tế: `[1, 2, 3, 4]`
  * Giải thích kết quả bất ngờ: Ủa sao `const` ở đoạn 3 không cho sửa mà đoạn 4 lại cho push? Đó là vì `arr` là một Object/Array (kiểu dữ liệu tham chiếu - Reference type). Từ khóa `const` ở đây chỉ bảo vệ cái "địa chỉ ô nhớ" của mảng không bị thay đổi bằng dấu `=`, chứ nó không cấm chúng ta sửa đổi hay thêm bớt các phần tử ruột nằm bên trong ô nhớ đó.

* **Đoạn 5:**
  * Dự đoán & Thực tế: 
    Trong block: 2
    Ngoài block: 1
  * Giải thích: Do `let` hoạt động theo cơ chế **Block Scope** (phạm vi trong cặp dấu ngoặc nhọn `{}`). Biến `let a = 2` nằm trong khối ngoặc nhọn là một biến hoàn toàn độc lập, khi đi ra ngoài ngoặc nhọn nó sẽ tự động bị hủy, nhường lại không gian cho biến `let a = 1` ở phạm vi toàn cục (Global Scope).

---

## CÂU A2 — DATA TYPES & COERCION (ÉP KIỂU TỰ ĐỘNG)

### 1. Dự đoán và kết quả chạy thực tế:
* `console.log(typeof null);`              --> `"object"` (Đây là một bug/lỗi kinh điển từ thuở sơ khai của JavaScript nhưng không được sửa vì sợ vỡ hệ thống web cũ).
* `console.log(typeof undefined);`         --> `"undefined"`
* `console.log(typeof NaN);`              --> `"number"` (NaN viết tắt của Not a Number, nhưng trong hệ thống kiểu dữ liệu, nó vẫn thuộc nhóm số thực).
* `console.log("5" + 3);`                 --> `"53"`
* `console.log("5" - 3);`                 --> `2`
* `console.log("5" * "3");`              --> `15`
* `console.log(true + true);`            --> `2` (Trong toán học JS, `true` bị ép kiểu thành số 1, nên 1 + 1 = 2).
* `console.log([] + []);`                --> `""` (Mảng rỗng chuyển thành chuỗi rỗng).
* `console.log([] + {});`                --> `"[object Object]"`
* `console.log({} + []);`                --> `"[object Object]"` (Hoặc `0` tùy thuộc vào môi trường console chạy dòng lệnh).

### 2. Giải thích tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau:
* Toán tử cộng `+` trong JavaScript gánh hai nhiệm vụ: Vừa làm toán cộng vừa làm nhiệm vụ **nối chuỗi**. Khi thấy một trong hai vế là một Chuỗi văn bản (`"5"`), JS sẽ lập tức ưu tiên tính năng nối chuỗi, tự động chuyển số `3` thành chuỗi `"3"` và dính chúng lại thành `"53"`.
* Toán tử trừ `-` (hoặc nhân `*`, chia `/`) thì **chỉ có duy nhất một nhiệm vụ là làm toán**. Do đó khi gặp `"5" - 3`, JS sẽ kích hoạt cơ chế ép kiểu ngầm, cố gắng ép chuỗi văn bản `"5"` về thành số thực `5` để làm phép toán trừ thông thường $\rightarrow$ kết quả thu được bằng số `2`.

---

## CÂU A3 — SO SÁNH TRÙNG KHỚP (== VS ===)

### 1. Dự đoán kết quả true/false:
* `console.log(5 == "5");`                --> `true` (Vì toán tử `==` chỉ so sánh giá trị sau khi đã tự ép kiểu ngầm về cùng loại).
* `console.log(5 === "5");`               --> `false` (Vì toán tử `===` bắt buộc so sánh cả Giá trị và Kiểu dữ liệu - Number khác String).
* `console.log(null == undefined);`       --> `true` (Quy tắc đặc biệt được quy định trong đặc tả ECMAScript).
* `console.log(null === undefined);`      --> `false`
* `console.log(NaN == NaN);`             --> `false` (NaN là giá trị duy nhất trong JavaScript không bằng chính nó).
* `console.log(0 == false);`             --> `true` (Vì `false` bị ép kiểu thành số 0).
* `console.log(0 === false);`            --> `false` (Khác kiểu dữ liệu).
* `console.log("" == false);`             --> `true` (Chuỗi rỗng ép kiểu thành số 0, `false` cũng là số 0).

### 2. Quy tắc áp dụng cho tương lai:
Từ giờ trở đi, em **luôn luôn nên dùng toán tử `===` (Strict Equality)**. 
* **Tại sao?** Vì dùng `===` giúp mã nguồn tường minh, kiểm soát chặt chẽ kiểu dữ liệu đầu vào đầu ra, ngăn chặn hoàn toàn những lỗi logic ngầm vô cùng ảo ma và khó lường do cơ chế tự động ép kiểu của dấu `==` gây ra. Chỉ dùng `==` khi bạn thực sự hiểu rõ mình đang muốn ép kiểu (ví dụ kiểm tra nhanh một biến có phải `null` hoặc `undefined` bằng cụm `if (x == null)`).

---

## CÂU A4 — TRUTHY & FALSY VALUES

### 1. Danh sách TẤT CẢ các giá trị Falsy trong JavaScript:
Trong JavaScript, chỉ có duy nhất **8 giá trị** sau đây được định danh là Falsy (luôn trả về false khi đưa vào câu lệnh điều kiện):
1. `false` (chính từ khóa false)
2. `0` (số không)
3. `-0` (số âm không)
4. `0n` (kiểu BigInt số không)
5. `""` hoặc `''` hoặc `Template literal rỗng` (Chuỗi văn bản hoàn toàn rỗng)
6. `null` (giá trị rỗng/không có gì)
7. `undefined` (biến chưa xác định giá trị)
8. `NaN` (giá trị không phải là số)

### 2. Dự đoán kết quả in ra màn hình:
* `if ("0") console.log("A");`           --> **Có in chữ A** (Chuỗi chứa ký tự "0" là chuỗi có nội dung $\rightarrow$ thuộc nhóm Truthy).
* `if ("") console.log("B");`            --> Không in (Chuỗi rỗng là Falsy).
* `if ([]) console.log("C");`            --> **Có in chữ C** (Mảng rỗng trong JS vẫn là một Object $\rightarrow$ thuộc nhóm Truthy).
* `if ({}) console.log("D");`            --> **Có in chữ D** (Object rỗng vẫn thuộc nhóm Truthy).
* `if (null) console.log("E");`          --> Không in (null là Falsy).
* `if (0) console.log("F");`             --> Không in (số 0 là Falsy).
* `if (-1) console.log("G");`            -->
