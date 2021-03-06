<template>
  <form
    class="add"
    @submit.prevent="addWord"
  >
    <div class="add__inner">
      <div v-if="words.length < 3" class="notification">
        <span v-if="words.length === 0" v-t="'add.three'" />
        <span v-if="words.length > 0">
          {{$tc('add.others', 3 - words.length)}}
        </span>
      </div>
      <div class="fieldset">
        <label>
          <span class="field__label" v-t="'Word'" />
          <input
            :tabindex="tabindex"
            ref="inputWord"
            id="field_word"
            v-model="word"
            autocomplete="off"
          />
        </label>
        <label>
          <span class="field__label" v-t="'Translation'" />
          <input
            :tabindex="tabindex"
            id="field_translation"
            v-model="translation"
            autocomplete="off"
          />
        </label>
      </div>
      <Button
        :tabindex="tabindex"
        v-t="'Add'"
        id="button_add"
      />
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Vue, Mixins } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  import reduce from 'lodash/reduce'
  import Tabindex from '../../mixins/Tabindex.vue'

  import Button from '@/ui-kit/Button/index.vue'

  interface IFields {
    word: string;
    translation: string;
  }

  const NavModule = namespace('NavModule')
  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: {
      Button
    }
  })
  export default class AddView extends Mixins(Tabindex) {
    pageName: TPageName = 'add'
    word: string = '';
    translation: string = '';

    $refs!: {
      inputWord: HTMLInputElement
    }

    @UserRelatedData.State
    words

    @UserRelatedData.State
    introScreenPassed

    @NavModule.State
    currentPage

    @UserRelatedData.Mutation('addWord')
    addWordToStore

    @NavModule.Mutation
    addPointingDot: (id: TPageName) => void

    showError (fieldName: string) {
      const el = document.getElementById(`field_${fieldName}`)

      setTimeout(() => {
        el.classList.remove('field_error')
      }, 500)
      el.classList.add('field_error')
      el.focus()
      this.resetField(fieldName)
    }

    resetField (name: string) {
      this[name] = ''
    }

    addWord () {
      const {
        word,
        translation
      } = this
      let fieldWithError: string = ''

      const fields: IFields = reduce({
        word,
        translation
      }, (acc, value, fieldName) => {
        value = value.trim()

        if (value === '' && !fieldWithError) {
          fieldWithError = fieldName
        }

        acc[fieldName] = value
        return acc
      }, {} as IFields)

      if (fieldWithError) {
        this.showError(fieldWithError)
        return false
      }

      this.addWordToStore({
        word: fields.word,
        translation: fields.translation
      })
      this.resetForm()

      if (this.words.length !== 3) {
        this.focusFirstInput()
      } else {
        // Когда добавим третье слово и покажем меню, уберем фокус,
        // чтобы было видно,чо произошло
        (document.activeElement as HTMLElement).blur()
        this.addPointingDot('drill')
      }
    }

    focusFirstInput () {
      this.$refs.inputWord.focus()
    }

    resetForm () {
      this.word = ''
      this.translation = ''
    }

    get tabindex () {
      if (!this.introScreenPassed) {
        return '-1'
      }

      return this.getTabindex()
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
