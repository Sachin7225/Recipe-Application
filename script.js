
const btn = document.getElementById("btn")
const recipe_cont = document.getElementById("container")
const recipe_details_content = document.querySelector(".recipe_details_content")
const closebtn = document.querySelector(".recipe_details")
const recide_btn = document.querySelector("#recide_btn")



const fetchrecipe = async (query)=>{
   recipe_cont.innerHTML = "<h1>Fetching Recipes</h1>"
   try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  const response = await data.json();
  recipe_cont.innerHTML = ''
  response.meals.forEach(meal =>{
    const recipe_div = document.createElement('div')
    recipe_div.classList.add('recipe')
    recipe_div.innerHTML = `
    <img src = "${meal.strMealThumb}">
    <div><h3>${meal.strMeal}<h3>
    <p><span>${meal.strArea}</span> Dish<p>
    <p><span>${meal.strCategory }</span> Category<p>
   </div>
    `
    let button = document.createElement("button")
    button.textContent = "Learn more"
    recipe_div.appendChild(button)
    button.addEventListener('click',()=>{
        openpopup(meal)
    })
    recipe_cont.appendChild(recipe_div)
    
  });
   } catch (error) {
    recipe_cont.innerHTML = "<h1>Error in <i>Fetching</i> Your recipe</h1>"
   }
  
}


 const fetchingredients = (meal) =>{
  let Ingredientslist = ""
  for(let i = 1 ; i<=20;i++){
   const Ingredient = meal[`strIngredient${i}`]
   if(Ingredient){
     const measure  = meal[`strMeasure${i}`]
     Ingredientslist +=`<li>${measure} ${Ingredient}</li>`
   }
   else{
     break;
   }
  }
  return Ingredientslist
 }

 const openpopup = (meal)=>{
  recipe_details_content.innerHTML =`
  <h2 class="heading">${meal.strMeal}</h2>
  <h3>Ingredients : </h3>
  <h2>${fetchingredients(meal)}</h2>
  <div>
  <h3>Instruction: </h3>
  <p>${meal.strInstructions}</p>
  </div>
  `
  recipe_details_content.parentElement.style.display="block";
}

recide_btn.addEventListener('click', ()=>{
  recipe_details_content.parentElement.style.display="none";
})
btn.addEventListener('click',(e)=>{
   e.preventDefault();
   const search = document.getElementById("Search").value

   if(!search){
    recipe_cont.innerHTML = `<h1>Enter something to search</h1>`
   }
   else{
    fetchrecipe(search)
   }
   


})