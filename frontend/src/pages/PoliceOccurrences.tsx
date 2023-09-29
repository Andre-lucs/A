import {Link} from 'react-router-dom'

export function PoliceOccurrences () {
    return (
        <div>
            <div>
                <input type="text" placeholder="Buscar ocorrência"/>
                <button>Buscar</button>
            </div>
            <div>
                <div>
                    <span>Assalto no Banco</span>
                    <span>Tipo: Assalto</span>
                </div>
                <div>
                    <span>27/09/2023</span>
                    <Link to='ocorrencia/1'><button>Ver mais</button></Link>
                </div>
            </div>
            <Link to='criar-ocorrencia'><button>Adicionar ocorrência</button></Link>
        </div>
    )
}