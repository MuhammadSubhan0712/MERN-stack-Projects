import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Login to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline">
                <Signup></Signup>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
