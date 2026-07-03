import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReferralDetails from './pages/ReferralDetails';
import NotFound from './pages/NotFound';

const AppShell = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="app-shell d-flex flex-column min-vh-100">
      {!isLoginRoute && <Navbar />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/referral/:id"
            element={
              <ProtectedRoute>
                <ReferralDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isLoginRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
