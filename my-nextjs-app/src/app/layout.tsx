import React from 'react';
import '../styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>{children}</main>
    </div>
  );
};

export default Layout;