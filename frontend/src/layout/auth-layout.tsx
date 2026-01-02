import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useTheme } from '../context/theme-context';

function AuthLayout() {
  const { auth } = useAuth();
  const { currentTheme } = useTheme();

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div 
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        minHeight: '100vh',
      }}
      className="h-screen overflow-hidden"
    >
      <div className="h-full min-h-0 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout