export const LOCATORS = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    signInButton: '[name="signon"]',
    errorMessages : '.messages li',
    welcomeMessage : '[id="WelcomeContent"]'
}
export const ERROR_MESSAGE = {
    INVALID_CREDENTIALS_MESSAGE: 'Invalid username or password.  Signon failed.'
}
export const WORD_REGISTRY = {
    SIGNIN : 'Sign In',
    LOGIN : 'Login'
}
export const enterFieldValue = (value, locator) => {
    cy.get(locator).clear().invoke('val', value)
}
export const clickButton = (locator) => {
    cy.contains(locator).click()
}
export const signin = (username, password, validCred = true) => {
    enterFieldValue(username, LOCATORS.usernameField)
    enterFieldValue(password, LOCATORS.passwordField)
    clickButton(WORD_REGISTRY.LOGIN)
    if (validCred == true) {
        cy.get(LOCATORS.welcomeMessage).invoke('text').should('contain', `Welcome ${username}!`)
    } else {
        if (username == '') {
            cy.get(LOCATORS.usernameField).should('have.class', 'error')
        } else if (password == '') {
            cy.get(LOCATORS.passwordField).should('have.class', 'error')
        } else {
            cy.get(LOCATORS.errorMessages).should('contain', ERROR_MESSAGE.INVALID_CREDENTIALS_MESSAGE)
        }
    }
}