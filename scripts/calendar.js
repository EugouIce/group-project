let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById("monthYear").innerText =
        `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarBody = document.getElementById("calendarBody");
    calendarBody.innerHTML = "";

    let date = 1;

    // 6 weeks (max needed in a month)
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.innerHTML = "";
            } else if (date > daysInMonth) {
                cell.innerHTML = "";
            } else {
                cell.innerHTML = date;

                const today = new Date();
                if (
                    date === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    cell.classList.add("today");
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

renderCalendar();
