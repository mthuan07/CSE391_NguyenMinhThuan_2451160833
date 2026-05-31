// Truy vấn tất cả các phần tử DOM cần thiết trong biểu mẫu
const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

// Các phần tử hiển thị thông báo lỗi / đo độ mạnh mật khẩu
const nameBadge = document.getElementById("nameBadge");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");

// Các phần tử điều khiển hộp thoại Modal thành công
const successModal = document.getElementById("successModal");
const modalData = document.getElementById("modalData");
const closeModalBtn = document.getElementById("closeModalBtn");

// Khai báo một Object quản lý trạng thái hợp lệ của từng trường nhập liệu
const fieldValidity = {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false
};

// Hàm tiện ích hỗ trợ nhanh việc cập nhật CSS viền và tin báo lỗi cho Input
function setInputState(inputEl, errorEl, isValid, errorMsg = "") {
    if (isValid) {
        inputEl.classList.add("valid-border");
        inputEl.classList.remove("invalid-border");
        errorEl.textContent = "";
    } else {
        inputEl.classList.add("invalid-border");
        inputEl.classList.remove("valid-border");
        errorEl.textContent = errorMsg;
    }
}

// Hàm kiểm tra điều kiện tổng quát để mở/khóa nút Đăng Ký (Submit Button)
function checkFormValidity() {
    // Nút đăng ký chỉ được mở khóa khi và chỉ khi tất cả các thuộc tính trong fieldValidity đều là true
    const isFormValid = Object.values(fieldValidity).every(valid => valid === true);
    submitBtn.disabled = !isFormValid;
}

// ==========================================================================
// THỰC THI KIỂM TRA CHO TỪNG TRƯỜNG DỮ LIỆU REAL-TIME CHUYÊN BIỆT
// ==========================================================================

// 1. Validate Tên (Từ 2 đến 50 ký tự)
fullName.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const isValid = val.length >= 2 && val.length <= 50;

    if (val.length === 0) {
        nameBadge.textContent = "";
        setInputState(fullName, nameError, false, "Họ và tên không được để trống.");
        fieldValidity.fullName = false;
    } else if (isValid) {
        nameBadge.textContent = "✅";
        setInputState(fullName, nameError, true);
        fieldValidity.fullName = true;
    } else {
        nameBadge.textContent = "❌";
        setInputState(fullName, nameError, false, "Tên phải kéo dài từ 2 đến 50 ký tự.");
        fieldValidity.fullName = false;
    }
    checkFormValidity();
});

// 2. Validate Email (Sử dụng biểu thức chính quy Regex chuẩn quốc tế)
email.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(val);

    if (val.length === 0) {
        setInputState(email, emailError, false, "Email không được để trống.");
        fieldValidity.email = false;
    } else if (isValid) {
        setInputState(email, emailError, true);
        fieldValidity.email = true;
    } else {
        setInputState(email, emailError, false, "Định dạng cấu trúc Email không hợp lệ (Ví dụ đúng: abc@gmail.com).");
        fieldValidity.email = false;
    }
    checkFormValidity();
});

// 3. Validate Mật khẩu & Thước đo năng lượng Password Strength Meter
password.addEventListener("input", (e) => {
    const val = e.target.value;
    
    // Xóa sạch mọi class cũ trên thanh tiến trình và chữ trạng thái trước khi đo lại
    strengthBar.className = "strength-bar";
    strengthText.className = "strength-text";

    if (val.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
        setInputState(password, passwordError, false, "Mật khẩu không được để trống.");
        fieldValidity.password = false;
        checkFormValidity();
        return;
    }

    // Thiết lập các điều kiện regex để kiểm tra thuộc tính con bên trong mật khẩu
    const hasLength = val.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasSpecial = /[^a-zA-Z0-9]/.test(val);

    let strength = "weak"; // Mặc định là yếu

    // Biện luận phân loại độ mạnh yếu đúng theo tiêu chuẩn đề bài:
    // MẠNH: 8+ ký tự, có đủ chữ hoa, chữ thường, số và ký tự đặc biệt
    if (hasLength && hasUpper && hasLower && hasNumber && hasSpecial) {
        strength = "strong";
    } 
    // TRUNG BÌNH: 8+ ký tự, có cả chữ lẫn số
    else if (hasLength && hasLetter && hasNumber) {
        strength = "medium";
    }

    // Đổ màu sắc và kéo dài thanh tiến trình tương ứng dựa trên kết quả phân loại
    if (strength === "strong") {
        strengthBar.classList.add("bg-strong");
        strengthText.textContent = "Độ bảo mật: Mạnh (An Toàn) 💪";
        strengthText.classList.add("text-strong");
        setInputState(password, passwordError, true);
        fieldValidity.password = true;
    } else if (strength === "medium") {
        strengthBar.classList.add("bg-medium");
        strengthText.textContent = "Độ bảo mật: Trung bình ⚠️";
        strengthText.classList.add("text-medium");
        setInputState(password, passwordError, true);
        fieldValidity.password = true; // Theo logic, trung bình (8+ ký tự chữ + số) là đã hợp lệ để chấp nhận submit
    } else {
        // Trường hợp Yếu: < 8 ký tự hoặc không đủ tổ hợp chữ + số
        strengthBar.classList.add("bg-weak");
        strengthText.textContent = "Độ bảo mật: Yếu (Mật khẩu quá ngắn hoặc đơn giản) ❌";
        strengthText.classList.add("text-weak");
        setInputState(password, passwordError, false, "Mật khẩu phải dài ít nhất từ 8 ký tự trở lên, gồm cả chữ và số.");
        fieldValidity.password = false;
    }

    // Khi mật khẩu thay đổi, bắt buộc phải kích hoạt kiểm tra lại xem ô nhập lại mật khẩu có còn khớp hay không
    confirmPassword.dispatchEvent(new Event("input"));
    checkFormValidity();
});

