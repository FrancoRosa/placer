const video = document.getElementById("video");
const button = document.getElementById("button");
const select = document.getElementById("select");

const getMediaDevices = () => {
  return new Promise(async (resolve, reject) => {
    if (navigator.mediaDevices) {
      let devices = null;

      try {
        audioAccess = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      } catch (error) {
        console.error(
          "The browser has no access to the microphone of the device."
        );
      }
      try {
        videoAccess = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      } catch (error) {
        console.error("The browser has no access to the camera of the device.");
      }
      try {
        devices = await navigator.mediaDevices.enumerateDevices();
      } catch (error) {
        console.error("There are no media devices available in this device.");
      }
      console.log(devices);
      resolve({
        devices,
      });
    } else {
      reject({ error: "The media devices could not be checked" });
    }
  });
};

getMediaDevices().then((devices) => {
  select.innerHTML = "";
  select.appendChild(option);
  let count = 1;
  devices.devices.forEach((device) => {
    console.log(count);
    if (device.kind === "videoinput") {
      const option = document.createElement("option");
      option.value = device.deviceId;
      const label = device.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
});
