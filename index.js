var express = require("express");
var app = express();

const fs = require("fs");

app.get("/students", function(req, res) {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  res.send(students);
});

app.get("/students/:id", function(req, res) {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  const idr = students.findIndex(
    student => student.id === Number(req.params.id)
  );
  if (idr !== -1) {
    res.send(students[idr]);
  } else {
    res.send("Студент с таким id не существует");
  }
});

app.delete("/students/:id", function(req, res) {
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  const idr = students.findIndex(
    student => student.id === Number(req.params.id)
  );
  if (idr !== -1) {
    students.splice(idr, 1);
    fs.writeFileSync("students.json", JSON.stringify(students));
    res.send(students);
  } else {
    res.send("Студент с таким id не существует");
  }
});

app.put("/students/:id", function(req, res) {
  let date = new Date();
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  const idr = students.findIndex(
    student => student.id === Number(req.params.id)
  );
  if (idr !== -1) {
    students[idr].firstName = req.query.firstName;
    students[idr].updatedAt = date.toLocaleString();
    fs.writeFileSync("students.json", JSON.stringify(students));
    res.send(students);
  } else {
    res.send("Студент с таким id не существует");
  }
});

app.post("/students", function(req, res) {
  let date = new Date();
  const data = fs.readFileSync("students.json", "utf8");
  const students = JSON.parse(data);
  console.log(students.length);
  var student = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    group: req.query.group,
    createdAt: date.toLocaleString(),
    updatedAt: date.toLocaleString()
  };
  let idq = students[students.length - 1].id + 1;
  students.push(Object.assign({ id: idq }, student));
  fs.writeFileSync("students.json", JSON.stringify(students));
  res.send("Ваши данные учтены, спасибо");
});

app.listen(3000);
