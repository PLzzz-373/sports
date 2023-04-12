import { def } from "@vue/shared";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3000",
});

export default request;
