function highlightMenu(elem) {
    let links = document.querySelectorAll(".sidebar a");
    links.forEach(link => link.classList.remove("active"));
    if (elem) elem.classList.add("active");
}