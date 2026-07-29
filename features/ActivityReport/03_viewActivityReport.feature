@ActivityReport @viewActivityReport
Feature: 03_View activity report

@Scenario0301
Scenario: 0301_Verify default view is correct
Given User is consultant
When User is on Activity Report page
Then User sees common view of managee
And User sees Activity Report data in Monthly view
Given User is manager
When User is on Activity Report page
Then User sees common view of manager
And User sees no Activity Report data in Monthly view

@Scenario0302
Scenario: 0302_Verify declaration status is displayed correctly
Given User has declared efforts
When User is on Activity Report page
And User hovers on declared effort number '1'
Then Status tooltip reads "Draft"
When User hovers on declared effort number '2'
Then Status tooltip reads "Pending for validation"
When User hovers on declared effort number '3'
Then Status tooltip reads "Rejected"
When User hovers on declared effort number '4'
Then Status tooltip reads "Valid"
When User hovers on rejected declarations icon
Then Tooltip reads "2 rejected"


@Scenario0303
Scenario: 0303_Verify Timesheet data is shown on Activity Report
Given User is consultant
And User has a full day PH
When User is on Activity Report page
Then The day appears as 'OFF'
And User cannot input effort
Given User has a PHO
When User is on Activity Report page
Then The day appears as 'PHO'
And User cannot input effort
Given User has a half day PH
When User is on Activity Report page
Then The day appears as '1/2 OFF'
And User can input effort
Given User has a weekend
When User is on Activity Report page
Then The day appears as 'OFF'
And User cannot input effort