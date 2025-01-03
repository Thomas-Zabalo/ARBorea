import {
    IonButton,
    IonContent,
    IonFooter,
    IonPage,
    IonText,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Intro.css";
import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useHistory } from 'react-router';

const Intro: React.FC = () => {
    const history = useHistory();
    const [swiper, setSwiper] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [onDone, setOnDone] = useState("Next")
    const [Skip, setSkip] = useState("Skip")

    const onNextClick = () => {
        if (slides.length > currentSlide + 1) {
            swiper.slideTo(currentSlide + 1);
        } else if (currentSlide == 2) {
            setOnDone("Done")
        }
        else {
            onSkip()
        }
    };

    useEffect(() => {
        if (currentSlide === slides.length - 1) {
            setOnDone("Done")
            setSkip("")
        }
        else {
            setOnDone("Next")
            setSkip("Skip")
        }
    }, [currentSlide])

    const onSkip = () => {
        history.replace("/home");
    };

    const slides = [
        {
            title: "Effortless Payment Transfers",
            caption: "Pay and transfer funds with ease anytime, anywhere.",
            image: "./slider1.svg",
        },
        {
            title: "Smart Account Management",
            caption: "Track your spending and manage your accounts effortlessly.",
            image: "./slider2.svg",
        },
        {
            title: "Enhanced Security Features",
            caption:
                "Keep your financial information safe with advanced security measures.",
            image: "./slider3.svg",
        },
    ];
    return (
        <IonPage>
            <IonContent>
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true, type: "bullets" }}
                    onSlideChange={(event) => {
                        setCurrentSlide(event.activeIndex);
                    }}
                    onSwiper={setSwiper}
                >
                    {slides.map((item) => (
                        <SwiperSlide className="slide" key={item.title}>
                            <img className="image" src={item.image} />
                            <br />
                            <div className="text-container">
                                <IonText className="heading">{item.title}</IonText>
                                <br />
                                <IonText className="caption">
                                    {item.caption}
                                </IonText>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </IonContent>
            <IonFooter color="light" translucent={true} className="ion-no-border">
                <IonToolbar style={{ backgroundColor: "white", opacity: 1 }}>
                    <div style={{ display: "flex", justifyContent: Skip !== "" ? "space-between" : "flex-end", width: "100%" }}>
                        {Skip !== "" && (
                            < IonButton onClick={onSkip} fill="clear" style={{ color: "#90aa86" }}>
                                {Skip}
                            </IonButton>
                        )}
                        <IonButton onClick={onNextClick} fill="clear" style={{ color: "#90aa86" }}>
                            {onDone}
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage >
    );
}

export default Intro;