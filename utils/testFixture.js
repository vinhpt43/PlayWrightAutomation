import { test as base } from '@playwright/test';
 
exports.customTest = base.extend({
  testData:{
    username:'username',
    password:'password'
  }
});