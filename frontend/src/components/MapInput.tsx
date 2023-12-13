import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css";


type MapInputProps = {
  location: { lat: number; lng: number };
  handleClick: (lat: number, lng: number) => void;
  label: string;
  name: string;
};


export function MapInput({location, handleClick, name, label,}: MapInputProps) {

  const [currentLocation, setCurrentLocation] = useState<LatLngTuple>(location? [location.lat, location.lng] : [-6.945847659061351, -36.49275309882635])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setCurrentLocation([lat, lng]);
    handleClick(lat, lng);
  };
  
  const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
  };

  return (
    <div className='flex flex-col gap-1 mt-3 w-full'>
      <label htmlFor={name}>{label}</label>
      <MapContainer
      center={currentLocation ? currentLocation : [-6.945847659061351, -36.49275309882635]}
      zoom={13}
      scrollWheelZoom={false}
      className='h-[500px] w-[700px]'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={currentLocation} />
      <MapEventsHandler handleMapClick={handleMapClick} />
    </MapContainer>
    </div>
  );
}
