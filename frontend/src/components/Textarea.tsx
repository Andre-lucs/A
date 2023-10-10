type TextareaProps = {
    name: string;
    id: string;
    label: string
    value: string;
    handleChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void
}


export function Textarea ({name, id, label, value, handleChange}: TextareaProps) {
    return (
        <div className="flex flex-col gap-1 mb-5">
            <label htmlFor={id}>{label}</label>
            <textarea name={name} id={id} value={value} onChange={handleChange} className='border border-black rounded h-24 p-2 ml-1 w-96'></textarea>
        </div>
    )
}