import ContentHeader from '@/app/ui/dashboard/content/ContentHeader';
import TransactionForm from '../TransactionForm';
import { getTransactionCategories } from '@/lib/data/transactions';

export default async function CreateTransaction() {
  const categories = await getTransactionCategories();

  return <TransactionForm title='New transaction' categories={categories} />;
}
