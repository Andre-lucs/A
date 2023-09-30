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
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} onChange={handleChange}/>
        </div>
    )
}