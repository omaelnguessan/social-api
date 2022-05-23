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
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async articlesList(): Promise<Article[]> {
    return await this.articleRepository.find({});
  }

  async articleCreate(input: ArticleCreateInput): Promise<ArticleCreateOutput> {
    const newArticle = this.articleRepository.create(input);
    const article = await this.articleRepository.save(newArticle);
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
