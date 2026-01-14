"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { data } from "@/data";
import { Search, Heart, ShoppingBag } from "lucide-react";

export function Navbar() {
  const { navbar } = data;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const activeMegaMenu = navbar.mainLinks.find(
    (link) => link.id === activeMenu && link.megaMenu
  )?.megaMenu;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 bg-background"
        ref={navRef}
      >
        <nav className="relative">
          {/* Main Nav Bar */}
          <div className="flex items-center justify-between h-16 px-6 lg:px-10">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold tracking-tight">
                {navbar.brandName}
              </span>
            </Link>

            {/* Center Navigation Links */}
            <div
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={handleMouseLeave}
            >
              {navbar.mainLinks.map((link) => (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                >
                  <Link
                    href={link.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium transition-colors
                      hover:text-foreground
                      ${activeMenu === link.id ? "text-foreground" : "text-muted-foreground"}
                    `}
                  >
                    {link.name}
                    {/* Underline indicator */}
                    {activeMenu === link.id && link.megaMenu && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute left-4 right-4 bottom-0 h-[2px] bg-foreground"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline text-sm">Search</span>
              </button>

              {/* Wishlist */}
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {activeMenu && activeMegaMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute left-0 right-0 top-full bg-background overflow-hidden"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="container max-w-6xl mx-auto px-6 lg:px-10 py-10">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    className="grid grid-cols-4 gap-8"
                  >
                    {activeMegaMenu.columns.map((column, colIndex) => (
                      <div key={column.title}>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                          {column.title}
                        </h3>
                        <ul className="space-y-3">
                          {column.links.map((link, linkIndex) => (
                            <motion.li
                              key={link.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.05 + colIndex * 0.02 + linkIndex * 0.01,
                              }}
                            >
                              <Link
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {link.name}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom Border */}
                <div className="border-b border-border" />
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[60] flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full h-14 pl-12 pr-4 text-lg bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
