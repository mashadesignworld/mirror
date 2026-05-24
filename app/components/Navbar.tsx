"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 shadow-md backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: BRAND LOGO & TITLE */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.jpg" 
                alt="FreeKenya Logo" 
                width={48}
                height={48}
                priority
                className="h-12 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:block border-l border-neutral-700 pl-3">
                <span className="block text-white font-bold tracking-tight text-lg leading-tight">
                  FreeKenya
                </span>
                <span className="block text-emerald-500 text-xs font-semibold uppercase tracking-widest">
                  Movement
                </span>
              </div>
            </Link>
          </div>

          {/* CENTER/RIGHT: DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full">
              About Movement
            </Link>
            <Link href="/vision" className="text-gray-300 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full">
              Our Vision
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 after:transition-all hover:after:w-full">
              Contact Support
            </Link>
          </div>

          {/* RIGHT: CTA STATUS INDICATOR */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700/60 px-4 py-2 rounded-full shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Portal Live
              </span>
            </div>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100 border-t border-neutral-800" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-neutral-900/95 sm:px-3 shadow-inner">
          <Link href="/" className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors">
            About Movement
          </Link>
          <Link href="/vision" className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors">
            Our Vision
          </Link>
          <Link href="/support" className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </nav>
  );
}