chrome.storage.local.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
});

chrome.storage.local.get('recipes', function (result) {
        let output = result.recipes
        let titles = [];

        for (let i = 0; i < output.length; i++) {
            let recipe = JSON.parse(output[i])
            titles.push(recipe.Title.replaceAll("\"", ""))
            createBoxes(recipe)
        }

        // let json = JSON.parse(output[2])
        // let ingredients = json.Ingredients
        // for (let i in ingredients){
        //     ingredients[i] = ingredients[i].replace(/['"\[\]]+/g, ``)
        // }
        // let zestfulData = {"ingredients": ingredients}
        // var url = "https://sandbox.zestfuldata.com/parseIngredients";
        //
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", url);
        //
        // xhr.setRequestHeader("Content-Type", "application/json");
        //
        // let zestfulResponse;
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4) {
        //         console.log(xhr.status);
        //         console.log(xhr.responseText);
        //         zestfulResponse = xhr.responseText
        //     }};
        //
        // var data = JSON.stringify(zestfulData)
        // xhr.send(data);

        // chrome.tabs.create({ url: "https://localhost:8080/setToken" });
        // let title = JSON.stringify(titles[2])
        // let zestfulResponse = `{"Title": ${title}, "requestsRemaining": 19, "results": [{"ingredientRaw": "2 large skinless  chicken breasts", "confidence": 0.989507, "ingredientParsed": {"product": "skinless chicken breasts", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": "large", "unit": null, "quantity": 2.0}, "error": null}, {"ingredientRaw": "100g plain flour", "confidence": 0.800566, "ingredientParsed": {"product": "plain flour", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": null, "unit": "gram", "quantity": 100.0}, "error": null}, {"ingredientRaw": "1 egg , beaten", "confidence": 0.9824617, "ingredientParsed": {"product": "egg", "usdaInfo": {"category": "Dairy and Egg Products", "matchMethod": "exact", "description": "Egg, whole, raw, fresh", "fdcId": "171287"}, "preparationNotes": "beaten", "productSizeModifier": null, "unit": null, "quantity": 1.0}, "error": null}, {"ingredientRaw": "splash of milk", "confidence": 0.8282917, "ingredientParsed": {"product": "milk", "usdaInfo": {"category": "Dairy and Egg Products", "matchMethod": "closestUnbranded", "description": "Milk, fluid, 1% fat, without added vitamin A and vitamin D", "fdcId": "173441"}, "preparationNotes": "splash of", "productSizeModifier": null, "unit": null, "quantity": null}, "error": null}, {"ingredientRaw": "3 tbsp ground  almonds", "confidence": 0.9238765, "ingredientParsed": {"product": "almonds", "usdaInfo": {"category": "Nut and Seed Products", "matchMethod": "exact", "description": "Nuts, almonds", "fdcId": "170567"}, "preparationNotes": "ground", "productSizeModifier": null, "unit": "tablespoon", "quantity": 3.0}, "error": null}, {"ingredientRaw": "1 tbsp sesame seeds", "confidence": 0.9921439000000001, "ingredientParsed": {"product": "sesame seeds", "usdaInfo": {"category": "Nut and Seed Products", "matchMethod": "exact", "description": "Seeds, sesame seeds, whole, dried", "fdcId": "170150"}, "preparationNotes": null, "productSizeModifier": null, "unit": "tablespoon", "quantity": 1.0}, "error": null}, {"ingredientRaw": "3 tbsp vegetable or rapeseed oil", "confidence": 0.454214, "ingredientParsed": {"product": "rapeseed oil", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": null, "unit": "tablespoon", "quantity": 3.0}, "error": null}, {"ingredientRaw": "2 small avocados , stoned, peeled and halved", "confidence": 0.8244931, "ingredientParsed": {"product": "avocados", "usdaInfo": {"category": "Fruits and Fruit Juices", "matchMethod": "exact", "description": "Avocados, raw, all commercial varieties", "fdcId": "171705"}, "preparationNotes": "peeled and halved", "productSizeModifier": "small", "unit": null, "quantity": 2.0}, "error": null}, {"ingredientRaw": "\u00bd lime , juiced", "confidence": 0.971731, "ingredientParsed": {"product": "lime", "usdaInfo": {"category": "Fruits and Fruit Juices", "matchMethod": "exact", "description": "Limes, raw", "fdcId": "168155"}, "preparationNotes": "juiced", "productSizeModifier": null, "unit": null, "quantity": 0.5}, "error": null}, {"ingredientRaw": "4 baps or rolls, split", "confidence": 0.451964, "ingredientParsed": {"product": null, "usdaInfo": null, "preparationNotes": "baps or rolls, split", "productSizeModifier": null, "unit": null, "quantity": 4.0}, "error": null}, {"ingredientRaw": "1 Little Gem lettuce , leaves separated", "confidence": 0.8738233, "ingredientParsed": {"product": "lettuce", "usdaInfo": {"category": "Vegetables and Vegetable Products", "matchMethod": "exact", "description": "Lettuce, iceberg (includes crisphead types), raw", "fdcId": "169248"}, "preparationNotes": "Little Gem, leaves separated", "productSizeModifier": null, "unit": null, "quantity": 1.0}, "error": null}], "error": null}`
        // let xj = new XMLHttpRequest();
        // xj.open("POST", "https://localhost:8080/recipes", true);
        // xj.setRequestHeader("Content-Type", "application/json");
        // xj.setRequestHeader("Access-Control-Allow-Origin", "*")
        // xj.send(zestfulResponse);
        // xj.onreadystatechange = function () {
        //     if (xj.readyState === 4) {
        //         console.log(xj.status)
        //         console.log((xj.responseText))
        //     }};
});

