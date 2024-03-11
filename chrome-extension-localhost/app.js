const express = require('express');
const fs = require('fs');
const https = require('https');
const cookieSession = require('cookie-session')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const converter = require("units-converter");
const cors = require('cors')

let recipeDetails;

const app = express();
const port = 8080;


const use_https = true;
app.set('trust proxy', 1)
app.set("view engine", "ejs");
app.use(cors())
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(express.json());

// app.options('*', cors());

app.use(cookieSession({
    name: 'session',
    keys: ['secret']
}))

app.get('/setToken', function(req, res) {
    var url = "https://api.kroger.com/v1/connect/oauth2/token";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic Y2xpY2tub3JkZXItNTYzMTU0ZGI1ZWZiYmFkNDE2NjEwN2Y0M2MxMDEwMGExOTkxNzcxOTE4MzEwNTQyNDgwOjlFdXF2Z2tPS3Q4d0U5NmxXQ2lVTDRlOG91RE5Qc1Rla0E5VjdZS1U=");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText)
            req.session.token = response.access_token
            res.redirect('/loading')
        }};

    var data = "grant_type=client_credentials&scope=product.compact";

    xhr.send(data);
});

app.get('/loading', function(req, res) {
    res.render('loading')
});

app.get('/', function(req, res) {
    let results = setDetails(req.session.token)
    let title = results.Title
    let products = results.results
    res.render('index', {title: title, products : products})
});

function setDetails(token){
    let details = recipeDetails.details

    for (let i in details){
        let product = details[i].product
        getIngredientInfo(token, product)
    }

    let results = getPrices()
    return results
}

function getPrices(){
    let title = recipeDetails.recipe
    let new_details = recipeDetails.details

    let final_res = []

    for (let i in new_details){
        let product = new_details[i].product
        let quantity = new_details[i].quantity
        let unit_price = new_details[i].price
        if (new_details[i].unit !== new_details[i].krogerUP.unit){
            if (new_details[i].krogerUP.unit.includes('ct')){
                new_details[i].krogerUP.unit = 'ct'
                new_details[i].krogerUP.quantity = new_details[i].krogerUP.quantity.match(/[0-9]/)[0]
            } if (new_details[i].krogerUP.unit === 'lb'){
                new_details[i].krogerUP.quantity = converter.mass(new_details[i].krogerUP.quantity).from('lb').to('oz').value
                new_details[i].krogerUP.unit = 'oz'
            }
        }

        // console.log(`Product: ${product}, Quantity Kroger: ${new_details[i].krogerUP.quantity}, Quantity: ${quantity}, Unit: ${new_details[i].krogerUP.unit}, Unit Price: ${unit_price}`)

        let recipe_price = (parseFloat(quantity)/parseFloat(new_details[i].krogerUP.quantity)) * parseFloat(unit_price)

        final_res.push({'name': product, 'amount': quantity + ' ' + new_details[i].krogerUP.unit, 'recipePrice': parseFloat(recipe_price.toFixed(2)), 'ingredientPrice': unit_price})
    }
    console.log(final_res)
    return {'Title': title, 'results': final_res}
}

