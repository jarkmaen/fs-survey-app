# Testing

The application was tested using end-to-end tests with Robot Framework and SeleniumLibrary.

## End-to-end testing

In total, 17 test cases were made to test all core functionalities. Here are the features that were tested:

### Account management (account.robot)

- Deleting an account
- Updating account name

### Survey creation and management (survey.robot, viewing.robot)

- Adding and removing options
- Adding and removing questions
- Closing surveys
- Creating surveys with different question types (Multiple Choice, Checkbox, Comment Box)
- Deleting surveys
- Sorting surveys by latest, name and time
- Validating submitted form
- Viewing active and closed surveys

### Survey lifecycle (lifecycle.robot)

- Completing the full flow of creating, responding, viewing results and deleting
- Removing all surveys created by a deleted account

### User authentication (login.robot, register.robot)

- Logging in with correct credentials
- Registering a user with validation

## Running the tests

To run the tests, first make sure you have [Python](https://www.python.org/) installed on your computer. Then after that, navigate to the project root and run these commands from your terminal:

```
# Create a virtual environment
$ python -m venv venv

# Activate the virtual environment
$ source venv/bin/activate

# Install dependencies
$ pip install robotframework robotframework-requests robotframework-seleniumlibrary

```

Before running the tests, make sure both the backend and frontend are running. You can find the instructions for starting the application in the [How to use](../README.md#how-to-use) section of the project README.

Once both are running, execute the Robot tests:

```
$ robot --outputdir tests/results tests
```

The test results can be found in the tests/results/ directory as log.html and report.html. Here's an example of what the log file looks like:

<img src="images/test_log.png">
