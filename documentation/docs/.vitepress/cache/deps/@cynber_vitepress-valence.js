import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  h,
  inject,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  unref,
  vModelText,
  watch,
  withCtx,
  withDirectives,
  withModifiers
} from "./chunk-EEUNHHPO.js";

// ../node_modules/.pnpm/@iconify+vue@4.3.0_vue@3.5.22_typescript@5.9.3_/node_modules/@iconify/vue/dist/iconify.mjs
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
  // Check name: cannot be empty
  ((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
var defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (
      // Name cannot be empty
      !name || // Must have body
      typeof icon.body !== "string" || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (
      // Name cannot be empty
      !name || // Parent must be set and point to existing icon
      typeof parent !== "string" || !icons[parent] && !aliases[parent] || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  return data;
}
var dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  if (data) {
    return addIconToStorage(storage2, icon.name, data);
  } else {
    storage2.missing.add(icon.name);
    return true;
  }
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
var regex = /\sid="(\S+)"/g;
var randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
var counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
var storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
var configStorage = /* @__PURE__ */ Object.create(null);
var fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
var detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
var fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
var send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
var redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage2, icons, data) {
  function checkMissing() {
    const pending = storage2.pendingIcons;
    icons.forEach((name) => {
      if (pending) {
        pending.delete(name);
      }
      if (!storage2.icons[name]) {
        storage2.missing.add(name);
      }
    });
  }
  if (data && typeof data === "object") {
    try {
      const parsed = addIconSet(storage2, data);
      if (!parsed.length) {
        checkMissing();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }
  checkMissing();
  loadedNewIcons(storage2);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) {
    response.then((data) => {
      callback(data);
    }).catch(() => {
      callback(null);
    });
  } else {
    callback(response);
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      if (!icons2 || !icons2.length) {
        return;
      }
      const customIconLoader = storage2.loadIcon;
      if (storage2.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(
          storage2.loadIcons(icons2, prefix, provider),
          (data) => {
            parseLoaderResponse(storage2, icons2, data);
          }
        );
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          const response = customIconLoader(name, prefix, provider);
          parsePossiblyAsyncResponse(response, (data) => {
            const iconSet = data ? {
              prefix,
              icons: {
                [name]: data
              }
            } : null;
            parseLoaderResponse(storage2, [name], iconSet);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) {
        parseLoaderResponse(storage2, invalid, null);
      }
      if (!valid.length) {
        return;
      }
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage2, valid, null);
        return;
      }
      const params = api.prepare(provider, prefix, valid);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage2, item.icons, data);
        });
      });
    });
  }
}
var loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const list = newIcons[storage2.provider][storage2.prefix];
    if (list.length) {
      loadNewIcons(storage2, list);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
var separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
var defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
var svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
var commonProps = {
  display: "inline-block"
};
var monotoneProps = {
  backgroundColor: "currentColor"
};
var coloredProps = {
  backgroundColor: "transparent"
};
var propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
var propsToAddTo = {
  webkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
var customisationAliases = {};
["horizontal", "vertical"].forEach((prefix) => {
  const attr = prefix.slice(0, 1) + "Flip";
  customisationAliases[prefix + "-flip"] = attr;
  customisationAliases[prefix.slice(0, 1) + "-flip"] = attr;
  customisationAliases[prefix + "Flip"] = attr;
});
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
var render = (icon, props) => {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const componentProps = { ...svgDefaults };
  const mode = props.mode || "svg";
  const style = {};
  const propsStyle = props.style;
  const customStyle = typeof propsStyle === "object" && !(propsStyle instanceof Array) ? propsStyle : {};
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style.color = value;
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default: {
        const alias = customisationAliases[key];
        if (alias) {
          if (value === true || value === "true" || value === 1) {
            customisations[alias] = true;
          }
        } else if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
      }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    componentProps["innerHTML"] = replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyVue");
    return h("svg", componentProps);
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL(html),
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return h("span", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  const _window = window;
  if (_window.IconifyPreload !== void 0) {
    const preload = _window.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window.IconifyProviders !== void 0) {
    const providers = _window.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
var emptyIcon = {
  ...defaultIconProps,
  body: ""
};
var Icon = defineComponent({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: false,
  // Set initial data
  data() {
    return {
      // Current icon name
      _name: "",
      // Loading
      _loadingIcon: null,
      // Mounted status
      iconMounted: false,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this.iconMounted = true;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      if (this._loadingIcon) {
        this._loadingIcon.abort();
        this._loadingIcon = null;
      }
    },
    // Get data for icon to render or null
    getIcon(icon, onload, customise) {
      if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
        this._name = "";
        this.abortLoading();
        return {
          data: icon
        };
      }
      let iconName;
      if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
        this.abortLoading();
        return null;
      }
      let data = getIconData(iconName);
      if (!data) {
        if (!this._loadingIcon || this._loadingIcon.name !== icon) {
          this.abortLoading();
          this._name = "";
          if (data !== null) {
            this._loadingIcon = {
              name: icon,
              abort: loadIcons([iconName], () => {
                this.counter++;
              })
            };
          }
        }
        return null;
      }
      this.abortLoading();
      if (this._name !== icon) {
        this._name = icon;
        if (onload) {
          onload(icon);
        }
      }
      if (customise) {
        data = Object.assign({}, data);
        const customised = customise(data.body, iconName.name, iconName.prefix, iconName.provider);
        if (typeof customised === "string") {
          data.body = customised;
        }
      }
      const classes = ["iconify"];
      if (iconName.prefix !== "") {
        classes.push("iconify--" + iconName.prefix);
      }
      if (iconName.provider !== "") {
        classes.push("iconify--" + iconName.provider);
      }
      return { data, classes };
    }
  },
  // Render icon
  render() {
    this.counter;
    const props = this.$attrs;
    const icon = this.iconMounted || props.ssr ? this.getIcon(props.icon, props.onLoad, props.customise) : null;
    if (!icon) {
      return render(emptyIcon, props);
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        class: (typeof props["class"] === "string" ? props["class"] + " " : "") + icon.classes.join(" ")
      };
    }
    return render({
      ...defaultIconProps,
      ...icon.data
    }, newProps);
  }
});

// ../node_modules/.pnpm/@cynber+vitepress-valence@0.2.1_@iconify+vue@4.3.0_vue@3.5.22_typescript@5.9.3___vitepr_effeda05cd48e81820436cd244bd19da/node_modules/@cynber/vitepress-valence/dist/vitepress-valence.es.js
import { useData as Ve, inBrowser as Pt } from "vitepress";
var Ot = { class: "horizontal-card" };
var Mt = { class: "card-content" };
var zt = { class: "card-info" };
var At = { class: "card-meta" };
var Bt = { key: 0 };
var Ht = { key: 1 };
var Ft = {
  key: 0,
  class: "tags-container"
};
var Nt = { class: "tags-content" };
var Vt = {
  key: 0,
  class: "tag category-tag"
};
var Wt = {
  key: 0,
  class: "card-image"
};
var Rt = ["src", "alt"];
var Ut = ["src", "alt"];
var Yt = ["src", "alt"];
var qt = defineComponent({
  __name: "HorizontalCard",
  props: {
    title: {},
    excerpt: {},
    author: {},
    date: {},
    image: {},
    image_dark: {},
    category: {},
    tags: {},
    url: {},
    hideAuthor: { type: Boolean },
    hideDate: { type: Boolean },
    hideImage: { type: Boolean },
    hideCategory: { type: Boolean },
    hideTags: { type: Boolean },
    hideDomain: { type: Boolean },
    disableLinks: { type: Boolean },
    isExternal: { type: Boolean },
    titleLines: {},
    excerptLines: {}
  },
  setup(t2) {
    return (e, a) => (openBlock(), createElementBlock("div", Ot, [
      (openBlock(), createBlock(resolveDynamicComponent(t2.disableLinks ? "div" : "a"), {
        href: t2.disableLinks ? void 0 : t2.url,
        class: "card-link",
        target: t2.isExternal ? "_blank" : void 0,
        rel: t2.isExternal ? "noopener noreferrer" : void 0
      }, {
        default: withCtx(() => [
          createBaseVNode("div", Mt, [
            createBaseVNode("div", zt, [
              createBaseVNode("div", {
                class: "card-title",
                style: normalizeStyle({ "--line-clamp-title": t2.titleLines || 2 })
              }, toDisplayString(t2.title), 5),
              createBaseVNode("div", At, [
                !t2.hideAuthor && t2.author ? (openBlock(), createElementBlock("span", Bt, toDisplayString(t2.author), 1)) : createCommentVNode("", true),
                !t2.hideDate && t2.date && t2.date !== "Invalid Date" ? (openBlock(), createElementBlock("span", Ht, toDisplayString(t2.date), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("p", {
                class: "card-excerpt",
                style: normalizeStyle({ "--line-clamp-excerpt": t2.excerptLines })
              }, toDisplayString(t2.excerpt), 5),
              !t2.hideCategory && t2.category || !t2.hideTags && t2.tags && t2.tags.length > 0 ? (openBlock(), createElementBlock("div", Ft, [
                createBaseVNode("div", Nt, [
                  !t2.hideCategory && t2.category ? (openBlock(), createElementBlock("span", Vt, toDisplayString(t2.category), 1)) : createCommentVNode("", true),
                  t2.hideTags ? createCommentVNode("", true) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(t2.tags, (n) => (openBlock(), createElementBlock("span", {
                    key: n,
                    class: "tag"
                  }, toDisplayString(n), 1))), 128))
                ])
              ])) : createCommentVNode("", true)
            ]),
            !t2.hideImage && (t2.image || t2.image_dark) ? (openBlock(), createElementBlock("div", Wt, [
              t2.image ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: t2.image,
                alt: t2.title,
                loading: "lazy",
                class: "vpv-light-only"
              }, null, 8, Rt)) : createCommentVNode("", true),
              t2.image_dark ? (openBlock(), createElementBlock("img", {
                key: 1,
                src: t2.image_dark,
                alt: t2.title,
                loading: "lazy",
                class: "vpv-dark-only"
              }, null, 8, Ut)) : t2.image ? (openBlock(), createElementBlock("img", {
                key: 2,
                src: t2.image,
                alt: t2.title,
                loading: "lazy",
                class: "vpv-dark-only"
              }, null, 8, Yt)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["href", "target", "rel"]))
    ]));
  }
});
var B = (t2, e) => {
  const a = t2.__vccOpts || t2;
  for (const [n, r] of e)
    a[n] = r;
  return a;
};
var $e = B(qt, [["__scopeId", "data-v-43eb59de"]]);
var jt = { class: "card" };
var Gt = {
  key: 0,
  class: "card-image"
};
var Xt = ["src", "alt"];
var Qt = ["src", "alt"];
var Jt = ["src", "alt"];
var Zt = { class: "card-info" };
var Kt = { class: "card-meta" };
var ea = { key: 0 };
var ta = { key: 1 };
var aa = {
  key: 0,
  class: "tags-container"
};
var na = { class: "tags-content" };
var ra = {
  key: 0,
  class: "tag category-tag"
};
var oa = {
  key: 1,
  class: "card-footer"
};
var ia = { class: "footer-content" };
var sa = defineComponent({
  __name: "VerticalCard",
  props: {
    title: {},
    excerpt: {},
    author: {},
    date: {},
    image: {},
    image_dark: {},
    category: {},
    tags: {},
    url: {},
    hideAuthor: { type: Boolean },
    hideDate: { type: Boolean },
    hideImage: { type: Boolean },
    hideCategory: { type: Boolean },
    hideTags: { type: Boolean },
    hideDomain: { type: Boolean },
    disableLinks: { type: Boolean },
    isExternal: { type: Boolean },
    titleLines: {},
    excerptLines: {}
  },
  setup(t2) {
    return (e, a) => (openBlock(), createElementBlock("div", jt, [
      (openBlock(), createBlock(resolveDynamicComponent(t2.disableLinks ? "div" : "a"), {
        href: t2.disableLinks ? void 0 : t2.url,
        class: "card-link",
        target: t2.isExternal ? "_blank" : void 0,
        rel: t2.isExternal ? "noopener noreferrer" : void 0
      }, {
        default: withCtx(() => [
          !t2.hideImage && (t2.image || t2.image_dark) ? (openBlock(), createElementBlock("div", Gt, [
            t2.image ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: t2.image,
              alt: t2.title,
              loading: "lazy",
              class: "vpv-light-only"
            }, null, 8, Xt)) : createCommentVNode("", true),
            t2.image_dark ? (openBlock(), createElementBlock("img", {
              key: 1,
              src: t2.image_dark,
              alt: t2.title,
              loading: "lazy",
              class: "vpv-dark-only"
            }, null, 8, Qt)) : t2.image ? (openBlock(), createElementBlock("img", {
              key: 2,
              src: t2.image,
              alt: t2.title,
              loading: "lazy",
              class: "vpv-dark-only"
            }, null, 8, Jt)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", Zt, [
            createBaseVNode("div", {
              class: "card-title",
              style: normalizeStyle({ "--line-clamp-title": t2.titleLines || 2 })
            }, toDisplayString(t2.title), 5),
            createBaseVNode("div", Kt, [
              !t2.hideAuthor && t2.author ? (openBlock(), createElementBlock("span", ea, toDisplayString(t2.author), 1)) : createCommentVNode("", true),
              !t2.hideDate && t2.date && t2.date !== "Invalid Date" ? (openBlock(), createElementBlock("span", ta, toDisplayString(t2.date), 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("p", {
              class: "card-body",
              style: normalizeStyle({ "--line-clamp-excerpt": t2.excerptLines })
            }, toDisplayString(t2.excerpt), 5),
            !t2.hideCategory && t2.category || !t2.hideTags && t2.tags && t2.tags.length > 0 ? (openBlock(), createElementBlock("div", aa, [
              createBaseVNode("div", na, [
                !t2.hideCategory && t2.category ? (openBlock(), createElementBlock("span", ra, toDisplayString(t2.category), 1)) : createCommentVNode("", true),
                t2.hideTags ? createCommentVNode("", true) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(t2.tags, (n) => (openBlock(), createElementBlock("span", {
                  key: n,
                  class: "tag"
                }, toDisplayString(n), 1))), 128))
              ])
            ])) : createCommentVNode("", true)
          ]),
          !t2.hideDomain && t2.isExternal ? (openBlock(), createElementBlock("div", oa, [
            createBaseVNode("div", ia, [
              createVNode(unref(Icon), {
                icon: "mdi:external-link",
                class: "external-icon"
              }),
              a[0] || (a[0] = createBaseVNode("span", null, "External Link", -1))
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["href", "target", "rel"]))
    ]));
  }
});
var ge = B(sa, [["__scopeId", "data-v-d2f9af7e"]]);
var ct = 6048e5;
var la = 864e5;
var ut = 6e4;
var mt = 36e5;
var Ye = Symbol.for("constructDateFrom");
function te(t2, e) {
  return typeof t2 == "function" ? t2(e) : t2 && typeof t2 == "object" && Ye in t2 ? t2[Ye](e) : t2 instanceof Date ? new t2.constructor(e) : new Date(e);
}
function j(t2, e) {
  return te(e || t2, t2);
}
var da = {};
function Ie() {
  return da;
}
function xe(t2, e) {
  var _a2, _b, _c, _d;
  const a = Ie(), n = (e == null ? void 0 : e.weekStartsOn) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.weekStartsOn) ?? a.weekStartsOn ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, r = j(t2, e == null ? void 0 : e.in), o = r.getDay(), d = (o < n ? 7 : 0) + o - n;
  return r.setDate(r.getDate() - d), r.setHours(0, 0, 0, 0), r;
}
function Se(t2, e) {
  return xe(t2, { ...e, weekStartsOn: 1 });
}
function ht(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in), n = a.getFullYear(), r = te(a, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const o = Se(r), d = te(a, 0);
  d.setFullYear(n, 0, 4), d.setHours(0, 0, 0, 0);
  const c = Se(d);
  return a.getTime() >= o.getTime() ? n + 1 : a.getTime() >= c.getTime() ? n : n - 1;
}
function qe(t2) {
  const e = j(t2), a = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return a.setUTCFullYear(e.getFullYear()), +t2 - +a;
}
function ca(t2, ...e) {
  const a = te.bind(
    null,
    e.find((n) => typeof n == "object")
  );
  return e.map(a);
}
function je(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in);
  return a.setHours(0, 0, 0, 0), a;
}
function ua(t2, e, a) {
  const [n, r] = ca(
    a == null ? void 0 : a.in,
    t2,
    e
  ), o = je(n), d = je(r), c = +o - qe(o), x = +d - qe(d);
  return Math.round((c - x) / la);
}
function ma(t2, e) {
  const a = ht(t2, e), n = te(t2, 0);
  return n.setFullYear(a, 0, 4), n.setHours(0, 0, 0, 0), Se(n);
}
function ha(t2) {
  return t2 instanceof Date || typeof t2 == "object" && Object.prototype.toString.call(t2) === "[object Date]";
}
function ft(t2) {
  return !(!ha(t2) && typeof t2 != "number" || isNaN(+j(t2)));
}
function fa(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in);
  return a.setFullYear(a.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
}
var ga = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var va = (t2, e, a) => {
  let n;
  const r = ga[t2];
  return typeof r == "string" ? n = r : e === 1 ? n = r.one : n = r.other.replace("{{count}}", e.toString()), (a == null ? void 0 : a.addSuffix) ? a.comparison && a.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Ae(t2) {
  return (e = {}) => {
    const a = e.width ? String(e.width) : t2.defaultWidth;
    return t2.formats[a] || t2.formats[t2.defaultWidth];
  };
}
var ya = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var pa = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var ba = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var wa = {
  date: Ae({
    formats: ya,
    defaultWidth: "full"
  }),
  time: Ae({
    formats: pa,
    defaultWidth: "full"
  }),
  dateTime: Ae({
    formats: ba,
    defaultWidth: "full"
  })
};
var xa = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var ka = (t2, e, a, n) => xa[t2];
function ye(t2) {
  return (e, a) => {
    const n = (a == null ? void 0 : a.context) ? String(a.context) : "standalone";
    let r;
    if (n === "formatting" && t2.formattingValues) {
      const d = t2.defaultFormattingWidth || t2.defaultWidth, c = (a == null ? void 0 : a.width) ? String(a.width) : d;
      r = t2.formattingValues[c] || t2.formattingValues[d];
    } else {
      const d = t2.defaultWidth, c = (a == null ? void 0 : a.width) ? String(a.width) : t2.defaultWidth;
      r = t2.values[c] || t2.values[d];
    }
    const o = t2.argumentCallback ? t2.argumentCallback(e) : e;
    return r[o];
  };
}
var _a = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var Da = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var Ca = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var Ta = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var La = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var $a = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var Sa = (t2, e) => {
  const a = Number(t2), n = a % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return a + "st";
      case 2:
        return a + "nd";
      case 3:
        return a + "rd";
    }
  return a + "th";
};
var Ea = {
  ordinalNumber: Sa,
  era: ye({
    values: _a,
    defaultWidth: "wide"
  }),
  quarter: ye({
    values: Da,
    defaultWidth: "wide",
    argumentCallback: (t2) => t2 - 1
  }),
  month: ye({
    values: Ca,
    defaultWidth: "wide"
  }),
  day: ye({
    values: Ta,
    defaultWidth: "wide"
  }),
  dayPeriod: ye({
    values: La,
    defaultWidth: "wide",
    formattingValues: $a,
    defaultFormattingWidth: "wide"
  })
};
function pe(t2) {
  return (e, a = {}) => {
    const n = a.width, r = n && t2.matchPatterns[n] || t2.matchPatterns[t2.defaultMatchWidth], o = e.match(r);
    if (!o)
      return null;
    const d = o[0], c = n && t2.parsePatterns[n] || t2.parsePatterns[t2.defaultParseWidth], x = Array.isArray(c) ? Pa(c, (f) => f.test(d)) : (
      // [TODO] -- I challenge you to fix the type
      Ia(c, (f) => f.test(d))
    );
    let D;
    D = t2.valueCallback ? t2.valueCallback(x) : x, D = a.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      a.valueCallback(D)
    ) : D;
    const y = e.slice(d.length);
    return { value: D, rest: y };
  };
}
function Ia(t2, e) {
  for (const a in t2)
    if (Object.prototype.hasOwnProperty.call(t2, a) && e(t2[a]))
      return a;
}
function Pa(t2, e) {
  for (let a = 0; a < t2.length; a++)
    if (e(t2[a]))
      return a;
}
function Oa(t2) {
  return (e, a = {}) => {
    const n = e.match(t2.matchPattern);
    if (!n) return null;
    const r = n[0], o = e.match(t2.parsePattern);
    if (!o) return null;
    let d = t2.valueCallback ? t2.valueCallback(o[0]) : o[0];
    d = a.valueCallback ? a.valueCallback(d) : d;
    const c = e.slice(r.length);
    return { value: d, rest: c };
  };
}
var Ma = /^(\d+)(th|st|nd|rd)?/i;
var za = /\d+/i;
var Aa = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var Ba = {
  any: [/^b/i, /^(a|c)/i]
};
var Ha = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var Fa = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var Na = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var Va = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var Wa = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var Ra = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var Ua = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var Ya = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var qa = {
  ordinalNumber: Oa({
    matchPattern: Ma,
    parsePattern: za,
    valueCallback: (t2) => parseInt(t2, 10)
  }),
  era: pe({
    matchPatterns: Aa,
    defaultMatchWidth: "wide",
    parsePatterns: Ba,
    defaultParseWidth: "any"
  }),
  quarter: pe({
    matchPatterns: Ha,
    defaultMatchWidth: "wide",
    parsePatterns: Fa,
    defaultParseWidth: "any",
    valueCallback: (t2) => t2 + 1
  }),
  month: pe({
    matchPatterns: Na,
    defaultMatchWidth: "wide",
    parsePatterns: Va,
    defaultParseWidth: "any"
  }),
  day: pe({
    matchPatterns: Wa,
    defaultMatchWidth: "wide",
    parsePatterns: Ra,
    defaultParseWidth: "any"
  }),
  dayPeriod: pe({
    matchPatterns: Ua,
    defaultMatchWidth: "any",
    parsePatterns: Ya,
    defaultParseWidth: "any"
  })
};
var ja = {
  code: "en-US",
  formatDistance: va,
  formatLong: wa,
  formatRelative: ka,
  localize: Ea,
  match: qa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ga(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in);
  return ua(a, fa(a)) + 1;
}
function Xa(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in), n = +Se(a) - +ma(a);
  return Math.round(n / ct) + 1;
}
function gt(t2, e) {
  var _a2, _b, _c, _d;
  const a = j(t2, e == null ? void 0 : e.in), n = a.getFullYear(), r = Ie(), o = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d = (_c = r.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, d = te((e == null ? void 0 : e.in) || t2, 0);
  d.setFullYear(n + 1, 0, o), d.setHours(0, 0, 0, 0);
  const c = xe(d, e), x = te((e == null ? void 0 : e.in) || t2, 0);
  x.setFullYear(n, 0, o), x.setHours(0, 0, 0, 0);
  const D = xe(x, e);
  return +a >= +c ? n + 1 : +a >= +D ? n : n - 1;
}
function Qa(t2, e) {
  var _a2, _b, _c, _d;
  const a = Ie(), n = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((_b = (_a2 = e == null ? void 0 : e.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((_d = (_c = a.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1, r = gt(t2, e), o = te((e == null ? void 0 : e.in) || t2, 0);
  return o.setFullYear(r, 0, n), o.setHours(0, 0, 0, 0), xe(o, e);
}
function Ja(t2, e) {
  const a = j(t2, e == null ? void 0 : e.in), n = +xe(a, e) - +Qa(a, e);
  return Math.round(n / ct) + 1;
}
function z(t2, e) {
  const a = t2 < 0 ? "-" : "", n = Math.abs(t2).toString().padStart(e, "0");
  return a + n;
}
var oe = {
  // Year
  y(t2, e) {
    const a = t2.getFullYear(), n = a > 0 ? a : 1 - a;
    return z(e === "yy" ? n % 100 : n, e.length);
  },
  // Month
  M(t2, e) {
    const a = t2.getMonth();
    return e === "M" ? String(a + 1) : z(a + 1, 2);
  },
  // Day of the month
  d(t2, e) {
    return z(t2.getDate(), e.length);
  },
  // AM or PM
  a(t2, e) {
    const a = t2.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return a.toUpperCase();
      case "aaa":
        return a;
      case "aaaaa":
        return a[0];
      case "aaaa":
      default:
        return a === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(t2, e) {
    return z(t2.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(t2, e) {
    return z(t2.getHours(), e.length);
  },
  // Minute
  m(t2, e) {
    return z(t2.getMinutes(), e.length);
  },
  // Second
  s(t2, e) {
    return z(t2.getSeconds(), e.length);
  },
  // Fraction of second
  S(t2, e) {
    const a = e.length, n = t2.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, a - 3)
    );
    return z(r, e.length);
  }
};
var he = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var Ge = {
  // Era
  G: function(t2, e, a) {
    const n = t2.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return a.era(n, { width: "abbreviated" });
      case "GGGGG":
        return a.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return a.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(t2, e, a) {
    if (e === "yo") {
      const n = t2.getFullYear(), r = n > 0 ? n : 1 - n;
      return a.ordinalNumber(r, { unit: "year" });
    }
    return oe.y(t2, e);
  },
  // Local week-numbering year
  Y: function(t2, e, a, n) {
    const r = gt(t2, n), o = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const d = o % 100;
      return z(d, 2);
    }
    return e === "Yo" ? a.ordinalNumber(o, { unit: "year" }) : z(o, e.length);
  },
  // ISO week-numbering year
  R: function(t2, e) {
    const a = ht(t2);
    return z(a, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t2, e) {
    const a = t2.getFullYear();
    return z(a, e.length);
  },
  // Quarter
  Q: function(t2, e, a) {
    const n = Math.ceil((t2.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(n);
      case "QQ":
        return z(n, 2);
      case "Qo":
        return a.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return a.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return a.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return a.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t2, e, a) {
    const n = Math.ceil((t2.getMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(n);
      case "qq":
        return z(n, 2);
      case "qo":
        return a.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return a.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return a.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return a.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t2, e, a) {
    const n = t2.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return oe.M(t2, e);
      case "Mo":
        return a.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return a.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return a.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return a.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(t2, e, a) {
    const n = t2.getMonth();
    switch (e) {
      case "L":
        return String(n + 1);
      case "LL":
        return z(n + 1, 2);
      case "Lo":
        return a.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return a.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return a.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return a.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(t2, e, a, n) {
    const r = Ja(t2, n);
    return e === "wo" ? a.ordinalNumber(r, { unit: "week" }) : z(r, e.length);
  },
  // ISO week of year
  I: function(t2, e, a) {
    const n = Xa(t2);
    return e === "Io" ? a.ordinalNumber(n, { unit: "week" }) : z(n, e.length);
  },
  // Day of the month
  d: function(t2, e, a) {
    return e === "do" ? a.ordinalNumber(t2.getDate(), { unit: "date" }) : oe.d(t2, e);
  },
  // Day of year
  D: function(t2, e, a) {
    const n = Ga(t2);
    return e === "Do" ? a.ordinalNumber(n, { unit: "dayOfYear" }) : z(n, e.length);
  },
  // Day of week
  E: function(t2, e, a) {
    const n = t2.getDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return a.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return a.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return a.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return a.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t2, e, a, n) {
    const r = t2.getDay(), o = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(o);
      case "ee":
        return z(o, 2);
      case "eo":
        return a.ordinalNumber(o, { unit: "day" });
      case "eee":
        return a.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return a.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return a.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return a.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t2, e, a, n) {
    const r = t2.getDay(), o = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(o);
      case "cc":
        return z(o, e.length);
      case "co":
        return a.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return a.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return a.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return a.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return a.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t2, e, a) {
    const n = t2.getDay(), r = n === 0 ? 7 : n;
    switch (e) {
      case "i":
        return String(r);
      case "ii":
        return z(r, e.length);
      case "io":
        return a.ordinalNumber(r, { unit: "day" });
      case "iii":
        return a.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return a.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return a.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return a.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t2, e, a) {
    const r = t2.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t2, e, a) {
    const n = t2.getHours();
    let r;
    switch (n === 12 ? r = he.noon : n === 0 ? r = he.midnight : r = n / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t2, e, a) {
    const n = t2.getHours();
    let r;
    switch (n >= 17 ? r = he.evening : n >= 12 ? r = he.afternoon : n >= 4 ? r = he.morning : r = he.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return a.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return a.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return a.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t2, e, a) {
    if (e === "ho") {
      let n = t2.getHours() % 12;
      return n === 0 && (n = 12), a.ordinalNumber(n, { unit: "hour" });
    }
    return oe.h(t2, e);
  },
  // Hour [0-23]
  H: function(t2, e, a) {
    return e === "Ho" ? a.ordinalNumber(t2.getHours(), { unit: "hour" }) : oe.H(t2, e);
  },
  // Hour [0-11]
  K: function(t2, e, a) {
    const n = t2.getHours() % 12;
    return e === "Ko" ? a.ordinalNumber(n, { unit: "hour" }) : z(n, e.length);
  },
  // Hour [1-24]
  k: function(t2, e, a) {
    let n = t2.getHours();
    return n === 0 && (n = 24), e === "ko" ? a.ordinalNumber(n, { unit: "hour" }) : z(n, e.length);
  },
  // Minute
  m: function(t2, e, a) {
    return e === "mo" ? a.ordinalNumber(t2.getMinutes(), { unit: "minute" }) : oe.m(t2, e);
  },
  // Second
  s: function(t2, e, a) {
    return e === "so" ? a.ordinalNumber(t2.getSeconds(), { unit: "second" }) : oe.s(t2, e);
  },
  // Fraction of second
  S: function(t2, e) {
    return oe.S(t2, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t2, e, a) {
    const n = t2.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (e) {
      case "X":
        return Qe(n);
      case "XXXX":
      case "XX":
        return ue(n);
      case "XXXXX":
      case "XXX":
      default:
        return ue(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t2, e, a) {
    const n = t2.getTimezoneOffset();
    switch (e) {
      case "x":
        return Qe(n);
      case "xxxx":
      case "xx":
        return ue(n);
      case "xxxxx":
      case "xxx":
      default:
        return ue(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(t2, e, a) {
    const n = t2.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Xe(n, ":");
      case "OOOO":
      default:
        return "GMT" + ue(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t2, e, a) {
    const n = t2.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Xe(n, ":");
      case "zzzz":
      default:
        return "GMT" + ue(n, ":");
    }
  },
  // Seconds timestamp
  t: function(t2, e, a) {
    const n = Math.trunc(+t2 / 1e3);
    return z(n, e.length);
  },
  // Milliseconds timestamp
  T: function(t2, e, a) {
    return z(+t2, e.length);
  }
};
function Xe(t2, e = "") {
  const a = t2 > 0 ? "-" : "+", n = Math.abs(t2), r = Math.trunc(n / 60), o = n % 60;
  return o === 0 ? a + String(r) : a + String(r) + e + z(o, 2);
}
function Qe(t2, e) {
  return t2 % 60 === 0 ? (t2 > 0 ? "-" : "+") + z(Math.abs(t2) / 60, 2) : ue(t2, e);
}
function ue(t2, e = "") {
  const a = t2 > 0 ? "-" : "+", n = Math.abs(t2), r = z(Math.trunc(n / 60), 2), o = z(n % 60, 2);
  return a + r + e + o;
}
var Je = (t2, e) => {
  switch (t2) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
};
var vt = (t2, e) => {
  switch (t2) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
};
var Za = (t2, e) => {
  const a = t2.match(/(P+)(p+)?/) || [], n = a[1], r = a[2];
  if (!r)
    return Je(t2, e);
  let o;
  switch (n) {
    case "P":
      o = e.dateTime({ width: "short" });
      break;
    case "PP":
      o = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = e.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", Je(n, e)).replace("{{time}}", vt(r, e));
};
var Ka = {
  p: vt,
  P: Za
};
var en = /^D+$/;
var tn = /^Y+$/;
var an = ["D", "DD", "YY", "YYYY"];
function nn(t2) {
  return en.test(t2);
}
function rn(t2) {
  return tn.test(t2);
}
function on(t2, e, a) {
  const n = sn(t2, e, a);
  if (console.warn(n), an.includes(t2)) throw new RangeError(n);
}
function sn(t2, e, a) {
  const n = t2[0] === "Y" ? "years" : "days of the month";
  return `Use \`${t2.toLowerCase()}\` instead of \`${t2}\` (in \`${e}\`) for formatting ${n} to the input \`${a}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var ln = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var dn = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var cn = /^'([^]*?)'?$/;
var un = /''/g;
var mn = /[a-zA-Z]/;
function be(t2, e, a) {
  var _a2, _b, _c, _d;
  const n = Ie(), r = n.locale ?? ja, o = n.firstWeekContainsDate ?? ((_b = (_a2 = n.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b.firstWeekContainsDate) ?? 1, d = n.weekStartsOn ?? ((_d = (_c = n.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0, c = j(t2, a == null ? void 0 : a.in);
  if (!ft(c))
    throw new RangeError("Invalid time value");
  let x = e.match(dn).map((y) => {
    const f = y[0];
    if (f === "p" || f === "P") {
      const u = Ka[f];
      return u(y, r.formatLong);
    }
    return y;
  }).join("").match(ln).map((y) => {
    if (y === "''")
      return { isToken: false, value: "'" };
    const f = y[0];
    if (f === "'")
      return { isToken: false, value: hn(y) };
    if (Ge[f])
      return { isToken: true, value: y };
    if (f.match(mn))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + f + "`"
      );
    return { isToken: false, value: y };
  });
  r.localize.preprocessor && (x = r.localize.preprocessor(c, x));
  const D = {
    firstWeekContainsDate: o,
    weekStartsOn: d,
    locale: r
  };
  return x.map((y) => {
    if (!y.isToken) return y.value;
    const f = y.value;
    (rn(f) || nn(f)) && on(f, e, String(t2));
    const u = Ge[f[0]];
    return u(c, f, r.localize, D);
  }).join("");
}
function hn(t2) {
  const e = t2.match(cn);
  return e ? e[1].replace(un, "'") : t2;
}
function fn(t2, e) {
  const a = () => te(e == null ? void 0 : e.in, NaN), r = pn(t2);
  let o;
  if (r.date) {
    const D = bn(r.date, 2);
    o = wn(D.restDateString, D.year);
  }
  if (!o || isNaN(+o)) return a();
  const d = +o;
  let c = 0, x;
  if (r.time && (c = xn(r.time), isNaN(c)))
    return a();
  if (r.timezone) {
    if (x = kn(r.timezone), isNaN(x)) return a();
  } else {
    const D = new Date(d + c), y = j(0, e == null ? void 0 : e.in);
    return y.setFullYear(
      D.getUTCFullYear(),
      D.getUTCMonth(),
      D.getUTCDate()
    ), y.setHours(
      D.getUTCHours(),
      D.getUTCMinutes(),
      D.getUTCSeconds(),
      D.getUTCMilliseconds()
    ), y;
  }
  return j(d + c + x, e == null ? void 0 : e.in);
}
var Ce = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var gn = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var vn = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var yn = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function pn(t2) {
  const e = {}, a = t2.split(Ce.dateTimeDelimiter);
  let n;
  if (a.length > 2)
    return e;
  if (/:/.test(a[0]) ? n = a[0] : (e.date = a[0], n = a[1], Ce.timeZoneDelimiter.test(e.date) && (e.date = t2.split(Ce.timeZoneDelimiter)[0], n = t2.substr(
    e.date.length,
    t2.length
  ))), n) {
    const r = Ce.timezone.exec(n);
    r ? (e.time = n.replace(r[1], ""), e.timezone = r[1]) : e.time = n;
  }
  return e;
}
function bn(t2, e) {
  const a = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + e) + "})|(\\d{2}|[+-]\\d{" + (2 + e) + "})$)"
  ), n = t2.match(a);
  if (!n) return { year: NaN, restDateString: "" };
  const r = n[1] ? parseInt(n[1]) : null, o = n[2] ? parseInt(n[2]) : null;
  return {
    year: o === null ? r : o * 100,
    restDateString: t2.slice((n[1] || n[2]).length)
  };
}
function wn(t2, e) {
  if (e === null) return /* @__PURE__ */ new Date(NaN);
  const a = t2.match(gn);
  if (!a) return /* @__PURE__ */ new Date(NaN);
  const n = !!a[4], r = we(a[1]), o = we(a[2]) - 1, d = we(a[3]), c = we(a[4]), x = we(a[5]) - 1;
  if (n)
    return Ln(e, c, x) ? _n(e, c, x) : /* @__PURE__ */ new Date(NaN);
  {
    const D = /* @__PURE__ */ new Date(0);
    return !Cn(e, o, d) || !Tn(e, r) ? /* @__PURE__ */ new Date(NaN) : (D.setUTCFullYear(e, o, Math.max(r, d)), D);
  }
}
function we(t2) {
  return t2 ? parseInt(t2) : 1;
}
function xn(t2) {
  const e = t2.match(vn);
  if (!e) return NaN;
  const a = Be(e[1]), n = Be(e[2]), r = Be(e[3]);
  return $n(a, n, r) ? a * mt + n * ut + r * 1e3 : NaN;
}
function Be(t2) {
  return t2 && parseFloat(t2.replace(",", ".")) || 0;
}
function kn(t2) {
  if (t2 === "Z") return 0;
  const e = t2.match(yn);
  if (!e) return 0;
  const a = e[1] === "+" ? -1 : 1, n = parseInt(e[2]), r = e[3] && parseInt(e[3]) || 0;
  return Sn(n, r) ? a * (n * mt + r * ut) : NaN;
}
function _n(t2, e, a) {
  const n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(t2, 0, 4);
  const r = n.getUTCDay() || 7, o = (e - 1) * 7 + a + 1 - r;
  return n.setUTCDate(n.getUTCDate() + o), n;
}
var Dn = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function yt(t2) {
  return t2 % 400 === 0 || t2 % 4 === 0 && t2 % 100 !== 0;
}
function Cn(t2, e, a) {
  return e >= 0 && e <= 11 && a >= 1 && a <= (Dn[e] || (yt(t2) ? 29 : 28));
}
function Tn(t2, e) {
  return e >= 1 && e <= (yt(t2) ? 366 : 365);
}
function Ln(t2, e, a) {
  return e >= 1 && e <= 53 && a >= 0 && a <= 6;
}
function $n(t2, e, a) {
  return t2 === 24 ? e === 0 && a === 0 : a >= 0 && a < 60 && e >= 0 && e < 60 && t2 >= 0 && t2 < 25;
}
function Sn(t2, e) {
  return e >= 0 && e <= 59;
}
function ke(t2, e = {}) {
  const { format: a = "long" } = e;
  if (!t2) return "";
  let n;
  if (typeof t2 == "string")
    if (t2.includes("T") || t2.includes("Z"))
      n = fn(t2);
    else if (/^\d{4}-\d{2}-\d{2}$/.test(t2)) {
      const [r, o, d] = t2.split("-").map(Number);
      n = new Date(r, o - 1, d);
    } else
      n = new Date(t2);
  else
    n = t2;
  if (!ft(n))
    return typeof t2 == "string" ? t2 : "";
  switch (a) {
    case "iso":
      return be(n, "yyyy-MM-dd");
    case "long":
      return be(n, "MMMM d, yyyy");
    case "short":
      return be(n, "MMM d, yyyy");
    default:
      try {
        return be(n, a);
      } catch {
        return console.warn(`Invalid date format: ${a}, falling back to long format`), be(n, "MMMM d, yyyy");
      }
  }
}
function _e(t2, e, a = "v3.0.0") {
  console.warn(
    ` DEPRECATION WARNING: ${t2} will be removed in ${a}
   Please migrate to the VPV-prefixed version: ${e}
   See migration guide: https://vitepress-valence.cynber.dev`
  );
}
var En = { class: "container-header" };
var In = { class: "title-content" };
var Pn = ["innerHTML"];
var On = defineComponent({
  __name: "ContainerHeader",
  props: {
    headerTitle: {},
    headerSubtitle: {},
    headerDate: {},
    headerDateFormat: { default: "long" },
    headerDatePrefix: {},
    headerLink: {},
    headerTitleLines: { default: 2 },
    headerSubtitleLines: { default: 1 }
  },
  setup(t2) {
    const e = t2, a = computed(() => {
      if (!e.headerDate) return "";
      const n = ke(e.headerDate, { format: e.headerDateFormat });
      return e.headerDatePrefix && n ? `${e.headerDatePrefix} ${n}` : n;
    });
    return (n, r) => (openBlock(), createElementBlock("div", En, [
      createBaseVNode("div", In, [
        (openBlock(), createBlock(resolveDynamicComponent(t2.headerLink ? "a" : "span"), {
          class: "header-title",
          href: t2.headerLink || void 0,
          style: normalizeStyle({ "--line-clamp-header-title": t2.headerTitleLines || 2 })
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(t2.headerTitle), 1)
          ]),
          _: 1
        }, 8, ["href", "style"])),
        t2.headerSubtitle ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "header-subtitle",
          style: normalizeStyle({ "--line-clamp-header-subtitle": t2.headerSubtitleLines || 1 })
        }, toDisplayString(t2.headerSubtitle), 5)) : createCommentVNode("", true),
        a.value ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "header-date",
          innerHTML: a.value
        }, null, 8, Pn)) : createCommentVNode("", true)
      ])
    ]));
  }
});
var pt = B(On, [["__scopeId", "data-v-248d0a9a"]]);
var Mn = { class: "vpv-cards-container horizontal-container" };
var zn = { class: "container-content" };
var An = defineComponent({
  __name: "HorizontalContainer",
  props: {
    headerTitle: {},
    headerSubtitle: {},
    headerDate: {},
    headerDateFormat: {},
    headerDatePrefix: {},
    headerLink: {},
    headerTitleLines: {},
    headerSubtitleLines: {}
  },
  setup(t2) {
    return (e, a) => (openBlock(), createElementBlock("div", Mn, [
      t2.headerTitle ? (openBlock(), createBlock(pt, {
        key: 0,
        "header-title": t2.headerTitle,
        "header-subtitle": t2.headerSubtitle,
        "header-date": t2.headerDate,
        "header-link": t2.headerLink,
        "header-title-lines": t2.headerTitleLines,
        "header-subtitle-lines": t2.headerSubtitleLines,
        "header-date-format": t2.headerDateFormat,
        "header-date-prefix": t2.headerDatePrefix
      }, null, 8, ["header-title", "header-subtitle", "header-date", "header-link", "header-title-lines", "header-subtitle-lines", "header-date-format", "header-date-prefix"])) : createCommentVNode("", true),
      createBaseVNode("div", zn, [
        renderSlot(e.$slots, "default", {}, void 0, true)
      ])
    ]));
  }
});
var Ee = B(An, [["__scopeId", "data-v-4c5919dc"]]);
var Bn = { class: "vpv-cards-container vertical-container" };
var Hn = { class: "container-content" };
var Fn = defineComponent({
  __name: "VerticalContainer",
  props: {
    headerTitle: {},
    headerSubtitle: {},
    headerDate: {},
    headerLink: {},
    headerDatePrefix: {},
    headerTitleLines: {},
    headerSubtitleLines: {},
    headerDateFormat: {}
  },
  setup(t2) {
    return (e, a) => (openBlock(), createElementBlock("div", Bn, [
      t2.headerTitle ? (openBlock(), createBlock(pt, {
        key: 0,
        "header-title": t2.headerTitle,
        "header-subtitle": t2.headerSubtitle,
        "header-date": t2.headerDate,
        "header-link": t2.headerLink,
        "header-title-lines": t2.headerTitleLines,
        "header-subtitle-lines": t2.headerSubtitleLines,
        "header-date-format": t2.headerDateFormat,
        "header-date-prefix": t2.headerDatePrefix,
        class: "container-header-full-width"
      }, null, 8, ["header-title", "header-subtitle", "header-date", "header-link", "header-title-lines", "header-subtitle-lines", "header-date-format", "header-date-prefix"])) : createCommentVNode("", true),
      createBaseVNode("div", Hn, [
        renderSlot(e.$slots, "default", {}, void 0, true)
      ])
    ]));
  }
});
var de = B(Fn, [["__scopeId", "data-v-16cf1529"]]);
var me = Object.assign || function(t2) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e];
    for (var n in a)
      Object.prototype.hasOwnProperty.call(a, n) && (t2[n] = a[n]);
  }
  return t2;
};
var Te = function(e) {
  return e.tagName === "IMG";
};
var Nn = function(e) {
  return NodeList.prototype.isPrototypeOf(e);
};
var Le = function(e) {
  return e && e.nodeType === 1;
};
var Ze = function(e) {
  var a = e.currentSrc || e.src;
  return a.substr(-4).toLowerCase() === ".svg";
};
var Ke = function(e) {
  try {
    return Array.isArray(e) ? e.filter(Te) : Nn(e) ? [].slice.call(e).filter(Te) : Le(e) ? [e].filter(Te) : typeof e == "string" ? [].slice.call(document.querySelectorAll(e)).filter(Te) : [];
  } catch {
    throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`);
  }
};
var Vn = function(e) {
  var a = document.createElement("div");
  return a.classList.add("medium-zoom-overlay"), a.style.background = e, a;
};
var Wn = function(e) {
  var a = e.getBoundingClientRect(), n = a.top, r = a.left, o = a.width, d = a.height, c = e.cloneNode(), x = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, D = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  return c.removeAttribute("id"), c.style.position = "absolute", c.style.top = n + x + "px", c.style.left = r + D + "px", c.style.width = o + "px", c.style.height = d + "px", c.style.transform = "", c;
};
var fe = function(e, a) {
  var n = me({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, a);
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e, n);
  var r = document.createEvent("CustomEvent");
  return r.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), r;
};
var Rn = function t(e) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = window.Promise || function(_) {
    function b() {
    }
    _(b, b);
  }, r = function(_) {
    var b = _.target;
    if (b === ce) {
      p();
      return;
    }
    k.indexOf(b) !== -1 && P({ target: b });
  }, o = function() {
    if (!(G || !m.original)) {
      var _ = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      Math.abs(ne - _) > O.scrollOffset && setTimeout(p, 150);
    }
  }, d = function(_) {
    var b = _.key || _.keyCode;
    (b === "Escape" || b === "Esc" || b === 27) && p();
  }, c = function() {
    var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = _;
    if (_.background && (ce.style.background = _.background), _.container && _.container instanceof Object && (b.container = me({}, O.container, _.container)), _.template) {
      var M = Le(_.template) ? _.template : document.querySelector(_.template);
      b.template = M;
    }
    return O = me({}, O, b), k.forEach(function(I) {
      I.dispatchEvent(fe("medium-zoom:update", {
        detail: { zoom: N }
      }));
    }), N;
  }, x = function() {
    var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return t(me({}, O, _));
  }, D = function() {
    for (var _ = arguments.length, b = Array(_), M = 0; M < _; M++)
      b[M] = arguments[M];
    var I = b.reduce(function($, F) {
      return [].concat($, Ke(F));
    }, []);
    return I.filter(function($) {
      return k.indexOf($) === -1;
    }).forEach(function($) {
      k.push($), $.classList.add("medium-zoom-image");
    }), E.forEach(function($) {
      var F = $.type, Y = $.listener, re = $.options;
      I.forEach(function(X) {
        X.addEventListener(F, Y, re);
      });
    }), N;
  }, y = function() {
    for (var _ = arguments.length, b = Array(_), M = 0; M < _; M++)
      b[M] = arguments[M];
    m.zoomed && p();
    var I = b.length > 0 ? b.reduce(function($, F) {
      return [].concat($, Ke(F));
    }, []) : k;
    return I.forEach(function($) {
      $.classList.remove("medium-zoom-image"), $.dispatchEvent(fe("medium-zoom:detach", {
        detail: { zoom: N }
      }));
    }), k = k.filter(function($) {
      return I.indexOf($) === -1;
    }), N;
  }, f = function(_, b) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return k.forEach(function(I) {
      I.addEventListener("medium-zoom:" + _, b, M);
    }), E.push({ type: "medium-zoom:" + _, listener: b, options: M }), N;
  }, u = function(_, b) {
    var M = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return k.forEach(function(I) {
      I.removeEventListener("medium-zoom:" + _, b, M);
    }), E = E.filter(function(I) {
      return !(I.type === "medium-zoom:" + _ && I.listener.toString() === b.toString());
    }), N;
  }, L = function() {
    var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = _.target, M = function() {
      var $ = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }, F = void 0, Y = void 0;
      if (O.container)
        if (O.container instanceof Object)
          $ = me({}, $, O.container), F = $.width - $.left - $.right - O.margin * 2, Y = $.height - $.top - $.bottom - O.margin * 2;
        else {
          var re = Le(O.container) ? O.container : document.querySelector(O.container), X = re.getBoundingClientRect(), Pe = X.width, wt = X.height, xt = X.left, kt = X.top;
          $ = me({}, $, {
            width: Pe,
            height: wt,
            left: xt,
            top: kt
          });
        }
      F = F || $.width - O.margin * 2, Y = Y || $.height - O.margin * 2;
      var ve = m.zoomedHd || m.original, _t = Ze(ve) ? F : ve.naturalWidth || F, Dt = Ze(ve) ? Y : ve.naturalHeight || Y, De = ve.getBoundingClientRect(), Ct = De.top, Tt = De.left, Oe = De.width, Me = De.height, Lt = Math.min(Math.max(Oe, _t), F) / Oe, $t = Math.min(Math.max(Me, Dt), Y) / Me, ze = Math.min(Lt, $t), St = (-Tt + (F - Oe) / 2 + O.margin + $.left) / ze, Et = (-Ct + (Y - Me) / 2 + O.margin + $.top) / ze, We = "scale(" + ze + ") translate3d(" + St + "px, " + Et + "px, 0)";
      m.zoomed.style.transform = We, m.zoomedHd && (m.zoomedHd.style.transform = We);
    };
    return new n(function(I) {
      if (b && k.indexOf(b) === -1) {
        I(N);
        return;
      }
      var $ = function Pe() {
        G = false, m.zoomed.removeEventListener("transitionend", Pe), m.original.dispatchEvent(fe("medium-zoom:opened", {
          detail: { zoom: N }
        })), I(N);
      };
      if (m.zoomed) {
        I(N);
        return;
      }
      if (b)
        m.original = b;
      else if (k.length > 0) {
        var F = k;
        m.original = F[0];
      } else {
        I(N);
        return;
      }
      if (m.original.dispatchEvent(fe("medium-zoom:open", {
        detail: { zoom: N }
      })), ne = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, G = true, m.zoomed = Wn(m.original), document.body.appendChild(ce), O.template) {
        var Y = Le(O.template) ? O.template : document.querySelector(O.template);
        m.template = document.createElement("div"), m.template.appendChild(Y.content.cloneNode(true)), document.body.appendChild(m.template);
      }
      if (m.original.parentElement && m.original.parentElement.tagName === "PICTURE" && m.original.currentSrc && (m.zoomed.src = m.original.currentSrc), document.body.appendChild(m.zoomed), window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      }), m.original.classList.add("medium-zoom-image--hidden"), m.zoomed.classList.add("medium-zoom-image--opened"), m.zoomed.addEventListener("click", p), m.zoomed.addEventListener("transitionend", $), m.original.getAttribute("data-zoom-src")) {
        m.zoomedHd = m.zoomed.cloneNode(), m.zoomedHd.removeAttribute("srcset"), m.zoomedHd.removeAttribute("sizes"), m.zoomedHd.removeAttribute("loading"), m.zoomedHd.src = m.zoomed.getAttribute("data-zoom-src"), m.zoomedHd.onerror = function() {
          clearInterval(re), console.warn("Unable to reach the zoom image target " + m.zoomedHd.src), m.zoomedHd = null, M();
        };
        var re = setInterval(function() {
          m.zoomedHd.complete && (clearInterval(re), m.zoomedHd.classList.add("medium-zoom-image--opened"), m.zoomedHd.addEventListener("click", p), document.body.appendChild(m.zoomedHd), M());
        }, 10);
      } else if (m.original.hasAttribute("srcset")) {
        m.zoomedHd = m.zoomed.cloneNode(), m.zoomedHd.removeAttribute("sizes"), m.zoomedHd.removeAttribute("loading");
        var X = m.zoomedHd.addEventListener("load", function() {
          m.zoomedHd.removeEventListener("load", X), m.zoomedHd.classList.add("medium-zoom-image--opened"), m.zoomedHd.addEventListener("click", p), document.body.appendChild(m.zoomedHd), M();
        });
      } else
        M();
    });
  }, p = function() {
    return new n(function(_) {
      if (G || !m.original) {
        _(N);
        return;
      }
      var b = function M() {
        m.original.classList.remove("medium-zoom-image--hidden"), document.body.removeChild(m.zoomed), m.zoomedHd && document.body.removeChild(m.zoomedHd), document.body.removeChild(ce), m.zoomed.classList.remove("medium-zoom-image--opened"), m.template && document.body.removeChild(m.template), G = false, m.zoomed.removeEventListener("transitionend", M), m.original.dispatchEvent(fe("medium-zoom:closed", {
          detail: { zoom: N }
        })), m.original = null, m.zoomed = null, m.zoomedHd = null, m.template = null, _(N);
      };
      G = true, document.body.classList.remove("medium-zoom--opened"), m.zoomed.style.transform = "", m.zoomedHd && (m.zoomedHd.style.transform = ""), m.template && (m.template.style.transition = "opacity 150ms", m.template.style.opacity = 0), m.original.dispatchEvent(fe("medium-zoom:close", {
        detail: { zoom: N }
      })), m.zoomed.addEventListener("transitionend", b);
    });
  }, P = function() {
    var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, b = _.target;
    return m.original ? p() : L({ target: b });
  }, h2 = function() {
    return O;
  }, S = function() {
    return k;
  }, T = function() {
    return m.original;
  }, k = [], E = [], G = false, ne = 0, O = a, m = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
    // If the selector is omitted, it's replaced by the options
  };
  Object.prototype.toString.call(e) === "[object Object]" ? O = e : (e || typeof e == "string") && D(e), O = me({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, O);
  var ce = Vn(O.background);
  document.addEventListener("click", r), document.addEventListener("keyup", d), document.addEventListener("scroll", o), window.addEventListener("resize", p);
  var N = {
    open: L,
    close: p,
    toggle: P,
    update: c,
    clone: x,
    attach: D,
    detach: y,
    on: f,
    off: u,
    getOptions: h2,
    getImages: S,
    getZoomedImage: T
  };
  return N;
};
function Un(t2, e) {
  e === void 0 && (e = {});
  var a = e.insertAt;
  if (!(typeof document > "u")) {
    var n = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
    r.type = "text/css", a === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = t2 : r.appendChild(document.createTextNode(t2));
  }
}
var Yn = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
Un(Yn);
var qn = ["src", "alt"];
var jn = ["src", "alt"];
var Gn = ["src", "alt"];
var Xn = {
  key: 3,
  class: "vpv-image-description"
};
var Qn = defineComponent({
  __name: "VPVImage",
  props: {
    imageConfig: {},
    hideDescription: { type: Boolean, default: false },
    defaultAlt: { default: "Image" },
    defaultDescription: { default: "" },
    enableZoom: { type: Boolean, default: false },
    zoomMargin: { default: 24 },
    zoomBackground: { default: "rgba(0, 0, 0, 0.9)" },
    width: { default: "100%" },
    height: { default: "auto" },
    aspectRatio: { default: "auto" },
    enableRadius: { type: Boolean, default: true },
    enableBorder: { type: Boolean, default: false },
    float: { default: "none" },
    maxWidth: { default: "100%" }
  },
  setup(t2) {
    const { isDark: e } = Ve(), a = t2, n = ref(), r = ref(), o = ref();
    let d = null;
    const c = computed(() => {
      var _a2, _b;
      return ((_a2 = a.imageConfig) == null ? void 0 : _a2.image) || ((_b = a.imageConfig) == null ? void 0 : _b.image_dark);
    }), x = computed(() => {
      var _a2;
      return ((_a2 = a.imageConfig) == null ? void 0 : _a2.alt) || a.defaultAlt;
    }), D = computed(() => {
      var _a2, _b, _c;
      return e.value ? ((_a2 = a.imageConfig) == null ? void 0 : _a2.alt_dark) || ((_b = a.imageConfig) == null ? void 0 : _b.alt) || a.defaultAlt : ((_c = a.imageConfig) == null ? void 0 : _c.alt) || a.defaultAlt;
    }), y = computed(() => {
      var _a2, _b;
      return e.value && ((_a2 = a.imageConfig) == null ? void 0 : _a2.description_dark) ? a.imageConfig.description_dark : ((_b = a.imageConfig) == null ? void 0 : _b.description) || a.defaultDescription;
    }), f = computed(() => ({
      "vpv-float-left": a.float === "left",
      "vpv-float-right": a.float === "right"
    })), u = computed(() => ({
      zoomable: a.enableZoom,
      "vpv-image-bordered": a.enableBorder,
      "vpv-image-rounded": a.enableRadius
    })), L = computed(() => ({
      width: a.width,
      maxWidth: a.maxWidth
    })), p = computed(() => ({
      width: "100%",
      height: a.height,
      aspectRatio: a.aspectRatio !== "auto" ? a.aspectRatio : void 0
    })), P = async () => {
      if (!a.enableZoom) return;
      await nextTick();
      const S = [];
      n.value && S.push(n.value), r.value && S.push(r.value), o.value && S.push(o.value), S.length > 0 && (d = Rn(S, {
        margin: a.zoomMargin,
        background: a.zoomBackground
      }), d.on("open", () => {
        setTimeout(() => {
          const T = document.querySelector(".medium-zoom-overlay");
          if (T && !T.querySelector(".zoom-caption") && y.value) {
            const k = document.createElement("div");
            k.className = "zoom-caption", k.textContent = y.value, k.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 16px;
            text-align: center;
            padding: 8px 16px;
            border-radius: 4px;
            max-width: 80%;
            word-wrap: break-word;
          `, T.appendChild(k);
          }
        }, 50);
      }), d.on("close", () => {
        const T = document.querySelector(".zoom-caption");
        T && T.remove();
      }));
    }, h2 = () => {
      d && (d.detach(), d = null);
    };
    return onMounted(() => {
      P();
    }), onUnmounted(() => {
      h2();
    }), (S, T) => {
      var _a2, _b, _c;
      return c.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["vpv-image-container", f.value]),
        style: normalizeStyle(L.value)
      }, [
        ((_a2 = t2.imageConfig) == null ? void 0 : _a2.image) ? (openBlock(), createElementBlock("img", {
          key: 0,
          ref_key: "lightImageRef",
          ref: n,
          src: t2.imageConfig.image,
          alt: x.value,
          class: normalizeClass(["vpv-image vpv-light-only", u.value]),
          style: normalizeStyle(p.value)
        }, null, 14, qn)) : createCommentVNode("", true),
        ((_b = t2.imageConfig) == null ? void 0 : _b.image_dark) ? (openBlock(), createElementBlock("img", {
          key: 1,
          ref_key: "darkImageRef",
          ref: r,
          src: t2.imageConfig.image_dark,
          alt: D.value,
          class: normalizeClass(["vpv-image vpv-dark-only", u.value]),
          style: normalizeStyle(p.value)
        }, null, 14, jn)) : ((_c = t2.imageConfig) == null ? void 0 : _c.image) ? (openBlock(), createElementBlock("img", {
          key: 2,
          ref_key: "fallbackImageRef",
          ref: o,
          src: t2.imageConfig.image,
          alt: x.value,
          class: normalizeClass(["vpv-image vpv-dark-only", u.value]),
          style: normalizeStyle(p.value)
        }, null, 14, Gn)) : createCommentVNode("", true),
        !t2.hideDescription && y.value ? (openBlock(), createElementBlock("p", Xn, toDisplayString(y.value), 1)) : createCommentVNode("", true)
      ], 6)) : createCommentVNode("", true);
    };
  }
});
var bt = B(Qn, [["__scopeId", "data-v-0f178b10"]]);
var Jn = ["href"];
var Zn = {
  key: 0,
  class: "article-title"
};
var Kn = {
  key: 1,
  class: "article-subtitle"
};
var er = { class: "article-info" };
var tr = { class: "info-cards" };
var ar = ["href"];
var nr = { class: "author-section" };
var rr = ["src"];
var or = { class: "author-name" };
var ir = { class: "author-description" };
var sr = {
  key: 1,
  class: "meta-data-card"
};
var lr = { class: "meta-data" };
var dr = { key: 0 };
var cr = { key: 1 };
var ur = {
  key: 0,
  class: "pills-container"
};
var mr = { class: "pills-content" };
var hr = {
  key: 0,
  class: "pill category-pill"
};
var fr = defineComponent({
  __name: "VPVArticleHeader",
  props: {
    returnLink: {},
    returnText: {},
    hideTitle: { type: Boolean },
    hideSubtitle: { type: Boolean },
    hideDate: { type: Boolean },
    hideReadingTime: { type: Boolean },
    hideAuthor: { type: Boolean },
    hideCategory: { type: Boolean },
    hideTags: { type: Boolean },
    hideFeatImage: { type: Boolean },
    hideFeatImageDescription: { type: Boolean },
    authorsDataKey: {},
    dateFormat: {},
    featImageWidth: { default: "100%" },
    featImageHeight: { default: "auto" },
    featImageAspectRatio: { default: "16 / 9" },
    featImageMaxWidth: { default: "800px" },
    enableFeatImageZoom: { type: Boolean, default: false }
  },
  setup(t2) {
    const { page: e } = Ve(), a = t2, n = e.value.frontmatter, r = a.authorsDataKey || "authors", o = inject(r) || {}, d = ref(o[n.author || ""] || { name: "" }), c = ref(
      a.returnLink || n.returnLinkValue || "/"
    ), x = ref(
      "← " + (a.returnText || n.returnTextValue || "Back Home")
    ), D = computed(() => {
      if (n.reading_time) {
        const f = n.reading_time;
        return f === 1 ? "1 minute" : `${f} minutes`;
      }
      return null;
    }), y = computed(() => {
      const f = !a.hideDate && n.date, u = !a.hideReadingTime && D.value;
      return !!(f || u);
    });
    return (f, u) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("a", {
        class: "return-text",
        href: c.value
      }, toDisplayString(x.value), 9, Jn),
      createBaseVNode("header", null, [
        a.hideTitle ? createCommentVNode("", true) : (openBlock(), createElementBlock("h1", Zn, toDisplayString(unref(n).title), 1)),
        a.hideSubtitle ? createCommentVNode("", true) : (openBlock(), createElementBlock("p", Kn, toDisplayString(unref(n).subtitle), 1)),
        a.hideFeatImage ? createCommentVNode("", true) : (openBlock(), createBlock(bt, {
          key: 2,
          imageConfig: unref(n).featured_image,
          hideDescription: a.hideFeatImageDescription,
          defaultAlt: "Featured Image",
          enableBorder: true,
          float: "none",
          width: a.featImageWidth,
          height: a.featImageHeight,
          aspectRatio: a.featImageAspectRatio,
          maxWidth: a.featImageMaxWidth,
          enableZoom: a.enableFeatImageZoom
        }, null, 8, ["imageConfig", "hideDescription", "width", "height", "aspectRatio", "maxWidth", "enableZoom"])),
        createBaseVNode("div", er, [
          createBaseVNode("div", tr, [
            !a.hideAuthor && d.value.name ? (openBlock(), createElementBlock("a", {
              key: 0,
              class: "author-section-link",
              href: d.value.url
            }, [
              createBaseVNode("div", nr, [
                d.value.avatar ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: d.value.avatar,
                  alt: "Author's Avatar",
                  class: "author-avatar"
                }, null, 8, rr)) : createCommentVNode("", true),
                createBaseVNode("div", {
                  class: normalizeClass(["author-details", { "no-avatar": !d.value.avatar }])
                }, [
                  createBaseVNode("span", or, toDisplayString(d.value.name), 1),
                  createBaseVNode("p", ir, toDisplayString(d.value.description), 1)
                ], 2)
              ])
            ], 8, ar)) : createCommentVNode("", true),
            y.value ? (openBlock(), createElementBlock("div", sr, [
              createBaseVNode("div", lr, [
                !a.hideDate && unref(n).date ? (openBlock(), createElementBlock("p", dr, [
                  u[0] || (u[0] = createBaseVNode("strong", null, "Date:", -1)),
                  createTextVNode(" " + toDisplayString(unref(ke)(unref(n).date, { format: a.dateFormat || "long" })), 1)
                ])) : createCommentVNode("", true),
                !a.hideReadingTime && D.value ? (openBlock(), createElementBlock("p", cr, [
                  u[1] || (u[1] = createBaseVNode("strong", null, "Reading Time:", -1)),
                  createTextVNode(" " + toDisplayString(D.value), 1)
                ])) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true)
          ]),
          !a.hideCategory && unref(n).category || !a.hideTags && unref(n).tags && unref(n).tags.length > 0 ? (openBlock(), createElementBlock("div", ur, [
            createBaseVNode("div", mr, [
              !a.hideCategory && unref(n).category ? (openBlock(), createElementBlock("span", hr, toDisplayString(unref(n).category), 1)) : createCommentVNode("", true),
              a.hideTags ? createCommentVNode("", true) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(n).tags, (L) => (openBlock(), createElementBlock("span", {
                key: L,
                class: "pill"
              }, toDisplayString(L), 1))), 128))
            ])
          ])) : createCommentVNode("", true)
        ])
      ])
    ], 64));
  }
});
var gr = B(fr, [["__scopeId", "data-v-eaa0924d"]]);
var vr = { class: "article-list-container" };
var yr = { key: 0 };
var pr = defineComponent({
  __name: "VPVArticleList",
  props: {
    articles: {},
    articlesDataKey: {},
    postsDataKey: {},
    authorsDataKey: {},
    format: {},
    hideAuthor: { type: Boolean },
    hideDate: { type: Boolean },
    dateFormat: {},
    hideImage: { type: Boolean },
    hideCategory: { type: Boolean },
    hideTags: { type: Boolean },
    hideDomain: { type: Boolean },
    disableLinks: { type: Boolean },
    titleLines: {},
    excerptLines: {},
    maxCards: {},
    sortOrder: {},
    filterAuthors: {},
    excludeAuthors: {},
    filterCategories: {},
    excludeCategories: {},
    filterTags: {},
    excludeTags: {},
    excludeURLs: {},
    featuredOnly: { type: Boolean },
    renderDrafts: { type: Boolean },
    startDate: {},
    endDate: {}
  },
  setup(t2) {
    const e = t2, a = e.articlesDataKey || e.postsDataKey || "postsData", n = inject(a, []), r = inject(e.authorsDataKey || "authors", {}), o = computed(() => e.articles || n), d = computed(() => {
      switch (e.format) {
        case "horizontal":
          return $e;
        case "vertical":
          return ge;
        default:
          return ge;
      }
    }), c = computed(() => {
      switch (e.format) {
        case "horizontal":
          return Ee;
        case "vertical":
          return de;
        default:
          return de;
      }
    }), x = computed(() => {
      let p = o.value.filter((P) => {
        var _a2, _b, _c, _d, _e2, _f;
        const h2 = P.frontmatter;
        if ((_a2 = e.excludeURLs) == null ? void 0 : _a2.length) {
          const S = P.url.replace(/\.html$/, "");
          if (e.excludeURLs.some((k) => k.replace(/\.html$/, "") === S)) return false;
        }
        if (!e.renderDrafts && h2.status === "draft" || e.featuredOnly && !h2.featured || e.filterAuthors && !(Array.isArray(e.filterAuthors) ? e.filterAuthors : [e.filterAuthors]).includes(h2.author || "") || ((_b = e.excludeAuthors) == null ? void 0 : _b.length) && e.excludeAuthors.includes(h2.author || "") || ((_c = e.filterCategories) == null ? void 0 : _c.length) && !e.filterCategories.includes(h2.category || "") || ((_d = e.excludeCategories) == null ? void 0 : _d.length) && e.excludeCategories.includes(h2.category || "")) return false;
        if ((_e2 = e.filterTags) == null ? void 0 : _e2.length) {
          const S = h2.tags || [];
          if (!e.filterTags.some((k) => S.includes(k))) return false;
        }
        if ((_f = e.excludeTags) == null ? void 0 : _f.length) {
          const S = h2.tags || [];
          if (e.excludeTags.some((k) => S.includes(k))) return false;
        }
        if (e.startDate || e.endDate) {
          const S = new Date(h2.date);
          if (e.startDate && S < new Date(e.startDate) || e.endDate && S > new Date(e.endDate)) return false;
        }
        return true;
      });
      return e.sortOrder === "ascending" ? p.sort((P, h2) => new Date(P.frontmatter.date).getTime() - new Date(h2.frontmatter.date).getTime()) : p.sort((P, h2) => new Date(h2.frontmatter.date).getTime() - new Date(P.frontmatter.date).getTime()), e.maxCards && (p = p.slice(0, e.maxCards)), p;
    });
    function D(p) {
      var _a2;
      return p ? ((_a2 = r[p]) == null ? void 0 : _a2.name) || p : "";
    }
    function y(p) {
      return p.frontmatter.summary || p.frontmatter.excerpt || "";
    }
    function f(p) {
      var _a2;
      return ((_a2 = p.frontmatter.featured_image) == null ? void 0 : _a2.image) ? p.frontmatter.featured_image.image : p.frontmatter.banner;
    }
    function u(p) {
      var _a2;
      return (_a2 = p.frontmatter.featured_image) == null ? void 0 : _a2.image_dark;
    }
    function L(p) {
      return {
        title: p.frontmatter.title,
        excerpt: y(p),
        url: p.url,
        hideDomain: e.hideDomain,
        isExternal: false,
        author: D(p.frontmatter.author || ""),
        date: ke(p.frontmatter.date, { format: e.dateFormat || "long" }),
        image: f(p),
        image_dark: u(p),
        category: p.frontmatter.category,
        tags: p.frontmatter.tags || [],
        hideAuthor: e.hideAuthor,
        hideDate: e.hideDate,
        hideImage: e.hideImage,
        hideCategory: e.hideCategory,
        hideTags: e.hideTags,
        disableLinks: e.disableLinks,
        titleLines: e.titleLines,
        excerptLines: e.excerptLines
      };
    }
    return (p, P) => (openBlock(), createElementBlock("div", vr, [
      t2.format === "debug" ? (openBlock(), createElementBlock("div", yr, [
        createBaseVNode("pre", null, toDisplayString(JSON.stringify(x.value, null, 2)), 1)
      ])) : createCommentVNode("", true),
      (openBlock(), createBlock(resolveDynamicComponent(c.value), null, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (h2) => (openBlock(), createBlock(resolveDynamicComponent(d.value), mergeProps({
            key: h2.url
          }, { ref_for: true }, L(h2)), null, 16))), 128))
        ]),
        _: 1
      }))
    ]));
  }
});
var br = B(pr, [["__scopeId", "data-v-f0fc3f31"]]);
var wr = { class: "boolean-cell" };
var xr = ["title"];
var kr = {
  key: 1,
  class: "text-container"
};
var _r = {
  key: 2,
  class: "default-container"
};
var Dr = "ic:twotone-check-box";
var Cr = "material-symbols:close-rounded";
var Tr = "True";
var Lr = "False";
var $r = defineComponent({
  __name: "BooleanCell",
  props: {
    value: { type: Boolean },
    trueColor: {},
    falseColor: {},
    displayAs: {},
    trueIcon: {},
    falseIcon: {},
    trueText: {},
    falseText: {},
    iconWidth: {},
    iconHeight: {},
    trueHoverText: {},
    falseHoverText: {}
  },
  setup(t2) {
    const e = t2, a = e.trueIcon || Dr, n = e.falseIcon || Cr, r = e.trueText || Tr, o = e.falseText || Lr, d = e.trueColor || "var(--vp-c-green-3)", c = e.falseColor || "var(--vp-c-red-3)", x = e.iconWidth || "1.5em", D = e.iconHeight || "1.5em", y = e.displayAs || "icon", f = e.trueHoverText || void 0, u = e.falseHoverText || void 0;
    return (L, p) => (openBlock(), createElementBlock("div", wr, [
      unref(y) === "icon" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "icon-container",
        title: t2.value ? unref(f) : unref(u)
      }, [
        createVNode(unref(Icon), {
          icon: t2.value ? unref(a) : unref(n),
          style: normalizeStyle({
            color: t2.value ? unref(d) : unref(c),
            width: unref(x),
            height: unref(D)
          }),
          class: "icon"
        }, null, 8, ["icon", "style"])
      ], 8, xr)) : unref(y) === "text" ? (openBlock(), createElementBlock("div", kr, [
        createBaseVNode("span", {
          style: normalizeStyle({ color: t2.value ? unref(d) : unref(c) })
        }, toDisplayString(t2.value ? unref(r) : unref(o)), 5)
      ])) : (openBlock(), createElementBlock("div", _r, [
        createBaseVNode("span", null, toDisplayString(t2.value), 1)
      ]))
    ]));
  }
});
var Sr = B($r, [["__scopeId", "data-v-936b45f5"]]);
var Er = { class: "code-cell" };
var Ir = { class: "code-block" };
var Pr = defineComponent({
  __name: "CodeCell",
  props: {
    value: {}
  },
  setup(t2) {
    const e = t2, a = computed(() => e.value === null || e.value === void 0 ? "" : String(e.value));
    return (n, r) => (openBlock(), createElementBlock("div", Er, [
      createBaseVNode("pre", Ir, [
        createBaseVNode("code", null, toDisplayString(a.value), 1)
      ])
    ]));
  }
});
var Or = B(Pr, [["__scopeId", "data-v-1176603e"]]);
var Mr = { class: "icon-cell" };
var zr = ["title"];
var Ar = { key: 1 };
var Br = defineComponent({
  __name: "IconCell",
  props: {
    value: {},
    iconMap: {},
    defaultIcon: {},
    iconColorMap: {},
    defaultIconColor: {},
    width: {},
    height: {},
    hoverTextMap: {},
    defaultHoverText: {}
  },
  setup(t2) {
    const e = t2, a = computed(() => {
      var _a2;
      return ((_a2 = e.iconMap) == null ? void 0 : _a2[e.value]) || e.defaultIcon;
    }), n = computed(
      () => {
        var _a2;
        return ((_a2 = e.iconColorMap) == null ? void 0 : _a2[e.value]) || e.defaultIconColor || "var(--vp-c-brand)";
      }
    ), r = computed(() => e.width || "1.5em"), o = computed(() => e.height || "1.5em"), d = computed(() => {
      var _a2;
      return ((_a2 = e.hoverTextMap) == null ? void 0 : _a2[e.value]) || e.defaultHoverText;
    });
    return (c, x) => (openBlock(), createElementBlock("div", Mr, [
      a.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "icon-container",
        title: d.value
      }, [
        createVNode(unref(Icon), {
          icon: a.value,
          style: normalizeStyle({ color: n.value, width: r.value, height: o.value }),
          class: "icon"
        }, null, 8, ["icon", "style"])
      ], 8, zr)) : (openBlock(), createElementBlock("span", Ar, toDisplayString(t2.value), 1))
    ]));
  }
});
var Hr = B(Br, [["__scopeId", "data-v-dbe24e6d"]]);
var Fr = { class: "image-cell" };
var Nr = ["src", "alt", "width", "height"];
var Vr = {
  key: 1,
  class: "no-image"
};
var Wr = defineComponent({
  __name: "ImageCell",
  props: {
    value: {},
    width: {},
    height: {},
    altText: {}
  },
  setup(t2) {
    const e = t2, a = computed(() => e.width || "50px"), n = computed(() => e.height || "50px"), r = computed(() => e.altText || "Image"), o = (d) => {
      const c = d.target;
      c.style.display = "none";
    };
    return (d, c) => (openBlock(), createElementBlock("div", Fr, [
      t2.value ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: t2.value,
        alt: r.value,
        width: a.value,
        height: n.value,
        onError: o
      }, null, 40, Nr)) : (openBlock(), createElementBlock("span", Vr, "No image"))
    ]));
  }
});
var Rr = B(Wr, [["__scopeId", "data-v-15b2e363"]]);
var Ur = { class: "link-cell" };
var Yr = ["href", "title"];
var qr = ["href", "title"];
var jr = defineComponent({
  __name: "LinkCell",
  props: {
    value: {},
    internalIcon: {},
    externalIcon: {},
    internalText: {},
    externalText: {},
    displayInternalAs: {},
    displayExternalAs: {},
    width: {},
    height: {},
    iconColorMap: {},
    defaultIconColor: {},
    internalHoverText: {},
    externalHoverText: {}
  },
  setup(t2) {
    const e = t2, a = computed(() => {
      var _a2;
      return ((_a2 = e.value) == null ? void 0 : _a2.startsWith("/")) || false;
    }), n = computed(() => !!e.value), r = computed(() => e.value), o = computed(
      () => a.value ? e.internalIcon || "material-symbols:link-rounded" : e.externalIcon || "majesticons:open"
    ), d = computed(
      () => {
        var _a2, _b;
        return a.value ? ((_a2 = e.iconColorMap) == null ? void 0 : _a2.internal) || e.defaultIconColor || "var(--vp-c-brand)" : ((_b = e.iconColorMap) == null ? void 0 : _b.external) || e.defaultIconColor || "var(--vp-c-orange)";
      }
    ), c = computed(
      () => a.value ? e.displayInternalAs || "icon" : e.displayExternalAs || "icon"
    ), x = computed(
      () => a.value ? e.internalText || "Open Page" : e.externalText || "Open Link"
    ), D = computed(
      () => a.value ? e.internalHoverText : e.externalHoverText
    ), y = computed(() => e.width || "1.5em"), f = computed(() => e.height || "1.5em");
    return (u, L) => (openBlock(), createElementBlock("div", Ur, [
      n.value && c.value === "icon" ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: r.value,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "icon-link",
        title: D.value
      }, [
        createVNode(unref(Icon), {
          icon: o.value,
          style: normalizeStyle({ color: d.value, width: y.value, height: f.value }),
          class: "icon"
        }, null, 8, ["icon", "style"])
      ], 8, Yr)) : n.value && c.value === "text" ? (openBlock(), createElementBlock("a", {
        key: 1,
        href: r.value,
        target: "_blank",
        rel: "noopener noreferrer",
        class: "text-link",
        style: normalizeStyle({ color: d.value }),
        title: D.value
      }, toDisplayString(x.value), 13, qr)) : createCommentVNode("", true)
    ]));
  }
});
var Gr = B(jr, [["__scopeId", "data-v-8812d6d7"]]);
var Xr = { class: "number-cell" };
var Qr = {
  key: 0,
  class: "code-format"
};
var Jr = { key: 1 };
var Zr = defineComponent({
  __name: "NumberCell",
  props: {
    value: {},
    decimals: {},
    formatter: { type: Function },
    monospace: { type: Boolean }
  },
  setup(t2) {
    const e = t2, a = computed(() => {
      if (e.formatter && typeof e.formatter == "function")
        return e.formatter(e.value);
      const r = e.value % 1 !== 0 ? e.decimals ?? 2 : 0;
      return e.value.toLocaleString(void 0, {
        minimumFractionDigits: r,
        maximumFractionDigits: r
      });
    });
    return (n, r) => (openBlock(), createElementBlock("div", Xr, [
      t2.monospace ? (openBlock(), createElementBlock("code", Qr, toDisplayString(a.value), 1)) : (openBlock(), createElementBlock("span", Jr, toDisplayString(a.value), 1))
    ]));
  }
});
var Kr = B(Zr, [["__scopeId", "data-v-1e4d727a"]]);
var eo = { class: "vpv-pills-container" };
var to = defineComponent({
  __name: "TagsCell",
  props: {
    value: {},
    tagColors: {},
    style: { default: "card" },
    colorScheme: { default: "brand" }
  },
  setup(t2) {
    const e = t2, a = {
      brand: { border: "var(--vp-c-brand-1)", background: "var(--vp-c-brand-soft)" },
      simple: { border: "var(--vp-c-border)", background: "transparent" },
      gray: { border: "var(--vp-c-gray-1)", background: "var(--vp-c-gray-soft)" },
      indigo: { border: "var(--vp-c-indigo-1)", background: "var(--vp-c-indigo-soft)" },
      purple: { border: "var(--vp-c-purple-1)", background: "var(--vp-c-purple-soft)" },
      green: { border: "var(--vp-c-green-1)", background: "var(--vp-c-green-soft)" },
      yellow: { border: "var(--vp-c-yellow-1)", background: "var(--vp-c-yellow-soft)" },
      red: { border: "var(--vp-c-red-1)", background: "var(--vp-c-red-soft)" }
    }, n = (o) => e.style === "card" ? "vpv-tag-card" : "vpv-pill-header", r = (o) => {
      var _a2;
      const d = (_a2 = e.tagColors) == null ? void 0 : _a2[o];
      if (d) {
        if (a[d]) {
          const x = a[d];
          return {
            borderColor: x.border,
            backgroundColor: x.background,
            color: "var(--vp-c-text-1)"
          };
        }
        return {
          borderColor: d,
          backgroundColor: `color-mix(in srgb, ${d} 14%, transparent)`,
          color: "var(--vp-c-text-1)"
        };
      }
      const c = a[e.colorScheme];
      return {
        borderColor: c.border,
        backgroundColor: c.background,
        color: "var(--vp-c-text-1)"
      };
    };
    return (o, d) => (openBlock(), createElementBlock("div", eo, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(t2.value, (c) => (openBlock(), createElementBlock("span", {
        key: c,
        class: normalizeClass(n()),
        style: normalizeStyle(r(c))
      }, toDisplayString(c), 7))), 128))
    ]));
  }
});
var ao = B(to, [["__scopeId", "data-v-ec9178c8"]]);
var et = defineComponent({
  __name: "TextCell",
  props: {
    value: {}
  },
  setup(t2) {
    return (e, a) => (openBlock(), createElementBlock("span", null, toDisplayString(t2.value), 1));
  }
});
var no = {
  key: 0,
  class: "title"
};
var ro = { class: "table-container" };
var oo = {
  key: 0,
  class: "styled-table"
};
var io = ["onClick"];
var so = { key: 0 };
var lo = { key: 1 };
var co = defineComponent({
  __name: "VPVJSONTable",
  props: {
    jsonPath: {},
    jsonDataProp: {},
    columns: {},
    filters: {},
    title: {},
    sortable: { type: Boolean, default: true },
    defaultSortField: {},
    defaultSortDirection: { default: "ascending" }
  },
  setup(t2) {
    const e = t2, a = ref([]), n = ref(e.defaultSortField || null), r = ref(e.defaultSortDirection === "ascending"), o = ref(e.columns || []), d = ref(e.filters || null), c = e.title;
    function x(h2, S) {
      return S.split(".").reduce(
        (T, k) => T && T[k] !== void 0 ? T[k] : null,
        h2
      );
    }
    function D(h2) {
      switch (h2) {
        case "boolean":
          return Sr;
        case "code":
          return Or;
        case "icon":
          return Hr;
        case "image":
          return Rr;
        case "link":
          return Gr;
        case "number":
          return Kr;
        case "tags":
          return ao;
        case "text":
          return et;
        default:
          return et;
      }
    }
    function y(h2) {
      n.value === h2 ? r.value = !r.value : (n.value = h2, r.value = true);
    }
    const f = computed(() => {
      let h2 = u.value;
      return n.value ? h2.slice().sort((S, T) => {
        const k = x(S, n.value), E = x(T, n.value);
        return k == null ? 1 : E == null ? -1 : k < E ? r.value ? -1 : 1 : k > E ? r.value ? 1 : -1 : 0;
      }) : h2;
    }), u = computed(() => d.value ? a.value.filter((h2) => L(d.value, h2)) : a.value);
    function L(h2, S) {
      if (h2.type === "and" || h2.type === "or") {
        const T = h2, k = h2.type === "and" ? "every" : "some";
        return T.conditions[k](
          (E) => L(E, S)
        );
      } else if (h2.type === "condition") {
        const T = h2, k = x(S, T.key);
        return p(k, T.operator, T.value);
      } else
        return console.warn("Unknown filter type:", h2.type), true;
    }
    function p(h2, S, T) {
      switch (S) {
        case "equals":
          return h2 === T;
        case "notEquals":
          return h2 !== T;
        case "greaterThan":
          return h2 > T;
        case "greaterThanOrEqual":
          return h2 >= T;
        case "lessThan":
          return h2 < T;
        case "lessThanOrEqual":
          return h2 <= T;
        case "includes":
          return Array.isArray(h2) && h2.includes(T);
        case "notIncludes":
          return Array.isArray(h2) && !h2.includes(T);
        case "contains":
          return typeof h2 == "string" && h2.includes(T);
        case "notContains":
          return typeof h2 == "string" && !h2.includes(T);
        default:
          return console.warn("Unknown operator:", S), false;
      }
    }
    async function P() {
      if (e.jsonPath)
        try {
          const h2 = await fetch(e.jsonPath);
          a.value = await h2.json(), e.defaultSortField && (n.value = e.defaultSortField, r.value = e.defaultSortDirection === "ascending");
        } catch (h2) {
          console.error("Error fetching JSON:", h2);
        }
    }
    return watch(
      () => e.jsonDataProp,
      (h2) => {
        if (h2 && h2.length) {
          if (a.value = h2, o.value.length === 0 && h2.length) {
            const S = h2[0];
            o.value = Object.keys(S).map((T) => ({
              key: T,
              title: T,
              format: "text"
            }));
          }
          e.defaultSortField && (n.value = e.defaultSortField, r.value = e.defaultSortDirection === "ascending");
        } else e.jsonPath && P();
      },
      { immediate: true }
    ), onMounted(() => {
      !e.jsonDataProp || !e.jsonDataProp.length ? P() : (a.value = e.jsonDataProp, e.defaultSortField && (n.value = e.defaultSortField, r.value = e.defaultSortDirection === "ascending"));
    }), (h2, S) => (openBlock(), createElementBlock("div", null, [
      unref(c) ? (openBlock(), createElementBlock("h3", no, toDisplayString(unref(c)), 1)) : createCommentVNode("", true),
      createBaseVNode("div", ro, [
        f.value.length && o.value.length ? (openBlock(), createElementBlock("table", oo, [
          createBaseVNode("thead", null, [
            createBaseVNode("tr", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (T) => (openBlock(), createElementBlock("th", {
                key: T.key,
                onClick: (k) => e.sortable !== false ? y(T.key) : void 0,
                class: normalizeClass({
                  sortable: e.sortable !== false,
                  active: e.sortable !== false && n.value === T.key
                })
              }, [
                createTextVNode(toDisplayString(T.title || T.key) + " ", 1),
                e.sortable !== false && n.value === T.key ? (openBlock(), createElementBlock("span", so, toDisplayString(r.value ? "↑" : "↓"), 1)) : createCommentVNode("", true)
              ], 10, io))), 128))
            ])
          ]),
          createBaseVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (T, k) => (openBlock(), createElementBlock("tr", { key: k }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (E) => (openBlock(), createElementBlock("td", {
                key: E.key
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(D(E.format || "text")), mergeProps({
                  value: x(T, E.key)
                }, { ref_for: true }, E.options), null, 16, ["value"]))
              ]))), 128))
            ]))), 128))
          ])
        ])) : (openBlock(), createElementBlock("div", lo, "No data available"))
      ])
    ]));
  }
});
var tt = B(co, [["__scopeId", "data-v-4422365c"]]);
var uo = ["href", "data-pswp-width", "data-pswp-height"];
var mo = ["src", "alt"];
var ho = defineComponent({
  __name: "ImageCardFull",
  props: {
    image: {}
  },
  setup(t2) {
    const e = ref({
      width: 0,
      height: 0
    }), a = (n) => {
      const r = n.target;
      e.value = {
        width: r.naturalWidth,
        height: r.naturalHeight
      };
    };
    return (n, r) => (openBlock(), createElementBlock("a", {
      href: t2.image,
      "data-pswp-width": e.value.width,
      "data-pswp-height": e.value.height,
      target: "_blank",
      class: "full-image-card"
    }, [
      createBaseVNode("img", {
        src: t2.image,
        alt: t2.image,
        onLoad: a
      }, null, 40, mo)
    ], 8, uo));
  }
});
var fo = B(ho, [["__scopeId", "data-v-6d927cec"]]);
var go = ["href", "data-pswp-width", "data-pswp-height"];
var vo = ["src", "alt"];
var yo = defineComponent({
  __name: "ImageCardMasonry",
  props: {
    image: {}
  },
  setup(t2) {
    const e = ref({
      width: 0,
      height: 0
    }), a = (n) => {
      const r = n.target;
      e.value = {
        width: r.naturalWidth,
        height: r.naturalHeight
      };
    };
    return (n, r) => (openBlock(), createElementBlock("a", {
      href: t2.image,
      "data-pswp-width": e.value.width,
      "data-pswp-height": e.value.height,
      target: "_blank",
      class: "masonry-image-card"
    }, [
      createBaseVNode("img", {
        src: t2.image,
        alt: t2.image,
        onLoad: a
      }, null, 40, vo)
    ], 8, go));
  }
});
var po = B(yo, [["__scopeId", "data-v-dca6008a"]]);
var bo = { class: "image-card-square" };
var wo = ["href", "data-pswp-width", "data-pswp-height"];
var xo = ["src"];
var ko = defineComponent({
  __name: "ImageCardSquare",
  props: {
    image: {}
  },
  setup(t2) {
    const e = ref(0), a = ref(0), n = (r) => {
      const o = r.target;
      e.value = o.naturalWidth, a.value = o.naturalHeight;
    };
    return (r, o) => (openBlock(), createElementBlock("div", bo, [
      createBaseVNode("a", {
        href: t2.image,
        "data-pswp-width": e.value,
        "data-pswp-height": a.value,
        target: "_blank",
        class: "image-card-square"
      }, [
        createBaseVNode("img", {
          src: t2.image,
          alt: "Gallery Image",
          onLoad: n
        }, null, 40, xo)
      ], 8, wo)
    ]));
  }
});
var at = B(ko, [["__scopeId", "data-v-a9d94cba"]]);
var _o = { class: "image-gallery-container" };
var Do = { key: 0 };
var Co = {
  key: 0,
  class: "no-images"
};
var To = ["id"];
var Lo = defineComponent({
  __name: "VPVImageGallery",
  props: {
    headerTitle: {},
    headerSubtitle: {},
    headerDate: {},
    headerDateFormat: { default: "long" },
    headerDatePrefix: {},
    headerLink: {},
    headerTitleLines: { default: 2 },
    headerSubtitleLines: { default: 1 },
    folders: {},
    images: {},
    excludeExtensions: {},
    includeExtensions: {},
    format: {},
    galleryDataKey: {},
    forceSort: {},
    layout: { default: "grid" },
    directUrls: {},
    title: {},
    titleLines: {},
    date: {},
    dateFormat: {},
    dateTimeDescription: {},
    link: {},
    time: {}
  },
  setup(t2) {
    const e = ref(`gallery-${Math.random().toString(36).substr(2, 9)}`), a = ref(false);
    let n = null;
    const r = async () => {
      if (!Pt) return;
      n && (n.destroy(), n = null), await nextTick();
      const { default: k } = await import("./photoswipe-lightbox.esm-CkBE8VXX-HKZYSBRM.js");
      setTimeout(() => {
        try {
          n = new k({
            gallery: `#${e.value}`,
            children: "a",
            pswpModule: () => import("./photoswipe.esm-CClfKnLq-VLSOGZTM.js")
          }), n.init();
        } catch (E) {
          console.error("PhotoSwipe initialization error:", E);
        }
      }, 100);
    }, o = t2, d = computed(() => o.headerTitle || o.title || ""), c = computed(() => o.headerSubtitle || ""), x = computed(() => o.headerDate || o.date || ""), D = computed(() => o.headerLink || o.link || ""), y = computed(() => o.headerTitleLines || o.titleLines || 2), f = computed(() => o.headerSubtitleLines || 1), u = computed(() => o.headerDateFormat || o.dateFormat || "long"), L = computed(() => o.headerDatePrefix || o.dateTimeDescription || ""), p = inject(o.galleryDataKey || "galleryData", []);
    onMounted(() => {
      a.value = true, nextTick(() => {
        r();
      });
    }), onUnmounted(() => {
      n && (n.destroy(), n = null);
    });
    const P = computed(() => {
      switch (o.layout) {
        case "grid":
          return at;
        case "full":
          return fo;
        case "masonry":
          return po;
        default:
          return at;
      }
    }), h2 = computed(() => ({
      "image-grid": o.layout === "grid",
      "image-full": o.layout === "full",
      "image-masonry": o.layout === "masonry"
    })), S = computed(() => {
      var _a2, _b;
      return !((_a2 = o.folders) == null ? void 0 : _a2.length) && !((_b = o.images) == null ? void 0 : _b.length) ? p.filter((k) => {
        var _a3, _b2, _c;
        const E = (_a3 = k.filename.split(".").pop()) == null ? void 0 : _a3.toLowerCase();
        return !(((_b2 = o.excludeExtensions) == null ? void 0 : _b2.length) && E && o.excludeExtensions.includes(E) || ((_c = o.includeExtensions) == null ? void 0 : _c.length) && E && !o.includeExtensions.includes(E));
      }) : p.filter((k) => {
        var _a3, _b2, _c, _d, _e2;
        const E = (_a3 = k.filename.split(".").pop()) == null ? void 0 : _a3.toLowerCase();
        if (((_b2 = o.excludeExtensions) == null ? void 0 : _b2.length) && E && o.excludeExtensions.includes(E) || ((_c = o.includeExtensions) == null ? void 0 : _c.length) && E && !o.includeExtensions.includes(E))
          return false;
        const G = ((_d = o.folders) == null ? void 0 : _d.includes(k.folder)) || false, ne = ((_e2 = o.images) == null ? void 0 : _e2.includes(k.path)) || false;
        return G || ne;
      });
    }), T = computed(() => {
      if (o.directUrls && o.directUrls.length > 0)
        return o.directUrls;
      if (o.forceSort && o.forceSort.length > 0) {
        const k = [...o.forceSort];
        return S.value.forEach((E) => {
          k.includes(E.path) || k.push(E.path);
        }), k;
      }
      return S.value.map((k) => k.path).sort();
    });
    return watch(T, () => {
      r();
    }), (k, E) => {
      const G = resolveComponent("ClientOnly");
      return openBlock(), createElementBlock("div", _o, [
        t2.format === "debug" ? (openBlock(), createElementBlock("div", Do, [
          createBaseVNode("pre", null, toDisplayString(unref(p)), 1)
        ])) : createCommentVNode("", true),
        createVNode(de, {
          "header-title": d.value,
          "header-subtitle": c.value,
          "header-date": x.value,
          "header-date-format": u.value,
          "header-title-lines": y.value,
          "header-subtitle-lines": f.value,
          "header-link": D.value,
          "header-date-prefix": L.value,
          class: "gallery-container"
        }, {
          default: withCtx(() => [
            T.value.length === 0 && a.value ? (openBlock(), createElementBlock("div", Co, " No images found for this gallery. ")) : createCommentVNode("", true),
            createVNode(G, null, {
              fallback: withCtx(() => [...E[0] || (E[0] = [
                createBaseVNode("div", { class: "gallery-loading" }, "Loading gallery...", -1)
              ])]),
              default: withCtx(() => [
                T.value.length > 0 ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(h2.value),
                  id: e.value
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(T.value, (ne, O) => (openBlock(), createBlock(resolveDynamicComponent(P.value), {
                    key: O,
                    image: ne
                  }, null, 8, ["image"]))), 128))
                ], 10, To)) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["header-title", "header-subtitle", "header-date", "header-date-format", "header-title-lines", "header-subtitle-lines", "header-link", "header-date-prefix"])
      ]);
    };
  }
});
var nt = B(Lo, [["__scopeId", "data-v-6d242a94"]]);
var $o = { class: "lemmy-card" };
var So = { key: 0 };
var Eo = {
  key: 0,
  class: "lemmy-card-header"
};
var Io = { class: "lemmy-card-user-community" };
var Po = { class: "lemmy-user-info" };
var Oo = ["href"];
var Mo = { class: "lemmy-user-icon" };
var zo = ["src"];
var Ao = { class: "lemmy-username" };
var Bo = {
  key: 1,
  class: "lemmy-separator"
};
var Ho = ["href"];
var Fo = { class: "lemmy-community-name" };
var No = { class: "lemmy-icon-container" };
var Vo = ["href"];
var Wo = ["href"];
var Ro = { class: "lemmy-card-content" };
var Uo = ["src"];
var Yo = {
  key: 1,
  class: "lemmy-card-footer"
};
var qo = { class: "lemmy-footer-item" };
var jo = { class: "lemmy-footer-item" };
var Go = {
  key: 2,
  class: "lemmy-footer-section lemmy-post-date"
};
var Xo = { class: "lemmy-footer-item" };
var Qo = {
  key: 1,
  class: "error-message-container"
};
var Jo = { class: "error-message" };
var Zo = ["href"];
var rt = "https://placehold.co/24";
var ie = 24;
var Ko = defineComponent({
  __name: "EmbedCardLemmy",
  props: {
    url: {},
    hideUser: { type: Boolean },
    hideCommunity: { type: Boolean },
    hideTitle: { type: Boolean },
    hideBanner: { type: Boolean },
    hideExcerpt: { type: Boolean },
    hideScore: { type: Boolean },
    hideComments: { type: Boolean },
    hideDate: { type: Boolean },
    titleLines: {},
    excerptLines: {},
    dateFormat: {}
  },
  setup(t2) {
    const e = t2, a = ref("Loading..."), n = ref(""), r = ref({
      display_name: "",
      name: "",
      avatar: "",
      actor_id: ""
    }), o = ref({
      name: "",
      actor_id: ""
    }), d = new URL(e.url).origin, c = ref(""), x = ref(null), D = ref(0), y = ref(0);
    var f = false;
    const u = computed(() => !e.hideUser || !e.hideCommunity), L = computed(() => !e.hideUser && !e.hideCommunity), p = computed(() => !e.hideScore || !e.hideComments || !e.hideDate), P = computed(() => c.value ? ke(c.value, { format: e.dateFormat || "iso" }) : ""), h2 = computed(() => {
      try {
        return `${new URL(r.value.actor_id).origin}/u/${r.value.name}`;
      } catch {
        return console.error("Invalid creator actor_id URL:", r.value.actor_id), "#";
      }
    }), S = computed(() => {
      try {
        return `${new URL(o.value.actor_id).origin}/c/${o.value.name}`;
      } catch {
        return console.error("Invalid community actor_id URL:", o.value.actor_id), "#";
      }
    }), T = computed(() => a.value !== "Loading..." && a.value !== "Post not found or invalid data." && a.value !== "Error loading post."), k = () => {
      window.open(e.url, "_blank");
    };
    function E(_) {
      try {
        const b = new URL(_), M = `${b.protocol}//${b.host}`, I = b.pathname.split("/").filter(Boolean);
        let $ = "";
        return I[0] === "post" ? $ = I[1] === "id" ? I[2] : I[1] : I[0] === "comment" && I[1] === "id" && ($ = I[2]), { instanceURL: M, postID: $ };
      } catch (b) {
        return console.error("Error parsing URL:", b), { instanceURL: "", postID: "" };
      }
    }
    async function G(_) {
      var _a2;
      try {
        const M = await (await fetch(_)).text();
        return ((_a2 = new DOMParser().parseFromString(M, "text/html").querySelector("meta[property='og:image']")) == null ? void 0 : _a2.getAttribute("content")) || null;
      } catch (b) {
        return console.error("Failed to fetch OG Image:", b), null;
      }
    }
    async function ne(_, b) {
      const M = `${_}/api/v3/post?id=${b}`;
      try {
        const I = await fetch(M);
        if (!I.ok)
          throw new Error(`HTTP error! status: ${I.status}`);
        const $ = await I.json();
        if ($ == null ? void 0 : $.post_view) {
          const { post: F, creator: Y, community: re, counts: X } = $.post_view;
          a.value = F.name, n.value = F.body || "", r.value = Y, o.value = re, c.value = F.published, x.value = F.thumbnail_url || null, D.value = X.score, y.value = X.comments, !x.value && F.url && !F.body && (x.value = await G(F.url), f = true);
        } else
          a.value = "Post not found or invalid data.", console.error("Invalid data structure:", $);
      } catch (I) {
        a.value = "Error loading post.", console.error("Error fetching post data:", I);
      }
    }
    function O(_) {
      _.target.src = rt;
    }
    function m(_) {
      x.value = null;
    }
    function ce(_) {
      return {
        display: "-webkit-box",
        "-webkit-line-clamp": _.toString(),
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        "text-overflow": "ellipsis"
      };
    }
    const N = computed(() => ce(e.titleLines || 2)), W = computed(() => ce(e.excerptLines || 4));
    return onMounted(() => {
      const { instanceURL: _, postID: b } = E(e.url);
      _ && b ? ne(_, b) : a.value = "Invalid URL.";
    }), (_, b) => (openBlock(), createElementBlock("div", $o, [
      T.value ? (openBlock(), createElementBlock("div", So, [
        u.value ? (openBlock(), createElementBlock("div", Eo, [
          createBaseVNode("div", Io, [
            createBaseVNode("div", Po, [
              t2.hideUser ? createCommentVNode("", true) : (openBlock(), createElementBlock("a", {
                key: 0,
                onClick: b[0] || (b[0] = withModifiers(() => {
                }, ["stop"])),
                href: h2.value,
                title: "User profile",
                class: "lemmy-user-link",
                target: "_blank"
              }, [
                createBaseVNode("div", Mo, [
                  createBaseVNode("img", {
                    src: r.value.avatar || rt,
                    alt: "User Avatar",
                    onError: O
                  }, null, 40, zo)
                ]),
                createBaseVNode("span", Ao, toDisplayString(r.value.display_name || r.value.name), 1)
              ], 8, Oo)),
              L.value ? (openBlock(), createElementBlock("span", Bo, "in")) : createCommentVNode("", true),
              t2.hideCommunity ? createCommentVNode("", true) : (openBlock(), createElementBlock("a", {
                key: 2,
                onClick: b[1] || (b[1] = withModifiers(() => {
                }, ["stop"])),
                href: S.value,
                title: "Community",
                class: "lemmy-community-link",
                target: "_blank"
              }, [
                createBaseVNode("span", Fo, toDisplayString(o.value.name), 1)
              ], 8, Ho))
            ])
          ]),
          createBaseVNode("div", No, [
            createBaseVNode("a", {
              href: e.url,
              target: "_blank",
              title: "View post on Lemmy",
              class: "lemmy-header-icon-link"
            }, [
              createVNode(unref(Icon), {
                icon: "bi:link-45deg",
                class: "lemmy-header-icon",
                width: ie,
                height: ie
              })
            ], 8, Vo),
            createBaseVNode("a", {
              href: unref(d),
              target: "_blank",
              title: "Instance",
              class: "lemmy-header-icon-link"
            }, [
              createVNode(unref(Icon), {
                icon: "simple-icons:lemmy",
                class: "lemmy-header-icon",
                width: ie,
                height: ie
              })
            ], 8, Wo)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", Ro, [
          t2.hideTitle ? createCommentVNode("", true) : (openBlock(), createElementBlock("h3", {
            key: 0,
            class: "lemmy-card-title clickable",
            style: normalizeStyle(N.value),
            onClick: k,
            title: "View post on Lemmy"
          }, toDisplayString(a.value), 5)),
          x.value && !t2.hideBanner ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "lemmy-card-image clickable",
            onClick: k,
            title: "View post on Lemmy"
          }, [
            createBaseVNode("img", {
              src: x.value,
              alt: "Post Image",
              onError: m
            }, null, 40, Uo)
          ])) : createCommentVNode("", true),
          n.value && !t2.hideExcerpt ? (openBlock(), createElementBlock("p", {
            key: 2,
            class: "lemmy-card-description",
            style: normalizeStyle(W.value)
          }, toDisplayString(n.value), 5)) : createCommentVNode("", true)
        ]),
        p.value ? (openBlock(), createElementBlock("div", Yo, [
          t2.hideScore ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 0,
            class: "lemmy-footer-section clickable",
            onClick: k,
            title: "View post on Lemmy"
          }, [
            createBaseVNode("div", qo, [
              createVNode(unref(Icon), {
                icon: "mingcute:arrow-up-fill",
                class: "lemmy-icon",
                width: ie,
                height: ie
              }),
              createBaseVNode("span", null, toDisplayString(D.value), 1)
            ])
          ])),
          t2.hideComments ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
            key: 1,
            class: "lemmy-footer-section clickable",
            onClick: k,
            title: "View post on Lemmy"
          }, [
            createBaseVNode("div", jo, [
              createVNode(unref(Icon), {
                icon: "mdi:comment-outline",
                class: "lemmy-icon",
                width: ie,
                height: ie
              }),
              createBaseVNode("span", null, toDisplayString(y.value), 1)
            ])
          ])),
          t2.hideDate ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Go, [
            createBaseVNode("div", Xo, toDisplayString(P.value), 1)
          ]))
        ])) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", Qo, [
        createBaseVNode("div", Jo, [
          b[2] || (b[2] = createTextVNode(" This post could not be loaded. ", -1)),
          b[3] || (b[3] = createBaseVNode("br", null, null, -1)),
          b[4] || (b[4] = createTextVNode(" It may have been deleted or removed. ", -1)),
          b[5] || (b[5] = createBaseVNode("br", null, null, -1)),
          b[6] || (b[6] = createBaseVNode("br", null, null, -1)),
          b[7] || (b[7] = createTextVNode(" You can try viewing it ", -1)),
          createBaseVNode("a", {
            href: e.url,
            target: "_blank"
          }, "here", 8, Zo),
          b[8] || (b[8] = createTextVNode(". ", -1))
        ])
      ]))
    ]));
  }
});
var ei = B(Ko, [["__scopeId", "data-v-8c86b879"]]);
var ot = defineComponent({
  __name: "VPVEmbedLemmy",
  props: {
    headerTitle: { default: "" },
    headerSubtitle: {},
    headerDate: { default: "" },
    headerDateFormat: { default: "long" },
    headerDatePrefix: {},
    headerLink: {},
    headerTitleLines: { default: 2 },
    headerSubtitleLines: { default: 1 },
    links: {},
    hideUser: { type: Boolean },
    hideCommunity: { type: Boolean },
    hideTitle: { type: Boolean },
    hideBanner: { type: Boolean },
    hideExcerpt: { type: Boolean },
    hideScore: { type: Boolean },
    hideComments: { type: Boolean },
    hideDate: { type: Boolean },
    titleLines: {},
    excerptLines: {},
    dateFormat: {}
  },
  setup(t2) {
    const e = t2, {
      links: a,
      hideUser: n,
      hideCommunity: r,
      hideTitle: o,
      hideBanner: d,
      hideExcerpt: c,
      hideScore: x,
      hideComments: D,
      hideDate: y,
      titleLines: f,
      excerptLines: u
    } = e;
    return (L, p) => (openBlock(), createBlock(de, {
      "header-title": t2.headerTitle,
      "header-subtitle": t2.headerSubtitle,
      "header-date": t2.headerDate,
      "header-link": t2.headerLink,
      "header-title-lines": t2.headerTitleLines,
      "header-subtitle-lines": t2.headerSubtitleLines,
      "header-date-format": t2.headerDateFormat,
      "header-date-prefix": t2.headerDatePrefix
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(a), (P, h2) => (openBlock(), createBlock(ei, {
          key: h2,
          url: P,
          dateFormat: t2.dateFormat,
          hideUser: unref(n),
          hideCommunity: unref(r),
          hideTitle: unref(o),
          hideBanner: unref(d),
          hideExcerpt: unref(c),
          hideScore: unref(x),
          hideComments: unref(D),
          hideDate: unref(y),
          titleLines: unref(f),
          excerptLines: unref(u)
        }, null, 8, ["url", "dateFormat", "hideUser", "hideCommunity", "hideTitle", "hideBanner", "hideExcerpt", "hideScore", "hideComments", "hideDate", "titleLines", "excerptLines"]))), 128))
      ]),
      _: 1
    }, 8, ["header-title", "header-subtitle", "header-date", "header-link", "header-title-lines", "header-subtitle-lines", "header-date-format", "header-date-prefix"]));
  }
});
var ti = {
  name: "MailchimpEmbed",
  props: {
    actionUrl: {
      type: String,
      required: true
    },
    hiddenFieldName: {
      type: String,
      required: true
    },
    showReferral: {
      type: Boolean,
      default: true
    },
    referralLink: {
      type: String,
      required: function() {
        return this.showReferral;
      }
    },
    title: {
      type: String,
      default: "Subscribe"
    },
    description: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: "Subscribe"
    }
  },
  data() {
    return {
      email: "",
      hiddenFieldValue: ""
    };
  },
  mounted() {
    const t2 = document.createElement("script");
    t2.type = "text/javascript", t2.src = this.validationScriptUrl, t2.async = true, document.body.appendChild(t2), window.fnames = [], window.ftypes = [], window.fnames[0] = "EMAIL", window.ftypes[0] = "email", window.fnames[1] = "FNAME", window.ftypes[1] = "text", window.fnames[2] = "LNAME", window.ftypes[2] = "text", window.fnames[3] = "ADDRESS", window.ftypes[3] = "address", window.fnames[4] = "PHONE", window.ftypes[4] = "phone", window.fnames[5] = "BIRTHDAY", window.ftypes[5] = "birthday", window.fnames[6] = "COMPANY", window.ftypes[6] = "text", window.jQuery && (window.$mcj = window.jQuery.noConflict(true));
  },
  methods: {
    handleSubmit() {
      this.$el.querySelector("form").submit();
    }
  },
  computed: {
    validationScriptUrl() {
      return "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    }
  }
};
var ai = { id: "mc_embed_shell" };
var ni = { id: "mailc_embed_signup" };
var ri = ["action"];
var oi = { id: "mailc_embed_signup_scroll" };
var ii = { class: "title" };
var si = {
  key: 0,
  class: "description"
};
var li = { class: "mc-field-group" };
var di = {
  "aria-hidden": "true",
  style: { position: "absolute", left: "-5000px" }
};
var ci = ["name"];
var ui = { class: "optionalParent" };
var mi = { class: "clear foot" };
var hi = {
  type: "submit",
  name: "subscribe",
  id: "mc-embedded-subscribe",
  class: "button"
};
var fi = {
  key: 0,
  class: "referral"
};
var gi = ["href"];
function vi(t2, e, a, n, r, o) {
  return openBlock(), createElementBlock("div", ai, [
    createBaseVNode("div", ni, [
      createBaseVNode("form", {
        action: a.actionUrl,
        method: "post",
        id: "mc-embedded-subscribe-form",
        name: "mc-embedded-subscribe-form",
        class: "validate",
        target: "_blank",
        onSubmit: e[2] || (e[2] = withModifiers((...d) => o.handleSubmit && o.handleSubmit(...d), ["prevent"]))
      }, [
        createBaseVNode("div", oi, [
          createBaseVNode("div", ii, toDisplayString(a.title), 1),
          a.description ? (openBlock(), createElementBlock("div", si, [
            createBaseVNode("p", null, toDisplayString(a.description), 1)
          ])) : createCommentVNode("", true),
          e[5] || (e[5] = createBaseVNode("div", { class: "indicates-required" }, [
            createBaseVNode("span", { class: "asterisk" }, "*"),
            createTextVNode(" indicates required ")
          ], -1)),
          createBaseVNode("div", li, [
            e[3] || (e[3] = createBaseVNode("label", { for: "mce-EMAIL" }, [
              createTextVNode(" Email Address "),
              createBaseVNode("span", { class: "asterisk" }, "*")
            ], -1)),
            withDirectives(createBaseVNode("input", {
              type: "email",
              name: "EMAIL",
              class: "required email",
              id: "mce-EMAIL",
              "onUpdate:modelValue": e[0] || (e[0] = (d) => r.email = d),
              required: ""
            }, null, 512), [
              [vModelText, r.email]
            ])
          ]),
          e[6] || (e[6] = createBaseVNode("div", {
            id: "mce-responses",
            class: "clear foot"
          }, [
            createBaseVNode("div", {
              class: "response",
              id: "mce-error-response",
              style: { display: "none" }
            }),
            createBaseVNode("div", {
              class: "response",
              id: "mce-success-response",
              style: { display: "none" }
            })
          ], -1)),
          createBaseVNode("div", di, [
            withDirectives(createBaseVNode("input", {
              type: "text",
              name: a.hiddenFieldName,
              tabindex: "-1",
              "onUpdate:modelValue": e[1] || (e[1] = (d) => r.hiddenFieldValue = d)
            }, null, 8, ci), [
              [vModelText, r.hiddenFieldValue]
            ])
          ]),
          createBaseVNode("div", ui, [
            createBaseVNode("div", mi, [
              createBaseVNode("button", hi, toDisplayString(a.buttonText), 1),
              a.showReferral && a.referralLink ? (openBlock(), createElementBlock("p", fi, [
                createBaseVNode("a", {
                  href: a.referralLink,
                  title: "Mailchimp - email marketing made easy and fun"
                }, [...e[4] || (e[4] = [
                  createBaseVNode("span", { class: "referral-container" }, [
                    createBaseVNode("img", {
                      class: "referral_badge dark-only",
                      src: "https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-light.svg",
                      alt: "Intuit Mailchimp"
                    }),
                    createBaseVNode("img", {
                      class: "referral_badge light-only",
                      src: "https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg",
                      alt: "Intuit Mailchimp"
                    })
                  ], -1)
                ])], 8, gi)
              ])) : createCommentVNode("", true)
            ])
          ])
        ])
      ], 40, ri)
    ])
  ]);
}
var it = B(ti, [["render", vi], ["__scopeId", "data-v-8b45af32"]]);
var yi = { class: "blog-post-list-container" };
var pi = { key: 0 };
var bi = {
  key: 1,
  class: "cards-container"
};
var wi = ["href"];
var xi = { class: "card-content" };
var ki = { class: "card-info" };
var _i = { class: "post-title" };
var Di = { class: "post-meta" };
var Ci = { class: "post-date" };
var Ti = {
  key: 0,
  class: "post-author"
};
var Li = { class: "post-tags" };
var $i = {
  key: 0,
  class: "tag"
};
var Si = { class: "post-excerpt" };
var Ei = {
  key: 0,
  class: "card-image"
};
var Ii = ["src"];
var Pi = {
  __name: "BlogPostsVertical",
  props: {
    posts: {
      type: Array,
      required: false
    },
    renderDrafts: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: [Date, String],
      default: null
    },
    endDate: {
      type: [Date, String],
      default: null
    },
    format: {
      type: String,
      default: "verticalCards",
      validator: (t2) => ["debug", "verticalCards"].includes(t2)
    },
    sortOrder: {
      type: String,
      default: "desc",
      validator: (t2) => ["asc", "desc"].includes(t2)
    },
    featuredOnly: {
      type: Boolean,
      default: false
    },
    filterAuthors: {
      type: Array,
      default: () => []
    },
    excludeAuthors: {
      type: Array,
      default: () => []
    },
    filterCategories: {
      type: Array,
      default: () => []
    },
    excludeCategories: {
      type: Array,
      default: () => []
    },
    excludeURLs: {
      type: Array,
      default: () => []
    },
    maxCards: {
      type: Number,
      default: null
    }
  },
  setup(t2) {
    onMounted(() => {
      _e("BlogPostsVertical", "ArticleList", "v1.0.0");
    });
    const e = t2, a = inject("postsData", []), n = inject("authors", {}), r = computed(() => e.posts || a), o = computed(() => {
      const y = [...r.value];
      return y.sort((f, u) => {
        const L = new Date(f.frontmatter.date), p = new Date(u.frontmatter.date);
        return e.sortOrder === "asc" ? L - p : p - L;
      }), y;
    }), d = computed(() => o.value.filter((y) => {
      const { frontmatter: f } = y;
      if (e.featuredOnly && !f.featured || !e.renderDrafts && f.draft)
        return false;
      const u = new Date(f.date);
      if (e.startDate && u < new Date(e.startDate) || e.endDate && u > new Date(e.endDate) || e.filterAuthors.length > 0 && !e.filterAuthors.includes(f.author) || e.excludeAuthors.length > 0 && e.excludeAuthors.includes(f.author) || e.filterCategories.length > 0 && !e.filterCategories.includes(f.category) || e.excludeCategories.length > 0 && e.excludeCategories.includes(f.category))
        return false;
      if (e.excludeURLs.length > 0) {
        const L = y.url.replace(/\.html$/, "");
        if (e.excludeURLs.some((P) => P.replace(/\.html$/, "") === L))
          return false;
      }
      return true;
    })), c = computed(() => e.maxCards !== null && e.maxCards >= 0 ? d.value.slice(0, e.maxCards) : d.value);
    function x(y) {
      return new Date(y).toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    function D(y) {
      const f = n[y];
      return f ? f.name : y;
    }
    return (y, f) => (openBlock(), createElementBlock("div", yi, [
      t2.format === "debug" ? (openBlock(), createElementBlock("div", pi, [
        createBaseVNode("pre", null, toDisplayString(JSON.stringify(c.value, null, 2)), 1)
      ])) : t2.format === "verticalCards" ? (openBlock(), createElementBlock("div", bi, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (u) => (openBlock(), createElementBlock("div", {
          key: u.url,
          class: "post-card"
        }, [
          createBaseVNode("a", {
            href: u.url,
            class: "card-link"
          }, [
            createBaseVNode("div", xi, [
              createBaseVNode("div", ki, [
                createBaseVNode("div", _i, toDisplayString(u.frontmatter.title), 1),
                createBaseVNode("div", Di, [
                  createBaseVNode("span", Ci, toDisplayString(x(u.frontmatter.date)), 1),
                  u.frontmatter.author ? (openBlock(), createElementBlock("span", Ti, " by " + toDisplayString(D(u.frontmatter.author)), 1)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", Li, [
                  u.frontmatter.category ? (openBlock(), createElementBlock("span", $i, toDisplayString(u.frontmatter.category), 1)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", Si, toDisplayString(u.frontmatter.excerpt), 1)
              ]),
              u.frontmatter.banner ? (openBlock(), createElementBlock("div", Ei, [
                createBaseVNode("img", {
                  src: u.frontmatter.banner,
                  alt: "Banner Image"
                }, null, 8, Ii)
              ])) : createCommentVNode("", true)
            ])
          ], 8, wi)
        ]))), 128))
      ])) : createCommentVNode("", true)
    ]));
  }
};
var Oi = B(Pi, [["__scopeId", "data-v-76c43f86"]]);
var Mi = { class: "featured-posts-container" };
var zi = { class: "cards-wrapper" };
var Ai = ["href"];
var Bi = { class: "card-image" };
var Hi = ["src"];
var Fi = { class: "card-info" };
var Ni = { class: "post-title" };
var Vi = { class: "post-meta" };
var Wi = { class: "post-date" };
var Ri = {
  key: 0,
  class: "post-author"
};
var Ui = { class: "post-tags" };
var Yi = {
  key: 0,
  class: "tag"
};
var qi = { class: "post-excerpt" };
var ji = {
  __name: "BlogPostsHorizontal",
  props: {
    posts: {
      type: Array,
      required: false
    },
    renderDrafts: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: [Date, String],
      default: null
    },
    endDate: {
      type: [Date, String],
      default: null
    },
    sortOrder: {
      type: String,
      default: "desc",
      validator: (t2) => ["asc", "desc"].includes(t2)
    },
    featuredOnly: {
      type: Boolean,
      default: false
    },
    filterAuthors: {
      type: Array,
      default: () => []
    },
    excludeAuthors: {
      type: Array,
      default: () => []
    },
    filterCategories: {
      type: Array,
      default: () => []
    },
    excludeCategories: {
      type: Array,
      default: () => []
    },
    excludeURLs: {
      type: Array,
      default: () => []
    },
    maxCards: {
      type: Number,
      default: null
    }
  },
  setup(t2) {
    onMounted(() => {
      _e("BlogPostsHorizontal", "ArticleList", "v1.0.0");
    });
    const e = t2, a = inject("postsData", []), n = inject("authors", {}), r = computed(() => e.posts || a), o = computed(() => {
      const y = [...r.value];
      return y.sort((f, u) => {
        const L = new Date(f.frontmatter.date), p = new Date(u.frontmatter.date);
        return e.sortOrder === "asc" ? L - p : p - L;
      }), y;
    }), d = computed(() => o.value.filter((y) => {
      const { frontmatter: f } = y;
      if (e.featuredOnly && !f.featured || !e.renderDrafts && f.draft)
        return false;
      const u = new Date(f.date);
      if (e.startDate && u < new Date(e.startDate) || e.endDate && u > new Date(e.endDate) || e.filterAuthors.length > 0 && !e.filterAuthors.includes(f.author) || e.excludeAuthors.length > 0 && e.excludeAuthors.includes(f.author) || e.filterCategories.length > 0 && !e.filterCategories.includes(f.category) || e.excludeCategories.length > 0 && e.excludeCategories.includes(f.category))
        return false;
      if (e.excludeURLs.length > 0) {
        const L = y.url.replace(/\.html$/, "");
        if (e.excludeURLs.some((P) => P.replace(/\.html$/, "") === L))
          return false;
      }
      return true;
    })), c = computed(() => e.maxCards !== null && e.maxCards >= 0 ? d.value.slice(0, e.maxCards) : d.value);
    function x(y) {
      return new Date(y).toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
    function D(y) {
      const f = n[y];
      return f ? f.name : y;
    }
    return (y, f) => (openBlock(), createElementBlock("div", Mi, [
      createCommentVNode("", true),
      createBaseVNode("div", zi, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(c.value, (u) => (openBlock(), createElementBlock("div", {
          key: u.url,
          class: "featured-post-card"
        }, [
          createBaseVNode("a", {
            href: u.url,
            class: "card-link"
          }, [
            createBaseVNode("div", Bi, [
              u.frontmatter.banner ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: u.frontmatter.banner,
                alt: "Banner Image"
              }, null, 8, Hi)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", Fi, [
              createBaseVNode("h3", Ni, toDisplayString(u.frontmatter.title), 1),
              createBaseVNode("div", Vi, [
                createBaseVNode("span", Wi, toDisplayString(x(u.frontmatter.date)), 1),
                u.frontmatter.author ? (openBlock(), createElementBlock("span", Ri, " by " + toDisplayString(D(u.frontmatter.author)), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", Ui, [
                u.frontmatter.category ? (openBlock(), createElementBlock("span", Yi, toDisplayString(u.frontmatter.category), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("p", qi, toDisplayString(u.frontmatter.excerpt), 1)
            ])
          ], 8, Ai)
        ]))), 128))
      ])
    ]));
  }
};
var Gi = B(ji, [["__scopeId", "data-v-2e011bed"]]);
var Xi = ["href"];
var Qi = { class: "post-header" };
var Ji = {
  key: 0,
  class: "post-title"
};
var Zi = ["src"];
var Ki = { class: "post-info" };
var es = {
  key: 0,
  class: "author-section"
};
var ts = ["src"];
var as = { class: "author-details" };
var ns = ["href"];
var rs = {
  key: 1,
  class: "author-name author-name--no-link"
};
var os = { class: "author-description" };
var is = { class: "meta-data" };
var ss = { key: 0 };
var ls = { key: 1 };
var ds = defineComponent({
  __name: "BlogPostHeader",
  props: {
    returnLink: {},
    returnText: {},
    hideTitle: { type: Boolean },
    hideDate: { type: Boolean },
    hideAuthor: { type: Boolean },
    hideCategory: { type: Boolean },
    hideBanner: { type: Boolean },
    authorsDataKey: {}
  },
  setup(t2) {
    onMounted(() => {
      _e("BlogPostHeader", "ArticleHeader", "v1.0.0");
    });
    const e = t2, a = e.authorsDataKey || "authors", n = inject(a) || {}, { page: r } = Ve(), o = r.value.frontmatter, d = ref(n[o.author || ""] || { name: "" }), c = ref(
      e.returnLink || o.returnLinkValue || "/"
    ), x = ref(
      "← " + (e.returnText || o.returnTextValue || "Back Home")
    );
    return (D, y) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("a", {
        class: "return-text",
        href: c.value
      }, toDisplayString(x.value), 9, Xi),
      createBaseVNode("header", Qi, [
        e.hideTitle ? createCommentVNode("", true) : (openBlock(), createElementBlock("h1", Ji, toDisplayString(unref(o).title), 1)),
        !e.hideBanner && unref(o).banner ? (openBlock(), createElementBlock("img", {
          key: 1,
          src: unref(o).banner,
          alt: "Banner Image",
          class: "banner-image"
        }, null, 8, Zi)) : createCommentVNode("", true),
        createBaseVNode("div", Ki, [
          !e.hideAuthor && d.value.name ? (openBlock(), createElementBlock("div", es, [
            d.value.avatar ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: d.value.avatar,
              alt: "Author's Avatar",
              class: "author-avatar"
            }, null, 8, ts)) : createCommentVNode("", true),
            createBaseVNode("div", as, [
              d.value.url ? (openBlock(), createElementBlock("a", {
                key: 0,
                href: d.value.url,
                class: "author-name"
              }, toDisplayString(d.value.name), 9, ns)) : (openBlock(), createElementBlock("span", rs, toDisplayString(d.value.name), 1)),
              createBaseVNode("p", os, toDisplayString(d.value.description), 1)
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", is, [
            !e.hideDate && unref(o).date ? (openBlock(), createElementBlock("p", ss, toDisplayString(new Date(unref(o).date).toLocaleDateString(void 0, {
              year: "numeric",
              month: "long",
              day: "numeric"
            })), 1)) : createCommentVNode("", true),
            !e.hideCategory && unref(o).category ? (openBlock(), createElementBlock("p", ls, " Category: " + toDisplayString(unref(o).category), 1)) : createCommentVNode("", true)
          ])
        ])
      ])
    ], 64));
  }
});
var cs = B(ds, [["__scopeId", "data-v-488bce22"]]);
var us = { class: "top-bar" };
var ms = { class: "title-date-container" };
var hs = ["innerHTML"];
var fs = defineComponent({
  __name: "HeaderCard",
  props: {
    title: {},
    date: { default: "" },
    time: { default: "" },
    titleLines: { default: 2 },
    link: {},
    dateFormat: { default: "long" },
    dateTimeDescription: {}
  },
  setup(t2) {
    onMounted(() => {
      _e("HeaderCard", "ContainerHeader", "v1.0.0");
    });
    const e = t2, a = computed(() => {
      let n = "";
      if (e.date) {
        const r = new Date(e.date);
        if (isNaN(r.getTime()))
          n = e.date;
        else if (e.dateFormat === "iso")
          n = r.toISOString().split("T")[0];
        else {
          const o = {
            year: "numeric",
            month: "long",
            day: "numeric"
          };
          n = r.toLocaleDateString(void 0, o);
        }
      }
      if (e.time) {
        const r = e.time.match(
          /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/
        );
        if (r) {
          const [, o, d] = r, c = `${o.padStart(2, "0")}:${d}`;
          n = n ? `${n} at ${c}` : c;
        }
      }
      return e.dateTimeDescription && n ? `${e.dateTimeDescription} ${n}` : n;
    });
    return (n, r) => (openBlock(), createElementBlock("div", us, [
      createBaseVNode("div", ms, [
        (openBlock(), createBlock(resolveDynamicComponent(t2.link ? "a" : "span"), {
          class: "gallery-title",
          href: t2.link || void 0
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(t2.title), 1)
          ]),
          _: 1
        }, 8, ["href"])),
        a.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "gallery-date",
          innerHTML: a.value
        }, null, 8, hs)) : createCommentVNode("", true)
      ])
    ]));
  }
});
var gs = B(fs, [["__scopeId", "data-v-67df0801"]]);
var vs = { class: "blog-post-list-container" };
var ys = { key: 0 };
var ps = defineComponent({
  __name: "BlogPostList",
  props: {
    posts: {},
    format: {},
    sortOrder: {},
    startDate: {},
    endDate: {},
    renderDrafts: { type: Boolean },
    featuredOnly: { type: Boolean },
    filterAuthors: {},
    excludeAuthors: {},
    filterCategories: {},
    excludeCategories: {},
    excludeURLs: {},
    maxCards: {},
    hideAuthor: { type: Boolean },
    hideDate: { type: Boolean },
    hideImage: { type: Boolean },
    hideCategory: { type: Boolean },
    hideDomain: { type: Boolean },
    disableLinks: { type: Boolean },
    titleLines: {},
    excerptLines: {},
    postsDataKey: {},
    authorsDataKey: {}
  },
  setup(t2) {
    onMounted(() => {
      _e("BlogPostList", "ArticleList", "v1.0.0");
    });
    const e = t2, a = inject(e.postsDataKey || "postsData", []), n = inject(e.authorsDataKey || "authors", {}), r = computed(() => e.posts || a), o = computed(() => {
      switch (e.format) {
        case "horizontal":
          return $e;
        case "vertical":
          return ge;
        default:
          return ge;
      }
    }), d = computed(() => {
      switch (e.format) {
        case "horizontal":
          return Ee;
        case "vertical":
          return de;
        default:
          return de;
      }
    }), c = computed(() => {
      const u = [...r.value];
      return u.sort((L, p) => {
        const P = new Date(L.frontmatter.date).getTime(), h2 = new Date(p.frontmatter.date).getTime();
        return e.sortOrder === "ascending" ? P - h2 : h2 - P;
      }), u;
    }), x = computed(() => c.value.filter((u) => {
      var _a2, _b, _c, _d, _e2;
      const { frontmatter: L } = u;
      if (e.featuredOnly && !L.featured || !e.renderDrafts && L.draft) return false;
      const p = new Date(L.date).getTime();
      if (e.startDate && p < new Date(e.startDate).getTime() || e.endDate && p > new Date(e.endDate).getTime() || ((_a2 = e.filterAuthors) == null ? void 0 : _a2.length) && !e.filterAuthors.includes(L.author || "") || ((_b = e.excludeAuthors) == null ? void 0 : _b.length) && e.excludeAuthors.includes(L.author || "") || ((_c = e.filterCategories) == null ? void 0 : _c.length) && !e.filterCategories.includes(L.category || "") || ((_d = e.excludeCategories) == null ? void 0 : _d.length) && e.excludeCategories.includes(L.category || ""))
        return false;
      if ((_e2 = e.excludeURLs) == null ? void 0 : _e2.length) {
        const P = u.url.replace(/\.html$/, "");
        if (e.excludeURLs.some((S) => S.replace(/\.html$/, "") === P)) return false;
      }
      return true;
    })), D = computed(() => e.maxCards != null && e.maxCards >= 0 ? x.value.slice(0, e.maxCards) : x.value);
    function y(u) {
      const L = n[u];
      return L ? L.name : u;
    }
    function f(u) {
      return {
        title: u.frontmatter.title,
        excerpt: u.frontmatter.excerpt,
        url: u.url,
        hideDomain: e.hideDomain,
        isExternal: false,
        author: y(u.frontmatter.author || ""),
        date: ke(u.frontmatter.date),
        image: u.frontmatter.banner,
        category: u.frontmatter.category,
        hideAuthor: e.hideAuthor,
        hideDate: e.hideDate,
        hideImage: e.hideImage,
        hideCategory: e.hideCategory,
        disableLinks: e.disableLinks,
        titleLines: e.titleLines,
        excerptLines: e.excerptLines
      };
    }
    return (u, L) => (openBlock(), createElementBlock("div", vs, [
      t2.format === "debug" ? (openBlock(), createElementBlock("div", ys, [
        createBaseVNode("pre", null, toDisplayString(JSON.stringify(D.value, null, 2)), 1)
      ])) : createCommentVNode("", true),
      (openBlock(), createBlock(resolveDynamicComponent(d.value), null, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(D.value, (p) => (openBlock(), createBlock(resolveDynamicComponent(o.value), mergeProps({
            key: p.url
          }, { ref_for: true }, f(p)), null, 16))), 128))
        ]),
        _: 1
      }))
    ]));
  }
});
var bs = B(ps, [["__scopeId", "data-v-eb7ca014"]]);
var ws = Object.freeze(Object.defineProperty({
  __proto__: null,
  BlogPostHeader: cs,
  BlogPostList: bs,
  BlogPostsHorizontal: Gi,
  BlogPostsVertical: Oi,
  EmbedLemmy: ot,
  EmbedMailchimpSubscribe: it,
  HeaderCard: gs,
  HorizontalCard: $e,
  HorizontalContainer: Ee,
  ImageGallery: nt,
  JSONTable: tt,
  VerticalCard: ge,
  VerticalContainer: de,
  VpvArticleHeader: gr,
  VpvArticleList: br,
  VpvCardHorizontal: $e,
  VpvCardVertical: ge,
  VpvContainerHorizontal: Ee,
  VpvContainerVertical: de,
  VpvEmbedLemmy: ot,
  VpvEmbedMailchimp: it,
  VpvImage: bt,
  VpvImageGallery: nt,
  VpvTableJSON: tt
}, Symbol.toStringTag, { value: "Module" }));
var xs = 8;
var Ts = Object.freeze(Object.defineProperty({
  __proto__: null,
  TEST_VALUE: xs
}, Symbol.toStringTag, { value: "Module" }));
function ks(t2) {
  const e = ws;
  for (const a in e)
    t2.component(a, e[a]);
}
var Ls = { install: ks };
export {
  cs as BlogPostHeader,
  bs as BlogPostList,
  Gi as BlogPostsHorizontal,
  Oi as BlogPostsVertical,
  ot as EmbedLemmy,
  it as EmbedMailchimpSubscribe,
  gs as HeaderCard,
  $e as HorizontalCard,
  Ee as HorizontalContainer,
  nt as ImageGallery,
  tt as JSONTable,
  Ts as MyConstants,
  ge as VerticalCard,
  de as VerticalContainer,
  gr as VpvArticleHeader,
  br as VpvArticleList,
  $e as VpvCardHorizontal,
  ge as VpvCardVertical,
  Ee as VpvContainerHorizontal,
  de as VpvContainerVertical,
  ot as VpvEmbedLemmy,
  it as VpvEmbedMailchimp,
  bt as VpvImage,
  nt as VpvImageGallery,
  tt as VpvTableJSON,
  Ls as default,
  ke as formatDate,
  _e as useDeprecationWarning
};
/*! Bundled license information:

@cynber/vitepress-valence/dist/vitepress-valence.es.js:
  (*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom *)
*/
//# sourceMappingURL=@cynber_vitepress-valence.js.map
