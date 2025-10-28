*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/survey.resource
Test Setup    Open Browser    ${URL_CREATE_SURVEY}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${USERNAME}    test
${PASSWORD}    test1234

${TITLE}    Title
${DESCRIPTION}    Description
${ADD_QUESTION_BUTTON}    xpath=//button[text()="Add Question"]

*** Test Cases ***
Survey Creation Works
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    Fill First Question With Option    ${QUESTION_TEXT}    ${OPTION_TEXT}

    Click Button    ${CREATE_SURVEY_BUTTON}
    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

Creation With Multiple Question Types
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    Fill First Question With Option    ${QUESTION_TEXT}    ${OPTION_TEXT}

    Click Element    ${ADD_QUESTION_BUTTON}
    ${Q_COUNT}=    Get Element Count    ${QUESTION_INPUT}
    Should Be True    ${Q_COUNT} >= 2

    Select From List By Label    xpath=(//select[contains(@class,"form-select")])[2]    Comment Box

    Input Text    xpath=(//input[@placeholder="Question"])[2]    Another question

    Click Button    ${CREATE_SURVEY_BUTTON}
    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

Add And Remove Questions
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    Fill First Question With Option    ${QUESTION_TEXT}    ${OPTION_TEXT}

    ${BEFORE}=    Get Element Count    ${QUESTION_INPUT}
    Click Element    ${ADD_QUESTION_BUTTON}
    ${AFTER}=     Get Element Count    ${QUESTION_INPUT}
    Should Be True    ${AFTER} == ${BEFORE} + 1

    Click Element    xpath=(//button[contains(., "Delete")])[1]
    ${AFTER_DELETE}=    Get Element Count    ${QUESTION_INPUT}
    Should Be True    ${AFTER_DELETE} == ${BEFORE}

Add And Remove Options
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    
    FOR    ${I}    IN RANGE    2
        Click Element    xpath=(//span[contains(@class,"question-form-text") and text()="Add option"])[1]
        Wait Until Element Is Visible    xpath=(//div[contains(@class,"question-form")])[1]//input[@placeholder="Option"][last()]    timeout=${TIMEOUT}
    END

    ${VALUES}=    Create List    Option A    Option B    Option C
    ${I}=    Set Variable    0
    ${ELEMENTS}=    Get WebElements    xpath=(//div[contains(@class,"question-form")])[1]//input[@placeholder="Option"]
    FOR    ${ELEMENT}    IN    @{ELEMENTS}
        ${VALUE}=    Get Element Attribute    ${ELEMENT}    value
        Run Keyword If    '${VALUE}' == ''    Input Text    ${ELEMENT}    ${VALUES}[${i}]
        ${I}=    Evaluate    ${I}+1
    END

    ${O_COUNT}=    Get Element Count    xpath=(//div[contains(@class,"question-form")])[1]//input[@placeholder="Option"]
    Should Be True    ${O_COUNT} >= 3

    FOR    ${I}    IN RANGE    3
        Wait Until Element Is Visible    xpath=(//div[contains(@class,"question-form")])[1]//button[contains(@class,"btn-link")][1]    timeout=${TIMEOUT}
        Click Element    xpath=(//div[contains(@class,"question-form")])[1]//button[contains(@class,"btn-link")][1]
    END

    ${O_COUNT}=    Get Element Count    xpath=(//div[contains(@class,"question-form")])[1]//input[@placeholder="Option"]
    Should Be True    ${O_COUNT} == 0

Add Other Option
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    Fill First Question With Option    ${QUESTION_TEXT}    ${OPTION_TEXT}

    ${BEFORE_OTHER}=    Get Element Count    xpath=(//div[contains(@class,"question-form")])[1]//span[contains(@class,"question-form-other")]

    Click Element    xpath=(//div[contains(@class,"question-form")])[1]//span[contains(., 'Add "Other"')]

    Wait Until Element Is Visible    xpath=(//div[contains(@class,"question-form")])[1]//span[contains(@class,"question-form-other")]    timeout=${TIMEOUT}

    ${AFTER_OTHER}=    Get Element Count    xpath=(//div[contains(@class,"question-form")])[1]//span[contains(@class,"question-form-other")]
    Should Be True    ${AFTER_OTHER} == ${BEFORE_OTHER} + 1

Empty Survey Shows All Validation Messages
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}

    Wait Until Element Is Visible    ${CREATE_SURVEY_BUTTON}    timeout=${TIMEOUT}
    Click Button    ${CREATE_SURVEY_BUTTON}

    Wait Until Page Contains    Your survey needs a name.    timeout=${TIMEOUT}
    Wait Until Page Contains    Your survey needs a description.    timeout=${TIMEOUT}
    Wait Until Page Contains    Question cannot be empty.    timeout=${TIMEOUT}
    Wait Until Page Contains    Option cannot be empty.    timeout=${TIMEOUT}
