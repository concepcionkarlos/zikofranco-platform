/**
 * src/content/show.ts
 * Setlist oficial del "Miami Live Show" (3 sets · 42 canciones).
 * Los textos de cada set (título, descripción) viven en messages/*.json → "show.sets".
 */

export type SetSong = { title: string; artist: string };

export const SHOW_SETS: { key: "set1" | "set2" | "set3"; time: string; songs: SetSong[] }[] = [
  {
    key: "set1",
    time: "8:00 – 8:50 PM",
    songs: [
      { title: "Locked Out of Heaven", artist: "Bruno Mars" },
      { title: "This Love", artist: "Maroon 5" },
      { title: "Sunday Morning", artist: "Maroon 5" },
      { title: "Sugar", artist: "Maroon 5" },
      { title: "Need You Tonight", artist: "INXS" },
      { title: "Another One Bites the Dust", artist: "Queen" },
      { title: "24K Magic", artist: "Bruno Mars" },
      { title: "Play That Funky Music", artist: "Wild Cherry" },
      { title: "Get Lucky", artist: "Daft Punk" },
      { title: "Treasure", artist: "Bruno Mars" },
      { title: "All Night Long", artist: "Lionel Richie" },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
      { title: "I Wanna Dance With Somebody", artist: "Whitney Houston" },
      { title: "Footloose", artist: "Kenny Loggins" },
    ],
  },
  {
    key: "set2",
    time: "9:05 – 9:55 PM",
    songs: [
      { title: "Could You Be Loved", artist: "Bob Marley" },
      { title: "Red Red Wine", artist: "UB40" },
      { title: "Three Little Birds", artist: "Bob Marley" },
      { title: "No Woman No Cry", artist: "Bob Marley" },
      { title: "Oye Como Va", artist: "Santana" },
      { title: "Black Magic Woman", artist: "Santana" },
      { title: "Evil Ways", artist: "Santana" },
      { title: "Corazón Espinado", artist: "Santana" },
      { title: "Smooth", artist: "Santana" },
      { title: "La Vida Es Un Carnaval", artist: "Celia Cruz" },
      { title: "I Will Survive", artist: "Gloria Gaynor" },
      { title: "Have You Ever Seen the Rain", artist: "CCR" },
      { title: "What's Up", artist: "4 Non Blondes" },
      { title: "Sweet Caroline", artist: "Neil Diamond" },
    ],
  },
  {
    key: "set3",
    time: "10:10 – 11:00 PM",
    songs: [
      { title: "Seven Nation Army", artist: "The White Stripes" },
      { title: "Can't Stop", artist: "Red Hot Chili Peppers" },
      { title: "Are You Gonna Be My Girl", artist: "Jet" },
      { title: "Beat It", artist: "Michael Jackson" },
      { title: "American Woman", artist: "Lenny Kravitz" },
      { title: "Hurt So Good", artist: "John Mellencamp" },
      { title: "We're an American Band", artist: "Grand Funk Railroad" },
      { title: "Summer of '69", artist: "Bryan Adams" },
      { title: "With or Without You", artist: "U2" },
      { title: "I Still Haven't Found What I'm Looking For", artist: "U2" },
      { title: "Mr. Brightside", artist: "The Killers" },
      { title: "Welcome to the Jungle", artist: "Guns N' Roses" },
      { title: "Enter Sandman", artist: "Metallica" },
      { title: "Livin' on a Prayer", artist: "Bon Jovi" },
    ],
  },
];

export const RESERVE_SONGS: SetSong[] = [
  { title: "Like a Stone", artist: "Audioslave" },
  { title: "One", artist: "U2" },
  { title: "Knockin' on Heaven's Door", artist: "Bob Dylan" },
  { title: "Right Now", artist: "Van Halen" },
  { title: "Some Kind of Wonderful", artist: "Grand Funk Railroad" },
  { title: "It's Only Rock 'n' Roll", artist: "The Rolling Stones" },
  { title: "Gossip", artist: "Måneskin" },
  { title: "You Got It", artist: "Roy Orbison" },
  { title: "Every Breath You Take", artist: "Karen Souza version" },
];
