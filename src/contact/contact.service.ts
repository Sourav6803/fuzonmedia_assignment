import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { ContactDto } from 'src/DTO/contact.dto';
import { BlogEntity } from 'src/Entity/blog.entity';
import { ContactEntity } from 'src/Entity/contact.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Alias } from 'typeorm/query-builder/Alias';

@Injectable()
export class ContactService {

    constructor(@InjectRepository(ContactEntity) private repo:Repository<ContactEntity>){
        
    }

    async createContact(contactDto: ContactDto, user:UserEntity){
        const {name, email, phone_number, postalCode} = contactDto;

        console.log(user)
        
        const Contact = new ContactEntity()
        Contact.name = name;
        Contact.email = email;
        Contact.phone_number = phone_number;
        Contact.postalCode = postalCode;
        Contact.userId = user.id
       
        //const contact = await this.repo.create({ name: name, email: email, phone_number: phone_number, postalCode: postalCode})
         
         this.repo.create(Contact)

        await this.repo.save(Contact)

         return {message: "Contact created", contact:Contact}
    }

    async getAllContact(user:UserEntity, page:number=1, limit:number=3){

        const offset = (page - 1) * limit;

        const query = await this.repo.createQueryBuilder('contact') 
        
        query.where(`contact.userId = :userId`, {userId: user.id})

        try{
            const data = await query.offset(offset).limit(limit).getMany()
            console.log(data.length)
            return data
        }
        catch(err){
            throw new NotFoundException("No Contact found")
        }
    }

    // async getAllContact(userId:number){

    //     // const skip = (page - 1) * limit;

    //     // const [contacts, total] = await this.repo.findAndCount({
    //     //     where: { userId },
    //     //     skip,
    //     //     take: limit,
    //     //   });
    //     //   return [contacts, total];
    //     return await this.repo.find({where: {userId}})

    // }

    async getContactByName(name:string){
        const contact = await this.repo.findOne({where: {name}})

        if(!contact){
            throw new NotFoundException(`Product with name ${name} not found`)
        }
        return contact
    }


}
