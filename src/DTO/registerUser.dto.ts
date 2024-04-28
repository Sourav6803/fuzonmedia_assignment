import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class RegisterUserDto{
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must need to be one string.' })
    username: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email is invalid.' })
    email:string

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    password: string;


    @IsNotEmpty({ message: 'Phone Number is required.' })
    phone_number: string;
   
}