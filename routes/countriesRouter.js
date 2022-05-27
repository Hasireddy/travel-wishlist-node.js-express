const express = require('express');


// const { body, validationResult } = require('express-validator');


const { getAllCountries, getCountryByCode, createCountry } = require('../controllers/countries_controllers');

const countriesRouter = express.Router();

countriesRouter.route('/').get(getAllCountries).post(createCountry);

countriesRouter.route('/:code').get(getCountryByCode);


module.exports = countriesRouter;