var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/ui/builds/module.js
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// packages/ui/src/dialog.js
function dialog_default(Alpine2) {
  Alpine2.directive("dialog", (el, directive2) => {
    if (directive2.value === "overlay")
      handleOverlay(el, Alpine2);
    else if (directive2.value === "panel")
      handlePanel(el, Alpine2);
    else if (directive2.value === "title")
      handleTitle(el, Alpine2);
    else if (directive2.value === "description")
      handleDescription(el, Alpine2);
    else
      handleRoot(el, Alpine2);
  });
  Alpine2.magic("dialog", (el) => {
    let $data = Alpine2.$data(el);
    return {
      // Kept here for legacy. Remove after out of beta.
      get open() {
        return $data.__isOpen;
      },
      get isOpen() {
        return $data.__isOpen;
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot(el, Alpine2) {
  Alpine2.bind(el, {
    "x-data"() {
      return {
        init() {
          Alpine2.bound(el, "open") !== void 0 && Alpine2.effect(() => {
            this.__isOpenState = Alpine2.bound(el, "open");
          });
          if (Alpine2.bound(el, "initial-focus") !== void 0)
            this.$watch("__isOpenState", () => {
              if (!this.__isOpenState)
                return;
              setTimeout(() => {
                Alpine2.bound(el, "initial-focus").focus();
              }, 0);
            });
        },
        __isOpenState: false,
        __close() {
          if (Alpine2.bound(el, "open"))
            this.$dispatch("close");
          else
            this.__isOpenState = false;
        },
        get __isOpen() {
          return Alpine2.bound(el, "static", this.__isOpenState);
        }
      };
    },
    "x-modelable": "__isOpenState",
    "x-id"() {
      return ["alpine-dialog-title", "alpine-dialog-description"];
    },
    "x-show"() {
      return this.__isOpen;
    },
    "x-trap.inert.noscroll"() {
      return this.__isOpen;
    },
    "@keydown.escape"() {
      this.__close();
    },
    ":aria-labelledby"() {
      return this.$id("alpine-dialog-title");
    },
    ":aria-describedby"() {
      return this.$id("alpine-dialog-description");
    },
    "role": "dialog",
    "aria-modal": "true"
  });
}
function handleOverlay(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$data.__isOpen === void 0)
        console.warn('"x-dialog:overlay" is missing a parent element with "x-dialog".');
    },
    "x-show"() {
      return this.__isOpen;
    },
    "@click.prevent.stop"() {
      this.$data.__close();
    }
  });
}
function handlePanel(el, Alpine2) {
  Alpine2.bind(el, {
    "@click.outside"() {
      this.$data.__close();
    },
    "x-show"() {
      return this.$data.__isOpen;
    }
  });
}
function handleTitle(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$data.__isOpen === void 0)
        console.warn('"x-dialog:title" is missing a parent element with "x-dialog".');
    },
    ":id"() {
      return this.$id("alpine-dialog-title");
    }
  });
}
function handleDescription(el, Alpine2) {
  Alpine2.bind(el, {
    ":id"() {
      return this.$id("alpine-dialog-description");
    }
  });
}

// packages/ui/src/disclosure.js
function disclosure_default(Alpine2) {
  Alpine2.directive("disclosure", (el, directive2) => {
    if (!directive2.value)
      handleRoot2(el, Alpine2);
    else if (directive2.value === "panel")
      handlePanel2(el, Alpine2);
    else if (directive2.value === "button")
      handleButton(el, Alpine2);
  }).before("bind");
  Alpine2.magic("disclosure", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isOpen() {
        return $data.__isOpen;
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__isOpen",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            let defaultIsOpen = Boolean(Alpine2.bound(this.$el, "default-open", false));
            if (defaultIsOpen)
              this.__isOpen = defaultIsOpen;
          });
        },
        __isOpen: false,
        __close() {
          this.__isOpen = false;
        },
        __toggle() {
          this.__isOpen = !this.__isOpen;
        }
      };
    },
    "x-id"() {
      return ["alpine-disclosure-panel"];
    }
  });
}
function handleButton(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "@click"() {
      this.$data.__isOpen = !this.$data.__isOpen;
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.$id("alpine-disclosure-panel");
    },
    "@keydown.space.prevent.stop"() {
      this.$data.__toggle();
    },
    "@keydown.enter.prevent.stop"() {
      this.$data.__toggle();
    },
    // Required for firefox, event.preventDefault() in handleKeyDown for
    // the Space key doesn't cancel the handleKeyUp, which in turn
    // triggers a *click*.
    "@keyup.space.prevent"() {
    }
  });
}
function handlePanel2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-show"() {
      return this.$data.__isOpen;
    },
    ":id"() {
      return this.$data.$id("alpine-disclosure-panel");
    }
  });
}

// packages/alpinejs/src/scheduler.js
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback) {
  queueJob(callback);
}
function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}
function queueFlush() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}

// packages/alpinejs/src/reactivity.js
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback) => engine.effect(callback, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup = () => {
  };
  let wrappedEffect = (callback) => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */ new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup = () => {
      if (effectReference === void 0)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup();
  }];
}

// packages/alpinejs/src/mutation.js
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
  onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
}
function onAttributesAdded(callback) {
  onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var recordQueue = [];
var willProcessRecordQueue = false;
function flushObserver() {
  recordQueue = recordQueue.concat(observer.takeRecords());
  if (recordQueue.length && !willProcessRecordQueue) {
    willProcessRecordQueue = true;
    queueMicrotask(() => {
      processRecordQueue();
      willProcessRecordQueue = false;
    });
  }
}
function processRecordQueue() {
  onMutate(recordQueue);
  recordQueue.length = 0;
}
function mutateDom(callback) {
  if (!currentlyObserving)
    return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = [];
  let removedNodes = [];
  let addedAttributes = /* @__PURE__ */ new Map();
  let removedAttributes = /* @__PURE__ */ new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.push(node));
      mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.push(node));
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add();
      } else if (el.hasAttribute(name)) {
        remove();
        add();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.includes(node))
      continue;
    onElRemoveds.forEach((i) => i(node));
    if (node._x_cleanups) {
      while (node._x_cleanups.length)
        node._x_cleanups.pop()();
    }
  }
  addedNodes.forEach((node) => {
    node._x_ignoreSelf = true;
    node._x_ignore = true;
  });
  for (let node of addedNodes) {
    if (removedNodes.includes(node))
      continue;
    if (!node.isConnected)
      continue;
    delete node._x_ignoreSelf;
    delete node._x_ignore;
    onElAddeds.forEach((i) => i(node));
    node._x_ignore = true;
    node._x_ignoreSelf = true;
  }
  addedNodes.forEach((node) => {
    delete node._x_ignoreSelf;
    delete node._x_ignore;
  });
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}

