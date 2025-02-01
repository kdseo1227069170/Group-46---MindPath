import React from 'react';
import './CanadaMap.css';
import { ReactComponent as CanadaMapSVG } from './CanadaMap.svg';
import {mapInteract} from './map-interact';

const CanadaMap = () => {
    mapInteract();
    return (
      <div className="canada-map">
        <h1 style={{ textAlign: 'center' }}>Resources in each Province</h1>
        <CanadaMapSVG width="900" height="900" />
        <div id="cajstip"></div>

      </div>
    );
};

export default CanadaMap;