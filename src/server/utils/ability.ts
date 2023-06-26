import {
  AbilityBuilder,
  createMongoAbility,
} from '@casl/ability';
import { User } from '../../app.type';

export const defineAbilityFor = (user: User) => {
  const { can, cannot, build } = new AbilityBuilder(
    createMongoAbility,
  );

  if (hasRole(user, 'administrator')) {
    can('manage', 'all');
    cannot('delete', 'User');
  }

  return build();
};
