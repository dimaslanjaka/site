'use strict';

process.cwd = () => __dirname;
process.env.NODE_ENV = 'dev';

const path = require('path');
const gulp = require('gulp')
const sbg = require('static-blog-generator');
const api = sbg.api.Application(__dirname)

