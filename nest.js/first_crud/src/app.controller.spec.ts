// Ferramentas de teste do Nest para criar um módulo isolado.
import { Test, TestingModule } from '@nestjs/testing';
// Controller que será testado.
import { AppController } from './app.controller';
// Service real usado pelo controller neste teste.
import { AppService } from './app.service';

// Suite de testes do AppController.
describe('AppController', () => {
  // Variável que guardará a instância do controller criada no módulo de teste.
  let appController: AppController;

  // Antes de cada teste, montamos um módulo só com as dependências necessárias.
  beforeEach(async () => {
    // Neste teste unitário, registramos explicitamente o controller e o service.
    // Isso é mais isolado do que importar AppModule inteiro.
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Recupera do container a instância pronta do controller.
    appController = app.get<AppController>(AppController);
  });

  // Agrupamento lógico dos testes relacionados à rota raiz.
  describe('root', () => {
    // Verifica se o método getHello devolve a string esperada.
    // Aqui não há requisição HTTP; chamamos o método do controller diretamente.
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
