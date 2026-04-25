import { IsEmail, IsInt, IsOptional, IsString, Min, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(120)
    // @Matches(/^\S+\s+\S+.*$/)
    name: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number;
    
    @IsEmail()
    email: string;
}
