"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = "",
  icon,
  disabled ,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 
        bg-primaryColor text-white 
        font-semibold px-8 py-4 rounded-full 
        hover:bg-primaryColor/90 hover:scale-105 
        disabled:bg-gray-400 disabled:cursor-not-allowed
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
