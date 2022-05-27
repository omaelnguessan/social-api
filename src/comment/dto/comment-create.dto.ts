import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';

@InputType()
export class CommentCreateInput {
  @Field(() => String)
  message: string;

  @Field(() => String)
  articleId: string;
}

@ObjectType()
export class CommentCreateOutput {
  @Field(() => Comment)
  comment: Comment;
}
