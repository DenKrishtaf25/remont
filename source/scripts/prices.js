document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".prices__map-item");
    const table = document.querySelector(".prices__table");
    const sections = table.querySelectorAll(".prices__table-wrapper");

    if (links.length > 0) {
        links[0].classList.add("active");
    }

    // Функция для плавной прокрутки
    function smoothScrollTo(element, target, duration = 500) {
        const start = element.scrollTop;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            element.scrollTop = run;
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // При клике — плавная прокрутка и подсветка
    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const targetId = link.getAttribute("href").replace("#", "");
            const targetEl = table.querySelector(`#${targetId}`);

            if (targetEl) {
                // Учитываем отступ для sticky заголовка (если есть)
                const headerHeight = 40; // высота заголовка в px
                const elementTop = targetEl.offsetTop - headerHeight;

                // Используем собственную функцию плавной прокрутки
                smoothScrollTo(table, Math.max(0, elementTop));

                // Обновляем активную ссылку
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

    // При скролле — динамически подсвечиваем текущий раздел
    table.addEventListener("scroll", () => {
        let currentId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const tableRect = table.getBoundingClientRect();

            // Проверяем, что верх блока находится в видимой области
            if (rect.top - tableRect.top <= 50 && rect.bottom > tableRect.top + 100) {
                currentId = section.id;
            }
        });

        if (currentId) {
            links.forEach(link => {
                const targetId = link.getAttribute("href").replace("#", "");
                link.classList.toggle("active", targetId === currentId);
            });
        }
    });
});