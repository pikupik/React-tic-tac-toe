// AnimatedBackground.js

import React, { useEffect } from 'react';
import anime from 'animejs';

const AnimatedBackground = () => {
  useEffect(() => {
    anime({
      targets: 'body',
      backgroundColor: ['#3498db', '#e74c3c'], // Warna-warna yang dapat Anda sesuaikan
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    });
  }, []);

  return null;
};

export default AnimatedBackground;
