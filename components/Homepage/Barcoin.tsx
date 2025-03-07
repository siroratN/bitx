'use client'
import { useEffect } from 'react';

const Barcoin = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
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
