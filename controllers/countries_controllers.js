const { body, validationResult } = require('express-validator');

const countries = [{
        "id": 1,
        "name": "Bhutan",
        "alpha2Code": "BT",
        "alpha3Code": "BTN"
    },
    {
        "id": 2,
        "name": "Austria",
        "alpha2Code": "AT",
        "alpha3Code": "AUT"
    },


    {
        "id": 4,
        "name": "France",
        "alpha2Code": "FR",
        "alpha3Code": "FRA"
    },
    {
        "id": 3,
        "name": "Norway",
        "alpha2Code": "NO",
        "alpha3Code": "NOR"
    },

    {
        "id": 5,
        "name": "India",
        "alpha2Code": "IN",
        "alpha3Code": "IND"
    }

];

const countryFinder = code => {
    if (!code) return null;
    const countryCode = code.toUpperCase();
    return countries.find(country => country.alpha2Code === countryCode || country.alpha3Code === countryCode);
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





module.exports = { getAllCountries, createCountry };