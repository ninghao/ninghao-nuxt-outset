import { MongoAbility, AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from '../../app.type';

// 动作
export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';

// 主题
export type Subjects =
  | 'Brand'
  | 'Region'
  | 'Origin'
  | 'Product'
  | 'Category'
  | 'Role'
  | 'User'
  | 'all';

// 应用能力
export type AppAbility = MongoAbility<[Actions, Subjects]>;

/**
 * 定义能力
 */
export const defineAbilityFor = (user?: User) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (isAdministrator(user)) {
    can('manage', 'all');
    cannot('delete', 'User');
  }

  return build();
};
