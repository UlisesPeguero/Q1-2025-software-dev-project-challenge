import ContentHeader from '@/app/ui/dashboard/content/ContentHeader';
import TransactionToolbar from './TransactionToolbar';
import TransactionForm from './TransactionForm';
import { getTransactionCategories } from '@/lib/data/transactions';

export default async function CreateTransaction() {
  const categories = await getTransactionCategories();

  return (
    <>
      <ContentHeader title='New transaction'>
        <TransactionToolbar />
      </ContentHeader>
      <TransactionForm categories={categories} />
    </>
  );
}
