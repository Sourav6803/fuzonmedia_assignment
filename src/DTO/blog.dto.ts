import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class BlogDto{
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must need to be one string.' })
    title: string;



    @IsNotEmpty({ message: 'Category is required.' })
    category: string;
   
}