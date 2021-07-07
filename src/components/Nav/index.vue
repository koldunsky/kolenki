<template>
  <div
    v-if="words.length > 0"
    id="nav"
    class="nav"
    :class="{
        'nav_visible': words.length >= 3
      }"
  >
    <div class="nav__container">
      <button
        v-for="name in pages"
        :key="name"
        class="nav__item"
        :class="{
          'nav__item_active': currentPage === name
        }"
        @click="navigateTo(name)"
        :data-qa="`nav-item-${name}`"
      >
        <span class="nav__item-icon-container">
          <span :class="`nav__item-icon nav__item-icon_${name}`"/>
          <span class="pointing-dot">
            <PointingDot
              v-if="pointingDots[name]"
            />
          </span>
        </span>
        <span class="nav__item-label" v-t="`nav.${name}`"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import { TPointingDots } from '@/store/entities/nav'
  import PointingDot from '../../ui-kit/PointingDot/index.vue'

  const NavModule = namespace('NavModule')
  const UserRelatedData = namespace('UserRelatedData')

  @Component({
    components: {
      PointingDot
    },
    filters: {
      capitalize: function (value: string): string {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  })
  export default class Nav extends Vue {
    @UserRelatedData.State
    words

    @NavModule.State
    currentPage: TPageName;

    @NavModule.State
    pages: Array<TPageName>;

    @NavModule.State
    pointingDots: TPointingDots;

    @NavModule.Action
    navigateTo: (page: TPageName) => void

    beforeMount () {
      if (this.words.length > 2) {
        this.navigateTo('drill')
      }
    }
  }
</script>
<style src="./index.scss" lang="scss" scoped></style>
