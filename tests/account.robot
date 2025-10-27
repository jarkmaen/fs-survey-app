*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/user.resource
Test Setup    Open Browser    ${URL_ACCOUNT_SETTINGS}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${NAME}    Old Name
${NEW_NAME}    New Name
${USERNAME}    test
${PASSWORD}    test1234

${CHANGE_ACCOUNT_NAME_ITEM}    xpath=//div[contains(@class,"account-settings-item") and .//span[contains(., "Change Account Name")]]
${NAME_CHANGE_FIELD}    css:input[placeholder="Enter name"]
${UPDATE_NAME_BUTTON}    xpath=//button[text()="Update Name"]
${DELETE_ACCOUNT_ITEM}    xpath=//div[contains(@class,"account-settings-item") and .//span[contains(., "Delete Account")]]
${DELETE_ACCOUNT_BUTTON}    xpath=//button[text()="Delete Account"]

*** Test Cases ***
Account Name Can Be Updated
    ${UNIQUE_USERNAME}=    Create Unique User    ${USERNAME}    ${PASSWORD}    ${NAME}

    Go To    ${URL_ACCOUNT_SETTINGS}

    Wait Until Element Is Visible    ${CHANGE_ACCOUNT_NAME_ITEM}    timeout=${TIMEOUT}
    Click Element    ${CHANGE_ACCOUNT_NAME_ITEM}

    Wait Until Element Is Visible    ${NAME_CHANGE_FIELD}    timeout=${TIMEOUT}
    Input Text    ${NAME_CHANGE_FIELD}    ${NEW_NAME}
    Click Button    ${UPDATE_NAME_BUTTON}

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    ${NEW_NAME}    timeout=${TIMEOUT}

Account Deletion Works And Prevents Login
    ${UNIQUE_USERNAME}=    Create Unique User    ${USERNAME}    ${PASSWORD}    ${NAME}

    Go To    ${URL_ACCOUNT_SETTINGS}

    Wait Until Element Is Visible    ${DELETE_ACCOUNT_ITEM}    timeout=${TIMEOUT}
    Click Element    ${DELETE_ACCOUNT_ITEM}

    Wait Until Element Is Visible    ${DELETE_ACCOUNT_BUTTON}    timeout=${TIMEOUT}
    Click Button    ${DELETE_ACCOUNT_BUTTON}

    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

    Go To    ${URL_LOGIN}
    
    Wait Until Element Is Visible    css:input[placeholder="Please enter your username"]    timeout=${TIMEOUT}
    Input Text    css:input[placeholder="Please enter your username"]    ${UNIQUE_USERNAME}
    Input Text    css:input[placeholder="Please enter your password"]    ${PASSWORD}
    Click Button    css:button[type="submit"]

    Wait Until Page Contains    Incorrect username or password.    timeout=${TIMEOUT}
