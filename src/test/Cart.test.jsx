import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Cart } from '../pages/Cart';

const mockProduct1 = {
  id: 'prod-1',
  name: 'Feather Wand Teaser Toy',
  category: 'toys',
  price: 10.0,
  description: 'Fun toy',
  imageUrl: 'https://placehold.co/400x400',
  inStock: true,
};

const mockProduct2 = {
  id: 'prod-2',
  name: 'Catnip Mice Trio',
  category: 'toys',
  price: 15.5,
  description: 'Nice mice',
  imageUrl: 'https://placehold.co/400x400',
  inStock: true,
};

describe('Cart Page', () => {
  it('renders empty cart state when cart is empty', () => {
    const mockCartContext = {
      cart: [],
      subtotal: 0,
      totalItems: 0,
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /explore products/i })
    ).toBeInTheDocument();
  });

  it('renders items and displays correct subtotal', () => {
    const mockCartContext = {
      cart: [
        { product: mockProduct1, quantity: 2 }, // $20.00
        { product: mockProduct2, quantity: 1 }, // $15.50
      ],
      subtotal: 35.5,
      totalItems: 3,
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );

    expect(screen.getByText('Feather Wand Teaser Toy')).toBeInTheDocument();
    expect(screen.getByText('Catnip Mice Trio')).toBeInTheDocument();

    const subtotalElement = screen.getByTestId('cart-subtotal');
    expect(subtotalElement).toHaveTextContent('$35.50');
  });
});
