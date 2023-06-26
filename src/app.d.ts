import { User } from './app.type';
import {
  MongoAbility,
  AbilityTuple,
  MongoQuery,
} from '@casl/ability';
import { AppAbility } from './server/utils/ability';

// 扩展服务接口 Context 类型
declare module 'h3' {
  interface H3EventContext {
    user: User | undefined;
    ability: AppAbility;
  }
}

// 非常重要
export default {};
