// Функция для отображения текста ошибки
export function displayError(name, errorMessage) {
  const input = document.getElementById(name);
  const inputError = input
    .closest(".form__wrapper")
    .querySelector(".error-message");
  if (inputError) {
    inputError.remove();
  }
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = errorMessage;

  input.closest(".form__wrapper").appendChild(errorElement);
  input.closest(".request__input").classList.add("error-input");
}

// Функция для скрытия текста ошибки
export function hideError(input) {
  console.log(input);
  const errorElement = input
    .closest(".form__wrapper")
    .querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
    input.closest(".request__input").classList.remove("error-input");
  }
}
