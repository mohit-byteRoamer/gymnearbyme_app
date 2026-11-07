import { ScrollViewStyleReset } from 'expo-router/html'
import { type PropsWithChildren } from 'react'

/**
 * Custom web HTML template for Expo Router.
 * Configures Google Fonts Roboto (300, 400, 500, 700, 900) so web renders
 * authentic font weights without synthetic faux-bold.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Preconnect to Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Load full Roboto family: 300 Light, 400 Regular, 500 Medium, 700 Bold, 900 Black */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Reset ScrollView styles for proper web scrolling */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

const responsiveStyles = `
:root {
  --css-interop-darkMode: class dark;
}
html, body, #root {
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F8FAFC;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`

