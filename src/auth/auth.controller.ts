import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { ActivationDto } from 'src/DTO/activation.dto';


@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService){

    }

    @Post('register')
    registration(@Body(ValidationPipe) regDto: RegisterUserDto, responce: Response){
        return this.authService.registerUser(regDto, responce)
        
    }

    @Post('login')
    signin(@Body(ValidationPipe) loginDto: UserLoginDto){
        return this.authService.Login(loginDto)
    }

    @Post('activateUser')
    ac(@Body(ValidationPipe) activateDto: ActivationDto, responce: Response){
        return this.authService.activateUser(activateDto, responce)
    }
}
