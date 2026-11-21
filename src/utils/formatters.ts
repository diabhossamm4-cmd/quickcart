export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function calculateOrderSummary(
  subtotal: number,
  discountRate: number = 0,
  freeShippingThreshold: number = 100
) {
  const discount = subtotal * discountRate;
  const taxableAmount = Math.max(0, subtotal - discount);
  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 9.99;
  const tax = taxableAmount * 0.08; // 8% sales tax
  const total = taxableAmount + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}