// packages/alpinejs/src/scope.js
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
}
function closestDataStack(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  let thisProxy = new Proxy({}, {
    ownKeys: () => {
      return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
    },
    has: (target, name) => {
      return objects.some((obj) => obj.hasOwnProperty(name));
    },
    get: (target, name) => {
      return (objects.find((obj) => {
        if (obj.hasOwnProperty(name)) {
          let descriptor = Object.getOwnPropertyDescriptor(obj, name);
          if (descriptor.get && descriptor.get._x_alreadyBound || descriptor.set && descriptor.set._x_alreadyBound) {
            return true;
          }
          if ((descriptor.get || descriptor.set) && descriptor.enumerable) {
            let getter = descriptor.get;
            let setter = descriptor.set;
            let property = descriptor;
            getter = getter && getter.bind(thisProxy);
            setter = setter && setter.bind(thisProxy);
            if (getter)
              getter._x_alreadyBound = true;
            if (setter)
              setter._x_alreadyBound = true;
            Object.defineProperty(obj, name, {
              ...property,
              get: getter,
              set: setter
            });
          }
          return true;
        }
        return false;
      }) || {})[name];
    },
    set: (target, name, value) => {
      let closestObjectWithKey = objects.find((obj) => obj.hasOwnProperty(name));
      if (closestObjectWithKey) {
        closestObjectWithKey[name] = value;
      } else {
        objects[objects.length - 1][name] = value;
      }
      return true;
    }
  });
  return thisProxy;
}

// packages/alpinejs/src/interceptor.js
function initInterceptors(data2) {
  let isObject = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === void 0)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback, mutateObj = () => {
}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}

// packages/alpinejs/src/magics.js
var magics = {};
function magic(name, callback) {
  magics[name] = callback;
}
function injectMagics(obj, el) {
  Object.entries(magics).forEach(([name, callback]) => {
    Object.defineProperty(obj, `$${name}`, {
      get() {
        let [utilities, cleanup] = getElementBoundUtilities(el);
        utilities = { interceptor, ...utilities };
        onElRemoved(el, cleanup);
        return callback(el, utilities);
      },
      enumerable: false
    });
  });
  return obj;
}

// packages/alpinejs/src/utils/error.js
function tryCatch(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(error2, el, expression = void 0) {
  Object.assign(error2, { el, expression });
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}

// packages/alpinejs/src/evaluator.js
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  callback();
  shouldAutoEvaluateFunctions = cache;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)\s/.test(expression) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      return new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
}

// packages/alpinejs/src/directives.js
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
  isDeferringHandlers = true;
  let key = Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup = (callback) => cleanups.push(callback);
  let [effect2, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect2,
    cleanup,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {
  };
  let handler = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler.inline && handler.inline(el, directive2, utilities);
    handler = handler.bind(handler, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler) : handler();
  };
  fullHandler.runCleanups = cleanup;
  return fullHandler;
}
function toTransformedAttributes(callback = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback(newName, name);
    return { name: newName, value: newValue };
  };
}
var attributeTransformers = [];
function mapAttributes(callback) {
  attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name }) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}

// packages/alpinejs/src/utils/dispatch.js
function dispatch(el, name, detail = {}) {
  el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      // Allows events to pass the shadow DOM barrier.
      composed: true,
      cancelable: true
    })
  );
}

// packages/alpinejs/src/utils/walk.js
function walk(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
}

// packages/alpinejs/src/utils/warn.js
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}

// packages/alpinejs/src/lifecycle.js
function start() {
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle) => handle());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, (element) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element.matches(selector)))
      return true;
  });
}
function findClosest(el, callback) {
  if (!el)
    return;
  if (callback(el))
    return el;
  if (el._x_teleportBack)
    el = el._x_teleportBack;
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback);
}
function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
  initInterceptors2.push(callback);
}
function initTree(el, walker = walk, intercept = () => {
}) {
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle) => handle());
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root) {
  walk(root, (el) => cleanupAttributes(el));
}

// packages/alpinejs/src/nextTick.js
var tickStack = [];
var isHolding = false;
function nextTick(callback = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res) => {
    tickStack.push(() => {
      callback();
      res();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}

// packages/alpinejs/src/utils/classes.js
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
  let split = (classString2) => classString2.split(" ").filter(Boolean);
  let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let split = (classString) => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
}

// packages/alpinejs/src/utils/styles.js
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// packages/alpinejs/src/utils/once.js
function once(callback, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}

// packages/alpinejs/src/directives/x-transition.js
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (!expression) {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    "leave": (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay = modifierValue(modifiers, "delay", 0);
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: delay,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: delay,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren)
        closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      ;
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay);
      reachedEnd = true;
    });
  });
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}

// packages/alpinejs/src/clone.js
var isCloning = false;
function skipDuringClone(callback, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
  return (...args) => isCloning && callback(...args);
}
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {
    };
  });
  callback();
  overrideEffect(cache);
}

// packages/alpinejs/src/utils/bind.js
function isBooleanAttr(attrName) {
  const booleanAttributes = [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ];
  return booleanAttributes.includes(attrName);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}

// packages/alpinejs/src/utils/debounce.js
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// packages/alpinejs/src/utils/throttle.js
function throttle(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// packages/alpinejs/src/plugin.js
function plugin(callback) {
  callback(alpine_default);
}

// packages/alpinejs/src/store.js
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
  initInterceptors(stores[name]);
}

// packages/alpinejs/src/binds.js
var binds = {};
function bind(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle) => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
}

// packages/alpinejs/src/datas.js
var datas = {};
function data(name, callback) {
  datas[name] = callback;
}

// packages/alpinejs/src/alpine.js
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.12.0",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  findClosest,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  bound: getBinding,
  $data: scope,
  walk,
  data,
  bind
};
var alpine_default = Alpine;

