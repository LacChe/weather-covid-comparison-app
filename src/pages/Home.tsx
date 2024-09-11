import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import StatesMap from '../components/StatesMap';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>U.S. Weather / Covid Comparison Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StatesMap />
      </IonContent>
    </IonPage>
  );
};

export default Home;
