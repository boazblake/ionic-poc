import Stream from "mithril-stream"

export const Model = {
  state: {
    mode: "dark",
    headerHeight: Stream("0px"),
    headerPos: Stream("-350px"),
    headerOpacity: Stream(0),
    toTop: Stream(350),
    scrolled: Stream(0),
  },
  album: {
    title: "Random Access Memories",
    tracks: [
      {
        title: "Give Life Back to Music",
        featuring: "Nile Rodgers",
        time: "4:34",
      },
      {
        title: "The Game of Love",
        featuring: "",
        time: "5:22",
      },
      {
        title: "Giorgio by Moroder",
        featuring: "Giorgio Moroder",
        time: "9:04",
      },
      {
        title: "Within",
        featuring: "Chilly Gonzales",
        time: "3:48",
      },
      {
        title: "Instant Crush",
        featuring: "Julian Casablancas",
        time: "5:37",
      },
      {
        title: "Lose Yourself to Dance",
        featuring: "Pharrell Williams and Nile Rodgers",
        time: "5:53",
      },
      {
        title: "Touch",
        featuring: "Paul Williams",
        time: "8:18",
      },
      {
        title: "Get Lucky",
        featuring: "Pharrell Williams and Nile Rodgers",
        time: "6:07",
      },
      {
        title: "Beyond",
        featuring: "",
        time: "4:50",
      },
      {
        title: "Motherboard",
        featuring: "",
        time: "5:41",
      },
      {
        title: "Fragments of Time",
        featuring: "Todd Edwards",
        time: "4:39",
      },
      {
        title: "Doin’ It Right",
        featuring: "Panda Bear",
        time: "4:11",
      },
      {
        title: "Contact",
        featuring: "DJ Falcon",
        time: "6:21",
      },
    ],
  },
}
