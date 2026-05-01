import { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Check, Upload, Camera, ChevronRight, X, CreditCard, Clock } from 'lucide-react';

const STEPS = [
  'intro',
  'personal-info',
  'citizenship',
  'doc-type',
  'upload-front',
  'upload-back',
  'selfie',
  'processing',
  'complete',
];

const StepBar = ({ current }) => {
  const visual = STEPS.indexOf(current);
  const total = STEPS.length - 2; // exclude processing + complete from bar
  const filled = Math.min(visual, total);
  return (
    <div className="flex gap-1.5 mb-8 w-full">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{ background: i < filled ? '#0052FF' : '#2D2E33' }}
        />
      ))}
    </div>
  );
};

const DocCard = ({ icon, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-4 p-5 bg-[#1A1B1F] border border-[#2D2E33] rounded-2xl hover:border-[#0052FF] hover:bg-[#12131A] transition-all group text-left"
  >
    <div className="w-12 h-12 rounded-xl bg-[#2D2E33] flex items-center justify-center shrink-0 group-hover:bg-[#0052FF]/10 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-white font-semibold text-[16px]">{title}</p>
      {subtitle && <p className="text-[#5B616E] text-[13px] mt-0.5">{subtitle}</p>}
    </div>
    <ChevronRight size={18} className="text-[#5B616E] group-hover:text-white transition-colors" />
  </button>
);

const FileDropZone = ({ label, onFile, file }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden
        ${file ? 'border-[#00D180] bg-[#00D180]/5 cursor-default' : ''}
        ${dragging ? 'border-[#0052FF] bg-[#0052FF]/5' : !file ? 'border-[#2D2E33] hover:border-[#5B616E] bg-[#1A1B1F]' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />
      <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
        {file ? (
          <>
            <div className="w-14 h-14 rounded-full bg-[#00D180]/20 flex items-center justify-center">
              <Check size={28} className="text-[#00D180]" />
            </div>
            <p className="text-white font-semibold text-[15px]">{file.name}</p>
            <button
              onClick={(e) => { e.stopPropagation(); onFile(null); }}
              className="flex items-center gap-1 text-[#5B616E] hover:text-white text-[13px] transition-colors"
            >
              <X size={14} />
              Remove
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-[#2D2E33] flex items-center justify-center">
              <Upload size={24} className="text-[#5B616E]" />
            </div>
            <div>
              <p className="text-white font-semibold text-[15px]">{label}</p>
              <p className="text-[#5B616E] text-[13px] mt-1">
                Drag & drop or <span className="text-[#0052FF]">browse files</span>
              </p>
              <p className="text-[#5B616E] text-[12px] mt-1">JPG, PNG or PDF · Max 10MB</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const VerifyId = () => {
  const [step, setStep] = useState('intro');
  const [docType, setDocType] = useState(null);
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieReady, setSelfieReady] = useState(false);
  const [form, setForm] = useState({
    dob: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssn4: '',
    citizenship: 'United States',
  });
  const navigate = useNavigate();

  const setField = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const goTo = (s) => setStep(s);

  const handleProcessing = () => {
    goTo('processing');
    setTimeout(() => goTo('complete'), 3500);
  };

  const docTypes = [
    {
      id: 'drivers-license',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="1.8" className="w-6 h-6">
          <rect x="1" y="4" width="22" height="16" rx="3" />
          <circle cx="7" cy="11" r="2.5" />
          <path d="M3 18c0-2.2 1.8-4 4-4s4 1.8 4 4" />
          <line x1="14" y1="9" x2="20" y2="9" />
          <line x1="14" y1="13" x2="18" y2="13" />
        </svg>
      ),
      title: "Driver's License",
      subtitle: 'Front and back required',
      hasBack: true,
    },
    {
      id: 'passport',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="1.8" className="w-6 h-6">
          <rect x="3" y="1" width="18" height="22" rx="2" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 20h10M9 20c0-1.7.9-3 3-3s3 1.3 3 3" />
          <line x1="7" y1="5" x2="17" y2="5" />
        </svg>
      ),
      title: 'Passport',
      subtitle: 'Photo page required',
      hasBack: false,
    },
    {
      id: 'national-id',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#5B616E" strokeWidth="1.8" className="w-6 h-6">
          <rect x="1" y="4" width="22" height="16" rx="3" />
          <path d="M5 8h14M5 12h8M5 16h5" />
        </svg>
      ),
      title: 'National ID / State ID',
      subtitle: 'Front and back required',
      hasBack: true,
    },
  ];

  const countries = [
    'United States', 'United Kingdom', 'Ghana', 'Canada', 'Australia',
    'Germany', 'France', 'India', 'Japan', 'Brazil', 'South Africa',
    'Nigeria', 'Kenya', 'Singapore', 'Netherlands',
  ];

  const selectedDoc = docTypes.find((d) => d.id === docType);

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex flex-col items-center justify-center font-inter p-6">
      <div className="w-full max-w-[480px]">

        {step !== 'processing' && step !== 'complete' && (
          <Link to="/" className="block mb-8">
            <img
              src="/assets/clone-images/coinbaseLogoNavigation-4.svg"
              alt="Coinbase"
              className="h-7 brightness-0 invert"
            />
          </Link>
        )}

        {step !== 'processing' && step !== 'complete' && (
          <StepBar current={step} />
        )}

        {step === 'intro' && (
          <div>
            <div className="w-16 h-16 rounded-2xl bg-[#0052FF]/10 flex items-center justify-center mb-6">
              <Shield size={32} className="text-[#0052FF]" />
            </div>
            <h1 className="text-white text-[28px] font-semibold mb-3 tracking-tight">
              Let's verify your identity
            </h1>
            <p className="text-[#5B616E] text-[15px] mb-8 leading-relaxed">
              To comply with regulations and keep your account secure, we need to verify who you are.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: <CreditCard size={18} className="text-[#0052FF]" />, text: "Government-issued ID (passport, driver's license, or national ID)" },
                { icon: <Camera size={18} className="text-[#0052FF]" />, text: 'A selfie to match against your ID' },
                { icon: <Clock size={18} className="text-[#0052FF]" />, text: 'This usually takes 2–5 minutes' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">{icon}</span>
                  <p className="text-[#888A8F] text-[14px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => goTo('personal-info')}
              className="w-full bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors"
            >
              Get started
            </button>
          </div>
        )}

        {step === 'personal-info' && (
          <div>
            <button onClick={() => goTo('intro')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Personal information
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              This must match your government-issued ID exactly.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[#888A8F] text-[12px] font-medium uppercase tracking-wider mb-1.5 block">Date of birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setField('dob')(e.target.value)}
                  className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[15px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#888A8F] text-[12px] font-medium uppercase tracking-wider mb-1.5 block">Street address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setField('address')(e.target.value)}
                  placeholder="123 Main St"
                  className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[15px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#888A8F] text-[12px] font-medium uppercase tracking-wider mb-1.5 block">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setField('city')(e.target.value)}
                    placeholder="City"
                    className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[15px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E]"
                  />
                </div>
                <div>
                  <label className="text-[#888A8F] text-[12px] font-medium uppercase tracking-wider mb-1.5 block">State / ZIP</label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => setField('zip')(e.target.value)}
                    placeholder="State, ZIP"
                    className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[15px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#888A8F] text-[12px] font-medium uppercase tracking-wider mb-1.5 block">
                  Last 4 digits of SSN
                </label>
                <input
                  type="text"
                  value={form.ssn4}
                  onChange={(e) => setField('ssn4')(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••"
                  maxLength={4}
                  className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[15px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors placeholder:text-[#5B616E] tracking-widest"
                />
                <p className="text-[#5B616E] text-[12px] mt-1.5">Used for identity verification only. Not stored.</p>
              </div>
            </div>

            <button
              onClick={() => goTo('citizenship')}
              disabled={!form.dob || !form.address || !form.city || !form.zip || form.ssn4.length < 4}
              className="w-full mt-6 bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'citizenship' && (
          <div>
            <button onClick={() => goTo('personal-info')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Select your citizenship
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              Select the country that issued your government ID.
            </p>

            <div className="space-y-3">
              <select
                value={form.citizenship}
                onChange={(e) => setField('citizenship')(e.target.value)}
                className="w-full bg-[#1A1B1F] text-white border border-[#2D2E33] rounded-xl px-4 py-[18px] text-[16px] focus:outline-none focus:border-[#0052FF] transition-colors appearance-none cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => goTo('doc-type')}
              className="w-full mt-6 bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'doc-type' && (
          <div>
            <button onClick={() => goTo('citizenship')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Select ID type
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              Choose the government-issued document you want to use.
            </p>

            <div className="space-y-3">
              {docTypes.map((doc) => (
                <DocCard
                  key={doc.id}
                  icon={doc.icon}
                  title={doc.title}
                  subtitle={doc.subtitle}
                  onClick={() => {
                    setDocType(doc.id);
                    goTo('upload-front');
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'upload-front' && (
          <div>
            <button onClick={() => goTo('doc-type')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Upload front of {selectedDoc?.title}
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              Make sure the image is clear, well-lit, and all corners are visible.
            </p>

            <FileDropZone label="Front of ID" onFile={setFrontFile} file={frontFile} />

            <ul className="mt-5 space-y-2">
              {['Place on a flat, dark surface', 'Ensure all text is clearly legible', 'Avoid glare and shadows'].map((tip) => (
                <li key={tip} className="flex items-center gap-2 text-[#5B616E] text-[13px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5B616E]" />
                  {tip}
                </li>
              ))}
            </ul>

            <button
              disabled={!frontFile}
              onClick={() => selectedDoc?.hasBack ? goTo('upload-back') : goTo('selfie')}
              className="w-full mt-6 bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'upload-back' && (
          <div>
            <button onClick={() => goTo('upload-front')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Upload back of {selectedDoc?.title}
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              Flip your ID over and upload the back side.
            </p>

            <FileDropZone label="Back of ID" onFile={setBackFile} file={backFile} />

            <button
              disabled={!backFile}
              onClick={() => goTo('selfie')}
              className="w-full mt-6 bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'selfie' && (
          <div>
            <button onClick={() => goTo(selectedDoc?.hasBack ? 'upload-back' : 'upload-front')} className="flex items-center gap-2 text-[#5B616E] hover:text-white transition-colors mb-6 text-[14px] font-medium">
              <ArrowLeft size={18} />
              Back
            </button>
            <h1 className="text-white text-[28px] font-semibold mb-2 tracking-tight">
              Take a selfie
            </h1>
            <p className="text-[#5B616E] text-[14px] mb-8">
              We'll compare it to your ID to confirm your identity.
            </p>

            {/* Faux camera viewfinder */}
            <div className="relative rounded-2xl overflow-hidden bg-[#111214] border border-[#2D2E33] mb-4" style={{ aspectRatio: '4/3' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Face outline guide */}
                  <svg viewBox="0 0 200 220" className="w-48 h-48 opacity-30">
                    <ellipse cx="100" cy="110" rx="70" ry="90" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 4" />
                    <circle cx="75" cy="95" r="8" fill="none" stroke="white" strokeWidth="1.5" />
                    <circle cx="125" cy="95" r="8" fill="none" stroke="white" strokeWidth="1.5" />
                    <path d="M80 140 Q100 158 120 140" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              {/* Corner brackets */}
              {[['top-4 left-4', 'border-t-2 border-l-2'], ['top-4 right-4', 'border-t-2 border-r-2'], ['bottom-4 left-4', 'border-b-2 border-l-2'], ['bottom-4 right-4', 'border-b-2 border-r-2']].map(([pos, borders]) => (
                <div key={pos} className={`absolute ${pos} w-8 h-8 ${borders} border-white rounded-sm`} />
              ))}
              {selfieReady && (
                <div className="absolute inset-0 bg-[#00D180]/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#00D180]/20 flex items-center justify-center">
                    <Check size={32} className="text-[#00D180]" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 inset-x-0 text-center">
                <p className="text-white/50 text-[12px]">
                  {selfieReady ? 'Selfie captured' : 'Position your face in the oval'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {!selfieReady ? (
                <button
                  onClick={() => setSelfieReady(true)}
                  className="w-full bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  Take selfie
                </button>
              ) : (
                <>
                  <button
                    onClick={handleProcessing}
                    className="w-full bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors"
                  >
                    Submit verification
                  </button>
                  <button
                    onClick={() => setSelfieReady(false)}
                    className="w-full bg-transparent text-[#5B616E] rounded-full py-[17px] text-[15px] font-semibold hover:text-white transition-colors"
                  >
                    Retake
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-[#0052FF]/20 border-t-[#0052FF] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield size={32} className="text-[#0052FF]" />
              </div>
            </div>
            <h2 className="text-white text-[24px] font-semibold mb-3">Verifying your identity</h2>
            <p className="text-[#5B616E] text-[15px] leading-relaxed max-w-[300px]">
              We're reviewing your documents. This usually takes a few moments.
            </p>
            <div className="mt-8 flex gap-1.5">
              {[0, 0.2, 0.4].map((delay) => (
                <div
                  key={delay}
                  className="w-2 h-2 rounded-full bg-[#0052FF] animate-bounce"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-24 h-24 rounded-full bg-[#00D180]/15 flex items-center justify-center mb-8">
              <Check size={48} className="text-[#00D180]" strokeWidth={2.5} />
            </div>
            <h2 className="text-white text-[28px] font-semibold mb-3">Verification submitted!</h2>
            <p className="text-[#5B616E] text-[15px] leading-relaxed mb-10 max-w-[320px]">
              We've received your documents and will notify you once your identity has been verified. This usually takes a few minutes.
            </p>

            <div className="w-full max-w-[380px] bg-[#1A1B1F] border border-[#2D2E33] rounded-2xl p-5 mb-8 text-left space-y-3">
              {[
                { label: 'Document type', value: selectedDoc?.title || 'ID' },
                { label: 'Status', value: 'Under review', valueColor: '#FFC801' },
                { label: 'Expected time', value: '2–5 minutes' },
              ].map(({ label, value, valueColor }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[#5B616E] text-[14px]">{label}</span>
                  <span className="text-[14px] font-medium" style={{ color: valueColor || 'white' }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full max-w-[380px] bg-[#0052FF] text-white rounded-full py-[17px] text-[16px] font-bold hover:bg-[#1652F0] transition-colors"
            >
              Go to dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerifyId;
