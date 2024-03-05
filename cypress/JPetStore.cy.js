import * as storeHelper from "./support/JPetStoreHelper"

/**
 * test case to check this page "https://petstore.octoperf.com/actions/Catalog.action" 
 */

const VALID_CREDENTIALS = {
    NAME: 'ameed',
    PASSWORD: 'ameed0595'
}
const INVALID_CREDENTIALS = {
    NAME: 'qqq',
    PASSWORD: '12345'
}
describe('JPetStore', () => {
    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })
    it('sign in by valid user name and valid password ', () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN)
        storeHelper.signin(VALID_CREDENTIALS.NAME, VALID_CREDENTIALS.PASSWORD)
    })
    it('sign in by invalid user name and valid password', () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN)
        storeHelper.signin(INVALID_CREDENTIALS.NAME, VALID_CREDENTIALS.PASSWORD, false)
    })
    it('sign in by invalid passworrd and valid user name', () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN)
        storeHelper.signin(VALID_CREDENTIALS.NAME, INVALID_CREDENTIALS.PASSWORD, false)
    })
    it('sign in by only fill username', () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN)
        storeHelper.signin(VALID_CREDENTIALS.NAME, '', false)
    })
    it('sign in by only fill password', () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN)
        storeHelper.signin('', VALID_CREDENTIALS.PASSWORD, false)
    })
})

