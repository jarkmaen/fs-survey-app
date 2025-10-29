*** Settings ***
Library    SeleniumLibrary    timeout=5s    implicit_wait=5s
Resource    user.resource

*** Variables ***
${BROWSER}    Firefox
${TEST_ACCOUNT_NAME}    Test Account
${TEST_ACCOUNT_PASSWORD}    test1234
${TEST_ACCOUNT_USERNAME}    test_account
${URL_ACCOUNT_SETTINGS}    ${URL}/account-settings
${URL_API}    ${URL}/api
${URL_CREATE_SURVEY}    ${URL}/create-survey
${URL_LOGIN}    ${URL}/login
${URL_SIGNUP}    ${URL}/signup
${URL}    http://localhost:5173

*** Keywords ***
Clean Up Test Environment
    Close Browser

Prepare Test Environment
    [Arguments]    ${url}
    Open Browser    ${URL}    ${BROWSER}
    Make Sure Test Account Exists
    Go To    ${url}
