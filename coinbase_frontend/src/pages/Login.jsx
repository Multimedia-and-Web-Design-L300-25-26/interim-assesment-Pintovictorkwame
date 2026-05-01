import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Fingerprint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 814 1000" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.3 135.3-316.9 269-316.9 70.6 0 129.5 46.4 173.1 46.4 41.7 0 112.3-49.2 196.8-49.2zm-234.6-88.5c31.7-37.5 54.3-89.7 54.3-141.9 0-7.1-.6-14.3-1.9-20.1-51.6 1.9-113.4 34.4-150.9 77.5-28.5 32.4-55.1 84.7-55.1 139.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 102.5-30.4 138.1-74.4z" />
  </svg>
);

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');
    setStep(2);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col items-center justify-center font-inter p-6">
      <div className="w-full max-w-[440px] flex flex-col items-center">

        <Link to="/" className="mb-10">
          <img
            src="/assets/clone-images/coinbaseLogoNavigation-4.svg"
            alt="Coinbase"
            className="h-8 brightness-0 invert"
          />
        </Link>

        {step === 1 && (
          <div className="w-full">
            <h1 className="text-white text-[28px] md:text-[32px] font-semibold mb-8 text-center tracking-tight">
              Sign in to Coinbase
            </h1>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoFocus
                  required
                  className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[18px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E]"
                />
              </div>

              {error && (
                <p className="text-[#FF4019] text-[13px] text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] active:bg-[#0040CC] transition-colors"
              >
                Continue
              </button>
            </form>

            <div className="flex items-center my-7">
              <div className="flex-1 border-t border-[#2D2E33]" />
              <span className="px-4 text-[#5B616E] text-[12px] font-medium uppercase tracking-wider">or</span>
              <div className="flex-1 border-t border-[#2D2E33]" />
            </div>

            <div className="space-y-3">
              <button className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-full py-[15px] text-[15px] font-semibold hover:bg-[#2D2E33] transition-colors flex items-center justify-center gap-3">
                <Fingerprint size={20} className="text-[#5B616E]" />
                Sign in with Passkey
              </button>
              <button className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-full py-[15px] text-[15px] font-semibold hover:bg-[#2D2E33] transition-colors flex items-center justify-center gap-3">
                <GoogleIcon />
                Sign in with Google
              </button>
              <button className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-full py-[15px] text-[15px] font-semibold hover:bg-[#2D2E33] transition-colors flex items-center justify-center gap-3">
                <AppleIcon />
                Sign in with Apple
              </button>
            </div>

            <div className="mt-10 text-center">
              <Link to="/signup" className="text-[#0052FF] font-semibold text-[15px] hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full">
            <button
              onClick={() => { setStep(1); setError(''); setPassword(''); }}
              className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-8 text-[14px] font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-white text-[28px] md:text-[32px] font-semibold mb-2 tracking-tight">
              Enter your password
            </h1>
            <p className="text-[#5B616E] text-[15px] mb-8 truncate">{email}</p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  required
                  className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 pr-12 py-[18px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5B616E] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-[#FF4019] text-[13px] text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] active:bg-[#0040CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-[#0052FF] font-semibold text-[14px] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
