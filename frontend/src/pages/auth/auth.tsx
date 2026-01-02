import { useLocation, Link } from "react-router-dom";
import { LoginForm } from "./components/login";
import { RegisterForm } from "./components/register";

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname.includes("/login");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-medium text-neutral-800 underline dark:text-neutral-200"
              >
                Register
              </Link>
            </p>
          ) : (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-neutral-800 underline dark:text-neutral-200"
              >
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

