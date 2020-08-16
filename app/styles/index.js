export * from "./animations.js"

const defaults = {
  duration: 700,
  easing: "ease-in-out",
  fill: "forwards",
}

function transitionEndPromise(element) {
  const transitionEnded = (e) => {
    // console.log("transitionEnded", element, e)
    if (e.target !== element) return
    element.removeEventListener("transitionend", transitionEnded)
  }
  return new Promise(() =>
    element.addEventListener("transitionend", transitionEnded)
  )
}

export const AnimatePage = (animation, opts) => ({ dom }) => {
  // let origStyles = jsonCopy(dom.style)
  // dom.style.position = "absolute"
  // dom.style.top = -19
  // dom.style.width = "100%"
  Animate(animation, opts)({ dom })
  // Animate(animation)({ dom })
}

export const Animate = (animation, opts) => ({ dom }) =>
  dom
    .animate(animation, { ...defaults, ...opts })
    .finished.then(transitionEndPromise(dom))

export const AnimateChildren = (animation, pause) => ({ dom }) => {
  let children = [...dom.children]

  children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.style.opacity = 1
      Animate(animation)({ dom: child })
    }, pause())
  })
}
