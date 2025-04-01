import sql from '../db';

export async function getTransactionCategories(active = true) {
  const result =
    await sql`SELECT id, name AS description FROM app.categories WHERE active=${active}`;

  return result;
}

export async function addTransaction(transaction) {
  const result = await sql`
    INSERT INTO app.transactions(category_id, amount, description)
    VALUES(${transaction.categoryId}, ${transaction.amount},${transaction.description})
    returning id
    `;
  return result;
}

export async function getTransaction(id) {
  const result = await sql`
  SELECT * FROM app.transactions WHERE id=${id}
  `;
  if (result.length === 0) return null;
  return result[0];
}
