import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { OrbitingCircles } from './components/OrbitingCircles.jsx';
import './about-logos.css';

const logos = [
  { name: 'DXC Technology', src: 'assets/img/logos/dxc.jpg', width: 500, height: 140 },
  { name: 'M-AUTOMOTIV', src: 'assets/img/logos/m-automotiv.svg', width: 281, height: 26 },
  { name: 'Jobintech', src: 'assets/img/logos/jobintech.webp', width: 256, height: 80 },
];

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const subscribeToMotion = (callback) => {
  motionPreference.addEventListener('change', callback);
  return () => motionPreference.removeEventListener('change', callback);
};
const getMotionPreference = () => motionPreference.matches;

export function AboutLogoOrbit() {
  const panelRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, getMotionPreference);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(panelRef.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const stopped = reducedMotion || !inView || !tabVisible;

  return (
    <div className="about-logo-orbit" ref={panelRef} data-paused={stopped}>
      <div className="logo-orbit-scene" role="group" tabIndex={0} aria-label="DXC Technology, M-AUTOMOTIV, and Jobintech logos. Animation pauses while focused.">
        <div className="logo-orbit-halo" aria-hidden="true" />
        <OrbitingCircles duration={30}>
          {logos.map((logo) => (
            <div className="logo-orbit-card" key={logo.name}>
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                decoding="async"
                draggable="false"
              />
            </div>
          ))}
        </OrbitingCircles>
      </div>
    </div>
  );
}

const mount = document.getElementById('about-logos-root');
if (mount) createRoot(mount).render(<AboutLogoOrbit />);
