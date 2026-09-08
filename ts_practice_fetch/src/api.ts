/* ============================================================
   РАБОТА С API
   Здесь живут все запросы к сети. Задания 1, 2, 3 и 5.

   Документация: https://dummyjson.com/docs/products
   ============================================================ */

import type {
  ApiListResponse,
  ApiProduct,
  Category,
  Product,
} from "./types.ts";

const BASE_URL = "https://dummyjson.com";

async function getJson<T>(url: string): Promise<T> {
   const response = await fetch(url);
   if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  
  // Здесь мы безопасно приводим результат к типу T, 
  // который будет передан при вызове функции
  return (await response.json()) as T;
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 1. Превращаем ApiProduct в Product

   Это чистая функция без всякой асинхронности — просто
   перекладываем поля из чужой модели в свою.

   Что нужно вернуть (см. интерфейс Product в types.ts):
     id       — как есть
     title    — как есть
     price    — как есть
     category — как есть
     image    — берём из api.thumbnail
     inStock  — true, если api.stock больше нуля

   Подсказка: наведите курсор на параметр `api` — редактор
   покажет все доступные поля. Начните печатать `api.` и
   посмотрите на автодополнение. Это и есть польза от типов.
------------------------------------------------------------ */
export function toProduct(api: ApiProduct): Product {
   return {
      id: api.id,
      title: api.title,
      price: api.price,
      category: api.category,
      image: api.thumbnail,
      inStock: api.stock > 0
   }
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 2. Загрузить список товаров

   Шаги:
   1) const response = await fetch(`${BASE_URL}/products?limit=0`)
      limit=0 у этого API означает «отдай все», их 194.
      Если поставить limit=100, придут первые 100 по id — а телефоны
      лежат ближе к концу, и поиск по слову «phone» найдёт пусто.
   2) Проверить response.ok. Если false — бросить ошибку:
         throw new Error(`Ошибка запроса: ${response.status}`)
      ВАЖНО: fetch НЕ бросает исключение на 404 или 500.
      Он спокойно возвращает ответ, и без этой проверки вы будете
      разбирать страницу ошибки как будто это товары.
   3) const data = (await response.json()) as ApiListResponse<ApiProduct>
      response.json() всегда возвращает any — мы обязаны сказать
      TypeScript, что там лежит. Обсудим на занятии, почему `as` —
      это обещание, а не проверка.
   4) Вернуть data.products, прогнав каждый элемент через toProduct.
      Подсказка: data.products.map(toProduct)
------------------------------------------------------------ */
export async function fetchProducts(): Promise<Product[]> {
   const data = await getJson<ApiListResponse<ApiProduct>>(`${BASE_URL}/products?limit=0`);
  return data.products.map(toProduct);
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 3. Загрузить товары одной категории

   Эндпоинт: ${BASE_URL}/products/category/${category}
   Ответ — точно такой же конверт, как в задании 2.

   Логика полностью повторяет fetchProducts. Когда допишете —
   обратите внимание, сколько строк продублировалось. На занятии
   поговорим, как это вынести в одну общую функцию.
------------------------------------------------------------ */
export async function fetchByCategory(category: Category): Promise<Product[]> {
   const data = await getJson<ApiListResponse<ApiProduct>>(`${BASE_URL}/products/category/${category}`);
  return data.products.map(toProduct);
}

/* ------------------------------------------------------------
   ЗАДАНИЕ 5. Загрузить один товар по id

   Эндпоинт: ${BASE_URL}/products/${id}

   Внимание, здесь ловушка: этот эндпоинт возвращает БЕЗ конверта,
   сразу объект товара. Поэтому приводить надо к ApiProduct,
   а не к ApiListResponse<ApiProduct>, и никакого .products.

   Возвращаем ApiProduct, а не Product: в детальном блоке нам
   нужны description и rating, которых в нашей модели нет.
------------------------------------------------------------ */
export async function fetchProductById(id: number): Promise<ApiProduct> {
  // TODO: задание 5
  throw new Error("Задание 5 не выполнено");
}
