import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// import { IsEmail, IsInt, IsOptional, IsString, Min, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	// @IsOptional()
	// @IsString()
	// @IsNotEmpty()
	// @MinLength(3)
	// @MaxLength(120)
	// // @Matches(/^\S+\s+\S+.*$/)
	// name: string;

	// @IsOptional()
	// @IsInt()
	// @Min(0)
	// age?: number;
	
	// @IsOptional()
	// @IsEmail()
	// email: string;
}
