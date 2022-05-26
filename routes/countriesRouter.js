const express = require('express');


// const { body, validationResult } = require('express-validator');


const { getAllCountries, createCountry } = require('../controllers/countries_controllers');

const countriesRouter = express.Router();

countriesRouter.route('/').get(getAllCountries).post(createCountry);


module.exports = countriesRouter;