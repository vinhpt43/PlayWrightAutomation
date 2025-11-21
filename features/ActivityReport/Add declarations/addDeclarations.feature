@ActivityReport @AddDeclarations
Feature: 01_Add declarations

@Scenario0101
Scenario: 0101_Verify default view is correct
Given User is consultant
When User is on Activity Report page
Then User sees common view of managee
And User sees Activity Report data in Monthly view
Given User is manager
When User is on Activity Report page
Then User sees common view of manager
And User sees no Activity Report data in Monthly view

@Scenario0102
Scenario: 0102_Verify user can declare maximum 1MD when there's only 1 MD project
Given User has only one MD project
When User is on Activity Report page
Then Submit buttons are disabled
When User inputs '1.0001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '1.00001' in project number '1'
Then Input has tooltip message 'You cannot input more than 4 digits after the comma'
And Submit buttons are disabled
When User inputs '0' in project number '1'
Then Input has tooltip message 'Please enter a number higher than 0'
And Submit buttons are disabled
When User inputs 'a' in project number '1'
Then Input has tooltip message 'Please enter a number as an effort'
And Submit buttons are disabled
When User inputs '-1' in project number '1'
Then Input has tooltip message 'Please enter a number higher than 0'
And Submit buttons are disabled
When User inputs '0.0001' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0,9999' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '1' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled

@Scenario0103
Scenario: 0103_Verify user can declare maximum 1MD when there are 2 MD projects
Given User has two MD projects
When User is on Activity Report page
And User inputs '0.9998' in project number '1'
And User inputs '0' in project number '2'
Then Input has tooltip message 'Please enter a number higher than 0'
When User inputs '0.0003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.0002 MD - 0.0016 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.0002' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0.0001' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled

@Scenario0104
Scenario: 0104_Verify user can declare maximum 8MH when there's only 1 MH project
Given User has only one MH project
When User is on Activity Report page
And User inputs '8.0001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.0001' in project number '1'
Then Submit buttons are enabled
When User inputs '7,9999' in project number '1'
Then Submit buttons are enabled
When User inputs '8' in project number '1'
Then Submit buttons are enabled

@Scenario0105
Scenario: 0105_Verify user can declare maximum 8MH when there are 2 MH projects
Given User has two MH projects
When User is on Activity Report page
And User inputs '7.9998' in project number '1'
And User inputs '0.0003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0.0002 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '0.0002' in project number '2'
Then Submit buttons are enabled
When User inputs '0.0001' in project number '2'
Then Submit buttons are enabled

@Scenario0106
Scenario: 0106_Verify user can declare maximum 1MD - 8MH when there are 1 MD and 1 MH projects
Given User has one MD and one MH projects
When User is on Activity Report page
And User inputs '8' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 1 MD - 8 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '1' in project number '1'
And User inputs '0.0001' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '8' in project number '2'
And User inputs '0.0001' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 0 MD - 0 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '1'
And User inputs '' in project number '2'
And User inputs '0.9999' in project number '1'
And User inputs '0.0009' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.0001 MD - 0.0008 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '7.9992' in project number '2'
And User inputs '0.0002' in project number '1'
Then Input has tooltip message 'Please enter a number lower or equal to 0.0001 MD - 0.0008 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled
When User inputs '' in project number '1'
And User inputs '' in project number '2'
And User inputs '0.9999' in project number '1'
And User inputs '0.0008' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '' in project number '2'
And User inputs '' in project number '1'
And User inputs '7.9992' in project number '2'
And User inputs '0.0001' in project number '1'
Then Input has no tooltip
And Submit buttons are enabled

@Scenario0107
Scenario: 0107_Verify user can input 0 for ICO
Given User has one MD project with ICO
When User is on Activity Report page
And User inputs '0' in project number '1'
Then Input has tooltip message 'Please enter a number higher than 0'
And Submit buttons are disabled
When User inputs '0.9998' in project number '1'
And User inputs '0' in project number '2'
Then Input has no tooltip
And Submit buttons are enabled
When User inputs '0.0003' in project number '2'
Then Input has tooltip message 'Please enter a number lower or equal to 0.0002 MD - 0.0016 MH which corresponds to the number of remaining effort you have to add for the selected day'
And Submit buttons are disabled

@Scenario0108 @debug
Scenario: 0108_Verify user can declare effort for other activities
Given User is consultant
And User has one MD project with ICO
When User is on Activity Report page
And User clicks on Add Other Activities button
# Then Add Other Activities form appears
And User adds '1' MH for 'Presales'