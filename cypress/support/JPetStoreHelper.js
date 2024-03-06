export const LOCATORS = {
  usernameField: '[name="username"]',
  passwordField: '[name="password"]',
  signInButton: '[name="signon"]',
  errorMessages: ".messages li",
  welcomeMessage: '[id="WelcomeContent"]',
  fish: '[src="../images/sm_fish.gif"]',
  dog: '[src="../images/dogs_icon.gif"]',
  cat: '[coords="225,240,295,310"]',
  reptiles: '[src="../images/reptiles_icon.gif"]',
  bird: '[src="../images/sm_birds.gif"]',
  cart: '[src="../images/cart.gif"]',
  tableRows: "table tbody tr",
};
export const MESSAGE = {
  INVALID_CREDENTIALS_MESSAGE: "Invalid username or password.  Signon failed.",
  EMPTY_MESSAGE: "Your cart is empty.",
};
export const WORD_REGISTRY = {
  SIGNIN: "Sign In",
  LOGIN: "Login",
  ADD_TO_CART_BUTTON: "Add to Cart",
  PRODUCTS_TABLE: "table",
  RETURN_TO_MAIN_PAGE_BUTTON: "Return to Main Menu",
};
export const enterFieldValue = (value, locator) => {
  cy.get(locator).clear().invoke("val", value);
};
export const clickButton = (locator, contain = true) => {
  if (contain) {
    cy.contains(locator).click({ force: true });
  } else {
    cy.get(locator).click({ force: true });
  }
};
export const signin = (username, password, validCred = true) => {
  enterFieldValue(username, LOCATORS.usernameField);
  enterFieldValue(password, LOCATORS.passwordField);
  clickButton(WORD_REGISTRY.LOGIN);
  if (validCred == true) {
    cy.get(LOCATORS.welcomeMessage)
      .invoke("text")
      .should("contain", `Welcome ${username}!`);
  } else {
    if (username == "") {
      cy.get(LOCATORS.usernameField).should("have.class", "error");
    } else if (password == "") {
      cy.get(LOCATORS.passwordField).should("have.class", "error");
    } else {
      cy.get(LOCATORS.errorMessages).should(
        "contain",
        MESSAGE.INVALID_CREDENTIALS_MESSAGE
      );
    }
  }
};
export const addProducts = (products, fromMenu = true) => {
  // cy.log(products[0].type)
  products.forEach((element) => {
    if (element.type == "FISH") {
      cy.get(LOCATORS.fish).click();
    } else if (element.type == "DOG") {
      cy.get(LOCATORS.dog).click();
    } else if (element.type == "CAT") {
      cy.get(LOCATORS.cat).click({ force: true });
    } else if (element.type == "BIRD") {
      cy.get(LOCATORS.bird).click();
    } else if (element.type == "REPTILES") {
      cy.get(LOCATORS.reptiles).click();
    }
    clickButton(element.name);
    if (fromMenu === true) {
      cy.contains(element.Description)
        .parent()
        .parent()
        .find(".Button")
        .click();
      cy.get("table").should("contain", element.Description);
    } else {
      clickButton(element.Description);
      clickButton(WORD_REGISTRY.ADD_TO_CART_BUTTON);
    }
    clickButton(WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON);
  });

  // products.forEach((element) => {
  //     clickButton(element.type, false);
  //     clickButton(element.name);
  //     if (fromMenu === true) {
  //         cy.contains(element.Description)
  //             .parent()
  //             .parent()
  //             .find(".Button")
  //             .click();
  //         cy.get("table").should("contain", element.Description);
  //     } else {
  //         clickButton(element.Description);
  //         clickButton(WORD_REGISTRY.ADD_TO_CART_BUTTON);
  //         // cy.get(WORD_REGISTRY.PRODUCTS_TABLE).should(
  //         //     "contain",
  //         //     element.Description
  //         // );
  //     }
  //     clickButton(WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON);
  // });
};
export const verifyProductExistence = (product, isExist = true) => {

    product.forEach(value=>{
        if(isExist){
            cy.get(WORD_REGISTRY.PRODUCTS_TABLE).should("contain", value);
        }else{
            cy.get(WORD_REGISTRY.PRODUCTS_TABLE).should('not.contain', value);
        }
    })
//   if (isExist) {
//     product.forEach((value) => {
//       cy.get(WORD_REGISTRY.PRODUCTS_TABLE).should("contain", value);
//     });
//   } else {
//     product.forEach((value) => {
//       cy.get(LOCATORS.tableRows).should("not.contain", value);
//     });
//   }
};
export const removeFromCart = (products) => {
  // clickButton(LOCATORS.cart, false)
  products.forEach((element) => {
    cy.contains(element).parent().parent().find(".Button").click();
    // cy.get(LOCATORS.tableRows).should("not.contain", element + " ");
  });
};
export const checkButtonFunctionality = (button, page = "main") => {
  //need edit
  if (button == "Return to Main Menu") {
    clickButton(LOCATORS.cart, false);
    clickButton(button);
    cy.get("#Main").should("exist");
  } else if (button == "FISH") {
    clickButton(LOCATORS.fish, false);
    clickButton("FI-SW-01");
    clickButton(`Return to ${button}`);
    cy.get("h2").should("contain", "Fish");
  } else if (button == "DOGS") {
    clickButton(LOCATORS.dog, false);
    clickButton("K9-BD-01");
    clickButton(`Return to ${button}`);
    cy.get("h2").should("contain", "Dogs");
  } else if (button == "CATS") {
    clickButton(LOCATORS.birds, false);
    clickButton("FL-DSH-01");
    clickButton(`Return to ${button}`);
    cy.get("h2").should("contain", "Cats");
  } else if (button == "REPTILES") {
    clickButton(LOCATORS.reptiles, false);
    clickButton("RP-LI-02");
    clickButton(`Return to ${button}`);
    cy.get("h2").should("contain", "Reptiles");
  } else if (button == "BIRDS") {
    clickButton(LOCATORS.bird, false);
    clickButton("AV-CB-01");
    clickButton(`Return to ${button}`);
    cy.get("h2").should("contain", "Birds");
  }
};
export const textExistence = (locator, text) => {
  cy.get(locator).should("contain", text);
};
export const checkTotalCost = (locator, row) => {
  cy.get(`input[name="${locator}"]`).then(($input) => {
    //quantity
    const value = parseFloat($input.val());
    cy.get(LOCATORS.tableRows)
      .eq(row)
      .children()
      .eq(5)
      .invoke("text")
      .then((text) => {
        //price
        const price = parseFloat(text.replace(/\$/g, ""));
        const total = (value * price).toFixed(2);
        cy.get(LOCATORS.tableRows)
          .eq(row)
          .children()
          .eq(6)
          .invoke("text")
          .should("eq", "$" + total);
      });
  });
};
export const checkSubTotal = () => {
  clickButton(LOCATORS.cart, false);
  cy.get(LOCATORS.tableRows).then((value) => {
    var sum = 0;
    value.slice(1, -1).each((index, row) => {
      cy.wrap(row).then((x) => {
        cy.get(row)
          .children()
          .eq(5)
          .invoke("text")
          .then((text) => {
            const value = parseFloat(text.replace(/\$/g, ""));
            if (!isNaN(value)) {
              sum += value;
            }
          });
      });
    });
  });
  /**
     * cy.contains('Sub Total:').invoke('text').then((text) => { to give sub total
        const subtotal = text.match(/\$([\d.]+)/)[1];
        cy.log(subtotal);
    });
     */
};
export const changeQantity = (locator, number) => {
  cy.get(`input[name="${locator}"]`).clear().type(`${number}{enter}`);
};
export const verify = (data, row, quantity = false) => {
  if (quantity == false) {
    cy.get("tr")
      .eq(row)
      .invoke("text")
      .then((value) => {
        const text = value.trim().replace(/\s+/g, " ");
        cy.wrap(text).should("eq", data);
      });
  } else {
    cy.get(`input[name="${row}"]`).invoke("val").should("eq", data);
  }
};
export const verifyInformation = (ID, description, type, price) => {
  verify(ID, 1);
  verify(description, 2);
  verify(type, 3);
  verify(price, 5);
};
export const checkButtonFunctionality1 = (
  locator,
  type,
  button,
  page = "main"
) => {
  if (button == "Return to Main Menu") {
    clickButton(LOCATORS.cart, false);
    clickButton(button);
    cy.get("#Main").should("exist");
  } else {
    clickButton(locator, false);
    clickButton(type);
    clickButton(`Return to ${button}`);
    if (button == "FISH") {
      cy.get("h2").should("contain", "Fish");
    } else if (button == "DOGS") {
      cy.get("h2").should("contain", "Dogs");
    } else if (button == "CATS") {
      cy.get("h2").should("contain", "Cats");
    } else if (button == "REPTILES") {
      cy.get("h2").should("contain", "Reptiles");
    } else if (button == "BIRDS") {
      cy.get("h2").should("contain", "Birds");
    }
  }
};
// export const givePrice = (row) => {
//     cy.get("table tbody tr")
//         .eq(row)
//         .children()
//         .eq(5)
//         .invoke('text')
//         .then((value) => {
//             // cy.log(value0)
//             const stringWithDollar = value;
//             const stringWithoutDollar = stringWithDollar.replace(/\$/g, "");
//             //   cy.log(stringWithoutDollar)
//             return stringWithoutDollar;
//         })

// }
