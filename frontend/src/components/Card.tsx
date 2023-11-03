import { useDateTime } from "../hooks/useDateTime";

type CardProps = {
    _id: string;
    title: string;
    description: string;
    date: string;
    isDisplay: boolean
    handleClick: () => void
}

export function Card ({_id, title, description,  date, isDisplay, handleClick}: CardProps) {

    const {formatDateTime} = useDateTime();

    return (
        <div className={`absolute z-10 top-20 right-5 bottom-5 left-5 p-3 ${!isDisplay? 'hidden' : ''}`}>
            <div className="bg-white rounded-lg shadow-lg p-3 w-96 h-56">
                <h1 className="text-xl font-bold mb-4">{title} - #{_id}</h1>
                <span>{formatDateTime(date).date}</span>
                <p className="text-gray-700">{description}</p>
                <button className="mt-20 ml-72 " onClick={handleClick}>Fechar</button>
            </div>
        </div>
    )
}