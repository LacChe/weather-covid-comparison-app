import React from 'react';
import statesSVG from '../res/usaLow.svg';
import { ReactSVG } from 'react-svg';

type StatesMapProps = {
  stateValues: { value: number; state: string; date: string }[];
};

const StatesMap: React.FC<StatesMapProps> = ({ stateValues }) => {
  const STROKE_COLOR = 'white';
  const STROKE_WIDTH = 3;
  const FILL_COLOR = 'green';
  const MAX_VALUE = stateValues.reduce(
    (max, obj) => (obj.value > max ? obj.value : max),
    0,
  );

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  function setStateColors() {
    let paths = document.querySelectorAll('path');
    stateValues.forEach((stateVal) => {
      if (
        [...paths].filter((path) => path.id.includes(stateVal.state)).length > 0
      ) {
        [...paths]
          .filter((path) => path.id.includes(stateVal.state))[0]
          .setAttribute(
            'fill',
            '#' +
              componentToHex(
                Math.ceil((stateVal.value / MAX_VALUE) * 200) + 55,
              ) +
              componentToHex(0) +
              componentToHex(
                255 - Math.ceil((stateVal.value / MAX_VALUE) * 255),
              ),
          );
      }
    });
  }

  return (
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
      style={{
        maxWidth: '500px',
        margin: '0 auto',
      }}
      src={statesSVG}
    />
  );
};

export default StatesMap;
