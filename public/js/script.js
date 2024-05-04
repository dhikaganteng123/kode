document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", function () {
    console.log("Hamburger clicked!");
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  const form = document.getElementById("diagnosisForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted!");

    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length === 0) {
      alert("Silakan pilih minimal satu gejala.");
      return;
    }

    const selectedSymptoms = Array.from(checkboxes).map((checkbox) => {
      const symptom = checkbox.name;
      const severityInput = form.querySelector(`#${symptom}_select`);
      const severity = severityInput ? severityInput.value : "";
      return `${symptom}_${severity}`;
    });

    fetch("/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from server:", data);
        document.getElementById(
          "diagnosisResult"
        ).innerText = `Diagnosis: ${data.diagnosis}`;
        document.getElementById("cfResult").innerText = `Nilai CF: ${data.cf}`;
      })
      .catch((error) => console.error("Error:", error));
  });
});
