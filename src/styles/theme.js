import { css } from "styled-components";

export const theme = {
  typography: {
    h1: css`
      font-size: 40px;
      line-height: 48px;
      font-family: var(--primaryFont);
      color: var(--mono);
    `,
    h2: css`
      font-size: 32px;
      line-height: 40px;
      font-family: var(--primaryFont);
      color: var(--mono);
    `,
    h3: css`
      font-size: 25px;
      line-height: 32px;
      font-family: var(--primaryFont);
      color: var(--mono);
    `,
    h4: css`
      font-size: 20px;
      line-height: 25px;
      font-family: var(--primaryFont);
      color: var(--mono);
    `,
    h5: css`
      font-size: 16px;
      line-height: 20px;
      font-family: var(--primaryFont);
      color: var(--mono);
    `
  },
};
