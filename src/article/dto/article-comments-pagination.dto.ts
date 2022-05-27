import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../../comment/models/comment.model';
import { Pagination } from '../../pagination/dto/pagination.dto';

@ObjectType()
export class ArticleCommentsPagination extends Pagination {
  @Field(() => [Comment])
  nodes: Comment[];
}
