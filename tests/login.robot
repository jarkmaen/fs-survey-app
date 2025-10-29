*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Test Setup    Prepare Test Environment    ${URL_LOGIN}
Test Teardown    Clean Up Test Environment

*** Test Cases ***
Login Fails With Wrong Credentials
    ${login}=    Login With Credentials    non    sense
    Should Not Be True    ${login}

Login Works With Correct Credentials
    ${login}=    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Should Be True    ${login}
