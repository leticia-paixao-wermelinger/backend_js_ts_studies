// Ferramentas do Nest para criar módulos de teste.
import { Test, TestingModule } from '@nestjs/testing';
// Service que será testado.
import { UsersService } from './users.service';

// Suite de testes do UsersService.
describe('UsersService', () => {
  // Guardará a instância do service resolvida pelo container.
  let service: UsersService;

  // Recria o ambiente de teste antes de cada caso.
  beforeEach(async () => {
    // Como estamos testando só o service, basta registrá-lo em providers.
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    // Recupera a instância pronta do service.
    service = module.get<UsersService>(UsersService);
  });

  // Teste mínimo para garantir que o provider existe e foi instanciado.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
