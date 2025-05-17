import { getCurrentSession } from '../auth/session';
import sql from '../db';

async function getUserId() {
  const session = await getCurrentSession();
  if (session) return session.userId;
  return null;
}

export async function getTransactionCategories(active = true) {
  const userId = await getUserId();
  if (!userId) return null;
  const result =
    await sql`SELECT id, name AS description FROM app.categories WHERE user_id=${userId} AND active=${active}`;

  return result;
}

export async function addTransaction(transaction) {
  const userId = await getUserId();
  if (!userId) return null;
  const result = await sql`
    INSERT INTO app.transactions(date, category_id, amount, description, user_id)
    VALUES(${transaction.date}, ${transaction.categoryId}, ${transaction.amount},${transaction.description}, ${userId})
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
      COALESCE(description, '') AS description,
      active
    FROM app.transactions
    WHERE id=${id}`;
  if (result.length === 0) return null;
  return result[0];
}

const SELECT_QUERY = `SELECT
      transactions.id,
      categories.name AS category,
      to_char(date, 'MM/DD/YYYY') AS date,
      amount::real/100 AS amount, 
      COALESCE(description, '') AS description,
      transactions.active
    FROM app.transactions AS transactions
    JOIN app.categories AS categories ON transactions.category_id = categories.id`;

export async function getTransactions() {
  const userId = await getUserId();
  if (!userId) return null;
  const result = await sql`
    SELECT
      transactions.id,
      categories.name AS category,
      to_char(date, 'MM/DD/YYYY') AS date,
      amount::real/100 AS amount, 
      COALESCE(description, '') AS description,
      transactions.active
    FROM app.transactions AS transactions
        JOIN app.categories AS categories ON transactions.category_id = categories.id
    WHERE transactions.user_id=${userId}
  `;
  if (result.length === 0) return null;
  return result;
}

export async function getTransactionsPage(page, rowsPerPage, sorting) {
  const userId = await getUserId();
  if (!userId) return null;
  const totalRows =
    await sql`SELECT COUNT(*) AS total FROM app.transactions WHERE user_id = ${userId}`;
  const rows = await sql`
    SELECT
      transactions.id,
      categories.name AS category,
      to_char(date, 'MM/DD/YYYY') AS date,
      amount::real/100 AS amount, 
      COALESCE(description, '') AS description,
      transactions.active
    FROM app.transactions AS transactions
    JOIN app.categories AS categories ON transactions.category_id = categories.id
    WHERE transactions.user_id=${userId}
    ${
      sorting?.name
        ? sql`ORDER BY ${sql(sorting.sortingExpression)} ${
            sorting.state ? sql`ASC` : sql`DESC`
          }`
        : sql``
    }
    LIMIT ${rowsPerPage}
    OFFSET ${(page - 1) * rowsPerPage}
    
  `;
  let result = {
    content: rows || [],
    page: {
      size: rowsPerPage,
      totalElements: Number(totalRows[0].total),
      totalPages: Math.ceil(Number(totalRows[0].total) / rowsPerPage),
      number: page,
    },
  };
  return result;
}

export async function updateTransaction(transaction) {
  const result = await sql`
    UPDATE app.transactions SET
    ${sql(transaction, 'date', 'categoryId', 'amount', 'description', 'active')}
    WHERE id=${transaction.id}

    returning id
  `;
  if (result.length === 0) return null;
  return result;
}

export async function deleteTransaction(id) {
  const result = await sql`
    DELETE FROM app.transactions WHERE id=${id}
  `;
  console.log('Delete', result);
}
