import each from 'lodash/each'
import compact from 'lodash/compact'
import get from 'lodash/get'
import set from 'lodash/set'
import isEmpty from 'lodash/isEmpty'
import { en } from './locales/en'
import { ru } from './locales/ru'

type TLocaleId = 'en'| 'ru';

const localesMap = {
  en,
  ru
}

const trerere = (mainLocaleTree, localeId, mismatches, path?: string) => {
  const mainTarget = get(mainLocaleTree, path, mainLocaleTree)

  each(mainTarget, (translationString, translationKey) => {
    const oLocaleEntity = get(localesMap, compact([localeId, path, translationKey]))

    if (typeof translationString === 'object') {
      const pathNew = compact([path, translationKey]).join('.')
      trerere(mainLocaleTree, localeId, mismatches, pathNew)
    } else {
      if (!oLocaleEntity) {
        set(mismatches, compact([path, translationKey]).join('.'), '')
      }
    }
  })
}

const getLocalesDiff = (mainLocale: TLocaleId, otherLocales: [TLocaleId]): Record<string, string> => {
  const mismatches = {}

  each(otherLocales, (localeId) => {
    if (!mismatches[localeId]) {
      mismatches[localeId] = {}
    }

    trerere(localesMap[mainLocale], localeId, mismatches[localeId])

    if (isEmpty(mismatches[localeId])) {
      delete mismatches[localeId]
    }
  })

  return mismatches
}

export const doLocaleCheck = (): Record<string, string> => getLocalesDiff('en', [
  'ru'
])
