import styled from 'styled-components';
import NProgress from 'nprogress';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  p {
    font-size: 12px;
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const router = useRouter();
  const { toggleCart } = useCart();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      NProgress.start();
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error);
        setLoading(false);
        NProgress.done();
        return;
      }

      const order = await checkout({
        variables: {
          token: paymentMethod.id,
        },
      });
      router.push({
        pathname: `/order/${order.data.checkout.id}`,
      });
      toggleCart();
      setLoading(false);
      NProgress.done();
    } catch (err) {
      NProgress.done();
      setLoading(false);
      console.log(err);
    }
  };

  const errorMessage = error?.message || graphQlError?.message;
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
