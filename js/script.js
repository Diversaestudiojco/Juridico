document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.querySelectorAll(".area-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".area-card").classList.toggle("open");
  });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = contactForm.querySelector("button[type=submit]");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  try {
    const response = await fetch("https://formsubmit.co/ajax/diversaestudiojuridico@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });

    if (!response.ok) throw new Error("request failed");

    contactForm.reset();
    formStatus.textContent = "¡Consulta enviada! Te responderemos a la brevedad.";
    formStatus.classList.add("success");
  } catch (error) {
    const nombre = data.get("nombre");
    const area = data.get("area");
    const mensaje = data.get("mensaje");
    const email = data.get("email");
    const subject = encodeURIComponent(`Consulta legal - ${area}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\nÁrea: ${area}\n\nMensaje:\n${mensaje}`
    );
    window.location.href = `mailto:diversaestudiojuridico@gmail.com?subject=${subject}&body=${body}`;
    formStatus.textContent = "No se pudo enviar automáticamente, abrimos tu correo como alternativa.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar consulta";
  }
});
