import React from 'react';

const ImagePreloader: React.FC = () => {
  // Este componente no renderiza nada visible
  return (
    <div style={{ display: 'none' }}>
      <img src="/jaime_zudanez.png" alt="" />
      <img src="/mariano_serrano.png" alt="" />
      <img src="/casimiro.png" alt="" />
      <img src="/juana_a.png" alt="" />
      <img src="/joaquin.png" alt="" />
      <img src="/jose_b.png" alt="" />
      <img src="/angel_m.png" alt="" />
      <img src="/mariano_moreno.png" alt="" />
      <img src="/angel_mm.png" alt="" />
      <img src="/antonio_s.png" alt="" />
     
    </div>
  );
};

export default ImagePreloader;