import styles from "./styles.css?url";
import leafletStyles from "leaflet/dist/leaflet.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="no">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Potespor</title>
      <link rel="modulepreload" href="/src/client.tsx" />
      <link rel="stylesheet" href={styles} />
      <link rel="stylesheet" href={leafletStyles} />
    </head>
    <body>
      <section id="root">{children}</section>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
