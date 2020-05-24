import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Nothing here!</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <p>Please return to <a href="/">Home</a> to find what you are looking for.</p>
  </Layout>
)

export default NotFoundPage