// packages/ui/src/list-context.js
function generateContext(multiple, orientation) {
  return {
    /**
     * Main state...
     */
    searchableText: {},
    disabledKeys: [],
    activeKey: null,
    selectedKeys: [],
    orderedKeys: [],
    elsByKey: {},
    values: {},
    /**
     *  Initialization...
     */
    initItem(el, value, disabled) {
      let key = (Math.random() + 1).toString(36).substring(7);
      this.values[key] = value;
      this.elsByKey[key] = el;
      this.orderedKeys.push(key);
      this.searchableText[key] = el.textContent.trim().toLowerCase();
      disabled && this.disabledKeys.push(key);
      return key;
    },
    destroyItem(el) {
      let key = keyByValue(this.elsByKey, el);
      delete this.values[key];
      delete this.elsByKey[key];
      delete this.orderedKeys[this.orderedKeys.indexOf(key)];
      delete this.searchableText[key];
      delete this.disabledKeys[key];
      this.reorderKeys();
    },
    /**
     * Handle elements...
     */
    reorderKeys() {
      this.orderedKeys.forEach((key) => {
        let el = this.elsByKey[key];
        if (el.isConnected)
          return;
        this.destroyItem(el);
      });
      this.orderedKeys = this.orderedKeys.slice().sort((a, z) => {
        if (a === null || z === null)
          return 0;
        let aEl = this.elsByKey[a];
        let zEl = this.elsByKey[z];
        let position = aEl.compareDocumentPosition(zEl);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING)
          return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING)
          return 1;
        return 0;
      });
    },
    activeEl() {
      if (!this.activeKey)
        return;
      return this.elsByKey[this.activeKey];
    },
    isActiveEl(el) {
      let key = keyByValue(this.elsByKey, el);
      if (!key)
        return;
      return this.activeKey === key;
    },
    activateEl(el) {
      let key = keyByValue(this.elsByKey, el);
      if (!key)
        return;
      this.activateKey(key);
    },
    selectEl(el) {
      let key = keyByValue(this.elsByKey, el);
      if (!key)
        return;
      this.selectKey(key);
    },
    isSelectedEl(el) {
      let key = keyByValue(this.elsByKey, el);
      if (!key)
        return;
      return this.isSelected(key);
    },
    isDisabledEl(el) {
      let key = keyByValue(this.elsByKey, el);
      if (!key)
        return;
      return this.isDisabled(key);
    },
    get isScrollingTo() {
      return this.scrollingCount > 0;
    },
    scrollingCount: 0,
    activateAndScrollToKey(key) {
      this.scrollingCount++;
      this.activateKey(key);
      let targetEl = this.elsByKey[key];
      targetEl.scrollIntoView({ block: "nearest" });
      setTimeout(() => {
        this.scrollingCount--;
      }, 25);
    },
    /**
     * Handle values...
     */
    selectedValueOrValues() {
      if (multiple) {
        return this.selectedValues();
      } else {
        return this.selectedValue();
      }
    },
    selectedValues() {
      return this.selectedKeys.map((i) => this.values[i]);
    },
    selectedValue() {
      return this.selectedKeys[0] ? this.values[this.selectedKeys[0]] : null;
    },
    selectValue(value, by) {
      if (!value)
        value = multiple ? [] : null;
      if (!by)
        by = (a, b) => a === b;
      if (typeof by === "string") {
        let property = by;
        by = (a, b) => a[property] === b[property];
      }
      if (multiple) {
        let keys = [];
        value.forEach((i) => {
          for (let key in this.values) {
            if (by(this.values[key], i)) {
              if (!keys.includes(key)) {
                keys.push(key);
              }
            }
          }
        });
        this.selectExclusive(keys);
      } else {
        for (let key in this.values) {
          if (value && by(this.values[key], value)) {
            this.selectKey(key);
          }
        }
      }
    },
    /**
     * Handle disabled keys...
     */
    isDisabled(key) {
      return this.disabledKeys.includes(key);
    },
    get nonDisabledOrderedKeys() {
      return this.orderedKeys.filter((i) => !this.isDisabled(i));
    },
    /**
     * Handle selected keys...
     */
    selectKey(key) {
      if (this.isDisabled(key))
        return;
      if (multiple) {
        this.toggleSelected(key);
      } else {
        this.selectOnly(key);
      }
    },
    toggleSelected(key) {
      if (this.selectedKeys.includes(key)) {
        this.selectedKeys.splice(this.selectedKeys.indexOf(key), 1);
      } else {
        this.selectedKeys.push(key);
      }
    },
    selectOnly(key) {
      this.selectedKeys = [];
      this.selectedKeys.push(key);
    },
    selectExclusive(keys) {
      let toAdd = [...keys];
      for (let i = 0; i < this.selectedKeys.length; i++) {
        if (keys.includes(this.selectedKeys[i])) {
          delete toAdd[toAdd.indexOf(this.selectedKeys[i])];
          continue;
        }
        if (!keys.includes(this.selectedKeys[i])) {
          delete this.selectedKeys[i];
        }
      }
      toAdd.forEach((i) => {
        this.selectedKeys.push(i);
      });
    },
    selectActive(key) {
      if (!this.activeKey)
        return;
      this.selectKey(this.activeKey);
    },
    isSelected(key) {
      return this.selectedKeys.includes(key);
    },
    firstSelectedKey() {
      return this.selectedKeys[0];
    },
    /**
     * Handle activated keys...
     */
    hasActive() {
      return !!this.activeKey;
    },
    isActiveKey(key) {
      return this.activeKey === key;
    },
    get active() {
      return this.hasActive() && this.values[this.activeKey];
    },
    activateSelectedOrFirst() {
      let firstSelected = this.firstSelectedKey();
      if (firstSelected) {
        return this.activateKey(firstSelected);
      }
      let firstKey = this.firstKey();
      if (firstKey) {
        this.activateKey(firstKey);
      }
    },
    activateKey(key) {
      if (this.isDisabled(key))
        return;
      this.activeKey = key;
    },
    deactivate() {
      if (!this.activeKey)
        return;
      if (this.isScrollingTo)
        return;
      this.activeKey = null;
    },
    /**
     * Handle active key traveral...
     */
    nextKey() {
      if (!this.activeKey)
        return;
      let index = this.nonDisabledOrderedKeys.findIndex((i) => i === this.activeKey);
      return this.nonDisabledOrderedKeys[index + 1];
    },
    prevKey() {
      if (!this.activeKey)
        return;
      let index = this.nonDisabledOrderedKeys.findIndex((i) => i === this.activeKey);
      return this.nonDisabledOrderedKeys[index - 1];
    },
    firstKey() {
      return this.nonDisabledOrderedKeys[0];
    },
    lastKey() {
      return this.nonDisabledOrderedKeys[this.nonDisabledOrderedKeys.length - 1];
    },
    searchQuery: "",
    clearSearch: alpine_default.debounce(function() {
      this.searchQuery = "";
    }, 350),
    searchKey(query) {
      this.clearSearch();
      this.searchQuery += query;
      let foundKey;
      for (let key in this.searchableText) {
        let content = this.searchableText[key];
        if (content.startsWith(this.searchQuery)) {
          foundKey = key;
          break;
        }
      }
      if (!this.nonDisabledOrderedKeys.includes(foundKey))
        return;
      return foundKey;
    },
    activateByKeyEvent(e) {
      this.reorderKeys();
      let hasActive = this.hasActive();
      let targetKey;
      switch (e.key) {
        case "Tab":
        case "Backspace":
        case "Delete":
        case "Meta":
          break;
          break;
        case ["ArrowDown", "ArrowRight"][orientation === "vertical" ? 0 : 1]:
          e.preventDefault();
          e.stopPropagation();
          targetKey = hasActive ? this.nextKey() : this.firstKey();
          break;
        case ["ArrowUp", "ArrowLeft"][orientation === "vertical" ? 0 : 1]:
          e.preventDefault();
          e.stopPropagation();
          targetKey = hasActive ? this.prevKey() : this.lastKey();
          break;
        case "Home":
        case "PageUp":
          e.preventDefault();
          e.stopPropagation();
          targetKey = this.firstKey();
          break;
        case "End":
        case "PageDown":
          e.preventDefault();
          e.stopPropagation();
          targetKey = this.lastKey();
          break;
        default:
          if (e.key.length === 1) {
            targetKey = this.searchKey(e.key);
          }
          break;
      }
      if (targetKey) {
        this.activateAndScrollToKey(targetKey);
      }
    }
  };
}
function keyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
function renderHiddenInputs(el, name, value) {
  let newInputs = generateInputs(name, value);
  newInputs.forEach((i) => i._x_hiddenInput = true);
  newInputs.forEach((i) => i._x_ignore = true);
  let children = el.children;
  let oldInputs = [];
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child._x_hiddenInput)
      oldInputs.push(child);
    else
      break;
  }
  alpine_default.mutateDom(() => {
    oldInputs.forEach((i) => i.remove());
    newInputs.reverse().forEach((i) => el.prepend(i));
  });
}
function generateInputs(name, value, carry = []) {
  if (isObjectOrArray(value)) {
    for (let key in value) {
      carry = carry.concat(
        generateInputs(`${name}[${key}]`, value[key])
      );
    }
  } else {
    let el = document.createElement("input");
    el.setAttribute("type", "hidden");
    el.setAttribute("name", name);
    el.setAttribute("value", "" + value);
    return [el];
  }
  return carry;
}
function isObjectOrArray(subject) {
  return typeof subject === "object" && subject !== null;
}

