export function CreateOccurrence () {
    return (
        <div>
            <h1>Adicionar ocorrência</h1>
            <form>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="text" id="title" />
                </div>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input type="datetime-local" id="title" />
                </div>
                <div>
                    <label htmlFor="type">Tipo:</label>
                    <select id="type">
                        <option value="">Selecione uma opção</option>
                    </select>
                </div>
                <button>Enviar</button>
            </form>
        </div>
    )
}