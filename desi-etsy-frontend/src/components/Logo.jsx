import React from "react";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-12 h-12" // Tailwind controlled size
    fill="#4F46E5"
  >
    {/* Shopping Bag */}
    <rect x="12" y="20" width="40" height="32" rx="6" ry="6" fill="#4F46E5" />
    {/* Handle */}
    <path
      d="M20 20v-8a8 8 0 0 1 16 0v8"
      stroke="#FFFFFF"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Letter D inside */}
    <text
      x="32"
      y="44"
      fontSize="22"
      fontWeight="bold"
      fill="white"
      fontFamily="Arial, sans-serif"
      textAnchor="middle"
    >
      D
    </text>
  </svg>
);

export default Logo;
