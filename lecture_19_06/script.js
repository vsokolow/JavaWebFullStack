const usersForm = document.querySelector('.users_form');
const usersContainer = document.querySelector('.users_container');

const users = JSON.parse(localStorage.getItem('userList')) || []; //ищем в localStorafe актуальный массив users. Если не найден, подставляем пустой массив

usersForm.addEventListener('submit', (event) => {
    event.preventDefault(); //Остановка поведения по умолчанию

    // собираем данные из инпутов, формируем объект
    const newUser = {
        firstname: event.target.firstname.value,
        age: +event.target.age.value
    }

    users.push(newUser); //добавляем объект нового юзера в массив
    renderUsers(users); //вызываем функцию рендера карточек

    localStorage.setItem('usersList', JSON.stringify(users)); //записываем в localStorage актуальный массив users

    event.target.reset();
})

const renderUsers = arr => {
    usersContainer.innerText = ''; //очищаем контейнер перед рендером нового массива
    arr.forEach((el) => {
        const userCard = document.createElement('div');
        const userFirstname = document.createElement('p');
        const userAge = document.createElement('p');

        userFirstname.innerText = `Firstname: ${el.firstname}`;
        userAge.innerText = `Age: ${el.age}`;

        userCard.classList.add('user_card');

        userCard.append(userFirstname, userAge);
        usersContainer.append(userCard);
    })
}

renderUsers(users);
