*** Settings ***
Library    RequestsLibrary
Resource    common.resource

*** Variables ***
${DELETE_ACCOUNT_BUTTON}    xpath=//button[text()="Delete Account"]
${DELETE_ACCOUNT_ITEM}    xpath=//div[contains(@class,"account-settings-item") and .//span[contains(., "Delete Account")]]
${NAME_FIELD}    css:input[placeholder="Please enter your name"]
${PASSWORD_FIELD}    css:input[placeholder="Please enter your password"]
${USERNAME_FIELD}    css:input[placeholder="Please enter your username"]

*** Keywords ***
Create Unique User
    ${random}=    Evaluate    random.randint(0,1000000)    modules=random
    ${unique_name}=    Set Variable    ${TEST_ACCOUNT_NAME}-${random}
    ${unique_username}=    Set Variable    ${TEST_ACCOUNT_USERNAME}-${random}
    Register New User    ${unique_name}    ${unique_username}    ${TEST_ACCOUNT_PASSWORD}
    RETURN    ${unique_name}

Delete Current User
    Go To    ${URL_ACCOUNT_SETTINGS}
    Wait Until Element Is Visible    ${DELETE_ACCOUNT_ITEM}
    Click Element    ${DELETE_ACCOUNT_ITEM}
    Wait Until Element Is Visible    ${DELETE_ACCOUNT_BUTTON}
    Click Button    ${DELETE_ACCOUNT_BUTTON}
    Wait Until Location Contains    ${URL}

Login With Credentials
    [Arguments]    ${username}    ${password}
    Go To    ${URL_LOGIN}
    Wait Until Element Is Visible    ${USERNAME_FIELD}
    Input Text    ${USERNAME_FIELD}    ${username}
    Input Text    ${PASSWORD_FIELD}    ${password}
    Click Button    ${SUBMIT_BUTTON}
    ${login}=    Run Keyword And Return Status    Wait Until Page Contains    Signed in as:
    RETURN    ${login}

Logout Current User
    Click Element    xpath=//div[contains(@class,"dropdown")]/a
    Wait Until Element Is Visible    xpath=//a[contains(@class,"dropdown-item") and text()="Logout"]
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
    Wait Until Page Contains    ${name}
