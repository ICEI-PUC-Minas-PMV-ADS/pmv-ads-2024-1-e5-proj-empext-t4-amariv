import { isDesktop } from "react-device-detect";

export const Constants = {
  ApiHost: 'http://localhost:5100/',
  ApiHostMobile: 'http://10.0.2.2:5100/',
};

export const getApiUrl = (): string => {
  return isDesktop ? Constants.ApiHost : Constants.ApiHostMobile;
}