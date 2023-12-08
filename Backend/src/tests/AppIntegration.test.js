import app from "../app";
import request from "supertest";
import * as testDB from '../database/TestDatabase';

let token = null;

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

describe("Test the usuario path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/usuario/");
    expect(response.type).toBe('application/json');
    expect(response.statusCode).toBe(200);
  });
});

describe("Test the ocorrencia path", () => {
  test("It should response the GET method", async () => {

    request(app).get("/ocorrencia/")
    .set('Cookie', [token])
    .end((err, res) => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });

  });
});