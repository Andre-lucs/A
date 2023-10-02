import React from 'react';

type Select = {
    id: string;
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
  
export function Select ({id, value, label, handleChange}: Select) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={handleChange} >
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