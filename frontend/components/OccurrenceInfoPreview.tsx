import {Link} from 'react-router-dom';

type OccurrenceInfoPreview = {
    id: number;
    title: string;
    type: string;
    date: string;
}

export function OccurrenceInfoPreview ({id, title, type, date}: OccurrenceInfoPreview) {
    return (
        <div>
            <div>
                <span>{title}</span>
                <span>Tipo: {type}</span>
            </div>
            <div>
                <span>{date}</span>
                <Link to={`ocorrencia/${id}`}><button>Ver mais</button></Link>
            </div>
        </div>
    )
}