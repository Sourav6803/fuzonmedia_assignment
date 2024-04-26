import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from 'src/DTO/blog.dto';

@Controller('blog')
export class BlogController {
    constructor (private blogService : BlogService){}

    @Post('createBlog')
    registration(@Body(ValidationPipe) blogDto: BlogDto){
        return this.blogService.createBlog(blogDto)
    }
}
