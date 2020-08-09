const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.getElementById("button");
const response = document.querySelector(".response");

button.addEventListener("click", send, false);

function send() {
  const number = numberInput.nodeValue.replace(/\D/g, "");
  const text = textInput.value;

  fetch("/", {
    method: "post",
    header: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then(function (rest) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
