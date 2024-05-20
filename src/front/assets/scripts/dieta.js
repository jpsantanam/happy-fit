let dietUserId;

if (userData.role == "USER")
    dietUserId = userData.id;
else if (userData.role == "NUTRITIONIST")
    dietUserId = parseInt(localStorage.getItem('selectedUserId'));

const apiURL = `${API_URL}/user/${dietUserId}`;

let diet = {};
let userMeals = [];
let userFoods = [];
let foodOptions = [];

getData(`${apiURL}/diet`).then((data) => {
    console.log('Successfully fetched diet data from the database');
    diet = data;
    console.log(diet);
    userMeals = diet.meals;
}).catch((error) => {
    console.error('Error while fetching diet data:', error);
});

getData(`${API_URL}/foodOption`).then((response) => {
    if (response.ok) {
        console.log('Successfully fetched food options from the database');
        foodOptions = response.json();
    } else console.error('Error while fetching food options:', response.statusText);
});

function loadUserMeal (mealsList, meal, foods, uniqueFoodIdCounter) {
    createMeal(mealsList, meal.id, meal.name);
    meals.push(document.querySelector("#meals-list .meal:last-child"));

    for (let food of foods) {
        const foodsList = document.getElementById(`meal${meal.id}`).querySelector(".foods-list");
        addFood(foodsList, uniqueFoodIdCounter);

        const foodData = {
            name : foodOptions[food.foodId - 1].foodName,
            calories : foodOptions[food.foodId - 1].foodCalories,
            proteins : foodOptions[food.foodId - 1].foodProteins,
            carbs : foodOptions[food.foodId - 1].foodCarbs,
            fats : foodOptions[food.foodId - 1].foodFats,
            portion : foodOptions[food.foodId - 1].foodPortion,
            quantity : food.quantity
        };

        const foodElement = document.getElementById(`food${uniqueFoodIdCounter}`);
        foodElement.querySelector(".food-dropdown").classList.add("d-none");
        finishFood (foodElement, uniqueFoodIdCounter, foodData);
        uniqueFoodIdCounter++;
    }

    return uniqueFoodIdCounter;
}

async function saveNewMeal (mealID, mealName, foodsIDs, foodsQuantities) {
    const requestBody = {
        name: mealName,
        diet: diet.id
    };

    postData(`${apiURL}/diet/meal`, requestBody).then((data) => {
        console.log('Successfully posted new meal to the database');
        console.log(data);
    }).catch((error) => {
        console.error('Error while posting new meal:', error);
    });

    for (let i = 0; i < foodsIDs.length; i++) {
        /* let foods;

        getData(`diet/meal/${mealID}`).then((data) => {
            foods = data.foods;
        }); */

        const _requestBody = {
            meal: parseInt(mealID),
            quantity: parseFloat(foodsQuantities[i]),
            foodOption: parseInt(foodsIDs[i]),
        };

        postData(`${apiURL}/diet/meal/${mealID}/food`, _requestBody).then((response) => {
            console.log("Successfully posted new meal's foods to the database");
            console.log(data);
        }).catch((error) => {
            console.error("Error while posting new meal's foods:", error);
        });
    }
}

async function updateMeal (mealID, mealName, foodsIDs, foodsQuantities) {
    const requestBody = {
        name: mealName,
        diet: diet.id
    };
    
    putData(`${apiURL}/diet/meal/${mealID}`, requestBody).then((data) => {
        console.log('Successfully updated meal in the database');
        console.log(data);
    }).catch((error) => {
        console.error("Error while updating meal:", error);
    });

    postData(`${apiURL}/diary`, _requestBody).then((data) => {
        console.log('Successfully posted new diary to the database');
        console.log(data);
    }).catch((error) => {
        console.error('Error while posting new diary:', error);
    });

    getData(`${apiURL}/diet/meal/${mealID}`).then((data) => {
        console.log('Successfully fetched meal data from the database');
        console.log(data);

        for (let food of data.foods) {
            deleteData(`${apiURL}/diet/meal/${mealID}/food/${food.id}`).then((_data) => {
                console.log("Successfully deleted previous version of the meal on the database: ", _data);
                console.log(_data);
            }).catch((error) => {
                console.error("Error while deleting previous meal's foods version:", error);
            });
        }
    }).catch((error) => {
        console.error('Error while posting meal data:', error);
    });

    for (let i = 0; i < foodsIDs.length; i++) {
        getData(`${apiURL}/diet/meal/${mealID}/food`).then((data) => {
            console.log('Successfully fetched food data from the database');
            let foods = data;
            console.log("'foods': ", foods);
            console.log("'foods' size: ", foods.length - 1);

            let _requestBody = {
                meal: parseInt(mealID),
                quantity: parseFloat(foodsQuantities[i]),
                foodOption: parseInt(foodsIDs[i]),
            };

            postData(`${apiURL}/diet/meal/${mealID}/food`, _requestBody).then((_data) => {
                console.log("Successfully posted updated meal's foods to the database");
                console.log(_data);
            }).catch((error) => {
                console.error('Error while posting updated meal:', error);
            });
        }).catch((error) => {
            console.error('Error while fetching food data:', error);
        });
    }
}

