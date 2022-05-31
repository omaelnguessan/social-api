import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { JWTPayload } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ReactCreateInput,
  ReactCreateOutput,
  ReactDeleteOutput,
  ReactUpdateInput,
  ReactUpdateOutput,
} from '../dto';
import { React } from '../models/react.model';
import { ReactService } from '../react.service';

@UseGuards(JwtAuthGuard)
@Resolver(React)
export class ReactMutationResolver {
  constructor(private readonly reactService: ReactService) {}

  @Mutation(() => ReactCreateOutput)
  async reactAdd(
    @CurrentUser() user: JWTPayload,
    @Args('input') input: ReactCreateInput,
  ) {
    return this.reactService.reactAdd(user, input);
  }

  @Mutation(() => ReactUpdateOutput)
  async reactUpdate(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'id', type: () => ID }) reactId: React['id'],
    @Args('input') input: ReactUpdateInput,
  ) {
    return this.reactService.reactUpdate(user, reactId, input);
  }

  @Mutation(() => ReactDeleteOutput)
  async reateDelete(
    @CurrentUser() user: JWTPayload,
    @Args({ name: 'id', type: () => ID }) reactId: React['id'],
  ) {
    return this.reactService.reactDelete(user, reactId);
  }
}
