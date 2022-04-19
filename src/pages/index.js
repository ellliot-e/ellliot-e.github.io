import * as React from "react"
import { Link } from "gatsby"


// markup
const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>
       Home
      </h1>
      <ul>
        <li>
          <Link to="/lissajous"> LISSAJOUS!</Link>
        </li>
        <li>
          <Link to="/background"> BACKGROUND!</Link>
        </li>
      </ul>
    </main>
  )
}

export default IndexPage
