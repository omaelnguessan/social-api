import { InputType, ObjectType } from '@nestjs/graphql';
import { ReactCreateInput, ReactCreateOutput } from './react-create.dto';

@InputType()
export class ReactUpdateInput extends ReactCreateInput {}

@ObjectType()
export class ReactUpdateOutput extends ReactCreateOutput {}
