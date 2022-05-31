import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { React } from '../react/models/react.model';
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
  imports: [TypeOrmModule.forFeature([Article, Comment, React]), UserModule],
  providers: [
    ArticleFieldsResolver,
    ArticleMutationsResolver,
    ArticleQueriesResolver,
    ArticleService,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
