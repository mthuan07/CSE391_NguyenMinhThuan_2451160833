// ==========================================================================
// CSE391 K66 - BÀI THỰC HÀNH 3: CORE MANAGEMENT SYSTEM LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. CHỌN CÁC PHẦN TỬ DOM CẦN XỬ LÝ [cite: 56, 57]
    const btnOpenForm = document.getElementById("btnOpenForm"); // [cite: 58]
    const btnCloseModal = document.getElementById("btnCloseModal"); // [cite: 59]
    const btnCancelForm = document.getElementById("btnCancelForm"); // [cite: 67]
    const studentModal = document.getElementById("studentModal"); // [cite: 53]
    const studentForm = document.getElementById("studentForm"); // [cite: 60]
    const studentTableBody = document.getElementById("studentTableBody"); // [cite: 62]
    const toastNotification = document.getElementById("toastNotification"); // [cite: 63]
    
    // Thống kê DOM [cite: 64]
    const statTotalStudents = document.getElementById("statTotalStudents");
    const statAverageClassScore = document.getElementById("statAverageClassScore");

    // Các Ô nhập liệu trong Form [cite: 61]
    const studentIdInput = document.getElementById("studentId");
    const studentCodeInput = document.getElementById("studentCode");
    const fullNameInput = document.getElementById("fullName");
    const dobInput = document.getElementById("dob");
    const classNameInput = document.getElementById("className");
    const gpaInput = document.getElementById("gpa");
    const emailInput = document.getElementById("email");
    const modalTitle = document.getElementById("modalTitle");

    // 2. KHỞI TẠO MẢNG DỮ LIỆU VÀ ĐỌC LOCALSTORAGE [cite: 74, 75]
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Trạng thái Form: "ADD" hoặc "EDIT" [cite: 107]
    let formMode = "ADD";

    // 3. TÁCH BIỆT CÁC HÀM XỬ LÝ CHUYÊN BIỆT THEO ĐỀ BÀI [cite: 110]
    
    // Hàm A: Render dữ liệu sinh viên ra bảng HTML [cite: 73, 76, 106]
    function renderStudents() {
        studentTableBody.innerHTML = ""; // Reset body bảng trước khi đổ dữ liệu mới

        if (students.length === 0) {
            studentTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-row-text">Danh sách hiện tại trống. Vui lòng bấm thêm sinh viên mới.</td>
                </tr>
            `; // [cite: 77]
            updateStatistics();
            return;
        }

        // Duyệt mảng dữ liệu sinh viên động [cite: 76]
        students.forEach((student) => {
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td><strong>${student.code}</strong></td>
                <td>${student.name}</td>
                <td>${formatDate(student.dob)}</td>
                <td>${student.className}</td>
                <td><span class="badge-gpa">${Number(student.gpa).toFixed(1)}</span></td>
                <td>${student.email}</td>
                <td class="text-center">
                    <button class="btn btn-action btn-edit" data-id="${student.id}">Sửa</button>
                    <button class="btn btn-action btn-delete" data-id="${student.id}">Xóa</button>
                </td>
            `; // [cite: 35]

            studentTableBody.appendChild(row);
        });

        updateStatistics(); // Cập nhật thống kê song song [cite: 86]
    }

    // Hàm B: Lưu mảng dữ liệu xuống localStorage [cite: 84]
    function saveStudents() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Hàm C: Xóa dữ liệu cũ, dọn sạch và reset trạng thái Form [cite: 87, 110]
    function resetForm() {
        studentForm.reset();
        studentIdInput.value = "";
        formMode = "ADD";
        modalTitle.innerText = "Thêm Sinh Viên Mới"; // [cite: 12, 107]
        
        // Gỡ toàn bộ các class lỗi UI validation nếu có
        const formGroups = studentForm.querySelectorAll(".form-group");
        formGroups.forEach(group => group.classList.remove("invalid"));
    }

    // Hàm D: Tính toán và cập nhật khu vực thống kê [cite: 55, 64, 110]
    function updateStatistics() {
        const total = students.length; // [cite: 39]
        statTotalStudents.innerText = total; // [cite: 12]

        if (total === 0) {
            statAverageClassScore.innerText = "0.0";
            return;
        }

        // Tính điểm trung bình cả lớp bằng toán tử reduce nâng cao [cite: 40]
        const sumGpa = students.reduce((acc, student) => acc + Number(student.gpa), 0);
        const avgScore = sumGpa / total;
        statAverageClassScore.innerText = avgScore.toFixed(1); // [cite: 12]
    }

    // Hàm E: Hiển thị thông báo nhanh (Toasts Notification) [cite: 25, 54]
    function showNotification(message, type = "success") {
        toastNotification.innerText = message; // [cite: 12]
        toastNotification.className = `toast-message ${type}`;
        
        // Ẩn sau 3 giây
        setTimeout(() => {
            toastNotification.classList.add("hidden");
        }, 3000);
    }

    // --- BÀI TẬP VỀ NHÀ: FORM VALIDATION LOGIC --- [cite: 225, 226]
    function validateForm() {
        let isValid = true;

        // 1. Kiểm tra Mã sinh viên (Bắt buộc + Định dạng biểu thức chính quy) [cite: 228, 233]
        const codeValue = studentCodeInput.value.trim();
        const codePattern = /^[a-zA-Z0-9]{5,15}$/; // Mã gồm 5-15 ký tự chữ hoặc số [cite: 234]
        if (codeValue === "") {
            showInputError(studentCodeInput, "Mã sinh viên không được để trống [cite: 228]");
            isValid = false;
        } else if (!codePattern.test(codeValue)) {
            showInputError(studentCodeInput, "Mã sinh viên phải từ 5-15 ký tự và không chứa ký tự đặc biệt [cite: 233, 234]");
            isValid = false;
        } else {
            clearInputError(studentCodeInput);
        }

        // 2. Kiểm tra Họ và tên (Bắt buộc + Độ dài chuỗi) [cite: 228, 234]
        const nameValue = fullNameInput.value.trim();
        if (nameValue === "") {
            showInputError(fullNameInput, "Họ và tên không được để trống [cite: 228]");
            isValid = false;
        } else if (nameValue.length < 3) {
            showInputError(fullNameInput, "Họ và tên tối thiểu phải từ 3 ký tự trở lên [cite: 234]");
            isValid = false;
        } else {
            clearInputError(fullNameInput);
        }

        // 3. Kiểm tra Ngày sinh (Bắt buộc + Tính hợp lệ của thời gian) [cite: 228, 231]
        if (dobInput.value === "") {
            showInputError(dobInput, "Vui lòng chọn ngày sinh hợp lệ [cite: 228, 231]");
            isValid = false;
        } else {
            clearInputError(dobInput);
        }

        // 4. Kiểm tra Lớp học (Bắt buộc) [cite: 228]
        if (classNameInput.value.trim() === "") {
            showInputError(classNameInput, "Lớp học không được để trống [cite: 228]");
            isValid = false;
        } else {
            clearInputError(classNameInput);
        }

        // 5. Kiểm tra Điểm số (Là số hợp lệ + Nằm trong khoảng từ 0 đến 10) [cite: 230, 235]
        const gpaValue = gpaInput.value;
        if (gpaValue === "") {
            showInputError(gpaInput, "Điểm trung bình không được để trống [cite: 228]");
            isValid = false;
        } else {
            const gpaNum = Number(gpaValue);
            if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) { // [cite: 230, 235]
                showInputError(gpaInput, "Điểm phải là số hợp lệ nằm trong khoảng từ 0.0 đến 10.0 [cite: 230, 235]");
                isValid = false;
            } else {
                clearInputError(gpaInput);
            }
        }

        // 6. Kiểm tra cấu trúc định dạng Email [cite: 229]
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            showInputError(emailInput, "Email không được để trống [cite: 228]");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showInputError(emailInput, "Định dạng Email sai cấu trúc quy định (ví dụ: name@domain.com) [cite: 229]");
            isValid = false;
        } else {
            clearInputError(emailInput);
        }

        return isValid;
    }

    // Các hàm phụ trợ thông báo lỗi Validation đặt ngay dưới ô input [cite: 237]
    function showInputError(inputElement, errorMessage) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.add("invalid"); // Dội class báo viền đỏ cách biệt [cite: 13]
        const errorFeedback = formGroup.querySelector(".error-feedback");
        errorFeedback.innerText = errorMessage; // [cite: 12]
    }

    function clearInputError(inputElement) {
        const formGroup = inputElement.parentElement;
        formGroup.classList.remove("invalid");
    }

    // Định dạng lại hiển thị ngày tháng VN (DD/MM/YYYY)
    function formatDate(dateString) {
        if (!dateString) return "";
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    // 4. GẮN CÁC SỰ KIỆN LẮNG NGHE (EVENT HANDLING) [cite: 18, 19]

    // Sự kiện 1: Mở popup form thêm sinh viên mới [cite: 33, 66, 79]
    btnOpenForm.addEventListener("click", () => {
        resetForm();
        studentModal.classList.remove("hidden"); // [cite: 14, 210]
    });

    // Sự kiện 2: Ẩn/Đóng popup form (Dành cho nút hủy bỏ và nút dấu X) [cite: 59, 67, 87]
    function closeModal() {
        studentModal.classList.add("hidden"); // [cite: 14]
        resetForm();
    }
    btnCloseModal.addEventListener("click", closeModal);
    btnCancelForm.addEventListener("click", closeModal);

    // Sự kiện 3: Submit Form (Xử lý thông minh cho cả chế độ Thêm mới và chế độ Cập nhật) [cite: 21, 68, 70]
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện reload tải lại trang mặc định [cite: 21, 238]

        // Nếu dữ liệu input vi phạm điều kiện validation thì dừng flow xử lý [cite: 238]
        if (!validateForm()) return; 

        // Thu thập toàn bộ dữ liệu sạch từ các ô input [cite: 81, 105]
        const studentData = {
            code: studentCodeInput.value.trim(),
            name: fullNameInput.value.trim(),
            dob: dobInput.value,
            className: classNameInput.value.trim(),
            gpa: Number(gpaInput.value),
            email: emailInput.value.trim()
        };

        if (formMode === "ADD") {
            // Thực hiện luồng THÊM MỚI (Cơ chế object đẩy vào mảng) [cite: 82, 83]
            studentData.id = Date.now().toString(); // Khởi tạo id độc nhất bằng dấu vết thời gian
            students.push(studentData);
            showNotification("Thêm mới dữ liệu sinh viên thành công!"); // [cite: 25]
        } else if (formMode === "EDIT") {
            // Thực hiện luồng CẬP NHẬT/SỬA (Tìm vị trí index trong mảng và thay thế) [cite: 70, 93]
            const currentId = studentIdInput.value;
            const index = students.findIndex(s => s.id === currentId);
            if (index !== -1) {
                studentData.id = currentId; // Giữ nguyên ID gốc của thực thể
                students[index] = studentData; // Thay thế dữ liệu object cũ trong mảng [cite: 93]
                showNotification("Cập nhật thông tin sinh viên thành công!"); // [cite: 25]
            }
        }

        saveStudents();    // Đồng bộ ghi xuống localStorage [cite: 84, 94]
        renderStudents();  // Vẽ lại toàn bộ bảng dữ liệu động [cite: 16, 85, 95]
        closeModal();      // Đóng và dọn dẹp form popup [cite: 87]
    });

    // Sự kiện 4: Ứng dụng kỹ thuật "EVENT DELEGATION" bắt sự kiện trên các nút SỬA và XÓA động [cite: 23, 24, 26, 108]
    studentTableBody.addEventListener("click", (e) => {
        // Biện pháp xác định chính xác người dùng nhấn trúng nút nào [cite: 24, 108]
        const targetBtn = e.target;

        // Tình huống A: Click trúng nút SỬA [cite: 69, 89]
        if (targetBtn.classList.contains("btn-edit")) {
            const idToEdit = targetBtn.getAttribute("data-id");
            const targetStudent = students.find(s => s.id === idToEdit); // Xác định đúng sinh viên [cite: 90]
            
            if (targetStudent) {
                // Đẩy toàn bộ dữ liệu thực thể lên form modal [cite: 36, 91]
                studentIdInput.value = targetStudent.id;
                studentCodeInput.value = targetStudent.code;
                fullNameInput.value = targetStudent.name;
                dobInput.value = targetStudent.dob;
                classNameInput.value = targetStudent.className;
                gpaInput.value = targetStudent.gpa;
                emailInput.value = targetStudent.email;

                // Chuyển đổi trạng thái tiêu đề form modal sang chế độ Cập nhật [cite: 92, 107]
                formMode = "EDIT";
                modalTitle.innerText = "Cập Nhật Thông Tin Sinh Viên"; // [cite: 12]
                studentModal.classList.remove("hidden"); // Mở bung form [cite: 14]
            }
        }

        // Tình huống B: Click trúng nút XÓA [cite: 71, 98]
        if (targetBtn.classList.contains("btn-delete")) {
            const idToDelete = targetBtn.getAttribute("data-id");
            
            // Hiện hộp thoại cảnh báo xác nhận xóa đúng chuẩn yêu cầu [cite: 37, 71, 99, 257]
            const confirmConfirm = confirm("Bạn có chắc chắn muốn xóa sinh viên này khỏi hệ thống quản lý?");
            
            if (confirmConfirm) {
                // Lọc bỏ phần tử sinh viên ra khỏi mảng [cite: 100]
                students = students.filter(s => s.id !== idToDelete);
                
                saveStudents();    // Đồng bộ ghi xuống localStorage [cite: 101]
                renderStudents();  // Đổ lại bảng dữ liệu động ngay tức thì [cite: 38, 102]
                showNotification("Đã xóa sinh viên khỏi hệ thống!", "danger"); // [cite: 25]
            }
        }
    });

    // 5. CHẠY KHỞI ĐỘNG KHI TẢI TRANG [cite: 75]
    renderStudents();
});