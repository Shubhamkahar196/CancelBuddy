// 'use client';

// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// type Subscription = {
//   id: string;
//   name: string;
//   price: string;
//   nextRenewal: string;
//   daysLeft: number;
//   usage: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'RARELY';
// };

// const mockSubscriptions: Subscription[] = [
//   { id: '1', name: 'Netflix', price: '₹499 / mo', nextRenewal: '2025-12-01', daysLeft: 3, usage: 'MONTHLY' },
//   { id: '2', name: 'Spotify', price: '₹129 / mo', nextRenewal: '2025-12-10', daysLeft: 12, usage: 'WEEKLY' },
//   { id: '3', name: 'Notion', price: '₹4,500 / yr', nextRenewal: '2026-01-05', daysLeft: 47, usage: 'RARELY' },
// ];

// function getInitialTheme(): 'light' | 'dark' {
//   if (typeof window === 'undefined') return 'light';
//   const saved = window.localStorage.getItem('cb-theme');
//   if (saved === 'dark' || saved === 'light') return saved;
//   const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   return prefersDark ? 'dark' : 'light';
// }
// function applyTheme(theme: 'light' | 'dark') {
//   const root = window.document.documentElement;
//   if (theme === 'dark') root.classList.add('dark');
//   else root.classList.remove('dark');
//   window.localStorage.setItem('cb-theme', theme);
// }

// export default function LandingPage() {
//   const [view, setView] = useState<'landing' | 'dashboard'>('landing');
//   const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());
//   useEffect(() => { applyTheme(theme); }, [theme]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
//       <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">CB</div>
//           <div>
//             <h1 className="font-semibold">CancelBuddy</h1>
//             <p className="text-xs text-slate-500 dark:text-slate-400">Never miss a cancel — save money</p>
//           </div>
//         </div>

//         <nav className="flex items-center gap-4">
//           <button onClick={() => setView('landing')} className={`px-3 py-1 rounded-md ${view === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Home</button>
//           <button onClick={() => setView('dashboard')} className={`px-3 py-1 rounded-md ${view === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}>Dashboard</button>
//           <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded-md border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
//             {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
//           </button>
//           <button className="px-4 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">Log in</button>
//           <button className="px-4 py-1 rounded-md bg-indigo-600 text-white">Sign up</button>
//         </nav>
//       </header>

//       <main className="max-w-6xl mx-auto px-6 pb-20">
//         <AnimatePresence mode="wait" initial={false}>
//           {view === 'landing' ? (
//             <motion.section key="landing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
//               <div>
//                 <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-4xl md:text-5xl font-extrabold leading-tight">Stop paying for subscriptions you don't use.</motion.h2>
//                 <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl">Get reminders before renewals and free trial endings so you can cancel on time and save money.</motion.p>
//                 <motion.div className="mt-6 flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
//                   <button onClick={() => setView('dashboard')} className="px-6 py-3 rounded-md bg-indigo-600 text-white font-medium shadow-md hover:scale-[1.02] transition-transform">Get Started</button>
//                   <button className="px-6 py-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">Live demo</button>
//                 </motion.div>
//               </div>

//               <div>
//                 <motion.div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-lg p-6 border border-slate-100 dark:border-slate-800" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-sm text-slate-500 dark:text-slate-400">Monthly spend</div>
//                       <div className="text-2xl font-semibold">₹1,077</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm text-slate-500 dark:text-slate-400">Next renewal</div>
//                       <div className="font-medium">Netflix — in 3 days</div>
//                     </div>
//                   </div>

//                   <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {mockSubscriptions.map((s, i) => (
//                       <motion.div key={s.id} className="rounded-lg p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700" whileHover={{ y: -6 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }}>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="font-medium">{s.name}</div>
//                             <div className="text-sm text-slate-500 dark:text-slate-400">{s.price}</div>
//                           </div>
//                           <div className={`text-sm font-semibold ${s.daysLeft <= 5 ? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>{s.daysLeft}d</div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.section>
//           ) : (
//             <motion.section key="dashboard" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="mt-8">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <motion.div className="col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <div className="text-xs text-slate-500 dark:text-slate-400">Total monthly</div>
//                       <div className="text-3xl font-bold">₹1,077</div>
//                     </div>
//                     <div className="text-sm text-slate-500 dark:text-slate-400">Welcome back — here are your subscriptions</div>
//                   </div>

//                   <div className="mt-6 space-y-3">
//                     {mockSubscriptions.map((sub, idx) => (
//                       <motion.div key={sub.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * idx }} whileHover={{ scale: 1.01 }}>
//                         <div>
//                           <div className="font-semibold">{sub.name}</div>
//                           <div className="text-sm text-slate-500 dark:text-slate-400">Renews {sub.nextRenewal} • {sub.usage}</div>
//                         </div>
//                         <div className="text-right">
//                           <div className={`font-semibold ${sub.daysLeft <= 5 ? 'text-rose-600' : ''}`}>{sub.price}</div>
//                           <div className="text-sm text-slate-500 dark:text-slate-400">{sub.daysLeft} days left</div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>

//                 <motion.aside className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-max" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
//                   <div className="text-sm text-slate-500 dark:text-slate-400">Upcoming Renewals</div>
//                   <div className="mt-3 space-y-3">
//                     {mockSubscriptions.slice().sort((a, b) => a.daysLeft - b.daysLeft).map((s) => (
//                       <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
//                         <div>
//                           <div className="font-medium">{s.name}</div>
//                           <div className="text-xs text-slate-400 dark:text-slate-500">{s.nextRenewal}</div>
//                         </div>
//                         <div className={`text-sm font-semibold ${s.daysLeft <= 5 ? 'text-rose-600' : 'text-slate-200'}`}>{s.daysLeft}d</div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.aside>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>
//       </main>

