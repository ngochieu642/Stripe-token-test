const stripe = Stripe("pk_test_WbTYwMTREEdIfb5y9r3ntwqg00lAIi9ipU");
const elements = stripe.elements();

const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: "16px",
    color: "#32325d"
  }
};

// Create an instance of the card Element.
const card = elements.create("card", { style });

// Add an instance of the card Element into the `card-element` <div>.
card.mount("#card-element");

// Create a token or display an error when the form is submitted.
const form = document.getElementById("payment-form");
form.addEventListener("submit", async event => {
  event.preventDefault();

  const { token, error } = await stripe.createToken(card);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA-----------------");

  if (error) {
    // Inform the customer that there was an error.
    console.log("[ERROR]");
    const errorElement = document.getElementById("card-errors");
    errorElement.textContent = error.message;
  } else {
    // Send the token to your server.
    console.log("TOKEN: ", token);
    stripeTokenHandler(token);
  }
});

const stripeTokenHandler = token => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById("payment-form");
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
};
