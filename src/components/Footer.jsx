function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 shadow-inner">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-3">EduSystem</h2>
          <p className="text-gray-400 text-sm">
            A smart learning platform for students, teachers, and admins.
            Manage courses, track progress, and simplify education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Login</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-gray-400 text-sm">📧 support@edusystem.com</p>
          <p className="text-gray-400 text-sm">📞 +91 9876543210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400 text-sm">
        © 2026 EduSystem | Built by Vip Rajput 💻
      </div>

    </footer>
  );
}

export default Footer;