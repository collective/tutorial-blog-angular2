*** Settings ***
Documentation  Feature: As a user I can log in
Resource  keywords.robot

*** Test Cases ***

Scenario: User enters invalid credentials
  Given a login form
   When I enter an invalid credentials
   Then I am not logged in
    and I see a notification that I entered invalid credentials

Scenario: User enters valid credentials
  Given a registered user
    and a login form
   When I enter valid credentials
   Then I am logged in
    and I see a notification that I am logged in

Scenario: Logout
  Given a logged in user
   When I click on logout
   Then I am logged out
    and I am redirected to the login page


*** Keywords ***

# Given

# When

# Then

