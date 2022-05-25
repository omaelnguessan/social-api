import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { Article } from '../models/article.model';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(private readonly userService: UserService) {}
  @ResolveField(() => User, { nullable: true })
  async author(@Parent() article: Article) {
    if (!article.authorId) return null;

    try {
      return await this.userService.userGetById(article.authorId);
    } catch (error) {
      return null;
    }
  }
}
