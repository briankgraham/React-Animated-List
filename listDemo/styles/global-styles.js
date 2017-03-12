import { injectGlobal } from 'styled-components';

injectGlobal`
  *, ::before, ::after {
    background-repeat: no-repeat;
    box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font: 18px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f5f5f5;
    min-height: 100%;
    min-width: 100%;
  }

  #outer {
    max-width: -webkit-calc(768px + 16px * 2);
    max-width: -moz-calc(768px + 16px * 2);
    max-width: calc(768px + 16px * 2);
    margin: 0 auto;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    min-height: 100%;
    padding: 0 16px;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  #root {
    background-color: #f5f5f5;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
