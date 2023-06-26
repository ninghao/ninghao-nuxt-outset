export default defineEventHandler(
  async ({ context: { ability } }) => {
    return {
      readPost: ability.can('read', 'Post'),
      deleteUser: ability.can('delete', 'User'),
    };
  },
);
