//BUDGET CONTROLLER//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};


	

	var data = {
		allItems: {
		exp: [], //named these exp and inc so that when data.allItems[type] receives the type 
		inc: []	  //it will store it to the appropriate array, as seen at the if then statement below
		},
		totals: {
		exp: 0,
		inc: 0
		}
	
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;


			//[1 2 3 4 5], next ID = 6
			//[1 2 4 6 8], nexti ID = 9
			// ID = last ID + 1


			// Create new ID  -- If our data object is empty then our ID should be 0 before incrementing
			if (data.allItems[type].length > 0) {
			ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
		} else {
			ID = 0;
		}
			//Create new item based on inc or exp type
			if (type === 'exp')	{
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into data structure
			data.allItems[type].push(newItem);
			// Return the new element
			return newItem;
		},

		testing: function() {
			console.log(data);
		}
	}

})();

//UI CONTROLLER///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var UIController = (function() {

	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	}

	return {
		getInput: function() {

			return {

			type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
			description: document.querySelector(DOMstrings.inputDescription).value,
			value: parseFloat( document.querySelector(DOMstrings.inputValue).value) // converted the value to a number in order to make calulations

			};
		},

		addListItem: function(obj, type){
			var html, newHtml, element;
			// Create HTML string with placeholder text
			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div>' +
				'<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div>' + 
				'<div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			


			//Replace the placeholder text with some actual data

			newHtml = html.replace('%id%', obj.id); // next we have to replace in the newHtml otherwise the id replace wont take place
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


		},


		clearFields: function() {

			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
			DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array){
				current.value = "";

			});

			fieldsArr[0].focus(); // set focus to first input after input fields are empty

		},


		getDOMstrings: function() {
			return DOMstrings;
		}
	};

})();



// GLOBAL APP CONTROLLER //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
		//event.which is for older browsers
			if (event.keyCode === 13 || event.which === 13) {
			
			ctrlAddItem();

			}
		});
	};

	
	var updateBudget = function(){

		// 1. Calculate the budget


		// 2. Return Budget


		// 3. Display the budget on the UI

	};



	var ctrlAddItem = function() {
		var input, newItem;
		// 1. Get the field input data
		input = UICtrl.getInput();
		
		// Check if the input values are valid, meaning not empty or not a number
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

		// 3. Add the item to the UI
		UICtrl.addListItem(newItem, input.type);


		// 4. Clear Fields
		UICtrl.clearFields();

		// 5. Calculate and update Budget
		updateBudget();

		}

		
	};

	return {
		init: function() {
			console.log('App has started.');
			setupEventListeners();
		}
	}

	

})(budgetController, UIController);


controller.init();



