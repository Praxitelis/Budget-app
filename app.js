/*var budgetController = (function() {

	var x = 23;

	var add = function(a) {
		return x + a;
	}

	return {
		publicTest: function(b) {
			return add(b);
		}
	}

})();


var UIController = (function() {

	//some code

})();


var controller = (function(budgetCtrl, UICtrl) {

	var z = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function() {
			console.log(z);
		}
	}

})(budgetController, UIController);*/



var model = (function() {

	var x = 235;


	var add = function(a) {
		return x + a;
	}

	return {
		theObj: function(b) {
			return add(b);
		}
	}

	

})();


var view = (function() {

	//code

})();


var controller = (function(mod) {

	z = mod.theObj(5);

	return {
		otherObj: function() {

			console.log(z);

		}

	}
	
	
	

})(model, view);