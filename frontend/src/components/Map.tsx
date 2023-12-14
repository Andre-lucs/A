import { useOccurrence } from '../hooks/useOccurrences';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker} from 'react-leaflet'
import "leaflet/dist/leaflet.css";

type MapProps = {
  location?: {lat: number, lng: number}
  className?: string 
  handleClick?: (occurrenceInfoEv: {_id:string, description: string, date: string, title: string}) => void
}

export function Map ({location, className, handleClick}: MapProps) {

  const {occurrences} = useOccurrence();
 
  return (
    <div className='w-full min-h-full'>

       <MapContainer center={location? [location.lat, location.lng]: [-6.945847659061351 ,-36.49275309882635]} zoom={8} scrollWheelZoom={true} className={className} id='map'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
             !location ? occurrences.map(({_id, title, date, description, location}) => (
                <Marker key={_id} position={location}  eventHandlers={
                  {
                    click: () => { 
                      if(handleClick)
                         handleClick({_id, description, date, title})}
                  }
                } data-cy="marker"/> 
              )) : <Marker position={location} />
            }
      </MapContainer>
    </div>
  )
}
