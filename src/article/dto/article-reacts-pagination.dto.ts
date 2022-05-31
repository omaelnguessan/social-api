import { Field, ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../pagination/dto/pagination.dto';
import { React } from '../../react/models/react.model';

@ObjectType()
export class ArticleReactsPagination extends Pagination {
  @Field(() => [React])
  nodes: React[];
}
