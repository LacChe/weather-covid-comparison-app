import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonIcon,
  IonLabel,
  IonModal,
  IonRange,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {
  heart,
  chevronBackOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import React, { useEffect } from 'react';
import { sectionType } from '../pages/Home';

type ControlsProps = {
  setSelectedSection: (section: sectionType) => void;
  date: string;
  setDate: (date: string) => void;
};

const Controls: React.FC<ControlsProps> = ({
  setSelectedSection,
  date,
  setDate,
}) => {
  const MIN_DATE = '2020-01-21';
  const MAX_DATE = '2023-03-23';
  const MAX_DAYS = 1157;

  useEffect(() => {
    setDate(MIN_DATE);
  }, []);

  function getDaysBetween() {
    var date1 = new Date(MIN_DATE);
    var date2 = new Date(date);
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }

  function caseTemperatureToggle() {
    return (
      <IonSegment value="default">
        <IonSegmentButton
          onClick={() => setSelectedSection('CASES')}
          value="CASES"
        >
          <IonLabel>Cases</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          onClick={() => setSelectedSection('TEMPERATURE')}
          value="TEMPERATURE"
        >
          <IonLabel>Temperature</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    );
  }

  function datePicker() {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonButton
            disabled={date === MIN_DATE}
            onClick={() => {
              let newDate = new Date(date);
              newDate.setDate(newDate.getDate() - 1);
              setDate(newDate.toISOString().substring(0, 10));
            }}
          >
            <IonIcon slot="icon-only" icon={chevronBackOutline}></IonIcon>
          </IonButton>
          <IonDatetimeButton datetime="date"></IonDatetimeButton>
          <IonButton
            disabled={date === MAX_DATE}
            onClick={() => {
              let newDate = new Date(date);
              newDate.setDate(newDate.getDate() + 1);
              setDate(newDate.toISOString().substring(0, 10));
            }}
          >
            <IonIcon slot="icon-only" icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </div>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            onIonChange={({ detail }: any) => setDate(detail.value)}
            id="date"
            value={date}
            min={MIN_DATE}
            max={MAX_DATE}
            presentation="date"
          ></IonDatetime>
        </IonModal>

        <IonRange
          onIonChange={({ detail }: any) => {
            let newDate = new Date(MIN_DATE);
            newDate.setDate(newDate.getDate() + detail.value);
            setDate(newDate.toISOString().substring(0, 10));
          }}
          style={{ width: '90%', margin: '0 auto' }}
          aria-label="Range with ticks"
          ticks={true}
          snaps={true}
          value={getDaysBetween()}
          min={0}
          max={MAX_DAYS}
        ></IonRange>
      </>
    );
  }

  return (
    <div>
      {caseTemperatureToggle()}
      {datePicker()}
    </div>
  );
};

export default Controls;
