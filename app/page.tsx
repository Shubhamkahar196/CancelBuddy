'use client'

import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

type Subscription = {
  id: string;
  name: string;
  price: string;
  nextRenewal: string;
  daysLeft: number;
  usage: 'DAILY ' | 'WEEKLY' | 'MONTHLY' | 'RARELY' 
}

const mockSubscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', price: '₹499 / mo', nextRenewal: '2025-12-01', daysLeft: 3, usage: 'MONTHLY' },
  { id: '2', name: 'Spotify', price: '₹129 / mo', nextRenewal: '2025-12-10', daysLeft: 12, usage: 'WEEKLY' },
  { id: '3', name: 'Notion', price: '₹4,500 / yr', nextRenewal: '2026-01-05', daysLeft: 47, usage: 'RARELY' },
];

export default function Home() {
  return (
    <div>hello world</div>
  );
}


