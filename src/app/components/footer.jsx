import React from 'react';

const Footer = () => {
    return (
    <footer style={{ color: 'black', textAlign: 'center', fontFamily: 'Trebuchet MS' }}>
        <p>© {new Date().getFullYear()} ShowcaseSERL. All rights reserved.</p>
    </footer>
    );
  };

export default Footer;