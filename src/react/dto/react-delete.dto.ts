import { ObjectType } from '@nestjs/graphql';
import { ReactCreateOutput } from './react-create.dto';

@ObjectType()
export class ReactDeleteOutput extends ReactCreateOutput {}