// packages/ui/src/listbox.js
function listbox_default(Alpine2) {
  Alpine2.directive("listbox", (el, directive2) => {
    if (!directive2.value)
      handleRoot3(el, Alpine2);
    else if (directive2.value === "label")
      handleLabel(el, Alpine2);
    else if (directive2.value === "button")
      handleButton2(el, Alpine2);
    else if (directive2.value === "options")
      handleOptions(el, Alpine2);
    else if (directive2.value === "option")
      handleOption(el, Alpine2);
  }).before("bind");
  Alpine2.magic("listbox", (el) => {
    let data2 = Alpine2.$data(el);
    if (!data2.__ready)
      return {
        isDisabled: false,
        isOpen: false,
        selected: null,
        active: null
      };
    return {
      get isOpen() {
        return data2.__isOpen;
      },
      get isDisabled() {
        return data2.__isDisabled;
      },
      get selected() {
        return data2.__value;
      },
      get active() {
        return data2.__context.active;
      }
    };
  });
  Alpine2.magic("listboxOption", (el) => {
    let data2 = Alpine2.$data(el);
    let stub = {
      isDisabled: false,
      isSelected: false,
      isActive: false
    };
    if (!data2.__ready)
      return stub;
    let optionEl = Alpine2.findClosest(el, (i) => i.__optionKey);
    if (!optionEl)
      return stub;
    let context = data2.__context;
    return {
      get isActive() {
        return context.isActiveEl(optionEl);
      },
      get isSelected() {
        return context.isSelectedEl(optionEl);
      },
      get isDisabled() {
        return context.isDisabledEl(optionEl);
      }
    };
  });
}
function handleRoot3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-listbox-button", "alpine-listbox-options", "alpine-listbox-label"];
    },
    "x-modelable": "__value",
    "x-data"() {
      return {
        __ready: false,
        __value: null,
        __isOpen: false,
        __context: void 0,
        __isMultiple: void 0,
        __isStatic: false,
        __isDisabled: void 0,
        __compareBy: null,
        __inputName: null,
        __orientation: "vertical",
        init() {
          this.__isMultiple = Alpine2.bound(el, "multiple", false);
          this.__isDisabled = Alpine2.bound(el, "disabled", false);
          this.__inputName = Alpine2.bound(el, "name", null);
          this.__compareBy = Alpine2.bound(el, "by");
          this.__orientation = Alpine2.bound(el, "horizontal", false) ? "horizontal" : "vertical";
          this.__context = generateContext(this.__isMultiple, this.__orientation);
          let defaultValue = Alpine2.bound(el, "default-value", null);
          this.__value = defaultValue;
          queueMicrotask(() => {
            this.__ready = true;
            queueMicrotask(() => {
              let lastValueFingerprint = false;
              Alpine2.effect(() => {
                this.__context.selectedKeys;
                if (lastValueFingerprint === false || lastValueFingerprint !== JSON.stringify(this.__value)) {
                  this.__context.selectValue(this.__value, this.__compareBy);
                } else {
                  this.__value = this.__context.selectedValueOrValues();
                }
                lastValueFingerprint = JSON.stringify(this.__value);
                this.__inputName && renderHiddenInputs(this.$el, this.__inputName, this.__value);
              });
            });
          });
        },
        __open() {
          this.__isOpen = true;
          this.__context.activateSelectedOrFirst();
          let nextTick2 = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));
          nextTick2(() => this.$refs.__options.focus({ preventScroll: true }));
        },
        __close() {
          this.__isOpen = false;
          this.$nextTick(() => this.$refs.__button.focus({ preventScroll: true }));
        }
      };
    }
  });
}
function handleLabel(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__label",
    ":id"() {
      return this.$id("alpine-listbox-label");
    },
    "@click"() {
      this.$refs.__button.focus({ preventScroll: true });
    }
  });
}
function handleButton2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__button",
    ":id"() {
      return this.$id("alpine-listbox-button");
    },
    "aria-haspopup": "true",
    ":aria-labelledby"() {
      return this.$id("alpine-listbox-label");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-listbox-options");
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "@click"() {
      this.$data.__open();
    },
    "@keydown"(e) {
      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.stopPropagation();
        e.preventDefault();
        this.$data.__open();
      }
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__open();
    }
  });
}
function handleOptions(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__options",
    ":id"() {
      return this.$id("alpine-listbox-options");
    },
    "x-init"() {
      this.$data.__isStatic = Alpine2.bound(this.$el, "static", false);
    },
    "x-show"() {
      return this.$data.__isStatic ? true : this.$data.__isOpen;
    },
    "@click.outside"() {
      this.$data.__close();
    },
    "@keydown.escape.stop.prevent"() {
      this.$data.__close();
    },
    tabindex: "0",
    "role": "listbox",
    ":aria-orientation"() {
      return this.$data.__orientation;
    },
    ":aria-labelledby"() {
      return this.$id("alpine-listbox-button");
    },
    ":aria-activedescendant"() {
      return this.__context.activeEl() && this.__context.activeEl().id;
    },
    "@focus"() {
      this.__context.activateSelectedOrFirst();
    },
    "x-trap"() {
      return this.$data.__isOpen;
    },
    "@keydown"(e) {
      this.__context.activateByKeyEvent(e);
    },
    "@keydown.enter.stop.prevent"() {
      this.__context.selectActive();
      this.$data.__isMultiple || this.$data.__close();
    },
    "@keydown.space.stop.prevent"() {
      this.__context.selectActive();
      this.$data.__isMultiple || this.$data.__close();
    }
  });
}
function handleOption(el, Alpine2) {
  Alpine2.bind(el, () => {
    return {
      ":id"() {
        return this.$id("alpine-listbox-option");
      },
      ":tabindex"() {
        return this.$listbox.isDisabled ? false : "-1";
      },
      "role": "option",
      "x-init"() {
        queueMicrotask(() => {
          let value = Alpine2.bound(el, "value");
          let disabled = Alpine2.bound(el, "disabled");
          el.__optionKey = this.$data.__context.initItem(el, value, disabled);
        });
      },
      ":aria-selected"() {
        return this.$listboxOption.isSelected;
      },
      "@click"() {
        if (this.$listboxOption.isDisabled)
          return;
        this.$data.__context.selectEl(el);
        this.$data.__isMultiple || this.$data.__close();
      },
      "@mousemove"() {
        this.$data.__context.activateEl(el);
      },
      "@mouseleave"() {
        this.$data.__context.deactivate();
      }
    };
  });
}

