//?sellectors
const allDelete = document.getElementById("allDelete");
const allPage = document.querySelector(".container");
const inputs = document.querySelectorAll(".container input");
const harcamaTL = document.getElementById("inputExpense");
const harcamaAlan = document.getElementById("inputAddress");
// const gelir=document.getElementById("inputMoney")
const Kaydet = document.querySelector("#Kaydet");
const gelirEkle = document.getElementById("gelirEkle");
const giderEkle = document.getElementById("giderEkle");
const tarih = document.getElementById("inputDate");

//? EVENT HANDSLERS

allDelete.addEventListener("click", () => {
  location.reload(); // sayfayı yeniliyor.
});

document
  .getElementById("gelirEkle")
  .addEventListener("click", function (event) {
    document.querySelector("#gelir").textContent =
      document.getElementById("inputMoney").value;
    event.preventDefault();
    kalanHesapla();
  });

Kaydet.addEventListener("click", function (event) {
  event.preventDefault();
  if (!tarih.value || !harcamaAlan.value || !harcamaTL.value) {
    alert("lütfen tüm alanları doldurunuz");
    document.getElementById("girisForm").reset();
    return;
  }

  let tableBody = document.getElementById("tablebody");

  let satir = document.createElement("tr");

  let tarihIslem = document.createElement("td");
  tarihIslem.textContent = tarih.value;

  let ekHarcama = document.createElement("td");
  ekHarcama.textContent = harcamaAlan.value;

  let miktar = document.createElement("td");
  miktar.textContent = harcamaTL.value;
  console.log(miktar);

  let islem = document.createElement("td");
  islem.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #d88231;"></i>`;
  islem.style.cursor = "pointer";
  islem.addEventListener("click", function () {
    this.parentElement.remove();
  });

  satir.appendChild(tarihIslem);
  satir.appendChild(ekHarcama);
  satir.appendChild(miktar);
  satir.appendChild(islem);

  tableBody.appendChild(satir);
  document.getElementById("girisForm").reset();
});

document
  .getElementById("giderEkle")
  .addEventListener("click", function (event) {
    let total = Array.from(document.querySelectorAll("td:nth-child(3)")).reduce(
      (a, b) => a + parseFloat(b.textContent),
      0
    );
    document.getElementById("giderler").textContent = total;
    kalanHesapla();
  });

function kalanHesapla() {
  let sonGelir = Array.from(document.querySelectorAll("#gelir")).reduce(
    (a, b) => a + parseFloat(b.textContent) || 0,
    0
  );
  let sonGider = Array.from(document.querySelectorAll("#giderler")).reduce(
    (a, b) => a + parseFloat(b.textContent) || 0,
    0
  );
  let kalan = sonGelir - sonGider;
  document.querySelector("#kalan").textContent = kalan;
  if (kalan > 0) {
    document.querySelector("#kalan").style.color = "green";
  } else {
    document.querySelector("#kalan").style.color = "red";
  }
  console.log(kalan);
}
