import { TransformCurrencyPipe } from './transform-currency.pipe';

describe('TransformCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
