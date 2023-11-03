import React from 'react';

type Select = {
    _id: string;
    value: string;
    label: string;
    handleChange:  (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const policeOccurrences = [
    "Roubo à mão armada",
    "Assalto a residência",
    "Assalto a estabelecimento comercial",
    "Furto de veículo",
    "Homicídio",
    "Tráfico de drogas",
    "Violência doméstica",
    "Agressão física",
    "Sequestro",
    "Roubo de identidade",
    "Fraude financeira",
    "Estupro",
    "Tentativa de homicídio",
    "Ameaça",
    "Incêndio criminoso",
    "Roubo de carga",
  ];
  
export function Select ({_id, value, label, handleChange}: Select) {
    return (
        <div className='flex flex-col gap-1 my-3'>
            <label htmlFor={_id}>{label}</label>
            <select id={_id} value={value} onChange={handleChange} className='border border-black rounded h-10 p-2 ml-1'>
                <option value="">Selecione uma opção</option>
                {
                    policeOccurrences.map(occurrence => (
                        <option value={occurrence} key={occurrence}>{occurrence}</option>
                    ))
                }
            </select>
        </div>
    )
}