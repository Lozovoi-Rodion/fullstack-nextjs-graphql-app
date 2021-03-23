export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  };

  const formatter = new Intl.NumberFormat('en-US', options);
  console.log(amount);
  return formatter.format(amount / 100);
}
