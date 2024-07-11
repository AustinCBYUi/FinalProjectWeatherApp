export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function renderWithTemplate(template, parent) {
    parent.insertAdjacentHTML("afterbegin", template);
}

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

async function loadYear() {
    const date = new Date();
    const year = date.getFullYear();
    const footer = document.querySelector("#dynamic-footer")
    footer.querySelector(".year").textContent = year;
}

export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const header = qs("#dynamic-header");
    const footer = qs("#dynamic-footer");

    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
    loadYear()
}