import { doLocaleCheck } from '@/i18n/getLocalesDiff'

describe('Locales', () => {
  it('all strings are translated', () => {
    expect(doLocaleCheck()).toStrictEqual({})
  })
})
