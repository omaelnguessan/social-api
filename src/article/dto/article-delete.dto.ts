import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from '../models/article.model';

@ObjectType()
export class ArticleDeleteOutput {
  @Field(() => Article)
  article: Article;
}
