import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from 'src/DTO/contact.dto';
// import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/Entity/user.entity';

import { ContactEntity } from 'src/Entity/contact.entity';
import { request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Controller('contact')
@UseGuards(AuthGuard())
export class ContactController {
  constructor(private contsctService: ContactService) {}

  @Post('create-contact')
  contact(
    @Body(ValidationPipe) contactDto: ContactDto,
    @User() user: UserEntity,
  ) {
    return this.contsctService.createContact(contactDto, user);
  }

  @Get('get-contact')
  getContact( @User() user:UserEntity, @Query('page') page:number, @Query('limit') limit:number=5, ){
      return this.contsctService.getAllContact(user, page, limit)
  }

  

  @Get('/search')
  async getContactByName(@User() user:UserEntity, @Query('query') query: string, ) {
    const contact = await this.contsctService.getContactByName(user, query);
    
    if (!contact) {
      throw new NotFoundException(`Contact with name ${query} not found`);
    }

    return contact;
  }
}
