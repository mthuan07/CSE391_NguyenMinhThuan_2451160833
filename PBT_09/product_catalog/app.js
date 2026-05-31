// ==========================================================================
// 1. DATA LAYER: KHAI BÁO MẢNG DỮ LIỆU ĐẦU VÀO (Ít nhất 12 SP, 4 Categories)
// ==========================================================================
const products = [
    { id: 1, name: "iPhone 16 Pro Max", price: 34990000, category: "phone", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300", rating: 4.9, inStock: true, desc: "Siêu phẩm Apple 2026 với chip A18 Pro mãnh thú, khung titan bền bỉ bậc nhất và camera zoom quang học khủng." },
    { id: 2, name: "MacBook Pro M4", price: 49990000, category: "laptop", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300", rating: 4.8, inStock: true, desc: "Cỗ máy đồ họa tối thượng dành cho dân công nghệ chuyên nghiệp, màn hình Liquid Retina XDR siêu nét." },
    { id: 3, name: "AirPods Pro 2", price: 6190000, category: "accessory", image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300", rating: 4.5, inStock: true, desc: "Tính năng chống tiếng ồn chủ động ANC thông minh cải tiến gấp đôi, thời lượng pin trâu bò kèm sạc Type-C." },
    { id: 4, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300", rating: 4.7, inStock: false, desc: "Máy tính bảng mỏng nhất thế giới, sức mạnh chip M4 hủy diệt đáp ứng mọi tác vụ vẽ thiết kế đồ họa đỉnh cao." },
    { id: 5, name: "Samsung Galaxy S26 Ultra", price: 31990000, category: "phone", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300", rating: 4.8, inStock: true, desc: "Camera AI độ phân giải 200MP bắt trọn dải ngân hà, bút S-Pen đa nhiệm mượt mà thần tốc." },
    { id: 6, name: "Asus ROG Strix G16", price: 38990000, category: "laptop", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300", rating: 4.6, inStock: true, desc: "Quái vật laptop gaming thế hệ mới cấu hình card đồ họa RTX series, tản nhiệt khí ba luồng mát lạnh." },
    { id: 7, name: "Sony WH-1000XM5", price: 7490000, category: "accessory", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300", rating: 4.7, inStock: true, desc: "Chất lượng âm thanh High-Res Audio đỉnh cao thế giới, thiết kế êm ái bo cong cách âm hoàn hảo." },
    { id: 8, name: "Xiaomi Pad 7 Pro", price: 9490000, category: "tablet", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300", rating: 4.3, inStock: true, desc: "Màn hình 144Hz siêu mượt phân khúc tầm trung, dung lượng pin cực khủng 10.000mAh dùng cả ngày." },
    { id: 9, name: "Google Pixel 10 Pro", price: 26500000, category: "phone", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300", rating: 4.6, inStock: true, desc: "Nhiếp ảnh thuật toán AI ma thuật đỉnh cao từ Google, trải nghiệm hệ điều hành Android gốc siêu mượt." },
    { id: 10, name: "Dell XPS 14 2026", price: 44990000, category: "laptop", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300", rating: 4.5, inStock: true, desc: "Tuyệt tác thiết kế nhôm nguyên khối siêu mỏng nhẹ thời trang, bàn di chuột vô cực ẩn hiện độc đáo." },
    { id: 11, name: "Apple Watch Ultra 3", price: 22990000, category: "accessory", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=300", rating: 4.9, inStock: true, desc: "Đồng hồ sinh tồn thể thao chuyên nghiệp vỏ titan chuẩn quân đội, định vị GPS kép đa tần số siêu chuẩn." },
    { id: 12, name: "Samsung Galaxy Tab S10+", price: 19990000, category: "tablet", image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=300", rating: 4.4, inStock: true, desc: "Màn hình Dynamic AMOLED 2X rực rỡ, hỗ trợ kết nối hệ sinh thái Galaxy AI làm việc chuyên sâu." }
];

// ==========================================================================
// 2. STATE LAYER: TRẠNG THÁI TOÀN CỤC CỦA CATALOG
// ==========================================================================
let cartCount = 0;
let searchKeyword = "";
let selectedCategory = "all";
let currentSortOrder = "default";

// Cấu hình các nút lọc Category tĩnh phục vụ vẽ giao diện
const categories = [
    { id: "all", name: "Tất Cả" },
    { id: "phone", name: "Điện Thoại" },
    { id: "laptop", name: "Máy Tính" },
    { id: "tablet", name: "Máy Tính Bảng" },
    { id: "accessory", name: "Phụ Kiện" }
];

// ==========================================================================
// 3. LAYOUT INITIALIZATION: DỰNG BỘ KHUNG GIAO DIỆN (100% JAVASCRIPT)
// ==========================================================================
const root = document.getElementById("root");

// Tạo Header
const header = document.createElement("header");
header.className = "app-header";
header.innerHTML = `
    <h2>TECH STORE</h2>
    <div class="header-right">
        <button id="themeToggle" class="btn-toggle">🌙 Dark Mode</button>
        <div class="cart-icon-wrapper">
            🛒 <span id="cartBadge" class="cart-badge">0</span>
        </div>
    </div>
`;
root.appendChild(header);

// Tạo Control Panel (Search & Sort)
const controlPanel = document.createElement("div");
controlPanel.className = "control-panel";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.className = "search-input";
searchInput.placeholder = "Tìm kiếm sản phẩm nhanh theo tên...";
controlPanel.appendChild(searchInput);

const sortSelect = document.createElement("select");
sortSelect.className = "sort-select";
sortSelect.innerHTML = `
    <option value="default">Sắp xếp mặc định</option>
    <option value="price-asc">Giá: Thấp đến Cao</option>
    <option value="price-desc">Giá: Cao đến Thấp</option>
    <option value="name-asc">Tên: A - Z</option>
    <option value="rating-desc">Đánh giá cao nhất</option>
`;
controlPanel.appendChild(sortSelect);
root.appendChild(controlPanel);

// Tạo Category Filter Bar
const filterBar = document.createElement("div");
filterBar.className = "category-filters";
categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${cat.id === "all" ? "active" : ""}`;
    btn.textContent = cat.name;
    btn.dataset.category = cat.id;
    filterBar.appendChild(btn);
});
root.appendChild(filterBar);

// Tạo Grid chứa danh sách sản phẩm
const productGrid = document.createElement("div");
productGrid.className = "product-grid";
root.appendChild(productGrid);

// Tạo Khung sườn Modal Lightbox ẩn sẵn dưới đáy DOM
const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay hidden-element";
modalOverlay.innerHTML = `
    <div class="modal-content">
        <button class="modal-close">✕</button>
        <div class="modal-body" id="modalBody"></div>
    </div>
`;
document.body.appendChild(modalOverlay);

// ==========================================================================
// 4. FUNCTIONAL LAYER: CÁC HÀM XỬ LÝ ĐIỀU KHIỂN CHUYÊN BIỆT
// ==========================================================================

// Hàm 1: Render danh sách sản phẩm ra ngoài giao diện dạng Cards
function renderProducts() {
    productGrid.innerHTML = ""; // Clear grid cũ

    // Áp dụng dây chuyền lọc dữ liệu: Lọc danh mục -> Lọc từ khóa kiếm -> Sắp xếp
    let displayList = filterByCategory(products);
    displayList = searchProducts(displayList);
    displayList = sortProducts(displayList);

    // Xử lý vẽ giao diện nếu không tìm thấy sản phẩm nào
    if (displayList.length === 0) {
        const noProductMsg = document.createElement("p");
        noProductMsg.textContent = "Không tìm thấy sản phẩm nào khớp với điều kiện lọc.";
        noProductMsg.style.color = "var(--text-muted)";
        productGrid.appendChild(noProductMsg);
        return;
    }

    // Vẽ từng thẻ Card sản phẩm bằng phương pháp createElement
    displayList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id; // Lưu ID để click bốc data

        const imgBox = document.createElement("div");
        imgBox.className = "image-box";
        const img = document.createElement("img");
        img.className = "product-img";
        img.src = product.image;
        img.alt = product.name;
        imgBox.appendChild(img);
        card.appendChild(imgBox);

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;
        info.appendChild(name);

        const meta = document.createElement("div");
        meta.className = "product-meta";
        const rating = document.createElement("span");
        rating.textContent = `⭐ ${product.rating}`;
        const stock = document.createElement("span");
        stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
        stock.style.color = product.inStock ? "var(--primary-color)" : "var(--accent-color)";
        meta.appendChild(rating);
        meta.appendChild(stock);
        info.appendChild(meta);

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = product.price.toLocaleString("vi-VN") + "đ";
        info.appendChild(price);

        const btnAdd = document.createElement("button");
        btnAdd.className = "btn-add-cart";
        btnAdd.textContent = product.inStock ? "Thêm vào giỏ" : "Tạm hết hàng";
        btnAdd.disabled = !product.inStock;
        
        // Ngăn chặn nổi bọt sự kiện khi bấm nút mua (để không bị mở nhầm Modal)
        btnAdd.addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            document.getElementById("cartBadge").textContent = cartCount;
        });

        info.appendChild(btnAdd);
        card.appendChild(info);
        productGrid.appendChild(card);
    });
}

// Hàm 2: Lọc sản phẩm theo mốc Category
function filterByCategory(arr) {
    if (selectedCategory === "all") return arr;
    return arr.filter(p => p.category === selectedCategory);
}

// Hàm 3: Lọc sản phẩm tìm kiếm Realtime mờ (Case-Insensitive)
function searchProducts(arr) {
    if (!searchKeyword.trim()) return arr;
    const lowerKey = searchKeyword.toLowerCase();
    return arr.filter(p => p.name.toLowerCase().includes(lowerKey));
}

// Hàm 4: Sắp xếp mảng theo yêu cầu dropdown
function sortProducts(arr) {
    const listCopy = [...arr]; // Copy mảng tránh đột biến mảng gốc
    switch (currentSortOrder) {
        case "price-asc":
            return listCopy.sort((a, b) => a.price - b.price);
        case "price-desc":
            return listCopy.sort((a, b) => b.price - a.price);
        case "name-asc":
            return listCopy.sort((a, b) => a.name.localeCompare(b.name));
        case "rating-desc":
            return listCopy.sort((a, b) => b.rating - a.rating);
        default:
            return listCopy; // "default" giữ nguyên thứ tự khai báo mảng ban đầu
    }
}

// Hàm 5: Mở hộp thoại Modal Lightbox hiển thị chi tiết sản phẩm
function openModal(productId) {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-color)">${targetProduct.name}</h2>
        <div style="margin: 15px 0; font-weight: 700; font-size: 18px">
            Giá bán lẻ: ${targetProduct.price.toLocaleString("vi-VN")}đ
        </div>
        <p><strong>Danh mục:</strong> ${targetProduct.category.toUpperCase()}</p>
        <p><strong>Đánh giá hệ thống:</strong> ⭐ ${targetProduct.rating} / 5.0</p>
        <p style="margin-top: 10px; font-style: italic;">${targetProduct.desc}</p>
    `;
    modalOverlay.classList.remove("hidden-element");
}

// ==========================================================================
// 5. EVENT CONTROLLERS: GẮN SỰ KIỆN ĐIỀU KHIỂN TƯƠNG TÁC
// ==========================================================================

// Sự kiện 1: Đọc ô tìm kiếm Realtime (Dùng sự kiện input chạy mượt mà ngay khi gõ)
searchInput.addEventListener("input", (e) => {
    searchKeyword = e.target.value;
    renderProducts();
});

// Sự kiện 2: Thay đổi dropdown sắp xếp giá/tên
sortSelect.addEventListener("change", (e) => {
    currentSortOrder = e.target.value;
    renderProducts();
});

// Sự kiện 3: Chuyển tab lọc Danh mục
filterBar.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    
    // Đổi trạng thái active cho các nút bấm
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    selectedCategory = e.target.dataset.category;
    renderProducts();
});

// Sự kiện 4: Event Delegation - Click vào Card sản phẩm bất kỳ để kích hoạt bật Modal
productGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = Number(card.dataset.id);
    openModal(id);
});

// Sự kiện 5: Tắt Modal Lightbox (Click nút X hoặc Click trượt ra vùng đen ngoài)
modalOverlay.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("modal-close")) {
        modalOverlay.classList.add("hidden-element");
    }
});

// Sự kiện 6: Bật/Tắt chế độ Dark Mode hệ thống
document.getElementById("themeToggle").addEventListener("click", (e) => {
    const body = document.body;
    body.classList.toggle("dark-mode");
    
    if (body.classList.contains("dark-mode")) {
        e.target.textContent = "☀️ Light Mode";
    } else {
        e.target.textContent = "🌙 Dark Mode";
    }
});

// KHỞI CHẠY LẦN ĐẦU TẢI TRANG: Kích hoạt hiển thị toàn bộ kho hàng
renderProducts();