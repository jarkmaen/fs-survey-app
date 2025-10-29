*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Test Setup    Prepare Test Environment    ${URL_SIGNUP}
Test Teardown    Clean Up Test Environment

*** Test Cases ***
Registration Fails With Empty Fields
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Page Contains    Name must be at least 2 characters long.
    Wait Until Page Contains    Username must be at least 3 characters long.
    Wait Until Page Contains    Password must be at least 8 characters long.

Registration Fails With Existing Username
    Input Text    ${NAME_FIELD}    ${TEST_ACCOUNT_NAME}
    Input Text    ${USERNAME_FIELD}    ${TEST_ACCOUNT_USERNAME}
    Input Text    ${PASSWORD_FIELD}    ${TEST_ACCOUNT_PASSWORD}
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Page Contains    This username is already taken.

Registration Works With Valid Input
    ${unique_name}=    Create Unique User
    Wait Until Page Contains    Signed in as:
    Wait Until Page Contains    ${unique_name}
