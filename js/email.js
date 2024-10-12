const contactForm = document.getElementById("contact-form");
const contactSubmit = document.getElementById("contact-submit");

let user = "{{USER_EMAIL}}";

async function sendEmail(e) {
  e.preventDefault();

  const nameInput = document.getElementById("contact-name").value;
  const emailInput = document.getElementById("contact-email").value;
  const messageInput = document.getElementById("contact-message").value;
  console.log(nameInput, emailInput, messageInput);
  const url = "http://127.0.0.1:8000/api/v1/portfolio/send-portfolio-email/";

  if (!nameInput || !emailInput || !messageInput) {
    alert("Please fill in all the fields.");
    return;
  }

  try {
    const data = {
      contact_name: nameInput,
      contact_email: emailInput,
      contact_message: messageInput,
      user: user,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.text();

      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
  } catch (error) {}
}

if (user !== "{{USER_EMAIL}}") {
  contactSubmit.addEventListener("click", sendEmail);
}
