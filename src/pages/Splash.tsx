import { IonContent, IonImg, IonPage } from '@ionic/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Splash.css'

const Splash: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(nextpage, 1500);
        return () => clearTimeout(timer);
    }, []);

    const nextpage = () => {
        history.replace("/intro");
    };

    return (

        <IonPage>
            <IonContent className="splash-content">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <img
                        src="../../resources/logo.png"
                        alt="Logo de l'application"
                        style={{ maxWidth: '100%', height: '40%' }} 
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Splash;
