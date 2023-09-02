const recipeForm = document.getElementById('recipe-form');
const recipeName = document.getElementById('recipe-name');
const ingredients = document.getElementById('ingredients');
const steps = document.getElementById('steps');
const url = document.getElementById('url')
const displayArea = document.getElementById('display-area');
const button = document.getElementById('submit')
const autoFillElement = document.getElementById('autoFill')

let recipes = [];
let counter = 0 // id counter

/*-------------------------------------------------------------------------------------------------*/

// function to delete the reciepe
function deleteRecipe(index, id){

    recipes.splice(index, 1); // Deletes the recipe from the recipe array
    saveToLocalStorage()
    const elementToRemove = document.getElementById(id);
    elementToRemove.remove(); // Deletes the recipe from the html
    
}

// funtion to save to local storage
function saveToLocalStorage(){
    localStorage.setItem('recipes', JSON.stringify(recipes));

}

// fetches and displays the local storage recipes
function fetchAndDisplay() {
    if (localStorage.getItem('recipes')) {
        recipes = JSON.parse(localStorage.getItem('recipes'));
        for (recipe of recipes){
            displayRecipe(recipe)
        }
    }
}

/*-------------------------------------------------------------------------------------------------*/

let autoFillArray = [
    {
        "id": 0,
        "name": "pizza",
        "ingredients": [
            "flour",
            " tomoato",
            " cheese"
        ],
        "steps": "Take a dough kneading plate and add all-purpose flour to it. Next, add salt and baking powder in it and sieve the flour once. Then, make a well in the centre and add 2 teaspoon of olive oil to it. On the other hand, take a little warm water and mix the yeast in it along with 1 teaspoon of sugar. Mix well and keep aside for 10-15 minutes. The yeast will rise in the meantime. Once the yeast has risen, add it to the flour knead the dough nicely using some water. Keep this dough aside for 4-6 hours. Then knead the dough once again. Now, the pizza dough is ready.",
        "url": "data:image/jpeg;base64,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"
    }
]

function autoFill(){
    autoFillElement.onclick = function(){
        recipeName.value = autoFillArray[0]['name']
        ingredients.value = autoFillArray[0]['ingredients']
        steps.value = autoFillArray[0]['steps']
        url.value = autoFillArray[0]['url']
    }
}

/*-------------------------------------------------------------------------------------------------*/

/* This function helps display the whole recipe to the user. 
   params: recipe (obj).
*/
function displayRecipe(recipe) {
    let recipeDiv = document.createElement('div')
    recipeDiv.setAttribute('id', recipe['id'])
    recipeDiv.innerHTML += `<img class="foodImg" src=${recipe['url']} alt="">`
    recipeDiv.innerHTML += `<h1> Recipe Name: <span style="color: green;">${recipe['name']}</span> </h1>`

    for (item of recipe['ingredients']){
        recipeDiv.innerHTML += `<ul><li><h1> ${item} </h1></li></ul>`
    }

    recipeDiv.innerHTML += `<h2 style="color: blue;">How its done:</h2><p>${recipe['steps']}</p>`
    recipeDiv.innerHTML += `<div class="borderDiv"><div>`

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute('id', 'del')

    deleteButton.onclick = function() {
        let recipeIndex = recipes.indexOf(recipe)

        deleteRecipe(recipeIndex, recipe['id']);
        
    };
    
    recipeDiv.appendChild(deleteButton);

    displayArea.appendChild(recipeDiv);
}



/*---------------------------------------------------------------------------------------------------*/ 

function main() {
    
    /* This kicks everything off after the submit button is clicked*/ 
    recipeForm.addEventListener('submit', function(event){
        event.preventDefault();

        let enteredRecipeName = recipeName.value;
        let enteredIngredients = ingredients.value;
        let enteredSteps = steps.value;
        let enteredUrl = url.value

        

        let newRecipe = {
            id: counter,
            name: enteredRecipeName,
            ingredients: enteredIngredients.split(', '),
            steps: enteredSteps,
            url: enteredUrl
        }
        counter++
        recipes.push(newRecipe)
        recipeForm.reset();
        displayRecipe(newRecipe);
        saveToLocalStorage()
        window.scroll({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Optional, adds smooth scrolling animation
          });
          
           
    });

    fetchAndDisplay()

    autoFill()
    
    }


main();
