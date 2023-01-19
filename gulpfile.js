'use strict';

process.cwd = () => __dirname;
process.env.NODE_ENV = 'dev';

const path = require('path');
const gulp = require('static-blog-generator');

console.log(gulp);
