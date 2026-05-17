import Document, { Head, Html, Main, NextScript } from 'next/document'
import siteConfig from '../../config/site.config'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="OneDrive Index" />
          <link rel="icon" href="/favicon.ico" />

          {/* LXGW WenKai Font */}
          <link
            rel="stylesheet"
            href="https://npm.elemecdn.com/lxgw-wenkai-webfont@1.1.0/lxgwwenkai-regular.css"
          />

          {/* Original Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          {siteConfig.googleFontLinks.map(link => (
            <link key={link} rel="stylesheet" href={link} />
          ))}

          {/* Umami Analytics */}
          <script
            defer
            src="https://u.xiegao.top/script.js"
            data-website-id="657f778c-1788-48a4-afbd-19364c686800"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
