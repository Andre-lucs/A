import React from 'react';

type Select = {
    id: string;
    value: string;
    label: string;
    handleChange:  (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select ({id, value, label, handleChange}: Select) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={handleChange} >
                <option value="">Selecione uma opção</option>
            </select>
        </div>
    )
}