import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "../js/helpers";
import NumberInput from "./NumberInput";

const CamStatus = () => {
  const [camConfig, setCamConfig] = useLocalStorage("camConfig", {});
  const [devices, setDevices] = useState([]);
  const [crop, setCrop] = useState(camConfig.crop);
  const [camera, setCamera] = useState(camConfig.camera);
  const [camWidth, setCamWidth] = useState(camConfig.camWidth);
  const [camLength, setCamLength] = useState(camConfig.camLength);
  const [antennaX, setAntennaX] = useState(camConfig.antennaX);
  const [antennaY, setAntennaY] = useState(camConfig.antennaY);
  const vidReference = useRef();
  const videoHigh = 1080;
  const videoWidth = 1920;
  let kX = crop / camWidth;
  let kY = videoHigh / camLength;

  const handleSave = () => {
    let kX = crop / camWidth;
    let kY = videoHigh / camLength;
    setCamConfig({
      crop,
      videoHigh,
      videoWidth,
      camWidth,
      camLength,
      antennaX,
      antennaY,
      kX,
      kY,
      camera,
    });
  };

  const handleCam = (device) => {
    const constrains = {
      video: {
        deviceId: device.deviceId,
        width: videoHigh,
        height: videoWidth,
      },
    };
    navigator.mediaDevices.getUserMedia(constrains).then((s) => {
      vidReference.current.srcObject = s;
    });
    setCamera(device);
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
    if (camera !== undefined) {
      const constrains = {
        video: {
          deviceId: camera.deviceId,
          width: videoHigh,
          height: videoWidth,
        },
      };
      navigator.mediaDevices.getUserMedia(constrains).then((s) => {
        vidReference.current.srcObject = s;
      });
    }
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
              label="Crop from right (px)"
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
            <NumberInput
              label="Antenna X position(ft)"
              value={antennaX}
              placeholder="E.g: 40"
              changeHandler={setAntennaX}
            />
            <NumberInput
              label="Antenna Y position (ft)"
              value={antennaY}
              placeholder="E.g: 40"
              changeHandler={setAntennaY}
            />
            <div className="is-flex is-flex-centered">
              <button
                onClick={handleSave}
                className="button is-outlined is-success ml-4 mt-4"
              >
                Save
              </button>
            </div>
          </div>
          <hr />
          <div className="is-flex is-flex-centered is-flex-direction-column">
            <div className="is-flex is-flex-centered is-flex-direction-vertical">
              <p className="m-4" style={{ transform: "rotate(-90deg)" }}>
                {camLength} ft
              </p>
              <div
                style={{
                  width: `${crop}px`,
                  height: `${videoHigh}px`,
                }}
              >
                <video
                  autoPlay
                  ref={vidReference}
                  style={{
                    position: "absolute",
                    clip: `rect(0, ${crop}px, ${videoHigh}px, 0)`,
                  }}
                />
                <div
                  className="is-flex is-flex-centered m-0 p-0"
                  style={{
                    width: "10px",
                    height: "10px",
                    position: "absolute",
                    transform: `translateX(${
                      antennaX * kX - 5
                    }px ) translateY(${antennaY * kY - 5}px)`,
                    color: "black",
                    borderStyle: "solid",
                    borderColor: "lime",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
            <p className="m-1">{camWidth} ft</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamStatus;
