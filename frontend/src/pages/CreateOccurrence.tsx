import {useOccurrence} from '../hooks/useOccurrences';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';

export function CreateOccurrence () {

    const navigate = useNavigate()

    const {registryOccurrence} = useOccurrence();

    type Occurrence = {
        title: string,
        type: string,
        dateTime: string,
        location: {lat: number, lng: number}
    }

    function handleSubmit (occurrence: Occurrence) {
        const id =  Math.random() * 5000
        const {title, type, dateTime, location} = occurrence;
        registryOccurrence({id, title, type, dateTime, location});   
        return navigate('/');
    }

    return (
        <div>
            <h1 className='text-xl mt-2xl font-bold'>Adicionar ocorrência: </h1>
            <Form handleSubmit={handleSubmit}/>
        </div>
    )
}