// 4. Validate Confirm Password (Kiểm tra trùng khớp thời gian thực với ô Mật khẩu)
confirmPassword.addEventListener("input", (e) => {
    const val = e.target.value;
    const passwordVal = password.value;

    if (val.length === 0) {
        setInputState(confirmPassword, confirmPasswordError, false, "Vui lòng nhập lại mật khẩu để xác nhận.");
        fieldValidity.confirmPassword = false;
    } else if (val === passwordVal && fieldValidity.password) {
        setInputState(confirmPassword, confirmPasswordError, true);
        fieldValidity.confirmPassword = true;
    } else {
        setInputState(confirmPassword, confirmPasswordError, false, "Mật khẩu xác nhận không trùng khớp hoặc mật khẩu chính chưa hợp lệ.");
        fieldValidity.confirmPassword = false;
    }
    checkFormValidity();
});

// 5. Validate Số điện thoại & Cơ chế tự động chèn dấu gạch ngang dạng 0901-234-567 khi gõ
phone.addEventListener("input", (e) => {
    let cursorPosition = e.target.selectionStart; // Lưu lại vị trí con trỏ chuột của người dùng tránh bị nhảy chữ khi tự gạch
    let val = e.target.value;

    // Bước 1: Dùng Regex xóa bỏ sạch sẽ mọi ký tự không phải là số ra khỏi chuỗi đang gõ
    let numbersOnly = val.replace(/\D/g, "");

    // Bước 2: Tiến hành chèn dấu gạch ngang tự động dựa trên độ dài chuỗi số hiện tại
    let formatted = "";
    if (numbersOnly.length > 0) {
        // Cụm đầu tiên: tối đa 4 số (ví dụ: 0901)
        formatted += numbersOnly.substring(0, 4);
    }
    if (numbersOnly.length > 4) {
        // Cụm thứ hai: tối đa 3 số kế tiếp (ví dụ: 0901-234)
        formatted += "-" + numbersOnly.substring(4, 7);
    }
    if (numbersOnly.length > 7) {
        // Cụm cuối cùng: tối đa 3 số còn lại (ví dụ: 0901-234-567)
        formatted += "-" + numbersOnly.substring(7, 10);
    }

    // Đổ ngược chuỗi đã định dạng đẹp đẽ vào lại ô input lề giao diện
    e.target.value = formatted;

    // Kiểm tra tính hợp lệ: Số điện thoại Việt Nam chuẩn phải có độ dài đúng 10 chữ số thô (tương đương 12 ký tự đã có gạch)
    const isValid = numbersOnly.length === 10;

    if (numbersOnly.length === 0) {
        setInputState(phone, phoneError, false, "Số điện thoại không được để trống.");
        fieldValidity.phone = false;
    } else if (isValid) {
        setInputState(phone, phoneError, true);
        fieldValidity.phone = true;
    } else {
        setInputState(phone, phoneError, false, "Số điện thoại bắt buộc phải có đầy đủ đúng 10 chữ số.");
        fieldValidity.phone = false;
    }
    checkFormValidity();
});

// ==========================================================================
// SỰ KIỆN SUBMIT FORM VÀ HIỂN THỊ HỘP THOẠI MODAL LIGHTBOX
// ==========================================================================
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn đứng hành vi tải lại trang mặc định vô điều kiện của HTML Form

    // Kết xuất thông tin sạch sẽ của người dùng nhập vào để đẩy vào Modal dữ liệu
    modalData.innerHTML = `
        <strong>Họ và tên:</strong> ${fullName.value.trim()}<br>
        <strong>Email hệ thống:</strong> ${email.value.trim()}<br>
        <strong>Số điện thoại:</strong> ${phone.value}<br>
        <strong>Thời gian đăng ký:</strong> ${new Date().toLocaleString("vi-VN")}
    `;

    // Mở hộp thoại thông báo thành công dạng Lightbox
    successModal.classList.remove("hidden");
});

// Sự kiện click nút đóng hộp thoại thành công -> Tiến hành xóa sạch giỏ dữ liệu cũ để làm lại từ đầu
closeModalBtn.addEventListener("click", () => {
    successModal.classList.add("hidden");
    form.reset(); // Xóa sạch chữ trên giao diện form
    
    // Khôi phục mọi trạng thái kiểm tra và đường viền input về như lúc chưa gõ
    nameBadge.textContent = "";
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    
    const allInputs = [fullName, email, password, confirmPassword, phone];
    allInputs.forEach(input => {
        input.classList.remove("valid-border", "invalid-border");
    });

    Object.keys(fieldValidity).forEach(key => {
        fieldValidity[key] = false;
    });
    
    submitBtn.disabled = true;
});