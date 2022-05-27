import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '../models/comment.model';

@ObjectType()
export class CommentDeleteOutput {
  @Field(() => Comment)
  comment: Comment;
}
