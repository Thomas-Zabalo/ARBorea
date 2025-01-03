import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import './PlanteContainer.css';

function PlanteContainer({ onModelSelect }: { onModelSelect: (model: any) => void }) {
  const Model = [
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 1 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 2 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 3 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 4 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 5 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 6 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 7 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 8 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 9 },
    { name: "Model 3d", img: "../../resources/cerveau.jpg", model: "./assets/aloe_plant.glb", id: 10 },
  ];

  return (
    <IonGrid>
      <IonRow>
        {Model.map((x) => (
          <IonCol key={x.id} size="6" sizeMd="4">
            <img
              className="img-model"
              src={x.img}
              alt={x.name}
              onClick={() => onModelSelect(x)}
            />
            <div className="name-model">{x.name}</div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}

export default PlanteContainer;
