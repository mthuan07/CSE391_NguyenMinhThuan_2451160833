import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');

  // Hàm nhận thông tin callback từ component Con (Contact.jsx) gửi ngược lên thông qua Props Flow
  const handleShowToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000); // Tự động đóng sau 3 giây
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact onShowToast={handleShowToast} />
      </main>
      <Footer />

      {/* Hiển thị Toast thông báo khi có sự thay đổi state */}
      {toastMessage && <div className="toast-msg">{toastMessage}</div>}
    </>
  );
}