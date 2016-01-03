/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var NewProblemPage = function() {
	var form = this.form = element(by.css('.form'));
  	form.name = form.element(by.model('problem.name'));
	form.desc = form.element(by.model('problem.desc'));	  
	form.submit = form.element(by.css('.btn-submit'));
	
	this.submitNewProblem = function(data) {
		for (var prop in data) {
			var formElem = form[prop];
			if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
				formElem.sendKeys(data[prop]);
			}
		}
	
		form.submit.click();
	};
};

module.exports = new NewProblemPage();

