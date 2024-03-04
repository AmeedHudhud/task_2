export const insertData = (username, password, empty = true) => {
    cy.contains('Sign In')
        .click()
    if (empty == false) {
        cy.get(LOCATORS.username_field)
            .clear()
            .type(username)
        cy.get(LOCATORS.password_field)
            .clear()
            .type(password)
    } else {
        if (username == ' ') {
            cy.get(LOCATORS.username_field)
                .clear()
            cy.get(LOCATORS.password_field)
                .clear()
                .type(password)
        } else {
            cy.contains('Sign In')
                .click()
            cy.get(LOCATORS.username_field)
                .clear()
                .type(username)
            cy.get(LOCATORS.password_field).invoke('val', '')
        }
    }
    cy.get(LOCATORS.signin_button)
        .click()
}
export const signin = (username, password, expected = true) => {
    if (expected == true) {
        insertData('ameed', 'ameed0595', false)
        cy.get('[id="WelcomeContent"]').invoke('text').should('contain', 'Welcome ameed!')
    } else {
        if (username == ' ') {
            insertData(username, password, true)
            cy.get(LOCATORS.username_field).should('have.class', 'error')
        } else if (password == '') {
            insertData(username, password, true)
            cy.get(LOCATORS.password_field).should('have.class', 'error')
        } else if (username != 'ameed') {
            insertData(username, password, false)
            cy.get(LOCATORS.error_message)
                .invoke('text')
                .should('contain', 'Invalid username or password.  Signon failed.')
        } else if (password != 'ameed0595') {
            insertData(username, password, false)
            cy.get(LOCATORS.error_message)
                .invoke('text')
                .should('contain', 'Invalid username or password.  Signon failed.')
        }
    }
}
export const LOCATORS = {
    username_field : '[name="username"]',
    password_field : '[name="password"]',
    signin_button : '[name="signon"]',
    error_message : '.messages',
}
