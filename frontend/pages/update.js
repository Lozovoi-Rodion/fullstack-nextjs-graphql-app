import { useRouter } from 'next/router';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage() {
  const { query } = useRouter();
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
