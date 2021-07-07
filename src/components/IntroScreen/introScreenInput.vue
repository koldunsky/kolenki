<template>
  <span class="introScreen__inputContainer">
    <span class="introScreen__valueDummy">{{value}}</span>
    <span class="introScreen__placeholderDummy">{{placeholder}}</span>
    <input
      :placeholder="placeholder"
      :tabindex="tabindex"
      class="introScreen__input"
      type="text"
      autocomplete="off"
      v-bind="$attrs"
      :id="id"
      :name="name"
      v-bind:value="value"
      @input="(e) => $emit('input', e.target.value)"
      @blur="(e) => $emit('blur', e)"
      @focus="(e) => $emit('focus', e)"
    />
  </span>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const UserRelatedData = namespace('UserRelatedData')

  @Component
  export default class IntroScreenInput extends Vue {
    @Prop() value: string
    @Prop() placeholder: string
    @Prop() tabindex: string
    @Prop() id: string
    @Prop() name: string
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
