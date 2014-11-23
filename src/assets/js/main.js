// Output Value of Weight Sliders
var rangeInput = document.querySelectorAll('input[type="range"]');

for(var i = 0; i < rangeInput.length; i++) {
	rangeInput[i].addEventListener('input', outputWeight);
}

function outputWeight() {
	document.querySelector('#'+this.id+'-output').value = this.value;
}

// Add New Pro/Con on Submit
var addForm = document.querySelectorAll('.add-form');

for(var i = 0; i < rangeInput.length; i++) {
	addForm[i].addEventListener('submit', appendItem);
}

function appendItem(e) {
	e.preventDefault();
	var form = 'pro'

	if(this.id == 'con-form') {
		form = 'con';
	}

	var newItem = document.createElement('li'),
		newItemDelete = document.createElement('button'),
		newItemText = document.createTextNode(document.querySelector('#'+form).value),
		newItemWeight = document.createElement('span'),
		newItemWeightText = document.createTextNode(document.querySelector('#'+form+'-weight').value);

	newItemDelete.innerHTML = 'Delete';
	newItemDelete.className = 'delete-btn';
	newItemWeight.className = 'weight';
	newItemWeight.appendChild(newItemWeightText);
	newItem.appendChild(newItemText);
	newItem.appendChild(newItemWeight);
	newItem.appendChild(newItemDelete);

	document.querySelector('#'+form+'s ul').appendChild(newItem);
	this.reset();

	var weightOutput = document.querySelectorAll('.add-form output');

	for(var i = 0; i < rangeInput.length; i++) {
		weightOutput[i].innerHTML = '1';
	}

	calcTotals();
	storeItems();
}

//Output Pro/Con Totals
function calcTotals() {

	var proWeight = 0,
		proList = document.querySelectorAll('#pros ul li .weight'),
		conWeight = 0,
		conList = document.querySelectorAll('#cons ul li .weight');

	for(var i = 0; i < proList.length; i++) {
		proWeight += Number(proList[i].innerHTML);
	}

	for(var i = 0; i < conList.length; i++) {
		conWeight += Number(conList[i].innerHTML);
	}

	document.querySelector('.result.pro').innerHTML = proWeight;
	document.querySelector('.result.con').innerHTML = conWeight;

	if(proWeight > conWeight) {
		document.querySelector('.decision').innerHTML = 'The pros outweigh the cons. Do it or whatever.';
	} else if(conWeight > proWeight) {
		document.querySelector('.decision').innerHTML = 'The cons outweigh the pros. You’d better not.';
	} else if(proWeight === conWeight) {
		if(proWeight === 0) {
			document.querySelector('.decision').innerHTML = 'You need to add some pros and cons, dinkus.';
		} else {
			document.querySelector('.decision').innerHTML = 'The pros and cons are equal. Looks like you’re out of luck. Do whatever you want.';
		}
	}
}

// Remove Pro/Con
var itemList = document.querySelectorAll('.item-list');

for(var i = 0; i < itemList.length; i++) {
	itemList[i].addEventListener('click', removeItem);
}

function removeItem(e) {
	e.preventDefault();

	if(e.target && e.target.nodeName == 'BUTTON') {
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);

		calcTotals();
		storeItems();
	}
}

// Store Values
var pageTitle = document.querySelector('.page-title');

pageTitle.addEventListener('blur', storeTitle);

function storeTitle() {
	localStorage['pageTitle'] = pageTitle.innerHTML;
}

function storeItems() {
	var proList = document.querySelectorAll('#pros ul li'),
		conList = document.querySelectorAll('#cons ul li');

	localStorage['proCount'] = proList.length;
	localStorage['conCount'] = conList.length;

	for(var i = 0; i < proList.length; i++) {
		localStorage['pro'+i] = proList[i].innerHTML;
	}

	for(var i = 0; i < conList.length; i++) {
		localStorage['con'+i] = conList[i].innerHTML;
	}
}

// Recall Values on Page Load
function loadStorage() {
	// Title
	if(localStorage['pageTitle']) {
		pageTitle.innerHTML = localStorage['pageTitle'];
	}

	// Pros
	for(var i = 0; i < localStorage['proCount']; i++) {
		var item = document.createElement('li'),
			itemHTML = localStorage['pro'+i];
		item.innerHTML = itemHTML;
		document.querySelector('#pros ul').appendChild(item);
	}

	// Cons
	for(var i = 0; i < localStorage['conCount']; i++) {
		var item = document.createElement('li'),
			itemHTML = localStorage['con'+i];
		item.innerHTML = itemHTML;
		document.querySelector('#cons ul').appendChild(item);
	}
}

// Initialize Page
loadStorage();
calcTotals();

// Delete List
document.querySelector('.delete-list').addEventListener('click', deleteList);

function deleteList() {
	if(confirm('Are you sure you want to delete this list?')) {
		localStorage.clear();
		location.reload();
	}
}