function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone);
}

function validateForm(values) {
  const { name, email, phone, message } = values;
  const fields = {};
  let isValid = true;

  if (name.trim() === "") {
    isValid = false;
    fields.name = "Пожалуйста, введите ваше имя";
  }

  if (!isValidEmail(email)) {
    isValid = false;
    fields.email = "Пожалуйста, введите корректный email";
  }

  if (!isValidPhone(phone)) {
    isValid = false;
    fields.phone = "Пожалуйста, введите корректный номер телефона";
  }

  if (message.trim() === "") {
    isValid = false;
    fields.message = "Пожалуйста, введите сообщение";
  }

  return { status: isValid, fields };
}

module.exports = { validateForm };
