var button = document.getElementById("getinfo");

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: printRecipeName,
    },
    (injectionResults) => {
      button.remove();
      var content = document.getElementById("content");
      content.style.display = 'block';

      var results = injectionResults[0].result;

      var title = document.getElementById("recipeTitle");
      var titleText = document.createTextNode(results[0].replace(/['"]+/g, ''));

      title.appendChild(titleText);

      let ingredients = results[1];

      let listIngredients = ingredients.split("\",");

      createList(listIngredients, "ingredients");

      var method = JSON.parse(results[2]);

      var methodlist = [];

      for (i = 0; i < method.length; ++i){
        methodlist.push(JSON.stringify(method[i].text));
      };

      createList(methodlist, "method");

      let yieldElement = document.getElementById("yield");
      let yieldText = document.createTextNode("Servings: " + results[3].replace(/['"]+/g, ''));

      yieldElement.appendChild(yieldText);

      if(results[4] != null){
        let prepElement = document.getElementById("prepTime");
        let prepText = document.createTextNode("Prep Time: " + formatTime(results[4]));

        prepElement.appendChild(prepText);
      } else{
        let prepElement = document.getElementById("prepTime");
        prepElement.remove();
      };

      if(results[5] != null){
        let cookElement = document.getElementById("cookTime");
        let cookText = document.createTextNode("Cook Time: " + formatTime(results[5]));

        cookElement.appendChild(cookText);
      } else{
        let cookElement = document.getElementById("cookTime");
        cookElement.remove();
      };

      if(results[6] != null){
        let totalElement = document.getElementById("totalTime");
        let totalText = document.createTextNode("Total Time: " + formatTime(results[6]));

        totalElement.appendChild(totalText);
      } else{
        let totalElement = document.getElementById("totalTime");
        totalElement.remove();
      };

      if(results[7] != null){

        let nutrition = results[7];


        var calories = JSON.stringify(nutrition.calories).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var fatContent = JSON.stringify(nutrition.fatContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var carbohydrateContent = JSON.stringify(nutrition.carbohydrateContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var sugarContent = JSON.stringify(nutrition.sugarContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var fiberContent = JSON.stringify(nutrition.fiberContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var proteinContent = JSON.stringify(nutrition.proteinContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];
        var sodiumContent = JSON.stringify(nutrition.sodiumContent).match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)[0];

        if(sodiumContent % 1 != 0){
          sodiumContent = (sodiumContent*100);
        } else{
          sodiumContent = sodiumContent;
        };

        var table = document.getElementById("nutriTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = calories;
        cell2.innerHTML = fatContent + "g";
        cell3.innerHTML = carbohydrateContent + "g";
        cell4.innerHTML = sugarContent + "g";
        cell5.innerHTML = fiberContent + "g";
        cell6.innerHTML = proteinContent + "g";
        cell7.innerHTML = sodiumContent + "mg";

        if(percentage(calories, 2000) <= 40){
          cell1.style.backgroundColor = "rgba(174, 225, 72, 1.0)";
          document.getElementById("calories").style.backgroundColor = "rgba(174, 225, 72, 1.0)";
        } else if(percentage(calories, 2000) <= 50){
          cell1.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("calories").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        } else if(percentage(calories, 2000) >= 51) {
          cell1.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("calories").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        };

        if(percentage(fatContent, 70) <= 40){
          cell2.style.backgroundColor = "rgba(174, 225, 72, 1.0)";
          document.getElementById("fat").style.backgroundColor = "rgba(174, 225, 72, 1.0)";
        } else if(percentage(fatContent, 70) <= 50){
          cell2.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("fat").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        } else if(percentage(fatContent, 70) >= 51) {
          cell2.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("fat").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        };

        if(percentage(carbohydrateContent, 260) <= 40){
          cell3.style.backgroundColor = "rgba(174, 225, 72, 1.0)";
          document.getElementById("carbs").style.backgroundColor = "rgba(174, 225, 72, 1.0)";
        } else if(percentage(carbohydrateContent, 260) <= 50){
          cell3.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("carbs").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        } else if(percentage(carbohydrateContent, 260) >= 51) {
          cell3.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("carbs").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        };

        if(percentage(sugarContent, 90) <= 40){
          cell4.style.backgroundColor = "rgba(174, 225, 72, 1.0)";
          document.getElementById("sugars").style.backgroundColor = "rgba(174, 225, 72, 1.0)";
        } else if(percentage(sugarContent, 90) <= 50){
          cell4.style.backgroundColor = "rgb(238,174,66)";
          document.getElementById("sugars").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        } else if(percentage(sugarContent, 90) >= 51) {
          cell4.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("sugars").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        };

        if(percentage(sodiumContent, 2400) <= 40){
          cell7.style.backgroundColor = "rgba(174, 225, 72, 1.0)";
          document.getElementById("sodium").style.backgroundColor = "rgba(174, 225, 72, 1.0)";
        } else if(percentage(sodiumContent, 2400) <= 50){
          cell7.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("sodium").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        } else if(percentage(sodiumContent, 2400) >= 51) {
          cell7.style.backgroundColor = "rgba(238, 174, 66, 1.0)";
          document.getElementById("sodium").style.backgroundColor = "rgba(238, 174, 66, 1.0)";
        };

      } else{
        let table = document.getElementById("nutrition");
        table.remove();
      };

      var imageUrl = results[8];
      if(results[8] != null){
        var imageEle = document.getElementById("recipePic");
        imageEle.src = imageUrl;
        imageEle.style.display = "block";
      };

      document.getElementById("account").addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else {
          window.open(chrome.runtime.getURL('options.html'));
        }
      });

      document.getElementById("save-recipe").addEventListener('click', function (){
        var nutri_elems = [calories, fatContent + 'g', carbohydrateContent + 'g', sugarContent + 'g', fiberContent + 'g', proteinContent + 'g', sodiumContent + 'mg'];
        let servings = `Servings: ${results[3].replace(/['"]+/g, '')}`
        let prepTime = `Prep Time: ${formatTime(results[4])}`
        let cookTime = `Cook Time: ${formatTime(results[5])}`
        let totalTime = `Total Time: ${formatTime(results[6])}`
        let final_res = {Title: results[0], image: imageUrl, Servings: servings, Prep: prepTime, Cook: cookTime, Total: totalTime, Ingredients: listIngredients, Method: methodlist, Nutrition: nutri_elems}
        let final_elems = JSON.stringify(final_res);

        chrome.storage.local.get('recipes', function(result){
          let output = result.recipes;
          output.push(final_elems)

          chrome.storage.local.set({'recipes': output}, function() {
            console.log('Recipes value is set to ' + output);
          });

        })

      });

    });

});

function printRecipeName() {
  var results = [];

  var jsonld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).forEach(function(element){
    
    var json = JSON.parse(element.innerText);
    console.log(json)

    if(json['@type'] == "Recipe"){

      var recipeName = JSON.stringify(json.name);
      var recipeYield = JSON.stringify(json.recipeYield);
      var prepTime = JSON.stringify(json.prepTime);
      var cookTime = JSON.stringify(json.cookTime);
      var totalTime = JSON.stringify(json.totalTime);
      var nutrition = json.nutrition;
      var ingredientsList = JSON.stringify(json.recipeIngredient);
      var instructions = JSON.stringify(json.recipeInstructions);
      var image = json.image.url;

      results.push(recipeName, ingredientsList, instructions, recipeYield, prepTime, cookTime, totalTime, nutrition, image);

    };
  });
  return results;
};

function createList(ingredients, id) {

  var list = document.getElementById(id);

  for (i = 0; i < ingredients.length; ++i){
    var li = document.createElement("li");

    var listItem = ingredients[i].replace(/[\[\]"]+/g,'');
    
    li.appendChild(document.createTextNode(listItem));

    list.appendChild(li);
  };

};

function formatTime(time) {
  var timeD = time;
  var formattedTime = timeD.replace("PT","").replace("H"," Hr ").replace("M"," mins").replace(/['"]+/g, '');

  return formattedTime;
};

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
}
