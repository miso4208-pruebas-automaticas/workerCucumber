@CRUDHabit
Feature: CRUD of a Habit into Habitica
    As an user I want to do the CRUD of a habit on habitica website

Scenario Outline: Add a Habit

    Given I go to habitica home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    And I add a Habit called <name>
    Then I expect to habit <name> has be created

      Examples:
        | email                 | password       | error  |name                       |
        | fakeUser1@fake.com    | pruebas201902  |        |Habito de pruebas cucumber |

Scenario Outline: Edit a Habit

    #Comment Given I go to habitica home screen
    #Comment When I open the login screen
    #Comment And I fill with <email> and <password>
    #Comment And I try to login
    #Comment And I edit a Habit called <name>
    #Comment Then I expect to habit <name> has be created

      Examples:
        | email                 | password       | error  |name                       |
        | fakeUser1@fake.com    | pruebas201902  |        |Habito de pruebas cucumber |
