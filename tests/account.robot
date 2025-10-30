*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Test Setup    Prepare Test Environment
Test Teardown    Clean Up Test Environment

*** Variables ***
${CHANGE_ACCOUNT_NAME_FIELD}    css:input[placeholder="Enter name"]
${CHANGE_ACCOUNT_NAME_ITEM}    xpath=//div[contains(@class,"account-settings-item") and .//span[contains(., "Change Account Name")]]
${NEW_NAME}    New Name

*** Test Cases ***
Account Deletion Works And Prevents Login
    ${unique_name}=    Create Unique User
    Delete Current User
    ${login}=    Login With Credentials    ${unique_name}    ${TEST_ACCOUNT_PASSWORD}
    Should Not Be True    ${login}

Account Name Can Be Updated
    ${unique_name}=    Create Unique User
    Go To    ${URL_ACCOUNT_SETTINGS}
    Wait Until Element Is Visible    ${CHANGE_ACCOUNT_NAME_ITEM}
    Click Element    ${CHANGE_ACCOUNT_NAME_ITEM}
    Wait Until Element Is Visible    ${CHANGE_ACCOUNT_NAME_FIELD}
    Input Text    ${CHANGE_ACCOUNT_NAME_FIELD}    ${NEW_NAME}
    Click Button    xpath=//button[text()="Update Name"]
    Wait Until Page Contains    Signed in as:
    Wait Until Page Contains    ${NEW_NAME}
