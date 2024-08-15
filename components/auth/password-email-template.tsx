import React from "react";

interface EmailResetTemplateProps {
  email: string;
  resetLink: string;
}

export const EmailResetTemplate: React.FC<
  Readonly<EmailResetTemplateProps>
> = ({ email, resetLink }) => {
  return (
    <div>
      <div>
        <h1>Reset your E-Commerce password</h1>
        <p>
          Click the link below to change your password for the account under the
          email: {email}
        </p>
        <a
          href={resetLink}
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Reset your password
        </a>
      </div>
    </div>
  );
};
