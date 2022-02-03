const video = document.getElementById("video");
const button = document.getElementById("button");
const select = document.getElementById("select");

navigator.mediaDevices.enumerateDevices().then((x) => {
  console.log(x);
});
