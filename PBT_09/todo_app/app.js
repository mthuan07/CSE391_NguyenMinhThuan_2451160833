// ==========================================================================
// 1. QUẢN LÝ TRẠNG THÁI ỨNG DỤNG (STATE MANAGEMENT)
// ==========================================================================
// Đọc dữ liệu từ LocalStorage, nếu không có khởi tạo mảng rỗng []
let todos = JSON.parse(localStorage.getItem("VANILLA_TODOS")) || [];
let currentFilter = "all"; // Trạng thái bộ lọc hiện tại: all, active, completed

// Truy vấn các phần tử DOM cần thiết
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoFooter = document.getElementById("todoFooter");
const todoCount = document.getElementById("todoCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

// ==========================================================================
// 2. CÁC HÀM XỬ LÝ NGHIỆP VỤ (BUSINESS LOGIC)
// ==========================================================================

// Đồng bộ trạng thái mảng dữ liệu vào bộ nhớ LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("VANILLA_TODOS", JSON.stringify(todos));
}

// Thêm mới một công việc
function addTodo(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo = {
        id: Date.now(), // Định danh duy nhất dựa trên mốc thời gian độc nhất
        text: trimmedText,
        completed: false
    };

    todos.push(newTodo);
    saveToLocalStorage();
    render();
}

// Xóa một công việc theo ID
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    render();
}

// Đổi trạng thái hoàn thành (Toggle Completed Status)
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveToLocalStorage();
    render();
}

// Cập nhật sửa đổi nội dung văn bản của một công việc
function updateTodoText(id, newText) {
    const trimmedText = newText.trim();
    if (!trimmedText) {
        deleteTodo(id); // Nếu người dùng xóa sạch chữ -> tự động xóa todo
        return;
    }
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, text: trimmedText } : todo
    );
    saveToLocalStorage();
    render();
}

// Xóa toàn bộ các công việc đã làm xong (Clear Completed)
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveToLocalStorage();
    render();
}

// ==========================================================================
// 3. HÀM RENDER ĐỒNG BỘ GIAO DIỆN CHUẨN CHỈ (SỬ DỤNG CREATEELEMENT)
// ==========================================================================
function render() {
    // Xóa sạch toàn bộ giao diện danh sách cũ trước khi vẽ lại
    todoList.innerHTML = "";

    // Lọc danh sách sản phẩm hiển thị dựa trên bộ lọc currentFilter
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true; // "all"
    });

    // Duyệt mảng dữ liệu để xây dựng phần tử DOM bằng createElement
    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item-li";
        li.dataset.id = todo.id; // Gán ID vào data attribute để Event Delegation bốc được
        if (todo.completed) {
            li.classList.add("completed");
        }

        // Tạo thẻ bọc nội dung click chữ
        const wrapper = document.createElement("div");
        wrapper.className = "todo-content-wrapper";

        const spanText = document.createElement("span");
        spanText.className = "todo-text";
        spanText.textContent = todo.text; // Dùng textContent chống lỗ hổng bảo mật XSS tuyệt đối

        wrapper.appendChild(spanText);
        li.appendChild(wrapper);

        // Tạo nút bấm xóa ❌
        const destroyBtn = document.createElement("button");
        destroyBtn.className = "destroy-btn";
        destroyBtn.textContent = "❌";
        li.appendChild(destroyBtn);

        // Đẩy thẻ li hoàn chỉnh vào cây #todoList trên HTML
        todoList.appendChild(li);
    });

    // Cập nhật thanh điều khiển Footer
    if (todos.length > 0) {
        todoFooter.classList.remove("hidden");
        
        // Đếm số lượng công việc còn lại (chưa hoàn thành)
        const activeCount = todos.filter(todo => !todo.completed).length;
        todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

        // Ẩn/Hiện nút Clear Completed tùy thuộc vào việc có todo nào completed chưa
        const hasCompleted = todos.some(todo => todo.completed);
        if (hasCompleted) {
            clearCompletedBtn.classList.remove("hidden");
        } else {
            clearCompletedBtn.classList.add("hidden");
        }
    } else {
        todoFooter.classList.add("hidden");
    }
}

// ==========================================================================
// 4. KĨ THUẬT LẮNG NGHE SỰ KIỆN VÀ ỦY QUYỀN SỰ KIỆN (EVENT DELEGATION)
// ==========================================================================

// Sự kiện Submit Form để thêm mới Todo
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn hành vi tải lại trang mặc định của form
    const text = todoInput.value;
    addTodo(text);
    todoInput.value = ""; // Xóa sạch ô nhập liệu sau khi thêm thành công
});

// YÊU CẦU: EVENT DELEGATION - LẮNG NGHE ĐÓNG ĐINH DUY NHẤT TẠI CHA #TODOLIST
todoList.addEventListener("click", (e) => {
    // Tìm thẻ li cha gần nhất chứa phần tử vừa bị click trúng
    const li = e.target.closest(".todo-item-li");
    if (!li) return;
    const id = Number(li.dataset.id);

    // Trường hợp 1: Người dùng click vào nút xóa ❌
    if (e.target.classList.contains("destroy-btn")) {
        deleteTodo(id);
    } 
    // Trường hợp 2: Người dùng click vào vùng chữ -> tiến hành Toggle Completed
    else if (e.target.closest(".todo-content-wrapper")) {
        toggleTodo(id);
    }
});

// YÊU CẦU ĐẶC BIỆT: DOUBLE-CLICK ĐỂ ĐỔI THÀNH INPUT CHỈNH SỬA (EDIT MODE)
todoList.addEventListener("dblclick", (e) => {
    const li = e.target.closest(".todo-item-li");
    if (!li || li.classList.contains("completed")) return; // Không cho sửa todo đã xong

    const spanText = li.querySelector(".todo-text");
    if (!spanText || e.target !== spanText) return;

    const id = Number(li.dataset.id);
    const oldText = spanText.textContent;

    // Tạo nhanh một ô input đè lên thẻ li
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = oldText;

    // Hàm xử lý lưu kết quả khi kết thúc sửa đổi
    let isFinished = false;
    const finishEdit = () => {
        if (isFinished) return;
        isFinished = true;
        updateTodoText(id, editInput.value);
        editInput.remove(); // Xóa bỏ ô input sửa đổi sau khi hoàn tất
    };

    // Bắt sự kiện nhấn Enter để save hoặc phím Escape để hủy
    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            finishEdit();
        } else if (event.key === "Escape") {
            isFinished = true;
            editInput.remove(); // Hủy bỏ, giữ nguyên trạng chữ cũ
            render();
        }
    });

    // Nếu người dùng click ra ngoài khu vực ô input (Blur Event) -> tự động save
    editInput.addEventListener("blur", finishEdit);

    li.appendChild(editInput);
    editInput.focus(); // Tự động đưa con trỏ chuột tập trung vào ô input mới tạo
});

// Sự kiện cho bộ nút bấm 3 chế độ Lọc (All / Active / Completed)
filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Xóa class active ở nút cũ, gán sang nút vừa click
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        currentFilter = e.target.dataset.filter;
        render();
    });
});

// Sự kiện click nút Clear Completed
clearCompletedBtn.addEventListener("click", clearCompleted);

// LẦN ĐẦU TẢI TRANG: Kích hoạt render để đổ dữ liệu từ LocalStorage ra ngoài (nếu có)
render();