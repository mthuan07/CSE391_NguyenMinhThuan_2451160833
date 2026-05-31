// ==========================================================================
// THỬ THÁCH 1: PIPE FUNCTION (Nối chuỗi các hàm liên tiếp từ trái qua phải)
// ==========================================================================
/**
 * Hàm nhận vào danh sách các hàm và trả về một hàm mới bọc chuỗi xử lý
 * @param {...Function} fns - Danh sách các hàm truyền vào dạng rest parameter
 */
function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị ban đầu (initialValue)
    return function(initialValue) {
        // Sử dụng phương thức .reduce() của mảng để truyền giá trị luân phiên qua từng hàm
        return fns.reduce((currentValue, currentFn) => {
            return currentFn(currentValue);
        }, initialValue);
    };
}

// Chạy thử kiểm tra Pipe Function
const processWorkflow = pipe(
    x => x * 2,        // Đầu vào 5 -> nhân đôi thành 10
    x => x + 10,       // 10 -> cộng 10 thành 20
    x => x.toString(), // 20 -> ép kiểu chuỗi "20"
    x => "Kết quả: " + x
);

console.log("=== TEST 1: PIPE FUNCTION ===");
console.log(processWorkflow(5)); // Kết quả kỳ vọng: → "Kết quả: 20"


// ==========================================================================
// THỬ THÁCH 2: MEMOIZE FUNCTION (Bộ nhớ đệm Cache lưu trữ kết quả tính toán)
// ==========================================================================
/**
 * Hàm nhận vào một hàm tính toán nặng và trả về hàm mới có khả năng lưu cache
 * @param {Function} fn - Hàm gốc cần tối ưu hóa
 */
function memoize(fn) {
    // Khởi tạo một kho lưu trữ đóng kín (Private Cache Object) bằng cơ chế Closure
    const cache = {};

    return function(...args) {
        // Chuyển mảng các tham số truyền vào thành một chuỗi Key (ví dụ: "[1000000]")
        const key = JSON.stringify(args);

        // Nếu Key này đã từng được tính toán và lưu trong kho cache từ trước
        if (key in cache) {
            return cache[key]; // Trả về ngay kết quả cũ mà không cần tính lại
        }

        // Nếu chưa có trong cache, tiến hành chạy hàm gốc để lấy kết quả
        const result = fn(...args);
        // Lưu kết quả mới vào kho cache để dùng cho các lần sau
        cache[key] = result;
        return result;
    };
}

// Chạy thử kiểm tra Memoize Function
const expensiveCalc = memoize((n) => {
    console.log("Đang tính toán (Hàm gốc chạy)...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== TEST 2: MEMOIZE (CACHE) ===");
console.log(cartResult1 = expensiveCalc(1000000)); // Lần 1: Hiện "Đang tính toán..." -> 499999500000
console.log(cartResult2 = expensiveCalc(1000000)); // Lần 2: Lấy thẳng từ Cache, KHÔNG in chữ "Đang tính toán..."!


// ==========================================================================
// THỬ THÁCH 3: DEBOUNCE FUNCTION (Trì hoãn, chờ người dùng ngừng gõ mới chạy)
// ==========================================================================
/**
 * Hàm kiểm soát tần suất kích hoạt, chỉ chạy một lần cuối cùng sau khoảng delay
 * @param {Function} fn - Hàm cần thực thi
 * @param {number} delay - Thời gian chờ (mili-giây)
 */
function debounce(fn, delay) {
    let timeoutId = null; // Lưu vết định danh bộ đếm thời gian bằng Closure

    return function(...args) {
        // Mỗi khi hàm này bị gọi lại, lập tức xóa sạch bộ đếm thời gian cũ đang chạy dở
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập một bộ đếm thời gian mới hoàn toàn
        timeoutId = setTimeout(() => {
            fn(...args); // Thực thi hàm gốc sau khi người dùng đã "bất động" đủ số giây delay
        }, delay);
    };
}

// Chạy thử kiểm tra Debounce Function
const searchTrigger = debounce((query) => {
    console.log("Searching API call done:", query);
}, 500);

console.log("\n=== TEST 3: DEBOUNCE FUNCTION ===");
console.log("Kích hoạt gõ liên tục phím...");
searchTrigger("a");
searchTrigger("ab");
searchTrigger("abc"); // Chỉ có lần gọi cuối cùng này mới thực sự chạy sau 500ms nữa!


// ==========================================================================
// THỬ THÁCH 4: RETRY FUNCTION (Tự động thử lại tác vụ bất đồng bộ nếu gặp lỗi)
// ==========================================================================
/**
 * Hàm bọc một Promise bất đồng bộ, tự động recall nếu Promise đó bị reject
 * @param {Function} fn - Hàm bất đồng bộ trả về một Promise
 * @param {number} maxAttempts - Số lần thử lại tối đa cho phép
 */
async function retry(fn, maxAttempts = 3) {
    let internalAttempts = 0;

    // Vòng lặp vô hạn, chỉ thoát khi thành công hoặc chạm ngưỡng thử lại kịch trần
    while (true) {
        try {
            internalAttempts++;
            // Thử thực thi hàm bất đồng bộ
            return await fn();
        } catch (error) {
            // Nếu số lần lỗi vượt quá hoặc bằng giới hạn cho phép -> Đầu hàng và ném lỗi ra ngoài
            if (internalAttempts >= maxAttempts) {
                console.log(`[Retry]: Đã thử ${internalAttempts} lần thất bại. Hủy bỏ.`);
                throw error;
            }
            // Ngược lại, in thông báo và tiếp tục lặp lại để thử lại
            console.log(`[Retry]: Lỗi lần ${internalAttempts}. Đang tự động kết nối thử lại...`);
        }
    }
}

// Tạo một hàm giả lập cuộc gọi API mạng (Lỗi 2 lần đầu, thành công ở lần thứ 3)
let apiCallCount = 0;
const mockFetchData = () => {
    return new Promise((resolve, reject) => {
        apiCallCount++;
        if (apiCallCount < 3) {
            reject("Lỗi mạng 500 (Server Timeout)");
        } else {
            resolve("Dữ liệu API E-Commerce tải thành công!");
        }
    });
};

// Kích hoạt chạy thử kiểm tra Retry Function bất đồng bộ sau khi test debounce xếp hàng xong
setTimeout(async () => {
    console.log("\n=== TEST 4: RETRY ASYNC FUNCTION ===");
    try {
        const result = await retry(mockFetchData, 4);
        console.log("🎉 Kết quả cuối cùng:", result);
    } catch (err) {
        console.log("💥 Thất bại hoàn toàn:", err);
    }
}, 1000); // Trì hoãn 1 giây để các dòng test text của Debounce ở trên chạy xong xuôi