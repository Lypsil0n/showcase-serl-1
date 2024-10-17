import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <nav>
        <ul className='nav-list'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/list">Project List</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
