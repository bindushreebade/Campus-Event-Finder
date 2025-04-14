
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, User, Menu, X, Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navLinkStyle = `transition-colors hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`;



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card bg-white/90 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className={`font-semibold text-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
              CampusEvents
            </span>
          </Link>
  
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
            <Link to="/" className={`font-semibold text-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Events</Link>
            <Link to="/categories" className={`font-semibold text-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Categories</Link>
            <Link to="/calendar" className={`font-semibold text-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>Calendar</Link>
            <Link to="/about" className={`font-semibold text-lg transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>About</Link>
          </nav>
  
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="rounded-full pl-9 pr-4 py-1.5 bg-secondary/50 focus:bg-white focus:ring-2 focus:ring-primary/30 transition-all text-sm w-40 focus:w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
  
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
  
            {/* Profile */}
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
  
            <Link to="/create-event">
              <Button size="sm" className="rounded-full flex items-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                Create Event
              </Button>
            </Link>
          </div>
  
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
  
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-in">
          <div className="container mx-auto px-4 py-4 space-y-6">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="rounded-full pl-9 pr-4 py-2 bg-secondary/50 focus:bg-white focus:ring-2 focus:ring-primary/30 transition-all text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
  
            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                Events
              </Link>
              <Link to="/categories" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/calendar" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                Calendar
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/profile" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                My Profile
              </Link>
              <Link to="/notifications" className="text-foreground hover:text-primary transition-colors px-2 py-1" onClick={toggleMenu}>
                Notifications
              </Link>
            </nav>
  
            <Link to="/create-event" className="block" onClick={toggleMenu}>
              <Button className="w-full flex items-center justify-center">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
  
};

export default Navbar;
