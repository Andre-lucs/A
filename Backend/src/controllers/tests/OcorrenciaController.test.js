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

    
    
  test('Deve excluir uma ocorrência', async () => {
    OcorrenciaController.OcorrenciaModel.findByIdAndDelete.mockReturnValue({
      _id: new mongoose.Types.ObjectId(),
      title: "Quatri caras em uma moto",
      type: "Furto de veículo",
      date: new Date("2023-11-13T04:22:00.000+00:00"),
      userId: "65634d1b0d428cff79c11220",
      description: "...",
      location: {
      type: "Point",
      coordinates: [-37.97525516240762, -7.8688234331944065]
      }});

    const id = new mongoose.Types.ObjectId();

    const resDeletedMessage = await OcorrenciaController.deleteById(id);

    expect(resDeletedMessage.deleted).toBe(true);
  });

    test('Atualização de ocorrência', async () => {
      
      const _id = new mongoose.Types.ObjectId();

      const data = {
        title: "Dois caras em uma moto",
        type: "Furto de veículo",
        date: new Date("2023-11-13T04:22:00.000+00:00"),
        userId: "65634d1b0d428cff79c11220",
        description: "...",
        location: {
          type: "Point",
          coordinates: [-37.97525516240762, -7.8688234331944065]
        }
      }

      const mockReturn = {
        ...data, _id
      }
      OcorrenciaController.OcorrenciaModel.findById.mockReturnValue(mockReturn);


      const upOcorrencia = await OcorrenciaController.update(_id, data, true);

      expect(upOcorrencia).toEqual(mockReturn);
    })

    test('Encontrar uma ocorrência por id', async () => {

      const id = new mongoose.Types.ObjectId();
      const foundOcorrencia = {
        _id: id,
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

      OcorrenciaController.OcorrenciaModel.findById.mockReturnValue(foundOcorrencia);
      const ocorrencia = await OcorrenciaController.findById(id);
        
      expect(ocorrencia).toEqual(foundOcorrencia);
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

        const ocorrencias = await OcorrenciaController.findAll();

        expect(ocorrencias).toEqual(mockCreated);
    })
    
  });

  describe( 'Casos com exeções', () => {

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
    })

    test('Não deve atualizar uma ocorrência com um ou mais atríbutos ausentes', async () => {
      const ocorrencia = {
        title: "Ocorrência 2",
        type: "Homicídio",
        date: new Date()
      }

      const resultado = await OcorrenciaController.update('', ocorrencia);

      expect(resultado).toEqual({error: "Informe todos os dados necessários"})
    })
    
    test('Lista vazia de ocorrência', async () => {
        OcorrenciaController.OcorrenciaModel.find.mockReturnValue(undefined);

        const ocorrencias = await OcorrenciaController.findAll();

        expect(ocorrencias.length).toBe(0);
    })

    test('Não existe ocorrência informada para ser deletada', async () => {

      OcorrenciaController.OcorrenciaModel.findOne.mockReturnValue(undefined);

      const deletedOcorrencia = await OcorrenciaController.deleteById();

      expect(deletedOcorrencia).toEqual({error: "Ocorrência não encontrada", resStatus: 404});
    })

    test('Não deve atualizar ocorrência sem algum atributo', async () => {

      const dados = {
        title: "Dois caras em uma moto",
        type: "Furto de veículo",
        date: new Date("2023-11-13T04:22:00.000+00:00"),
        userId: "65634d1b0d428cff79c11220",
        location: {
        type: "Point",
        coordinates: [-37.97525516240762, -7.8688234331944065]
        }
      }

      const upOcorrencia = await OcorrenciaController.update(mongoose.Types.ObjectId, dados);
      
      expect(upOcorrencia).toEqual({error: "Informe todos os dados necessários"});

    })

    test('Falha ao encontrar ocorrência', async () => {
    
      OcorrenciaController.OcorrenciaModel.findById.mockReturnValue(undefined);
      
      const ocorrencia = await OcorrenciaController.findById(new mongoose.Types.ObjectId());

      expect(ocorrencia).toEqual({error: "Ocorrência não encontrada!"})
    })


  } )

})

  