// packages/ui/src/popover.js
function popover_default(Alpine2) {
  Alpine2.directive("popover", (el, directive2) => {
    if (!directive2.value)
      handleRoot4(el, Alpine2);
    else if (directive2.value === "overlay")
      handleOverlay2(el, Alpine2);
    else if (directive2.value === "button")
      handleButton3(el, Alpine2);
    else if (directive2.value === "panel")
      handlePanel3(el, Alpine2);
    else if (directive2.value === "group")
      handleGroup(el, Alpine2);
  });
  Alpine2.magic("popover", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isOpen() {
        return $data.__isOpenState;
      },
      open() {
        $data.__open();
      },
      close() {
        $data.__close();
      }
    };
  });
}
function handleRoot4(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-popover-button", "alpine-popover-panel"];
    },
    "x-modelable": "__isOpenState",
    "x-data"() {
      return {
        init() {
          if (this.$data.__groupEl) {
            this.$data.__groupEl.addEventListener("__close-others", ({ detail }) => {
              if (detail.el.isSameNode(this.$el))
                return;
              this.__close(false);
            });
          }
        },
        __buttonEl: void 0,
        __panelEl: void 0,
        __isStatic: false,
        get __isOpen() {
          if (this.__isStatic)
            return true;
          return this.__isOpenState;
        },
        __isOpenState: false,
        __open() {
          this.__isOpenState = true;
          this.$dispatch("__close-others", { el: this.$el });
        },
        __toggle() {
          this.__isOpenState ? this.__close() : this.__open();
        },
        __close(el2) {
          if (this.__isStatic)
            return;
          this.__isOpenState = false;
          if (el2 === false)
            return;
          el2 = el2 || this.$data.__buttonEl;
          if (document.activeElement.isSameNode(el2))
            return;
          setTimeout(() => el2.focus());
        },
        __contains(outer, inner) {
          return !!Alpine2.findClosest(inner, (el2) => el2.isSameNode(outer));
        }
      };
    },
    "@keydown.escape.stop.prevent"() {
      this.__close();
    },
    "@focusin.window"() {
      if (this.$data.__groupEl) {
        if (!this.$data.__contains(this.$data.__groupEl, document.activeElement)) {
          this.$data.__close(false);
        }
        return;
      }
      if (!this.$data.__contains(this.$el, document.activeElement)) {
        this.$data.__close(false);
      }
    }
  });
}
function handleButton3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "button",
    ":id"() {
      return this.$id("alpine-popover-button");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-popover-panel");
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
      this.$data.__buttonEl = this.$el;
    },
    "@click"() {
      this.$data.__toggle();
    },
    "@keydown.tab"(e) {
      if (!e.shiftKey && this.$data.__isOpen) {
        let firstFocusableEl = this.$focus.within(this.$data.__panelEl).getFirst();
        if (firstFocusableEl) {
          e.preventDefault();
          e.stopPropagation();
          this.$focus.focus(firstFocusableEl);
        }
      }
    },
    "@keyup.tab"(e) {
      if (this.$data.__isOpen) {
        let lastEl = this.$focus.previouslyFocused();
        if (!lastEl)
          return;
        if (
          // Make sure the last focused wasn't part of this popover.
          !this.$data.__buttonEl.contains(lastEl) && !this.$data.__panelEl.contains(lastEl) && (lastEl && this.$el.compareDocumentPosition(lastEl) & Node.DOCUMENT_POSITION_FOLLOWING)
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.$focus.within(this.$data.__panelEl).last();
        }
      }
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__toggle();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__toggle();
    },
    // This is to stop Firefox from firing a "click".
    "@keyup.space.stop.prevent"() {
    }
  });
}
function handlePanel3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__isStatic = Alpine2.bound(this.$el, "static", false);
      this.$data.__panelEl = this.$el;
    },
    "x-effect"() {
      this.$data.__isOpen && Alpine2.bound(el, "focus") && this.$focus.first();
    },
    "x-ref": "panel",
    ":id"() {
      return this.$id("alpine-popover-panel");
    },
    "x-show"() {
      return this.$data.__isOpen;
    },
    "@mousedown.window"($event) {
      if (!this.$data.__isOpen)
        return;
      if (this.$data.__contains(this.$data.__buttonEl, $event.target))
        return;
      if (this.$data.__contains(this.$el, $event.target))
        return;
      if (!this.$focus.focusable($event.target)) {
        this.$data.__close();
      }
    },
    "@keydown.tab"(e) {
      if (e.shiftKey && this.$focus.isFirst(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        Alpine2.bound(el, "focus") ? this.$data.__close() : this.$data.__buttonEl.focus();
      } else if (!e.shiftKey && this.$focus.isLast(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        let els = this.$focus.within(document).all();
        let buttonIdx = els.indexOf(this.$data.__buttonEl);
        let nextEls = els.splice(buttonIdx + 1).filter((el2) => !this.$el.contains(el2));
        nextEls[0].focus();
        Alpine2.bound(el, "focus") && this.$data.__close(false);
      }
    }
  });
}
function handleGroup(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "container",
    "x-data"() {
      return {
        __groupEl: this.$el
      };
    }
  });
}
function handleOverlay2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-show"() {
      return this.$data.__isOpen;
    }
  });
}

