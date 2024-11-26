import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Auth App</h1>
        <p className="text-gray-600 text-lg">
          A secure and reliable authentication system for modern web apps.
        </p>
      </header>

      
      <nav className="mt-8">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      
    </div>
  );
}
