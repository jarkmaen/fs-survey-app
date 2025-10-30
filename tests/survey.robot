*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/survey.resource
Test Setup    Prepare Test Environment
Test Teardown    Clean Up Test Environment

*** Test Cases ***
Adding Other Option Works
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    ${before_other}=    Get Element Count    xpath=//span[contains(@class,"question-form-other")]
    Click Element    ${ADD_OTHER_BUTTON}
    ${after_other}=    Get Element Count    xpath=//span[contains(@class,"question-form-other")]
    Should Be True    ${after_other} == ${before_other} + 1

Different Question Types Can Be Added
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    Add New Question    Check all the items you typically add to your coffee    Checkbox    Milk
    Add New Option    Sugar
    Add New Option    Syrup
    Add New Option    None
    Add New Question    What is your favorite tea flavor and why?    Comment Box
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

Empty Survey Shows All Validation Messages
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Go To    ${URL_CREATE_SURVEY}
    Wait Until Element Is Visible    ${TITLE_FIELD}
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Page Contains    Your survey needs a name.
    Wait Until Page Contains    Your survey needs a description.
    Wait Until Page Contains    Question cannot be empty.
    Wait Until Page Contains    Option cannot be empty.

Removing Options Works
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    ${before}=    Get Element Count    ${OPTION_FIELD}
    Add New Option    option-1
    Add New Option    option-2
    Add New Option    option-3
    ${after}=     Get Element Count    ${OPTION_FIELD}
    Should Be True    ${after} == ${before} + 3
    Click Element    ${DELETE_OPTION_BUTTON}
    Click Element    ${DELETE_OPTION_BUTTON}
    Click Element    ${DELETE_OPTION_BUTTON}
    Click Element    ${DELETE_OPTION_BUTTON}
    Click Element    ${DELETE_OPTION_BUTTON}
    ${after_delete}=    Get Element Count    ${OPTION_FIELD}
    Should Be True    ${after_delete} == ${before} - 2

Removing Questions Works
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    ${before}=    Get Element Count    ${QUESTION_FIELD}
    Add New Question    question-1    Multiple Choice    first_option-1
    Add New Question    question-2    Multiple Choice    first_option-2
    Add New Question    question-3    Multiple Choice    first_option-3
    ${after}=     Get Element Count    ${QUESTION_FIELD}
    Should Be True    ${after} == ${before} + 3
    Click Element    ${DELETE_QUESTION_BUTTON}
    Click Element    ${DELETE_QUESTION_BUTTON}
    Click Element    ${DELETE_QUESTION_BUTTON}
    ${after_delete}=    Get Element Count    ${QUESTION_FIELD}
    Should Be True    ${after_delete} == ${before}

Survey Creation Works
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}
