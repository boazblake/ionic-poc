import { HTTP, locateQueryTask } from "Http"

const locateQuery = (mdl) => (state) => (query) => {
  const onError = (err) => {
    console.log("err q", err)
    state.status = "failure"
  }

  const onSuccess = (data) => {
    state.queryResults = data
    state.status = "success"
    console.log("succ d", state)
  }

  locateQueryTask(HTTP)(mdl)(query).fork(onError, onSuccess)
}

export const EventForm = () => {
  return {
    view: ({ attrs: { data, state, resetState, mdl, validate } }) => {
      return m("form.event-form", [
        m("label", [
          m("input", {
            onchange: (e) => m.route.set(`/${mdl.User.name}/${e.target.value}`),
            type: "date",
            value: mdl.selectedDate().format("YYYY-MM-DD"),
            disabled: data.allDay,
          }),
        ]),
        m(".frow row row-between", [
          m(
            "label.col-xs-1-3",
            "All Day",
            m("input", {
              type: "checkbox",
              checked: data.allDay,
              onclick: (e) => (data.allDay = !data.allDay),
            })
          ),
          [
            m("label.col-xs-1-3", [
              m("input", {
                oninput: (e) => (data.startTime = e.target.value),
                value: data.startTime,
                type: "time",
                disabled: data.allDay,
                onblur: (e) => state.isSubmitted && validate(data),
              }),
              "Start Time",
              m("span.required-field", "*"),
              state.error && m("code.required-field", state.error.startTime),
            ]),
            m("label.col-xs-1-3", [
              m("input", {
                oninput: (e) => (data.endTime = e.target.value),
                value: data.endTime,
                type: "time",
                disabled: data.allDay,
                onblur: (e) => state.isSubmitted && validate(data),
              }),
              "End Time",
              m("span.required-field", "*"),
              state.error && m("code.required-field", state.error.endTime),
            ]),
          ],
        ]),

        m(".frow row row-between", [
          m(
            "label.col-xs-1-5",
            m("span.required-field", "*"),
            state.error && m("code.required-field", state.error.location),
            "In Person",
            m("input", {
              type: "checkbox",
              checked: data.inPerson,
              onclick: (e) => (data.inPerson = !data.inPerson),
            })
          ),
          data.inPerson
            ? m(
                "label.col-xs-4-5",
                m("input", {
                  type: "address",
                  value: data.location,
                  oninput: (e) => (data.location = e.target.value),
                  onchange: (e) => locateQuery(mdl)(state)(e.target.value),
                  onblur: (e) => state.isSubmitted && validate(data),
                }),
                "Address - Location"
              )
            : m(
                "label.col-xs-4-5",
                m("input", {
                  type: "url",
                  value: data.url,
                  oninput: (e) => (data.url = e.target.value),
                  onblur: (e) => state.isSubmitted && validate(data),
                }),
                "Url link - Location"
              ),

          state.queryResults.any() &&
            m(
              "ul.event-form-query-container",
              state.queryResults.map(({ address, latlong }) =>
                m(
                  "li",
                  m(
                    "code.form-event-query-result",
                    {
                      onclick: (e) => {
                        data.location = address
                        data.latlong = latlong
                        resetState()
                      },
                    },
                    address
                  )
                )
              )
            ),
        ]),

        m(
          "label",
          m("input", {
            type: "text",
            value: data.text,
            oninput: (e) => (data.title = e.target.value),
            onblur: (e) => state.isSubmitted && validate(data),
          }),
          "Title",
          m("span.required-field", "*"),
          state.error && m("code.required-field", state.error.title)
        ),
        m(
          "label",
          m("input", {
            type: "text",
            value: data.notes,
            oninput: (e) => (data.notes = e.target.value),
            onblur: (e) => state.isSubmitted && validate(data),
          }),
          "Notes"
        ),
      ])
    },
  }
}