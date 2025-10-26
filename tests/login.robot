*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource

*** Variables ***
${USERNAME}    test
${PASSWORD}    test1234
${USERNAME_FIELD}    css:input[type="username"]
${PASSWORD_FIELD}    css:input[type="password"]
${LOGIN_BUTTON}    css:button[type="submit"]

*** Test Cases ***
Login Works With Correct Credentials
    Open Browser    ${URL_LOGIN}    ${BROWSER}
    Set Selenium Implicit Wait    5s

    Input Text    ${USERNAME_FIELD}    ${USERNAME}
    Input Text    ${PASSWORD_FIELD}    ${PASSWORD}
    Click button    ${LOGIN_BUTTON}

    Wait Until Page Contains    Signed in as:    timeout=5s
    Wait Until Page Contains    ${USERNAME}    timeout=5s

    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Page Contains Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]    timeout=5s

    Close Browser

Login Fails With Wrong Credentials
    Open Browser    ${URL_LOGIN}    ${BROWSER}
    Set Selenium Implicit Wait    5s

    Input Text    ${USERNAME_FIELD}    non
    Input Text    ${PASSWORD_FIELD}    sense
    Click Button    ${LOGIN_BUTTON}

    Wait Until Page Contains    Incorrect username or password.    timeout=5s

    Close Browser
