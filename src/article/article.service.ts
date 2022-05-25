import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
} from './dto/article-create.dto';
import { ArticleDeleteOutput } from './dto/article-delete.dto';
import {
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from './dto/article-update.dto';
import {
  ArticlePaginationArgs,
  ArticlesPagination,
} from './dto/articles-pagination.dto';
import { Article } from './models/article.model';
import { SortDirection } from '../pagination/dto/pagination.dto';
import { JWTPayload } from '../auth/auth.service';
import { User } from 'src/user/models/user.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async articlesList(): Promise<Article[]> {
    return await this.articleRepository.find({});
  }

  async articlesPagination(
    args: ArticlePaginationArgs,
  ): Promise<ArticlesPagination> {
    const articleQueryBuilder =
      this.articleRepository.createQueryBuilder('article');
    articleQueryBuilder.take(args.take);
    articleQueryBuilder.skip(args.skip);
    if (args.sortBy) {
      if (args.sortBy.createdAt) {
        articleQueryBuilder.addOrderBy(
          'article.createdAt',
          args.sortBy.createdAt == SortDirection.DESC ? 'DESC' : 'ASC',
        );
      }
      if (args.sortBy.title) {
        articleQueryBuilder.addOrderBy(
          'article.title',
          args.sortBy.title == SortDirection.DESC ? 'DESC' : 'ASC',
        );
      }
    }

    const [nodes, totalCount] = await articleQueryBuilder.getManyAndCount();

    return { nodes, totalCount };
  }

  async articleCreate(
    user: JWTPayload,
    input: ArticleCreateInput,
  ): Promise<ArticleCreateOutput> {
    const article = this.articleRepository.create(input);
    article.author = new User();
    article.author.id = user.id;
    await article.save();
    return { article };
  }

  async articleUpdate(
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneOrFail({
      id: articleId,
    });

    const { title, description, image } = input;
    article.title = title;
    article.description = description;
    article.image = image;
    await article.save();

    return { article };
  }

  async articleDelete(articleId: Article['id']): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOne({ id: articleId });
    await article.remove();
    return { article };
  }
}
