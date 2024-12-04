window.sort = function sort() {
    const price = document.getElementById("price");
    const title = document.getElementById("title");

    if (price.checked) {
        getResponse('price');
    } else if (title.checked) {
        getResponse('title');
    } else {
        getResponse(null); // Без сортировки
    }
};

window.search = function search() {
    sort(); // Выполняем сортировку с поиском
};

// Функция загрузки данных
async function getResponse(sortType) {
    try {
        const response = await fetch("shop.json");
        let content = await response.json();

        const word = document.getElementById('search').value.toLowerCase();

        if (word) {
            content = content.filter(product =>
                product.title.toLowerCase().includes(word) ||
                product.price.toString().includes(word)
            );
        }

        if (sortType === 'price') {
            content.sort((a, b) => a.price - b.price);
        } else if (sortType === 'title') {
            content.sort((a, b) => a.title.localeCompare(b.title));
        }

        const nodeForInsert = document.getElementById("node_for_insert");
        nodeForInsert.innerHTML = '';

        content.forEach(product => {
            nodeForInsert.innerHTML += `
                <li style="width: 310px" class="d-flex flex-column m-1 p-1">
                    <img style="width: 180px" height="200" src="${product.img}">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">Цена: ${product.price} р.</p>
                    <input type="hidden" name="vendor_code" value="${product.vendor_code}">
                    <p class="card-text">
                        Заказать
                        <input class="w-25" type="checkbox" name="check" value="0" onclick="this.value = this.checked ? 1 : 0;">
                    </p>
                </li>
            `;
        });

        if (content.length === 0) {
            nodeForInsert.innerHTML = '<li>Ничего не найдено</li>';
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
}