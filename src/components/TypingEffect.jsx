import React, { useState, useEffect } from 'react';

export default function TypingEffect() {
  const content = [
    "A community to talk about menstrual health",
    "A community to find free menstrual products",
    "A community to understand menstrual products"
  ];

  const [partIndex, setPartIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let timer;

    if (isDeleting) {
      timer = setInterval(() => {
        setText(prev => prev.substring(0, prev.length - 1));
        setCharIndex(prev => prev - 1);

        if (text === '') {
          clearInterval(timer);
          setIsDeleting(false);
          setPartIndex(prev => (prev + 1) % content.length);
        }
      }, 50); //controls speed for deleting
    } else {
      timer = setInterval(() => {
        setText(content[partIndex].substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (text === content[partIndex]) {
          clearInterval(timer);
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }, 60); //controls speed for adding
    }

    return () => clearInterval(timer);
  }, [text, isDeleting, partIndex]);

  return (
    <div id="text" 
      style={{
        height: '2vw', 
      }}>
      {text}
    </div>
  );
}