//Make argument a list
function createBoxes(output){
    if ('content' in document.createElement('template')) {

        // Instantiate the table with the existing HTML tbody
        // and the row with the template
        let content = document.getElementById("content")
        let template = document.querySelector('#recipe-template');

        // Clone the new row and insert it into the table
        let clone = template.content.cloneNode(true);
        let title = clone.querySelector(".recipe-title");
        let servings = clone.querySelector("#servings");
        let prepTime = clone.querySelector("#prepTime");
        let cookTime = clone.querySelector("#cookTime");
        let totalTime = clone.querySelector("#totalTime");
        let image = clone.querySelector("img");
        let ingredients = clone.querySelector("#ingredients")

        title.textContent = output['Title'].replace(/['"\[\]]+/g, '');
        servings.textContent = output['Servings']
        prepTime.textContent = output['Prep']
        cookTime.textContent = output['Cook']
        totalTime.textContent = output['Total']
        image.setAttribute("src", output['image'])
        let fooditems = output['Ingredients']

        for (let i = 0; i < fooditems.length; ++i){
            let li = document.createElement("li");

            let listItem = fooditems[i].replace(/[\[\]"]+/g,'');

            li.appendChild(document.createTextNode(listItem));

            ingredients.appendChild(li);
        };

        let view_button = clone.querySelector(".view");
        view_button.value = output['Title'].replace(/['"\[\]]+/g, '');
        view_button.addEventListener("click", expandRecipe)

        let price_button = clone.querySelector(".price");
        price_button.value = output['Title'].replace(/['"\[\]]+/g, '');
        price_button.addEventListener("click", getPrices)

        content.appendChild(clone);

    }
}

chrome.storage.local.get('username', function(result){
    if (result !== undefined){
        let name = document.getElementById('name')
        name.textContent = "Welcome Back " + result.username + ","
        console.log(result)
    } else{
        let name = prompt("What is your name?")
        chrome.storage.local.set({'username': name}, function(){
            console.log("Username set to: " + name)
        })

    }
})

function expandRecipe(){
    let title = this.value;
    console.log(title)
    chrome.storage.local.get('recipes', function (result) {
        let output = result.recipes
        for (let i = 0; i < output.length; i++) {
            let recipe = JSON.parse(output[i])
            if (recipe['Title'].replace(/[\[\]"]+/g,'') === title){
                fillOverlay(recipe)
            }
        }
    });
}

function fillOverlay(recipe){
    var title = document.getElementById("recipeTitle");
    var titleText = document.createTextNode(recipe.Title.replace(/['"]+/g, ''));

    title.appendChild(titleText);

    let ingredients = recipe.Ingredients;

    createList(ingredients, "ingredientsOverlay");

    var method = recipe.Method

    createList(method, "methodOverlay");

    let yieldElement = document.getElementById("yield");
    let yieldText = document.createTextNode("Servings: " + recipe.Servings.replace(/['"]+/g, ''));

    yieldElement.appendChild(yieldText);

    if(recipe.Prep != null){
        let prepElement = document.getElementById("prepTime");
        let prepText = document.createTextNode("Prep Time: " + recipe.Prep);

        prepElement.appendChild(prepText);
    } else{
        let prepElement = document.getElementById("prepTime");
        prepElement.remove();
    };

    if(recipe.Cook != null){
        let cookElement = document.getElementById("cookTime");
        let cookText = document.createTextNode("Cook Time: " + recipe.Cook);

        cookElement.appendChild(cookText);
    } else{
        let cookElement = document.getElementById("cookTime");
        cookElement.remove();
    };

    if(recipe.Total != null){
        let totalElement = document.getElementById("totalTime");
        let totalText = document.createTextNode("Total Time: " + recipe.Total);

        totalElement.appendChild(totalText);
    } else{
        let totalElement = document.getElementById("totalTime");
        totalElement.remove();
    };

    if(recipe.Nutrition != null){

        let nutrition = recipe.Nutrition;

        var table = document.getElementById("nutriTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = nutrition[0];
        cell2.innerHTML = nutrition[1];
        cell3.innerHTML = nutrition[2];
        cell4.innerHTML = nutrition[3];
        cell5.innerHTML = nutrition[4];
        cell6.innerHTML = nutrition[5];
        cell7.innerHTML = nutrition[6];

    } else{
        let table = document.getElementById("nutrition");
        table.remove();
    };

    var imageUrl = recipe.image;
    if(recipe.image != null){
        var imageEle = document.getElementById("recipePic");
        imageEle.src = imageUrl;
        imageEle.style.display = "block";
    };

    var overlay = document.getElementById("overlay");
    overlay.style.display = 'block';

    let button = document.getElementById('close')
    button.addEventListener('click', closeOverlay)
}

function closeOverlay(){
    var overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
}

function createList(ingredients, id) {

    var list = document.getElementById(id);

    for (i = 0; i < ingredients.length; ++i){
        var li = document.createElement("li");

        var listItem = ingredients[i].replace(/[\[\]"]+/g,'');

        li.appendChild(document.createTextNode(listItem));

        list.appendChild(li);
    };

};

function getPrices(){
    let title = '"' + this.value +'"'
    chrome.tabs.create({ url: "https://localhost:8080/setToken" });
    // let title = JSON.stringify(titles[2])
    let zestfulResponse = `{"Title": ${title}, "requestsRemaining": 19, "results": [{"ingredientRaw": "2 large skinless  chicken breasts", "confidence": 0.989507, "ingredientParsed": {"product": "skinless chicken breasts", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": "large", "unit": null, "quantity": 2.0}, "error": null}, {"ingredientRaw": "100g plain flour", "confidence": 0.800566, "ingredientParsed": {"product": "plain flour", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": null, "unit": "gram", "quantity": 100.0}, "error": null}, {"ingredientRaw": "1 egg , beaten", "confidence": 0.9824617, "ingredientParsed": {"product": "egg", "usdaInfo": {"category": "Dairy and Egg Products", "matchMethod": "exact", "description": "Egg, whole, raw, fresh", "fdcId": "171287"}, "preparationNotes": "beaten", "productSizeModifier": null, "unit": null, "quantity": 1.0}, "error": null}, {"ingredientRaw": "splash of milk", "confidence": 0.8282917, "ingredientParsed": {"product": "milk", "usdaInfo": {"category": "Dairy and Egg Products", "matchMethod": "closestUnbranded", "description": "Milk, fluid, 1% fat, without added vitamin A and vitamin D", "fdcId": "173441"}, "preparationNotes": "splash of", "productSizeModifier": null, "unit": null, "quantity": null}, "error": null}, {"ingredientRaw": "3 tbsp ground  almonds", "confidence": 0.9238765, "ingredientParsed": {"product": "almonds", "usdaInfo": {"category": "Nut and Seed Products", "matchMethod": "exact", "description": "Nuts, almonds", "fdcId": "170567"}, "preparationNotes": "ground", "productSizeModifier": null, "unit": "tablespoon", "quantity": 3.0}, "error": null}, {"ingredientRaw": "1 tbsp sesame seeds", "confidence": 0.9921439000000001, "ingredientParsed": {"product": "sesame seeds", "usdaInfo": {"category": "Nut and Seed Products", "matchMethod": "exact", "description": "Seeds, sesame seeds, whole, dried", "fdcId": "170150"}, "preparationNotes": null, "productSizeModifier": null, "unit": "tablespoon", "quantity": 1.0}, "error": null}, {"ingredientRaw": "3 tbsp vegetable or rapeseed oil", "confidence": 0.454214, "ingredientParsed": {"product": "rapeseed oil", "usdaInfo": null, "preparationNotes": null, "productSizeModifier": null, "unit": "tablespoon", "quantity": 3.0}, "error": null}, {"ingredientRaw": "2 small avocados , stoned, peeled and halved", "confidence": 0.8244931, "ingredientParsed": {"product": "avocados", "usdaInfo": {"category": "Fruits and Fruit Juices", "matchMethod": "exact", "description": "Avocados, raw, all commercial varieties", "fdcId": "171705"}, "preparationNotes": "peeled and halved", "productSizeModifier": "small", "unit": null, "quantity": 2.0}, "error": null}, {"ingredientRaw": "\u00bd lime , juiced", "confidence": 0.971731, "ingredientParsed": {"product": "lime", "usdaInfo": {"category": "Fruits and Fruit Juices", "matchMethod": "exact", "description": "Limes, raw", "fdcId": "168155"}, "preparationNotes": "juiced", "productSizeModifier": null, "unit": null, "quantity": 0.5}, "error": null}, {"ingredientRaw": "4 baps or rolls, split", "confidence": 0.451964, "ingredientParsed": {"product": null, "usdaInfo": null, "preparationNotes": "baps or rolls, split", "productSizeModifier": null, "unit": null, "quantity": 4.0}, "error": null}, {"ingredientRaw": "1 Little Gem lettuce , leaves separated", "confidence": 0.8738233, "ingredientParsed": {"product": "lettuce", "usdaInfo": {"category": "Vegetables and Vegetable Products", "matchMethod": "exact", "description": "Lettuce, iceberg (includes crisphead types), raw", "fdcId": "169248"}, "preparationNotes": "Little Gem, leaves separated", "productSizeModifier": null, "unit": null, "quantity": 1.0}, "error": null}], "error": null}`
    let xj = new XMLHttpRequest();
    xj.open("POST", "https://localhost:8080/recipes", true);
    xj.setRequestHeader("Content-Type", "application/json");
    xj.send(zestfulResponse);
    xj.onreadystatechange = function () {
        if (xj.readyState === 4) {
            console.log(xj.status)
            console.log((xj.responseText))
        }};
}


