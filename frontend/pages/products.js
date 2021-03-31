import Products from '../components/Products';
import Pagination from '../components/Pagination';

export default function ProductsPage() {
  return (
    <div>
      <Pagination page={1} />
      <Products />
    </div>
  );
}
