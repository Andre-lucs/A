import {Input} from '../components/Input'
import {Select} from '../components/Select'
import { MapInput } from '../components/MapInput';
import { Textarea } from '../components/Textarea';
import { useState, useEffect} from 'react';
import { Button } from './Button';

type Occurrence = {
    title: string,
    type: string,
    date: string,
    description: string
    location: {lat: number, lng: number}
}

type FormProps = {
    handleSubmit: (occurrence: Occurrence) => void
    initialValues?: Occurrence
}


export function Form ({handleSubmit, initialValues} : FormProps) {
    
    const [title, setTitle] = useState(initialValues?.title ?? '')
    const [date, setDate] = useState(initialValues?.date ? formatDate(new Date(initialValues?.date)) : new Date().toISOString().split('T')[0]);
    const [type, setType] = useState(initialValues?.type ?? '');
    const [location, setLocation] = useState(initialValues?.location ?? {lat: -7.413036819721449, lng: -36.919913562309716});
    const [description, setDescription] = useState(initialValues?.description ?? '');

    function formatDate(date: Date) {
      const isoString = new Date(date).toISOString();
      return isoString.slice(0, 16); // Formatar para YYYY-MM-DDThh:mm
    }


    useEffect(() => {
        if (navigator.geolocation && !initialValues?.location) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => {
              console.log("Failed to get user's location");
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser');
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    function submitForm(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        handleSubmit({title, location, type, date, description})
    }

    return (
        <div>
            <form onSubmit={submitForm} className='p-3 flex gap-5 w-full' id='form'>
                <div className='flex flex-col '>
                    <Input id='title' label='Título:' type='text' value={title} handleChange={(ev) => setTitle(ev.target.value)} />
                    <Input id='date-time' label='Data e hora:' type='datetime-local' value={date} handleChange={(ev) => setDate(ev.target.value)} />
                    <Select _id='type' label='Tipo:' value={type} handleChange={(ev) => setType(ev.currentTarget.value)}/>
                    <Textarea name='descrição' id='description' label='Descrição:' handleChange={(ev) => setDescription(ev.currentTarget.value) } value={description}/>
                    <Button text='Enviar' buttonType='send'/>
                </div>
                <div>
                    <MapInput location={location} name='Mapa' label='Localização:' handleClick={(lat, lng) => setLocation({lat, lng})}/>
                </div>
            </form>
        </div>
    )
}

