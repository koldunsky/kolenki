import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

export type TPointingDots = {
  [key in TPageName]: boolean
}

@Module({
  namespaced: true
})

class NavModule extends VuexModule {
  public pages: Array<TPageName> = ['add', 'drill', 'list', 'settings']
  public currentPage: TPageName = 'add'
  public pointingDots: TPointingDots = {
    add: false,
    drill: false,
    list: false,
    settings: false
  }

  @Mutation
  addPointingDot (id: TPageName) {
    this.pointingDots[id] = true
  }

  @Mutation
  removePointingDot (id: TPageName) {
    this.pointingDots[id] = false
  }

  @Mutation
  changeCurrentPage (id: TPageName) {
    this.currentPage = id
  }

  @Action
  navigateTo (id: TPageName) {
    if (this.pointingDots[id]) {
      this.context.commit('removePointingDot', id)
    }

    if (!this.context.rootState.UserRelatedData.currentWord.id) {
      this.context.commit('UserRelatedData/setRandomWordAsCurrent', null, { root: true })
    }

    this.context.commit('changeCurrentPage', id)

    return Promise.resolve()
  }

  get currentPageIndex () {
    return this.pages.indexOf(this.currentPage)
  }
}

export default NavModule
