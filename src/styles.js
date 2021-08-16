import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "rgb(86, 74, 74)",
  bgColor: "rgb(255, 250, 215)",
  accent: "rgb(60, 60, 255)",
  borderColor: "rgb(127, 100, 100)",
};
export const darkTheme = {
  fontColor: "rgb(255, 250, 215)",
  bgColor: "rgb(86, 74, 74)",
  accent: "rgb(0, 216, 177)",
  borderColor: "rgb(244, 226, 105)",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing:border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
  }
`;
