import {Input} from '../components/Input'
import {Select} from '../components/Select'
import { MapInput } from '../components/MapInput';
import { Textarea } from '../components/Textarea';
import { useState } from 'react';

type Occurrence = {
    title: string,
    type: string,
    dateTime: string,
    location: {lat: number, lng: number}
}

type FormProps = {
    handleSubmit: (occurrence: Occurrence) => void
    initialValues?: Occurrence
}


export function Form ({handleSubmit, initialValues} : FormProps) {
    
    const [title, setTitle] = useState(initialValues?.title ?? '')
    const [dateTime, setDateTime] = useState(initialValues?.dateTime ?? Date);
    const [type, setType] = useState(initialValues?.type ?? '');
    const [location, setLocation] = useState(initialValues?.location ?? {lat: -7.413036819721449, lng: -36.919913562309716});
    const [description, setDescription] = useState('');
    
    function submitForm(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        handleSubmit({title, location, type, dateTime})
    }

    return (
        <div>
            <form onSubmit={submitForm} className='p-3 flex gap-5 justify-between flex-wrap'>
                <div className='flex flex-col '>
                    <Input id='title' label='Título:' type='text' value={title} handleChange={(ev) => setTitle(ev.target.value)} />
                    <Input id='date-time' label='Data e hora:' type='datetime-local' value={dateTime} handleChange={(ev) => setDateTime(ev.target.value)} />
                    <Select id='type' label='Tipo:' value={type} handleChange={(ev) => setType(ev.currentTarget.value)}/>
                    <Textarea name='descrição' id='description' label='Descrição:' handleChange={(ev) => setDescription(ev.currentTarget.value) } value={description}/>
                    <button className='bg-blue-500 mt-5 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300'>Enviar</button>
                </div>
                <div>
                    <MapInput location={location} name='Mapa' label='Localização:' handleClick={(ev) => setLocation({lat: ev.latLng.lat(), lng: ev.latLng.lng()})}/>
                </div>
            </form>
        </div>
    )
}