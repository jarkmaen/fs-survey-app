*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Test Setup    Open Browser    ${URL_SIGNUP}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${NAME}    John Doe
${USERNAME}    johndoe
${PASSWORD}    test1234
${NAME_FIELD}    css:input[placeholder="Please enter your name"]
${USERNAME_FIELD}    css:input[placeholder="Please enter your username"]
${PASSWORD_FIELD}    css:input[placeholder="Please enter your password"]
${SIGNUP_BUTTON}    css:button[type="submit"]

*** Test Cases ***
Registration Works With Valid Input
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    ${RANDOM}=    Evaluate    random.randint(0,1000000)    modules=random
    ${UNIQUE_USERNAME}=    Set Variable    ${USERNAME}${RANDOM}

    Wait Until Element Is Visible    ${NAME_FIELD}    timeout=${TIMEOUT}
    Input Text    ${NAME_FIELD}    ${NAME}
    Input Text    ${USERNAME_FIELD}    ${UNIQUE_USERNAME}
    Input Text    ${PASSWORD_FIELD}    ${PASSWORD}
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    John Doe    timeout=${TIMEOUT}

    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Page Contains Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]    timeout=${TIMEOUT}

Registration Fails With Empty Fields
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    Name must be at least 2 characters long.    timeout=${TIMEOUT}
    Wait Until Page Contains    Username must be at least 3 characters long.    timeout=${TIMEOUT}
    Wait Until Page Contains    Password must be at least 8 characters long.    timeout=${TIMEOUT}

Registration Fails With Existing Username
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    Input Text    ${NAME_FIELD}    ${NAME}
    Input Text    ${USERNAME_FIELD}    test
    Input Text    ${PASSWORD_FIELD}    ${PASSWORD}
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    This username is already taken.    timeout=${TIMEOUT}

Registration Fails With Short Password
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    Input Text    ${NAME_FIELD}    ${NAME}
    Input Text    ${USERNAME_FIELD}    gJrxKb3AAdrikLcw
    Input Text    ${PASSWORD_FIELD}    test
    Click Button    ${SIGNUP_BUTTON}

    Wait Until Page Contains    Password must be at least 8 characters long.    timeout=${TIMEOUT}
