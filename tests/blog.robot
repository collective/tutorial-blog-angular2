*** Settings ***
Documentation  Feature: As a user I can view blog posts
Resource  keywords.robot

*** Test Cases ***

Scenario: User views blog overview page
  Given an anonymous user
    and two blog posts
   When I go to the blog overview page
   Then I can see two blog posts

Scenario: User navigates to blog post
  Given an anonymous user
    and a blog post
    and the blog overview page
   When I click on the blog post
   Then I am redirected to the blog post
    and I can see the blog post

Scenario: User navigates to blog overview
  Given an anonymous user
    and a blog post view
   When I navigate to the blog overview page
   Then I can see the blog overview page


*** Keywords ***

# Given

# When

# Then

