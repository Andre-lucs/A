import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { useOccurrence } from '../hooks/useOccurrences';


type MapProps = {
  location?: {lat: number, lng: number}
  className?: string 
  handleClick?: (occurrenceInfoEv: {id:number, description: string, date: string, title: string}) => void
}

export function Map ({location, className, handleClick}: MapProps) {

  const {occurrences} = useOccurrence();
  const { isLoaded } = useLoadScript({
        googleMapsApiKey: ""
  })

    
  const defaultCenter = {lat: -6.945847659061351 , lng: -36.49275309882635};


if(!isLoaded) return <div>Loading...</div>    
  return (
    <div className='w-full min-h-full'>
      <GoogleMap 
          zoom={5}
          center={location ?? defaultCenter} 
          mapContainerClassName={className}
          > 
            {
             !location ? occurrences.map(({id, title, date, description, location}) => (
                <MarkerF key={id} position={location}  onClick={() => { 
                  if(handleClick)
                     handleClick({id, description, date, title})}} /> 
              )) : <MarkerF position={location}/>
            }
      </GoogleMap>
    </div>
  )
}

