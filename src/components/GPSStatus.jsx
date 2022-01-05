import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getGPSStatus } from "../js/api";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { getTime } from "../js/helpers";

const GPSStatus = () => {
  const [connected, setConnected] = useState(false);
  const [port, setPort] = useState();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGPSStatus = () => {
    setLoading(true);
    getGPSStatus().then((res) => {
      console.log(res);
      setConnected(res.connected);
      setPort(res.port);
      setLogs(res.logs);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGPSStatus();
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <div>
            <h1
              className={`has-text-centered title is-size-4 ${
                connected ? "has-text-success" : "has-text-danger"
              }`}
            >
              {connected ? "GPS connected at: " : "GPS disconnected"}
              <span>{connected && port}</span>
            </h1>
            <div className="is-flex is-flex-centered">
              <button
                className={`button is-outlined ${loading && "is-loading"}`}
                onClick={handleGPSStatus}
              >
                <FontAwesomeIcon icon={faRedo} />
              </button>
            </div>
          </div>
          <hr />
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th> Timestamp </th>
                <th> String </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td> {getTime(log[0])} </td>
                  <td> {log[1]} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GPSStatus;
