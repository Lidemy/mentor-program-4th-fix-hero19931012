/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import Color from './Constants';

const Footer = styled.footer`
border-top: 2px solid ${Color.highlight};
box-sizing: border-box;
background: ${Color.footerBackground};

& h3 {
  margin: 0px;
  font-size: 13px;
  color: ${Color.textMuted};
  text-align: center;
  padding: 25px 10px;
}
`;

export default function FormFooter() {
  return (
    <Footer>
      <h3>© 2020 © Copyright. All rights Reserved.</h3>
    </Footer>
  );
}
