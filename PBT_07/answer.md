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


# PHẦN C 

## CÂU C1 — DEBUG JAVASCRIPT

Đoạn mã đề bài cung cấp chứa tổng cộng 6 lỗi từ lỗi cú pháp logic cho đến lỗi bộ nhớ bất đồng bộ. Dưới đây là phần bóc tách chi tiết:

### 1. Danh sách 6 lỗi, giải thích và cách sửa:

* Lỗi 1: Phép gán sai logic tại câu lệnh điều kiện (giaSauGiam = 0)
  - Giải thích: Đề bài đang viết "if (giaSauGiam = 0)". Dấu "=" duy nhất là phép gán giá trị, biến giaSauGiam bị ép về số 0 (Falsy) nên khối lệnh bên trong không bao giờ chạy. Muốn so sánh ta bắt buộc phải dùng dấu "==" hoặc "===".
  - Cách sửa: Đổi thành "if (giaSauGiam === 0)".

* Lỗi 2: Kiểu dữ liệu không chuẩn xác ở dòng test 1 ("100000")
  - Giải thích: Tham số đầu tiên truyền vào là một chuỗi chữ "100000". Dù JavaScript có cơ chế ép kiểu ngầm khi làm phép toán nhân/chia, việc để kiểu dữ liệu không chuẩn xác ngay từ đầu rất dễ gây lỗi toán học nếu cấu trúc tính toán phức tạp hơn hoặc khi cộng chuỗi.
  - Cách sửa: Sửa lại lúc gọi hàm test thành kiểu số chuẩn: tinhGiaGiamGia(100000, 20).

* Lỗi 3: Lỗi ẩn liên quan đến từ khóa "var" trong vòng lặp kết hợp setTimeout
  - Giải thích: Vòng lặp đang dùng "for (var i = 0; i < 5; i++)". Vì từ khóa "var" không có tính chất Block Scope (phạm vi khối nhọn) mà hoạt động theo cơ chế Function/Global Scope, biến i bị đẩy ra ngoài phạm vi vòng lặp thành biến toàn cục. Hàm setTimeout là tác vụ bất đồng bộ, nó sẽ đợi 1 giây mới chạy. Trong 1 giây đó, vòng lặp for đồng bộ đã chạy xong vèo một cái và tăng giá trị i lên bằng 5. Khi hết 1 giây, cả 5 hàm callback của setTimeout đồng loạt kích hoạt, chúng lấy giá trị i hiện tại ở bộ nhớ toàn cục (đang bằng 5) để in ra. Kết quả là màn hình xuất hiện 5 dòng chữ "Item 5" giống hệt nhau thay vì chạy từ 0 đến 4.
  - Cách sửa: Thay thế từ khóa "var" thành "let": for (let i = 0; i < 5; i++). Từ khóa "let" có tính chất Block Scope, tại mỗi vòng lặp nó sẽ tự động tạo ra một phạm vi bộ nhớ đóng kín riêng biệt để lưu giữ chính xác giá trị i tại vòng lặp đó cho hàm setTimeout.

* Lỗi 4: Thiếu kiểm tra kiểu dữ liệu đầu vào (Validation)
  - Giải thích: Hàm không hề chặn trường hợp nếu người dùng truyền chuỗi chữ không thể đổi thành số (như truyền vào chữ "abc").
  - Cách sửa: Bổ sung điều kiện kiểm tra isNaN(giaBan) hoặc isNaN(phanTramGiam) lên đầu hàm.

* Lỗi 5: Trả về thông báo lỗi dạng Chuỗi chữ trộn lẫn với phép tính số
  - Giải thích: Khi phanTramGiam > 100, hàm trả về chuỗi "Phần trăm giảm không hợp lệ". Khi gán chuỗi này vào phép toán cộng chuỗi ở dòng test 2: console.log("Giá: " + gia2) -> Giao diện sẽ in ra dòng chữ "Giá: Phần trăm giảm không hợp lệ", nhìn rất thiếu chuyên nghiệp và dễ gây lỗi hệ thống nếu hàm này nằm trong một chuỗi tính toán hóa đơn lớn.
  - Cách sửa: Trả về giá trị null hoặc ném ra một lỗi rõ ràng.

