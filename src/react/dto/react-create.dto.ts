import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { React } from '../models/react.model';

export enum Action {
  like = 'LIKE',
  dislike = 'DISLIKE',
}

registerEnumType(Action, { name: 'Action' });

@InputType()
export class ReactCreateInput {
  @Field(() => String)
  action: Action;

  @Field(() => String)
  articleId: string;
}

@ObjectType()
export class ReactCreateOutput {
  @Field(() => React)
  react: React;
}
