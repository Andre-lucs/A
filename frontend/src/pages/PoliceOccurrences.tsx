import {Link} from 'react-router-dom'
import {OccurrenceInfoPreview} from '../components/OccurrenceInfoPreview';
import { useOccurrence } from '../hooks/useOccurrences';
import { useEffect, useState} from 'react';
import { Button } from '../components/Button';


export function PoliceOccurrences () {
    
    const {occurrences} = useOccurrence();
    const [searchOccurrence, setSearchOccurrence] = useState("");
    const [filteredOccurrences, setFilteredOccurrences] = useState(occurrences);
    
    useEffect(() => {
        setFilteredOccurrences(occurrences)   
    }, [occurrences]);
    
    function filterOccurrences(value: string) {
        setSearchOccurrence(value); 
        setFilteredOccurrences(() => {
            return occurrences.filter(({ title }) =>
            title.toUpperCase().includes(value.toUpperCase())
            );
        });
    }
    
    return (
        <div className='flex flex-col justify-center w-full items-center pt-4'>
            <div className='w-full flex justify-center gap-3'>
                <input 
                    type="text" 
                    value={searchOccurrence}
                    placeholder="Buscar ocorrência" 
                    className='h-10 p-3 w-1/2 rounded border border-black'
                    onChange={(ev) => filterOccurrences(ev.target.value)}/>
                <Link to='criar-ocorrencia'>
                    <Button buttonType='send' text='Adicionar'/>
                </Link>
            </div>

            <div className='pt-4 pb-4 w-full flex flex-col items-center max-h-[300px] overflow-y-auto gap-3'>
                {occurrences && occurrences.length > 0? (
                    filteredOccurrences.map(({ title, type, date, id }) => (
                        <OccurrenceInfoPreview title={title} key={id} type={type} id={id} date={date} />
                    ))
                ) : (
                    <p>Sem ocorrências registradas</p>
                )}
            </div>
        </div>
    )
}