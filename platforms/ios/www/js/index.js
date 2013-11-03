// Generated by CoffeeScript 1.6.3
(function() {
  var addTableRow, checkboxClicked, deleteAllRows, deleteSelectedRow, saveToDoList, viewSelectedRow;

  window.rowID = 0;

  saveToDoList = function() {
    var checkBoxState, chkbox, i, row, rows, table, textValue, textbox, todoArray, _i, _len;
    todoArray = {};
    checkBoxState = 0;
    textValue = '';
    table = document.getElementById('dataTable');
    rows = table.rows;
    if (rows.length > 0) {
      i = 0;
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        chkbox = rows.cells[0].childNodes[0];
        if ((chkbox != null) && chkbox.checked === true) {
          checkBoxState = 1;
        } else {
          checkBoxState = 0;
        }
        textbox = row.cells[1].childNodes[0];
        textValue = textbox.value;
        todoArray["row" + (i++)] = {
          check: checkBoxState,
          text: textValue
        };
      }
    } else {
      todoArray = null;
    }
    return window.localStorage.setItem('todoList', JSON.stringify(todoArray));
  };

  deleteAllRows = function() {
    var i, rowCount, table, _i;
    table = document.getElementById('dataTable');
    rowCount = table.rows.count;
    for (i = _i = 0; 0 <= rowCount ? _i < rowCount : _i > rowCount; i = 0 <= rowCount ? ++_i : --_i) {
      table.deleteRow(i);
      rowCount--;
      i--;
    }
    return saveToDoList();
  };

  viewSelectedRow = function(todoTextField) {
    return alert(todoTextField.value);
  };

  deleteSelectedRow = function(deleteButton) {
    deleteButton.parentNode.parentNode.parentNode.removeChild();
    return saveToDoList();
  };

  checkboxClicked = function() {
    var chkbox, row, rows, table, textbox, _i, _len, _results;
    table = document.getElementById('dataTable');
    rows = table.rows;
    _results = [];
    for (_i = 0, _len = rows.length; _i < _len; _i++) {
      row = rows[_i];
      chkbox = row.cells[0].childNodes[0];
      textbox = row.cells[1].childNodes[0];
      if ((chkbox != null) && chkbox.checked === true && (textbox != null)) {
        textbox.style.setProperty('text-decoration', 'line-through');
      } else {
        textbox.style.setProperty('text-decoration', 'none');
      }
      _results.push(saveToDoList());
    }
    return _results;
  };

  addTableRow = function(todoDictionary, appIsLoading) {
    var cell1, cell2, element1, element2, row, rowCount, table;
    rowID++;
    table = document.getElementById('dataTable');
    rowCount = table.rows.length;
    row = table.insertRow(rowCount);
    cell1 = row.insertCell(0);
    element1 = document.createElement('input');
    element1.type = 'checkbox';
    element1.name = 'chkbox[]';
    element1.checked = todoDictionary['check'];
    element1.setAttribute('onclick', 'checkboxClicked()');
    cell1.appendChild(element1);
    cell2 = row.insertCell(1);
    element2 = document.createElement('input');
    element2.type = 'text';
    element2.name = 'txtbox[]';
    element2.size = 16;
    element2.id = 'text' + rowID;
    element2.value = todoDictionary['text'];
    element2.setAttribute('onchange', 'saveToDoList()');
    cell2.appendChild(element2);
    checkboxClicked();
    saveToDoList();
    if (!appIsLoading) {
      return alert('Task added successfully');
    }
  };

  window.createNewToDo = function() {
    var todo, todoDictionary;
    todoDictionary = {};
    todo = prompt('To-Do', '');
    if (todo != null) {
      if (todo === '') {
        return alert('To-Do can\'t be empty');
      } else {
        todoDictionary = {
          check: 0,
          text: todo
        };
        return addTableRow(todoDictionary, false);
      }
    }
  };

  window.removeCompletedTasks = function() {
    var chkbox, i, rowCount, table, _i;
    table = document.getElementById('dataTable');
    rowCount = table.rows.length;
    for (i = _i = 0; 0 <= rows ? _i < rows : _i > rows; i = 0 <= rows ? ++_i : --_i) {
      chkbox = table.rows[i].cells[0].childNodes[0];
      if ((chkbox != null) && chkbox.checked === true) {
        table.deleteRow(i);
        i--;
        rowCount--;
      }
    }
    saveToDoList();
    return alert('Completed tasks were removed');
  };

  window.loadToDoList = function() {
    var i, key, theList, val, _results;
    theList = JSON.parse(window.localStorage.getItem('todoList'));
    deleteAllRows();
    if (theList !== null && theList !== 'null') {
      i = 0;
      _results = [];
      for (key in theList) {
        val = theList[key];
        _results.push(addTableRow(theList["row" + (i++)], true));
      }
      return _results;
    }
  };

}).call(this);