// packages/ui/src/menu.js
function menu_default(Alpine2) {
  Alpine2.directive("menu", (el, directive2) => {
    if (!directive2.value)
      handleRoot5(el, Alpine2);
    else if (directive2.value === "items")
      handleItems(el, Alpine2);
    else if (directive2.value === "item")
      handleItem(el, Alpine2);
    else if (directive2.value === "button")
      handleButton4(el, Alpine2);
  }).before("bind");
  Alpine2.magic("menuItem", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isActive() {
        return $data.__activeEl == $data.__itemEl;
      },
      get isDisabled() {
        return el.__isDisabled.value;
      }
    };
  });
}
function handleRoot5(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-menu-button", "alpine-menu-items"];
    },
    "x-modelable": "__isOpen",
    "x-data"() {
      return {
        __itemEls: [],
        __activeEl: null,
        __isOpen: false,
        __open() {
          this.__isOpen = true;
          let nextTick2 = (callback) => requestAnimationFrame(() => requestAnimationFrame(callback));
          nextTick2(() => this.$refs.__items.focus({ preventScroll: true }));
        },
        __close(focusAfter = true) {
          this.__isOpen = false;
          focusAfter && this.$nextTick(() => this.$refs.__button.focus({ preventScroll: true }));
        },
        __contains(outer, inner) {
          return !!Alpine2.findClosest(inner, (el2) => el2.isSameNode(outer));
        }
      };
    },
    "@focusin.window"() {
      if (!this.$data.__contains(this.$el, document.activeElement)) {
        this.$data.__close(false);
      }
    }
  });
}
function handleButton4(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__button",
    "aria-haspopup": "true",
    ":aria-labelledby"() {
      return this.$id("alpine-menu-label");
    },
    ":id"() {
      return this.$id("alpine-menu-button");
    },
    ":aria-expanded"() {
      return this.$data.__isOpen;
    },
    ":aria-controls"() {
      return this.$data.__isOpen && this.$id("alpine-menu-items");
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "@click"() {
      this.$data.__open();
    },
    "@keydown.down.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.up.stop.prevent"() {
      this.$data.__open(dom.Alpine, last);
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__open();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__open();
    }
  });
}
function handleItems(el, Alpine2) {
  Alpine2.bind(el, {
    "x-ref": "__items",
    "aria-orientation": "vertical",
    "role": "menu",
    ":id"() {
      return this.$id("alpine-menu-items");
    },
    ":aria-labelledby"() {
      return this.$id("alpine-menu-button");
    },
    ":aria-activedescendant"() {
      return this.$data.__activeEl && this.$data.__activeEl.id;
    },
    "x-show"() {
      return this.$data.__isOpen;
    },
    "tabindex": "0",
    "@click.outside"() {
      this.$data.__close();
    },
    "@keydown"(e) {
      dom.search(Alpine2, this.$refs.__items, e.key, (el2) => el2.__activate());
    },
    "@keydown.down.stop.prevent"() {
      if (this.$data.__activeEl)
        dom.next(Alpine2, this.$data.__activeEl, (el2) => el2.__activate());
      else
        dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.up.stop.prevent"() {
      if (this.$data.__activeEl)
        dom.previous(Alpine2, this.$data.__activeEl, (el2) => el2.__activate());
      else
        dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.home.stop.prevent"() {
      dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.end.stop.prevent"() {
      dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.page-up.stop.prevent"() {
      dom.first(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.page-down.stop.prevent"() {
      dom.last(Alpine2, this.$refs.__items, (el2) => el2.__activate());
    },
    "@keydown.escape.stop.prevent"() {
      this.$data.__close();
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    "@keydown.enter.stop.prevent"() {
      this.$data.__activeEl && this.$data.__activeEl.click();
    },
    // Required for firefox, event.preventDefault() in handleKeyDown for
    // the Space key doesn't cancel the handleKeyUp, which in turn
    // triggers a *click*.
    "@keyup.space.prevent"() {
    }
  });
}
function handleItem(el, Alpine2) {
  Alpine2.bind(el, () => {
    return {
      "x-data"() {
        return {
          __itemEl: this.$el,
          init() {
            let els = Alpine2.raw(this.$data.__itemEls);
            let inserted = false;
            for (let i = 0; i < els.length; i++) {
              if (els[i].compareDocumentPosition(this.$el) & Node.DOCUMENT_POSITION_PRECEDING) {
                els.splice(i, 0, this.$el);
                inserted = true;
                break;
              }
            }
            if (!inserted)
              els.push(this.$el);
            this.$el.__activate = () => {
              this.$data.__activeEl = this.$el;
              this.$el.scrollIntoView({ block: "nearest" });
            };
            this.$el.__deactivate = () => {
              this.$data.__activeEl = null;
            };
            this.$el.__isDisabled = Alpine2.reactive({ value: false });
            queueMicrotask(() => {
              this.$el.__isDisabled.value = Alpine2.bound(this.$el, "disabled", false);
            });
          },
          destroy() {
            let els = this.$data.__itemEls;
            els.splice(els.indexOf(this.$el), 1);
          }
        };
      },
      "x-id"() {
        return ["alpine-menu-item"];
      },
      ":id"() {
        return this.$id("alpine-menu-item");
      },
      ":tabindex"() {
        return this.$el.__isDisabled.value ? false : "-1";
      },
      "role": "menuitem",
      "@mousemove"() {
        this.$el.__isDisabled.value || this.$menuItem.isActive || this.$el.__activate();
      },
      "@mouseleave"() {
        this.$el.__isDisabled.value || !this.$menuItem.isActive || this.$el.__deactivate();
      }
    };
  });
}
var dom = {
  first(Alpine2, parent, receive = (i) => i, fallback = () => {
  }) {
    let first = Alpine2.$data(parent).__itemEls[0];
    if (!first)
      return fallback();
    if (first.tagName.toLowerCase() === "template") {
      return this.next(Alpine2, first, receive);
    }
    if (first.__isDisabled.value)
      return this.next(Alpine2, first, receive);
    return receive(first);
  },
  last(Alpine2, parent, receive = (i) => i, fallback = () => {
  }) {
    let last2 = Alpine2.$data(parent).__itemEls.slice(-1)[0];
    if (!last2)
      return fallback();
    if (last2.__isDisabled.value)
      return this.previous(Alpine2, last2, receive);
    return receive(last2);
  },
  next(Alpine2, el, receive = (i) => i, fallback = () => {
  }) {
    if (!el)
      return fallback();
    let els = Alpine2.$data(el).__itemEls;
    let next = els[els.indexOf(el) + 1];
    if (!next)
      return fallback();
    if (next.__isDisabled.value || next.tagName.toLowerCase() === "template")
      return this.next(Alpine2, next, receive, fallback);
    return receive(next);
  },
  previous(Alpine2, el, receive = (i) => i, fallback = () => {
  }) {
    if (!el)
      return fallback();
    let els = Alpine2.$data(el).__itemEls;
    let prev = els[els.indexOf(el) - 1];
    if (!prev)
      return fallback();
    if (prev.__isDisabled.value || prev.tagName.toLowerCase() === "template")
      return this.previous(Alpine2, prev, receive, fallback);
    return receive(prev);
  },
  searchQuery: "",
  debouncedClearSearch: void 0,
  clearSearch(Alpine2) {
    if (!this.debouncedClearSearch) {
      this.debouncedClearSearch = Alpine2.debounce(function() {
        this.searchQuery = "";
      }, 350);
    }
    this.debouncedClearSearch();
  },
  search(Alpine2, parent, key, receiver) {
    if (key.length > 1)
      return;
    this.searchQuery += key;
    let els = Alpine2.raw(Alpine2.$data(parent).__itemEls);
    let el = els.find((el2) => {
      return el2.textContent.trim().toLowerCase().startsWith(this.searchQuery);
    });
    el && !el.__isDisabled.value && receiver(el);
    this.clearSearch(Alpine2);
  }
};

// packages/ui/src/switch.js
function switch_default(Alpine2) {
  Alpine2.directive("switch", (el, directive2) => {
    if (directive2.value === "group")
      handleGroup2(el, Alpine2);
    else if (directive2.value === "label")
      handleLabel2(el, Alpine2);
    else if (directive2.value === "description")
      handleDescription2(el, Alpine2);
    else
      handleRoot6(el, Alpine2);
  }).before("bind");
  Alpine2.magic("switch", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isChecked() {
        return $data.__value === true;
      }
    };
  });
}
function handleGroup2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-id"() {
      return ["alpine-switch-label", "alpine-switch-description"];
    },
    "x-data"() {
      return {
        __hasLabel: false,
        __hasDescription: false,
        __switchEl: void 0
      };
    }
  });
}
function handleRoot6(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__value",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__value = Alpine2.bound(this.$el, "default-checked", false);
            this.__inputName = Alpine2.bound(this.$el, "name", false);
            this.__inputValue = Alpine2.bound(this.$el, "value", "on");
            this.__inputId = "alpine-switch-" + Date.now();
          });
        },
        __value: void 0,
        __inputName: void 0,
        __inputValue: void 0,
        __inputId: void 0,
        __toggle() {
          this.__value = !this.__value;
        }
      };
    },
    "x-effect"() {
      let value = this.__value;
      if (!this.__inputName)
        return;
      let nextEl = this.$el.nextElementSibling;
      if (nextEl && String(nextEl.id) === String(this.__inputId)) {
        nextEl.remove();
      }
      if (value) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.value = this.__inputValue;
        input.name = this.__inputName;
        input.id = this.__inputId;
        this.$el.after(input);
      }
    },
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
      this.$data.__switchEl = this.$el;
    },
    "role": "switch",
    "tabindex": "0",
    ":aria-checked"() {
      return !!this.__value;
    },
    ":aria-labelledby"() {
      return this.$data.__hasLabel && this.$id("alpine-switch-label");
    },
    ":aria-describedby"() {
      return this.$data.__hasDescription && this.$id("alpine-switch-description");
    },
    "@click.prevent"() {
      this.__toggle();
    },
    "@keyup"(e) {
      if (e.key !== "Tab")
        e.preventDefault();
      if (e.key === " ")
        this.__toggle();
    },
    // This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.
    "@keypress.prevent"() {
    }
  });
}
function handleLabel2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasLabel = true;
    },
    ":id"() {
      return this.$id("alpine-switch-label");
    },
    "@click"() {
      this.$data.__switchEl.click();
      this.$data.__switchEl.focus({ preventScroll: true });
    }
  });
}
function handleDescription2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasDescription = true;
    },
    ":id"() {
      return this.$id("alpine-switch-description");
    }
  });
}

