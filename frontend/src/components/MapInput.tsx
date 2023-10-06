import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';



type MapInputProps = {
    location : {lat: number, lng: number};
    handleClick : (e) => void,
    label: string,
    name: string
}

export function MapInput ({location, handleClick, name, label} : MapInputProps) {

  const { isLoaded } = useLoadScript({
        googleMapsApiKey: ""
  })
    

if(!isLoaded) return <div>Loading...</div>    
  return (
    <div className='flex flex-col gap-1 mt-3'>
      <label htmlFor={name}>{label}</label>
      <GoogleMap 
          zoom={10}
          options={{minZoom: 5}}
          center={location} 
          id='map' 
          onClick={handleClick}
          mapContainerClassName='ml-2 rounded h-96 w-96'> 
            <MarkerF position={location} />
      </GoogleMap>
    </div>
  )
}