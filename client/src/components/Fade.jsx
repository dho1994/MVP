import React, { useRef, useState, useEffect } from 'react';

function Fade(props) {
  const [isVisible, setVisible] = useState(true);
  const domRef = useRef();
  const { children } = props;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

export default Fade;
