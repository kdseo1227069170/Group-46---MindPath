import React from 'react';
import './CanadaMap.css';
import { ReactComponent as CanadaMapSVG } from './CanadaMap.svg';

const CanadaMap = () => {
    return (
        <div className="canada-map">
          <CanadaMapSVG width="900" height="900" />
        </div>
    );
};

export default CanadaMap;