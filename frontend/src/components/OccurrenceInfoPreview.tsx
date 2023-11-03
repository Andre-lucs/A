import { Link } from 'react-router-dom';
import { useDateTime } from '../hooks/useDateTime';

type OccurrenceInfoPreviewProps = {
    _id: number;
    title: string;
    type: string;
    date: string;
}

export function OccurrenceInfoPreview({ _id, title, type, date }: OccurrenceInfoPreviewProps) {

    const {formatDateTime} = useDateTime();


    return (
        <div className='flex gap-10 border p-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-black w-1/2 justify-between mr-20'>
            <div className='flex flex-col gap-2'>
                <span className='text-xl font-semibold'>{title}</span>
                <span className='text-gray-600'>Tipo: {type}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-gray-600'>{formatDateTime(date).date}</span>
                <Link to={`ocorrencia/${_id}`} >
                    <button className='ml-3 text-black hover:underline'>
                        Ver mais
                    </button>
                </Link>
            </div>
        </div>
    )
}