//       <footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500 dark:text-slate-400">© CancelBuddy</footer>
//     </div>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Subscription = {
  id: string;
  name: string;
  price: string;
  nextRenewal: string;
  daysLeft: number;
  usage: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'RARELY';
};

const mockSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', price: '₹499 / mo', nextRenewal: '2025-12-01', daysLeft: 3, usage: 'MONTHLY' },
  { id: '2', name: 'Spotify', price: '₹129 / mo', nextRenewal: '2025-12-10', daysLeft: 12, usage: 'WEEKLY' },
  { id: '3', name: 'Notion', price: '₹4,500 / yr', nextRenewal: '2026-01-05', daysLeft: 47, usage: 'RARELY' },
];

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('cb-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  const root = window.document.documentElement;
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
  window.localStorage.setItem('cb-theme', theme);
}

export default function LandingPage() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  useEffect(() => { applyTheme(theme); }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header: Flex-col for mobile (stacking logo and nav), flex-row for tablet/desktop */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0">CB</div>
          <div>
            <h1 className="font-semibold text-lg">CancelBuddy</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Never miss a cancel — save money</p>
          </div>
        </div>

        {/* Nav: Wrap items on very small screens, center on mobile */}
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full md:w-auto">
          <button 
            onClick={() => setView('landing')} 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'landing'? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('dashboard')} 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${view === 'dashboard'? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setTheme(theme === 'dark'? 'light' : 'dark')} 
            className="px-3 py-1.5 text-sm rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark'? '🌙' : '☀️'}
          </button>
          <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button className="px-3 py-1.5 text-sm rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Log in</button>
          <button className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Sign up</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'landing'? (
            <motion.section 
              key="landing" 
              initial={{ opacity: 0, y: 12 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -8 }} 
              transition={{ duration: 0.45 }} 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-6 md:mt-10"
            >
              <div className="text-center md:text-left">
                {/* Responsive typography: smaller on mobile */}
                <motion.h2 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.05 }} 
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white"
                >
                  Stop paying for subscriptions you don't use.
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.15 }} 
                  className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto md:mx-0"
                >
                  Get reminders before renewals and free trial endings so you can cancel on time and save money.
                </motion.p>
                {/* Buttons stack on mobile */}
                <motion.div 
                  className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.25 }}
                >
                  <button 
                    onClick={() => setView('dashboard')} 
                    className="w-full sm:w-auto px-6 py-3 rounded-md bg-indigo-600 text-white font-medium shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Get Started
                  </button>
                  <button className="w-full sm:w-auto px-6 py-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    Live demo
                  </button>
                </motion.div>
              </div>

              <div className="mt-4 md:mt-0">
                <motion.div 
                  className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800" 
                  initial={{ scale: 0.98, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Monthly spend</div>
                      <div className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">₹1,077</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Next renewal</div>
                      <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">Netflix — in 3 days</div>
                    </div>
                  </div>

                  {/* Responsive Grid for Cards: 1 col on mobile, 2 on sm+ */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mockSubscriptions.map((s, i) => (
                      <motion.div 
                        key={s.id} 
                        className="rounded-lg p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm" 
                        whileHover={{ y: -4 }} 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.06 * i }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="overflow-hidden">
                            <div className="font-medium truncate">{s.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{s.price}</div>
                          </div>
                          <div className={`text-sm font-semibold whitespace-nowrap ml-2 ${s.daysLeft <= 5? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>
                            {s.daysLeft}d
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="dashboard" 
              initial={{ opacity: 0, y: 8 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -8 }} 
              transition={{ duration: 0.35 }} 
              className="mt-6 md:mt-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Dashboard Area */}
                <motion.div 
                  className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800" 
                  initial={{ opacity: 0, y: 6 }} 
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Total monthly</div>
                      <div className="text-3xl font-bold">₹1,077</div>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 sm:text-right">
                      Welcome back — <br className="hidden sm:inline" />here are your subscriptions
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {mockSubscriptions.map((sub, idx) => (
                      <motion.div 
                        key={sub.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 gap-2 sm:gap-0" 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.04 * idx }} 
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between sm:block w-full sm:w-auto">
                          <div>
                            <div className="font-semibold">{sub.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">Renews {sub.nextRenewal} • {sub.usage}</div>
                          </div>
                          {/* Show price on right for desktop, inline for mobile if preferred, keeping separate here for clarity */}
                        </div>
                        
                        <div className="flex sm:block items-center justify-between w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-2 sm:pt-0 mt-2 sm:mt-0">
                          <div className={`font-semibold ${sub.daysLeft <= 5? 'text-rose-600' : ''}`}>{sub.price}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{sub.daysLeft} days left</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Sidebar / Upcoming Renewals */}
                <motion.aside 
                  className="col-span-1 bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-max" 
                  initial={{ opacity: 0, y: 6 }} 
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Upcoming Renewals</div>
                  <div className="mt-3 space-y-3">
                    {mockSubscriptions.slice().sort((a, b) => a.daysLeft - b.daysLeft).map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors hover:border-indigo-100 dark:hover:border-slate-700">
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-slate-400 dark:text-slate-500">{s.nextRenewal}</div>
                        </div>
                        <div className={`text-sm font-semibold ${s.daysLeft <= 5? 'text-rose-600' : 'text-slate-400 dark:text-slate-200'}`}>
                          {s.daysLeft}d
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.aside>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-center sm:text-left text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} CancelBuddy. All rights reserved.
      </footer>
    </div>
  );
}
