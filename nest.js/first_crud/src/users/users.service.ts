import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type User = {
  id: number;
  name: string;
  age?: number;
  email: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user = {
      id: Date.now(),
      ...createUserDto,
    };
    /*
      O que ta aqui em cima é a mesma coisa q escrever:
    const user = {
    id: Date.now(),
    name: createUserDto.name,
    age: createUserDto.age,
    email: createUserDto.email,
  };
    */

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      return undefined;
    }

    Object.assign(user, updateUserDto);

    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