// MODAL NÃO TÁ FUNCIONANDO!!!
function createMeal (mealsList, uniqueMealIdCounter, mealName) {
    const meal = document.createElement("li");
    meal.className = "meal list-group-item";
    meal.id = `meal${uniqueMealIdCounter}`;
    meal.innerHTML = `
    <input type="text" placeholder="Enter meal name" value="${mealName}" class="meal-title form-control-dark fs-3 text-black">
    <ul class="foods-list list-group w-100 mt-3">
        <!--Generated foods will be appended here-->
    </ul>
    <div class="d-flex justify-content-evenly w-100 mt-3">
        <button class="edit-mode delete-meal btn btn-danger" data-toggle="modal" data-target="#deleteMealModal">Deletar Refeição</button>
        <button class="edit-mode add-food btn btn-dark">Adicionar Alimento</button>
        <button class="edit-mode save-meal btn btn-success">Salvar Refeição</button>
    </div>
    <div class="meal-total container-fluid mt-3">
        <h3>Total:</h3>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Calorias:</div>
                <div class="meal-calories"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Proteínas:</div>
                <div class="meal-proteins"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Carboidratos:</div>
                <div class="meal-carbs"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Gorduras:</div>
                <div class="meal-fats"></div>
            </div>
        </div>
    </div>
    `;
    mealsList.appendChild(meal);
}

function addFood (foodsList, uniqueFoodIdCounter) {
    const food = document.createElement("li");
    food.className = "food container-fluid list-group-item list-group-item-dark p-4 rounded";
    food.id = `food${uniqueFoodIdCounter}`;
    food.innerHTML = `
    <div class="food-dropdown row">
        <div class="col-12 col-md-6 col-lg-8">
            <div class="food-options-dropdown dropdown col-12 col-sm-10 w-100">
                <button class="edit-mode btn btn-secondary dropdown-toggle w-100" id="food-dropdown-button${uniqueFoodIdCounter}" data-bs-toggle="dropdown" aria-expanded="false">Opções de Alimentos
                    <div class="dropdown-menu dropdown-menu-dark row" aria-labelledby="food-dropdown-button${uniqueFoodIdCounter}">
                        <div class="container-fluid">
                            <div class="food-options-row row">
                                <!--Get options from foodData.json-->
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
            <button class="edit-mode create-new-food btn btn-primary w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M435.478-275.478h89.044v-160h160v-89.044h-160v-160h-89.044v160h-160v89.044h160v160ZM480-60.782q-87.522 0-163.906-32.96-76.385-32.96-132.888-89.464-56.504-56.503-89.464-132.888Q60.782-392.478 60.782-480t32.96-163.906q32.96-76.385 89.464-132.888 56.503-56.504 132.888-89.464 76.384-32.96 163.906-32.96t163.906 32.96q76.385 32.96 132.888 89.464 56.504 56.503 89.464 132.888 32.96 76.384 32.96 163.906t-32.96 163.906q-32.96 76.385-89.464 132.888-56.503 56.504-132.888 89.464Q567.522-60.782 480-60.782Zm0-106.001q131.739 0 222.478-90.739T793.217-480q0-131.739-90.739-222.478T480-793.217q-131.739 0-222.478 90.739T166.783-480q0 131.739 90.739 222.478T480-166.783ZM480-480Z"/>
                </svg> Criar Alimento
            </button>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
            <button class="edit-mode delete-food btn btn-danger w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                </svg> Deletar Alimento
            </button>
        </div>
    </div>
    `;
    foodsList.appendChild(food);

    const foodOptionsRow = food.querySelector(".food-options-row");
    foodOptions.forEach(Food => {
        const foodOptionsColumn = document.createElement("div");
        foodOptionsColumn.className = "col-12 col-sm-6 col-lg-4 col-xl-3"
        foodOptionsRow.appendChild(foodOptionsColumn);
        const foodOption = document.createElement("a");
        foodOption.className = "dropdown-item fs-6";
        foodOption.textContent = Food.foodName;
        foodOptionsColumn.appendChild(foodOption);
    });
}

