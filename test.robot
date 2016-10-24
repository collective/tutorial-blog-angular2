*** Variables ***

${HOSTNAME}             localhost
${PORT}                 4200
${SERVER}               http://${HOSTNAME}:${PORT}/
${BROWSER}              chrome
${VALID_USERNAME}       admin
${VALID_PASSWORD}       admin
${INVALID_USERNAME}     invalid
${INVALID_PASSWORD}     invalid


*** Settings ***

Documentation   Acceptance Tests
Library         Process
Library         DebugLibrary
Library         Selenium2Library  timeout=10  implicit_wait=0
Suite Setup     Test Setup
Suite Teardown  Test Teardown


*** Keywords ***

Test Setup
  ${server_process}=  Start Process  ng serve  cwd=${CURDIR}  shell=true
  Set Suite Variable  ${SERVER_PROCESS}  ${server_process}
  Sleep  25s
  Open Browser  ${SERVER}  ${BROWSER}
  Set Window Size  1280  1024

Test Teardown
  Close Browser
  Log  ${SERVER_PROCESS}
  Terminate Process  ${SERVER_PROCESS}


*** Test Cases ***

Scenario: As a visitor I can visit the front page
  Go To  ${SERVER}
  Wait until page contains  Home
  Page Should Contain  Home

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

# Scenario: Create blogpost
#   Given a logged in user
#    When I create a blogpost with the title 'Colorless Green Ideas'
#    Then I can see a blogpost with the title 'Colorless Green Ideas'

#Scenario: User searches
#  Given a search form
#    and blogpost with the title ''
#   When I search for ''
#   Then I see the blogpost '

*** Keywords ***

# Given

a login form
  Go to  ${SERVER}/login
  Wait until page contains element  xpath=//input[@name='username']

a registered user
  No operation

a logged in user
  Go to  ${SERVER}/login
  I enter valid credentials

# When

I enter an invalid credentials
  Wait until page contains element  xpath=//input[@name='username']
  Input text  xpath=//input[@name='username']  ${INVALID_USERNAME}
  Input text  xpath=//input[@name='password']  ${INVALID_PASSWORD}
  Click Button  Log in

I enter valid credentials
  Wait until page contains element  xpath=//input[@name='username']
  Input text  xpath=//input[@name='username']  ${VALID_USERNAME}
  Input text  xpath=//input[@name='password']  ${VALID_PASSWORD}
  Click Button  Log in

I create a blogpost with the title '${title}'
  Go to  ${SERVER}
  Wait until page contains element  css=#create-blogpost-form
  Click button  css=#create-blogpost-form
  Wait until page contains element  xpath=//input[@name='title']
  Input Text  xpath=//input[@name='title']  ${title}
  Click button  css=#create-blogpost-button
  Wait until page contains  Create Blog Post

# Then

I am not logged in
  No operation

I am logged in
  No operation

I see a notification that I entered invalid credentials
  Wait until page contains  Authentication failed!
  Page should contain  Authentication failed!

I see a notification that I am logged in
  No operation

I can see a blogpost with the title '${title}'
  Go to  ${SERVER}
  Wait until page contains  ${title}
  Page should contain  ${title}

