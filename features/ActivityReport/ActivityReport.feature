Feature: Activity Report

Scenario: Verify the calendar on Monthly view is correct

Given User is consultant
When User is on Activity Report page
Then User sees Activity Report in Monthly view
Given User is manager
When User is on Activity Report page
Then User sees Activity Report in Monthly view