function createFood (food, uniqueFoodIdCounter) {
    const newFood = document.createElement("form");
    newFood.className = "new-food container-fluid needs-validation";
    newFood.setAttribute("novalidate", "");
    newFood.innerHTML = `
    <div class="row">
        <div class="new-food-form col-12 col-lg-10">
            <div class="row">
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-food-name${uniqueFoodIdCounter}">Name:</label>
                    <input class="form-control new-food-name" required type="text" id="new-food-name${uniqueFoodIdCounter}" placeholder="Food name">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-food-calories${uniqueFoodIdCounter}">Calorias:</label>
                    <input class="form-control new-food-calories" required type="number" step=".01" id="new-food-calories${uniqueFoodIdCounter}" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-food-proteins${uniqueFoodIdCounter}">Proteínas:</label>
                    <input class="form-control new-food-proteins" required type="number" step=".01" id="new-food-proteins${uniqueFoodIdCounter}" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label for="new-food-carbs${uniqueFoodIdCounter}">Carboidratos:</label>
                    <input class="form-control new-food-carbs" required type="number" step=".01" id="new-food-carbs${uniqueFoodIdCounter}" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-food-fats${uniqueFoodIdCounter}">Gorduras:</label>
                    <input class="form-control new-food-fats" required type="number" step=".01" id="new-food-fats${uniqueFoodIdCounter}" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-food-portion${uniqueFoodIdCounter}">Porção:</label>
                    <select class="form-select new-food-portion" required id="new-food-portion${uniqueFoodIdCounter}">
                        <option selected disabled>Selecione o tipo de porção</option>
                        <option value="1">1 unidade</option>
                        <option value="2">100 g</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="new-food-buttons col-12 col-lg-2">
            <div class="row">
                <button class="cancel-new-food col-5 col-lg-12 btn btn-secondary" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M256-181.912 181.912-256l224-224-224-224L256-778.088l224 224 224-224L778.088-704l-224 224 224 224L704-181.912l-224-224-224 224Z"/>
                    </svg> Cancelar
                </button>
                <button class="confirm-new-food col-5 col-lg-12 btn btn-success" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg> Criar
                </button>
            </div>
        </div>
    </div>
    `;
    food.appendChild(newFood);
}

async function submitNewFood (food, newFoodForm, uniqueFoodIdCounter) {
    const foodName = newFoodForm.querySelector(".new-food-name").value;
    const foodCalories = parseFloat(newFoodForm.querySelector(".new-food-calories").value);
    const foodProteins = parseFloat(newFoodForm.querySelector(".new-food-proteins").value);
    const foodCarbs = parseFloat(newFoodForm.querySelector(".new-food-carbs").value);
    const foodFats = parseFloat(newFoodForm.querySelector(".new-food-fats").value);
    const foodPortion = newFoodForm.querySelector(".new-food-portion").value;

    const existingFood = foodOptions.find((item) => {
        const itemName = item.foodName.toLowerCase().replace(/[\s-]/g, '');
        return itemName === foodName.toLowerCase().replace(/[\s-]/g, '');;
    });

    if (existingFood) {
        alert("Já existe um alimento com o mesmo nome no banco de dados.");

        const inputFields = newFoodForm.querySelectorAll('input');
        inputFields.forEach((input) => {
            input.value = '';
        });
    }

    else {
        const requestBody = {
            foodName,
            foodCalories,
            foodProteins,
            foodCarbs,
            foodFats,
            foodPortion
        };

        postData(`${API_URL}/foodOption`, requestBody).then((data) => {
            console.log('Successfully added new food option to database');
            console.log(data);

            foodOptions.push(requestBody);
            console.log(foodOptions);
/*             getData('http://localhost:8080/foodOption').then((_data) => {
                console.log('Successfully fetched food options from the database');
                foodOptions = _data;
                console.log("foodOptions: ", foodOptions);
            }).catch((error) => {
                console.error("Error while fetching food options:", error);
            });
*/
        }).catch((error) => {
            console.error("Error while adding new food:", error);
        });

        const foodData = {
            name : foodName,
            calories : foodCalories,
            proteins : foodProteins,
            carbs : foodCarbs,
            fats : foodFats,
            portion : foodPortion,
            quantity : ""
        };

        food.querySelector(".new-food").remove();
        finishFood(food, uniqueFoodIdCounter, foodData);
        uniqueFoodIdCounter++;
    }
}

