"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* HERO HERO SECTION CONTAINER */}
      <div className="max-w-4xl w-full text-center space-y-8 py-12 md:py-20 px-4">
        
        {/* EMERALD BADGE */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 rounded-full shadow-sm animate-fadeIn">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            A Citizens&apos; Initiative
          </span>
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-950 tracking-tight leading-tight">
          The Power to Shape Our Future Is In{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-neutral-950 to-emerald-600">
            Your Hands
          </span>
        </h1>

        {/* OPENING REFERENDUM PARAGRAPH */}
        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Kenya stands at a defining historical crossroads. This constitutional referendum initiative is a direct, lawful exercise of your sovereign power to demand systemic accountability, economic justice, and institutional reform. By appending your secure digital endorsement, you are not merely filling out a form—you are uniting with millions of patriotic citizens across all 47 counties to rescue our governance, protect public infrastructure, and build a truly equitable nation for generations to come.
        </p>

        {/* INTERACTIVE CALL TO ACTION SEGMENT */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link 
            href="/sign" 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-neutral-900 via-neutral-850 to-neutral-900 text-white font-bold rounded-xl shadow-xl shadow-gray-200 hover:shadow-2xl hover:bg-neutral-800 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-base border-b-4 border-emerald-600 group"
          >
            <span>Append Your Signature</span>
            <svg 
              className="w-5 h-5 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link 
            href="/about" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 transition-all text-center text-base"
          >
            Read Referendum Bill
          </Link>

        </div>

        {/* TRUST SIGNALS FOOTER */}
        <div className="pt-12 border-t border-gray-200/60 max-w-md mx-auto grid grid-cols-2 gap-4 text-center">
          <div>
            <span className="block text-2xl font-bold text-neutral-950 tracking-tight">100% Secure</span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Encrypted Portal</span>
          </div>
          <div className="border-l border-gray-200">
            <span className="block text-2xl font-bold text-neutral-950 tracking-tight">Direct Impact</span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Article 1 Compliant</span>
          </div>
        </div>

      </div>

    </div>
  );
}