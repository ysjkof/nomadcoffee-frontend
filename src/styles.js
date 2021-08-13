import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "rgb(86, 74, 74)",
  bgColor: "rgb(255, 244, 124)",
};
export const darkTheme = {
  fontColor: "rgb(255, 244, 124)",
  bgColor: "rgb(86, 74, 74)",
};

export const GlobalStyles = createGlobalStyle`
${reset}
body{
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};

}
`;
