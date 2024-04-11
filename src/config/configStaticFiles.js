const path = require('path');
const express = require("express");

const configStaticFiles = (app) => {
    //config static files
    app.use(express.static(path.join('./', 'public')));
}

module.exports = {
    configStaticFiles
}
