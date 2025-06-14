Feature: Sauce Demo : Verify HamburgerMenu Sub Options

    As a user i want to Verify if all the option are present in HamburgerMenu

    Background: Reset the Error and Warning Messages
        Given I reset the Error and Warning Messages
        Given I reload the page

    @SauceDemo-UI-Test
    Scenario: Verify HamburgerMenu Sub Options
        When I click on the Hamburger Menu
            | Menu      | Action |
            | Open Menu | Click  |
# Then I should see the following sub options in Hamburger Menu:
#     | optionName          |
#     | All Items           |
#     | About               |
#     | Logout              |
#     | Reset App State     |
#     | Close Menu          |
# And I should not see any error or warning messages