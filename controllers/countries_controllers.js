const { body, validationResult } = require('express-validator');

const countries = require('../countriesDatabase');


const countryFinder = code => {
    // console.log(code);
    if (!code) return null;
    const countryCode = code.toUpperCase();
    // console.log(countryCode);
    // console.log(countries);
    const temp = countries.find(country => (country.alpha2Code === countryCode) || (country.alpha3Code === countryCode));
    return temp; //returns the country object
}

// const getAllCountries = (req, res) => {
//     try {
//         if (req.query.sort === 'true') {
//             const compare = (a, b) => {
//                 if (a.name < b.name)
//                     return -1;
//                 if (a.name > b.name)
//                     return 1;
//                 return 0;
//             }
//             const countriesSorted = [...countries].sort(compare)
//             res.status(200).json(countriesSorted)
//         } else {
//             res.status(200).json(countries)
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         })
//     }
// };


const getAllCountries = (req, res) => {
    // const {
    //     query: { sort }
    // } = req;
    try {
        if ((req.query.sort) === 'true') //if(sort==='true)
        {
            // console.log('here');
            return res.status(201).json(countries.sort((a, b) => {
                let x = a.name.toLowerCase(),
                    y = b.name.toLowerCase();
                return x === y ? 0 : x > y ? 1 : -1; //http://localhost:5000/api/countries?sort=true
            }));
        } else {
            return res.status(201).json(countries); //http://localhost:5000/api/countries?sort=false
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const getCountryByCode = (req, res) => {
    try {
        const { code } = req.params;
        // console.log(req.params.code);
        console.log(code);
        const country = countryFinder(code)
        console.log(country);
        if (country) {
            return res.status(200).json(country)
        } else {
            return res.status(404).json({
                message: "Country not found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const createCountry = (req, res) => {
    try {
        const { code } = req.params;
        const { name, alpha2Code, alpha3Code } = req.body;
        const country = countryFinder(code);
        if (country) {
            res.json({ message: "country already exists" })
        } else {
            const countryCreated = {
                id: countries.length + 1,
                name: name,
                alpha2Code: alpha2Code,
                alpha3Code: alpha3Code
            }
            countries.push(countryCreated);
            res.status(201).json(countryCreated);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





module.exports = { getAllCountries, getCountryByCode, createCountry };