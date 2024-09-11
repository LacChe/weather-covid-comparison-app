import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import StatesMap from '../components/StatesMap';
import Controls from '../components/Controls';
import { useEffect, useState } from 'react';
import { fetchCases, fetchTemperature } from '../utils/fetchData';

export type sectionType = 'Cases' | 'Temperature';

const Home: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<sectionType>('Cases');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      switch (selectedSection) {
        case 'Cases':
          console.log(await fetchCases(date));
          break;
        case 'Temperature':
          fetchTemperature(date);
          break;
      }
    }
    fetchData();
  }, [selectedSection, date]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {date} U.S.{' '}
            {selectedSection === 'Cases' ? 'New Covid Cases' : 'Temperature'}{' '}
            Map
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StatesMap />
        <Controls
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          date={date}
          setDate={setDate}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
