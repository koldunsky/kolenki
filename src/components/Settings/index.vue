<template>
  <div class="settings">
      <div class="settings__inner">
        <SettingsOption :title="$t('settings.language')">
          <button
            v-for="l in languages"
            :key="l"
            class="settings__button-option"
            :class="l === localeShort && 'settings__button-option_active'"
            data-qa="settings-language-button"
            :tabindex="l === localeShort ? '-1' : tabindex"
            @click="() => onChangeLocaleClick(l)"
          >
            {{languagesNameMap[l]}}
          </button>
        </SettingsOption>
        <SettingsOption :title="$t('settings.colorTheme')">
          <button
            v-for="t in themeVariants"
            :key="t"
            v-t="`settings.${getThemeTranslationId(t)}`"
            class="settings__button-option"
            :class="t === theme && 'settings__button-option_active'"
            data-qa="settings-theme-button"
            :tabindex="t === theme ? '-1' : tabindex"
            @click="() => onThemeChangeClick(t)"
          />
        </SettingsOption>
      </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import Tabindex from '@/mixins/Tabindex.vue'
  import SettingsOption from './settingsOption.vue'

  const UserRelatedSettings = namespace('UserRelatedSettings')

  @Component({
    components: {
      SettingsOption
    }
  })
  export default class Settings extends Mixins(Tabindex) {
    pageName: TPageName = 'settings'
    themeVariants: Array<TTheme> = [null, 'dark', 'light']
    languages: Array<TLocale> = ['en', 'ru']
    languagesNameMap: { [key in TLocale]: string } = {
      en: 'English',
      ru: 'Русский'
    }

    @UserRelatedSettings.State
    theme: TTheme

    @UserRelatedSettings.State
    locale: TLocale

    @UserRelatedSettings.Getter
    computedTheme: TTheme

    @UserRelatedSettings.Mutation
    changeTheme

    @UserRelatedSettings.Mutation
    changeLocale

    onThemeChangeClick (theme: TTheme) {
      this.changeTheme(theme)
    }

    onChangeLocaleClick (locale: TLocale) {
      this.changeLocale(locale)
    }

    getThemeTranslationId (id) {
      return !id ? 'system' : id
    }

    get currentThemeString () {
      return this.getThemeTranslationId(this.theme)
    }

    getShortLocaleCode (locale: string): TLocale {
      if (locale) {
        return locale.slice(0, 2) as TLocale
      }

      console.warn('couldn\'t get short locale')
    }

    get localeShort () {
      return this.locale && this.getShortLocaleCode(this.locale)
    }

    created () {
      if (!this.locale) {
        this.changeLocale(this.getShortLocaleCode(this.$i18n.locale))
      }
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
