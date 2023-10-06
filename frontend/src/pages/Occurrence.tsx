import { Link, useNavigate, useParams } from 'react-router-dom';
import {Map} from '../components/Map'
import { useOccurrence } from '../hooks/useOccurrences'

export function Occurrence () {

    const navigate = useNavigate();
    const {occurrences, deleteOccurrence} = useOccurrence();
    const {idOccurrence} = useParams();
    let occurrence = null;

    
    function handleClick () {
        if(idOccurrence)
            deleteOccurrence(+idOccurrence)
            navigate('/');
    }
    
    if(idOccurrence)
        occurrence = occurrences.find((occurrence) => occurrence.id === +idOccurrence)

    if(occurrence) 
        return (
            <div className='p-3 flex gap-5 justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>{occurrence.title}</h1>
                    <div className='flex gap-3 my-3'>
                        <button 
                            className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2 focus:outline-none focus:ring focus:ring-red-300'
                            onClick={handleClick}
                            >
                            Excluir
                        </button>
                        <Link to={`/atualizar-ocorrencia/${idOccurrence}`}>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:ring-blue-300'>
                                Atualizar
                            </button>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <p><span className="font-bold">Tipo:</span> {occurrence.type}</p>
                        <p><span className="font-bold">Data:</span> {occurrence.dateTime}</p>
                        <p><span className="font-bold">Hora:</span> 16:30</p>
                        <p className='w-96'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid saepe cum modi obcaecati laborum doloremque quasi minus labore nisi error qui eaque rerum eveniet, animi veritatis, quam voluptatem sapiente illum?</p>
                    </div>
                </div>
                <div>
                    <Map location={occurrence.location} className='h-96 w-96'/>
                </div>
            </div>
    )
}