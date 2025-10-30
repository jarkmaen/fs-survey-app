*** Settings ***
Resource    common.resource

*** Variables ***
${ADD_OPTION_BUTTON}    xpath=//span[contains(@class,"question-form-text") and text()="Add option"]
${ADD_OTHER_BUTTON}    xpath=//span[contains(@class,"question-form-text") and text()='Add "Other"']
${ADD_QUESTION_BUTTON}    xpath=//button[text()="Add Question"]
${DELETE_OPTION_BUTTON}    xpath=//div[contains(@class,"question-form")]//button[contains(@class,"btn-link")]
${DELETE_QUESTION_BUTTON}    xpath=//button[contains(@class,"question-form-delete") and contains(.,"Delete")]
${DELETE_SURVEY_BUTTON}    xpath=//button[contains(@class,"btn-danger") and text()="Delete Survey"]
${DESCRIPTION_FIELD}    css:input[placeholder="Description"]
${DESCRIPTION}    Your quick vote on coffee versus tea
${DROPDOWN_MENU}    xpath=//select[contains(@class,"form-select")]
${OPTION_1}    Coffee
${OPTION_2}    Tea
${OPTION_FIELD}    xpath=//input[@placeholder="Option"]
${QUESTION_FIELD}    xpath=//input[@placeholder="Question"]
${QUESTION}    Which drink do you prefer in the morning?
${SURVEY_CARD}    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]
${TITLE_FIELD}    css:input[placeholder="Survey Title"]
${TITLE}    Morning Drink Preference

*** Keywords ***
Add New Question
    [Arguments]    ${question}    ${question_type}    ${first_option}=${EMPTY}
    Click Element    ${ADD_QUESTION_BUTTON}
    ${web_elements}=    Get WebElements    ${QUESTION_FIELD}
    Input Text    ${web_elements[-1]}    ${question}
    IF    "${question_type}" != "Comment Box"
        ${web_elements}=    Get WebElements    ${OPTION_FIELD}
        Input Text    ${web_elements[-1]}    ${first_option}
    END
    ${web_elements}=    Get WebElements    ${DROPDOWN_MENU}
    Select From List By Label    ${web_elements[-1]}    ${question_type}

Add New Option
    [Arguments]    ${option}
    ${web_elements}=    Get WebElements    ${ADD_OPTION_BUTTON}
    Click Element    ${web_elements[-1]}
    ${web_elements}=    Get WebElements    ${OPTION_FIELD}
    Input Text    ${web_elements[-1]}    ${option}

Fill Survey With Dummy Data
    [Arguments]    ${survey_title}=${TITLE}
    Go To    ${URL_CREATE_SURVEY}
    Wait Until Element Is Visible    ${TITLE_FIELD}
    Input Text    ${TITLE_FIELD}    ${TITLE}
    Input Text    ${DESCRIPTION_FIELD}    ${DESCRIPTION}
    Input Text    ${QUESTION_FIELD}    ${QUESTION}
    Input Text    ${OPTION_FIELD}    ${OPTION_1}
    Add New Option    ${OPTION_2}

Find Survey Card And Close/Take/View Survey
    [Arguments]    ${survey_title}    ${action}
    Wait Until Element Is Visible    xpath=//p[contains(@class,"survey-card-title") and text()="${survey_title}"]
    IF    "${action}" != ""
        Click Element    xpath=//div[contains(@class,"survey-card")]//a[contains(@class,"survey-card-button") and text()="${action}"] | //div[contains(@class,"survey-card")]//button[contains(@class,"survey-card-button") and text()="${action}"]
    END

Delete All Test Account Surveys
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Delete Current User
