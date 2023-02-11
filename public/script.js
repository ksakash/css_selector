
const onClickHandler = (e) => {
    addRows();
}

const button = document.querySelector('#add');
button.addEventListener("click", onClickHandler);

function createEmptyRow(value) {
    var newRow = document.createElement("tr");
    var emptyCell = newRow.insertCell(0);
    var inputElement = document.createElement("input");
    inputElement.setAttribute("style", "display: none;");
    emptyCell.append(inputElement);
    var valueCell = newRow.insertCell(1);
    valueCell.setAttribute("class", "attribute_value");
    var newInput = document.createElement("input");
    newInput.setAttribute("value", value);
    valueCell.append(newInput);
    return newRow;
}

function renderRow(table, key, values, count) {
    var value = values[0];
    var selector_div = document.createElement("div");
    selector_div.setAttribute("id", count);
    var row = document.createElement("tr");
    var cell1 = row.insertCell(0);
    cell1.setAttribute("class", "attribute_key");
    var cell2 = row.insertCell(1);
    cell2.setAttribute("class", "attribute_value");
    const newInput = document.createElement("input");
    newInput.setAttribute("value", key);
    const newInput2 = document.createElement("input");
    newInput2.setAttribute("value", value);
    cell1.append(newInput);
    cell2.append(newInput2);
    cell2.setAttribute("class", "attribute_value");

    var last_row = row;
    var row_array = [row];

    for(let i = 1; i < values.length; i++) {
        var newVal = values[i];
        var newRow = createEmptyRow(newVal);
        row_array.push(newRow);
        last_row = newRow;
    }
    var btn = document.createElement("button");
    btn.textContent = "ADD";
    btn.addEventListener("click", onAddSelectorButton);
    var cell3 = last_row.insertCell(2);
    cell3.append(btn);
    for(let i = 0; i < row_array.length; i++) {
        var new_row = row_array[i];
        selector_div.appendChild(new_row);
    }
    table.querySelector("tbody").appendChild(selector_div);
}

function onAddSelectorButton() {
    var currentRow = this.parentElement.parentElement;
    var inputVal = currentRow.querySelector("td.attribute_value > input").value;
    if (inputVal == "") {
        return;
    }
    var divElement = this.parentElement.parentElement.parentElement;
    var buttonElement = divElement.querySelector("button");
    var tdElement = buttonElement.parentElement;
    tdElement.removeChild(buttonElement);
    var newRow = document.createElement("tr");
    var emptyCell = newRow.insertCell(0);
    var inputElement = document.createElement("input");
    inputElement.setAttribute("style", "display: none;");
    emptyCell.append(inputElement);
    var valueCell = newRow.insertCell(1);
    valueCell.setAttribute("class", "attribute_value");
    var newInput = document.createElement("input");
    valueCell.append(newInput);
    var buttonCell = newRow.insertCell(2);
    buttonCell.append(buttonElement);
    divElement.appendChild(newRow);
}

function download(content, fileName, contentType) {
    var content_str = JSON.stringify(content);
    var a = document.createElement("a");
    var file = new Blob([content_str], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const save_button = document.querySelector("#save");

function getContent() {
    const divs = document.querySelectorAll('#table > tbody > div');
    var content = {};
    for(let i = 0; i < divs.length; i++) {
        var divElement = divs[i];
        var attribute_key = divElement.querySelector('td.attribute_key > input').value;
        if(attribute_key == "") {
            continue;
        }
        content[attribute_key] = [];
        var values = divElement.querySelectorAll('tr > td.attribute_value > input');
        for(let i = 0; i < values.length; i++) {
            var val = values[i];
            if(val.value === "") {
                continue;
            }
            content[attribute_key].push(val.value);
        }
    }
    return content;
}

const onClickSaver = (e) => {
    var fileName = "selectors.json";
    var type = "text/json;charset=utf-8";
    var content = getContent();
    download(content, fileName, type);
}

save_button.addEventListener("click", onClickSaver);

function renderValues(list) {
    var table = document.getElementById('table');
    var count = 0;
    for(var key in list) {
        var values = list[key];
        renderRow(table, key, values, count);
        count += 1;
    }
}

function readFile() {
    return fetch("/selectors")
    .then(response => response.json());
}

async function get_selector_dict() {
    var dict = await readFile();
    renderValues(dict);
}

get_selector_dict();

function myCreateFunction() {
    var table = document.getElementById('table');
    var div_elements = table.querySelectorAll("tbody > div");
    var count = div_elements.length;
    var lastDiv = div_elements[count-1];
    var cellValue = lastDiv.querySelector("tr > td.attribute_value > input").value;
    if (cellValue == "") {
        return;
    }
    var selector_div = document.createElement("div");
    selector_div.setAttribute("id", count);
    var row = document.createElement("tr");
    var cell1 = row.insertCell(0);
    cell1.setAttribute("class", "attribute_key");
    var cell2 = row.insertCell(1);
    cell2.setAttribute("class", "attribute_value");
    const newInput = document.createElement('input');
    const newInput2 = document.createElement('input');
    cell1.append(newInput);
    cell2.append(newInput2);
    var cell3 = row.insertCell(2);
    cell2.setAttribute("class", "attribute_value");
    var btn = document.createElement("button");
    btn.textContent = "ADD";
    btn.addEventListener("click", onAddSelectorButton);
    cell3.append(btn);
    selector_div.appendChild(row);
    table.querySelector("tbody").appendChild(selector_div);
}

const addRows = () => {
    myCreateFunction();
}
