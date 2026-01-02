import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-context";
import { useAuth } from "../context/auth-context";

const NotFound: React.FC = () => {
  const { currentTheme } = useTheme();
  const { auth } = useAuth();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
      style={{
        backgroundColor: currentTheme.background,
      }}
    >
      <h1
        className="text-6xl font-bold mb-4"
        style={{ color: currentTheme.text }}
      >
        404
      </h1>
      <p className="text-lg mb-6" style={{ color: currentTheme.textSecondary }}>
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to={auth ? "/" : "/"}
        className="inline-block px-6 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-90"
        style={{
          backgroundColor: currentTheme.primary,
          color: "white",
        }}
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;