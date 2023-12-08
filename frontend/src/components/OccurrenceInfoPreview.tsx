import { Link } from 'react-router-dom';
import { useDateTime } from '../hooks/useDateTime';

type OccurrenceInfoPreviewProps = {
    _id: string;
    title: string;
    type: string;
    date: string;
}

export function OccurrenceInfoPreview({ _id, title, type, date }: OccurrenceInfoPreviewProps) {

    const {formatDateTime} = useDateTime();


    return (
        <div className='flex gap-10  p-2 shadow hover:shadow-lg transition duration-300 border-black  justify-between border-l-4 border-blue-500 '
             id={_id}>
            <div className='flex flex-col gap-2'>
                <span className='text-lg font-semibold'>{title}</span>
                <span className='text-gray-600'>Tipo: {type}</span>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='text-gray-600'>{formatDateTime(date).date}</span>
                <Link to={`ocorrencia/${_id}`} >
                    <button id='cy-see-more-btn' className='ml-3 text-black cursor-pointer hover:underline'>
                        Ver mais
                    </button>
                </Link>
            </div>
        </div>
    )
}
