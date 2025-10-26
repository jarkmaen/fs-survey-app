*** Settings ***
Library    SeleniumLibrary    implicit_wait=${IMPLICIT_WAIT}

*** Variables ***
${BROWSER}    Firefox
${IMPLICIT_WAIT}    5s
${TIMEOUT}    5s
${URL}    http://localhost:5173
${URL_LOGIN}    ${URL}/login
${URL_SIGNUP}    ${URL}/signup
