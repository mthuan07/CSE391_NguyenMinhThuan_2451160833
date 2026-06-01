// ==========================================================================
// BÀI 2.1 & BÀI 2.3 — CLIENT-SIDE JAVASCRIPT INTERACTION LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Kích hoạt tính năng Form Validation của Bootstrap 5 cho Biểu mẫu liên hệ
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault(); // Ngăn chặn tải lại trang nếu nhập thiếu dữ liệu
                event.stopPropagation();
            }
            form.classList.add('was-validated'); // Dội class CSS báo viền xanh/đỏ của Bootstrap
        }, false);
    });

    // 2. Tự động đóng thanh Menu thu gọn (Collapse Navbar) trên Mobile sau khi bấm Link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('portfolioNav');
    
    if (navbarCollapse) {
        // Khởi tạo đối tượng Collapse theo API chuẩn của Bootstrap 5
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Chỉ ra lệnh đóng nếu màn hình hiện tại nhỏ hơn kích thước Desktop (768px)
                if (window.innerWidth < 768) {
                    bsCollapse.hide();
                }
            });
        });
    }

    console.log("🚀 JavaScript core logic for Bootstrap 5 Portfolio initialized!");
});