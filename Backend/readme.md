# Routes

## Get all

```http
GET http://localhost:3000/
```
## Get by id
- Change ":id" with the id
```http
GET http://localhost:3000/:
```

## Insert new
- Object must be on the body 
```http
POST http://localhost:3000/
```
>Body example 
```json
{
    "title": "Título da Ocorrência",
    "description" : "descrição",
    "type": "Tipo da Ocorrência",
    "date": "2023-09-29T05:10:57.496Z",
    "location": {
        "coordinates": [
            14,
            8
        ]
    },
}
```

## Delete
- Change ":id" with the id
```http
DELETE http://localhost:3000/:id
```

## Update
- Object must be on the body 
- Change ":id" with the id
```http
PUT http://localhost:3000/:id
```
