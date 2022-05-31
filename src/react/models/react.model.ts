import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from '../../pagination/models/node.model';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Article } from '../../article/models/article.model';
import { User } from '../../user/models/user.model';

@Entity()
@ObjectType()
export class React extends Node {
  @Column()
  @Field(() => String)
  action: string;

  @ManyToOne(() => Article, (article) => article.reacts)
  @JoinColumn()
  article: Article;

  @RelationId((self: React) => self.article)
  readonly articleId: Article['id'];

  @ManyToOne(() => User, (user) => user.reacts)
  @JoinColumn()
  author: User;

  @RelationId((self: React) => self.author)
  readonly authorId: User['id'];
}
