export const SERVER_MODE = "prod";
// change to "local" when using local
export const API_URL = "";

switch (SERVER_MODE) {
  case "local":
    API_URL = "http://localhost:8081";
    break;
  case "prod":
    API_URL = "https://learners-permit-capstone.onrender.com";
    break;
  default:
    API_URL = "https://learners-permit-capstone.onrender.com";
}
