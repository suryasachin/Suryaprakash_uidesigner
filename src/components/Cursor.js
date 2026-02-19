import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 19}px, ${e.clientY - 19}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3.5}px, ${e.clientY - 3.5}px)`;
      }
    };

    const onEnter = () => ringRef.current?.classList.add('hovered');
    const onLeave = () => ringRef.current?.classList.remove('hovered');

    window.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('button, a, input, textarea, [data-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot"  ref={dotRef}  />
    </>
  );
}
