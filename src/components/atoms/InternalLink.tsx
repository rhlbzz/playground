import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import gsap from 'gsap';
import { isMobile } from 'mobile-device-detect';
import { Link } from 'react-router-dom';
import styles from '../../styles/atoms/InternalLink.module.scss';


interface InternalLinkProps {
  to: string;
  children?: React.ReactNode;
}

const InternalLink: React.FC<InternalLinkProps> = ({ to, children }) => {
  const [hover, setHover] = useState(false);
  const [progressBottomAngles, setProgressBottomAngles] = useState(100);
  const [progressTopAngles, setProgressTopAngles] = useState(100);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Crea una timeline con pausa
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

  return (
    <Link
      to={to}
      className={`${styles['simple-cta-component']} relative inline-block`}
      style={componentStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative">
        {/* L'equivalente di <slot /> è `children` in React */}
        {children}
      </span>
    </Link>
  );
};

export default InternalLink;