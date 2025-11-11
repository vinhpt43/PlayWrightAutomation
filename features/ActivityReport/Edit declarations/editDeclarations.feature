@EditDeclarations
Feature: Edit declarations

@Regression @UI @debug
Scenario: 08_Verify user can edit maximum 1MD/8MH in a day
Given User has declared efforts
When User is on Activity Report page
And User expands the projects list
When User edits declared effort number '1'
And User modifies the effort to '1.001'
Then Input has tooltip message 'Please enter a number lower or equal to 0.125 M/D - 1 M/H which corresponds to the number of remaining effort you have to add for the selected day'
And Save button is disabled
When User modifies the effort to '-1'
Then Input has tooltip message 'Please enter a number as an effort'
And Save button is disabled
When User modifies the effort to 'a'
Then Input has tooltip message 'Please enter a number as an effort'
And Save button is disabled
When User modifies the effort to '0'
Then Input has tooltip message 'Please enter a number higher than 0'
And Save button is disabled
When User modifies the effort to '0.999'
Then Input has no tooltip
And Save button is enabled
When User cancels edition
When User edits declared effort number '5'
And User modifies the effort to '0.501'
Then Input has tooltip message 'Please enter a number lower or equal to 0.5 M/D - 4 M/H which corresponds to the number of remaining effort you have to add for the selected day'
And Save button is disabled
When User modifies the effort to '0'
Then Input has no tooltip
And Save button is enabled
When User modifies the effort to '0.499'
And Save button is enabled
When User cancels edition
When User edits declared effort number '6'
When User modifies the effort to '-1'
Then Input has tooltip message 'Please enter a number as an effort'
And Save button is disabled
When User modifies the effort to 'a'
Then Input has tooltip message 'Please enter a number as an effort'
And Save button is disabled
When User modifies the effort to '0'
Then Input has tooltip message 'Please enter a number higher than 0'
And Save button is disabled
When User modifies the effort to '8.001'
Then Input has no tooltip
And Save button is enabled