let page = document.querySelector(".page");
let editButton = page.querySelector(".button_type_edit");
let popUp = page.querySelector(".pop-up");

editButton.addEventListener("click", () => {
  popUp.classList.toggle("pop-up_active");
});
