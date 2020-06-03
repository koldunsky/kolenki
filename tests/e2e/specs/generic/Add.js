import { addThreeWords } from '../../utils/addWord'

describe('"Add" screen', () => {
  it('unlocks navigation', () => {
    cy.visit('/')
    addThreeWords(cy)
    cy.wait(500)
    cy.get('.nav').should($div => {
      expect($div.get(0).offsetHeight).greaterThan(0)
    })
  })
})