import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata = {
  title: "CookNation - Forum de Cuisine",
  description: "Rejoignez la plus grande communauté de cuisiniers. Partagez des recettes, discutez et apprenez des autres passionnés de cuisine.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍳</text></svg>" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}