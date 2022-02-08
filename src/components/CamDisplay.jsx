import { useStoreState } from "easy-peasy";
import { useEffect, useRef } from "react";

const CamDisplay = ({ config }) => {
  const videoRef = useRef();
  const nextPiles = useStoreState((state) => state.nextPiles);
  const center = useStoreState((state) => state.center);

  useEffect(() => {
    const constrains = {
      video: {
        deviceId: config.camera.deviceId,
        width: config.videoHigh,
        height: config.videoWidth,
      },
    };
    navigator.mediaDevices.getUserMedia(constrains).then((s) => {
      videoRef.current.srcObject = s;
    });
  }, []);

  return (
    <div>
      <div
        style={{ width: `${config.crop}px`, height: `${config.videoHigh}px` }}
      >
        <video
          autoPlay
          ref={videoRef}
          style={{
            position: "absolute",
            clip: `rect(0, ${config.crop}px, ${config.videoHigh}px, 0)`,
          }}
        />
        <div
          className="is-flex is-flex-centered m-0 p-0"
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            transform: `translateX(${
              config.antennaX * config.kX - 5
            }px ) translateY(${config.antennaY * config.kY - 5}px)`,
            color: "black",
            borderStyle: "solid",
            borderColor: "lime",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};

export default CamDisplay;
