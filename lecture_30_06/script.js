const todosContainer = document.querySelector('.todos_container');

let todos = [];

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(json => {
        todos = json;
        renderCards(todos)
    })

const renderCards = arr => {
    todosContainer.innerHTML = '';
    
    arr.forEach(({ id, title, completed }) => {
        const todoCard = document.createElement('div');
        const todoId = document.createElement('p');
        const todoTitle = document.createElement('p');
        const todoStatus = document.createElement('p');
        const deleteBtn = document.createElement('button');

        todoCard.dataset.id = id; //добавляем каждой карточке атрибут data-id с уникальным значением (id карточки)

        console.log(todoCard.dataset);

        todoTitle.innerText = title;
        todoId.innerText = id;
        todoStatus.innerText = completed ? 'Done' : 'Not done';
        deleteBtn.innerText = 'Delete';

        todoCard.style.backgroundColor = completed ? 'Lightgreen' : 'Lightgray';


        todoCard.append(todoId, todoTitle, todoStatus, deleteBtn);
        todosContainer.append(todoCard);
    })
}


todosContainer.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('button');
    const card = event.target.closest('[data-id]');
    if(!card) return 

    if(deleteBtn){
        renderCards(todos.filter(el => el.id !== +card.dataset.id))
    } else {
        const targetCard = todos.find(el => el.id === +card.dataset.id);
        targetCard.completed =!targetCard.completed;
        renderCards(todos);
    }


})



