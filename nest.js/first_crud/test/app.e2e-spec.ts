// Ferramentas do Nest para montar um módulo de teste parecido com a aplicação real.
import { Test, TestingModule } from '@nestjs/testing';
// Tipo da aplicação Nest usada no teste e2e.
import { INestApplication } from '@nestjs/common';
// Biblioteca para fazer requisições HTTP contra o servidor em memória.
import request from 'supertest';
// Tipo auxiliar usado para tipar melhor o app do supertest.
import { App } from 'supertest/types';
// Módulo raiz da aplicação; ao importar aqui, o teste sobe o app quase completo.
import { AppModule } from './../src/app.module';

// "describe" agrupa os testes deste arquivo.
// "(e2e)" significa "end-to-end": teste de ponta a ponta, passando pela camada HTTP.
describe('AppController (e2e)', () => {
  // Esta variável guardará a instância da aplicação Nest criada para cada teste.
  let app: INestApplication<App>;

  // beforeEach roda antes de cada teste ("it").
  // Aqui montamos um módulo de teste e inicializamos a aplicação.
  beforeEach(async () => {
    // createTestingModule cria um container de DI de teste.
    // Como importamos AppModule, o Nest carrega os módulos/controllers/providers dele.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // A partir do módulo compilado, criamos uma aplicação Nest completa.
    app = moduleFixture.createNestApplication();
    // init prepara rotas, pipes, providers e o ciclo de vida do app sem precisar abrir porta de rede.
    await app.init();
  });

  // Este teste verifica a rota HTTP GET /.
  it('/ (GET)', () => {
    // app.getHttpServer() expõe o servidor HTTP interno para o supertest.
    // .get('/') faz a requisição.
    // .expect(200) valida o status HTTP.
    // .expect('Hello World!') valida o corpo da resposta.
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // afterEach roda depois de cada teste.
  // Fechar o app evita vazamento de recursos entre os testes.
  afterEach(async () => {
    await app.close();
  });
});
