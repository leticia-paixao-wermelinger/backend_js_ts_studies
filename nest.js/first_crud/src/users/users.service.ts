import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // private users: User[] = [];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto) {

    try {

      const existingUser = await this.validateEmailExistence(createUserDto.email);
  
      const user = this.usersRepository.create(createUserDto);
      
      return this.usersRepository.save(user);
    }

    catch (error) {

      if (error.code === '23505') { // Unique violation error code for PostgreSQL
        throw new ConflictException(`User with email ${createUserDto.email} already exists`); // returns 409
      }

      throw error; // rethrow other errors
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.findUserOrFail(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException(`At least one field must be provided for update`); // returns 409
    }

    await this.findOne(id);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.validateEmailExistence(updateUserDto.email);
    }

    const result = await this.usersRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`); // returns 404
    }

    return this.findOne(id);
  }

  async remove(id: number) {

    await this.findOne(id);

    const userToRemove = await this.usersRepository.findOne(id);

    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userToRemove;
  }

  private async validateEmailExistence(email: string) {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`); // returns 409
    }

    return existingUser;
  }

  private async findUserOrFail(id: number) {
    const existingUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`); // returns 404
    }

    return existingUser;
  }
}