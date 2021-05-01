import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

const Nav = () => {
  const user = useUser();
  const { toggleCart } = useCart();
  const cartCount = user?.cart?.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );
  return (
    <NavStyles>
      <Link href="/products"> products</Link>
      {user && (
        <>
          <Link href="/sell"> sell</Link>
          <Link href="/orders"> orders</Link>
          <Link href="/account"> account</Link>
          <SignOut />
          <button type="button" onClick={toggleCart}>
            My Cart
            <CartCount count={cartCount} />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
