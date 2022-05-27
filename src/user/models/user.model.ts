import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from '../../pagination/models/node.model';
import { Column, Entity, OneToMany } from 'typeorm';
import { Article } from '../../article/models/article.model';
import { Comment } from '../../comment/models/comment.model';

@Entity()
@ObjectType()
export class User extends Node {
  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string | null;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Article, (target) => target.author)
  articles: Article[];

  @OneToMany(() => Comment, (target) => target.author)
  comments: Comment[];
}
