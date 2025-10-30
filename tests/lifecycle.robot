*** Settings ***
Library    SeleniumLibrary
Resource    resources/common.resource
Resource    resources/survey.resource
Test Setup    Prepare Test Environment
Test Teardown    Clean Up Test Environment

*** Test Cases ***
Deleting Account Removes Created Surveys
    # first make sure all test surveys are deleted
    Delete All Test Account Surveys

    # create new user and make two surveys
    ${unique_name}=    Create Unique User
    Go To    ${URL}
    ${before}=    Get Element Count    ${SURVEY_CARD_TITLE}
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}
    Wait Until Element Is Visible    ${SURVEY_CARD_TITLE}
    ${after}=    Get Element Count    ${SURVEY_CARD_TITLE}
    Should Be True    ${after} == ${before} + 2

    # delete user and confirm surveys are removed
    Delete Current User
    Wait Until Location Contains    ${URL}
    Wait Until Element Is Not Visible    ${SURVEY_CARD_TITLE}
    ${after_delete}=    Get Element Count    ${SURVEY_CARD_TITLE}
    Should Be True    ${after_delete} == ${before}

Survey Creation, Response, Results And Deletion
    # first make sure all test surveys are deleted
    Delete All Test Account Surveys

    # make test account and create survey for testing
    Make Sure Test Account Exists
    Login With Credentials    ${TEST_ACCOUNT_USERNAME}    ${TEST_ACCOUNT_PASSWORD}
    Fill Survey With Dummy Data
    Click Button    ${SUBMIT_BUTTON}
    Wait Until Location Contains    ${URL}

    # find newly created survey and submit response
    Find Survey Card And Close/Take/View Survey    ${TITLE}    Take Survey
    Wait Until Element Is Visible    xpath=//input[@type="radio" and @value="${OPTION_1}"]
    Click Element    xpath=//input[@type="radio" and @value="${OPTION_1}"]
    Click Button    ${SUBMIT_BUTTON}
    Close Notification Popup If Visible

    # close survey and go to "Closed Surveys" tab to view results
    Find Survey Card And Close/Take/View Survey    ${TITLE}    Close Survey
    Click Element    xpath=//a[@data-rr-ui-event-key="closed"]
    Find Survey Card And Close/Take/View Survey    ${TITLE}    View Results

    # verify results
    Wait Until Page Contains    ${OPTION_1} (1)
    Wait Until Page Contains    100.00%
    Wait Until Page Contains    ${OPTION_2} (0)
    Wait Until Page Contains    0.00%

    # delete survey from view results page and confirm removal
    Click Button    ${DELETE_SURVEY_BUTTON}
    Alert Should Be Present    Are you sure you want to remove '${TITLE}'?
    Wait Until Element Is Visible    xpath=//div[contains(@class,"notification-alert-success")]
    Element Should Contain    xpath=//div[contains(@class,"notification-alert-success")]    Survey removed successfully!
    Wait Until Page Does Not Contain    ${TITLE}
