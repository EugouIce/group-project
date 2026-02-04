function showSection(id, elem) {
    let sections = ["dashboard", "profile", "subjects", "grades"];
    sections.forEach(sec => document.getElementById(sec).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    highlightMenu(elem);
}
