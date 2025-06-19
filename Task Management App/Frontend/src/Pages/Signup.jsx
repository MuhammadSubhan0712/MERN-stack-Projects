import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SignupForm from "../components/Auth/SignupForm";
import Login from "./Login";

const Signup = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Create your account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              <Link
                to="/login"
                className="font-medium text-primary hover:underline">
                Already have an account?
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
