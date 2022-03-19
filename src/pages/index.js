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
      <Link to="/lissajous"> LISSAJOUS!</Link>
    </main>
  )
}

export default IndexPage
