export default defineEventHandler(
  async ({ context: { ability } }) => {
    return {
      readPost: ability.can('read', 'Brand'),
      deleteUser: ability.can('delete', 'User'),
    };
  },
);
