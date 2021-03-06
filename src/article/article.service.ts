import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticleCommentsPagination,
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleDeleteOutput,
  ArticleUpdateInput,
  ArticleUpdateOutput,
  ArticlesPagination,
  ArticlePaginationArgs,
  ArticleReactsPagination,
} from './dto';

import { Article } from './models/article.model';
import {
  PaginationArgs,
  SortDirection,
} from '../pagination/dto/pagination.dto';
import { JWTPayload } from '../auth/auth.service';
import { User } from '../user/models/user.model';
import { Comment } from '../comment/models/comment.model';
import { React } from '../react/models/react.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(React)
    private readonly reactRepository: Repository<React>,
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

  async articleGetById(id: Article['id']): Promise<Article> {
    const article = await this.articleRepository.findOneOrFail({ id });
    if (!article) throw new NotFoundException('article not found');
    return article;
  }

  async articleCommentsPagination(
    articleId: Article['id'],
    args: PaginationArgs,
  ): Promise<ArticleCommentsPagination> {
    const [nodes, totalCount] = await this.commentRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      where: { article: { id: articleId } },
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });

    return { nodes, totalCount };
  }

  async articleReactsPagination(
    articleId: Article['id'],
    args: PaginationArgs,
  ): Promise<ArticleReactsPagination> {
    const [nodes, totalCount] = await this.reactRepository.findAndCount({
      skip: args.skip,
      take: args.take,
      where: { article: { id: articleId } },
      order: {
        createdAt:
          args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
      },
    });

    return { nodes, totalCount };
  }

  async articleUpdate(
    user: JWTPayload,
    articleId: Article['id'],
    input: ArticleUpdateInput,
  ): Promise<ArticleUpdateOutput> {
    const article = await this.articleRepository.findOneOrFail({
      id: articleId,
      authorId: user.id,
    });

    if (!article) throw new NotFoundException('article not found');

    const { title, description, image } = input;
    article.title = title;
    article.description = description;
    article.image = image;
    await article.save();

    return { article };
  }

  async articleDelete(
    user: JWTPayload,
    articleId: Article['id'],
  ): Promise<ArticleDeleteOutput> {
    const article = await this.articleRepository.findOne({
      id: articleId,
      authorId: user.id,
    });

    if (!article) throw new NotFoundException('article not found');

    await article.remove();
    return { article };
  }
}
