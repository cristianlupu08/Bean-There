// Web app manifest: lets phones install Bean There on the home screen like an app.
export default function manifest() {
  return {
    name: "Bean There · Coffee Shop",
    short_name: "Bean There",
    description: "Order your coffee online and pick it up at the café. No queue.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1915",
    theme_color: "#0e1915",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
