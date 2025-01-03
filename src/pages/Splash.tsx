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
                <IonImg
                    src="../../resources/logo.png"
                    alt="Logo de l'application"
                    className="splash-logo"
                />
            </IonContent>
        </IonPage>
    );
};

export default Splash;
