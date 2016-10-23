*** Variables ***

${HOSTNAME}             127.0.0.1
${PORT}                 4200
${SERVER}               http://${HOSTNAME}:${PORT}/
${BROWSER}              chrome


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
