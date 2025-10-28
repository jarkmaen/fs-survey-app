*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/survey.resource
Resource    resources/user.resource
Test Setup    Open Browser    ${URL}    ${BROWSER}
Test Teardown    Close Browser

*** Variables ***
${NAME}    John Doe
${USERNAME}    test
${PASSWORD}    test1234

${TITLE}    Lifecycle Survey
${DESCRIPTION}    E2E test
${DELETE_ACCOUNT_ITEM}    xpath=//div[contains(@class,"account-settings-item") and .//span[contains(., "Delete Account")]]
${DELETE_ACCOUNT_BUTTON}    xpath=//button[text()="Delete Account"]

*** Test Cases ***
Survey Creation, Response, Results And Deletion
    Open Create Survey Page    ${USERNAME}    ${PASSWORD}
    Fill Basic Survey Info    ${TITLE}    ${DESCRIPTION}
    Fill First Question With Option    ${QUESTION_TEXT}    ${OPTION_TEXT}

    Click Button    ${CREATE_SURVEY_BUTTON}
    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

    # open survey from list and submit a response
    Wait Until Element Is Visible    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]    timeout=${TIMEOUT}
    Click Element    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]/ancestor::div[contains(@class,"survey-card")]//a[contains(@class,"survey-card-button")]

    Wait Until Element Is Visible    xpath=//input[@type="radio" and @value="${OPTION_TEXT}"]    timeout=${TIMEOUT}
    Click Element    xpath=//input[@type="radio" and @value="${OPTION_TEXT}"]
    Click Button    css:button[type="submit"]

    # survey creator must close the survey before results are visible -> return to list and close it
    Go To    ${URL}
    Wait Until Element Is Visible    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]    timeout=${TIMEOUT}
    Click Element    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]/ancestor::div[contains(@class,"survey-card")]//button[contains(@class,"btn-danger")]

    # open Closed Surveys tab and view results
    Run Keyword And Ignore Error    Click Element    xpath=//a[@data-rr-ui-event-key="closed" or text()="Closed Surveys"]
    Wait Until Element Is Visible    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]    timeout=${TIMEOUT}
    Click Element    xpath=//p[contains(@class,"survey-card-title") and text()="${TITLE}"]/ancestor::div[contains(@class,"survey-card")]//a[contains(normalize-space(.),"View Results")]

    # verify results content
    Wait Until Page Contains    ${OPTION_TEXT} (1)    timeout=${TIMEOUT}
    Wait Until Page Contains    100.00%    timeout=${TIMEOUT}

    # delete the survey from results page and confirm removal
    Click Button    xpath=//button[contains(@class,"btn-danger")]
    Sleep    0.1s
    Alert Should Be Present    Are you sure you want to remove '${TITLE}'?    timeout=${TIMEOUT}

    Wait Until Element Is Visible    xpath=//div[contains(@class,"notification-alert-success")]    10s
    Element Should Contain    xpath=//div[contains(@class,"notification-alert-success")]    Survey removed successfully!
    Wait Until Page Does Not Contain    ${TITLE}    timeout=${TIMEOUT}

Account Deletion Removes Created Surveys
    ${UNIQUE_USERNAME}=    Create Unique User    ${USERNAME}    ${PASSWORD}    ${NAME}

    # create first survey
    Go To    ${URL_CREATE_SURVEY}

    Fill Basic Survey Info    ${TITLE}-1    ${DESCRIPTION}-1
    Fill First Question With Option    ${QUESTION_TEXT}-1    ${OPTION_TEXT}-1

    Click Button    ${CREATE_SURVEY_BUTTON}
    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

    # create second survey
    Go To    ${URL_CREATE_SURVEY}

    Fill Basic Survey Info    ${TITLE}-2    ${DESCRIPTION}-2
    Fill First Question With Option    ${QUESTION_TEXT}-2    ${OPTION_TEXT}-2

    Click Button    ${CREATE_SURVEY_BUTTON}
    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}

    # delete account and ensure surveys removed
    Go To    ${URL_ACCOUNT_SETTINGS}

    Wait Until Element Is Visible    ${DELETE_ACCOUNT_ITEM}    timeout=${TIMEOUT}
    Click Element    ${DELETE_ACCOUNT_ITEM}

    Wait Until Element Is Visible    ${DELETE_ACCOUNT_BUTTON}    timeout=${TIMEOUT}
    Click Button    ${DELETE_ACCOUNT_BUTTON}

    Wait Until Location Contains    ${URL}    timeout=${TIMEOUT}
    Wait Until Page Does Not Contain    ${TITLE}-1    timeout=${TIMEOUT}
    Wait Until Page Does Not Contain    ${TITLE}-2    timeout=${TIMEOUT}
