"use client";

import {useState} from "react";
import {Star, StarHalf} from "lucide-react";

export function Rate({value, className = ''}: {
  value: number,
  className?: string
}) {
  const rate = Math.round(value * 2) / 2;

  if (rate < 0 || rate > 5) {
    throw new Error("Invalid rate value");
  }

  // Half star

  return (
      <div className="relative">
        <div className="relative flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${className} text-accent`} fill="currentColor" strokeWidth={0}/>
          ))}
        </div>
        <div className="absolute top-0 flex items-center gap-1">
          {[...Array(Math.floor(rate))].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${className} text-yellow-400`} fill="currentColor" strokeWidth={0}/>
          ))}
          {rate % 1 > 0 && (
              <StarHalf className={`w-4 h-4 ${className} text-yellow-400`} fill="currentColor" strokeWidth={0}/>
          )}
        </div>
      </div>
  );
}