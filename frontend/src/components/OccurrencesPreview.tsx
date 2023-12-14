import { useState, useEffect } from "react";
import { useOccurrence } from "../hooks/useOccurrences";
import { OccurrenceInfoPreview } from "./OccurrenceInfoPreview";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";

export function OccurrencesPreview () {
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
        <div className='rounded bg-white my-2 ml-3 shadow'>
                <div className='w-full flex justify-center gap-3 p-2'>
                    <SearchInput value={searchOccurrence} placeholder="Buscar ocorrência" handleChange={(ev) => filterOccurrences(ev.target.value)}/>
                    <Link to='criar-ocorrencia'>
                        <Button buttonType='send' text='Adicionar'/>
                    </Link>
                </div>
                <div className='pt-4 pb-4 w-full flex flex-col h-[250px] overflow-y-auto gap-3' id="cy-occurrences-list-preview">
                    {occurrences && occurrences.length > 0? (
                        filteredOccurrences.map(({ title, type, date, _id }) => (
                            <OccurrenceInfoPreview title={title} key={_id} type={type} _id={_id} date={date} />
                            ))
                        ) : (
                            <p className="text-center">Sem ocorrências registradas</p>
                    )}
                </div>
            </div>
    )
}