// packages/ui/src/radio.js
function radio_default(Alpine2) {
  Alpine2.directive("radio", (el, directive2) => {
    if (!directive2.value)
      handleRoot7(el, Alpine2);
    else if (directive2.value === "option")
      handleOption2(el, Alpine2);
    else if (directive2.value === "label")
      handleLabel3(el, Alpine2);
    else if (directive2.value === "description")
      handleDescription3(el, Alpine2);
  }).before("bind");
  Alpine2.magic("radioOption", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isActive() {
        return $data.__option === $data.__active;
      },
      get isChecked() {
        return $data.__option === $data.__value;
      },
      get isDisabled() {
        let disabled = $data.__disabled;
        if ($data.__rootDisabled)
          return true;
        return disabled;
      }
    };
  });
}
function handleRoot7(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__value",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__rootDisabled = Alpine2.bound(el, "disabled", false);
            this.__value = Alpine2.bound(this.$el, "default-value", false);
            this.__inputName = Alpine2.bound(this.$el, "name", false);
            this.__inputId = "alpine-radio-" + Date.now();
          });
          this.$nextTick(() => {
            let walker = document.createTreeWalker(
              this.$el,
              NodeFilter.SHOW_ELEMENT,
              {
                acceptNode: (node) => {
                  if (node.getAttribute("role") === "radio")
                    return NodeFilter.FILTER_REJECT;
                  if (node.hasAttribute("role"))
                    return NodeFilter.FILTER_SKIP;
                  return NodeFilter.FILTER_ACCEPT;
                }
              },
              false
            );
            while (walker.nextNode())
              walker.currentNode.setAttribute("role", "none");
          });
        },
        __value: void 0,
        __active: void 0,
        __rootEl: this.$el,
        __optionValues: [],
        __disabledOptions: /* @__PURE__ */ new Set(),
        __optionElsByValue: /* @__PURE__ */ new Map(),
        __hasLabel: false,
        __hasDescription: false,
        __rootDisabled: false,
        __inputName: void 0,
        __inputId: void 0,
        __change(value) {
          if (this.__rootDisabled)
            return;
          this.__value = value;
        },
        __addOption(option, el2, disabled) {
          let options = Alpine2.raw(this.__optionValues);
          let els = options.map((i) => this.__optionElsByValue.get(i));
          let inserted = false;
          for (let i = 0; i < els.length; i++) {
            if (els[i].compareDocumentPosition(el2) & Node.DOCUMENT_POSITION_PRECEDING) {
              options.splice(i, 0, option);
              this.__optionElsByValue.set(option, el2);
              inserted = true;
              break;
            }
          }
          if (!inserted) {
            options.push(option);
            this.__optionElsByValue.set(option, el2);
          }
          disabled && this.__disabledOptions.add(option);
        },
        __isFirstOption(option) {
          return this.__optionValues.indexOf(option) === 0;
        },
        __setActive(option) {
          this.__active = option;
        },
        __focusOptionNext() {
          let option = this.__active;
          let all = this.__optionValues.filter((i) => !this.__disabledOptions.has(i));
          let next = all[this.__optionValues.indexOf(option) + 1];
          next = next || all[0];
          this.__optionElsByValue.get(next).focus();
          this.__change(next);
        },
        __focusOptionPrev() {
          let option = this.__active;
          let all = this.__optionValues.filter((i) => !this.__disabledOptions.has(i));
          let prev = all[all.indexOf(option) - 1];
          prev = prev || all.slice(-1)[0];
          this.__optionElsByValue.get(prev).focus();
          this.__change(prev);
        }
      };
    },
    "x-effect"() {
      let value = this.__value;
      if (!this.__inputName)
        return;
      let nextEl = this.$el.nextElementSibling;
      if (nextEl && String(nextEl.id) === String(this.__inputId)) {
        nextEl.remove();
      }
      if (value) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.value = value;
        input.name = this.__inputName;
        input.id = this.__inputId;
        this.$el.after(input);
      }
    },
    "role": "radiogroup",
    "x-id"() {
      return ["alpine-radio-label", "alpine-radio-description"];
    },
    ":aria-labelledby"() {
      return this.__hasLabel && this.$id("alpine-radio-label");
    },
    ":aria-describedby"() {
      return this.__hasDescription && this.$id("alpine-radio-description");
    },
    "@keydown.up.prevent.stop"() {
      this.__focusOptionPrev();
    },
    "@keydown.left.prevent.stop"() {
      this.__focusOptionPrev();
    },
    "@keydown.down.prevent.stop"() {
      this.__focusOptionNext();
    },
    "@keydown.right.prevent.stop"() {
      this.__focusOptionNext();
    }
  });
}
function handleOption2(el, Alpine2) {
  Alpine2.bind(el, {
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            this.__disabled = Alpine2.bound(el, "disabled", false);
            this.__option = Alpine2.bound(el, "value");
            this.$data.__addOption(this.__option, this.$el, this.__disabled);
          });
        },
        __option: void 0,
        __disabled: false,
        __hasLabel: false,
        __hasDescription: false
      };
    },
    "x-id"() {
      return ["alpine-radio-label", "alpine-radio-description"];
    },
    "role": "radio",
    ":aria-checked"() {
      return this.$radioOption.isChecked;
    },
    ":aria-disabled"() {
      return this.$radioOption.isDisabled;
    },
    ":aria-labelledby"() {
      return this.__hasLabel && this.$id("alpine-radio-label");
    },
    ":aria-describedby"() {
      return this.__hasDescription && this.$id("alpine-radio-description");
    },
    ":tabindex"() {
      if (this.$radioOption.isDisabled)
        return -1;
      if (this.$radioOption.isChecked)
        return 0;
      if (!this.$data.__value && this.$data.__isFirstOption(this.$data.__option))
        return 0;
      return -1;
    },
    "@click"() {
      if (this.$radioOption.isDisabled)
        return;
      this.$data.__change(this.$data.__option);
      this.$el.focus();
    },
    "@focus"() {
      if (this.$radioOption.isDisabled)
        return;
      this.$data.__setActive(this.$data.__option);
    },
    "@blur"() {
      if (this.$data.__active === this.$data.__option)
        this.$data.__setActive(void 0);
    },
    "@keydown.space.stop.prevent"() {
      this.$data.__change(this.$data.__option);
    }
  });
}
function handleLabel3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasLabel = true;
    },
    ":id"() {
      return this.$id("alpine-radio-label");
    }
  });
}
function handleDescription3(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__hasDescription = true;
    },
    ":id"() {
      return this.$id("alpine-radio-description");
    }
  });
}

