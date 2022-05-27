import {
  ArgsType,
  Field,
  InputType,
  Int,
  InterfaceType,
  registerEnumType,
} from '@nestjs/graphql';
import { Node } from '../models/node.model';

export enum SortDirection {
  ASC,
  DESC,
}

registerEnumType(SortDirection, { name: 'SortDirection' });

@InputType()
export class PaginationShortBy {
  @Field(() => SortDirection, { nullable: true })
  createdAt?: SortDirection;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;

  @Field(() => PaginationShortBy, { nullable: true })
  sortBy?: PaginationShortBy;
}

@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Node])
  abstract nodes: N[];
}
