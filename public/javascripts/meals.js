let datePicker = document.querySelector('input[type=date]');
datePicker.addEventListener('input', e => {
  if (datePicker.value) {
    e.target.parentElement.submit();
  }
});

let tableElm = document.getElementsByTagName("table")[0];
tableElm.addEventListener("click", (e) => {
  //console.log(e.target.tagName);
  if (e.target.tagName === "BUTTON") {
    let formElm = document.createElement("form");
    formElm.method = "POST";
    formElm.action = "/meals";

    let mealId = document.createElement("input");
    mealId.name = "id";
    mealId.value = e.target.id;
    formElm.appendChild(mealId);

    let mealInput = document.createElement("input");
    mealInput.name = "quantity"
    mealInput.value = +!parseInt(e.target.value, 10);
    formElm.appendChild(mealInput);

    let mealDate = document.createElement("input");
    mealDate.name = "date";
    mealDate.value = document.querySelector("input[name=date]").value;
    formElm.appendChild(mealDate);

    formElm.hidden = true;
    document.body.appendChild(formElm);
    formElm.submit();
  }
});
