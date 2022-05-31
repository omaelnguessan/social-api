import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../article/article.module';
import { UserModule } from '../user/user.module';
import { React } from './models/react.model';
import { ReactService } from './react.service';
import { ReactMutationResolver } from './resolvers/react.mutations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([React]), ArticleModule, UserModule],
  providers: [ReactService, ReactMutationResolver],
})
export class ReactModule {}
