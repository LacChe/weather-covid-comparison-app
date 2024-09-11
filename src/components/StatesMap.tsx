import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';
import statesSVG from '../res/usaLow.svg';
import { ReactSVG } from 'react-svg';

const StatesMap: React.FC = () => {
  const STROKE_COLOR = 'white';
  const STROKE_WIDTH = 3;
  const FILL_COLOR = 'blue';

  function setStateColors() {
    // testing
    // TODO set color based case or temperature per state
    let paths = document.querySelectorAll('path');
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].id.includes('MI')) paths[i].setAttribute('fill', 'ORANGE');
    }
  }

  return (
    <IonCard>
      <IonCardContent className="ion-padding">
        <ReactSVG
          afterInjection={(svg) => {
            setStateColors();
          }}
          beforeInjection={(svg) => {
            svg.setAttribute(
              'style',
              `stroke: ${STROKE_COLOR}; stroke-width: ${STROKE_WIDTH}; fill: ${FILL_COLOR}`,
            );
            svg.setAttribute('viewBox', '0 0 1150 800');
          }}
          src={statesSVG}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default StatesMap;
