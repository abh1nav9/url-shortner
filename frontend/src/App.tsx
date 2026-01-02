import { RouterProvider } from "react-router-dom";
import Router from "./routes/index.route";
import { AuthProvider } from "./context/auth-context";
import { ThemeProvider } from "./context/theme-context";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;