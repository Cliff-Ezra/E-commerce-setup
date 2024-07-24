import React from "react";

interface EmailTemplateProps {
  userName: string;
  email: string;
  confirmLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  email,
  confirmLink,
}) => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to E-commerce, {userName}!
        </h1>
        <p className="text-gray-600 mb-6">
          We&apos;re excited to have you on board. Start exploring our amazing
          products and deals today!
        </p>
        <p className="text-gray-600 mb-6">
          Click the link below to confirm your email address ({email}).
        </p>
        <a
          href={confirmLink}
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Confirm Email
        </a>
      </div>
    </div>
  );
};
