import React from 'react';
import { IonPage, IonContent } from '@ionic/react';


const Home: React.FC = () => {

  return (
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" rotation="0 45 45" color="#4CC3D9" scale="2 2 2"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default Home;