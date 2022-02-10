import axios from "axios";
import io from "socket.io-client";

// const host = "raspberrypi.local:9999";
const host = `https://${window.location.hostname}:9999`;

export const socket = io.connect(`${host}`);

export const setLatLng = async (location) => {
  console.log("... setting lat lng");
  const url = `${host}/api/location`;
  const response = await axios.post(url, location);
  return response.data;
};

export const setHeading = async (heading) => {
  console.log("... setting heading");
  const url = `${host}/api/heading`;
  const response = await axios.post(url, heading);
  return response.data;
};

export const setConfig = async (config) => {
  console.log("... setting config");
  const url = `${host}/api/config`;
  const response = await axios.post(url, config);
  return response.data;
};

export const setRefBay = async (bay) => {
  console.log("... setting reference bay");
  const url = `${host}/api/bay`;
  const response = await axios.post(url, bay);
  return response.data;
};

export const setRefWaypoint = async (waypoint) => {
  console.log("... setting waypoint");
  const url = `${host}/api/waypoint`;
  const response = await axios.post(url, waypoint);
  return response.data;
};

export const getLocation = async () => {
  console.log("... getting location and heading");
  const url = `${host}/api/status`;
  const response = await axios.get(url);
  return response.data;
};

export const getSerialPorts = async () => {
  console.log("... getting serial ports");
  const url = `${host}/api/serial_ports`;
  const response = await axios.get(url);
  return response.data;
};

export const getLaserStatus = async () => {
  console.log("... getting laser serial");
  const url = `${host}/api/laser/serial`;
  const response = await axios.get(url);
  return response.data;
};

export const getGPSStatus = async () => {
  console.log("... getting laser serial");
  const url = `${host}/api/gps/serial`;
  const response = await axios.get(url);
  return response.data;
};

export const setLaserConfig = async (payload) => {
  console.log("... setting laser config");
  const url = `${host}/api/laser/config`;
  const response = await axios.post(url, payload);
  return response.data;
};

export const setLaserOn = async (state) => {
  console.log("... setting laser on");
  const url = `${host}/api/laser/on`;
  const response = await axios.post(url, state);
  return response.data;
};

export const setLaserBlink = async (state) => {
  console.log("... setting laser blink");
  const url = `${host}/api/laser/blink`;
  const response = await axios.post(url, state);
  return response.data;
};

export const getWaypoints = async () => {
  console.log("... getting waypoints");
  const url = `${host}/api/waypoints`;
  const response = await axios.get(url);
  return response.data;
};

export const uploadFile = async (file, epsg) => {
  console.log("... uploading file");
  const url = `${host}/api/file`;
  let formData = new FormData();
  formData.append("file", file);
  formData.append("code", epsg);
  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
