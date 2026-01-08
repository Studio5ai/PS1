'use client';

import { useEffect, useRef } from 'react';
import './styles.css';

export default function Home() {
  const heroContainerRef = useRef(null);
  const backgroundRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const stripesRef = useRef([]);

  const stripeConfig = [
    // Black stripes
    { className: 'stripe-black-1', px: -0.35, py: -0.25, speed: 1.6, fill: '#231f20', points: '198.67841 691.2 611.52 0 672.71432 0 260.14485 691.2', type: 'polyline' },
    { className: 'stripe-black-2', px: 0, py: 0.4, speed: 1.4, fill: '#231f20', points: '628.63285 -.07405 651.89365 0 412.32 691.2 389.633 691.0811 628.63285 -.07405' },
    { className: 'stripe-black-3', px: 0.3, py: 0.35, speed: 1.5, fill: '#231f20', points: '864 528.12461 864 448.25062 516.78703 691.2 631.68 691.2 864 528.12461' },
    { className: 'stripe-black-4', px: 0.25, py: 0.35, speed: 1.5, fill: '#231f20', points: '472.82243 0 493.92 0 851.86612 691.2 830.88 691.2 472.82243 0' },
    { className: 'stripe-black-5', px: -0.15, py: -0.4, speed: 1.35, fill: '#231f20', points: '0 408.17737 864 117.98972 864 81.53204 0 370.78251 0 408.17737' },
    { className: 'stripe-black-6', px: 0.15, py: 0.4, speed: 1.25, fill: '#231f20', points: '864 494.59113 0 212.49244 0 172.74486 864 455.30339 864 494.59113' },
    { className: 'stripe-black-7', px: -0.3, py: 0.3, speed: 1.75, fill: '#231f20', points: '198.6976 691.2 -.11476 522.9414 0 493.55367 234.77367 691.2 198.6976 691.2' },
    // White stripes
    { className: 'stripe-white-1', px: 0.35, py: 0.3, speed: 1.35, fill: '#fff', points: '864 181.78242 435.35622 691.2 505.77529 691.2 864 265.6486 864 181.78242' },
    { className: 'stripe-white-2', px: 0.08, py: 0.4, speed: 1.55, fill: '#fff', points: '747.36081 -.01425 711.36 0 672.71432 691.2 708.72782 691.2 747.36081 -.01425' },
    { className: 'stripe-white-3', px: 0.35, py: -0.3, speed: 1.7, fill: '#fff', points: '864 313.47168 864 353.38392 445.49884 .22475 493.05231 0 864 313.47168' },
    { className: 'stripe-white-4', px: -0.2, py: -0.38, speed: 1.45, fill: '#fff', points: '82.08282 691.2 55.90053 691.2 864 99.53425 864 118.75344 82.08282 691.2' },
    { className: 'stripe-white-5', px: 0.2, py: 0.38, speed: 1.5, fill: '#fff', points: '754.46891 691.2 708.2725 691.2 .69958 191.08349 .69958 158.28608 754.46891 691.2' },
    { className: 'stripe-white-6', px: 0, py: -0.4, speed: 1.3, fill: '#fff', type: 'rect', x: 198.24, width: 11.52, height: 691.2 },
    { className: 'stripe-white-7', px: -0.3, py: -0.35, speed: 1.8, fill: '#fff', points: '285.19786 691.10123 233.97379 691.2 0 308.50699 0 224.12206 285.19786 691.10123' },
    { className: 'stripe-white-8', px: -0.35, py: -0.3, speed: 1.2, fill: '#fff', points: '96.54163 -.30417 0 78.67119 0 22.20036 27.13832 0 96.54163 -.30417' },
    { className: 'stripe-white-9', px: -0.4, py: 0.1, speed: 1.9, fill: '#fff', points: '18.77387 691.07042 0 684.96433 0 655.70465 108.49537 691.1252 18.77387 691.07042' },
  ];

  useEffect(() => {
    const heroContainer = heroContainerRef.current;
    const background = backgroundRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const stripes = stripesRef.current;

    function updateParallax() {
      const scrollTop = window.pageYOffset;
      const heroHeight = heroContainer.offsetHeight;
      const viewportHeight = window.innerHeight;

      const maxScroll = heroHeight - viewportHeight;
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

      stripes.forEach((stripe, index) => {
        if (stripe) {
          const { px, py, speed } = stripeConfig[index];
          const xOffset = scrollTop * px * speed;
          const yOffset = scrollTop * py * speed;
          stripe.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
      });

      const bgProgress = Math.max((progress - 0.5) * 2, 0);
      const redValue = Math.round(255 * (1 - bgProgress));
      background.style.background = `rgb(${redValue}, 0, 0)`;

      if (scrollTop > 100) {
        scrollIndicator.classList.add('hidden');
      } else {
        scrollIndicator.classList.remove('hidden');
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateParallax();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="hero-container" ref={heroContainerRef}>
        <div className="hero-sticky">
          <div className="background-transition" ref={backgroundRef}></div>

          <div className="svg-container">
            {stripeConfig.map((stripe, index) => (
              <div
                key={stripe.className}
                className={`stripe ${stripe.className}`}
                ref={(el) => (stripesRef.current[index] = el)}
              >
                <svg viewBox="0 0 864 691.2" preserveAspectRatio="xMidYMid slice">
                  {stripe.type === 'rect' ? (
                    <rect fill={stripe.fill} x={stripe.x} width={stripe.width} height={stripe.height} />
                  ) : stripe.type === 'polyline' ? (
                    <polyline fill={stripe.fill} points={stripe.points} />
                  ) : (
                    <polygon fill={stripe.fill} points={stripe.points} />
                  )}
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <span>Scroll</span>
        <div className="scroll-arrow"></div>
      </div>

      <section className="content-section">
        <h2>Your Content Here</h2>
      </section>
    </>
  );
}
