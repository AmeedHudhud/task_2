import * as storeHelper from "./support/JPetStoreHelper";
/**
 * test case to check this page "https://petstore.octoperf.com/actions/Catalog.action"
 */
const VALID_CREDENTIALS = {
    NAME: "ameed",
    PASSWORD: "ameed0595",
};
const INVALID_CREDENTIALS = {
    NAME: "qqq",
    PASSWORD: "12345",
};
const FISH = {
    NAME: 'FISH',
    ANGEL_FISH: "FI-SW-01",
    LARGE_ANGEL_FISH: "EST-1",
    SMALL_ANGEL_FISH: "EST-2",

    TYPE: 'Angelfish',
    DESCRIPTION: 'Large Angelfish',
    PRICE: '$16.50'
};
const DOG = {
    NAME: 'DOG',
    BULL_DOG: "K9-BD-01",
    MALE_ADULT_BULL_DOg: "EST-6",
    FEMALE_PUPPY_BULL_DOG: "EST-7",
};
const CAT = {
    NAME: 'CAT',
    MANX: "FL-DSH-01",
    TAILLESS_MAX: "EST-14",
};
const REPTILES = {
    NAME: 'REPTILES',
    IGUANA: "RP-LI-02",
    GREEN_ADULT_IGUANA: "EST-13",
};
const BIRD = {
    NAME: 'BIRD',
    FINCH: "AV-SB-02",
    ADULT_MALE_FINCH: "EST-19",
};

// it.only('test', () => {
//     cy.visit("https://petstore.octoperf.com/actions/Catalog.action");
//     // storeHelper.addProducts(
//     //     [{
//     //             type: storeHelper.LOCATORS.fish,
//     //             name: FISH.ANGEL_FISH,
//     //             Description: FISH.LARGE_ANGEL_FISH,
//     //         },
//     //         {
//     //             type: storeHelper.LOCATORS.fish,
//     //             name: FISH.ANGEL_FISH,
//     //             Description: FISH.LARGE_ANGEL_FISH,
//     //         },
//     //     ],
//     //     false
//     // );
//     // storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
//     //     //   storeHelper.givePrice(1)
//     //     // storeHelper.giveQuantity(FISH.LARGE_ANGEL_FISH)
//     //     // storeHelper.checkTotalCost(FISH.LARGE_ANGEL_FISH, 1)
//     // cy.contains('Sub Total:').invoke('text').then((text) => {
//     //     const subtotal = text.match(/\$([\d.]+)/)[1];
//     //     cy.log(subtotal);
//     // });


// })

