const qrContainer = document.querySelector(".qrcode");
const form = document.querySelector("#qr-form");
const input = document.querySelector("#qr-input");
const message = document.querySelector(".message");

let qrcode;

function setMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("error", isError);
}

function generateQr(value = input.value) {
    const text = value.trim();

    if (!qrcode) {
        setMessage("QR library failed to load. Check your internet connection and reload.", true);
        return;
    }

    if (!text) {
        setMessage("Enter text or a URL first.", true);
        input.focus();
        return;
    }

    qrcode.clear();
    qrcode.makeCode(text);
    setMessage("QR code ready.");
}

if (window.QRCode) {
    qrcode = new QRCode(qrContainer, {
        text: "https://example.com",
        width: 220,
        height: 220,
        colorDark: "#102a43",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    input.value = "https://example.com";
    setMessage("Edit the text and generate a new code.");
} else {
    setMessage("QR library failed to load. Check your internet connection and reload.", true);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    generateQr();
});
