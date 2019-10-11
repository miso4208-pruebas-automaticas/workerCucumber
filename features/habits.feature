@Login
Feature: add a Habit into Habitica
    As an user I want to add a habit on habitica website

Scenario Outline: Add a Habit

    Given I go to habitica home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    And I add a Habit called <name>
    Then I expect to habit has be created

      Examples:
        | email                 | password       | error  |name                       |
        | fakeUser1@fake.com    | pruebas201902  |        |Habito de pruebas cucumber |
