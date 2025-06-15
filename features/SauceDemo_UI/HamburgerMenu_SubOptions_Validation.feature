Feature: Sauce Demo : Verify HamburgerMenu Sub Options

    Test Case Number : TC_001
    As a user i want to Verify if all the subOptions of HamburgerMenu

    Background: Reset the Error and Warning Messages
        Given I reset the Error and Warning Messages
        Given I reload the page

    @SauceDemo-UI-Test
    Scenario: Verify all the subOptions of Hamburger Menu
        When I navigate to the "followings".
            | Menu           | Action |
            | Hamburger Menu | Click  |

        Then I should see the "All Items, About, Logout, Reset App State" in "Hamburger Menu SubOptions".