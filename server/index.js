const { validateForm } = require("./utils/validation");
const express = require("express");
const cors = require("cors");
const app = express();

const port = 9090;

app.use(cors());
app.use(express.json());

app.post("/api/registration", async (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        message: "Bad request",
      });
    }, Math.random() * 1000);

    return;
  }
  const formErrors = validateForm(req.body);

  if (Object.keys(formErrors.fields).length === 0) {
    setTimeout(() => {
      res.statusCode = 200;
      res.send({
        status: "success",
        message: "Ваша заявка успешно отправлена.",
      });
    }, Math.random() * 1000);
  } else {
    setTimeout(() => {
      res.statusCode = 200;
      res.send({
        status: "error",
        fields: formErrors.fields,
      });
    }, Math.random() * 1000);
  }
});

app.get("/api/ping", (req, res) => {
  res.statusCode = 200;
  res.send({
    status: "success",
    message: "Server is ready",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
