import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
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
  const [stateValues, setStateValues] = useState<
    { value: number; state: string; date: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      switch (selectedSection) {
        case 'Cases':
          setStateValues(await fetchCases(date));
          break;
        case 'Temperature':
          setStateValues(await fetchTemperature(date, setIsOpen));
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
        <StatesMap stateValues={stateValues} />
        <Controls
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          date={date}
          setDate={setDate}
        />
        <IonToast
          isOpen={isOpen}
          color="danger"
          message="Weather API capacity reached"
          onDidDismiss={() => setIsOpen(false)}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default Home;
