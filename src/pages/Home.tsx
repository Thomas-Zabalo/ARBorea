import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonModal } from '@ionic/react';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonContent>
        {/* Contenu principal */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Welcome to the Blank Page</h1>
          <p>This is a blank page with a modal example.</p>
        </div>

        {/* Bouton pour ouvrir le modal */}
        <IonButton
          expand="block"
          onClick={() => setShowModal(true)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Open Modal
        </IonButton>

        {/* Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Modal Content</h2>
              <p>This is your modal content.</p>
              <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
