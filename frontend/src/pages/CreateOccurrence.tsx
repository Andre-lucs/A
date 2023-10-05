import React from 'react';
import {Input} from '../components/Input'
import {Select} from '../components/Select'
import {useState} from 'react'
import {useOccurrence} from '../hooks/useOccurrences';
import { MapInput } from '../components/MapInput';
import { Textarea } from '../components/Textarea';
import { useNavigate } from 'react-router-dom';

export function CreateOccurrence () {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [dateTime, setDateTime] = useState(Date);
    const [type, setType] = useState('');
    const [location, setLocation] = useState({lat: -7.413036819721449, lng: -36.919913562309716});
    const [description, setDescription] = useState('');

    const {registryOccurrence} = useOccurrence();

    function submitForm ( ev: React.FormEvent<HTMLFormElement> ) {
        ev.preventDefault();
        const id =  Math.random() * 5000
        registryOccurrence({id, title, type, dateTime, location});   
        return navigate('/');
    }

    return (
        <div>
            <h1 className='text-xl mt-2xl font-bold'>Adicionar ocorrência: </h1>
            <form onSubmit={submitForm} className='p-3 flex gap-5 justify-between'>
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