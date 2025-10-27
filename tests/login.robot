*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/user.resource
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
    Login With Credentials    ${USERNAME}    ${PASSWORD}

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    ${USERNAME}    timeout=${TIMEOUT}

    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Page Contains Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]    timeout=${TIMEOUT}

Login Fails With Wrong Credentials
    Login With Credentials    non    sense

    Wait Until Page Contains    Incorrect username or password.    timeout=${TIMEOUT}
