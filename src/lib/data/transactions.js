import sql from '../db';

export async function getTransactionCategories(active = true) {
  const result =
    await sql`SELECT id, name AS description FROM app.categories WHERE active=${active}`;

  return result;
}
