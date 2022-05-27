import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleDeleteOutput,
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleMutationsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.articleCreate(user, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
    @Args('input') input: ArticleUpdateInput,
  ) {
    return this.articleService.articleUpdate(user, articleId, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'articleId', type: () => ID }) articleId: Article['id'],
  ) {
    return this.articleService.articleDelete(user, articleId);
  }
}
