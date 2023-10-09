import {useOccurrence} from '../hooks/useOccurrences';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from '../components/Form';


type Occurrence = {
    title: string,
    type: string,
    date: string,
    description: string
    location: {lat: number, lng: number}
}

export function UpdateOccurrence () {

    const navigate = useNavigate();
    const {occurrences, updateOccurence} = useOccurrence();
    const {idOccurrence} = useParams();
    let occurrence = null;

    
    if(idOccurrence)
        occurrence = occurrences.find((occurrence) => occurrence.id === +idOccurrence)
 
    function handleSubmit (occurrenceUp: Occurrence) {
        const {title, type, date, location, description} = occurrenceUp;
        if(idOccurrence)
            updateOccurence({id: +idOccurrence, title, type, description, date, location});   
        return navigate('/');
    }

    if(occurrence) {
        return (
            <div>
                <h1 className='text-xl mt-2xl font-bold'>Atualizar ocorrência: </h1>
                <Form handleSubmit={handleSubmit} initialValues={occurrence}/>
            </div>
        )
    } else {
        return <h1>Ocorrência não encontrada!</h1>
    }
}