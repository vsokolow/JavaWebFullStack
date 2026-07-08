import './style.css'
// import axios from 'axios'

const productsContainer = document.querySelector(".products_container");

const API_URL = 'https://fakestoreapi.com/products';

// СПОСОБ 1
fetch(API_URL)
  .then(response => response.json())
  .then(data => renderProducts(data));

// СПОСОБ 2
  // const sendRequest = async () => {
  //   const response = await fetch(API_URL)
  //   const data = await response.json()
  //   renderProducts(data)
  // }

  // sendRequest();

  // СПОСОБ 3
  // const sendRequest = async () => {
  //   const response = await axios.get(API_URL);
  //   renderProducts(response.data)
  // }

  // sendRequest();

  const renderProducts = arr => {
    arr.forEach(({ image, title, price}) => {
      const productCard = document.createElement('div');
      const productImg = document.createElement('img');
      const productTitle = document.createElement('p');
      const productPrice = document.createElement('p');

      productImg.src = image;
      productImg.alt = title;
      productTitle.innerText = title;
      productPrice.innerText = `${price}$`;

      productCard.append(productImg, productTitle, productPrice);
      productsContainer.append(productCard);
    })
  }