# Chrome Extension for Recipes using JSON-LD

I sought to discover how widely used the structured data format of
JSON-LD is and how well web developers utilise it. I have limited my studies to recipe
websites as I wanted to show a real world application on how the data can be used. I
implemented this through the form of a Chrome Browser extension connected to a supermarket
API. In this way, the user is able to scrape recipe information from a website,
save the recipe information and then retrieve pricing information for that recipe.

## Installing & Running Extension

### Adding Extension

Since Chrome has removed the ability to add custom packed extensions into Chrome that aren't part of the Chrome Web Store the **.cex** file will **NOT** work anymore.

**Instead:**
1. Navigate to [chrome://extensions/](chrome://extensions/)
2. Turn Developer Mode on in the top right corner
3. Drag the "Chrome Extension" folder from your files onto the extensions page
4. You should now see the extension called FoodScrape added
5. Under "Details" set "Allow access to file URLs" to on

### Enabling Pricing Scraper

1. Open the "chrome-extension-localhost" in your favourite IDE or just navigate to that folder from the terminal on your machine
2. In the "app.js" file there is a line where you set the headers for accessing the API, insert your own authorisation code [^1] in here:
```js
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Authorization", "[ENTER AUTH CODE HERE]");
```
3. Assuming you already have *node* installed, run the command:
```console
foo@bar:~$ node app.js
Example app listening on port 8080! [HTTPS]
***************
```

### Using the Extension

1. Navigate to a page that contains the recipe
2. Select the extension from your extensions list
3. Press the "Click Me" button and the recipe information should appear.
4. You can use the navigation bar to scroll to different parts of the recipe or just scroll manually
5. Pressing the save recipe button at the bottom will save the recipe to your account page
6. To access the account page either press the **Account** button on the navigation menu, or alternatively, on the extensions list press the **⋮** button next to FoodScrape and select **Options** from the menu
7. From this account page you can view saved recipes or get the pricing for the recipes

N.B: The Pricing Scraper must be running in order to get the pricings for a recipe.

I have made a list of sites that work with the extension:
<img width="928" alt="Tested Sites" src="https://github.com/jazzajing/recipe-chrome-extension/assets/82279104/d6da99e0-33ae-4001-b42b-8d925dd8c870">

Note: This list is not exhaustive, it is just some of the more common recipe sites

[^1]: You can obtain your authorisation code for the Kroger API from the [Kroger Site](https://developer.kroger.com/)
