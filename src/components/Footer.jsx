export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-sm transition duration-300">
      
      {/* Newsletter */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-700 pb-12 mb-12">
        
        <div className="max-w-md">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get the latest news!
          </h3>

          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Esse non cupiditate quae nam molestias.
          </p>
        </div>

        <div className="flex w-full lg:w-auto max-w-md border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-sm">
          
          <input
            type="email"
            placeholder="john@rhcp.com"
            className="px-4 py-3 text-sm w-full outline-none text-gray-700 dark:text-white bg-white dark:bg-gray-800"
          />

          <button className="bg-teal-600 hover:bg-teal-700 text-white text-xs uppercase font-bold tracking-wider px-6 transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-gray-500 dark:text-gray-300 mb-12">
        
        <div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-4">
            Services
          </h5>

          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-teal-600 transition">
                1on1 Coaching
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Math Tutoring
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Science Coaching
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-4">
            Company
          </h5>

          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-teal-600 transition">
                About
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Meet the Team
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-4">
            Helpful Links
          </h5>

          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Contact
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                FAQs
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Live Chat
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-4">
            Legal
          </h5>

          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Accessibility
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 dark:text-white mb-4">
            Downloads
          </h5>

          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Academic Calendar
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-teal-600 transition">
                Syllabus Template
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-6 border-t border-gray-100 dark:border-gray-700 pb-8">
        © 2026. Tutors Finder. All rights reserved.
      </div>
    </footer>
  );
}