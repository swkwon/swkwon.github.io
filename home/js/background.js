const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.height = "100vh";
document.body.style.backgroundImage = `url('img/${chosenImage}')`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";

// const bgImage = document.createElement("img");
// bgImage.src = `img/${chosenImage}`;
// document.body.appendChild(bgImage);