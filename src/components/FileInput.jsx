import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getWaypoints, uploadFile } from "../js/api";

const FileInput = () => {
  const [path, setPath] = useState("");
  const [name, setName] = useState("Nothing selected yet");
  const [fileStatus, setFileStatus] = useState({});
  const history = useHistory();
  const setWaypoints = useStoreActions((actions) => actions.setWaypoints);

  useEffect(() => {
    const handleFiles = (e) => {
      let localPath = e.target.files[0];
      let localName = e.target.files[0].name;
      setPath(localPath);
      setName(localName);
    };

    const inputElement = document.querySelector(".file-input");
    inputElement.addEventListener("change", handleFiles, false);
  }, []);

  const handleFiles = (file) => {
    uploadFile(file)
      .then((res) => {
        setFileStatus(res);
        getWaypoints().then((response) => {
          setWaypoints(
            response.waypoints.map((waypoint) => ({
              ...waypoint,
              selected: true,
            }))
          );
        });
        setTimeout(() => {
          history.push("/map");
        }, 1000);
      })
      .catch(() => setFileStatus({ message: false }));
  };

  return (
    <div className="columns">
      <div className="column file has-name">
        <label className="file-label">
          <input className="file-input" type="file" accept=".csv, .xlsx" />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span className="file-label">Choose a file ...</span>
          </span>
          <span className="file-name">{name}</span>
        </label>
      </div>
      <div className="column">
        {path ? (
          <div className="is-flex is-justify-content-center">
            <button
              className="button is-outlined is-success"
              onClick={() => handleFiles(path)}
            >
              Upload
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="column">
        {fileStatus.message ? (
          <div className="is-flex is-align-content-center is-flex-direction-column">
            <p
              className={
                fileStatus.message ? "has-text-success" : "has-text-fail"
              }
            >
              {fileStatus.message ? "Success" : "Fail"}
            </p>
            <p>Waypoints: {fileStatus.rows}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FileInput;
