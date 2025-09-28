// ... (imports)

export const CartSummary = ({
  showCheckoutButton = true,
  className
}) => {
  const { cart, getCartTotal, getCartItemsCount } = useCartContext();

  if (cart.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 4.99; // Corrected this line
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // ... (rest of the component)
}