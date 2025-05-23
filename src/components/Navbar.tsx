
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Menu, X, User, Heart, Compass, Home, BedDouble } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: "/", label: "Home", icon: <Home size={16} /> },
    { href: "/listings", label: "Stays", icon: <BedDouble size={16} /> },
    { href: "/explore", label: "Explore", icon: <Compass size={16} /> },
    { href: "/favorites", label: "Favorites", icon: <Heart size={16} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                StayEase
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-full flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200",
                  location.pathname === link.href && "text-blue-600 bg-blue-50 font-medium"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/host/new">
              <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                Become a host
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-blue-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-all",
                    location.pathname === link.href && "text-blue-600 bg-blue-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
                <Link to="/host/new" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600">
                    Become a host
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <div className="px-4 py-2">
                    <ProfileDropdown />
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
