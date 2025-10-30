*** Settings ***
Library    SeleniumLibrary
Library    ../venv/Lib/site-packages/robot/libraries/Collections.py
Resource    resources/common.resource
Resource    resources/survey.resource
Test Setup    Prepare Test Environment
Test Teardown    Clean Up Test Environment

*** Test Cases ***
Sorting By Latest, Name And Time Works
    # first make sure all test surveys are deleted
    Delete All Test Account Surveys

    # make test account and create 3 unique surveys
    Make Sure Test Account Exists
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}

    # survey 1
    Set Global Variable    ${TITLE}    AAAAA
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

    # survey 2
    Set Global Variable    ${TITLE}    ZZZZZ
    Fill Survey With Dummy Data
    Add New Question    question-1    Multiple Choice    option-1
    Add New Option    option-2
    Add New Question    question-2    Multiple Choice    option-1
    Add New Option    option-2
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

    # survey 3
    Set Global Variable    ${TITLE}    BBBBB
    Fill Survey With Dummy Data
    Add New Question    question    Comment Box
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

    # test all 3 sorting options
    Sort Surveys By Latest/Name/Time    Time
    ${web_elements}=    Get WebElements    ${SURVEY_CARD_TIME}
    ${text}=    Get Text    ${web_elements[0]}
    ${previous_time}=    Convert Time String To Float    ${text}
    FOR    ${element}    IN    @{web_elements}
        ${text}=    Get Text    ${element}
        ${current_time}=    Convert Time String To Float    ${text}
        Should Be True    ${previous_time} >= ${current_time}
        ${previous_time}    Set Variable    ${current_time}
    END

    Sort Surveys By Latest/Name/Time    Name
    ${web_elements}=    Get WebElements    xpath=//p[contains(@class,"survey-card-title")]
    ${previous_title}=    Get Text    ${web_elements[0]}
    FOR    ${element}    IN    @{web_elements}
        ${current_title}=    Get Text    ${element}
        Should Be True    "${previous_title}" <= "${current_title}"
        ${previous_title}=    Set Variable    ${current_title}
    END

    Sort Surveys By Latest/Name/Time    Latest
    ${web_elements}=    Get WebElements    xpath=//p[contains(@class,"survey-card-title")]
    ${title_1}=    Get Text    ${web_elements[0]}
    ${title_2}=    Get Text    ${web_elements[1]}
    ${title_3}=    Get Text    ${web_elements[2]}
    Should Be Equal As Strings    ${title_1}    BBBBB
    Should Be Equal As Strings    ${title_2}    ZZZZZ
    Should Be Equal As Strings    ${title_3}    AAAAA

    # back to default value
    Set Global Variable    ${TITLE}    Morning Drink Preference

Switching Between Active And Closed Surveys Works
    # first make sure all test surveys are deleted
    Delete All Test Account Surveys

    # make test account and create one active and one closed survey
    Make Sure Test Account Exists
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}
    Find Survey Card And Close/Take/View Survey    ${TITLE}    Close Survey
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

    # check if there is one closed and one active survey
    Wait Until Element Is Visible    ${ACTIVE_SURVEYS_BUTTON}
    Click Element    ${ACTIVE_SURVEYS_BUTTON}
    Wait Until Element Is Visible    ${SURVEY_CARD_TITLE}
    ${count}=    Get Element Count    ${SURVEY_CARD_TITLE}
    Should Be True	${count} == 1
    Click Element    ${CLOSED_SURVEYS_BUTTON}
    Wait Until Element Is Visible    ${SURVEY_CARD_TITLE}
    ${count}=    Get Element Count    ${SURVEY_CARD_TITLE}
    Should Be True	${count} == 1
