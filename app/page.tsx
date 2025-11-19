"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Subscription = {
  id: string;
  name: string;
  price: string;
  nextRenewal: string;
  daysLeft: number;
  usage: "DAILY " | "WEEKLY" | "MONTHLY" | "RARELY";
};

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    price: "₹499 / mo",
    nextRenewal: "2025-12-01",
    daysLeft: 3,
    usage: "MONTHLY",
  },
  {
    id: "2",
    name: "Spotify",
    price: "₹129 / mo",
    nextRenewal: "2025-12-10",
    daysLeft: 12,
    usage: "WEEKLY",
  },
  {
    id: "3",
    name: "Notion",
    price: "₹4,500 / yr",
    nextRenewal: "2026-01-05",
    daysLeft: 47,
    usage: "RARELY",
  },
];

function getInitialTheme(): 'light' | 'dark' {
if(typeof window === 'undefined') return 'light';
const saved = window.localStorage.getItem('sg-theme');
if(saved ==='dark' || saved === 'light') return saved;
const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
return preferDark ? 'dark': 'light';
}

function applyTheme(theme : 'light' | 'dark'){
  const root = window.document.documentElement;
  if(theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  window.localStorage.setItem('sg-theme', theme);
}

export default function Home() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(()=> getInitialTheme());
  useEffect(()=>{applyTheme(theme);},[theme]);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            CB
          </div>
          <div>
            <h1 className="font-semibold">Cancel Buddy</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Never miss a cancel - save money
            </p>
          </div>
        </div>

        {/* nav */}
        
        <nav className="flex items-center gap-4">
         <button onClick={()=> setView('landing')} className={`px-3 py-1 rounded-md ${view === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Home</button>
         <button onClick={()=> setView('landing')} className={`px-3 py-1 rounded-md ${view === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Dashboard</button>
        </nav>
      </header>
    </div>
  );
}
