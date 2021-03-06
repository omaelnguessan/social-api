import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../pagination/dto/pagination.dto';
import { User } from '../../user/models/user.model';
import { UserService } from '../../user/user.service';
import { Article } from '../models/article.model';
import { ArticleService } from '../article.service';
import { ArticleCommentsPagination, ArticleReactsPagination } from '../dto';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
  ) {}
  @ResolveField(() => User, { nullable: true })
  async author(@Parent() article: Article) {
    if (!article.authorId) return null;

    try {
      return await this.userService.userGetById(article.authorId);
    } catch (error) {
      return null;
    }
  }

  @ResolveField(() => ArticleCommentsPagination, { nullable: true })
  async comments(@Parent() article: Article, @Args() args: PaginationArgs) {
    return await this.articleService.articleCommentsPagination(
      article.id,
      args,
    );
  }

  @ResolveField(() => ArticleReactsPagination, { nullable: true })
  async reacts(@Parent() article: Article, @Args() args: PaginationArgs) {
    return await this.articleService.articleReactsPagination(article.id, args);
  }
}
