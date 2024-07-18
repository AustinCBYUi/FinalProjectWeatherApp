/* *********************
* Function to query the DOM for a specific element.
* ******************** */
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}


/* *********************
* Function to render the template to the parent element.
* ******************** */
export function renderWithTemplate(template, parent) {
    parent.insertAdjacentHTML("afterbegin", template);
}


/* *********************
* Function to load templates based off the path.
* ******************** */
async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}


/* *********************
* Function to load the current year for the footer.
* ******************** */
async function loadYear() {
    const date = new Date();
    const year = date.getFullYear();
    const footer = document.querySelector("#dynamic-footer")
    footer.querySelector(".year").textContent = year;
}


/* *********************
* Function to load active page
* ******************** */
async function loadActivePage(element) {
    const getParent = await document.querySelector(".nav-button");
    let getPage = getParent.textContent;
    if (element === getPage) {
        getParent.className = "nav-button-active";
    }
}


/* *********************
* Function to load the header and footer dynamically
* ******************** */
export async function loadHeaderFooter(element) {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const header = qs("#dynamic-header");
    const footer = qs("#dynamic-footer");

    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
    loadYear()
    loadActivePage(element)
}