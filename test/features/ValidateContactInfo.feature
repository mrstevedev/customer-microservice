Feature: When a user submits their basic information
  
  The user needs to be informed if the information is valid.

  Scenario: We have recieved a message that does not have a first name
    Given A ContactInfo object
    When the firstName field does not have a value
    Then The error The first name must not be empty will be returned
    And the system will continue to the next test

  Scenario: We have recieved a message that does not have a Last name
    Given A ContactInfo object
    When the lastName field does not have a value
    Then The error The last name must not be empty will be returned
    And the system will continue to the next test

  Scenario: We have received a message that does not have a well formed email
    Given A ContactInfo object
    When the email field is not well formed
    Then The error The email given must be valid will be returned
    And the system will continue to the next test

  Scenario: We have recieved a message that is not well formed
    Given the results of validation
    When a validation has an error
    Then return the text of all errors
    And return the status of 400

  Scenario: We have recieved a message with a duplicate id
    Given a value in the id field
    When that id has already been registered
    Then return the text of all errors
    And return the status of 409

  Scenario: We have recieved a valid message
    Given the results of validation
    When no validation errors are found
    Then send the message to the persistance service
    And return the status of 201