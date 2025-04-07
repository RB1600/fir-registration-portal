const form = document.getElementById('firForm'); 
const firNumber = document.getElementById('firNumber');
const editIndex = localStorage.getItem("editIndex");

// Dummy data structure (You can replace this with full India data)
const locationData = {
  Maharashtra: {
    Pune: {
      "Haveli": ["Wagholi", "Kharadi"],
      "Mulshi": ["Pirangut", "Paud"]
    },
    Mumbai: {
      "City": ["Marine Drive", "Colaba"],
      "Suburban": ["Andheri", "Bandra"]
    }
  },
  Gujarat: {
    Ahmedabad: {
      "Daskroi": ["Bopal", "Gota"],
      "City": ["Navrangpura", "Paldi"]
    }
  }
};

// Dropdowns
const stateSelect = document.getElementById('state');
const districtSelect = document.getElementById('district');
const talukaSelect = document.getElementById('taluka');
const villageSelect = document.getElementById('village');

function populateSelect(select, options) {
  select.innerHTML = '<option value="">Select</option>';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = option.textContent = opt;
    select.appendChild(option);
  });
}

populateSelect(stateSelect, Object.keys(locationData));

stateSelect.addEventListener('change', () => {
  const districts = Object.keys(locationData[stateSelect.value] || {});
  populateSelect(districtSelect, districts);
  populateSelect(talukaSelect, []);
  populateSelect(villageSelect, []);
});

districtSelect.addEventListener('change', () => {
  const talukas = Object.keys(locationData[stateSelect.value]?.[districtSelect.value] || {});
  populateSelect(talukaSelect, talukas);
  populateSelect(villageSelect, []);
});

talukaSelect.addEventListener('change', () => {
  const villages = locationData[stateSelect.value]?.[districtSelect.value]?.[talukaSelect.value] || [];
  populateSelect(villageSelect, villages);
});

// Generate FIR Number if not editing
if (!editIndex) {
  firNumber.value = "FIR" + Math.floor(100000 + Math.random() * 900000);
}

// If editing FIR
if (editIndex !== null) {
  const firs = JSON.parse(localStorage.getItem("firs") || "[]");
  const editData = firs[editIndex];
  for (let key in editData) {
    if (form.elements[key]) {
      form.elements[key].value = editData[key];
    }
  }
  localStorage.removeItem("editIndex");
}

// Form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const obj = {};
  formData.forEach((value, key) => obj[key] = value);

  let firs = JSON.parse(localStorage.getItem("firs") || "[]");

  if (editIndex !== null) {
    firs[editIndex] = obj;
  } else {
    firs.push(obj);
  }

  localStorage.setItem("firs", JSON.stringify(firs));
  alert("FIR Submitted Successfully!");

  form.reset();
  firNumber.value = "FIR" + Math.floor(100000 + Math.random() * 900000);

  window.location.href = "../report/report.html";
});
