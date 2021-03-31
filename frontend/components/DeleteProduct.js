import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  return cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  const handleClick = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      deleteProduct().catch((err) => alert(err.message));
    }
  };
  return (
    <button disabled={loading} type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
