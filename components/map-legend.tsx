import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from 'prop-types'; 
import L from "leaflet";


type PositionClasses =  Record<string, string> 
  

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}
export default function MapLegend({ position}:{position: string}) {

      const positionClass = position && (POSITION_CLASSES as PositionClasses)[position] || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="border-2 z-50 border-red-500 h-44">This is the property</div>
      </div>
    )
}