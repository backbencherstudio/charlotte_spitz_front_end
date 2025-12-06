"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  className = "",
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 
        bg-primaryColor text-white 
        font-semibold px-8 py-4 rounded-full 
        hover:bg-primaryColor/90 hover:scale-105 
        hover:shadow-lg hover:shadow-primaryColor/80 
        transition-all duration-300 cursor-pointer group text-lg  justify-center
        ${className}
      `}
    >
      {children}

      {/* Icon (optional) */}
      {icon && (
        <span className="transition-transform duration-200 group-hover:rotate-45">
          {icon}
        </span>
      )}
    </button>
  );
}
