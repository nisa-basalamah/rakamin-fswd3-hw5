let dataCounter = 2;
let tableData = [
  [1, 2],
  ["Giacomo Guilizzoni", "Marco Botton"],
  [40, 38],
  [365000, 179000],
];

class FormData {
  constructor(nama, umur, uangSangu) {
    this.nama = nama;
    this.umur = umur;
    this.uangSangu = uangSangu;
  }

  updateTable(inputData) {
    // push form input value into table data array
    tableData[0].push((dataCounter += 1));

    let index = 1;
    for (let key in inputData) {
      tableData[index].push(inputData[key]);
      index++;
    }

    // create <tr> element to add new table row
    const trElement = document.createElement("tr");

    // create <th> element inside <tr> for column 'No.' data
    const thElement = document.createElement("th");
    thElement.setAttribute("scope", "row");

    const thValue = document.createTextNode(dataCounter);
    thElement.appendChild(thValue);
    trElement.appendChild(thElement);

    // create new <td> element inside <tr> for registration data
    for (let key in inputData) {
      const tdElement = document.createElement("td");
      const tdValue = document.createTextNode(inputData[key]);
      tdElement.appendChild(tdValue);
      trElement.appendChild(tdElement);
    }

    // recalculate table summary result
    let averageAge = Math.round(collect(tableData[2]).average());
    let averageMoney = Math.round(collect(tableData[3]).average() * 100) / 100;

    // wait 2.5 seconds before updating data
    setTimeout(function () {
      document.getElementById("list-pendaftar-body").appendChild(trElement);

      document.getElementById(
        "table-summary"
      ).innerHTML = `Rata rata pendaftar memiliki uang sangu sebesar Rp${averageMoney.toLocaleString(
        "id-ID"
      )} dengan rata-rata umur ${averageAge}.`;
    }, 2500);
  }
}

function getFormInput() {
  const formInput = {
    inputNama: document.getElementById("inputNama").value,
    inputUmur: document.getElementById("inputUmur").value,
    inputUangSangu: document.getElementById("inputUangSangu").value,
  };

  // do validity check and only proceed if no errors are raised
  var registrationForm = document.getElementsByClassName("needs-validation");

  if (registrationForm[0].checkValidity()) {
    const newData = new FormData(
      formInput.inputNama,
      formInput.inputUmur,
      formInput.inputUangSangu
    );
    newData.updateTable(formInput);
  }

  (function () {
    "use strict";

    // get the form to be validated and prevent submission
    registrationForm[0].addEventListener(
      "submit",
      function (event) {
        // prevent page refresh
        event.preventDefault();

        if (!registrationForm[0].checkValidity()) {
          event.stopPropagation();
        } else {
          // reset the input field
          registrationForm[0].reset();
        }

        registrationForm[0].classList.add("was-validated");
      },
      false
    );
  })();
}
