

const searchButton = () => {
    removePreviousDiv();
    const input = document.getElementById('search-input');
    if(input.value !=="")
    getServerData(input.value);
    input.value = "";
}
const getServerData = input => {
    const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const url = `${apiBase}${input}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data))
}
const displayMeal = meal => {

    const mealArray = meal.meals;
    if (mealArray == null) {
        showError();
    } else {
        const firstDiv = document.getElementById('set-menu');

        mealArray.forEach(element => {
            const combine=document.createElement('div');
            const secondDiv = document.createElement('Div');
            secondDiv.className = "food-item";
            
            //secondDiv.onclick("showDetails");
            //secondDiv.onclick() ="showDetails()";
            secondDiv.setAttribute('onclick', `showDetails('${element.strMeal}')`);
            const inside = `
            <img class='food-image' src="${element.strMealThumb}" alt="">
            <h5 class='food-name'>${element.strMeal}</h5>
            `;            
            secondDiv.innerHTML = inside;
            const thirdDiv=document.createElement('div');
            thirdDiv.className="ingredient";
            thirdDiv.style.display='none';
            thirdDiv.id=element.strMeal;
            thirdDiv.innerHTML=`
            <h3 class="ingre-style">Ingredients</h3>
            <hr>
            <p class="ingre-style">- ${element.strIngredient1}</p>
            <p class="ingre-style">- ${element.strIngredient2}</p>
            <p class="ingre-style">- ${element.strIngredient3}</p>
            <p class="ingre-style">- ${element.strIngredient4}</p>
            <p class="ingre-style">- ${element.strIngredient5}</p>
            <p class="ingre-style">- ${element.strIngredient6}</p>
            <p class="ingre-style">- ${element.strIngredient7}</p>
            `;
            combine.appendChild(secondDiv);
            combine.appendChild(thirdDiv);
            firstDiv.appendChild(combine);
            
        });
    }
}
const removePreviousDiv = () => {
    const previous = document.getElementById('set-menu');
    while (previous.hasChildNodes()) {
        previous.removeChild(previous.firstChild);
    }
    const prev=document.getElementById('error-msg')
    while(prev.hasChildNodes()){
        prev.removeChild(prev.firstChild);
    }
}
const showError = () => {
    const msg=`
        <h1 class='error-msg'>No results found!</h1>
    `;
    const setMenuDiv=document.getElementById('error-msg');
    setMenuDiv.innerHTML=msg;
}


const showDetails = foodName => {
    
    const foodDiv=document.getElementById(foodName);
    
    const allItem=document.getElementsByClassName('ingredient');
    for(let i=0;i<allItem.length;i++){
        const id=allItem[i].getAttribute('id')
        if(id!==foodName)
        allItem[i].style.display='none';
    }
    if(foodDiv.style.display==="none"){
        foodDiv.style.display="block";
    }
    else{
        foodDiv.style.display="none";
    }
}