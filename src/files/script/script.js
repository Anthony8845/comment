const formElement = document.querySelector(".form"); // извлекаем элемент формы
let commentContainer = document.querySelector(".comment-container");
let field = document.querySelectorAll(".field");
let warning = document.querySelectorAll(".warning");
let container = document.querySelectorAll(".container");
let btn = document.querySelector(".btn");
let like = document.querySelector(".like");
let deleteBtn = document.querySelector(".delete");

btn.setAttribute("disabled", "disabled");

document.addEventListener("click", (e) => {
  let target = e.target;
  if (
    !target.classList.contains("like") &&
    !target.classList.contains("delete")
  )
    return;

  // like
  if (
    target.classList.contains("active") ||
    !target.classList.contains("like")
  ) {
    target.classList.remove("active");
  } else {
    target.classList.add("active");
  }

  //delete
  if (target.classList.contains("delete")) {
    e.preventDefault();
    target.parentNode.parentNode.parentNode.parentNode.remove();
  }
});

function fieldValid(e, i) {
  e.oninput = () => {
    if (!e.value) {
      btn.setAttribute("disabled", "disabled");
      warning[i].innerHTML = "Обязательно к заполнению!";
    } else {
      if (field[0].value && field[1].value) {
        btn.removeAttribute("disabled");
      }
      warning[i].innerHTML = "";
    }
    return;
  };
  return;
}

function dateValid(date, dateToday) {
  if (!date) return "Сегодня";
  let newDate = date.split("-").reverse();
  let todayOrTommorow;
  if (+newDate[0] === dateToday.getDate()) {
    return (todayOrTommorow = "Сегодня");
  } else if (+newDate[0] === dateToday.getDate() - 1) {
    return (todayOrTommorow = "Вчера");
  } else {
    return (todayOrTommorow = newDate.join("."));
  }
}

let createComment = (name, comment, date) => {
  let dataEq = new Date();
  let minutes = dataEq.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = dataEq.getHours() + ":" + minutes;

  return (commentContainer.innerHTML += `
      <div class="comment">
        <div class="comment__info">
          <div class="info__name">Name: ${name}</div>
          <div class="info__date">Date: ${
            dateValid(date, dataEq) + ", " + time
          }</div>
          <div class="btn__src" >
            <a class="likeBtn" href="javascript:void(0)">
              <div class="like icon"></div>
            </a>
            <a href="javascript:void(0)">
              <div class="delete icon"></div>
            </a>
          </div>
        </div>
        <div class="comment__text">${comment}</div>
      </div>
  `);
};

for (let i = 0; i < container.length; i++) {
  fieldValid(field[i], i);
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();

  btn.setAttribute("disabled", "disabled");
  const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы

  const name = formData.get("username");
  const comment = formData.get("text");
  const date = formData.get("date");

  createComment(name, comment, date);
  e.target.reset();
});
