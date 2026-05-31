/**
 * Hàm khởi chạy toàn bộ chu trình mini game đoán số bí ẩn
 */
function startGame() {
    // 1. Máy tính sinh ngẫu nhiên một số nguyên trong khoảng [1, 100]
    const secretCustomerNumber = Math.floor(Math.random() * 100) + 1;
    
    // 2. Thiết lập các thông số trạng thái quản lý game
    const maxAttempts = 7;      // Giới hạn tối đa lượt chơi
    let currentAttempts = 0;    // Đếm số lần đã đoán
    let hasWon = false;         // Trạng thái thắng cuộc
    const historyGuesses = [];  // Mảng lưu vết các số đã đoán để kiểm tra trùng lặp

    // 3. Vòng lặp Game Loop (chạy liên tục cho đến khi hết lượt hoặc đoán trúng)
    while (currentAttempts < maxAttempts && !hasWon) {
        let remainingTurns = maxAttempts - currentAttempts;
        
        // Hiển thị hộp thoại bắt người dùng nhập số kèm thông tin lượt còn lại
        let userInput = prompt(`[Lượt còn lại: ${remainingTurns}/${maxAttempts}]\nMời bạn nhập vào một con số từ 1 đến 100:`);

        // Edge Case: Nếu người dùng bấm nút "Cancel" (Hủy) trên hộp thoại prompt
        if (userInput === null) {
            alert("Trò chơi đã bị hủy bỏ. Hẹn gặp lại bạn lần sau!");
            return; // Thoát hiểm ngay lập tức khỏi hàm
        }

        // Loại bỏ khoảng trắng thừa và ép kiểu về dạng số nguyên
        userInput = userInput.trim();
        let guessedNumber = parseInt(userInput, 10);

        // ==========================================================================
        // YÊU CẦU: VALIDATE INPUT ĐẦU VÀO CHẶT CHẼ
        // ==========================================================================
        if (userInput === "" || isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
            alert("Lỗi: Vui lòng chỉ nhập một số nguyên hợp lệ nằm trong khoảng từ 1 đến 100!");
            continue; // Nhảy ngược lại đầu vòng lặp, KHÔNG tính lượt đoán này
        }

        // ==========================================================================
        // YÊU CẦU: KIỂM TRA TRÙNG LẶP SỐ ĐÃ ĐOÁN
        // ==========================================================================
        let isDuplicated = false;
        for (let i = 0; i < historyGuesses.length; i++) {
            if (historyGuesses[i] === guessedNumber) {
                isDuplicated = true;
                break;
            }
        }

        if (isDuplicated) {
            alert(`Bạn đã đoán số ${guessedNumber} này rồi! Hãy chọn một con số khác.`);
            continue; // Nhảy ngược lại đầu vòng lặp, KHÔNG tính lượt đoán này
        }

        // Ghi nhận con số hợp lệ này vào danh sách lịch sử và tăng số lần đoán lên 1
        historyGuesses.push(guessedNumber);
        currentAttempts++;

        // ==========================================================================
        // SO SÁNH KẾT QUẢ ĐỂ TRẢ LỜI GỢI Ý
        // ==========================================================================
        if (guessedNumber === secretCustomerNumber) {
            hasWon = true;
            alert(`🎉 Đúng rồi!\nBạn đoán đúng số bí ẩn [${secretCustomerNumber}] sau ${currentAttempts} lần đoán!`);
        } else if (guessedNumber > secretCustomerNumber) {
            alert("Thấp hơn! (Số bạn vừa đoán lớn hơn số bí ẩn)");
        } else {
            alert("Cao hơn! (Số bạn vừa đoán nhỏ hơn số bí ẩn)");
        }
    }

    // 4. KIỂM TRA ĐIỀU KIỆN KẾT THÚC THUA CUỘC
    if (!hasWon) {
        alert(`💥 Hết lượt mất rồi!\nBạn đã dùng hết cả 7 lượt đoán dữ dội. Bạn đã thua cuộc!\n👉 Đáp án chính xác của máy là: ${secretCustomerNumber}`);
    }
}