import {useNavigate, useParams } from 'react-router-dom';
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
            deleteOccurrence(+idOccurrence)
            navigate('/');
    }
    
    if(idOccurrence)
        occurrence = occurrences.find((occurrence) => occurrence.id === +idOccurrence)

    if(occurrence) 
        return (
            <div className='p-3 flex gap-5 justify-between'>
                    <div>
                        <OccurrenceHeader
                            title={occurrence.title}
                            occurrenceId={occurrence.id}
                            handleDelete={handleDelete}/>
                        <OccurrenceDetails
                            date={occurrence.date}
                            type={occurrence.type}
                            description={occurrence.description} />
                    </div>
                    <div>
                        <Map location={occurrence.location} className='h-96 w-96'/>
                    </div>
            </div>
    )
}