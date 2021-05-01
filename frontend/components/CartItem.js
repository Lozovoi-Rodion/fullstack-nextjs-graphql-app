import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  imf {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
export default function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>{formatMoney(product.price * cartItem.quantity)}</p>-
        <em>
          {cartItem.quantity} &times; {formatMoney(product.price)}
        </em>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}
