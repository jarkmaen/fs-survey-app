*** Settings ***
Resource    common.resource
Resource    user.resource

*** Variables ***
${TITLE_FIELD}    css:input[placeholder="Survey Title"]
${DESCRIPTION_FIELD}    css:input[placeholder="Description"]
${QUESTION_INPUT}    css:input[placeholder="Question"]
${QUESTION_TEXT}    What is your favorite color?
${OPTION_INPUT}    css:input[placeholder="Option"]
${OPTION_TEXT}    Red
${CREATE_SURVEY_BUTTON}    css:button[type="submit"]

*** Keywords ***
Open Create Survey Page
    [Arguments]    ${USERNAME}    ${PASSWORD}

    Login With Credentials    ${USERNAME}    ${PASSWORD}

    Go To    ${URL_CREATE_SURVEY}

    Wait Until Element Is Visible    css:button[type="submit"]    timeout=${TIMEOUT}

Fill Basic Survey Info
    [Arguments]    ${title}=${TITLE}    ${description}=${DESCRIPTION}

    Wait Until Element Is Visible    ${TITLE_FIELD}    timeout=${TIMEOUT}
    Input Text    ${TITLE_FIELD}    ${title}
    Input Text    ${DESCRIPTION_FIELD}    ${description}

Fill First Question With Option
    [Arguments]    ${QUESTION_TEXT}    ${OPTION_TEXT}

    Wait Until Element Is Visible    ${QUESTION_INPUT}    timeout=${TIMEOUT}
    Input Text    ${QUESTION_INPUT}    ${QUESTION_TEXT}

    Wait Until Element Is Visible    ${OPTION_INPUT}    timeout=${TIMEOUT}
    Input Text    ${OPTION_INPUT}    ${OPTION_TEXT}
