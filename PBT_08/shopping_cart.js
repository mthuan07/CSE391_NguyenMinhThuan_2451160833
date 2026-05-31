/**
 * Khởi tạo một mô-đun quản lý giỏ hàng sử dụng cơ chế Closure
 * @returns {Object} Bộ các phương thức tương tác công khai công khai
 */
function createCart() {
    // 1. DỮ LIỆU ĐÓNG KÍN (PRIVATE DATA)
    let items = []; // Mảng chứa các sản phẩm [{ id, name, price, quantity }]
    let currentDiscountCode = null; // Lưu mã giảm giá đang áp dụng

    // 2. TRẢ VỀ CÁC PHƯƠNG THỨC TƯƠNG TÁC BIẾN ĐỔI (PUBLIC API)
    return {
        // a. Thêm sản phẩm (nếu sản phẩm đã tồn tại -> tăng quantity)
        addItem(product, quantity = 1) {
            // Kiểm tra xem sản phẩm đã nằm trong giỏ hàng chưa bằng cách tìm kiếm theo ID
            const existingItem = items.find(item => item.id === product.id);
            
            if (existingItem) {
                // Nếu có rồi, cộng dồn số lượng thêm vào
                existingItem.quantity += quantity;
            } else {
                // Nếu chưa có, clone product và nhét thêm thuộc tính quantity vào mảng
                items.push({ ...product, quantity: quantity });
            }
        },
        
        // b. Xóa sản phẩm ra khỏi giỏ hàng theo ID
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // c. Cập nhật số lượng của một sản phẩm chỉ định
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                // Nếu số lượng cập nhật <= 0, tự động xóa sản phẩm khỏi giỏ
                this.removeItem(productId);
                return;
            }
            const targetItem = items.find(item => item.id === productId);
            if (targetItem) {
                targetItem.quantity = newQuantity;
            }
        },
        
        // d. Tính tổng số tiền cuối cùng sau khi áp mã chiết khấu (nếu có)
        getTotal() {
            // Tính tổng tiền thô trước giảm giá
            const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Nếu giỏ hàng trống, số tiền thanh toán hiển nhiên bằng 0
            if (subTotal === 0) return 0;

            // Biện luận xử lý mã giảm giá chi tiết
            switch (currentDiscountCode) {
                case "SALE10":
                    return subTotal * 0.9;  // Giảm 10% -> Tính 90% tiền
                case "SALE20":
                    return subTotal * 0.8;  // Giảm 20% -> Tính 80% tiền
                case "FREESHIP":
                    const totalAfterFreeship = subTotal - 30000;
                    return totalAfterFreeship < 0 ? 0 : totalAfterFreeship; // Tránh tiền âm
                default:
                    return subTotal; // Không có mã hoặc mã không hợp lệ
            }
        },
        
        // e. Áp dụng mã giảm giá vào hệ thống
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscountCode = code;
                console.log(`[Hệ thống]: Áp dụng mã giảm giá "${code}" thành công!`);
            } else {
                console.log(`[Hệ thống]: Mã giảm giá "${code}" không tồn tại hoặc không hợp lệ.`);
            }
        },
        
        // f. Lấy tổng số lượng tất cả sản phẩm đang có trong giỏ (Tổng số quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        
        // g. Xóa trắng toàn bộ giỏ hàng
        clearCart() {
            items = [];
            currentDiscountCode = null;
        },

        // h. ĐỊNH DẠNG VÀ IN GIỎ HÀNG DẠNG BẢNG KHÍT KHUNG (RỘNG CHUẨN 58 KÝ TỰ)
        printCart() {
            console.log("┌────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm           │ SL │ Đơn giá      │ Tổng      │");
            console.log("├────────────────────────────────────────────────────────┤");

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const sttStr = String(i + 1).padEnd(1);
                const nameStr = item.name.padEnd(18);
                const qtyStr = String(item.quantity).padStart(2);
                const priceStr = item.price.toLocaleString("vi-VN").padStart(12);
                const totalStr = (item.price * item.quantity).toLocaleString("vi-VN").padStart(10);
                
                console.log(`│ ${sttStr} │ ${nameStr} │ ${qtyStr} │ ${priceStr} │ ${totalStr} │`);
            }

            console.log("├────────────────────────────────────────────────────────┤");
            
            // Tính số tiền in ra cuối bảng
            const finalTotal = this.getTotal();
            let discountInfo = "";
            if (currentDiscountCode) {
                discountInfo = ` (Đã áp mã ${currentDiscountCode})`;
            }

            const totalString = `${finalTotal.toLocaleString("vi-VN")}đ${discountInfo}`;
            // Căn lề đẩy dòng tổng cộng dính sát lề phải khung 58 ký tự
            let footerLine = `│ Tổng cộng:${totalString.padStart(43)}`;
            console.log(footerLine.padEnd(57) + "│");
            console.log("└────────────────────────────────────────────────────────┘");
        }
    };
}

// ==========================================================================
// CHƯƠNG TRÌNH CHẠY THỬ (TEST CASES ĐÚNG THEO YÊU CẦU ĐỀ BÀI)
// ==========================================================================
const cart = createCart();

// 1. Thêm sản phẩm lần đầu
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);

// 2. Thêm trùng sản phẩm iPhone 16 -> Kỳ vọng số lượng tự động tăng lên thành 2
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

// 3. In giỏ hàng lần 1 (Chưa áp mã giảm giá)
console.log("\n=== GIỎ HÀNG CHƯA GIẢM GIÁ ===");
cart.printCart();

// 4. Áp mã SALE10 giảm giá 10% và in lại
console.log("\n=== ÁP MẠ CHIẾT KHẤU ===");
cart.applyDiscount("SALE10");
cart.printCart();

// 5. Kiểm tra hàm lấy tổng số lượng sản phẩm (Kỳ vọng: 2 iPhone + 2 AirPods = 4)
console.log("Số SP trong giỏ hiện tại:", cart.getItemCount()); // Kết quả: → 4

// 6. Xóa sản phẩm AirPods Pro (ID = 3) ra khỏi hệ thống giỏ hàng
cart.removeItem(3);
console.log("Sau khi xóa AirPods Pro, Số SP còn lại:", cart.getItemCount()); // Kết quả: → 2