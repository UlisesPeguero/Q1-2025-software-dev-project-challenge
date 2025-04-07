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
  if (result.length === 0) return null;
  return result[0];
}

export async function getTransaction(id) {
  const result = await sql`
    SELECT
      id,
      category_id,
      to_char(date, 'YYYY-MM-DD') AS date,
      amount::real/100 AS amount, 
      description,
      active
    FROM app.transactions
    WHERE id=${id}`;
  if (result.length === 0) return null;
  return result[0];
}

export async function updateTransaction(transaction) {
  const result = await sql`
    UPDATE app.transactions SET
    ${sql(transaction, 'date', 'categoryId', 'amount', 'description', 'active')}
    WHERE id=${transaction.id}
  `;
  if (result.length === 0) return null;
  console.log(result, result[0]);
  return result;
}
