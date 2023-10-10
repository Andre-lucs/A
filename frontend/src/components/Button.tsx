
type ButtonProps = {
    text: string;
    buttonType: 'delete' | 'send'
    handleClick?: () => void
}

const btnType = {
    delete: 'bg-red-500 hover:bg-red-600 mr-2 focus:outline-none focus:ring focus:ring-red-300',
    send: 'bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300',
}


export function Button ({text, handleClick, buttonType}: ButtonProps) {
    return <button className={`${btnType[buttonType]} py-2 px-4 rounded text-white focus:outline-none`} onClick={handleClick}> {text}</button>
}