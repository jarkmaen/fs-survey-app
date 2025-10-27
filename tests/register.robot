*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/user.resource
Test Setup    Open Browser    ${URL_SIGNUP}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${NAME}    John Doe
${USERNAME}    test
${PASSWORD}    test1234
${NAME_FIELD}    css:input[placeholder="Please enter your name"]
${USERNAME_FIELD}    css:input[placeholder="Please enter your username"]
${PASSWORD_FIELD}    css:input[placeholder="Please enter your password"]
${SIGNUP_BUTTON}    css:button[type="submit"]

*** Test Cases ***
Registration Works With Valid Input
    ${UNIQUE_USERNAME}=    Create Unique User    ${USERNAME}    ${PASSWORD}    ${NAME}

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    John Doe    timeout=${TIMEOUT}

Registration Fails With Empty Fields
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    Name must be at least 2 characters long.    timeout=${TIMEOUT}
    Wait Until Page Contains    Username must be at least 3 characters long.    timeout=${TIMEOUT}
    Wait Until Page Contains    Password must be at least 8 characters long.    timeout=${TIMEOUT}

Registration Fails With Existing Username
    Input Text    ${NAME_FIELD}    ${NAME}
    Input Text    ${USERNAME_FIELD}    test
    Input Text    ${PASSWORD_FIELD}    ${PASSWORD}
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    This username is already taken.    timeout=${TIMEOUT}

Registration Fails With Short Password
    Input Text    ${NAME_FIELD}    ${NAME}
    Input Text    ${USERNAME_FIELD}    gJrxKb3AAdrikLcw
    Input Text    ${PASSWORD_FIELD}    test
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    Password must be at least 8 characters long.    timeout=${TIMEOUT}
