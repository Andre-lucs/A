import { useDateTime } from '../hooks/useDateTime';

type OccurrenceDetailsProps = {
    type: string;
    date: string;
    description: string
}

export function OccurrenceDetails ({type, date, description}: OccurrenceDetailsProps) {

    const {formatDateTime} = useDateTime();
    return (
        <main>
              <div className='flex flex-col gap-3'>
                <p><span className="font-bold">Tipo:</span> {type}</p>
                <p><span className="font-bold">Data:</span> {formatDateTime(date).date}</p>
                <p><span className="font-bold">Hora:</span> {formatDateTime(date).time}</p>
                <p className='w-96'>{description}</p>
            </div>
        </main>
    )
}