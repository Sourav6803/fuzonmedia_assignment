import { IsEmail, IsNotEmpty } from "class-validator";

export class ActivationDto{
    @IsNotEmpty({ message: 'Activation Token is required.' })

    activation_token: string;

    @IsNotEmpty({ message: 'Activation Code is required.' })
    activation_code:string
}