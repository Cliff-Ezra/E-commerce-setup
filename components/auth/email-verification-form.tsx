"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AuthCard } from "./auth-card";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

export const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // We wrap the function inside of a useCallback to make sure that the function only runs once or when it's dependencies change
  //   Conditions for it running are: if the token is not available on the URL, if a form error message pops up
  const handleVerification = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("No token found");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }

      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  //   We only run the function once when the component mounts
  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthCard
      cardTitle="Verify Your Account"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center flex-col w-full justify-center">
        <p>{!success && !error ? "Verifying email..." : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
};
