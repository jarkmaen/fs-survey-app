*** Settings ***
Library    RequestsLibrary
Resource    common.resource

*** Variables ***
${NAME_FIELD}    css:input[placeholder="Please enter your name"]
${PASSWORD_FIELD}    css:input[placeholder="Please enter your password"]
${SUBMIT_BUTTON}    css:button[type="submit"]
${USERNAME_FIELD}    css:input[placeholder="Please enter your username"]

*** Keywords ***
Create Unique User
    ${random}=    Evaluate    random.randint(0,1000000)    modules=random
    ${unique_name}=    Set Variable    ${TEST_ACCOUNT_NAME}-${random}
    ${unique_username}=    Set Variable    ${TEST_ACCOUNT_USERNAME}-${random}
    Register New User    ${unique_name}    ${unique_username}    ${TEST_ACCOUNT_PASSWORD}
    RETURN    ${unique_name}

Login With Credentials
    [Arguments]    ${username}    ${password}
    Go To    ${URL_LOGIN}
    Wait Until Element Is Visible    ${USERNAME_FIELD}
    Input Text    ${USERNAME_FIELD}    ${username}
    Input Text    ${PASSWORD_FIELD}    ${password}
    Sleep    5s
    Click Button    ${SUBMIT_BUTTON}
    ${login}=    Run Keyword And Return Status    Wait Until Page Contains    Signed in as:
    RETURN    ${login}

Logout Current User
    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Page Contains Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]
    Click Element    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]
    Wait Until Page Contains    Log in or Sign up

Make Sure Test Account Exists
    Create Session    session    ${URL_API}
    ${response}=    GET On Session    session    /users
    Should Be Equal As Integers    ${response.status_code}    200
    ${accounts}=    Set Variable    ${response.json()}
    ${exists}=    Set Variable    ${False}
    FOR    ${account}    IN    @{accounts}
        IF    "${account['username']}" == "${TEST_ACCOUNT_USERNAME}"
            Set Test Variable    ${exists}    ${True}
            Exit For Loop
        END
    END
    IF    ${exists} == ${False}
        Register New User    ${TEST_ACCOUNT_NAME}    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
        Logout Current User
    END

Register New User
    [Arguments]    ${name}    ${username}    ${password}
    Go To    ${URL_SIGNUP}
    Wait Until Element Is Visible    ${NAME_FIELD}
    Input Text    ${NAME_FIELD}    ${name}
    Input Text    ${USERNAME_FIELD}    ${username}
    Input Text    ${PASSWORD_FIELD}    ${password}
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Page Contains    Signed in as:
    Wait Until Page Contains    ${NAME}