function finishFood (food, uniqueFoodIdCounter, foodData) {
    let portionPlaceholder = "";
    if (foodData.portion == "1") {
        portionPlaceholder = "(Em unidades)";
    }
    else if (foodData.portion == "2") {
        portionPlaceholder = "(Em gramas)";
    }
    const foodInfo = document.createElement("form");
    foodInfo.className = "food-info container-fluid needs-validation";
    foodInfo.setAttribute("novalidate", "");
    foodInfo.innerHTML = `
    <div class="row">
        <div class="food-info-display col-12 col-lg-9">
            <div class="row">
                <div class="col-12 col-lg-8 d-flex align-items-center">
                    <input value="${foodData.name}" class="food-info-name form-control" disabled type="text">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="food-calories${uniqueFoodIdCounter}">Calorias:</label>
                    <input value="${foodData.calories}" class="food-info-calories form-control" disabled type="number" step=".01" id="food-calories${uniqueFoodIdCounter}">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="food-proteins${uniqueFoodIdCounter}">Proteínas:</label>
                    <input value="${foodData.proteins}" class="food-info-proteins form-control" disabled type="text" step=".01" id="food-proteins${uniqueFoodIdCounter}">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="food-carbs${uniqueFoodIdCounter}">Carboidratos:</label>
                    <input value="${foodData.carbs}" class="food-info-carbs form-control" disabled type="text" step=".01" id="food-carbs${uniqueFoodIdCounter}">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="food-fats${uniqueFoodIdCounter}">Gorduras:</label>
                    <input value="${foodData.fats}" class="food-info-fats form-control" disabled type="text" step=".01" id="food-fats${uniqueFoodIdCounter}">
                </div>
            </div>
        </div>
        <div class="food-info-interactions col-12 col-lg-3">
            <div class="row">
                <div class="col-7 col-lg-12 d-flex align-items-center">
                    <label class="me-2" for="food-quantity${uniqueFoodIdCounter}">Quantidade:</label>
                    <input class="food-info-quantity form-control" type="number" value="${foodData.quantity}" step=".01" id="food-quantity${uniqueFoodIdCounter}" placeholder="${portionPlaceholder}">
                </div>
                <button class="edit-mode delete-food col-5 col-lg-12 btn btn-danger" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                    </svg> Deletar
                </button>
            </div>
        </div>
    </div>
    `;
    food.appendChild(foodInfo);

    const quantityInput = foodInfo.querySelector(".food-info-quantity");

    quantityInput.addEventListener("input", function() {
        const quantity = parseFloat(quantityInput.value) || 0;
        updateFoodInfo(food, foodInfo, quantity, foodData);
    });

    //NÃO LEMBRO MAIS O QUE ESSAS DUAS LINHAS FAZEM
    /* const initialQuantity = parseFloat(quantityInput.value) || 0;
    updateFoodInfo(food, foodInfo, initialQuantity, foodData); */
}

function updateFoodInfo(food, foodInfo, quantity, foodData) {
    let updatedCalories = 0;
    let updatedProteins = 0;
    let updatedCarbs = 0;
    let updatedFats = 0;

    if (foodData.portion == "1") {
        updatedCalories = foodData.calories * quantity;
        updatedProteins = foodData.proteins * quantity;
        updatedCarbs = foodData.carbs * quantity;
        updatedFats = foodData.fats * quantity;
    }

    else if (foodData.portion == "2") {
        updatedCalories = (foodData.calories / 100) * quantity;
        updatedProteins = (foodData.proteins / 100) * quantity;
        updatedCarbs = (foodData.carbs / 100) * quantity;
        updatedFats = (foodData.fats / 100) * quantity;
    }

    const caloriesInput = foodInfo.querySelector(".food-info-calories");
    const proteinsInput = foodInfo.querySelector(".food-info-proteins");
    const carbsInput = foodInfo.querySelector(".food-info-carbs");
    const fatsInput = foodInfo.querySelector(".food-info-fats");

    caloriesInput.value = updatedCalories.toFixed(2);
    proteinsInput.value = updatedProteins.toFixed(2);
    carbsInput.value = updatedCarbs.toFixed(2);
    fatsInput.value = updatedFats.toFixed(2);

    const meal = food.closest(".meal");
    updateMealTotal(meal);
}

