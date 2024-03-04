export const LOCATORS = {
    username_field: '[name="username"]',
    password_field: '[name="password"]',
    signin_button: '[name="signon"]',
    error_messages : '.messages li',
    welcomeMessage : '[id="WelcomeContent"]'
}
export const ERROR_MESSAGE = {
    message1: 'Invalid username or password.  Signon failed.'
}
export const CONSTANT_WORD = {
    signin : 'Sign In',
    login : 'Login'
}
export const enterFieldValue = (value, locator) => {
    cy.get(locator).clear().invoke('val', value)
}
export const clickButton = (locator) => {
    cy.contains(locator).click()
}
export const signin = (username, password, validCred = true) => {
    clickButton(CONSTANT_WORD.signin)
    enterFieldValue(username, LOCATORS.username_field)
    enterFieldValue(password, LOCATORS.password_field)
    clickButton(CONSTANT_WORD.login)
    if (validCred == true) {
        cy.get(LOCATORS.welcomeMessage).invoke('text').should('contain', `Welcome ${username}!`)
    } else {
        if (username == '') {
            cy.get(LOCATORS.username_field).should('have.class', 'error')
        } else if (password == '') {
            cy.get(LOCATORS.password_field).should('have.class', 'error')
        } else {
            cy.get(LOCATORS.error_messages).should('contain', ERROR_MESSAGE.message1)
        }
    }
}