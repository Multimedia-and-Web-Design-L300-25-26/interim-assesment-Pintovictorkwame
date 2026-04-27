import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import CloneBanner from './components/CloneBanner';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AccountSelection from './pages/AccountSelection';
import SignupForm from './pages/SignupForm';
import VerifyId from './pages/VerifyId';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Explore from './pages/Explore';

const BANNER_H = 44;

// Redirect to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <AppLoader />;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

// Redirect to login if not authenticated
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <AppLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppLoader = () => (
  <div className="min-h-screen bg-[#0A0B0D] flex items-center justify-center">
    <svg className="animate-spin h-10 w-10 text-[#0052FF]" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>
);

function AppRoutes() {
  return (
    <>
      {/* Persistent clone warning banner — always on top */}
      <CloneBanner />

      {/* All page content is offset below the fixed banner */}
      <div style={{ paddingTop: BANNER_H }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Explore />} />

          {/* Auth — redirect to dashboard if already logged in */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><AccountSelection /></PublicRoute>} />
          <Route path="/signup/form" element={<PublicRoute><SignupForm /></PublicRoute>} />

          {/* ID verification — accessible after signup (no strict guard, user may not be in DB yet) */}
          <Route path="/verify-id" element={<VerifyId />} />

          {/* Protected */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
