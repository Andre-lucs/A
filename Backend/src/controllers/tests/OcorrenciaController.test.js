import OcorrenciaController from '../OcorrenciaController';
import mongoose from 'mongoose';

jest.mock("../../models/Ocorrencia");

describe( "OcorrenciaController testes", ()=>{

  describe( "Casos normais", () => {
    
    test("Deve criar uma ocorrência", async () => {
      const dados = {
        title: "Dois caras em uma moto",
        type: "Furto de veículo",
        date: new Date("2023-11-13T04:22:00.000+00:00"),
        userId: "65634d1b0d428cff79c11220",
        description: "...",
        location: {
          type: "Point",
          coordinates: [-37.97525516240762, -7.8688234331944065]
        }
      };

      const mockcreated = {
        _id: new mongoose.Types.ObjectId(),
        ...dados
      }
      OcorrenciaController.OcorrenciaModel.create.mockReturnValue(mockcreated)
      
      const createdOccurrence = await OcorrenciaController.create(dados);
      
      expect(createdOccurrence).toEqual(mockcreated)
      
    })
    
    
    test('Deve excluir uma ocorrência', () => {
      
    })

    test('Atualização de ocorrência', () => {
        
    })

    test('Encontrar uma ocorrência por id', () => {
        
    })

    test('Deve retornar uma lista de ocorrências', async () => {
        const mockCreated = [
          {
            _id: new mongoose.Types.ObjectId(),
            title: "Dois caras em uma moto",
            type: "Furto de veículo",
            date: new Date("2023-11-13T04:22:00.000+00:00"),
            userId: "65634d1b0d428cff79c11220",
            description: "...",
            location: {
            type: "Point",
            coordinates: [-37.97525516240762, -7.8688234331944065]
            }
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: "Três caras em uma moto",
            type: "Furto de veículo",
            date: new Date("2023-11-13T04:22:00.000+00:00"),
            userId: "65634d1b0d428cff79c11220",
            description: "...",
            location: {
            type: "Point",
            coordinates: [-37.97525516240762, -7.8688234331944065]
            }
          },
          {
            _id: new mongoose.Types.ObjectId(),
            title: "Quatri caras em uma moto",
            type: "Furto de veículo",
            date: new Date("2023-11-13T04:22:00.000+00:00"),
            userId: "65634d1b0d428cff79c11220",
            description: "...",
            location: {
            type: "Point",
            coordinates: [-37.97525516240762, -7.8688234331944065]
            }
          }
        ]  

        OcorrenciaController.OcorrenciaModel.find.mockReturnValue(mockCreated);

        const occurrences = await OcorrenciaController.findAll();

        expect(occurrences).toEqual(occurrences);
    })
    
  });

  describe( 'Casos com exeçoes', () => {

    test('deve retornar um erro se algum dado necessário estiver ausente', async () => {
      const resultado = await OcorrenciaController.create({
          title: 'Título',
          type: 'Tipo',
          date: "2023-11-13T04:22:00.000+00:00",
          location: {
            type: "Point",
            coordinates: [-37.97525516240762, -7.8688234331944065]
          },
      });

      expect(resultado).toEqual({ error: 'Informe todos os dados necessários' });
    }
    )

    test('Não deve atualizar uma ocorrência com um ou mais atríbutos ausentes', async () => {
      const ocorrencia = {
        title: "Ocorrência 2",
        type: "Homicídio",
        date: new Date()
      }

      const resultado = await OcorrenciaController.update('', ocorrencia);

      expect(resultado).toEqual({error: "Informe todos os dados necessários"})
    }
    )
    
    test('Não existe ocorrência informada para ser deletada', () => {
      
    })

    test('Não deve atualizar ocorrência sem algum atributo', () => {
      
    })

    test('Falha ao encontrar ocorrência', () => {
      
    })

    test('Lista vazia de ocorrência', () => {

    })

  } )

})

  

