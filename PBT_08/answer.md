# PHẦN A 

## CÂU A1 — FUNCTION TYPES & HOISTING

### 1. Viết hàm tinhThueBaoHiem(luong) theo 3 cách:

* **Cách 1: Function Declaration (Khai báo hàm truyền thống)**
function tinhThueBaoHiemDecl(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
}

* **Cách 2: Function Expression (Biểu thức hàm)**
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
};

* **Cách 3: Arrow Function (Hàm mũi tên ngắn gọn)**
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue: thue, thuc_nhan: thuc_nhan };
};

### 2. Sự khác nhau về Hoisting giữa 3 cách và ví dụ minh họa:
Ba cách này **có sự khác biệt hoàn toàn** về cơ chế Hoisting.
* **Function Declaration:** Được bộ biên dịch JavaScript tự động đẩy toàn bộ nội dung thân hàm lên đỉnh đầu phạm vi trước khi thực thi. Do đó, bạn có thể gọi hàm trước khi viết code khai báo nó mà không gặp bất kỳ lỗi nào.
* **Function Expression & Arrow Function:** Bản chất là gán một hàm không tên vào một biến (khai báo bằng `const` hoặc `let`). Các biến này bị rơi vào vùng chết tạm thời (Temporal Dead Zone) nên bạn tuyệt đối không được phép gọi hàm trước dòng khai báo, nếu cố tình gọi sẽ gây lỗi sập chương trình.

* **Ví dụ code chứng minh:**
// Gọi thử cách 1 trước khi khai báo -> Chạy bình thường
console.log(tinhThueBaoHiemDecl(12000000)); 

function tinhThueBaoHiemDecl(luong) {
    return { thue: luong > 11000000 ? luong * 0.1 : 0 };
}

// Gọi thử cách 2 hoặc 3 trước khi khai báo -> Báo lỗi chết chương trình lập tức
console.log(tinhThueBaoHiemArrow(12000000)); 
// Lỗi: ReferenceError: Cannot access 'tinhThueBaoHiemArrow' before initialization

const tinhThueBaoHiemArrow = (luong) => {
    return { thue: luong > 11000000 ? luong * 0.1 : 0 };
};

---

## CÂU A2 — SCOPE & CLOSURE

### 1. Dự đoán Output cho Đoạn 1:
* `console.log(c.increment());`  --> `1` (Tăng count lên 1 và trả về)
* `console.log(c.increment());`  --> `2`
* `console.log(c.increment());`  --> `3`
* `console.log(c.decrement());`  --> `2` (Giảm count xuống 1 và trả về)
* `console.log(c.getCount());`   --> `2` (Lấy ra giá trị count hiện tại)
* *Giải thích:* Hàm `counter` tạo ra một môi trường bộ nhớ đóng kín lưu biến `count`. Nhờ cơ chế **Closure**, 3 hàm con được trả ra ngoài vẫn tiếp tục "nhớ" và dùng chung một biến `count` lưu trong môi trường ẩn đó, giúp giữ vững trạng thái dữ liệu mà bên ngoài không phá hoại được.

### 2. Dự đoán Output cho Đoạn 2:
* **Sau 100ms:** Màn hình in ra liền nhau 3 dòng:
  var: 3
  var: 3
  var: 3
* **Sau 200ms:** Màn hình in tiếp tục 3 dòng:
  let: 0
  let: 1
  let: 2

### 3. Giải thích chi tiết tại sao var và let cho kết quả khác nhau:
* **Đối với vòng lặp `var`:** Từ khóa `var` có tính chất Function/Global Scope (không có Block Scope). Cả 3 vòng lặp đều dùng chung một biến `i` toàn cục duy nhất. Tác vụ `setTimeout` là bất đồng bộ nên nó xếp hàng đợi. Khi vòng lặp chạy xong tích tắc, biến `i` toàn cục đã bị tăng kịch trần lên bằng 3. Khi hết 100ms, cả 3 hàm callback đồng loạt kích hoạt, chúng nhảy ra bộ nhớ toàn cục tìm biến `i` thì chỉ thấy số 3, do đó in ra 3 chữ số 3.
* **Đối với vòng lặp `let`:** Từ khóa `let` có tính chất **Block Scope** (phạm vi khối nhọn). Tại mỗi vòng lặp, JavaScript sẽ tự động tạo ra một ô nhớ scoped hoàn toàn mới và độc lập để khóa chặt giá trị của `j` tại thời điểm đó lại (tạo ra một Closure riêng cho mỗi vòng). Do đó, khi hết 200ms, mỗi hàm callback kích hoạt sẽ tìm về đúng ô nhớ đã khóa của mình để in ra các giá trị chính xác là 0, 1, 2.

