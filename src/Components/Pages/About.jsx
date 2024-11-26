import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">About Auth App</h1>
        <p className="text-gray-600 text-lg max-w-xl">
          Auth App is a simple, secure, and efficient authentication system
          built for modern web applications. It provides functionalities like
          user registration, login, and profile management. Designed with
          security in mind, our app ensures your data is safe and your
          experience is seamless.
        </p>
      </header>
      
      <div className="mt-8">
        <p className="text-gray-700 text-center">
          Whether you are building a personal project or a scalable enterprise
          solution, Auth App makes authentication straightforward and reliable.
        </p>
      </div>

      
    </div>
  );
}
