import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductEprelView from '../ProductEprelView.vue';
import type { ProductEprelViewProps } from '../types';

describe('ProductEprelView', () => {
  const defaultProps: ProductEprelViewProps = {
    labelurl: '',
    datasheeturl: '',
  };

  it('hides the label and datasheet when their URLs are missing', () => {
    const wrapper = mount(ProductEprelView, {
      props: defaultProps,
    });

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders the label and datasheet with the provided URLs', () => {
    const wrapper = mount(ProductEprelView, {
      props: {
        labelurl: 'https://example.com/label.png',
        datasheeturl: 'https://example.com/datasheet.pdf',
      },
    });

    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/label.png');
    expect(wrapper.get('a').attributes('href')).toBe('https://example.com/datasheet.pdf');
  });

  it('accepts props correctly', () => {
    const wrapper = mount(ProductEprelView, {
      props: defaultProps,
    });

    expect(wrapper.props().labelurl).toStrictEqual(defaultProps.labelurl);
    expect(wrapper.props().datasheeturl).toStrictEqual(defaultProps.datasheeturl);
  });
});
