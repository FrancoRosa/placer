import FileInput from "./FileInput";
import NumberInput from "./NumberInput";
import { useState } from "react";
import { setConfig } from "../js/api";
import { useLocalStorage } from "../js/helpers";
import epsgCodes from "../assets/epsg_codes.pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import marooka from "../assets/marooka-size.png";
import marookaSide from "../assets/marooka-side.png";

const Config = () => {
  const [localconfig, setLocalConfig] = useLocalStorage("config", {});
  const [truckLen, setTruckLen] = useState(localconfig.truckLen);
  const [truckWid, setTruckWid] = useState(localconfig.truckWid);
  const [truckHei, setTruckHei] = useState(localconfig.truckHei);
  const [antennaX, setAntennaX] = useState(localconfig.antennaX);
  const [antennaY, setAntennaY] = useState(localconfig.antennaY);
  const [bay1, setBay1] = useState(localconfig.bay1);
  const [bay2, setBay2] = useState(localconfig.bay2);
  const [laserX, setLaserX] = useState(localconfig.laserX);
  const [laserY, setLaserY] = useState(localconfig.laserY);
  const [laserZ, setLaserZ] = useState(localconfig.laserZ);
  const [laserScale, setLaserScale] = useState(localconfig.laserScale);
  const [reference, setReference] = useState(localconfig.reference);
  const [epsg, setEpsg] = useState(localconfig.epsg);
  const [feedback, setFeedback] = useState("");

  const uploadConfig = () => {
    const payload = {
      truckLen,
      truckWid,
      truckHei,
      antennaX,
      antennaY,
      bay1,
      bay2,
      epsg,
      laserX,
      laserY,
      laserZ,
      laserScale,
      reference,
    };
    setLocalConfig(payload);
    setConfig(payload)
      .then(() => setFeedback("Success"))
      .catch(() => setFeedback("Fail"));
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="columns">
            <NumberInput
              label="Truck length"
              value={truckLen}
              placeholder="E.g: 5"
              changeHandler={setTruckLen}
            />
            <NumberInput
              label="Truck width"
              value={truckWid}
              placeholder="E.g: 5"
              changeHandler={setTruckWid}
            />
            <NumberInput
              label="Truck height"
              value={truckHei}
              placeholder="E.g: 5"
              changeHandler={setTruckHei}
            />
          </div>
          <div className="columns">
            <NumberInput
              label="Antenna from left"
              value={antennaX}
              placeholder="E.g: 5"
              changeHandler={setAntennaX}
            />
            <NumberInput
              label="Antenna from truck head"
              value={antennaY}
              placeholder="E.g: 5"
              changeHandler={setAntennaY}
            />
          </div>
          <div className="columns">
            <NumberInput
              label="Bay 1 from truck head"
              value={bay1}
              placeholder="E.g: 5"
              changeHandler={setBay1}
            />
            <NumberInput
              label="Bay 2 from truck head"
              value={bay2}
              placeholder="E.g: 5"
              changeHandler={setBay2}
            />
          </div>
          <hr style={{ margin: ".25em" }} />
          <div className="">
            <h2 className="has-text-centered">Laser distances (ft)</h2>
            <div className="columns">
              <NumberInput
                label="From left"
                value={laserX}
                placeholder="E.g: 5"
                changeHandler={setLaserX}
              />
              <NumberInput
                label="From head"
                value={laserY}
                placeholder="E.g: 5"
                changeHandler={setLaserY}
              />
              <NumberInput
                label="From ground"
                value={laserZ}
                placeholder="E.g: 5"
                changeHandler={setLaserZ}
              />
              <div className="field column">
                <label className="label">Reference</label>
                <div className="control">
                  <div className="select">
                    <select onChange={(e) => setReference(e.target.value)}>
                      <option value="bay1">Bay 1</option>
                      <option value="bay2">Bay 2</option>
                    </select>
                  </div>
                </div>
              </div>
              <NumberInput
                label="Scale"
                value={laserScale}
                placeholder="E.g: 1"
                changeHandler={setLaserScale}
              />
            </div>
          </div>
          <div className="columns">
            <NumberInput
              label="EPSG code"
              value={epsg}
              placeholder="E.g: 6588"
              changeHandler={setEpsg}
            />
            <div className="column is-flex-direction-column is-flex is-flex-centered">
              <p className="heading has-text-link">EPSG Reference</p>
              <a
                href={epsgCodes}
                target="blank"
                className="has-text-white title is-2"
              >
                <FontAwesomeIcon icon={faFileAlt} />
              </a>
            </div>
            <div className="column is-flex-direction-column is-flex is-flex-centered">
              <p className="heading has-text-link">EPSG Browser</p>
              <a
                href="https://epsg.io/"
                target="blank"
                className="has-text-white title is-2"
              >
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </div>
            <div className="column is-flex is-justify-content-center is-align-content-center">
              <button className="button ml-2" onClick={uploadConfig}>
                Save
              </button>
              <p
                className={`success ml-2 ${
                  feedback == "Success" ? "has-text-success" : "has-text-danger"
                }`}
              >
                {feedback}
              </p>
            </div>
          </div>
          <hr style={{ margin: ".5em" }} />
          <FileInput />
        </div>

        <div className="column is-centered has-text-centered">
          <img src={marooka} />
          <img src={marookaSide} />
        </div>
      </div>
    </div>
  );
};

export default Config;
