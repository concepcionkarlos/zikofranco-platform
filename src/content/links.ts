/**
 * src/content/links.ts
 * Links oficiales del artista. Cambia aquí y se actualiza en todo el sitio.
 */
export const links = {
  spotify: "https://open.spotify.com/artist/0xyaYBhWaHUExO14cfrdqL",
  appleMusic: "https://music.apple.com/us/artist/zikopoly/1733674076?l=es-MX",
  youtube: "https://www.youtube.com/@zikofranco6572",
  soundcloud: "https://on.soundcloud.com/JtML242w1RrNaqUWBO",
  instagram: "https://www.instagram.com/zikopoly",
} as const;

export const platformLinks = [
  { label: "Spotify", href: links.spotify },
  { label: "Apple Music", href: links.appleMusic },
  { label: "YouTube", href: links.youtube },
  { label: "SoundCloud", href: links.soundcloud },
  { label: "Instagram", href: links.instagram },
] as const;
