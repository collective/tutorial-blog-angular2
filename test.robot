*** Variables ***

${HOSTNAME}             127.0.0.1
${PORT}                 4200
${SERVER}               http://${HOSTNAME}:${PORT}/
${BROWSER}              chrome
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

*** Keywords ***

a login form
  Go to  ${SERVER}/login
  Wait until page contains element  xpath=//input[@name='username']

I enter an invalid credentials
  Wait until page contains element  xpath=//input[@name='username']
  Input text  xpath=//input[@name='username']  ${INVALID_USERNAME}
  Input text  xpath=//input[@name='password']  ${INVALID_PASSWORD}
  Click Button  Log in

I am not logged in
  No operation

I see a notification that I entered invalid credentials
  Wait until page contains  Authentication failed!
  Page should contain  Authentication failed!

