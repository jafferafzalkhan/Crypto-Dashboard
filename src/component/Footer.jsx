import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <h1 className="text-lg font-semibold text-purple-400">
          CryptoDash
        </h1>

        <div className="flex gap-6 text-sm text-gray-400">

          <a
            href="https://github.com/jafferafzalkhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/jaffar-khan-50992b31a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="/public/resume.pdf"
            target="_blank"
            className="hover:text-purple-400 transition"
          >
            Resume
          </a>

        </div>

        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} CryptoDash. Built by Jaffer Afzal Khan.
        </p>

      </div>
    </footer>
  );
}

export default Footer;