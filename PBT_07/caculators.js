/**
 * Hàm thực hiện các phép tính toán học cơ bản giữa hai số
 * @param {any} num1 - Số thứ nhất
 * @param {string} operator - Toán tử tính toán (+, -, *, /, %, **)
 * @param {any} num2 - Số thứ hai
 * @returns {number|string} - Kết quả phép tính hoặc thông báo lỗi tương ứng
 */
function calculate(num1, operator, num2) {
    // 1. Kiểm tra Edge Case: Input đầu vào phải là số hợp lệ
    // (Dùng typeof hoặc isNaN kết hợp để bắt cả trường hợp chuỗi chữ "abc")
    if (typeof num1 === "string" || typeof num2 === "string" || isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // 2. Ép kiểu tường minh về dạng số để làm toán chính xác
    const n1 = Number(num1);
    const n2 = Number(num2);

    // 3. Sử dụng cấu trúc switch-case để phân loại toán tử và xử lý
    switch (operator) {
        case "+":
            return n1 + n2;
        case "-":
            return n1 - n2;
        case "*":
            return n1 * n2;
        case "/":
            // Kiểm tra Edge Case: Chia cho số 0
            if (n2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return n1 / n2;
        case "%":
            // Kiểm tra Edge Case: Chia lấy dư cho số 0
            if (n2 === 0) {
                return "Lỗi: Không thể chia cho 0";
            }
            return n1 % n2;
        case "**":
            return n1 ** n2; // Phép toán lũy thừa thế hệ mới của JavaScript
        
        // 4. Kiểm tra Edge Case: Toán tử truyền vào bị sai/không hợp lệ
        default:
            return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// ==========================================================================
// BỘ DỮ LIỆU SỬ DỤNG ĐỂ KIỂM TRA (TEST CASES)
// ==========================================================================
console.log(calculate(10, "+", 5));    // Hợp lệ: → 15
console.log(calculate(10, "/", 0));    // Bắt lỗi: → "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // Bắt lỗi: → "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // Bắt lỗi: → "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // Hợp lệ: → 1024

// Test thêm các trường hợp đặc biệt khác để kiểm tra độ cứng của hàm
console.log(calculate(15, "%", 4));    // Hợp lệ: → 3 (15 chia 4 dư 3)
console.log(calculate(10, "%", 0));    // Bắt lỗi: → "Lỗi: Không thể chia cho 0"