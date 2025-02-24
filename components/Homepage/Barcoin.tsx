'use client'
import { useEffect } from 'react';

const Barcoin = () => {
  useEffect(() => {
    // ใช้ useEffect เพื่อให้มั่นใจว่า script จะถูกโหลดหลังจาก component ถูกเรนเดอร์แล้ว
    const script = document.createElement('script');
    script.src = 'https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // ลบ script เมื่อ component ถูก unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <gecko-coin-price-marquee-widget
      locale="en"
      outlined="true"
      coin-ids=""
      initial-currency="usd"
    ></gecko-coin-price-marquee-widget>
  );
};

export default Barcoin;