function updateMealTotal(meal) {
    const mealTotalCalories = meal.querySelector(".meal-calories");
    const mealTotalProteins = meal.querySelector(".meal-proteins");
    const mealTotalCarbs = meal.querySelector(".meal-carbs");
    const mealTotalFats = meal.querySelector(".meal-fats");

    let totalMealCalories = 0;
    let totalMealProteins = 0;
    let totalMealCarbs = 0;
    let totalMealFats = 0;

    const foodOptions = meal.querySelectorAll(".food-info");

    foodOptions.forEach((foodItem) => {
        const mealCalories = parseFloat(foodItem.querySelector(".food-info-calories").value) || 0;
        const mealProteins = parseFloat(foodItem.querySelector(".food-info-proteins").value) || 0;
        const mealCarbs = parseFloat(foodItem.querySelector(".food-info-carbs").value) || 0;
        const mealFats = parseFloat(foodItem.querySelector(".food-info-fats").value) || 0;

        totalMealCalories += mealCalories;
        totalMealProteins += mealProteins;
        totalMealCarbs += mealCarbs;
        totalMealFats += mealFats;
    });

    const proteinsPercentage = ((totalMealProteins * 4 * 100) / totalMealCalories).toFixed(2);
    const carbsPercentage = ((totalMealCarbs * 4 * 100) / totalMealCalories).toFixed(2);
    const fatsPercentage = ((totalMealFats * 9 * 100) / totalMealCalories).toFixed(2);

    mealTotalCalories.textContent = `${totalMealCalories.toFixed(2)}kcal`;
    mealTotalProteins.textContent = `${totalMealProteins.toFixed(2)}g (${proteinsPercentage}%)`;
    mealTotalCarbs.textContent = `${totalMealCarbs.toFixed(2)}g (${carbsPercentage}%)`;
    mealTotalFats.textContent = `${totalMealFats.toFixed(2)}g (${fatsPercentage}%)`;

    updateTotal(meals);
}

const meals = [];

