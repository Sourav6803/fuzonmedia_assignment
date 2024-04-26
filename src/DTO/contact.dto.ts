import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class ContactDto{
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must need to be one string.' })
    name: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email is invalid.' })
    email:string


    @IsNotEmpty({ message: 'Phone Number is required.' })
    phone_number: string;

    @IsNotEmpty({ message: 'Postal Code is required.' })
    postalCode: string;
}