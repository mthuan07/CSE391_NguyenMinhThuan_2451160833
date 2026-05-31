// ==========================================================================
// 1. DATA LAYER: DANH SÁCH ẢNH VÀ MẢNG COMMANDS ĐIỀU HÀNH
// ==========================================================================
const galleryData = [
    { id: 1, title: "Siêu máy tính lượng tử 2026", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600" },
    { id: 2, title: "Thiết kế thành phần vi xử lý Cyber", url: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=600" },
    { id: 3, title: "Trạm máy chủ lưu trữ Cloud tối mật", url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600" },
    { id: 4, title: "Mạng lưới kết nối Blockchain toàn cầu", url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600" },
    { id: 5, title: "Phòng thí nghiệm trí tuệ nhân tạo AI", url: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600" }
];

// Danh sách toàn bộ các tác vụ lệnh có sẵn trong hệ thống Command Palette
const appCommands = [
    { id: "cmd-next", word: "Chuyển sang ảnh kế tiếp", action: () => nextImage(), tip: "→" },
    { id: "cmd-prev", word: "Quay lại ảnh phía trước", action: () => prevImage(), tip: "←" },
    { id: "cmd-play", word: "Bật chế độ tự động chạy Slideshow", action: () => startSlideshow(), tip: "Space" },
    { id: "cmd-pause", word: "Dừng chế độ tự động chạy Slideshow", action: () => stopSlideshow(), tip: "Space" },
    { id: "cmd-dark", word: "Kích hoạt giao diện Tối (Dark Mode)", action: () => setDarkTheme(true), tip: "Palette" },
    { id: "cmd-light", word: "Kích hoạt giao diện Sáng (Light Mode)", action: () => setDarkTheme(false), tip: "Palette" }
];

// ==========================================================================
// 2. STATE LAYER: BIẾN QUẢN LÝ TRẠNG THÁI HỆ THỐNG
// ==========================================================================
let activeImageIndex = 0; // Chỉ mục bức ảnh đang hiển thị (0 -> 4)
let slideshowIntervalId = null; // Quản lý bộ đếm thời gian tự động trình chiếu
let selectedCommandIndex = 0; // Vị trí tiêu điểm lệnh đang chọn trong Palette bằng phím lên/xuống
let filteredCommands = [...appCommands]; // Danh sách lệnh sau khi lọc tìm kiếm

// Các phần tử DOM tương tác chính
const mainImage = document.getElementById("mainImage");
const imageCaption = document.getElementById("imageCaption");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const slideshowStatus = document.getElementById("slideshowStatus");

const commandPalette = document.getElementById("commandPalette");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

// ==========================================================================
// 3. CORE FUNCTIONS: XỬ LÝ NGHIỆP VỤ HÌNH ẢNH VÀ GIAO DIỆN
// ==========================================================================

// Hàm khởi tạo vẽ danh sách ảnh thu nhỏ có đầy đủ thuộc tính hỗ trợ Người Khuyết Tật (Accessibility)
function initThumbnails() {
    thumbnailContainer.innerHTML = "";
    galleryData.forEach((img, idx) => {
        const btn = document.createElement("button");
        btn.className = "thumb-btn";
        btn.setAttribute("role", "option");
        btn.setAttribute("aria-label", `Xem ảnh số ${idx + 1}: ${img.title}`);
        btn.setAttribute("aria-selected", idx === activeImageIndex ? "true" : "false");
        
        const thumbImg = document.createElement("img");
        thumbImg.src = img.url;
        thumbImg.alt = `Ảnh thu nhỏ số ${idx + 1}`;
        btn.appendChild(thumbImg);

        // Click chuột thông thường vẫn được chấp nhận
        btn.addEventListener("click", () => {
            switchImage(idx);
        });

        thumbnailContainer.appendChild(btn);
    });
}

// Thay đổi ảnh hiển thị chính theo chỉ mục chọn sẵn
function switchImage(index) {
    if (index < 0 || index >= galleryData.length) return;
    activeImageIndex = index;

    const currentData = galleryData[activeImageIndex];
    mainImage.src = currentData.url;
    mainImage.alt = `Ảnh chính: ${currentData.title}`;
    imageCaption.textContent = `[Ảnh ${activeImageIndex + 1}/${galleryData.length}] - ${currentData.title}`;

    // Cập nhật trạng thái viền active lề giao diện cho các nút thu nhỏ
    const buttons = thumbnailContainer.querySelectorAll(".thumb-btn");
    buttons.forEach((btn, idx) => {
        if (idx === activeImageIndex) {
            btn.classList.add("active-thumb");
            btn.setAttribute("aria-selected", "true");
        } else {
            btn.classList.remove("active-thumb");
            btn.setAttribute("aria-selected", "false");
        }
    });
}

function nextImage() {
    let target = activeImageIndex + 1;
    if (target >= galleryData.length) target = 0; // Hết mảng thì vòng về đầu
    switchImage(target);
}

function prevImage() {
    let target = activeImageIndex - 1;
    if (target < 0) target = galleryData.length - 1; // Nhỏ hơn 0 quay về cuối mảng
    switchImage(target);
}

// Bật / Tắt trình chiếu Slideshow tự động
function startSlideshow() {
    if (slideshowIntervalId) return; // Nếu đang chạy rồi thì thôi
    slideshowStatus.classList.remove("hidden");
    slideshowStatus.textContent = "▶ SLIDESHOW: ON";
    slideshowIntervalId = setInterval(nextImage, 2500); // Tự chuyển ảnh sau mỗi 2.5 giây
}

function stopSlideshow() {
    if (!slideshowIntervalId) return;
    slideshowStatus.classList.add("hidden");
    clearInterval(slideshowIntervalId);
    slideshowIntervalId = null;
}

function setDarkTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

// ==========================================================================
// 4. COMMAND PALETTE LOGIC & RENDER WORKFLOW
// ==========================================================================

function openCommandPalette() {
    commandPalette.classList.remove("hidden");
    paletteInput.value = "";
    searchCommands(""); // Hiển thị toàn bộ lệnh lúc ban đầu mở ra
    paletteInput.focus(); // Đẩy tiêu điểm bàn phím ăn chặt vào ô input tìm kiếm
}

function closeCommandPalette() {
    commandPalette.classList.add("hidden");
    paletteInput.blur();
}

// Tìm kiếm lệnh thời gian thực và vẽ kết quả danh sách ra bảng overlay
function searchCommands(keyword) {
    const key = keyword.trim().toLowerCase();
    
    // Sử dụng hàm filter mảng đã học ở chương trước để lọc nhanh từ khóa lệnh
    filteredCommands = appCommands.filter(cmd => cmd.word.toLowerCase().includes(key));
    selectedCommandIndex = 0; // Trả vạch sáng chọn lựa về dòng đầu tiên

    commandList.innerHTML = "";

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = "command-item";
        li.setAttribute("role", "option");
        li.id = `cmd-item-${idx}`;

        if (idx === selectedCommandIndex) {
            li.classList.add("focused-item");
        }

        // Dùng textContent bảo mật an toàn ngăn chặn hoàn toàn lỗ hổng XSS
        const labelSpan = document.createElement("span");
        labelSpan.textContent = cmd.word;
        li.appendChild(labelSpan);

        const shortcutSpan = document.createElement("span");
        shortcutSpan.className = "shortcut-tip";
        shortcutSpan.textContent = cmd.tip;
        li.appendChild(shortcutSpan);

        // Click bằng chuột vẫn kích hoạt thực hiện lệnh bình thường
        li.addEventListener("click", () => {
            cmd.action();
            closeCommandPalette();
        });

        commandList.appendChild(li);
    });
}

// Hàm di chuyển vạch chọn lệnh sáng xanh lên / xuống trong bảng Command Palette
function moveCommandFocus(direction) {
    const items = commandList.querySelectorAll(".command-item");
    if (items.length === 0) return;

    // Xóa bỏ class sáng ở dòng cũ
    items[selectedCommandIndex].classList.remove("focused-item");

    if (direction === "down") {
        selectedCommandIndex = (selectedCommandIndex + 1) % items.length;
    } else if (direction === "up") {
        selectedCommandIndex = (selectedCommandIndex - 1 + items.length) % items.length;
    }

    // Gán class sáng sang dòng mới chọn lựa và tự động cuộn khung nhìn theo
    items[selectedCommandIndex].classList.add("focused-item");
    items[selectedCommandIndex].scrollIntoView({ block: "nearest" });
}

// ==========================================================================
// 5. GLOBAL SHORTCUTS CONTROLLER: BẮT SỰ KIỆN TOÀN CỤC BAN PHÍM
// ==========================================================================

document.addEventListener("keydown", (e) => {
    // TÌNH HUỐNG 1: TRẠNG THÁI BẢNG COMMAND PALETTE ĐANG MỞ
    if (!commandPalette.classList.contains("hidden")) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeCommandPalette();
        } else if (e.key === "ArrowDown") {
            e.preventDefault(); // Chặn hành vi cuộn trang dọc mặc định của trình duyệt
            moveCommandFocus("down");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveCommandFocus("up");
        } else if (e.key === "Enter") {
            e.preventDefault();
            // Nếu có kết quả lệnh khớp, thực thi ngay hành động của lệnh đó khi gõ Enter
            if (filteredCommands[selectedCommandIndex]) {
                filteredCommands[selectedCommandIndex].action();
                closeCommandPalette();
            }
        }
        return; // Khóa chặt luồng, không cho phím bắn xuống các sự kiện của Gallery ảnh bên dưới
    }

    // TÌNH HUỐNG 2: ĐIỀU KHIỂN HỆ THỐNG GALLERY ẢNH Ở MÀN HÌNH CHÍNH MẶC ĐỊNH
    
    // Kiểm tra tổ hợp phím mở lệnh nhanh: Ctrl + K (hoặc Cmd + K trên dòng máy Mac)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Chặn hành vi mở hộp thư tìm kiếm gốc mặc định của trình duyệt Chrome
        openCommandPalette();
        return;
    }

    // Bắt phím Escape để tắt nhanh trạng thái tự động trình chiếu ảnh
    if (e.key === "Escape") {
        stopSlideshow();
    }

    // Bắt phím Cách (Space) bật/tắt Slideshow
    // (Bí thuật: Chặn e.preventDefault() để khi ấn phím cách, trang web không bị tự nhảy tụt xuống đáy lề dọc)
    if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        if (slideshowIntervalId) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    }

    // Bắt phím Mũi tên Trái / Phải để chuyển ảnh qua lại mượt mà
    if (e.key === "ArrowRight") {
        nextImage();
    } else if (e.key === "ArrowLeft") {
        prevImage();
    }

    // Bắt phím số từ 1 đến 5 để nhảy cóc thẳng đến bức ảnh tương ứng trong kho lưu trữ
    if (e.key >= "1" && e.key <= "5") {
        const targetIndex = parseInt(e.key, 10) - 1;
        switchImage(targetIndex);
    }
});

// Lắng nghe sự kiện người dùng gõ chữ vào ô tìm kiếm lệnh trong Palette để lọc realtime
paletteInput.addEventListener("input", (e) => {
    searchCommands(e.target.value);
});

// KHỞI CHẠY LẦN ĐẦU TIÊN TẢI TRANG
initThumbnails();
switchImage(0); // Mặc định hiển thị bức ảnh đầu tiên lúc khởi động ứng dụng