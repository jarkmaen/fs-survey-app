*** Settings ***
Resource    common.resource

*** Keywords ***
Register New User
    [Arguments]    ${NAME}    ${USERNAME}    ${PASSWORD}

    Go To    ${URL_SIGNUP}

    Wait Until Element Is Visible    css:input[placeholder="Please enter your name"]    timeout=${TIMEOUT}
    Input Text    css:input[placeholder="Please enter your name"]    ${NAME}
    Input Text    css:input[placeholder="Please enter your username"]    ${USERNAME}
    Input Text    css:input[placeholder="Please enter your password"]    ${PASSWORD}
    Click Button    css:button[type="submit"]

    Wait Until Page Contains    Signed in as:    timeout=${TIMEOUT}
    Wait Until Page Contains    ${NAME}    timeout=${TIMEOUT}

Create Unique User
    [Arguments]    ${USERNAME}    ${password}=${PASSWORD}    ${name}=${NAME}

    ${RANDOM}=    Evaluate    random.randint(0,1000000)    modules=random
    ${UNIQUE_USERNAME}=    Set Variable    ${USERNAME}${RANDOM}

    Register New User    ${name}    ${UNIQUE_USERNAME}    ${password}

    [Return]    ${UNIQUE_USERNAME}
