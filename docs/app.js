(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("action-sheet.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSettings = void 0;

var _core = require("@ionic/core");

var showSettings = mdl => {
  var showAction = () => {
    _core.actionSheetController.create({
      header: "Settings",
      buttons: [{
        handler: () => {
          mdl.state.mode = mdl.state.mode == 'light' ? 'dark' : 'light';
          document.body.classList.toggle('dark');
          window.matchMedia('(prefers-color-scheme: dark)');
        },
        text: mdl.state.mode == 'light' ? 'Enter Dark Mode' : 'Enter Light Mode'
      }]
    }).then(x => x.present());
  };

  showAction();
};

exports.showSettings = showSettings;
});

;require.register("app.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _ramda = require("ramda");

var calcOpacity = mdl => mdl.state.toTop() / 350;

var calcHeaderOpacity = (_ref) => {
  var {
    state: {
      scrolled,
      headerOpacity
    }
  } = _ref;

  var newOpacity = n => {
    var x = n / 350 - 1;
    return x;
  };

  return scrolled.map(dist => headerOpacity(newOpacity(dist + headerOpacity())));
};

var calcHeaderHeight = (_ref2) => {
  var {
    state: {
      scrolled,
      headerHeight
    }
  } = _ref2;

  var orig = h => parseInt(h().split("px")[0]);

  var newHeight = n => {
    var x = (0, _ramda.clamp)(0, 50, n / 7) + "px";
    return x;
  };

  console.log(headerHeight());
  scrolled.map(dist => headerHeight(newHeight(dist + orig(headerHeight))));
  return headerHeight();
};

var calcHeaderPos = (_ref3) => {
  var {
    state: {
      toTop,
      headerPos
    }
  } = _ref3;
  var pos = (0, _ramda.clamp)(-35, 1, 1 / -headerPos().split("px")[0] - toTop() + 50);
  var strPos = pos.toString() + "px";
  return headerPos(strPos);
};

var calcImgScale = (_ref4) => {
  var {
    state: {
      scrolled
    }
  } = _ref4;
  var res = scrolled() > 0 ? 1 : scrolled() / -100 + 1;
  console.log(res);
  return res;
};

var updateScroll = mdl => (_ref5) => {
  var {
    detail: {
      scrollTop
    }
  } = _ref5;
  var pos = 350 - scrollTop;
  mdl.state.scrolled(scrollTop);
  mdl.state.toTop((0, _ramda.clamp)(0, 350, pos));
};

var Img = {
  view: (_ref6) => {
    var {
      attrs: {
        mdl
      }
    } = _ref6;
    return m("section.img", {
      style: {
        position: "fixed",
        width: "100%",
        height: "300px"
      }
    }, m("img", {
      src: "images/Get_Lucky.jpeg",
      style: {
        width: "100%",
        opacity: calcOpacity(mdl),
        transform: "scale(".concat((0, _ramda.clamp)(1, 1.5, calcImgScale(mdl)), ")")
      }
    }));
  }
};
var List = {
  view: (_ref7) => {
    var {
      attrs: {
        mdl
      }
    } = _ref7;
    return m("section#list", {
      style: {
        position: "absolute",
        top: "25%",
        width: "100%",
        height: "100%"
      }
    }, m("h1.ion-text-center", {
      strong: true,
      style: {
        fontSize: "3rem",
        opacity: calcOpacity(mdl)
      }
    }, m("ion-text", mdl.album.title)), m("ion-button#shuffle", {
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
        zIndex: 15
      }
    }, m("ion-text", m("h2", "SHUFFLE PLAY"))), m("ion-list", {
      style: {
        width: "100%"
      }
    }, mdl.album.tracks.map((track, idx) => m("ion-item", m("ion-avatar", {
      slot: "start"
    }, m("ion-text", idx + 1)), m("ion-label", m("ion-text", m("h2", track.title)), m("ion-text", m("ion-note", track.featuring))), m("ion-sub-title", {
      slot: "end"
    }, m("ion-text", track.time))))));
  }
};

var App = mdl => ({
  view: () => m("ion-app", {
    "full-screen": true
  }, m("ion-header", {
    style: {
      opacity: calcHeaderOpacity(mdl),
      position: "relative",
      top: calcHeaderPos(mdl),
      height: calcHeaderHeight(mdl),
      "min-height": "0px",
      zIndex: 10
    }
  }, m("p.ion-text-center", {
    strong: true,
    style: {
      color: "white"
    }
  }, m("ion-text", mdl.album.title))), m("ion-content.full-screen.has-header", {
    slot: "primary",
    scrollEvents: true,
    onionScroll: updateScroll(mdl)
  }, m(Img, {
    mdl
  }), m(List, {
    mdl
  })))
});

exports.App = App;
});

;require.register("index.js", function(exports, require, module) {
"use strict";

var _app = require("./app.js");

var _model = require("./model");

var root = document.body;

if (module.hot) {
  module.hot.accept();
}

m.mount(root, (0, _app.App)(_model.Model));
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

document.addEventListener("DOMContentLoaded", () => require("./index.js"));
});

;require.register("model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

var _mithrilStream = _interopRequireDefault(require("mithril-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = {
  state: {
    mode: "dark",
    headerHeight: (0, _mithrilStream.default)("0px"),
    headerPos: (0, _mithrilStream.default)("-350px"),
    headerOpacity: (0, _mithrilStream.default)(0),
    toTop: (0, _mithrilStream.default)(350),
    scrolled: (0, _mithrilStream.default)(0)
  },
  album: {
    title: "Random Access Memories",
    tracks: [{
      title: "Give Life Back to Music",
      featuring: "Nile Rodgers",
      time: "4:34"
    }, {
      title: "The Game of Love",
      featuring: "",
      time: "5:22"
    }, {
      title: "Giorgio by Moroder",
      featuring: "Giorgio Moroder",
      time: "9:04"
    }, {
      title: "Within",
      featuring: "Chilly Gonzales",
      time: "3:48"
    }, {
      title: "Instant Crush",
      featuring: "Julian Casablancas",
      time: "5:37"
    }, {
      title: "Lose Yourself to Dance",
      featuring: "Pharrell Williams and Nile Rodgers",
      time: "5:53"
    }, {
      title: "Touch",
      featuring: "Paul Williams",
      time: "8:18"
    }, {
      title: "Get Lucky",
      featuring: "Pharrell Williams and Nile Rodgers",
      time: "6:07"
    }, {
      title: "Beyond",
      featuring: "",
      time: "4:50"
    }, {
      title: "Motherboard",
      featuring: "",
      time: "5:41"
    }, {
      title: "Fragments of Time",
      featuring: "Todd Edwards",
      time: "4:39"
    }, {
      title: "Doin’ It Right",
      featuring: "Panda Bear",
      time: "4:11"
    }, {
      title: "Contact",
      featuring: "DJ Falcon",
      time: "6:21"
    }]
  }
};
exports.Model = Model;
});

;require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.m = require("mithril");
window.Stream = require("mithril-stream");


});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map