import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import StatesMap from '../components/StatesMap';
import Controls from '../components/Controls';
import { useState } from 'react';

export type sectionType = 'CASES' | 'TEMPERATURE';

const Home: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<sectionType>('CASES');
  const [date, setDate] = useState<string>('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {date} {selectedSection} U.S. Weather / Covid Comparison Map
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StatesMap />
        <Controls
          setSelectedSection={setSelectedSection}
          date={date}
          setDate={setDate}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
