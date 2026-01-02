import { Outlet, useLocation, useOutletContext, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useTheme } from "../context/theme-context";
import NavigationBar from "../components/layout/navbar";
import { useState, useEffect, useMemo, useCallback } from "react";

type ContextType = { searchTerm: string };

function MainLayout() {
  const { auth } = useAuth();
  const { currentTheme } = useTheme();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.pathname]);

  const setSearch = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  const outletContext = useMemo(() => ({ searchTerm }), [searchTerm]);

  const mainStyle = useMemo(
    () => ({
      backgroundColor: currentTheme.background,
    }),
    [currentTheme.background]
  );

  const containerStyle = useMemo(
    () => ({
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
    }),
    [currentTheme.background, currentTheme.text]
  );

  if (!auth) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={containerStyle}
    >
      <div className="px-4 pt-4">
        <NavigationBar setSearch={setSearch} search={searchTerm} />
      </div>

      <div className="flex-1 min-h-0 flex overflow-hidden">

        <main className="flex-1 min-h-0 overflow-y-auto" style={mainStyle}>
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;

// Helper function to use the search context in child components
export function useSearch() {
  return useOutletContext<ContextType>();
}
