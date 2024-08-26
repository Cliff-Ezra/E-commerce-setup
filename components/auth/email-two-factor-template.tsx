import React from "react";

interface EmailTwoFactorTemplateProps {
  userName: string;
  token: string;
}

export const EmailTwoFactorTemplate: React.FC<Readonly<EmailTwoFactorTemplateProps>> = ({
  userName,
  token,
}) => {
  return (
    <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Two Factor Authentication Code for, {userName}
        </h1>
        <p className="text-gray-600 mb-6">Your Confirmation Code is:</p>
        <p className="text-gray-600 mb-6">{token}</p>
      </div>
    </div>
  );
};
