import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Github,
  LinkedinIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl flex items-center gap-2 font-bold uppercase">
              <p className="text-blue-500">Smart</p>
              <p className="text-gray-100">Management</p>
            </div>
            <p className="text-gray-300 mt-4">
              Empowering businesses with intelligent solutions for seamless
              operations and growth.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-500">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300 hover:text-white transition duration-300">
                  +1 (123) 456-7890
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300 hover:text-white transition duration-300">
                  support@smartmanagement.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300 hover:text-white transition duration-300">
                  123 Smart Street, Tech City, USA
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-500">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.twitter.com/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a
                href="https://www.github.com/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>

            {/* Newsletter Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-500">
                Newsletter
              </h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="py-2 px-4 rounded-l focus:outline-none text-gray-900 bg-gray-100 placeholder-gray-400"
                />
                <button className="bg-blue-600 py-2 px-4 rounded-r hover:bg-blue-500 transition duration-300 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Smart Management System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
