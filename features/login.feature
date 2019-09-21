@Login
Feature: Login into Habitica
    As an user I want to authenticate myself within habitica website in order to play with habits

Scenario Outline: Login failed with wrong inputs

  Given I go to habitica home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    Then I expect to see <error>

    Examples:
      | email            | password | error                        |
      |                  |          | Missing username or email.   |
      |                  |    1234  | Missing username or email.   |
      | miso@gmail.com   |          | Missing password            |

Scenario Outline: Login success

    #Comment Given I go to habitica home screen
    #Comment   When I open the login screen
    #Comment   And I fill with <email> and <password>
    #Comment   And I try to login
    #Comment   Then I expect to see user button

      Examples:
        | email            | password       | error  |
        | fake1@fake.com   | pruebas201902  |        |
