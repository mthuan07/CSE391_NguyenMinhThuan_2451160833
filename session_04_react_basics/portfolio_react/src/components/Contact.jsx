import { useState } from 'react';

export default function Contact({ onShowToast }) {
  // Bài 4.4: Sử dụng 1 Single State Object duy nhất để quản lý toàn diện Form dữ liệu đầu vào
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  // Hàm xử lý Event Handler onChange dùng chung siêu tốc
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa dấu vết thông báo lỗi ngay khi người dùng gõ phím thay đổi nội dung
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Logic kiểm soát dữ liệu Form Validation thuần túy
  const validateForm = () => {
    let currentErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) currentErrors.name = 'Họ và tên không được để trống';
    if (!formData.email.trim()) {
      currentErrors.email = 'Email không được để trống';
    } else if (!emailPattern.test(formData.email)) {
      currentErrors.email = 'Định dạng địa chỉ Email không hợp lệ';
    }
    if (!formData.message.trim()) currentErrors.message = 'Lời nhắn không được để trống';

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0; // Trả về true nếu mảng lỗi rỗng
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn hành vi submit tải lại trang web mặc định
    if (validateForm()) {
      onShowToast(`Xin chào ${formData.name}, Lời nhắn của bạn đã được gửi thành công!`);
      setFormData({ name: '', email: '', message: '' }); // Dọn sạch form
    }
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', background: 'var(--color-light)' }}>
      <div className="container" style={{ maxWidth: '600px', background: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
        <h2 className="section-heading" style={{ marginBottom: '2rem' }}>Get In Touch</h2>
        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.875rem 1rem', border: `2px solid ${errors.name ? 'var(--color-secondary)' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
            {errors.name && <p style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.875rem 1rem', border: `2px solid ${errors.email ? 'var(--color-secondary)' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
            {errors.email && <p style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '0.875rem 1rem', border: `2px solid ${errors.message ? 'var(--color-secondary)' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            {errors.message && <p style={{ color: 'var(--color-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.message}</p>}
          </div>

          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none', padding: '1rem', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', cursor: 'pointer' }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}