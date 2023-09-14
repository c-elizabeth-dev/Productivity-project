  //* Calendar ---Start ---

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const day = document.querySelector(".calendar-dates");

  const currentDate = document.querySelector(".calendar-current-date");
  const prevNextIcons = document.querySelectorAll(".calendar-navigation span");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const manipulate = () => {
    let dayOne = new Date (year, month, 1).getDay();
    let lastDate = new Date (year, month +1, 0).getDate();
    let dayEnd = new Date(year, month, lastDate).getDay();
    let monthLastDate = new Date(year, month, 0).getDate();
    let lit="";
  

  for (let i=dayOne; i>0; i--) {
    lit +=
    `<li class="inactive">${monthLastDate - i + 1}</li>`;
  }

  for (let i=1; i <= lastDate; i++) {
    let isToday = i === date.getDate()
    && month === new Date().getMonth()
    && year === new Date().getFullYear()
    ? "active" : "";
    lit += `<li class="${isToday}">${i}</li>`
  }

  for (let i = dayEnd; i<6; i++) {
    lit += `<li class="inactive">${i - dayEnd + 1}</li>`
  }

  currentDate.innerText = `${months[month]} ${year}`;
  day.innerHTML=lit;
}

manipulate();

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id ==="calendar-prev" ? month -1 :month +1;
        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }
        else {
            date = new Date();
        }
        manipulate();
        
    });
});

//* ---Calendar End ---