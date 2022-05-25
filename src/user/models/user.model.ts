import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from '../../pagination/models/node.model';
import { Column, Entity } from 'typeorm';

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
}
