import { Link } from "react-router-dom";
import { Button } from "./Button";


type OccurrenceHeaderProps = {
    title: string;
    handleDelete: () => void
    occurrenceId: string
}

export function OccurrenceHeader ({title, handleDelete, occurrenceId}: OccurrenceHeaderProps) {
    return (
        <header>
            <h1 className='font-bold text-2xl' id="cy-occurrence-title">{title}</h1>
            <div className='flex gap-3 my-3'>
                <Button text='Excluir' buttonType='delete' handleClick={handleDelete}/>
                <Link to={`/atualizar-ocorrencia/${occurrenceId}`}>
                    <Button text='Atualizar' buttonType='send' id="cy-update-btn" />
                </Link>
            </div>
        </header>
    )
}