// packages/ui/src/tabs.js
function tabs_default(Alpine2) {
  Alpine2.directive("tabs", (el, directive2) => {
    if (!directive2.value)
      handleRoot8(el, Alpine2);
    else if (directive2.value === "list")
      handleList(el, Alpine2);
    else if (directive2.value === "tab")
      handleTab(el, Alpine2);
    else if (directive2.value === "panels")
      handlePanels(el, Alpine2);
    else if (directive2.value === "panel")
      handlePanel4(el, Alpine2);
  }).before("bind");
  Alpine2.magic("tab", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isSelected() {
        return $data.__selectedIndex === $data.__tabs.indexOf($data.__tabEl);
      },
      get isDisabled() {
        return $data.__isDisabled;
      }
    };
  });
  Alpine2.magic("panel", (el) => {
    let $data = Alpine2.$data(el);
    return {
      get isSelected() {
        return $data.__selectedIndex === $data.__panels.indexOf($data.__panelEl);
      }
    };
  });
}
function handleRoot8(el, Alpine2) {
  Alpine2.bind(el, {
    "x-modelable": "__selectedIndex",
    "x-data"() {
      return {
        init() {
          queueMicrotask(() => {
            let defaultIndex = this.__selectedIndex || Number(Alpine2.bound(this.$el, "default-index", 0));
            let tabs = this.__activeTabs();
            let clamp = (number, min, max) => Math.min(Math.max(number, min), max);
            this.__selectedIndex = clamp(defaultIndex, 0, tabs.length - 1);
            Alpine2.effect(() => {
              this.__manualActivation = Alpine2.bound(this.$el, "manual", false);
            });
          });
        },
        __tabs: [],
        __panels: [],
        __selectedIndex: null,
        __tabGroupEl: void 0,
        __manualActivation: false,
        __addTab(el2) {
          this.__tabs.push(el2);
        },
        __addPanel(el2) {
          this.__panels.push(el2);
        },
        __selectTab(el2) {
          this.__selectedIndex = this.__tabs.indexOf(el2);
        },
        __activeTabs() {
          return this.__tabs.filter((i) => !i.__disabled);
        }
      };
    }
  });
}
function handleList(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      this.$data.__tabGroupEl = this.$el;
    }
  });
}
function handleTab(el, Alpine2) {
  Alpine2.bind(el, {
    "x-init"() {
      if (this.$el.tagName.toLowerCase() === "button" && !this.$el.hasAttribute("type"))
        this.$el.type = "button";
    },
    "x-data"() {
      return {
        init() {
          this.__tabEl = this.$el;
          this.$data.__addTab(this.$el);
          this.__tabEl.__disabled = Alpine2.bound(this.$el, "disabled", false);
          this.__isDisabled = this.__tabEl.__disabled;
        },
        __tabEl: void 0,
        __isDisabled: false
      };
    },
    "@click"() {
      if (this.$el.__disabled)
        return;
      this.$data.__selectTab(this.$el);
      this.$el.focus();
    },
    "@keydown.enter.prevent.stop"() {
      this.__selectTab(this.$el);
    },
    "@keydown.space.prevent.stop"() {
      this.__selectTab(this.$el);
    },
    "@keydown.home.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    "@keydown.page-up.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).first();
    },
    "@keydown.end.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    "@keydown.page-down.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).last();
    },
    "@keydown.down.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    "@keydown.right.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().next();
    },
    "@keydown.up.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    "@keydown.left.prevent.stop"() {
      this.$focus.within(this.$data.__activeTabs()).withWrapAround().prev();
    },
    ":tabindex"() {
      return this.$tab.isSelected ? 0 : -1;
    },
    "@focus"() {
      if (this.$data.__manualActivation) {
        this.$el.focus();
      } else {
        if (this.$el.__disabled)
          return;
        this.$data.__selectTab(this.$el);
        this.$el.focus();
      }
    }
  });
}
function handlePanels(el, Alpine2) {
  Alpine2.bind(el, {
    //
  });
}
function handlePanel4(el, Alpine2) {
  Alpine2.bind(el, {
    ":tabindex"() {
      return this.$panel.isSelected ? 0 : -1;
    },
    "x-data"() {
      return {
        init() {
          this.__panelEl = this.$el;
          this.$data.__addPanel(this.$el);
        },
        __panelEl: void 0
      };
    },
    "x-show"() {
      return this.$panel.isSelected;
    }
  });
}

// packages/ui/src/index.js
function src_default(Alpine2) {
  dialog_default(Alpine2);
  disclosure_default(Alpine2);
  listbox_default(Alpine2);
  menu_default(Alpine2);
  switch_default(Alpine2);
  popover_default(Alpine2);
  radio_default(Alpine2);
  tabs_default(Alpine2);
}

// packages/ui/builds/module.js
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
