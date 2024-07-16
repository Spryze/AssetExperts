import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const StickyButtons = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      right: '2px', 
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      zIndex: 1000
    }}>
      <a href="https://wa.me/8328844832" className="whatsapp-button" style={{
        display: 'block',
        width: '50px',
        height: '50px',
        marginBottom: '10px',
        backgroundColor: '#25D366', 
        color: '#FFF',
        textDecoration: 'none',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '50px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease'
      }} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon style={{ fontSize: '24px' }} />
      </a>
      <a href="tel:+918328844832" className="phone-button" style={{
        display: 'block',
        width: '50px',
        height: '50px',
        marginBottom: '10px',
        backgroundColor: '#00204A',
        color: '#FFF',
        textDecoration: 'none',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '50px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease'
      }}>
        <LocalPhoneIcon style={{ fontSize: '24px' }} />
      </a>
    </div>
  );
}

export default StickyButtons;
