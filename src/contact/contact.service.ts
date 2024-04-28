import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { ContactDto } from 'src/DTO/contact.dto';
import { ContactEntity } from 'src/Entity/contact.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class ContactService {

    constructor(@InjectRepository(ContactEntity) private repo:Repository<ContactEntity>){
        
    }

    async createContact(contactDto: ContactDto, user:UserEntity){
        const {name, email, phone_number, postalCode} = contactDto;

        const numericRegex = /^[0-9]+$/;

        if (!numericRegex.test(phone_number)) {
            throw new BadRequestException("Phone number contains only numeric characters.");
          }

        if(phone_number.length != 10){
            throw new BadRequestException(`Mobile shold be 10 digit`)
        }


        const existContctByName = await this.repo.findOne({where: {name: name}})
        
        
        if(existContctByName){
            throw new BadRequestException(`Already exist this contact by ${name}`)
        }

        const existContctByNumber = await this.repo.findOne({where: {phone_number: phone_number}})
        
        if(existContctByNumber){
            throw new BadRequestException(`Already exist this contact by ${phone_number}`)
        }

        const existContctByEmail = await this.repo.findOne({where: {email: email}})

        if(existContctByEmail){
            throw new BadRequestException(`Already exist this contact by ${email}`)
        }
        
        
        const Contact = new ContactEntity()
        Contact.name = name;
        Contact.email = email;
        Contact.phone_number = phone_number;
        Contact.postalCode = postalCode;
        Contact.userId = user.id
       
        //const contact = await this.repo.create({  name: name, email: email, phone_number: phone_number, postalCode: postalCode})
         
         this.repo.create(Contact)

        await this.repo.save(Contact)

         return {message: "Contact created", contact:Contact}
    }

    async getAllContact(user:UserEntity, page:number, limit:number=5){
        
        const query = await this.repo.createQueryBuilder('contact')
        query.where(`contact.userId = :userId`, {userId: user.id})


        try{
            if (page !== undefined && limit !== undefined){
                const offset = (page - 1) * limit;
                // const allData = await query.getMany();
                const data = await query.offset(offset).limit(limit).getMany()
            
                if(data.length >= 1){
                    return {page:page, total: data.length, data:data }
                }
                else{
                    return {
                        message: 'No contact found'
                    }
                }
            }else{
                const data = await query.getMany();
                if(data.length >= 1){
                    return {page:page, total: data.length, data:data }
                }
                else{
                    return {
                        message: 'No contact found'
                    }
                }
            }
        }
        catch(err){
            throw new NotFoundException("No Contact found")
        }       
    }

    async getContactByName(user:UserEntity ,nameOrEmail:string, ){
        //const contact = await this.repo.findOne({where: {name}})
        const query = this.repo.createQueryBuilder('contact');
        
        query.where(`(contact.name LIKE :searchTerm OR contact.phone_number LIKE :searchTerm) AND contact.userId = :userId `, 
                    { 
                        searchTerm: `%${nameOrEmail}%`, userId: user.id 
                    })

        try {
            // Execute the query to retrieve users matching the name or email
            const contacts = await query.getMany();
            
            if (contacts.length){
                return {contact: contacts}
            }else{
                return {message: `No contact found with this ${nameOrEmail}`}
            }
            
            
        } catch (err) {
            // Handle any errors during query execution
            throw new Error(`Error fetching Contacts by name or email: ${err.message}`);
        }
    }

    


}
