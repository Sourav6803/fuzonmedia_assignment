import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDto } from 'src/DTO/blog.dto';
import { BlogEntity } from 'src/Entity/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntity) private repo:Repository<BlogEntity>){}

    async createBlog(blogDto: BlogDto){
        const {title, category} = blogDto

        const blog = new BlogEntity()

        blog.title = title;
        blog.category = category

        this.repo.create(blog)
        await this.repo.save(blog)

        return{blog}
    }
}
