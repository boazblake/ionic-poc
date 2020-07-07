const getProfileTask = (http) => (mdl) => (username) =>
  http.getTask(mdl)(`profiles/${username}`)

const getAuthorArticlesTask = (http) => (mdl) => (state) => (username) =>
  http.getTask(mdl)(
    `articles?limit=20&offset=${state.offset}&author=${username}`
  )

const getAuthorFavoriteArticlesTask = (http) => (mdl) => (state) => (
  username
) =>
  http.getTask(mdl)(
    `articles?limit=20&offset=${state.offset}&favorited=${username}`
  )

export const loadDataTask = (http) => (mdl) => (state) =>
  Task.of((profile) => (authorArticles) => (authorFavoriteArticles) => ({
    ...profile,
    authorArticles,
    authorFavoriteArticles,
  }))
    .ap(getProfileTask(http)(mdl)(mdl.slug))
    .ap(getAuthorArticlesTask(http)(mdl)(state)(mdl.slug))
    .ap(getAuthorFavoriteArticlesTask(http)(mdl)(state)(mdl.slug))