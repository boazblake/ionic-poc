import { clamp } from "ramda"

const calcOpacity = (mdl) => mdl.state.toTop() / 350

const calcHeaderOpacity = ({ state: { scrolled, headerOpacity } }) => {
  let newOpacity = (n) => {
    let x = n / 350 - 1
    return x
  }

  return scrolled.map((dist) =>
    headerOpacity(newOpacity(dist + headerOpacity()))
  )
}

const calcHeaderHeight = ({ state: { scrolled, headerHeight } }) => {
  let orig = (h) => parseInt(h().split("px")[0])
  let newHeight = (n) => {
    let x = clamp(0, 50, n / 7) + "px"
    return x
  }
  console.log(headerHeight())
  scrolled.map((dist) => headerHeight(newHeight(dist + orig(headerHeight))))
  return headerHeight()
}

const calcHeaderPos = ({ state: { toTop, headerPos } }) => {
  let pos = clamp(-35, 1, 1 / -headerPos().split("px")[0] - toTop() + 50)
  let strPos = pos.toString() + "px"
  return headerPos(strPos)
}

const calcImgScale = ({ state: { scrolled } }) => {
  let res = scrolled() > 0 ? 1 : scrolled() / -100 + 1
  console.log(res)
  return res
}

const updateScroll = (mdl) => ({ detail: { scrollTop } }) => {
  let pos = 350 - scrollTop
  mdl.state.scrolled(scrollTop)
  mdl.state.toTop(clamp(0, 350, pos))
}

const Img = {
  view: ({ attrs: { mdl } }) =>
    m(
      "section.img",
      {
        style: {
          position: "fixed",
          width: "100%",
          height: "300px",
        },
      },

      m("img", {
        src: "images/Get_Lucky.jpeg",
        style: {
          width: "100%",
          opacity: calcOpacity(mdl),
          transform: `scale(${clamp(1, 1.5, calcImgScale(mdl))})`,
        },
      })
    ),
}

const List = {
  view: ({ attrs: { mdl } }) =>
    m(
      "section#list",
      {
        style: {
          position: "absolute",
          top: "25%",
          width: "100%",
          height: "100%",
        },
      },
      m(
        "h1.ion-text-center",
        {
          strong: true,
          style: { fontSize: "3rem", opacity: calcOpacity(mdl) },
        },
        m("ion-text", mdl.album.title)
      ),
      m(
        "ion-button#shuffle",
        {
          expand: "block",
          color: "success",
          fill: "solid",
          strong: false,
          style: {
            position: "sticky",
            top: "-5px",
            width: "300px",
            margin: "0 auto",
            "--border-radius": "100px",
            zIndex: 15,
          },
        },
        m("ion-text", m("h2", "SHUFFLE PLAY"))
      ),
      m(
        "ion-list",
        {
          style: { width: "100%" },
        },
        mdl.album.tracks.map((track, idx) =>
          m(
            "ion-item",
            m("ion-avatar", { slot: "start" }, m("ion-text", idx + 1)),
            m(
              "ion-label",
              m("ion-text", m("h2", track.title)),
              m("ion-text", m("ion-note", track.featuring))
            ),
            m("ion-sub-title", { slot: "end" }, m("ion-text", track.time))
          )
        )
      )
    ),
}

export const App = (mdl) => ({
  view: () =>
    m(
      "ion-app",
      {
        "full-screen": true,
      },
      m(
        "ion-header",
        {
          style: {
            opacity: calcHeaderOpacity(mdl),
            position: "relative",
            top: calcHeaderPos(mdl),
            height: calcHeaderHeight(mdl),
            "min-height": "0px",
            zIndex: 10,
          },
        },
        m(
          "p.ion-text-center",
          {
            strong: true,
            style: {
              color: "white",
            },
          },
          m("ion-text", mdl.album.title)
        )
      ),
      m(
        "ion-content.full-screen.has-header",
        {
          slot: "primary",
          scrollEvents: true,
          onionScroll: updateScroll(mdl),
        },
        m(Img, { mdl }),
        m(List, { mdl })
      )
    ),
})
