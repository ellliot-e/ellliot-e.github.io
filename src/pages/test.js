import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components";
import { Button, Heading, Range } from "../components/elements";

const Grid = styled.main`
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-gap: 32px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Sidebar = styled.div`
  border: var(--stroke) solid var(--mono);
  overflow-y: scroll;
`;

const Content = styled.div`
  border: var(--stroke) solid var(--mono);
`

const IndexPage = () => {
  return (
    <Grid>
      <Sidebar>I'm in the sidebar</Sidebar>
      <Content>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${1200} ${900}`}
          style={{ border: "var(--stroke) solid var(--mono)"}}
        >
          <circle cx={500} cy={500} r={100}/>
        </svg>
      </Content>
    </Grid>
  )
}

export default IndexPage
