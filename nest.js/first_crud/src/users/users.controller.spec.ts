// Utilitários do Nest para criar um módulo de teste.
import { Test, TestingModule } from '@nestjs/testing';
// Controller da feature users que queremos testar.
import { UsersController } from './users.controller';
// Service injetado no controller.
import { UsersService } from './users.service';

// Suite de testes do UsersController.
describe('UsersController', () => {
  // Guardará a instância do controller obtida do container de DI.
  let controller: UsersController;

  // beforeEach prepara um ambiente limpo antes de cada teste.
  beforeEach(async () => {
    // Criamos um módulo mínimo contendo o controller e seu provider.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    // Pega a instância criada pelo Nest.
    controller = module.get<UsersController>(UsersController);
  });

  // Este é um teste estrutural bem básico.
  // Ele só confirma que o controller foi criado corretamente.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
