import { addFirstWordWithoutPassingScreen, addFirstWord, addFirstWords } from '../../utils/addWord'

const tabThroughNavigation = (cy) => {
  cy.focused().should('have.attr', 'data-qa', 'nav-item-add').tab()
  cy.focused().should('have.attr', 'data-qa', 'nav-item-drill').tab()
  cy.focused().should('have.attr', 'data-qa', 'nav-item-list').tab()
  cy.focused().should('have.attr', 'data-qa', 'nav-item-settings')
}

describe('Tabulation', () => {
  it('initial state tabulates correctly', () => {
    cy.visit('/')
    cy.get('body').tab()
    cy.focused().should('have.id', 'intro_field_word').tab()
    cy.focused().should('have.id', 'intro_field_translation').tab()
    cy.focused().should('have.id', 'intro_field_word')
  })

  it('tab works when first word is added', () => {
    cy.visit('/')
    addFirstWordWithoutPassingScreen(cy)
    cy.get('#intro_button_pass').should('have.css', 'opacity', '1').then(() => {
      cy.get('body').tab()
    })
    cy.focused().should('have.id', 'intro_button_pass')
  })

  it('tab works after intro screen is passed', () => {
    cy.visit('/')
    addFirstWord(cy)
    cy.get('body').tab()
    cy.focused().should('have.id', 'field_word').tab()
    cy.focused().should('have.id', 'field_translation').tab()
    cy.focused().should('have.id', 'button_add').tab()
    cy.focused().should('have.id', 'field_word').tab()
    cy.focused().should('have.id', 'field_translation').tab()
    cy.focused().should('have.id', 'button_add')
  })

  it('tab works after three words are passed (Add screen)', () => {
    cy.visit('/')
    addFirstWords(cy)
    cy.get('body').tab()
    cy.focused().should('have.id', 'field_word').tab()
    cy.focused().should('have.id', 'field_translation').tab()
    cy.focused().should('have.id', 'button_add').tab()
    tabThroughNavigation(cy)
    cy.focused().tab()
    cy.focused().should('have.id', 'field_word').tab()
  })

  it('tab works on Drill screen', () => {
    cy.visit('/')
    addFirstWords(cy)
    cy.get('.nav [data-qa="nav-item-drill"]').click()
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-qa', 'drill-input').tab()
    cy.focused().should('have.attr', 'data-qa', 'drill-skip-button').tab()
    cy.focused().should('have.attr', 'data-qa', 'drill-answer-button').tab()
    tabThroughNavigation(cy)
    cy.focused().tab()
    cy.focused().should('have.attr', 'data-qa', 'drill-input').tab()
  })

  it('tab works on List screen', () => {
    cy.visit('/')
    addFirstWords(cy)
    cy.get('.nav [data-qa="nav-item-list"]').click()
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-qa', 'list-sorting-word').tab()
    cy.focused().should('have.attr', 'data-qa', 'list-sorting-translation').tab()
    cy.focused().should('have.attr', 'data-qa', 'list-sorting-delete-button').tab()
    cy.focused().should('have.attr', 'data-qa', 'list-add-more-cta').tab()
    tabThroughNavigation(cy)
    cy.focused().tab()
    cy.focused().should('have.attr', 'data-qa', 'list-sorting-word').tab()
  })

  it('tab works on Settings screen', () => {
    cy.visit('/')
    addFirstWords(cy)
    cy.get('.nav [data-qa="nav-item-settings"]').click()
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-qa', 'settings-language-button').tab()
    cy.focused().should('have.attr', 'data-qa', 'settings-theme-button').tab()
    cy.focused().should('have.attr', 'data-qa', 'settings-theme-button').tab()
    tabThroughNavigation(cy)
    cy.focused().tab()
    cy.focused().should('have.attr', 'data-qa', 'settings-language-button').tab()
  })
})
