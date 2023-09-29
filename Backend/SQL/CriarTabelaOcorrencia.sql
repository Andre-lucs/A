CREATE TABLE ocorrencias (
	id serial PRIMARY KEY,
	titulo VARCHAR NOT NULL,
	tipo VARCHAR NOT NULL,
	data_e_hora TIMESTAMP NOT NULL,
	localizacao geography(POINT) NOT NULL
);