describe("JPetStore", () => {
    beforeEach(() => {
        cy.visit("https://petstore.octoperf.com/actions/Catalog.action");
    });
    it("sign in by invalid user name and valid password", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(
            INVALID_CREDENTIALS.NAME,
            VALID_CREDENTIALS.PASSWORD,
            false
        );
    });
    it("sign in by invalid passworrd and valid user name", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(
            VALID_CREDENTIALS.NAME,
            INVALID_CREDENTIALS.PASSWORD,
            false
        );
    });
    it("sign in by only fill username", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(VALID_CREDENTIALS.NAME, "", false);
    });
    it("sign in by only fill password", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin("", VALID_CREDENTIALS.PASSWORD, false);
    });
    it("sign in by valid user name and valid password ", () => {
        storeHelper.clickButton(storeHelper.WORD_REGISTRY.SIGNIN);
        storeHelper.signin(VALID_CREDENTIALS.NAME, VALID_CREDENTIALS.PASSWORD);
    });
    it("add product from menu to cart and make sure it is added ", () => {
        storeHelper.addProducts([{
                type: FISH.NAME,
                name: FISH.ANGEL_FISH,
                Description: FISH.LARGE_ANGEL_FISH,
            },
            {
                type: CAT.NAME,
                name: CAT.MANX,
                Description: CAT.TAILLESS_MAX,
            },
            {
                type: DOG.NAME,
                name: DOG.BULL_DOG,
                Description: DOG.FEMALE_PUPPY_BULL_DOG,
            },
        ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.verifyProductExistence([FISH.LARGE_ANGEL_FISH, CAT.TAILLESS_MAX, DOG.FEMALE_PUPPY_BULL_DOG])

    });
    it("add product from information page for product to cart and make sure it is added", () => {
        storeHelper.addProducts([{
                type: FISH.NAME,
                name: FISH.ANGEL_FISH,
                Description: FISH.LARGE_ANGEL_FISH,
            },
            {
                type: CAT.NAME,
                name: CAT.MANX,
                Description: CAT.TAILLESS_MAX,
            },
            {
                type: DOG.NAME,
                name: DOG.BULL_DOG,
                Description: DOG.FEMALE_PUPPY_BULL_DOG,
            },
        ], false);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.verifyProductExistence([FISH.LARGE_ANGEL_FISH, CAT.TAILLESS_MAX, DOG.FEMALE_PUPPY_BULL_DOG])
    });
    it.only("remove product from cart and make sure it is removed", () => {// bug in (EST-1)
        storeHelper.addProducts([
            {
            type: FISH.NAME,
            name: FISH.ANGEL_FISH,
            Description: FISH.SMALL_ANGEL_FISH,
        },
        {
            type: CAT.NAME,
            name: CAT.MANX,
            Description: CAT.TAILLESS_MAX,
        },
        {
            type: DOG.NAME,
            name: DOG.BULL_DOG,
            Description: DOG.FEMALE_PUPPY_BULL_DOG,
        },
    ], false);
        storeHelper.clickButton(storeHelper.LOCATORS.cart,false)
        storeHelper.removeFromCart([FISH.SMALL_ANGEL_FISH, DOG.FEMALE_PUPPY_BULL_DOG]);
        storeHelper.verifyProductExistence([FISH.SMALL_ANGEL_FISH, DOG.FEMALE_PUPPY_BULL_DOG],false)
    });
    it('Verify click in "Return to main menu" button and redirect to main page', () => {

        // cart->main menu
        
        // fish->type->click
        // click in fish ->clich in type

        storeHelper.checkButtonFunctionality(
            storeHelper.WORD_REGISTRY.RETURN_TO_MAIN_PAGE_BUTTON
        );
    });
    it(`Verify click in "Return to 'product name'" button and return to product page`, () => {
        storeHelper.checkButtonFunctionality1(storeHelper.LOCATORS.reptiles, REPTILES.IGUANA, "REPTILES");
    });
    it("verify from cart is empty before add any iteam", () => {
        
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false);
        storeHelper.textExistence(
            storeHelper.WORD_REGISTRY.PRODUCTS_TABLE,
            storeHelper.MESSAGE.EMPTY_MESSAGE
        );
    });
    it('verify the cart will be empty after delete all product', () => {
        storeHelper.addProducts([{
                type: storeHelper.LOCATORS.fish,
                name: FISH.ANGEL_FISH,
                Description: FISH.LARGE_ANGEL_FISH,
            },
            {
                type: storeHelper.LOCATORS.dog,
                name: DOG.BULL_DOG,
                Description: DOG.FEMALE_PUPPY_BULL_DOG,
            },
            {
                type: storeHelper.LOCATORS.cat,
                name: CAT.MANX,
                Description: CAT.TAILLESS_MAX,
            },
        ]);
        storeHelper.removeFromCart([FISH.LARGE_ANGEL_FISH, DOG.FEMALE_PUPPY_BULL_DOG, CAT.TAILLESS_MAX]);
        storeHelper.textExistence(
            storeHelper.WORD_REGISTRY.PRODUCTS_TABLE,
            storeHelper.MESSAGE.EMPTY_MESSAGE
        );

    })
    it("verify from total cost", () => {
        storeHelper.addProducts(
            [{
                    type: storeHelper.LOCATORS.fish,
                    name: FISH.ANGEL_FISH,
                    Description: FISH.LARGE_ANGEL_FISH,
                },
                {
                    type: storeHelper.LOCATORS.fish,
                    name: FISH.ANGEL_FISH,
                    Description: FISH.LARGE_ANGEL_FISH,
                },
            ],
            false
        );
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.checkTotalCost(FISH.LARGE_ANGEL_FISH, 1)
    });
    it('verify from sub total', () => {
        storeHelper.addProducts([{
                type: storeHelper.LOCATORS.fish,
                name: FISH.ANGEL_FISH,
                Description: FISH.LARGE_ANGEL_FISH,
            },
            {
                type: storeHelper.LOCATORS.dog,
                name: DOG.BULL_DOG,
                Description: DOG.FEMALE_PUPPY_BULL_DOG,
            },
            {
                type: storeHelper.LOCATORS.cat,
                name: CAT.MANX,
                Description: CAT.TAILLESS_MAX,
            },
        ]);

        storeHelper.checkSubTotal()
    })
    it('edit quantity and make sure it is modified', () => {
        storeHelper.addProducts(
            [{
                type: storeHelper.LOCATORS.fish,
                name: FISH.ANGEL_FISH,
                Description: FISH.LARGE_ANGEL_FISH,
            }, ],
            false
        )
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.changeQantity(FISH.LARGE_ANGEL_FISH, '10')
        storeHelper.verify('10', FISH.LARGE_ANGEL_FISH, true)
    })
    it('verify from change cost after change quantity', () => {
        storeHelper.addProducts([{
            type: storeHelper.LOCATORS.fish,
            name: FISH.ANGEL_FISH,
            Description: FISH.LARGE_ANGEL_FISH,
        }, ]);
        storeHelper.clickButton(storeHelper.LOCATORS.cart, false)
        storeHelper.changeQantity(FISH.LARGE_ANGEL_FISH, '10')
        storeHelper.checkTotalCost(FISH.LARGE_ANGEL_FISH, 1)


    })
    it('verify from product information', () => {
        storeHelper.clickButton(storeHelper.LOCATORS.fish, false)
        storeHelper.clickButton(FISH.ANGEL_FISH)
        storeHelper.clickButton(FISH.LARGE_ANGEL_FISH)
        storeHelper.verifyInformation(FISH.LARGE_ANGEL_FISH, FISH.DESCRIPTION, FISH.TYPE, FISH.PRICE)
    })
});