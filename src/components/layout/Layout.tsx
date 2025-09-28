import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuToggle={handleMenuToggle} isMenuOpen={isSidebarOpen} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        
      <main className="flex-1 p-6 min-h-screen md:ml-64">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      </div>
    </div>
  );
};