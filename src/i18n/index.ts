import Vue from 'vue'
import VueI18n from 'vue-i18n'
import get from 'lodash/get'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { doLocaleCheck } from './getLocalesDiff'
import { getUserLocale } from 'get-user-locale'
import { STORAGE_STATE_NAME } from '../store/constants'

Vue.use(VueI18n)

const localeFromLocalhostStorage = get(JSON.parse(localStorage.getItem(STORAGE_STATE_NAME)), 'UserRelatedSettings.locale')

export const i18n = new VueI18n({
  locale: localeFromLocalhostStorage || getUserLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})
