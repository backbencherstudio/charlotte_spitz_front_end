"use client";
const quickLinks = [
  { name: "Product", slug: "/" },
  { name: "Privacy", slug: "/privacy" },
  { name: "Contact", slug: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#001F1A] px-[140px] py-10">
      <div>
        <div>
          <h1 className="text-[#5952FF] text-3xl font-bold tracking-wide">
            CVdigger
          </h1>
          <p className="text-gray-200 mt-4">
            cvtailor.ai--your AI career partner
          </p>
        </div>
        <div>
          <h1 className="text-white font-bold tracking-wide">Links</h1>
          <p className="text-gray-200 space-x-3">
            {quickLinks.map((link) => (
              <a key={link.name}> {link.name} </a>
            ))}
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" container">
        <div className="border-t border-grayColor1 pb-6 pt-4 text-center text-base leading-[150%] text-[#A5A5AB]">
          Copyright © 2024 All rights reserved
        </div>
      </div>
    </footer>
  );
}
