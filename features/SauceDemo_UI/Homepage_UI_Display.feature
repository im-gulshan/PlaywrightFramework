Feature: Sauce Demo : Display of App Logo and Products Title on the Landing Page

    Test Case Number : TC_002
    As a user i want to verify the display of App Logo and Products Title on the Landing Page

    Background: Reset the Error and Warning Messages
        Given I reset the Error and Warning Messages
        Given I reload the page

    @SauceDemo-UI-Test
    Scenario: Verify the display of App Logo and Products Title on the Landing Page
        Then I should see the "Swag Labs" in "App Logo".
        And I should see the "Products" in "Products Title".