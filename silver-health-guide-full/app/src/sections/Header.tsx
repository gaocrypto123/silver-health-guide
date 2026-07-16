import { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: '痛点', href: '#threat' },
    { label: 'AI鉴别', href: '#detection' },
    { label: '技术', href: '#tech' },
    { label: '冷静提醒', href: '#cooling' },
    { label: '骗局库', href: '#scams' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#16c5d4] to-[#3898ec] flex items-center justify-center shadow-lg shadow-[#16c5d4]/20 group-hover:shadow-[#16c5d4]/40 transition-shadow">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#1a1a1a]">
              银发康鉴
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#555555] hover:text-[#16c5d4] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#16c5d4] to-[#3898ec] rounded-full hover:shadow-lg hover:shadow-[#16c5d4]/25 transition-all duration-300"
            >
              支持我们
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#1a1a1a]" />
            ) : (
              <Menu className="w-5 h-5 text-[#1a1a1a]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="section-padding py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[#555555] hover:text-[#16c5d4] hover:bg-[#16c5d4]/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 mt-2 text-sm font-medium text-center text-white bg-gradient-to-r from-[#16c5d4] to-[#3898ec] rounded-full"
            >
              支持我们
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
