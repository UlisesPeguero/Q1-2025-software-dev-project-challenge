import ContentHeader from '@/app/ui/dashboard/content/ContentHeader';
import TransactionToolbar from '../TransactionToolbar';
import TransactionForm from '../TransactionForm';
import {
  getTransaction,
  getTransactionCategories,
} from '@/lib/data/transactions';

export default async function EditTransaction({ params }) {
  const { id } = await params;

  const [transaction, categories] = await Promise.all([
    getTransaction(id),
    getTransactionCategories(),
  ]);
  return (
    <>
      <TransactionForm
        title='Edit transaction'
        categories={categories}
        data={transaction}
      />
    </>
  );
}
