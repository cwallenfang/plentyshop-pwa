import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductEprel from '../ProductEprel.vue';
import type { Product } from '@plentymarkets/shop-api';
import type { ProductEprelProps } from '../types';

const fakeProduct = {
  id: 1,
  texts: {},
  variationProperties: [],
} as unknown as Product;

describe('ProductEprel', () => {
  const defaultProps: ProductEprelProps = {
    product: fakeProduct,
    size: 'lg',
  };

  it('hides the energy label when the product has no energy class', () => {
    const wrapper = mount(ProductEprel, {
      props: defaultProps,
    });

    expect(wrapper.find('[data-testid="producteprel"]').exists()).toBe(false);
  });

  it('renders the energy arrow for a product with a valid energy class', () => {
    const product = {
      ...fakeProduct,
      variationProperties: [{ properties: [{ id: 172, values: { value: 'A' } }] }],
    } as unknown as Product;
    const wrapper = mount(ProductEprel, {
      props: { ...defaultProps, product },
    });

    expect(wrapper.find('[data-testid="producteprel"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="arrowsvg"]').exists()).toBe(true);
  });

  it('accepts props correctly', () => {
    const wrapper = mount(ProductEprel, {
      props: defaultProps,
    });

    expect(wrapper.props().product).toStrictEqual(defaultProps.product);
  });
});