* Lỗi 6: Lỗi thiếu dấu chấm phẩy (Semicolon) kết thúc câu lệnh ở một số dòng
  - Giải thích: JavaScript có cơ chế tự chèn dấu chấm phẩy (ASI), tuy nhiên việc thiếu dấu chấm phẩy ở cuối các dòng gán biến giamGia, return giaSauGiam làm code lỏng lẻo và dễ bị lỗi dính dòng khi gộp file (Minify code).
  - Cách sửa: Thêm dấu ";" đầy đủ vào cuối mỗi câu lệnh.

### 2. Đoạn code sau khi đã được Refactor sạch lỗi hoàn chỉnh:

function tinhGiaGiamGia(giaBan, phanTramGiam) {
    const gia = Number(giaBan);
    const phanTram = Number(phanTramGiam);

    if (isNaN(gia) || isNaN(phanTram) || phanTram < 0 || phanTram > 100) {
        return null; 
    }
    
    const giamGia = (gia * phanTram) / 100;
    const giaSauGiam = gia - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + (gia !== null ? gia + "đ" : "Lỗi dữ liệu"));

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + (gia2 !== null ? gia2 + "đ" : "Phần trăm giảm không hợp lệ"));

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}

---

## CÂU C2 — BÀI TOÁN THỰC TẾ: TÍNH HÓA ĐƠN NHÀ HÀNG

Dưới đây là mã nguồn thuật toán tính toán chiết khấu, dồn thuế VAT, cộng phí dịch vụ và định dạng bảng hóa đơn thỏi vuông vắn bằng hàm padEnd và padStart trong JavaScript:

/**
 * Hàm in hóa đơn chi tiết cho nhà hàng
 * @param {Array} items - Danh sách món [{ name: "Tên", price: giá, quantity: số lượng }]
 * @param {boolean} isWednesday - Hôm nay có phải là thứ 4 không (true/false)
 * @param {number} tipPercentage - Phần trăm tiền Tip tùy chọn (mặc định là 5)
 */
function inHoaDonNhaHang(items, isWednesday = false, tipPercentage = 5) {
    let tongCongTho = 0;
    for (let i = 0; i < items.length; i++) {
        tongCongTho += items[i].price * items[i].quantity;
    }

    let phanTramGiamGia = 0;
    if (tongCongTho > 1000000) {
        phanTramGiamGia = 15; 
    } else if (tongCongTho > 500000) {
        phanTramGiamGia = 10; 
    }

    if (isWednesday) {
        phanTramGiamGia += 5;
    }

    let tienGiamGia = (tongCongTho * phanTramGiamGia) / 100;
    let tienSauGiam = tongCongTho - tienGiamGia;

    let tienVAT = (tienSauGiam * 8) / 100;
    let tienTip = (tienSauGiam * tipPercentage) / 100;

    let tongThanhToan = tienSauGiam + tienVAT + tienTip;

    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("╠══════════════════════════════════════╣");

    for (let i = 0; i < items.length; i++) {
        const mon = items[i];
        const stringGiaMon = `${mon.price / 1000}k`;
        const stringThanhTienMon = `${(mon.price * mon.quantity) / 1000}k`;
        
        let textDongMon = `║ ${i + 1}. ${mon.name.padEnd(10)} x${mon.quantity}    @${stringGiaMon.padEnd(4)} = ${stringThanhTienMon}`;
        textDongMon = textDongMon.padEnd(39) + "║";
        console.log(textDongMon);
    }

    console.log("╠══════════════════════════════════════╣");
    
    function inDongTongKet(nhan, soTien) {
        const soFormat = String(soTien.toLocaleString('vi-VN')) + "đ";
        let textDong = `║ ${nhan.padEnd(20)} ${soFormat.padStart(15)}`;
        console.log(textDong.padEnd(39) + "║");
    }

    inDongTongKet("Tổng cộng:", tongCongTho);
    inDongTongKet(`Giảm giá (${phanTramGiamGia}%):`, tienGiamGia);
    inDongTongKet("VAT (8%):", tienVAT);
    inDongTongKet(`Tip (${tipPercentage}%):`, tienTip);

    console.log("╠══════════════════════════════════════╣");
    inDongTongKet("THANH TOÁN:", tongThanhToan);
    console.log("╚══════════════════════════════════════╝");
}

const danhSachMonAn = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];

inHoaDonNhaHang(danhSachMonAn, false, 5);