function updateTotal(meals) {
    const calories = document.getElementById("calories");
    const proteins = document.getElementById("proteins");
    const carbs = document.getElementById("carbs");
    const fats = document.getElementById("fats");

    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    meals.forEach((meal) => {
        totalCalories += parseFloat(meal.querySelector(".meal-calories").textContent) || 0;
        totalProteins += parseFloat(meal.querySelector(".meal-proteins").textContent) || 0;
        totalCarbs += parseFloat(meal.querySelector(".meal-carbs").textContent) || 0;
        totalFats += parseFloat(meal.querySelector(".meal-fats").textContent) || 0;
    });

    const requestBody = {
        totalCalories,
        totalProteins,
        totalCarbs,
        totalFats
    };

    putData(`${apiURL}/diet`, requestBody).then((data) => {
        console.log('Successfully updated diet in the database');
        console.log(data);
    }).catch((error) => {
        console.error("Error while updating diet:", error);
    });

    calories.textContent = `${totalCalories.toFixed(2)}kcal`;
    proteins.textContent = `${totalProteins.toFixed(2)}g (${((totalProteins * 4 * 100) / totalCalories).toFixed(2)}%)`;
    carbs.textContent = `${totalCarbs.toFixed(2)}g (${((totalCarbs * 4 * 100) / totalCalories).toFixed(2)}%)`;
    fats.textContent = `${totalFats.toFixed(2)}g (${((totalFats * 9 * 100) / totalCalories).toFixed(2)}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
    const mealsList = document.getElementById("meals-list");

    let uniqueMealIdCounter;
    let uniqueFoodIdCounter = 1;

    if (userMeals.length > 0) {
        for (let meal of userMeals) {
            getData(`diet/meal/${meal.id}`).then((data) => {
                console.log('Successfully fetched meal data from the database');
                userFoods = data.foods;
                console.log("userFoods: ", userFoods);
                uniqueFoodIdCounter = loadUserMeal(mealsList, meal, userFoods, uniqueFoodIdCounter);
            }).catch((error) => {
                console.error("Error while fetching meal data:", error);
            });
        }
        uniqueMealIdCounter = parseInt(userMeals[userMeals.length - 1].id + 1);
    } else uniqueMealIdCounter = 1;

    if (userData.role == "USER" && userData.nutritionist != null) {
        document.querySelectorAll('.edit-mode').forEach((element) => {
            element.classList.add('d-none');
        });
    }

    document.getElementById("create-meal-button").addEventListener("click", () => {
        createMeal(mealsList, uniqueMealIdCounter, "");
        meals.push(document.querySelector("#meals-list .meal:last-child"));
        uniqueMealIdCounter++;
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-food")) {
            const mealInput = event.target.closest(".meal").querySelector(".meal-title");
            const mealName = mealInput.value.trim();
            
            if (!mealName) {
                alert("Você deve inserir um nome para a refeição antes de adicionar um alimento.");
                mealInput.style.border = "1px solid red";
            } else {
                mealInput.style.border = "none";
                const foodsList = event.target.closest(".meal").querySelector(".foods-list");
                addFood(foodsList, uniqueFoodIdCounter);
                uniqueFoodIdCounter++;
            }
        }

        else if (event.target.classList.contains("save-meal")) {
            const mealID = event.target.closest(".meal").id.replace('meal','');
            const mealInput = event.target.closest(".meal").querySelector(".meal-title");
            const mealName = mealInput.value.trim();
            const foodsIDs = [];
            for (let food of Array.from(event.target.closest(".meal").querySelectorAll(".food-info-name")).map(food => food.value.trim())) {
                for (let foodItem of foodOptions) {
                    if (food == foodItem.foodName)
                        foodsIDs.push(foodItem.id);
                }
            }
            const foodsQuantities = Array.from(event.target.closest(".meal").querySelectorAll(".food-info-quantity")).map(food => food.value.trim());

            if (!mealName) {
                alert("Você deve inserir pelo menos um nome de refeição antes de salvá-la no banco de dados.");
                mealInput.style.border = "1px solid red";
            } else {
                if (foodsIDs.length < 1 || foodsQuantities.length < 1) {
                    alert("Você deve ter pelo menos um alimento na refeição antes de salvá-la no banco de dados.");
                } else {
                    let mealFound = false;
                    for (let meal of userMeals) {
                        if (meal.id == mealID) {
                            mealFound = true;
                            updateMeal(mealID, mealName, foodsIDs, foodsQuantities);
                        }
                    }

                    if (!mealFound)
                        saveNewMeal(mealID, mealName, foodsIDs, foodsQuantities);
                }
            }
        }

        else if (event.target.classList.contains("cancel-new-food")) {
            event.target.closest(".food").querySelector(".new-food").classList.add("d-none");
            event.target.closest(".food").querySelector(".food-dropdown").classList.remove("d-none");
        }

        else if (event.target.classList.contains("create-new-food")) {
            const food = event.target.closest(".food");
            let newFoodForm = food.querySelector(".new-food");
            event.target.closest(".food").querySelector(".food-dropdown").classList.add("d-none");

            if (newFoodForm)
                newFoodForm.classList.remove("d-none");

            else {
                createFood (food, uniqueFoodIdCounter);
                uniqueFoodIdCounter++;
            }
        }

        else if (event.target.classList.contains("confirm-new-food"))  {
            const food = event.target.closest(".food");
            const newFoodForm = food.querySelector(".new-food");

            if (newFoodForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                submitNewFood(food, newFoodForm, uniqueFoodIdCounter);

            } else {
                event.preventDefault();
                event.stopPropagation();
                newFoodForm.classList.add('was-validated');
            }
        }

        else if (event.target.classList.contains("dropdown-item")) {
            const food = event.target.closest(".food");
            food.querySelector(".food-dropdown").remove();

            const selectedFoodName = event.target.textContent;
            const selectedFoodItem = foodOptions.find((item) => item.foodName === selectedFoodName);

            const foodData = {
                name : selectedFoodItem.foodName,
                calories : parseFloat(selectedFoodItem.foodCalories),
                proteins : parseFloat(selectedFoodItem.foodProteins),
                carbs : parseFloat(selectedFoodItem.foodCarbs),
                fats : parseFloat(selectedFoodItem.foodFats),
                portion : selectedFoodItem.foodPortion,
                quantity : ""
            };

            finishFood(food, uniqueFoodIdCounter, foodData);
            uniqueFoodIdCounter++;
        }

        else if (event.target.classList.contains("delete-food")) {
            const food = event.target.closest(".food");
            if (food)
                food.remove();
        }
    });
});