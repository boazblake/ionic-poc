!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},r={},o={},a={}.hasOwnProperty,s=/^\.\.?(\/|$)/,n=function(e,t){for(var r,o=[],a=(s.test(t)?e+"/"+t:t).split("/"),n=0,i=a.length;n<i;n++)".."===(r=a[n])?o.pop():"."!==r&&""!==r&&o.push(r);return o.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},l=function(t,o){var a,s={id:t,exports:{},hot:p&&p.createHot(t)};return r[t]=s,o(s.exports,(a=t,function(t){var r=n(i(a),t);return e.require(r,a)}),s),s.exports},u=function(e){var t=o[e];return t&&e!==t?u(t):e},d=function(e,o){null==o&&(o="/");var s=u(e);if(a.call(r,s))return r[s].exports;if(a.call(t,s))return l(s,t[s]);throw new Error("Cannot find module '"+e+"' from '"+o+"'")};d.alias=function(e,t){o[t]=e};var m=/\.[^.\/]+$/,c=/\/index(\.[^\/]+)?$/;d.register=d.define=function(e,s){if(e&&"object"==typeof e)for(var n in e)a.call(e,n)&&d.register(n,e[n]);else t[e]=s,delete r[e],function(e){if(m.test(e)){var t=e.replace(m,"");a.call(o,t)&&o[t].replace(m,"")!==t+"/index"||(o[t]=e)}if(c.test(e)){var r=e.replace(c,"");a.call(o,r)||(o[r]=e)}}(e)},d.list=function(){var e=[];for(var r in t)a.call(t,r)&&e.push(r);return e};var p=e._hmr&&new e._hmr((function(e,t){return u(n(i(e),t))}),d,t,r);d._cache=r,d.hmr=p&&p.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window||window;require.register("App.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=e=>e.Routes.reduce((e=>(t,r)=>(t[r.route]={onmatch:(t,o,a)=>{r.group.includes("authenticated")&&!e.state.isAuth()&&m.route.set(m.route.get()),e.state.route=r,r.onmatch(e,t,o,a)},render:()=>r.component(e)},t))(e),{});e.default=o})),require.register("Http.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("./secrets.js"),a=n(t("data.task")),s=n(t("./Models.js"));function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(e){e.lengthComputable&&(s.default.state.loadingProgress.max(e.total),s.default.state.loadingProgress.value(e.loaded),m.redraw())}function c(){return!1}function p(){return s.default.state.isLoading(!0),!1}function h(){return s.default.state.isLoading(!1),s.default.state.loadingProgress.max(0),s.default.state.loadingProgress.value(0),!1}var f={config:e=>{e.onprogress=d,e.onload=c,e.onloadstart=p,e.onloadend=h}},v=e=>t=>new a.default((r,o)=>{return(a=s.default,a.state.isLoading(!a.state.isLoading),m.request)(e,l(l(l({},t),((e,t)=>({headers:l({},{"Content-Type":"application/json;charset=utf-8"}&&["Get","POST","PUT","PATCH"].includes(t.method))}))(0,t)),f)).then(o,r);var a}),g={getTask:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v(e)(l(l({},t),{},{method:"GET"}))},postTask:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v(e)(l(l({},t),{},{method:"POST"}))},putTask:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v(e)(l(l({},t),{},{method:"PUT"}))},deleteTask:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return v(e)(l(l({},t),{},{method:"DELETE"}))},searchUrl:e=>{return(t=o.tvMazeBaseUrl,e=>"".concat(t,"/search/shows?q=").concat(e))(e);var t},tvMazeDetailsUrl:e=>{return(t=o.tvMazeBaseUrl,e=>"".concat(t,"/shows/").concat(e))(e);var t},backendlessUrl:e=>"https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/"+e};e.default=g})),require.register("Models.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,a=(o=t("./routes"))&&o.__esModule?o:{default:o};var s={isAuth:Stream(!1),route:"",paginate:{page:Stream(1),total_pages:Stream(0),total_results:Stream(0)},query:Stream(""),isLoading:Stream(!1),loadingProgress:{max:Stream(null),value:Stream(null)},searchItem:{showMenu:Stream(!1)},details:{selected:Stream(null)},currentList:Stream("Watching")},n={shows:Stream([]),details:Stream(null)},i={details:Stream(null),search:Stream(null),user:Stream(null)},l={shows:Stream([]),lists:Stream(["Watching","Wishlist"])},u={Routes:a.default,state:s,user:l,data:n,errors:i};e.default=u})),require.register("components/action-sheet.js",(function(e,t,r){"use strict";t("@ionic/core")})),require.register("components/index.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("./layout.js");Object.keys(o).forEach((function(t){"default"!==t&&"__esModule"!==t&&(t in e&&e[t]===o[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}}))}));var a=t("./modal.js");Object.keys(a).forEach((function(t){"default"!==t&&"__esModule"!==t&&(t in e&&e[t]===a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}}))}))})),require.register("components/layout.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Layout=void 0;var o=n(t("../routes/index.js")),a=n(t("../Http.js")),s=t("../pages/fns.js");function n(e){return e&&e.__esModule?e:{default:e}}var i=()=>({view:e=>{var{attrs:{mdl:t}}=e;return m("ion-segment",{value:t.state.currentList()},t.user.lists().map(e=>m("ion-segment-button",{onclick:()=>t.state.currentList(e),value:e},e)))}}),l=()=>({view:e=>{var{attrs:{mdl:t}}=e;return m("ion-searchbar",{style:{paddingTop:"12px"},animated:!0,animated:!0,"show-cancel-button":"focus",placeholder:"Search for a show",value:t.state.query(),oninput:e=>t.state.query(e.target.value),onkeyup:()=>(e=>(0,s.searchShowsTask)(e)(a.default).fork((0,s.onError)(e)("search"),e.data.shows))(t)})}}),u=e=>{var{attrs:{mdl:t}}=e;return{view:e=>{var{attrs:{mdl:t}}=e;return m("ion-header",m("ion-toolbar","home"==t.state.route.name&&m(i,{mdl:t}),"search"==t.state.route.name&&m(l,{mdl:t})))}}},d=()=>({view:()=>m("ion-footer",m("ion-tab-bar",m("ion-tabs",[o.default.map(e=>m("ion-tab",{tab:"".concat(e.route)})),m("ion-tab-bar",{slot:"bottom"},[o.default.map(e=>m("ion-tab-button",{onclick:()=>m.route.set(e.route),tab:"".concat(e.route)},[m("ion-label",e.name),m("ion-icon",{name:e.icon})]))])])))});e.Layout=()=>({view:e=>{var{attrs:{mdl:t},children:r}=e;return m("ion-app",[m(u,{mdl:t}),m("ion-content",r),m(d,{mdl:t})])}})})),require.register("components/modal.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Modal=void 0;var o,a=t("@ionic/core"),s=(o=t("../Http"))&&o.__esModule?o:{default:o},n=t("../pages/fns");var i={show:"",modal:null},l=e=>e.state.details.selected(null),u=e=>{i.error=e},d=e=>{console.log(e),i.show=e},c=()=>{var e=void 0;return{oninit:t=>{var r,{attrs:{mdl:o,ep:{href:a}}}=t;return r=a,(0,n.getEpisodeTask)(s.default)(r).fork(u,t=>{console.log(t),e=t})},view:t=>{var{attrs:{ep:{label:r}}}=t;return e&&m(".",[m("h3",r),m("ion-img",{src:e.image}),m("ion-item",m("ion-label",e.name),m("p",e.airdate),m("ion-label","Season - Ep:"),m("p","".concat(e.season," - ").concat(e.number)))])}}};e.Modal=()=>({oninit:e=>{var{attrs:{mdl:t}}=e;return(e=>e.state.details.selected().objectId?(0,n.getShowDetailsTask)(s.default)(e.state.details.selected().objectId).fork(u,d):(0,n.getShowTvMazeDetailsTask)(s.default)(e.state.details.selected()).fork(u,d))(t)},oncreate:e=>{var{dom:t}=e;a.modalController.create({component:t,backdropDismiss:!1}).then(e=>{i.modal=e,i.modal.present()})},onremove:e=>{var{attrs:{mdl:t}}=e;return i.modal&&i.modal.dismiss().then(()=>{i.modal=null,i.show=null,l(t)})},onbeforeremove:e=>{var{attrs:{mdl:t}}=e;return i.modal.dismiss().then(()=>{i.modal=null,i.show=null,l(t)})},view:e=>{var{attrs:{mdl:t}}=e;return m("ion-modal-view",i.show&&m("ion-header",m("ion-toolbar",m("ion-title","".concat(i.show.name," - ").concat(i.show.premiered.split("-")[0]," | ").concat(i.show.network||i.show.webChannel)),m("ion-buttons",{slot:"primary"},m("ion-button",{onclick:e=>l(t)},m("ion-icon",{slot:"icon-only",name:"close"})))),!i.show.listStatus&&m("ion-item",m("ion-label","Add to: "),m("ion-buttons",t.user.lists().map(e=>m("ion-button",{onclick:r=>(e=>(t,r)=>(0,n.addUserShowsTask)(e)(s.default)(t)(r).fork(u,t=>{e.user.shows(t),l(e)}))(t)(i.show,e)},e))))),i.show&&m("ion-content",{padding:!0},m("ion-img",{style:{width:"50%"},src:i.show.image}),m("",m.trust(i.show.summary),m("pre","status: ".concat(i.show.status)),i.show.listStatus&&[m("pre","list status: ".concat(i.show.listStatus)),m("ion-textarea",{placeholder:"Notes",value:i.show.notes,onkeyup:e=>i.show.notes=e.target.value}),m("ion-button",{onclick:()=>(e=>t=>(0,n.updateShowDetailsTask)(e)(s.default)(t).chain(t=>(0,n.getShowDetailsTask)(s.default)(e.state.details.selected().objectId)).fork(u,d))(t)({notes:i.show.notes})},"Save note")],m("h3","Episodes"),i.show.links.map(e=>m(c,{mdl:t,ep:e})))))}})})),require.register("index.js",(function(e,t,r){"use strict";var o=s(t("./App.js")),a=s(t("Models"));function s(e){return e&&e.__esModule?e:{default:e}}var n=document.body;r.hot&&r.hot.accept(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./service-worker.js").then(e=>{console.log("⚙️ SW registered: ",e)}).catch(e=>{console.log("🧟 SW registration failed: ",e)})}),m.route(n,"/home",(0,o.default)(a.default))})),require.register("initialize.js",(function(e,t,r){"use strict";document.addEventListener("DOMContentLoaded",()=>t("./index.js"))})),require.register("pages/alarm.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Alarm=void 0;e.Alarm=()=>({view:e=>{var{attrs:{mdl:t}}=e;return m(".alarm",m("ion-list",[m("ion-item",m("ion-input",{placeholder:"Title"})),m("ion-item",m("ion-input",{placeholder:"Location"})),m("ion-item-divider"),m("ion-item",[m("ion-label","Start Date"),m("ion-datetime",{value:"1990-02-19",placeholder:"Select Date"})]),m("ion-item",[m("ion-label","Start Time"),m("ion-datetime",{"display-format":"h:mm A","picker-format":"h:mm A",value:"1990-02-19T07:43Z"})]),m("ion-item",[m("ion-label","Ends"),m("ion-datetime",{value:"1990-02-20",placeholder:"Select Date"})]),m("ion-item",[m("ion-label","Repeat"),m("ion-datetime",{placeholder:"Never",disabled:!1})]),m("ion-item",[m("ion-label","Travel Time"),m("ion-datetime",{placeholder:"None",disabled:!1})]),m("ion-item-divider"),m("ion-item",[m("ion-label","Alert"),m("ion-datetime",{placeholder:"None",disabled:!1})])]))}})})),require.register("pages/fns.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getEpisodeTask=e.filterShowForUnselected=e.filterShowsByListType=e.getShowDetailsTask=e.getShowTvMazeDetailsTask=e.updateShowDetailsTask=e.deleteShowTask=e.updateUserShowsTask=e.addUserShowsTask=e.toDto=e.showListSelection=e.propIsDefined=e.searchShowsTask=e.getShows=e.updateShowStatus=e.onError=e.toDbModel=e.toSearchViewModel=e.formatError=e.log=void 0;var o=t("ramda");e.log=e=>t=>(console.log(e,t),t);e.formatError=e=>JSON.parse(JSON.stringify(e));var a=e=>t=>r=>({label:e,href:n((0,o.view)((0,o.lensPath)([t,"href"]),r))}),s=e=>{var t,{name:r,season:s,number:i,airdate:l,image:u,_links:d}=e;return{name:r,season:s,number:i,airdate:l,image:u&&(n(u.original)||n(u.medium)),links:(t=d,[a("self")("self")(t)].filter(e=>!(0,o.propEq)("href",void 0)(e)))}},n=e=>e&&e.replace("http","https"),i=e=>{var{name:t,image:r,id:o}=e;return{image:r&&(n(r.original)||n(r.medium)),tvmazeId:o,name:t}};e.toSearchViewModel=i;e.toDbModel=e=>{var{listStatus:t,notes:r,name:o,tvmazeId:a,image:s}=e;return{image:s,listStatus:t,notes:r,name:o,tvmazeId:a}};e.onError=e=>t=>r=>e.errors[t](r);var l=e=>t=>t.map(t=>{return(0,o.compose)((r=t,e=>e?(0,o.assoc)("objectId",e.objectId,(0,o.set)((0,o.lensProp)("listStatus"),(0,o.prop)("listStatus",e),r)):r),(0,o.find)((0,o.propEq)("tvmazeId",t.tvmazeId)))(e);var r});e.updateShowStatus=l;var u=e=>e.getTask(e.backendlessUrl("prodshows?pagesize=100"));e.getShows=u;e.searchShowsTask=e=>t=>{return t.getTask(t.searchUrl(e.state.query())).map((0,o.pluck)("show")).map((0,o.map)(i)).map((r="image",e=>(0,o.reject)((0,o.propEq)(r,e)))(null)).map(l(e.user.shows()));var r};var d=e=>t=>(0,o.equals)((0,o.prop)("tvmazeId",t),e.state.searchItem.showMenu()),m=e=>(0,o.compose)(o.not,(0,o.propEq)(e,void 0));e.propIsDefined=m;e.showListSelection=e=>(0,o.anyPass)([d(e),m("objectId")]);var c=e=>({body:e}),p=(e,t,r)=>(0,o.compose)(c,(e=>t=>(t.order=(0,o.filter)((0,o.propEq)("listStatus",t.listStatus),e.user.shows()).length,t))(e),(e=>t=>(0,o.over)((0,o.lensProp)("listStatus"),()=>t,e))(t))(r);e.toDto=p;e.addUserShowsTask=e=>t=>r=>o=>t.postTask(t.backendlessUrl("prodshows"),p(e,r,o)).chain(e=>u(t)).map(e.user.shows);e.updateUserShowsTask=e=>t=>r=>o=>t.putTask(t.backendlessUrl("prodshows\\".concat(r.objectId)),p(e,r,o)).chain(e=>u(t));e.deleteShowTask=e=>t=>e.deleteTask(e.backendlessUrl("prodshows/".concat(t))).chain(t=>u(e));e.updateShowDetailsTask=e=>t=>r=>t.putTask(t.backendlessUrl("prodshows/".concat(e.state.details.selected().objectId)),{body:r}).chain(e=>{var{objectId:r}=e;return f(t)(r)});var h=e=>t=>e.getTask(e.tvMazeDetailsUrl(t.tvmazeId)).map((e=>{var{image:t,tvmazeId:r,objectId:s,listStatus:n,name:i,notes:l}=e;return e=>{var u,{webChannel:d,network:m,status:c,genres:p,premiered:h,summary:f,_links:v}=e;return{name:i,notes:l,genre:(0,o.join)(" ",p),premiered:h,summary:f,links:(u=v,[a("previous")("previousepisode")(u),a("next")("nextepisode")(u)].filter(e=>!(0,o.propEq)("href",void 0)(e))),image:t,tvmazeId:r,objectId:s,listStatus:n,webChannel:d&&d.name,network:m&&m.name,status:c}}})(t));e.getShowTvMazeDetailsTask=h;var f=e=>t=>(e=>t=>e.getTask(e.backendlessUrl("prodshows/".concat(t))))(e)(t).chain(h(e));e.getShowDetailsTask=f;e.filterShowsByListType=e=>(0,o.filter)((0,o.propEq)("listStatus",e.state.currentList()),e.user.shows());e.filterShowForUnselected=e=>{var t=(0,o.pluck)("tvmazeId",e.user.shows());return e.data.shows().filter(e=>!t.includes(e.tvmazeId))};e.getEpisodeTask=e=>t=>e.getTask(t).map(s)})),require.register("pages/home.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Home=void 0;var o,a=t("ramda"),s=(o=t("../Http.js"))&&o.__esModule?o:{default:o},n=t("./fns.js"),i=t("components");var l=e=>(0,a.without)([e.state.currentList()],e.user.lists())[0];e.Home=()=>({oninit:e=>{var{attrs:{mdl:t}}=e;return(e=>t=>(0,n.getShows)(t).fork(e.errors,e.user.shows))(t)(s.default)},view:e=>{var{attrs:{mdl:t}}=e;return t.state.details.selected()?m(i.Modal,{mdl:t}):m("ion-list",(0,n.filterShowsByListType)(t).map(e=>e.listStatus==t.state.currentList()&&m("ion-item-sliding",m("ion-item",{onclick:()=>((e,t)=>e.state.details.selected(t))(t,e)},m("ion-avatar",m("ion-img",{src:e.image})),m("ion-label",m("h2",e.name),m("h3",e.listStatus),m("p",e.notes))),m("ion-item-options",{side:"start"},m("ion-item-option",{onclick:()=>(e=>(t,r)=>(0,n.updateUserShowsTask)(e)(s.default)(t)(r).fork((0,n.onError)(e)("search"),t=>{m.route.set("/home"),e.user.shows(t)}))(t)(e,l(t))},"move to ".concat(l(t)))),m("ion-item-options",m("ion-item-option",{color:"danger",side:"end",onclick:()=>(e=>t=>(0,n.deleteShowTask)(s.default)(t.objectId).fork((0,n.onError)(e)("details"),t=>{m.route.set("/home"),e.user.shows(t)}))(t)(e)},"Delete")))))}})})),require.register("pages/index.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("./home.js");Object.keys(o).forEach((function(t){"default"!==t&&"__esModule"!==t&&(t in e&&e[t]===o[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}}))}));var a=t("./search-page.js");Object.keys(a).forEach((function(t){"default"!==t&&"__esModule"!==t&&(t in e&&e[t]===a[t]||Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}}))}))})),require.register("pages/search-page.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SearchPage=void 0;var o,a=(o=t("../Http.js"))&&o.__esModule?o:{default:o},s=t("./fns.js"),n=t("components");e.SearchPage=()=>({view:e=>{var{attrs:{mdl:t}}=e;return t.state.details.selected()?m(n.Modal,{mdl:t}):m("ion-list",(0,s.filterShowForUnselected)(t).map(e=>m("ion-item-sliding",{onclick:()=>((e,t)=>e.state.details.selected(t))(t,e)},m("ion-item",m("ion-avatar",m("ion-img",{src:e.image})),m("ion-label",m("h2",e.name))),m("ion-item-options",{side:"start"},t.user.lists().map(r=>m("ion-item-option",{onclick:o=>(e=>(t,r)=>(0,s.addUserShowsTask)(e)(a.default)(t)(r).fork((0,s.onError)(e)("search"),e.user.shows))(t)(e,r)},r))))))}})})),require.register("routes/index.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,a=(o=t("./main-routes.js"))&&o.__esModule?o:{default:o};var s=(0,t("ramda").flatten)([a.default]);e.default=s})),require.register("routes/main-routes.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=t("pages"),a=t("components"),s=[{id:"home",name:"home",icon:"home",route:"/home",isNav:!1,group:[],children:[],options:[],onmatch:(e,t,r,o)=>{},component:e=>m(a.Layout,{mdl:e},m(o.Home,{mdl:e}))},{id:"search",name:"search",icon:"search-outline",route:"/search",isNav:!1,group:[],children:[],options:[],onmatch:(e,t,r,o)=>{},component:e=>m(a.Layout,{mdl:e},m(o.SearchPage,{mdl:e}))}];e.default=s})),require.register("secrets.js",(function(e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.prismaUrl=e.tvMazeBaseUrl=e.tvMazeApiKey=e.tmdbBaseUrl=e.tmdbAuth=e.tmdbApiKey=void 0;e.tmdbApiKey="1e4d78ab60660282c63379725fc9b111";e.tmdbAuth={Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTRkNzhhYjYwNjYwMjgyYzYzMzc5NzI1ZmM5YjExMSIsInN1YiI6IjVkYmNjMjBjOTdhNGU2MDAxNTdjNjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgL91o4VHyQo4cm3KLx6nVICyrn8E8pXDC1zMdlDFsU"};e.tmdbBaseUrl="https://api.themoviedb.org/3";e.tvMazeApiKey="F4-A2-dEzYi0oXvzbNWON3_nrnPSt9Yv";e.tvMazeBaseUrl="https://api.tvmaze.com";e.prismaUrl="https://eu1.prisma.sh/boaz-blake-8951e1/whensMyShow/dev"})),require.alias("process/browser.js","process"),require("process"),require.register("___globals___",(function(e,t,r){window.m=t("mithril"),window.Stream=t("mithril-stream")}))}(),require("___globals___"),require("initialize");
