import IMask from "imask";
import { host } from "../utils/constants";
import { displayError, hideError } from "../utils/errors";

const element = document.getElementById("phone");
const maskOptions = {
  mask: "+{375} (00) 000-00-00",
};
const mask = IMask(element, maskOptions);
const form = document.querySelector(".form-request__form");
const inputs = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");
const formInps = [...inputs, textarea];
const closeModal = document.querySelector(".modal-exit");
const modal = document.querySelector(".modal");

formInps.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.trim() !== "") {
      e.target.nextElementSibling.style.opacity = 0;
    } else {
      e.target.nextElementSibling.style.opacity = "";
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  fetch(`${host}/api/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.status === "error" && data.hasOwnProperty("fields")) {
        formInps.forEach((inp) => {
          if (data.fields.hasOwnProperty(inp.name)) {
            displayError(inp.name, data.fields[inp.name]);
          } else {
            hideError(inp);
          }
        });
      } else {
        formInps.forEach((inp) => {
          inp.value = "";
          inp.nextElementSibling.style.opacity = "";
          hideError(inp);
        });
        modalOpen(data.message, true);
      }
    })
    .catch((err) => {
      modalOpen(err, false);
    });
});
closeModal.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal");
  modal.classList.add("closing");
  modal.classList.remove("visible");
  setTimeout(() => {
    modal.classList.remove("closing");
    modal.classList.add("invisible");
    document.documentElement.style.overflow = "";
  }, 390);
});

function modalOpen(msg, isSubmit) {
  const text = modal.querySelector(".modal-thanks__text");
  modal.classList.remove("invisible");
  modal.classList.add("visible");
  document.documentElement.style.overflow = "hidden";

  if (isSubmit) {
    text.previousElementSibling.textContent = "Спасибо за вашу заявку!";
    text.textContent = msg;
  } else {
    text.previousElementSibling.textContent = "Ваша заявка не отправлена.";
    text.textContent = msg;
  }
}
