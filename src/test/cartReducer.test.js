import { describe, it, expect } from 'vitest';
import {
  cartReducer,
  CART_ACTIONS,
  INITIAL_STATE,
} from '../context/cartReducer';

const mockProduct = {
  id: 'prod-1',
  name: 'Feather Wand Teaser Toy',
  category: 'toys',
  price: 12.99,
  description: 'Fun wand toy',
  imageUrl: 'https://placehold.co/400x400',
  inStock: true,
};

const mockProduct2 = {
  id: 'prod-2',
  name: 'Catnip Mice Trio',
  category: 'toys',
  price: 8.49,
  description: 'Plush mice',
  imageUrl: 'https://placehold.co/400x400',
  inStock: true,
};

describe('cartReducer', () => {
  it('should add a new item to an empty cart', () => {
    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: mockProduct, quantity: 1 },
    };
    const newState = cartReducer(INITIAL_STATE, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual({ product: mockProduct, quantity: 1 });
  });

  it('should increment quantity when adding an existing item', () => {
    const initialState = {
      items: [{ product: mockProduct, quantity: 1 }],
    };
    const action = {
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product: mockProduct, quantity: 2 },
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].quantity).toBe(3);
  });

  it('should remove an item by id', () => {
    const initialState = {
      items: [
        { product: mockProduct, quantity: 1 },
        { product: mockProduct2, quantity: 2 },
      ],
    };
    const action = {
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: 'prod-1' },
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].product.id).toBe('prod-2');
  });

  it('should update item quantity correctly', () => {
    const initialState = {
      items: [{ product: mockProduct, quantity: 1 }],
    };
    const action = {
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: 'prod-1', quantity: 5 },
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items[0].quantity).toBe(5);
  });

  it('should remove item if quantity is set to 0 or less', () => {
    const initialState = {
      items: [{ product: mockProduct, quantity: 2 }],
    };
    const action = {
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: 'prod-1', quantity: 0 },
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(0);
  });

  it('should clear all items from the cart', () => {
    const initialState = {
      items: [
        { product: mockProduct, quantity: 1 },
        { product: mockProduct2, quantity: 3 },
      ],
    };
    const action = {
      type: CART_ACTIONS.CLEAR_CART,
    };
    const newState = cartReducer(initialState, action);

    expect(newState.items).toHaveLength(0);
  });
});
