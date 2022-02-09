import { useStoreState } from "easy-peasy";
import { useEffect, useRef, useState } from "react";

const CamDisplay = ({ config }) => {
  const videoRef = useRef();
  const center = useStoreState((state) => state.center);
  const antennaXY = {
    x: config.antennaX * config.kX - 5,
    y: config.antennaY * config.kY - 5,
  };
  const [pile0, setPile0] = useState({ x: -10, y: -10 });
  const [pile1, setPile1] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const rotatePoint = (dist, course) => {
      console.log("Dist:", dist);
      console.log("Course:", course);
      const angle = Math.atan2(dist.y, dist.x);
      console.log("angle:", angle);

      const courseRad = (course * Math.PI) / 180;
      console.log("course_rad:", courseRad);

      const result = {
        x: dist.abs * Math.cos(angle + courseRad),
        y: dist.abs * Math.sin(angle + courseRad),
      };

      console.log("RESULT:", result);

      return result;
    };

    const pilePos = [
      rotatePoint(center.centDist[0], center.heading),
      rotatePoint(center.centDist[1], center.heading),
    ];

    console.log("In:", center.centDist[0]);
    console.log("Ou:", pilePos[0]);

    setPile0({
      x: antennaXY.x + pilePos[0].x * config.kX,
      y: antennaXY.y - pilePos[0].y * config.kY,
    });
    setPile1({
      x: antennaXY.x + pilePos[1].x * config.kX,
      y: antennaXY.y - pilePos[1].y * config.kY,
    });
  }, [center]);

  useEffect(() => {
    if (config.camera !== undefined) {
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
    }
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
        {/* Center indicator */}
        <div
          className="is-flex is-flex-centered m-0 p-0"
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            transform: `translateX(${antennaXY.x}px) translateY(${antennaXY.y}px)`,
            color: "black",
            borderStyle: "solid",
            borderColor: "lime",
            borderRadius: "50%",
          }}
        />

        {/* PILE 1 */}
        <div
          className="is-flex is-flex-centered m-0 p-0"
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            transform: `translateX(${pile0.x}px) translateY(${pile0.y}px)`,
            color: "black",
            borderStyle: "solid",
            borderColor: "cyan",
            borderRadius: "50%",
          }}
        />
        {/* PILE 2 */}
        <div
          className="is-flex is-flex-centered m-0 p-0"
          style={{
            width: "10px",
            height: "10px",
            position: "absolute",
            transform: `translateX(${pile1.x}px) translateY(${pile1.y}px)`,
            color: "black",
            borderStyle: "solid",
            borderColor: "aqua",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
};

export default CamDisplay;
