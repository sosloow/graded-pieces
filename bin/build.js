'use strict';

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const distPath = path.resolve(__dirname, '../index.html');
const templatePath = path.resolve(__dirname, '../src/index.ejs');

const data = {
  pieces: require('../src/pieces')
};

const template = fs.readFileSync(templatePath, 'utf8');

const rendered = ejs.render(template, data)

fs.writeFileSync(distPath, rendered, 'utf8');
