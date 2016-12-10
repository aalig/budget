// Budget controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            expense: []
            , income: []
        }
        , totals: {
            expense: 0
            , income: 0
        }
    };

    return {
        addItem: function (type, desc, val) {

            var newItem, type, id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1] + 1;
            } else {
                id = 0;
            }

            if (type === 'expense') {
                newItem = new Expense(id, desc, val);

            } else if (type === 'income') {
                newItem = new Income(id, desc, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }
        , getData: function () {
            console.log(data);
        }
    }

}());

// UI controller
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type'
        , inputDescription: '.add__description'
        , inputValue: '.add__value'
        , inputBtn: '.add__btn'
        , incomeList: '.income__list'
        , expenseList: '.expenses__list'
    };

    return {
        getInput: function () {
            {
                return {
                    type: document.querySelector(DOMstrings.inputType).value
                    , description: document.querySelector(DOMstrings.inputDescription).value
                    , value: document.querySelector(DOMstrings.inputValue).value
                };
            }
        }
        , addListItem: function (item, type) {
            var html, newHtml, element;

            if (type === 'income') {

                element = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'expense') {

                element = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', item.id).replace('%description%', item.description).replace('%value%', item.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        }
        , clearInputFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            for (var i = 0; i < fieldsArr.length; i++) {
                fieldsArr[i].value = '';
            }

            fieldsArr[0].focus();
        }
        , getDOMstrings: function () {
            return DOMstrings;
        }
    };

}());

// General app controller
var controller = (function (budgetCtrl, UICtrl) {

    function setUpEventListeners() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {

        var input, newItem;

        // 1. Get the field input data
        input = UIController.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4. Clear the input fields
        UICtrl.clearInputFields();

        // 5. Calculate the budget
        // 6. Display budget to the UI
    }

    return {
        init: function () {
            console.log('Application started...');
            setUpEventListeners();
        }
    }

}(budgetController, UIController));

controller.init();