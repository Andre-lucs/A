import {Link} from 'react-router-dom'
import {OccurrenceInfoPreview} from '../components/OccurrenceInfoPreview';
import { useOccurrence } from '../hooks/useOccurrences';
import { useEffect, useState} from 'react';
import { Button } from '../components/Button';
import { Graphics } from '../components/Graphics';

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
        <div className='flex  w-full bg-slate-200'>
            <div className='rounded bg-white m-2 shadow'>
                <div className='w-full flex justify-center gap-3 p-2'>
                    <input
                        type="text"
                        value={searchOccurrence}
                        placeholder="Buscar ocorrência"
                        className='h-10 p-3 w-96 rounded border border-black'
                        onChange={(ev) => filterOccurrences(ev.target.value)}/>
                    <Link to='criar-ocorrencia'>
                        <Button buttonType='send' text='Adicionar'/>
                    </Link>
                </div>
                <div className='pt-4 pb-4 w-full flex flex-col max-h-[400px] overflow-y-auto gap-3'>
                    {occurrences && occurrences.length > 0? (
                        filteredOccurrences.map(({ title, type, date, _id }) => (
                            <OccurrenceInfoPreview title={title} key={_id} type={type} _id={_id} date={date} />
                            ))
                            ) : (
                                <p>Sem ocorrências registradas</p>
                                )}
                </div>
            </div>
            <Graphics/>
        </div>
    )
}