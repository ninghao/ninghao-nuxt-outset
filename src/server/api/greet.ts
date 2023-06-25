export default defineEventHandler(async (event) => {
  // const app = useNitroApp();
  // console.log(app);
  // const config = useRuntimeConfig();

  const result = await surreal.query(`info for db;`);
  return result;
});
