import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './Map.css';
import { useOccurrence } from '../hooks/useOccurrences';

type MapProps = {
  location?: {lat: number, lng: number}
}

export function Map ({location}: MapProps) {

  const {occurrences} = useOccurrence();
  const { isLoaded } = useLoadScript({
        googleMapsApiKey: ""
  })
    
  const defaultCenter = {lat: -6.945847659061351 , lng: -36.49275309882635};


if(!isLoaded) return <div>Loading...</div>    
  return (
    <div id='map'>
      <GoogleMap 
          zoom={5}
          center={location && defaultCenter} 
          id='map'> 
            {
             !location ? occurrences.map(({id, location}) => (
                <MarkerF key={id} position={location}/> 
              )) : <MarkerF position={location}/>
            }
      </GoogleMap>
    </div>
  )
}

