import { AnimateChildren, fadeInUp } from "Styles"
import { Pause } from "Utils"

export const Resume = () => {
  return {
    view: () =>
      m(
        ".page.frow-container",
        {
          oncreate: AnimateChildren(fadeInUp, Pause(0.15)),
        },
        [
          m(
            "a",
            {
              href: "files/resume.pdf",
              title: "Boaz Blake Web Dev Resume",
              download: "files/resume.pdf",
            },
            "Download PDF"
          ),
          m("img.resume-img", {
            id: "resume-1",
            src: "images/resume.jpeg",
          }),
          m("img.resume-img", {
            id: "resume-2",
            src: "images/resume 2.jpeg",
          }),
        ]
      ),
  }
}
