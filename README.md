# Banco de dados 2 projeto 1

Este é um projeto web básico usando TypeScript e React.

# especificacoes
tema : sistema de ocorrencias policiais 

frontend : react

backend : express, sequelize, ts

banco : docker postgis

tabelas :
	ocorrencia
	
	título
	tipo (assalto, furto, dentre outros)
	data e hora
	localização geográfica (utilizando o postgis)

funcionalidades:

	crud da ocorrencia

	visualizar a lista das ocorrencias 

	visualizar as ocorrencias no mapa usando a api do google maps

	inspecionar ocorrencia

caminho da api:

GET /ocorrencias/
GET /ocorrencias/{id}
POST /ocorrencias/
DELETE /ocorrencias/{id}
PUT /ocorrencias/{id}
