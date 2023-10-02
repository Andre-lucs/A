import {Link} from 'react-router-dom'
import {OccurrenceInfoPreview} from '../../components/OccurrenceInfoPreview';
import { useOccurrence } from '../hooks/useOccurrences';

export function PoliceOccurrences () {
    
    const {occurrences} = useOccurrence();

    return (
        <div>
            <div>
                <input type="text" placeholder="Buscar ocorrência"/>
                <button>Buscar</button>
            </div>

            <div>
                {
                   occurrences ? occurrences.map(({title, type, dateTime, id}) => (
                        <OccurrenceInfoPreview title={title} type={type} id={id} date={dateTime}/>
                    )) : 'Sem ocorrências registradas'
                }
            </div>

            
           
            <Link to='criar-ocorrencia'><button>Adicionar ocorrência</button></Link>
        </div>
    )
}