"user strict"

let sessionTodosContainer = document.getElementById(
    'session-storage-todos-container'
);
let sessionInputEle = document.getElementById(
    'session-storage-todo-input-ele'
);
let sessionAddTaskBtn = document.getElementById(
    'session-storage-add-task-btn'
);

function createTodoLiElements(todoArray) {
    return todoArray.map((i, index) => {
        let liElement = document.createElement('li');
        let checkboxEle = document.createElement('input');
        let labelEle = document.createElement('label');

        checkboxEle.setAttribute('type', 'checkbox');
        checkboxEle.setAttribute('id', `session-chbx-${index}`);
        labelEle.setAttribute('for', `session-chbx-${index}`);

        checkboxEle.addEventListener('click', (e) => {
            let todoArr = JSON.parse(sessionStorage.getItem('codesweetlyStore'));
            todoArr[e.target.getAttribute('id').split('-')[2]].checked =
                !todoArr[e.target.getAttribute('id').split('-')[2]].checked;
            sessionStorage.setItem('codesweetlyStore', JSON.stringify(todoArr));
            labelEle.classList.toggle('todo-task-done');
        });




        labelEle.textContent = i.text;
        liElement.append(checkboxEle, labelEle);
        return liElement;
    });
}

window.addEventListener(
    'load',
    (() => {
        let sessionTodoArray =
            JSON.parse(sessionStorage.getItem('codesweetlyStore')) || [];
        console.log(sessionTodoArray);
    })()
);

sessionAddTaskBtn.addEventListener('click', () => {
    // Get existing session storage's content, if any. Otherwise, return an empty array:
    let currentTodoArray =
        JSON.parse(sessionStorage.getItem('codesweetlyStore')) || [];

    // Merge currentTodoArray with the user's new input:
    let newTodoArray = [
        ...currentTodoArray,
        { checked: false, text: sessionInputEle.value },
    ];

    // Add newTodoArray to the session storage object:
    sessionStorage.setItem('codesweetlyStore', JSON.stringify(newTodoArray));

    let todoLiElements = createTodoLiElements(newTodoArray);
    sessionTodosContainer.replaceChildren(...todoLiElements);
    sessionInputEle.value = '';
});




let localTodosContainer = document.getElementById(
    'local-storage-todos-container'
);
let localInputEle = document.getElementById(
    'local-storage-todo-input-ele'
);
let localAddTaskBtn = document.getElementById(
    'local-storage-add-task-btn'
);

function createTodoLiElements(todoArray) {
    return todoArray.map((i, index) => {
        let liElement = document.createElement('li');
        let checkboxEle = document.createElement('input');
        let labelEle = document.createElement('label');

        checkboxEle.setAttribute('type', 'checkbox');
        checkboxEle.setAttribute('id', `local-chbx-${index}`);
        labelEle.setAttribute('for', `local-chbx-${index}`);

        checkboxEle.addEventListener('click', (e) => {
            let todoArr = JSON.parse(localStorage.getItem('codesweetlyStore'));
            todoArr[e.target.getAttribute('id').split('-')[2]].checked =
                !todoArr[e.target.getAttribute('id').split('-')[2]].checked;
            localStorage.setItem('codesweetlyStore', JSON.stringify(todoArr));
            labelEle.classList.toggle('todo-task-done');
        });

        labelEle.textContent = i.text;
        liElement.append(checkboxEle, labelEle);
        return liElement;
    });
}

window.addEventListener(
    'load',
    (() => {
        let localTodoArray =
            JSON.parse(localStorage.getItem('codesweetlyStore')) || [];
        console.log(localTodoArray);
    })()
);

localAddTaskBtn.addEventListener('click', () => {
    // Get existing local storage's content, if any. Otherwise, return an empty array:
    let currentTodoArray =
        JSON.parse(localStorage.getItem('codesweetlyStore')) || [];

    // Merge currentTodoArray with the user's new input:
    let newTodoArray = [
        ...currentTodoArray,
        { checked: false, text: localInputEle.value },
    ];

    // Add newTodoArray to the local storage object:
    localStorage.setItem('codesweetlyStore', JSON.stringify(newTodoArray));

    let todoLiElements = createTodoLiElements(newTodoArray);
    localTodosContainer.replaceChildren(...todoLiElements);
    localInputEle.value = '';
});



function storeValue(key, value) {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        $.cookies.set(key, value);
    }
}

function getStoredValue(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    } else {
        return $.cookies.get(key);
    }
}