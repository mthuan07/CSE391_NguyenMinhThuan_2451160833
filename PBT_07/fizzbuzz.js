// ==========================================================================
// VERSION 1: CLASSIC FIZZBUZZ (In từ 1 đến 100)
// ==========================================================================
function classicFizzBuzz() {
    console.log("--- START CLASSIC FIZZBUZZ (1 - 100) ---");
    
    for (let i = 1; i <= 100; i++) {
        // Bí thuật: Luôn luôn phải kiểm tra điều kiện đồng thời cả 3 và 5 trước
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// ==========================================================================
// VERSION 2: CUSTOM FIZZBUZZ (Giải thuật cộng dồn chuỗi động - Dynamic String)
// ==========================================================================
/**
 * Hàm FizzBuzz nâng cao, tự động áp dụng luật dựa trên mảng rules truyền vào
 * @param {number} n - Giới hạn in số (In từ 1 đến n)
 * @param {Array} rules - Mảng chứa các object luật [{ divisor: số, word: chuỗi }]
 */
function customFizzBuzz(n, rules) {
    console.log(`\n--- START CUSTOM FIZZBUZZ (1 - ${n}) ---`);

    for (let i = 1; i <= n; i++) {
        // Khởi tạo một chuỗi rỗng cho số hiện tại
        let outputString = "";

        // Duyệt qua từng quy luật trong mảng rules bằng vòng lặp
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            
            // Nếu số i chia hết cho divisor của luật hiện tại, cộng dồn từ (word) vào chuỗi
            if (i % rule.divisor === 0) {
                outputString += rule.word;
            }
        }

        // BIỆN LUẬN ĐẦU RA:
        // Nếu outputString vẫn rỗng (nghĩa là số i không thỏa mãn bất kỳ luật chia hết nào)
        // -> In ra chính con số đó. Ngược lại -> In ra chuỗi kết quả đã được cộng dồn.
        if (outputString === "") {
            console.log(i);
        } else {
            console.log(`${i} = "${outputString}"`);
        }
    }
}

// ==========================================================================
// BỘ DỮ LIỆU CHẠY THỬ (TEST CASES)
// ==========================================================================

// 1. Chạy thử bản Classic (Bỏ comment dòng dưới để in từ 1 - 100 nếu muốn)
// classicFizzBuzz();

// 2. Chạy thử bản Custom nâng cao với bộ 3 quy tắc: 3 (Fizz), 5 (Buzz), 7 (Jazz)
// Để kiểm tra đúng các mốc đề bài đưa ra như 21, 35, 105, chúng ta sẽ cho chạy đến 105
const myRules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

customFizzBuzz(105, myRules);