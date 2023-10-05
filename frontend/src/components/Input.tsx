import React from 'react';


type Input = {
    id: string;
    type: string;
    value: string;
    label: string;
    handleChange:  (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input ({id, type, value, label, handleChange}: Input) {
    return (
        <div className='flex flex-col gap-1 mt-3'>
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} onChange={handleChange} className='border border-black rounded h-8 p-2 ml-1 w-96' />
        </div>
    )
}