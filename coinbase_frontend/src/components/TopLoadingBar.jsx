import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BANNER_H = 44;

const TopLoadingBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPathRef.current) return;
    prevPathRef.current = location.pathname;

    clearTimeout(timerRef.current);
    setProgress(0);
    setVisible(true);

    // Animate quickly to 90%, then jump to 100% and fade
    let prog = 0;
    const tick = () => {
      prog += Math.random() * 25 + 10;
      if (prog >= 90) {
        setProgress(90);
        timerRef.current = setTimeout(() => {
          setProgress(100);
          timerRef.current = setTimeout(() => setVisible(false), 300);
        }, 200);
      } else {
        setProgress(prog);
        timerRef.current = setTimeout(tick, 80);
      }
    };
    timerRef.current = setTimeout(tick, 50);

    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: BANNER_H,
        left: 0,
        width: `${progress}%`,
        height: 3,
        background: 'linear-gradient(90deg, #0052FF, #7B2FFF)',
        zIndex: 9999,
        transition: progress === 100 ? 'width 0.2s ease, opacity 0.3s ease' : 'width 0.15s ease',
        opacity: progress === 100 ? 0 : 1,
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 8px #0052FF88',
      }}
    />
  );
};

export default TopLoadingBar;
