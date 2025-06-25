@ActivityReport 
Feature: Activity Report

@Regression
Scenario: Verify default view is correct
Given User is consultant
When User is on Activity Report page
Then User sees common view of managee
And User sees Activity Report data in Monthly view
Given User is manager
When User is on Activity Report page
Then User sees common view of manager
And User sees no Activity Report data in Monthly view

@Regression
Scenario: Verify user can save and send activity report
Given User is consultant
When User is on Activity Report page