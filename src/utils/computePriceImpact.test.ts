import { web3 } from '@project-serum/anchor'
import { CurrencyAmount, Solana, Percent, Price, Token } from '../entities'
import { computePriceImpact } from './computePriceImpact'

describe('#computePriceImpact', () => {
  const ADDRESS_ZERO = new web3.PublicKey(0)
  const ADDRESS_ONE = new web3.PublicKey(1)

  const t0 = new Token(1, ADDRESS_ZERO, 18)
  const t1 = new Token(1, ADDRESS_ONE, 18)

  it('is correct for zero', () => {
    expect(
      computePriceImpact(
        new Price(Solana.onChain(1), t0, 10, 100),
        CurrencyAmount.fromRawAmount(Solana.onChain(1), 10),
        CurrencyAmount.fromRawAmount(t0, 100)
      )
    ).toEqual(new Percent(0, 10000))
  })
  it('is correct for half output', () => {
    expect(
      computePriceImpact(
        new Price(t0, t1, 10, 100),
        CurrencyAmount.fromRawAmount(t0, 10),
        CurrencyAmount.fromRawAmount(t1, 50)
      )
    ).toEqual(new Percent(5000, 10000))
  })
  it('is negative for more output', () => {
    expect(
      computePriceImpact(
        new Price(t0, t1, 10, 100),
        CurrencyAmount.fromRawAmount(t0, 10),
        CurrencyAmount.fromRawAmount(t1, 200)
      )
    ).toEqual(new Percent(-10000, 10000))
  })
})
