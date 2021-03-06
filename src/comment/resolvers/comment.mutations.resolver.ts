import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CommentService } from '../comment.service';
import { CommentDeleteOutput } from '../dto';
import {
  CommentCreateInput,
  CommentCreateOutput,
} from '../dto/comment-create.dto';
import { Comment } from '../models/comment.model';

@Resolver(Comment)
export class CommentMutationsResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentCreateOutput)
  async commentCreate(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.commentService.commentCreate(user, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentDeleteOutput)
  async commentDelete(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'commentId', type: () => ID }) commentId: Comment['id'],
  ) {
    return this.commentService.commentDelete(user, commentId);
  }
}