app.post('/recipes', function(req, res) {
    // getIngredientInfo(token, 'eggs')
    let zestfulResponse = req.body
    res.sendStatus(200)
    let results = zestfulResponse.results
    console.log(`Recipe: ${zestfulResponse.Title}`)
    recipeDetails = {"recipe": zestfulResponse.Title, "details":[]}
    for (let i in results){
        let result = results[i]
        let parsed = result.ingredientParsed
        let prepNotes = parsed.preparationNotes
        let product = parsed.product
        let quantity = parsed.quantity
        let unit = parsed.unit

        if (unit !== null){
            if (unit === 'liter') {
                quantity = converter.volume(quantity).from('l').to('fl-oz').value
                unit = 'fl oz'
            }  if (unit === 'gram') {
                quantity = converter.mass(quantity).from('g').to('oz').value
                unit = 'oz'
            }  if (unit === 'kilogram'){
                quantity = converter.mass(quantity).from('kg').to('oz').value
                unit = 'oz'
            } if (unit === 'teaspoon'){
                quantity = null
            } if (unit === 'tablespoon'){
                quantity = null
            } if (quantity !== null){
                quantity = parseFloat(quantity.toFixed(2))
            }

        } else {
            unit = 'ct'
        }

        if (product !== null){
            if (product.includes('coriander')) {
                product = 'cilantro'
            } if (product.includes('chicken breasts') && unit === 'ct') {
                quantity = quantity * 6
                unit = 'oz'
            } if (product.includes('jam')) {
                product.replace('jam', 'preserves')
            }  if (product.includes('jelly')) {
                product.replace('jelly', 'jell-o')
            }  if (product === 'coriander') {
                product ='cilantro'
            }  if (product.includes('aubergine')) {
                product = 'eggplant'
            }  if (product === 'rapeseed oil') {
                product = 'canola oil'
            }  if (product === 'plain flour') {
                product = 'all purpose flour'
            } if (product.includes('courgette')) {
                product = 'zucchini'
            }  if (product.includes('biscuit')) {
                product.replace('biscuit', 'cookie')
            }  if (product.includes('gherkin')) {
                product.replace('gherkin', 'pickle')
            }  if (product.includes('mince')) {
                product.replace('mince', 'ground meat')
            }  if (product.includes('spring onions')) {
                product.replace('spring onions', 'green onions')
            }  if (product.includes('semi-skimmed milk')) {
                product = 'skim milk'
            }  if (product === 'icing sugar'){
                product = 'confectioner\'s sugar'
            }  if (product.match(/\d*\sg/g)){
                let match = product.match(/\d*\sg/g)
                let weight = match[0].replace('g', '').trim()
                quantity = quantity * weight
                quantity = converter.mass(quantity).from('g').to('oz').value
                unit = 'oz'
            }  if (product.includes('pastry')) {
                product = 'pie dough'
            }
        }

        if (prepNotes !== null){
            if (prepNotes.includes('baps')){
                product = 'buns'
            }
        }

        let details = {"product":product, "quantity": quantity, "unit": unit}
        recipeDetails.details.push(details)
        // console.log(`Product: ${product}, Quantity: ${quantity}, Unit: ${unit}`)

    }

});

function getIngredientInfo(token, ingredient){
    let xj = new XMLHttpRequest();
    xj.open("GET", `https://api.kroger.com/v1/products?filter.term=${ingredient}&filter.locationId=01400943&filter.limit=1`, false);
    xj.setRequestHeader("Accept", "application/json");
    xj.setRequestHeader("Authorization", `Bearer ${token}`)
    xj.send()

    let results = xj.responseText;
    results = JSON.parse(results)
    let data = results.data
    let item = data[0].description
    let price = data[0].items[0].price.regular
    let unit = data[0].items[0].size
    for (let i in recipeDetails.details) {
        if (recipeDetails.details[i].product === ingredient) {
            recipeDetails.details[i].product = item
            recipeDetails.details[i].price = price
            let quantity = unit.replace(/[a-z]/g, '').trim()
            let weight = unit.replace(/[0-9]/g, '').trim()
            recipeDetails.details[i].krogerUP = {'quantity': quantity, 'unit': weight}
        }}
}


if (use_https){
    https.createServer({
            key: fs.readFileSync('./CA/dssCoursework2.com+5-key.pem'),
            cert: fs.readFileSync('./CA/dssCoursework2.com+5.pem')
        }, app
    ).listen(port, () => {
        console.log(`Example app listening on port ${port}! [HTTPS]`)
        console.log('***************')
    })
} else{
    console.warn('HTTPS is disabled. Data send through HTTP is not secure.')
    app.listen(port, function() {
        console.log(`Example app listening on port ${port}! [HTTP]`);
        console.log('***************')
    });
};