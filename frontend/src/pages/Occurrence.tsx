import {Link, useNavigate, useParams } from 'react-router-dom';
import {Map} from '../components/Map'
import { useOccurrence } from '../hooks/useOccurrences'
import { OccurrenceHeader } from '../components/OccurrenceHeader';
import { OccurrenceDetails } from '../components/OccurrenceDetails';


export function Occurrence () {
    
    const navigate = useNavigate();
    const {occurrences, deleteOccurrence} = useOccurrence();
    const {idOccurrence} = useParams();
    let occurrence = null;


    function handleDelete () {
        if(idOccurrence)
            deleteOccurrence(idOccurrence)
            navigate('/');
    }
    
    if(idOccurrence)
        occurrence = occurrences.find((occurrence) =>  occurrence._id === idOccurrence)

    
    if(occurrence) 
        return (
            <div className='p-8'>
                <header>
                    <nav>
                        <Link to={'/'}><button id='cy-back-btn' className='underline'>Voltar</button></Link>
                    </nav>
                </header>
                <div className='flex p-8 gap-10 w-full'>
                    <div className='flex flex-col pl-36'>
                        <OccurrenceHeader
                            title={occurrence.title}
                            occurrenceId={occurrence._id}
                            handleDelete={handleDelete}/>
                        <OccurrenceDetails
                            date={occurrence.date}
                            type={occurrence.type}
                            description={occurrence.description} />
                    </div>
                    <Map location={occurrence.location} className='h-96 w-96'/>
                </div>
            </div>
    )
    else
       return <h1 id='cy-not-found-message'>Ocorrência não encontrada.</h1>     
}