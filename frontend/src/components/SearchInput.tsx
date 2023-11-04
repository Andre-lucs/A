
type SearchInputProps = {
    value: string,
    placeholder: string,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

export function SearchInput ({value, placeholder, handleChange}: SearchInputProps) {
    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            className='h-10 p-3 w-96 rounded border border-black'
            onChange={handleChange}/>
    )
}