import { useState } from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Navbar = ({ onMenuToggle, isMenuOpen }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Rx</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-white text-xl font-semibold">PharmStock</h1>
              <p className="text-white/80 text-sm">Pharmacy Management</p>
            </div>
          </div>
        </div>

        {/* Center Section: Search Bar
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
            <Input
              placeholder="Search medicines, batches, suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 text-white placeholder-white/70 border-0 focus:bg-white/30 focus:backdrop-blur-sm transition-all duration-200"
            />
          </div>
        </div>
         */}

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-white/20 bg-white/20 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border border-white bg-card shadow-lg w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3 hover:!bg-black/20">
                <span className="font-medium text-warning">Low Stock Alert</span>
                <span className="text-sm text-muted-foreground">Amoxicillin - Only 45 units left</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 hover:!bg-black/20">
                <span className="font-medium text-destructive">Expiry Warning</span>
                <span className="text-sm text-muted-foreground">Omeprazole expires in 30 days</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 hover:!bg-black/20">
                <span className="font-medium text-destructive">Critical Stock</span>
                <span className="text-sm text-muted-foreground">Metformin - Only 15 units left</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-transparent">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:block text-white text-sm font-medium">Dr. Smith</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
