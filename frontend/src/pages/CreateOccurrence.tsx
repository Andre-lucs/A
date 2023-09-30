import {Input} from '../../components/Input'
import {Select} from '../../components/Select'
import {useState} from 'react'

export function CreateOccurrence () {

    const [title, setTitle] = useState('')
    const [dateTime, setDateTime] = useState('');
    const [type, setType] = useState('');

    return (
        <div>
            <h1>Adicionar ocorrência</h1>
            <form>
                <Input id='title' label='Título:' type='text' value={title} handleChange={(ev) => setTitle(ev.target.value)} />
                <Input id='date-time' label='Data e hora:' type='datetime-local' value={dateTime} handleChange={(ev) => setDateTime(ev.target.value)} />
                <Select id='type' label='Tipo:' value={type} handleChange={(ev) => setType(ev.currentTarget.value)}/>
                <button>Enviar</button>
            </form>
        </div>
    )
}