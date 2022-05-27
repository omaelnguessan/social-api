import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { CommentMutationsResolver } from './resolvers/comment.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ArticleModule, UserModule],
  providers: [CommentService, CommentMutationsResolver],
})
export class CommentModule {}
