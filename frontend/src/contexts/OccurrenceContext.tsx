import {ReactNode, createContext, useState, useEffect} from 'react';


interface IOccurrenceProviderProps {
    children: ReactNode
}

type Location = {
    type: string,
    coordinates: [
        number, number
    ]
}

interface Occurrence{
    _id: string,
    title: string,
    type: string,
    date: string,
    description: string,
    location: {lat: number, lng: number}
}

interface OccurrenceResApi{
    _id: string,
    title: string,
    type: string,
    date: string,
    description: string,
    location: Location
}

interface IOccurrenceContext {
    occurrences: Occurrence[];
    registryOccurrence: (occurrence: { title: string, type: string, date: string, description: string, location: {lat: number, lng: number}}) => void;
    deleteOccurrence: (idOccurrence : string) => void;
    updateOccurence: (occurrence : Occurrence) => void
}

export const OccurrencesContext = createContext<IOccurrenceContext>({} as IOccurrenceContext);


export function OccurrenceProvider ({children}: IOccurrenceProviderProps) {


    const [occurrences, setOccurences] = useState<Occurrence[]>([]);

    const findOccurrence = (id: string) => occurrences.find((occurrence) => occurrence._id === id);

    useEffect(() => {
        const fetchOccurrences = async () => {
            try {
                const response = await fetch('http://localhost:3000/');
                const occurrencesRes: OccurrenceResApi[] = await response.json();
                const data = occurrencesRes.map(({_id, title, type, date, description, location}) => {
                    return {_id, title, type, date, description, location: {lat: location.coordinates[1], lng: location.coordinates[0]} }
                })
                console.log(data)
                setOccurences(data);
            } catch(err) {
                console.log(err);
            }
        }

        fetchOccurrences();
    }, []);


    const registryOccurrence = async (occurrence: { title: string, type: string, date: string, description: string, location: {lat: number, lng:number} }): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(occurrence)
            });
            const {_id, title, date, description, type, location}: OccurrenceResApi = await response.json();
            if (_id) {
                const data = {_id, title, date, description, type, location: {lat: location.coordinates[1], lng: location.coordinates[0]}}
                console.log(data);
                setOccurences(state => [data, ...state]);
            }
        } catch(err) {
            console.log(err);
            return undefined
        }
    };
    

    const deleteOccurrence = async (idOccurren: string) => {
        const occurrenceExists = findOccurrence(idOccurren);
        try {
            await fetch(`http://localhost:3000/${idOccurren}`, {
                method: 'DELETE'
            })
            if(occurrenceExists) {
                if(confirm(`Você realmente deseja excluir essa ocorrência?`)) {
                    setOccurences(state => {
                        const newState = state.filter(({_id}) => _id !== idOccurren);
                        return newState;
                    })
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    const updateOccurence = async (occurrenceUp: Occurrence) => {
        const occurrenceExists = findOccurrence(occurrenceUp._id);
        try {
            const response = await fetch(`http://localhost:3000/${occurrenceUp._id}`, {
                method: 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(occurrenceUp)
            })
            const upOccurrence: OccurrenceResApi = await response.json();
            if(occurrenceExists && upOccurrence) {
                setOccurences(state => {
                    const newState = state.map(occurrence => (occurrence._id === occurrenceUp._id ? {...occurrence, ...occurrenceUp} : occurrence))
                    return newState;
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const dataContext : IOccurrenceContext = {
        occurrences,
        registryOccurrence,
        deleteOccurrence,
        updateOccurence
    }
    
    return <OccurrencesContext.Provider value={dataContext}>{children}</OccurrencesContext.Provider>

}




