import React from 'react';
import './CanadaMap.css';
import { ReactComponent as CanadaMapSVG } from './CanadaMap.svg';
import {mapInteract} from './map-interact';

const CanadaMap = () => {
    mapInteract();
    return (
        <div className="canada-map">
          <CanadaMapSVG width="900" height="900" />
        </div>
    );
};

export default CanadaMap;