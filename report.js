const tableBody = document.querySelector("#firTable tbody");

function loadFIRs() {
  const firs = JSON.parse(localStorage.getItem("firs") || "[]");
  tableBody.innerHTML = "";

  firs.forEach((fir, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${fir.firNumber}</td>
      <td>${fir.fullname}</td>
      <td>${fir.mobile}</td>
      <td>${fir.policestation}</td>
      <td>${fir.district}</td>
      <td>${fir.taluka}</td>
      <td>${fir.village}</td>
      <td>${fir.enquiryofficer}</td>
      <td>${fir.datetime}</td>
      <td>${fir.suspect}</td>
      <td>
        <button onclick="editFIR(${index})">Edit</button>
        <button onclick="deleteFIR(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function editFIR(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "../fir/fir-form.html"; // 🔁 इथे path बरोबर आहे का ते check कर
}

function deleteFIR(index) {
  const firs = JSON.parse(localStorage.getItem("firs") || "[]");
  if (confirm("Are you sure you want to delete this FIR?")) {
    firs.splice(index, 1);
    localStorage.setItem("firs", JSON.stringify(firs));
    loadFIRs(); // reload updated data
  }
}

function exportToExcel() {
  const table = document.getElementById("firTable");
  const workbook = XLSX.utils.table_to_book(table, { sheet: "FIR Report" });
  XLSX.writeFile(workbook, "FIR_Report.xlsx");
}

window.onload = loadFIRs;
