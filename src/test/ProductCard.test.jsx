import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

const mockProduct = {
  id: 'prod-test-1',
  name: 'Feather Wand Teaser Toy',
  category: 'toys',
  price: 12.99,
  description: 'A great cat toy.',
  imageUrl: 'https://placehold.co/400x400',
  inStock: true,
};

describe('ProductCard', () => {
  it('renders product name and price correctly', () => {
    const mockCartContext = {
      addItem: () => {},
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </CartContext.Provider>
    );

    expect(screen.getByText('Feather Wand Teaser Toy')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    expect(screen.getByText('toys')).toBeInTheDocument();
  });

  it('calls addItem when Add to Cart button is clicked', async () => {
    let addedItem = null;
    let addedQuantity = null;

    const mockCartContext = {
      addItem: (product, qty) => {
        addedItem = product;
        addedQuantity = qty;
      },
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const button = screen.getByRole('button', {
      name: /add feather wand teaser toy to cart/i,
    });
    await userEvent.click(button);

    expect(addedItem).toEqual(mockProduct);
    expect(addedQuantity).toBe(1);
  });
});
