import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";
import { Palette, LogOut } from "lucide-react";

interface NavigationBarProps {
  setSearch: (search: string) => void;
  search: string;
}

function NavigationBar({
  setSearch: _setSearch,
  search: _search,
}: NavigationBarProps) {
  const { auth, logout } = useAuth();
  const { currentTheme, toggleDarkMode, isDarkMode } = useTheme();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav
        className="w-full px-4 py-3 shadow-sm"
        style={{
          backgroundColor: currentTheme.surface,
          borderBottom: `1px solid ${currentTheme.textSecondary}20`,
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1
              className="text-xl font-bold"
              style={{ color: currentTheme.text }}
            >
              URL Shortner
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                color: currentTheme.text,
                backgroundColor: currentTheme.background,
              }}
            >
              {auth?.username}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: currentTheme.background,
                color: currentTheme.primary,
              }}
              title="Toggle theme"
            >
              <Palette size={20} />
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: currentTheme.background,
                color: currentTheme.text,
              }}
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavigationBar;
