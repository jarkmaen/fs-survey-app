*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Test Setup    Open Browser    ${URL_LOGIN}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${USERNAME}    test
${PASSWORD}    test1234
${USERNAME_FIELD}    css:input[type="username"]
${PASSWORD_FIELD}    css:input[type="password"]
${LOGIN_BUTTON}    css:button[type="submit"]

*** Test Cases ***
Login Works With Correct Credentials
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    Input Text    ${USERNAME_FIELD}    ${USERNAME}
    Input Text    ${PASSWORD_FIELD}    ${PASSWORD}
    Click Button    ${LOGIN_BUTTON}

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    ${USERNAME}    timeout=${TIMEOUT}

    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Page Contains Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]    timeout=${TIMEOUT}

Login Fails With Wrong Credentials
    Set Selenium Implicit Wait    ${IMPLICIT_WAIT}

    Input Text    ${USERNAME_FIELD}    non
    Input Text    ${PASSWORD_FIELD}    sense
    Click Button    ${LOGIN_BUTTON}

    Wait Until Page Contains    Incorrect username or password.    timeout=${TIMEOUT}
