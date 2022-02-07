import { useEffect, useRef, useState } from "react";
import NumberInput from "./NumberInput";

const CamStatus = () => {
  const [devices, setDevices] = useState([]);
  const [crop, setCrop] = useState(200);
  const [camWidth, setCamWidth] = useState(200);
  const [camLength, setCamLength] = useState(200);
  const vidReference = useRef();

  const handleCam = (device) => {
    const constrains = {
      video: {
        deviceId: device.deviceId,
        width: 600,
        height: 400,
      },
    };
    console.log(constrains);
    navigator.mediaDevices.getUserMedia(constrains).then((s) => {
      vidReference.current.srcObject = s;
    });
  };

  useEffect(() => {
    const getMediaDevices = () => {
      return new Promise(async (resolve, reject) => {
        if (navigator.mediaDevices) {
          let devices = null;
          let audioAccess;
          let videoAccess;

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
            console.error(
              "The browser has no access to the camera of the device."
            );
          }
          try {
            devices = await navigator.mediaDevices.enumerateDevices();
            devices = devices.filter((device) => device.kind === "videoinput");
          } catch (error) {
            console.error(
              "There are no media devices available in this device."
            );
          }
          resolve({
            devices,
          });
        } else {
          reject({ error: "The media devices could not be checked" });
        }
      });
    };
    getMediaDevices().then((res) => setDevices(res.devices));
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1 className="has-text-centered title is-size-4">Video devices</h1>
          <div className="is-flex is-flex-centered">
            {devices.map((device) => (
              <button
                className="button is-outlined m-4"
                onClick={() => handleCam(device)}
              >
                {device.label}
              </button>
            ))}
          </div>
          <div className="columns">
            <NumberInput
              label="Crop from right"
              value={crop}
              placeholder="E.g: 100"
              changeHandler={setCrop}
            />
            <NumberInput
              label="Camera Width (ft)"
              value={camWidth}
              placeholder="E.g: 20"
              changeHandler={setCamWidth}
            />
            <NumberInput
              label="Camera Length (ft)"
              value={camLength}
              placeholder="E.g: 40"
              changeHandler={setCamLength}
            />
          </div>
          <hr />
          <div className="is-flex is-flex-centered">
            <div style={{ width: `${crop}px`, height: "800px" }}>
              <video
                autoPlay
                ref={vidReference}
                style={{
                  position: "absolute",
                  clip: `rect(0, ${crop}px, 400px, 0)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamStatus;
