import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from '../article/article.service';
import { Repository } from 'typeorm';
import { React } from './models/react.model';
import { JWTPayload } from '../auth/auth.service';
import {
  ReactCreateInput,
  ReactCreateOutput,
  ReactUpdateInput,
  ReactUpdateOutput,
} from './dto';
import { User } from '../user/models/user.model';

@Injectable()
export class ReactService {
  constructor(
    @InjectRepository(React)
    private readonly reactRepository: Repository<React>,
    private readonly articleService: ArticleService,
  ) {}

  async reactAdd(
    user: JWTPayload,
    reactInput: ReactCreateInput,
  ): Promise<ReactCreateOutput> {
    const article = await this.articleService.articleGetById(
      reactInput.articleId,
    );

    const react = this.reactRepository.create();
    react.action = reactInput.action;
    react.article = article;
    react.author = new User();
    react.author.id = user.id;
    await react.save();

    return { react };
  }

  async reactUpdate(
    user: JWTPayload,
    reactId: React['id'],
    input: ReactUpdateInput,
  ): Promise<ReactUpdateOutput> {
    const react = await this.reactRepository.findOne({
      id: reactId,
      authorId: user.id,
    });
    if (!react) throw new NotFoundException('action not found');

    react.action = input.action;
    react.save();
    return { react };
  }

  async reactDelete(
    user: JWTPayload,
    id: React['id'],
  ): Promise<ReactCreateOutput> {
    const react = await this.reactRepository.findOne({ id, authorId: user.id });

    if (!react) throw new NotFoundException('action not found');

    react.remove();
    return { react };
  }
}