---

## CÂU A3 — ARRAY METHODS MỘT DÒNG CODE

Cho mảng dữ liệu gốc ban đầu: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];`

1. Lấy các số chẵn:
const res1 = nums.filter(n => n % 2 === 0);

2. Nhân mỗi số với 3:
const res2 = nums.map(n => n * 3);

3. Tính tổng tất cả:
const res3 = nums.reduce((acc, curr) => acc + curr, 0);

4. Tìm số đầu tiên > 7:
const res4 = nums.find(n => n > 7);

5. Kiểm tra CÓ số > 10 không:
const res5 = nums.some(n => n > 10);

6. Kiểm tra TẤT CẢ đều > 0:
const res6 = nums.every(n => n > 0);

7. Tạo mảng "Số X là [chẵn/lẻ]":
const res7 = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

8. Đảo ngược mảng (không làm biến đổi/mutate mảng gốc):
const res8 = [...nums].reverse();

---

## CÂU A4 — OBJECT DESTRUCTURING & SPREAD OPERATOR

### 1. Dự đoán Output phần Destructuring:
* `console.log(name, price, ram, color);`  --> `iPhone 16 25990000 8 Titan`
* `console.log(specs);`                     --> `ReferenceError: specs is not defined`
* *Giải thích lỗi:* Khi chúng ta dùng cú pháp bóc tách lồng nhau `specs: { ram, color }`, JS hiểu là chúng ta đi sâu vào trong để bốc trực tiếp hai biến lẻ là `ram` và `color` ra ngoài, chứ bản thân cái biến trung gian `specs` hoàn toàn không được tạo ra ở phạm vi bên ngoài, do đó gọi nó sẽ báo lỗi chưa định nghĩa.

### 2. Dự đoán Output phần Spread (Cập nhật giá):
* `console.log(updated.price);`            --> `23990000`
* `console.log(updated.sale);`             --> `true`
* `console.log(product.price);`            --> `25990000`
* *Giải thích:* Phép toán giải bọc dấu ba chấm `{ ...product }` đã sao chép các giá trị thô sang một đối tượng vùng nhớ mới hoàn toàn tên là `updated`. Vì vậy, khi ta ghi đè thuộc tính `price` trên `updated`, đối tượng gốc `product` vẫn được giữ nguyên vẹn giá trị ban đầu mà không hề bị ảnh hưởng.

### 3. Dự đoán Output phần Spread Gotcha (Lỗi vùng nhớ nông):
* `console.log(product.specs.ram);`        --> `16`
* **Tại sao kết quả bằng 16 mà không phải bằng 8?** Đây chính là lỗi hiểm hóc gọi là **Shallow Copy (Sao chép nông)** trong JavaScript. Phép toán spread `{ ...product }` chỉ sao chép được một tầng bề nổi của các thuộc tính dạng thô (như `name`, `price`). Còn thuộc tính `specs` bên trong bản chất là một Object phức tạp chứa một cái "địa chỉ ô nhớ" trỏ đi chỗ khác. Khi spread, nó chỉ copy cái địa chỉ đó sang đối tượng `copy`. Kết quả là cả `product.specs` và `copy.specs` đều đang dắt tay nhau trỏ chung vào **duy nhất một ô nhớ chứa ram và storage** dưới tầng lõi. Do đó, khi Thuận sửa `copy.specs.ram = 16`, cấu trúc ruột của `product` gốc cũng sẽ bị thay đổi theo lập tức.

