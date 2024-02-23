const allSeat = document.getElementsByClassName("seat");
let count = 0;
for (const seat of allSeat) {
  seat.addEventListener("click", function (e) {
    if (e.target.classList.contains("bgGray")) {
      setBgGreen(e.target.innerText);
      count += 1;
    } else {
      removeBgGreen(e.target.innerText);
      count -= 1;
    }

    // Validation One can buy only 4 tickets.
    if (count > 4) {
      alert("Sorry! you don't buy more tickets.");
      removeBgGreen(e.target.innerText);
      count -= 1;
      return;
    }

    // Update totalSeat.
    let totalSeat = getInnerText("totalSeat");
    if (e.target.classList.contains("bgGreen")) {
      totalSeat = totalSeat - 1;
    } else {
      totalSeat = totalSeat + 1;
    }
    setInnerText("totalSeat", totalSeat);

    // Update totalSellSeat.
    setInnerText("totalSellSeat", count);

    // Show data in dataTable.
    const tbody = document.getElementById("tbody");
    const tr = createTr(e.target.innerText);

    if (e.target.classList.contains("bgGreen")) {
      tbody.appendChild(tr);
    } else {
      for (const tr of tbody.childNodes) {
        if (tr.childNodes[0].innerText === e.target.innerText) {
          tbody.removeChild(tr);
        }
      }
    }

    // Update totalPrice.
    setInnerText("totalPrice", count * 550);

    // Update Grand total.
    setInnerText("grandTotal", count * 550);

    // Enable applyBtn.
    if (count === 4) {
      const applyBtn = document.getElementById("applyBtn");
      applyBtn.removeAttribute("disabled");
      applyBtn.classList.add("bgGreen");
    } else {
      applyBtn.setAttribute("disabled", true);
      applyBtn.classList.remove("bgGreen");
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
  });
}

// SetBG-Green.
function setBgGreen(id) {
  const targetBtn = document.getElementById(id);
  targetBtn.classList.remove("bgGray");
  targetBtn.classList.add("bgGreen");
}

// removeBG-Green.
function removeBgGreen(id) {
  const targetBtn = document.getElementById(id);
  targetBtn.classList.add("bgGray");
  targetBtn.classList.remove("bgGreen");
}

// Get InnerText.
function getInnerText(id) {
  const element = document.getElementById(id);
  const elementTextValue = element.innerText;
  return parseInt(elementTextValue);
}

// Set InnerText.
function setInnerText(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
}

// Create tr.
function createTr(data) {
  const tr = document.createElement("tr");
  const td = document.createElement("td");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");

  td.innerText = data;
  td1.innerText = "Economoy";
  td2.innerText = "500";

  tr.appendChild(td);
  tr.appendChild(td1);
  tr.appendChild(td2);
  return tr;
}

// Calculate discount.
function calculateDiscount(couponInput) {
  const inputField = document.getElementById(couponInput);
  const inputValue = inputField.value;
  const grandTotal = getInnerText("grandTotal");

  const coupon = inputValue.split(" ").join("").toUpperCase();
  let discount = 0;

  // Validation.
  if (!inputValue) {
    alert("Please input your coupon code here!");
    return;
  }

  // if (coupon !== "COUPLE20" || "NEW15") {
  //   console.log(coupon);
  //   alert("Invalid coupon code!");
  //   return;
  // }

  // inputValue modify.
  if (coupon === "COUPLE20") {
    discount = grandTotal * 0.2;
  } else if (coupon === "NEW15") {
    discount = grandTotal * 0.15;
  }
  // Update grand total with discount.
  setInnerText("grandTotal", grandTotal - discount);
  setInnerText("discountPrice", discount);
  document.getElementById("discountField").classList.remove("hidden");
  document.getElementById("couponInputField").classList.add("hidden");
}

// Now click nextBtn.
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("modalPopup");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // Get phoneNumber.
  let inputNumber =
    document.getElementById("userForm").childNodes[3].childNodes[3].value;
  if (!inputNumber || count <= 0) {
    alert("You must buy 1 ticket and give phone number!");
  } else {
    // Modal.
    modal.showModal();
  }
});

// continue btnClick
const continueBtn = document.getElementById("continueBtn");
continueBtn.addEventListener("click", function (e) {
  modal.classList.add("hidden");
  location.reload();
});
