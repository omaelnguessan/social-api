import { Resolver, Query, Args } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import { ArticlesPagination, ArticlePaginationArgs } from '../dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlesPagination)
  async articlesPagination(
    @Args() args: ArticlePaginationArgs,
  ): Promise<ArticlesPagination> {
    return this.articleService.articlesPagination(args);
  }
}
