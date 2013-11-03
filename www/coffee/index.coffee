window.rowID = 0

saveToDoList = ->
	todoArray = {}
	checkBoxState = 0
	textValue = ''
	table = document.getElementById 'dataTable'
	rows = table.rows
	if rows.length > 0
		i = 0
		for row in rows
			chkbox = rows.cells[0].childNodes[0]
			if chkbox? and chkbox.checked is true
				checkBoxState = 1
			else 
				checkBoxState = 0
			textbox = row.cells[1].childNodes[0]
			textValue = textbox.value
			todoArray["row#{i++}"] = 
				check: checkBoxState
				text: textValue
	else 
		todoArray = null
	window.localStorage.setItem 'todoList', JSON.stringify(todoArray)

deleteAllRows = ->
	table = document.getElementById 'dataTable'
	rowCount = table.rows.count
	for i in [0...rowCount]
		table.deleteRow i
		rowCount--
		i--
	saveToDoList()

viewSelectedRow = (todoTextField)->
	alert todoTextField.value

deleteSelectedRow = (deleteButton)->
	deleteButton.parentNode.parentNode.parentNode.removeChild()
	saveToDoList()

checkboxClicked = ->
	table = document.getElementById 'dataTable'
	rows = table.rows
	for row in rows
		chkbox = row.cells[0].childNodes[0]
		textbox = row.cells[1].childNodes[0]

		if chkbox? and chkbox.checked is true and textbox?
			textbox.style.setProperty 'text-decoration', 'line-through'
		else 
			textbox.style.setProperty 'text-decoration', 'none'

		saveToDoList()


addTableRow = (todoDictionary, appIsLoading)->
	rowID++
	table = document.getElementById 'dataTable'
	rowCount = table.rows.length
	row = table.insertRow rowCount

	#checkbox
	cell1 = row.insertCell 0
	element1 = document.createElement 'input'
	element1.type = 'checkbox'
	element1.name = 'chkbox[]'
	element1.checked = todoDictionary['check']
	element1.setAttribute 'onclick', 'checkboxClicked()'
	cell1.appendChild element1

	#textbox
	cell2 = row.insertCell 1
	element2 = document.createElement 'input'
	element2.type = 'text'
	element2.name = 'txtbox[]'
	element2.size = 16
	element2.id = 'text' + rowID
	element2.value = todoDictionary['text']
	element2.setAttribute 'onchange', 'saveToDoList()'
	cell2.appendChild element2

	#update UI
	checkboxClicked()
	saveToDoList()

	if not appIsLoading
		alert 'Task added successfully'


window.createNewToDo = ->
	todoDictionary = {}
	todo = prompt 'To-Do', ''
	if todo?
		if todo is ''
			alert 'To-Do can\'t be empty'
		else 
			todoDictionary = 
				check: 0
				text: todo
			addTableRow todoDictionary, false

window.removeCompletedTasks = ->
	table = document.getElementById 'dataTable'
	rowCount = table.rows.length
	for i in [0...rows]
		chkbox = table.rows[i].cells[0].childNodes[0]
		if chkbox? and chkbox.checked is true
			table.deleteRow i
			i--
			rowCount--
	saveToDoList()
	alert 'Completed tasks were removed'

window.loadToDoList = ->
	theList = JSON.parse window.localStorage.getItem('todoList')
	deleteAllRows()
	if theList isnt null and theList isnt 'null'
		for i in [0...theList.length]
			addTableRow theList["row#{i}"], true

