import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../models/article.model';
import {
  Pagination,
  PaginationArgs,
  PaginationShortBy,
  SortDirection,
} from '../../pagination/dto/pagination.dto';

@InputType()
export class ArticlesPaginationSortBy extends PaginationShortBy {
  @Field(() => SortDirection, { nullable: true })
  title?: SortDirection;
}

@ArgsType()
export class ArticlePaginationArgs extends PaginationArgs {
  @Field(() => ArticlesPaginationSortBy, { nullable: true })
  sortBy?: ArticlesPaginationSortBy;
}

@ObjectType()
export class ArticlesPagination extends Pagination {
  @Field(() => [Article])
  nodes: Article[];
}
