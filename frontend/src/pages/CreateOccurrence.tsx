import {useOccurrence} from '../hooks/useOccurrences';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';

export function CreateOccurrence () {

    const navigate = useNavigate()

    const {registryOccurrence} = useOccurrence();


    type Occurrence = {
        title: string,
        type: string,
        date: string,
        description: string,
        location: {lat: number, lng: number}
    }

    function handleSubmit (occurrence: Occurrence) {
        const {title, type, date, location, description} = occurrence;
        registryOccurrence({title, type, date, description, location});   
        return navigate('/');
    }

    return (
        <div className='p-8'>
            <header>
                <nav>
                    <Link to={'/'}><button className='underline'>Voltar</button></Link>
                </nav>
            </header>
            <div className='flex flex-col items-center'>
                <h1 className='text-xl mt-2xl font-bold text-left'>Adicionar ocorrência: </h1>
                <Form handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}