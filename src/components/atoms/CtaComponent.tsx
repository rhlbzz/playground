import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import gsap from 'gsap';
import { isMobile } from 'mobile-device-detect';
import { Link } from 'react-router-dom';
import styles from '../../styles/atoms/CtaComponent.module.scss';


interface CtaComponentProps {
  to?: string;
  href?: string,
  children?: React.ReactNode;
}

const CtaComponent: React.FC<CtaComponentProps> = ({ to, href, children }) => {
  const [hover, setHover] = useState(false);
  const [progressBottomAngles, setProgressBottomAngles] = useState(0);
  const [progressTopAngles, setProgressTopAngles] = useState(0);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(
      { value: 100 }, // Oggetto temporaneo per l'animazione
      {
        value: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgressTopAngles(this.targets()[0].value);
        },
      },
      'enter'
    );

    tl.to(
      { value: 100 }, // Oggetto temporaneo per l'animazione
      {
        value: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onUpdate: function () {
          // Aggiorna lo stato React durante l'animazione
          setProgressBottomAngles(this.targets()[0].value);
        },
      },
      'leave'
    );
    
    tl.set({}, {
      onComplete: () => {
        setProgressTopAngles(100);
        setProgressBottomAngles(100);
      }
    }, 'end');
    
    tlRef.current = tl;

    // Funzione di cleanup (importante)
    return () => {
      tl.kill(); // Uccidi la timeline quando il componente viene smontato
    };
  }, []); // L'array vuoto assicura che questo effetto venga eseguito solo al mount

  // 2. Watcher per l'hover (equivalente a watch(hover, ...))
  useEffect(() => {
    if (isMobile || !tlRef.current) return;

    if (hover) {
      // Entra: anima da 'enter' a 'leave'
      tlRef.current.tweenFromTo('enter', 'leave');
    } else {
      // Esci: anima da 'leave' a 'end'
      tlRef.current.tweenFromTo('leave', 'end');
    }
  }, [hover]); // Dipende dallo stato 'hover'

  // Stili CSS dinamici per le variabili CSS
  const componentStyles = useMemo(() => ({
    '--progress-bottom-angles': `${progressBottomAngles}%`,
    '--progress-top-angles': `${progressTopAngles}%`, 
  } as React.CSSProperties), [progressBottomAngles, progressTopAngles]);

  if (to && !href) {
    return (
      <Link
        to={to}
        className={`${styles['simple-cta-component']} relative inline-block`}
        style={componentStyles}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="relative">
          {children}
        </span>
      </Link>
    );
  } else if (href && !to) {
    return (
      <a
        href={href}
        className={`${styles['simple-cta-component']} relative inline-block`}
        style={componentStyles}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="relative">
          {children}
        </span>
      </a>
    );
  } else {
    return null;
  }
};

export default CtaComponent;