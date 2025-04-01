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
      <ContentHeader title='Edit transaction' backButtonTo='../transactions'>
        <TransactionToolbar />
      </ContentHeader>
      <TransactionForm categories={categories} data={transaction} />
    </>
  );
}
