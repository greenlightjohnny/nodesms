const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.getElementById("button");
const response = document.querySelector(".response");

button.addEventListener("click", send, false);

function send() {
  const number = numberInput.value.replace(/\D/g, "");
  const text = textInput.value;
  console.log("########", text, number);
  fetch("/", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then(function (res) {
      console.log("7frommainthen", res);
    })
    .catch(function (err) {
      console.log(err);
    });
}
