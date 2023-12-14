import app from "../app";
import request from "supertest";
import * as testDB from '../database/TestDatabase';
import e from "express";

let token = null;

describe("Testes de integração", () => {

beforeAll( async () => {
  testDB.connectDB();
  token = await new Promise(resolve => {
    request(app).post('/usuario/register').send({
      email: "example@email.com",
      name: "Example",
      password: "123456"
    }).end((err, res) => {
      resolve(res.headers['set-cookie']);
    });
  });
});

afterEach(async () => {
  await testDB.dropCollections();
});

afterAll(async () => {
  await testDB.dropDB();
});

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe('Server is running');
  });
});

describe("Testes dos caminhos de usuario", () => {
  test("Deve retornar uma array sem usuarios", async () => {
    const response = await request(app).get("/usuario/");
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("Deve retornar os usuarios criados(1)", async () => {
    await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "123456"
    }).then((res) => {expect(res.statusCode).toBe(201)});

    let user = await request(app).get("/usuario/");

    user = user.body[0];
    expect(user.email).toBe("email@example.com");
    expect(user._id).toBeDefined();

    const response = await request(app).get("/usuario/");
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].email).toBe("email@example.com");
  });

  test("Deve retornar os usuarios criados(2)", async () => {
    await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "123456"
    }).then((res) => {expect(res.statusCode).toBe(201)});
    await request(app).post("/usuario/register").send({
      email: "email@example.com2",
      name: "Example2",
      password: "123456"
    }).then((res) => {expect(res.statusCode).toBe(201)});

    const response = await request(app).get("/usuario/");
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Usuario já cadastrado error", async () => {
    await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "123456"
    }).then((res) => {expect(res.statusCode).toBe(201)});

    const response = await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example2",
      password: "123456"
    });

    expect(response.statusCode).toBe(400);

  });

  test("Rota do login", async () => {
    await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "123456"
    }).then((res) => {expect(res.statusCode).toBe(201)});

    const response = await request(app).post("/usuario/login").send({
      email: "email@example.com",
      password: "123456"
    });

    expect(response.headers['set-cookie'][0].includes("token=")).toBeTruthy();
  });

  test("Rota do login com erro", async () => {
    await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "fghjkl"
    }).then((res) => {expect(res.statusCode).toBe(201)});

    const res1 = await request(app).post("/usuario/login").send({
      email: "emailErrado",
      password: "senha"
    });

    expect(res1.statusCode).toBe(404);

    const res2 = await request(app).post("/usuario/login").send({
      email: "email@example.com",
      password: "senhaErrada"
    });

    expect(res2.statusCode).toBe(400);

  });

  test("Rota do delete", async () => {
    const res1 = await request(app).post("/usuario/register").send({
      email: "email@example.com",
      name: "Example",
      password: "123456"
    });

    const res2 = await request(app).delete("/usuario/"+res1.body._id);

    expect(res2.statusCode).toBe(200);
  });

  test("Rota de edição", async () => {
    const res1 = await request(app).post("/usuario/register").send({
      email: "email",
      name: "Example",
      password:"123"
    });

    const res2 = await request(app).put("/usuario/"+res1.body._id).send({
      email: "email2",
      name: "Example2",
      password:"1234"
    });

    expect(res2.statusCode).toBe(200);
    const res3 = await request(app).get("/usuario/"+res1.body._id);
    expect(res3.body.email).toBe("email2");

  });
});

describe("Testes dos caminhos de ocorrencia", () => {
  test("Deve retornar uma array sem ocorrencias", async () => {

    request(app).get("/ocorrencia/")
    .set('Cookie', [token])
    .end((err, res) => {
      expect(res.body).toEqual([]);
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });

  });

  test("Deve retornar as ocorrencias criadas(1)", async () => {
    await request(app).post("/ocorrencia/").send({
      title: "title",
      type: "type",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description"
    }).set('Cookie', [token]);

    const response = await request(app).get("/ocorrencia/").set('Cookie', [token]);
    expect(response.body[0]._id).toBeDefined();
    expect(response.body[0].userId).toBeTruthy();
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("title");

  });

  test("Deve retornar as ocorrencias criadas(2)", async () => {
    await request(app).post("/ocorrencia/").send({
      title: "title",
      type: "type",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description"
    }).set('Cookie', [token]);
    await request(app).post("/ocorrencia/").send({
      title: "title2",
      type: "type2",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description2"
    }).set('Cookie', [token]);

    const response = await request(app).get("/ocorrencia/").set('Cookie', [token]);
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    for(let i of response.body){
      expect(i.title).toContain("title");
      expect(i._id).toBeDefined();
    }
  });

  test("Deletar ocorrencias", async () => {
    const res1 = await request(app).post("/ocorrencia/").send({
      title: "title",
      type: "type",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description"
    }).set('Cookie', [token]);

    expect(res1.body._id).toBeDefined();

    const res2 = await request(app).delete("/ocorrencia/"+res1.body._id).set('Cookie', [token]);

    expect(res2.statusCode).toBe(200);

    const res3 = await request(app).get("/ocorrencia/").set('Cookie', [token]);

    expect(res3.body.length).toBe(0);
  });

  test("Editar ocorrencias", async () => {
    const res1 = await request(app).post("/ocorrencia/").send({
      title: "title",
      type: "type",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description"
    }).set('Cookie', [token]);

    expect(res1.body._id).toBeDefined();

    const res2 = await request(app).put("/ocorrencia/"+res1.body._id).send({
      title: "title2",
      type: "type2",
      date: Date.now().toString(),
      location: {
        lat: 0,
        lng: 0
      },
      description: "description2"
    }).set('Cookie', [token]);

    expect(res2.statusCode).toBe(200);

    const res3 = await request(app).get("/ocorrencia/"+res1.body._id).set('Cookie', [token]);

    expect(res3.body.title).toBe("title2");
  });

});
});