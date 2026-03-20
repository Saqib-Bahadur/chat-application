import Navbar from "../Components/Navbar";
import { Mail, Instagram, MessageCircle, Github } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="pt-16 px-4 flex-1">

        {/* CARD */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          {/* TITLE */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-4">
            💬 About Chatting HUB
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed mb-6">
            Chatting HUB is a real-time group chat application built using
            <span className="font-semibold text-indigo-500"> MERN Stack </span>
            and <span className="font-semibold text-indigo-500">Socket.io</span>.
            It allows users to join groups, send messages instantly, and connect
            seamlessly with others in real-time.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-xl text-sm">
              Real-time messaging
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-sm">
              Group chat system
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-sm">
              Local storage backup
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-sm">
              Mobile responsive UI
            </div>
          </div>

          {/* DEVELOPER */}
          <div className="text-center mb-6">
            <p className="text-gray-700">
              Developed by <span className="font-bold text-indigo-600">Saqib Bahadur</span>
            </p>
          </div>

          {/* CONTACT */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              If you have any suggestions, feedback, or improvements for this app,
              feel free to reach out through the contacts below.
            </p>

            <div className="flex justify-center gap-4 mt-4">

              {/* WHATSAPP */}
              <a
                href="https://wa.me/919175737317?text=Hello%20I%20have%20feedback%20for%20your%20app"
                className="bg-green-500 text-white p-3 rounded-full shadow hover:scale-110 transition"
              >
                <MessageCircle size={18} />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/saqib_bahadur_01?igsh=MWRzdTJpdno2Z3pidQ=="
                className="bg-pink-500 text-white p-3 rounded-full shadow hover:scale-110 transition"
              >
                <Instagram size={18} />
              </a>

              {/* EMAIL */}
              <a
                href="mailto:saqibbahadur2625@email.com"
                className="bg-indigo-500 text-white p-3 rounded-full shadow hover:scale-110 transition"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://github.com/Saqib-Bahadur"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 text-white p-3 rounded-full shadow hover:bg-black hover:scale-110 transition"
              >
                <Github size={18} />
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-indigo-600 text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} Chatting HUB. All rights reserved.
      </footer>

    </div>
  );
}