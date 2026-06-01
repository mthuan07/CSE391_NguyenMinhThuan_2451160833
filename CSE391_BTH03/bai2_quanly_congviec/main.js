// ==========================================================================
// CSE391 K66 - BÀI THỰC HÀNH 3: PERSONAL TASK MANAGEMENT SYSTEM LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. CHỌN CÁC PHẦN TỬ DOM CẦN THAO TÁC [cite: 145, 146]
    const btnOpenForm = document.getElementById("btnOpenForm"); // [cite: 147]
    const btnCloseModal = document.getElementById("btnCloseModal"); // [cite: 148]
    const btnCancelForm = document.getElementById("btnCancelForm"); // [cite: 156]
    const taskModal = document.getElementById("taskModal"); // [cite: 142]
    const taskForm = document.getElementById("taskForm"); // [cite: 149]
    const taskListContainer = document.getElementById("taskListContainer"); // [cite: 150]
    const toastNotification = document.getElementById("toastNotification"); // [cite: 152]

    // Thống kê DOM [cite: 153]
    const statTotalTasks = document.getElementById("statTotalTasks");
    const statCompletedTasks = document.getElementById("statCompletedTasks");
    const statPendingTasks = document.getElementById("statPendingTasks");

    // Inputs form [cite: 149]
    const taskIdInput = document.getElementById("taskId");
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescInput = document.getElementById("taskDesc");
    const dueDateInput = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("priority");
    const modalTitle = document.getElementById("modalTitle");

    // 2. KHỞI TẠO MẢNG VÀ NẠP DỮ LIỆU TỪ LOCALSTORAGE [cite: 163, 164]
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let formMode = "ADD";

    // 3. ĐÓNG GÓI CÁC HÀM XỬ LÝ CHUYÊN BIỆT CHUẨN KHOA HỌC [cite: 201]

    // Hàm A: Render danh sách phần tử động ra giao diện dạng Card [cite: 161, 165, 197]
    function renderTasks() {
        taskListContainer.innerHTML = ""; // Gột rỗng giao diện cũ trước khi lặp

        if (tasks.length === 0) {
            taskListContainer.innerHTML = `
                <div class="empty-state">Không có công việc nào trong danh sách. Hãy thảnh thơi hoặc lên kế hoạch mới!</div>
            `; // [cite: 166]
            updateTaskSummary();
            return;
        }

        // Lặp qua mảng dữ liệu để kết xuất HTML [cite: 165]
        tasks.forEach((task) => {
            const card = document.createElement("div");
            // Thay đổi class CSS linh hoạt theo trạng thái hoàn thành [cite: 199]
            card.className = `task-card ${task.isCompleted ? 'is-done' : ''}`;
            
            card.innerHTML = `
                <div>
                    <div class="task-card-header">
                        <input type="checkbox" class="checkbox-toggle" data-id="${task.id}" ${task.isCompleted ? 'checked' : ''}>
                        <span class="task-title-text">${task.title}</span>
                    </div>
                    <p class="task-desc-text">${task.desc || '<i>Không có mô tả chi tiết.</i>'}</p>
                </div>
                <div class="task-card-footer">
                    <div class="task-meta">
                        <span class="priority-badge ${task.priority.toLowerCase()}">Mức ưu tiên: ${task.priority}</span>
                        <span class="date-text">📅 Hạn: ${formatDate(task.dueDate)}</span>
                    </div>
                    <div class="btn-action-group">
                        <button class="btn btn-mini btn-mini-edit" data-id="${task.id}">Sửa</button>
                        <button class="btn btn-mini btn-mini-delete" data-id="${task.id}">Xóa</button>
                    </div>
                </div>
            `; // [cite: 151]

            taskListContainer.appendChild(card);
        });

        updateTaskSummary(); // Đồng bộ số liệu thống kê [cite: 174]
    }

    // Hàm B: Ghi lưu dữ liệu mảng xuống LocalStorage [cite: 172]
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Hàm C: Đưa thông báo thành công ra màn hình [cite: 144, 201]
    function showMessage(text) {
        toastNotification.innerText = text; // [cite: 12]
        toastNotification.classList.remove("hidden");
        setTimeout(() => {
            toastNotification.classList.add("hidden");
        }, 2500);
    }

    // Hàm D: Cập nhật số liệu thống kê theo dữ liệu hiện tại [cite: 143, 200, 201]
    function updateTaskSummary() {
        const total = tasks.length; // [cite: 123]
        const completed = tasks.filter(t => t.isCompleted).length; // [cite: 124]
        const pending = total - completed; // [cite: 125]

        statTotalTasks.innerText = total; // [cite: 12]
        statCompletedTasks.innerText = completed; // [cite: 12]
        statPendingTasks.innerText = pending; // [cite: 12]
    }

    // Hàm E: Reset dữ liệu bên trong form nhập liệu
    function resetForm() {
        taskForm.reset();
        taskIdInput.value = "";
        formMode = "ADD";
        modalTitle.innerText = "Thêm Công Việc Mới"; // [cite: 12]
        
        const formGroups = taskForm.querySelectorAll(".form-group");
        formGroups.forEach(g => g.classList.remove("invalid"));
    }

    // Hàm F: Kiểm tra Form Validation cơ bản [cite: 226]
    function validateForm() {
        let isValid = true;

        // Tiêu đề bắt buộc không được phép để trống [cite: 228]
        if (taskTitleInput.value.trim() === "") {
            taskTitleInput.parentElement.classList.add("invalid");
            isValid = false;
        } else {
            taskTitleInput.parentElement.classList.remove("invalid");
        }

        // Ngày hoàn thành bắt buộc [cite: 228, 231]
        if (dueDateInput.value === "") {
            dueDateInput.parentElement.classList.add("invalid");
            isValid = false;
        } else {
            dueDateInput.parentElement.classList.remove("invalid");
        }

        return isValid;
    }

    function formatDate(dateString) {
        if (!dateString) return "";
        const [y, m, d] = dateString.split("-");
        return `${d}/${m}/${y}`;
    }

    // 4. LẮNG NGHE VÀ XỬ LÝ SỰ KIỆN BẮT BUỘC [cite: 154]

    // Sự kiện 1: Nhấn nút mở popup form [cite: 117, 155, 168]
    btnOpenForm.addEventListener("click", () => {
        resetForm();
        taskModal.classList.remove("hidden"); // [cite: 14, 210]
    });

    // Sự kiện 2: Nhấn hủy/đóng form [cite: 148, 156, 175]
    function closeModal() {
        taskModal.classList.add("hidden"); // [cite: 14]
        resetForm();
    }
    btnCloseModal.addEventListener("click", closeModal);
    btnCancelForm.addEventListener("click", closeModal);

    // Sự kiện 3: Submit Form lưu dữ liệu (Dùng chung cho cả Thêm và Sửa) [cite: 157]
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Ngăn hành vi reload trang [cite: 21, 238]

        if (!validateForm()) return; // Chặn luồng nếu dính lỗi nhập liệu [cite: 238]

        const taskData = {
            title: taskTitleInput.value.trim(),
            desc: taskDescInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: prioritySelect.value
        };

        if (formMode === "ADD") {
            // Flow THÊM mới object [cite: 170, 171]
            taskData.id = Date.now().toString();
            taskData.isCompleted = false; // Mặc định việc mới tạo là chưa hoàn thành [cite: 132]
            tasks.push(taskData);
            showMessage("Đã thêm công việc mới vào lịch trình!"); // [cite: 144]
        } else if (formMode === "EDIT") {
            // Flow SỬA đổi phần tử mảng [cite: 180]
            const currentId = taskIdInput.value;
            const index = tasks.findIndex(t => t.id === currentId);
            if (index !== -1) {
                taskData.id = currentId;
                taskData.isCompleted = tasks[index].isCompleted; // Giữ nguyên trạng thái hoàn thành cũ
                tasks[index] = taskData; // Cập nhật mảng [cite: 180]
                showMessage("Đã cập nhật thay đổi nội dung công việc!"); // [cite: 144]
            }
        }

        saveTasks();      // Lưu localStorage [cite: 172]
        renderTasks();    // Đổ lại danh sách động ra màn hình [cite: 122, 173, 181]
        closeModal();     // Đóng form [cite: 175]
    });

    // Sự kiện 4: Ứng dụng kỹ thuật EVENT DELEGATION bắt tương tác Sửa, Xóa, Đổi trạng thái [cite: 151, 198]
    taskListContainer.addEventListener("click", (e) => {
        const target = e.target;

        // Trường hợp A: Bấm nút SỬA [cite: 158, 177]
        if (target.classList.contains("btn-mini-edit")) {
            const idToEdit = target.getAttribute("data-id");
            const task = tasks.find(t => t.id === idToEdit);

            if (task) {
                // Đổ dữ liệu cũ lên ô input [cite: 119, 178]
                taskIdInput.value = task.id;
                taskTitleInput.value = task.title;
                taskDescInput.value = task.desc;
                dueDateInput.value = task.dueDate;
                prioritySelect.value = task.priority;

                // Chuyển form sang trạng thái Cập nhật [cite: 179]
                formMode = "EDIT";
                modalTitle.innerText = "Cập Nhật Nội Dung Công Việc"; // [cite: 12]
                taskModal.classList.remove("hidden"); // Mở bung form [cite: 14]
            }
        }

        // Trường hợp B: Bấm nút XÓA công việc [cite: 120, 159, 184]
        if (target.classList.contains("btn-mini-delete")) {
            const idToDelete = target.getAttribute("data-id");
            
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa công việc này ra khỏi mục tiêu cá nhân?"); // [cite: 120, 185, 257]
            if (isConfirm) {
                tasks = tasks.filter(t => t.id !== idToDelete); // Xóa khỏi mảng [cite: 186]
                saveTasks();     // Đồng bộ ghi [cite: 187]
                renderTasks();   // Render lại [cite: 122, 188]
                showMessage("Đã xóa bỏ công việc thành công!"); // [cite: 144]
            }
        }
    });

    // Trường hợp C: Lắng nghe sự kiện CHANGE ô Checkbox chuyển đổi trạng thái hoàn thành [cite: 22, 160]
    taskListContainer.addEventListener("change", (e) => {
        const target = e.target;
        if (target.classList.contains("checkbox-toggle")) {
            const idToToggle = target.getAttribute("data-id");
            const task = tasks.find(t => t.id === idToToggle);
            
            if (task) {
                task.isCompleted = target.checked; // Cập nhật boolean trạng thái trong mảng [cite: 121, 192]
                saveTasks(); // Đồng bộ ghi [cite: 194]
                
                // Thay đổi trực tiếp class CSS của thẻ cha để tạo hiệu ứng gạch ngang tiêu đề ngay lập tức [cite: 193, 199]
                const cardElement = target.closest(".task-card");
                if (task.isCompleted) {
                    cardElement.classList.add("is-done");
                } else {
                    cardElement.classList.remove("is-done");
                }
                
                updateTaskSummary(); // Tính toán lại số liệu thống kê [cite: 122, 195]
                showMessage(task.isCompleted ? "Chúc mừng bạn đã hoàn thành một mục tiêu! 🎉" : "Đã đưa công việc về trạng thái chưa hoàn thành."); // [cite: 144]
            }
        }
    });

    // 5. CHẠY KHỞI ĐỘNG KHI TẢI TRANG [cite: 164]
    renderTasks();
});