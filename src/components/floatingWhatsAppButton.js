// FloatingWhatsAppButton.js
import React from 'react';
// import './FloatingWhatsAppButton.css';

const FloatingWhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Replace '1234567890' with the actual phone number you want to open a chat with
    const phoneNumber = '+919600207309';
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <button class="floating-whatsapp-button" onClick={handleWhatsAppClick}>
      <i class="fa fa-whatsapp" style={{fontSize:"35px"}}></i>
    </button>
  );
};

export default FloatingWhatsAppButton;


