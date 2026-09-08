/* ============================================================
   ТОЧКА ВХОДА: DOM, события, рендер.
   Задания 4 и 5.
   ============================================================ */

import "./style.css";
import { CATEGORIES } from "./types.ts";
import type { CategoryFilter, Product } from "./types.ts";
import { fetchByCategory, fetchProductById, fetchProducts } from "./api.ts";

/* ------------------------------------------------------------
   Ссылки на элементы страницы.

   Про восклицательный знак в конце: querySelector возвращает
   HTMLElement | null, потому что элемента может не оказаться.
   Знак `!` — это обещание компилятору «я точно знаю, он есть».
   Мы можем себе это позволить, потому что сами писали index.html.

   Дженерик в угловых скобках нужен, чтобы получить именно
   HTMLInputElement и иметь доступ к .value — у обычного
   HTMLElement такого свойства нет.
------------------------------------------------------------ */
const searchInput = document.querySelector<HTMLInputElement>("#search")!;
const categorySelect = document.querySelector<HTMLSelectElement>("#category")!;
const statusEl = document.querySelector<HTMLParagraphElement>("#status")!;
const listEl = document.querySelector<HTMLDivElement>("#list")!;
const detailsEl = document.querySelector<HTMLDivElement>("#details")!;

/* Состояние приложения: последний загруженный список товаров.
   Поиск фильтрует именно его, не делая новый запрос. */
let currentProducts: Product[] = [];

/* ------------------------------------------------------------
   Готовые вспомогательные функции. Менять не нужно.
------------------------------------------------------------ */

function showStatus(message: string, isError = false): void {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

/* Заполняем выпадающий список категориями из CATEGORIES */
function fillCategorySelect(): void {
  for (const category of CATEGORIES) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  }
}

/* Рисуем карточки. Обратите внимание на тип параметра:
   Product[] — массив наших товаров. Если передать сюда
   массив ApiProduct, TypeScript не пропустит. */
function renderList(products: Product[]): void {
  listEl.innerHTML = "";

  if (products.length === 0) {
    showStatus("Ничего не найдено");
    return;
  }

  for (const product of products) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <div class="price">${product.price} $</div>
      <div class="category">${product.category}</div>
      <div class="category">${product.inStock ? "в наличии" : "нет в наличии"}</div>
    `;
    card.addEventListener("click", () => {
      void showDetails(product.id);
    });
    listEl.append(card);
  }
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 4. Поиск по названию

   Функция должна вернуть НОВЫЙ массив — только те товары,
   у которых в названии встречается query.

   Подсказка:
     products.filter((p) => ...)
   Регистр не должен мешать: приведите обе строки
   к нижнему регистру через .toLowerCase() и используйте
   .includes(...)

   Если query — пустая строка, вернутся все товары
   (пустая строка входит в любую строку — проверьте, почему).
------------------------------------------------------------ */
function filterByQuery(products: Product[], query: string): Product[] {
  // TODO: задание 4
  return products;
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 5 (вторая часть). Показать детали товара

   Первая часть — fetchProductById в api.ts.

   Что нужно сделать здесь:
   1) detailsEl.hidden = false
   2) detailsEl.textContent = "Загрузка…"
   3) В блоке try: получить товар через await fetchProductById(id)
      и отрисовать. Готовая разметка — ниже, скопируйте её внутрь try:

        detailsEl.innerHTML = `
          <h2>${product.title}</h2>
          <img src="${product.thumbnail}" alt="${product.title}" />
          <p>${product.description}</p>
          <p>Цена: ${product.price} $</p>
          <p>Рейтинг: ${product.rating}</p>
          <button id="close">Закрыть</button>
        `;
        detailsEl.querySelector("#close")!.addEventListener("click", () => {
          detailsEl.hidden = true;
        });

   4) В блоке catch: показать текст ошибки в detailsEl.
      Как доставать текст из unknown — смотрите в loadProducts ниже.
------------------------------------------------------------ */
async function showDetails(id: number): Promise<void> {
  // TODO: задание 5, вторая часть
}

/* ------------------------------------------------------------
   Загрузка списка с учётом выбранной категории.
   Готово — менять не нужно, но прочитайте внимательно:
   здесь видно, зачем нужны try и catch.
------------------------------------------------------------ */
async function loadProducts(filter: CategoryFilter): Promise<void> {
  showStatus("Загрузка…");
  listEl.innerHTML = "";

  try {
    /* Тернарный оператор выбирает, какую из двух функций вызвать.
       Обе возвращают Promise<Product[]>, поэтому типы сходятся. */
    currentProducts =
      filter === "all" ? await fetchProducts() : await fetchByCategory(filter);

    /* После загрузки сразу применяем текущий поисковый запрос */
    const visible = filterByQuery(currentProducts, searchInput.value);
    renderList(visible);

    if (visible.length > 0) {
      showStatus(`Найдено товаров: ${visible.length}`);
    }
  } catch (error) {
    /* В catch переменная имеет тип unknown — TypeScript не знает,
       что именно бросили. Поэтому проверяем через instanceof. */
    const message =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    showStatus(message, true);
  }
}

/* ------------------------------------------------------------
   Подписки на события. Готово.
------------------------------------------------------------ */

categorySelect.addEventListener("change", () => {
  detailsEl.hidden = true;
  void loadProducts(categorySelect.value as CategoryFilter);
});

searchInput.addEventListener("input", () => {
  /* Поиск не ходит в сеть: фильтруем уже загруженный массив */
  const visible = filterByQuery(currentProducts, searchInput.value);
  renderList(visible);
});

/* Старт приложения */
fillCategorySelect();
void loadProducts("all");
