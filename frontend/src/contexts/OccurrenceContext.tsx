import {ReactNode, createContext, useState} from 'react';


interface IOccurrenceProviderProps {
    children: ReactNode
}

type Occurrence = {
    id: number,
    title: string,
    type: string,
    dateTime: string,
}

interface IOccurrenceContext {
    occurrences: Occurrence[];
    registryOccurrence: (occurrence: Occurrence) => void;
    deleteOccurrence: (idOccurrence : number) => void;
}

export const OccurrencesContext = createContext<IOccurrenceContext>({} as IOccurrenceContext);


export function OccurrenceProvider ({children}: IOccurrenceProviderProps) {


    const [occurrences, setOccurences] = useState<Occurrence[]>([]);

    const registryOccurrence = (occurrence : Occurrence) => {
        if(occurrence)
            setOccurences(state =>  [occurrence, ...state])
    }

    const deleteOccurrence = (idOccurren: number) => {
        const occurrenceExists = occurrences.find(occurrence => occurrence.id === idOccurren);
        if(occurrenceExists) {
            if(confirm(`Você realmente deseja excluir essa ocorrência?`)) {
                setOccurences(state => {
                    const newState = state.filter(({id}) => id !== idOccurren);
                    return newState;
                })
            }
        }
    }

    const dataContext : IOccurrenceContext = {
        occurrences,
        registryOccurrence,
        deleteOccurrence
    }
    
    return <OccurrencesContext.Provider value={dataContext}>{children}</OccurrencesContext.Provider>

}