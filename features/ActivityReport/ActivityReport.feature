@ActivityReport 
Feature: Activity Report

@Regression @UI
Scenario: 01_Verify default view is correct
Given User is consultant
When User is on Activity Report page
Then User sees common view of managee
And User sees Activity Report data in Monthly view
Given User is manager
When User is on Activity Report page
Then User sees common view of manager
And User sees no Activity Report data in Monthly view

@Regression @UI
Scenario: 02_Verify user can declare maximum 1MD when there's only 1 MD project
Given User has only one MD project
When User is on Activity Report page
Then Submit buttons are disabled
When User inputs '1.001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0' in project number '1'
Then Input has tooltip message 'Please enter a number higher than 0'
And Submit buttons are disabled
When User inputs 'a' in project number '1'
Then Input has tooltip message 'Please enter a number as an effort'
And Submit buttons are disabled
When User inputs '-1' in project number '1'
Then Input has tooltip message 'Please enter a number as an effort'
And Submit buttons are disabled
When User inputs '0.001' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0,999' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '1' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled

@Regression @UI
Scenario: 03_Verify user can declare maximum 1MD when there are 2 MD projects
Given User has two MD projects
When User is on Activity Report page
And User inputs '0.998' in project number '1'
And User inputs '0' in project number '2'
Then Input has tooltip message 'Please enter a number higher than 0'
When User inputs '0.003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.002 MD - 0.016 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.002' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0.001' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled

@Regression @UI
Scenario: 04_Verify user can declare maximum 8MH when there's only 1 MH project
Given User has only one MH project
When User is on Activity Report page
And User inputs '8.001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.001' in project number '1'
Then Submit buttons are enabled
When User inputs '7,999' in project number '1'
Then Submit buttons are enabled
When User inputs '8' in project number '1'
Then Submit buttons are enabled

@Regression @UI
Scenario: 05_Verify user can declare maximum 8MH when there are 2 MH projects
Given User has two MH projects
When User is on Activity Report page
And User inputs '7.998' in project number '1'
And User inputs '0.003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0.002 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.002' in project number '2'
Then Submit buttons are enabled
When User inputs '0.001' in project number '2'
Then Submit buttons are enabled

@Regression @UI
Scenario: 06_Verify user can declare maximum 1MD - 8MH when there are 1 MD and 1 MH projects
Given User has one MD and one MH projects
When User is on Activity Report page
And User inputs '8' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '1' in project number '1'
And User inputs '0.001' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '8' in project number '2'
And User inputs '0.001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '1'
And User inputs '' in project number '2'
And User inputs '0.999' in project number '1'
And User inputs '0.009' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.001 MD - 0.008 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '7.992' in project number '2'
And User inputs '0.002' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 0.001 MD - 0.008 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '1'
And User inputs '' in project number '2'
And User inputs '0.999' in project number '1'
And User inputs '0.008' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '7.992' in project number '2'
And User inputs '0.001' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled

@Regression @UI
Scenario: 07_Verify user can input 0 for ICO
Given User has one MD project with ICO
When User is on Activity Report page
And User inputs '0' in project number '1'
Then Input has tooltip message 'Please enter a number higher than 0'
And Submit buttons are disabled
When User inputs '0.998' in project number '1'
And User inputs '0' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0.003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.002 MD - 0.016 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled

@Regression @UI @debug
Scenario: 08_Verify user can edit maximum 1MD when there's only 1 MD project
Given User has declared efforts
When User is on Activity Report page
When User edits '8.001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 0.5 M/D - 4 M/H which corresponds to the number of remaining effort you have to add for the selected day'
And Save button is disabled
# When User inputs '0' in project number '1'
# Then Input has tooltip message 'Please enter a number higher than 0'
# And Submit buttons are disabled
# When User inputs 'a' in project number '1'
# Then Input has tooltip message 'Please enter a number as an effort'
# And Submit buttons are disabled
# When User inputs '-1' in project number '1'
# Then Input has tooltip message 'Please enter a number as an effort'
# And Submit buttons are disabled
# When User inputs '0.001' in project number '1'
# Then Input has no tooltip
# And Submit buttons are enabled
# When User inputs '0,999' in project number '1'
# Then Input has no tooltip
# And Submit buttons are enabled
# When User inputs '1' in project number '1'
# Then Input has no tooltip
# And Submit buttons are enabled