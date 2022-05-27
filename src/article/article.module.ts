import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/models/comment.model';
import { UserModule } from '../user/user.module';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import {
  ArticleFieldsResolver,
  ArticleMutationsResolver,
  ArticleQueriesResolver,
} from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Comment]), UserModule],
  providers: [
    ArticleFieldsResolver,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleService,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
