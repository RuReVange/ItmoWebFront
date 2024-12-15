document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.about-us__container-row');
    const preloader = document.querySelector('.preloader');
    const errorMessage = document.querySelector('.error-message');

    let isFirstLoad = true;

    function fetchData() {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        return fetch('https://jsonplaceholder.typicode.com/posts', {
            signal: controller.signal
        })
            .then(response => {
                clearTimeout(timeout);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
    }

    function filterData(data) {
        return isFirstLoad
            ? data.filter(post => post.id > 50)
            : data.filter(post => post.id <= 50);
    }

    function createHTML(posts) {
        return posts.slice(0, 3).map(post => `
            <div class="about-us__container-col">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `).join('');
    }

    function loadCompanyData() {
        preloader.style.display = 'flex';
        errorMessage.style.display = 'none';

        fetchData()
            .then(data => {
                const filteredData = filterData(data);
                container.innerHTML = createHTML(filteredData);
                isFirstLoad = !isFirstLoad;
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                preloader.style.display = 'none';
            });
    }

    preloader.style.display = 'none';

    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Загрузить новые данные';
    refreshButton.classList.add('refresh-button');
    document.querySelector('.about-us__container').appendChild(refreshButton);

    refreshButton.addEventListener('click', loadCompanyData);
});