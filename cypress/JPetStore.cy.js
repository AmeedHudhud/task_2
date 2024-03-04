import * as storeHelper from "./support/JPetStoreHelper"

/**
 * test case to check this page "https://petstore.octoperf.com/actions/Catalog.action" 
 */

const VALID_CREDENTIALS = {
    name: 'ameed',
    password: 'ameed0595'
}
const INVALID_CREDENTIALS = {
    name: 'qqq',
    password: '12345'
}
describe('JPetStore', () => {
    beforeEach(() => {
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
    })
    it('sign in by valid user name and valid password ', () => {
        storeHelper.signin(VALID_CREDENTIALS.name, VALID_CREDENTIALS.password)
    })
    it('sign in by invalid user name and valid password', () => {
        storeHelper.signin(INVALID_CREDENTIALS.name, VALID_CREDENTIALS.password, false)
    })
    it('sign in by invalid passworrd and valid user name', () => {
        storeHelper.signin(VALID_CREDENTIALS.name, INVALID_CREDENTIALS.password, false)
    })
    it('sign in by only fill username', () => {
        storeHelper.signin(VALID_CREDENTIALS.name, '', false)
    })
    it('sign in by only fill password', () => {
        storeHelper.signin('', VALID_CREDENTIALS.password, false)
    })
})

