var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// node_modules/@smithy/types/dist-es/endpoint.js
var EndpointURLScheme;
var init_endpoint = __esm({
  "node_modules/@smithy/types/dist-es/endpoint.js"() {
    (function(EndpointURLScheme2) {
      EndpointURLScheme2["HTTP"] = "http";
      EndpointURLScheme2["HTTPS"] = "https";
    })(EndpointURLScheme || (EndpointURLScheme = {}));
  }
});

// node_modules/@smithy/types/dist-es/extensions/checksum.js
var AlgorithmId;
var init_checksum = __esm({
  "node_modules/@smithy/types/dist-es/extensions/checksum.js"() {
    (function(AlgorithmId2) {
      AlgorithmId2["MD5"] = "md5";
      AlgorithmId2["CRC32"] = "crc32";
      AlgorithmId2["CRC32C"] = "crc32c";
      AlgorithmId2["SHA1"] = "sha1";
      AlgorithmId2["SHA256"] = "sha256";
    })(AlgorithmId || (AlgorithmId = {}));
  }
});

// node_modules/@smithy/types/dist-es/extensions/index.js
var init_extensions = __esm({
  "node_modules/@smithy/types/dist-es/extensions/index.js"() {
    init_checksum();
  }
});

// node_modules/@smithy/types/dist-es/middleware.js
var SMITHY_CONTEXT_KEY;
var init_middleware = __esm({
  "node_modules/@smithy/types/dist-es/middleware.js"() {
    SMITHY_CONTEXT_KEY = "__smithy_context";
  }
});

// node_modules/@smithy/types/dist-es/index.js
var init_dist_es = __esm({
  "node_modules/@smithy/types/dist-es/index.js"() {
    init_endpoint();
    init_extensions();
    init_middleware();
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/getSmithyContext.js
var getSmithyContext;
var init_getSmithyContext = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/getSmithyContext.js"() {
    init_dist_es();
    getSmithyContext = (context) => context[SMITHY_CONTEXT_KEY] || (context[SMITHY_CONTEXT_KEY] = {});
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/hasOwn.js
function hasOwn(o2, k2) {
  return Object.prototype.hasOwnProperty.call(o2, k2);
}
var init_hasOwn = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/hasOwn.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/httpRequest.js
function cloneQuery(query) {
  return Object.keys(query).reduce((carry, paramName) => {
    const param = query[paramName];
    return {
      ...carry,
      [paramName]: Array.isArray(param) ? [...param] : param
    };
  }, {});
}
var HttpRequest;
var init_httpRequest = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/httpRequest.js"() {
    HttpRequest = class _HttpRequest {
      method;
      protocol;
      hostname;
      port;
      path;
      query;
      headers;
      username;
      password;
      fragment;
      body;
      constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
      }
      static clone(request) {
        const cloned = new _HttpRequest({
          ...request,
          headers: { ...request.headers }
        });
        if (cloned.query) {
          cloned.query = cloneQuery(cloned.query);
        }
        return cloned;
      }
      static isInstance(request) {
        if (!request) {
          return false;
        }
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
      }
      clone() {
        return _HttpRequest.clone(this);
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/httpResponse.js
var HttpResponse;
var init_httpResponse = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/httpResponse.js"() {
    HttpResponse = class {
      statusCode;
      reason;
      headers;
      body;
      constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
      }
      static isInstance(response) {
        if (!response)
          return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/isValidHostLabel.js
var VALID_HOST_LABEL_REGEX, isValidHostLabel;
var init_isValidHostLabel = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/isValidHostLabel.js"() {
    VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
    isValidHostLabel = (value, allowSubDomains = false) => {
      if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
      }
      const labels = value.split(".");
      for (const label of labels) {
        if (!isValidHostLabel(label)) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/isValidHostname.js
function isValidHostname(hostname) {
  const hostPattern = /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/;
  return hostPattern.test(hostname);
}
var init_isValidHostname = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/isValidHostname.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/normalizeProvider.js
var normalizeProvider;
var init_normalizeProvider = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/normalizeProvider.js"() {
    normalizeProvider = (input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/parseQueryString.js
function parseQueryString(querystring) {
  const query = {};
  querystring = querystring.replace(/^\?/, "");
  if (querystring) {
    for (const pair of querystring.split("&")) {
      let [key, value = null] = pair.split("=");
      key = decodeURIComponent(key);
      if (value) {
        value = decodeURIComponent(value);
      }
      if (!(key in query)) {
        query[key] = value;
      } else if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    }
  }
  return query;
}
var init_parseQueryString = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/parseQueryString.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/parseUrl.js
var parseUrl;
var init_parseUrl = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/parseUrl.js"() {
    init_parseQueryString();
    parseUrl = (url) => {
      if (typeof url === "string") {
        return parseUrl(new URL(url));
      }
      const { hostname, pathname, port, protocol, search } = url;
      let query;
      if (search) {
        query = parseQueryString(search);
      }
      return {
        hostname,
        port: port ? parseInt(port) : void 0,
        protocol,
        path: pathname,
        query
      };
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/toEndpointV1.js
var toEndpointV1;
var init_toEndpointV1 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/toEndpointV1.js"() {
    init_hasOwn();
    init_parseUrl();
    toEndpointV1 = (endpoint) => {
      if (typeof endpoint === "object") {
        if ("url" in endpoint) {
          const v1Endpoint = parseUrl(endpoint.url);
          if (endpoint.headers) {
            v1Endpoint.headers = {};
            for (const name in endpoint.headers) {
              if (!hasOwn(endpoint.headers, name))
                continue;
              v1Endpoint.headers[name.toLowerCase()] = endpoint.headers[name].join(", ");
            }
          }
          return v1Endpoint;
        }
        return endpoint;
      }
      return parseUrl(endpoint);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/transport/index.js
var init_transport = __esm({
  "node_modules/@smithy/core/dist-es/submodules/transport/index.js"() {
    init_getSmithyContext();
    init_hasOwn();
    init_httpRequest();
    init_httpResponse();
    init_isValidHostLabel();
    init_isValidHostname();
    init_normalizeProvider();
    init_parseUrl();
    init_toEndpointV1();
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/deref.js
var deref;
var init_deref = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/deref.js"() {
    deref = (schemaRef) => {
      if (typeof schemaRef === "function") {
        return schemaRef();
      }
      return schemaRef;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/schemas/operation.js
var operation;
var init_operation = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/schemas/operation.js"() {
    operation = (namespace, name, traits, input, output) => ({
      name,
      namespace,
      traits,
      input,
      output
    });
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaDeserializationMiddleware.js
var schemaDeserializationMiddleware, findHeader;
var init_schemaDeserializationMiddleware = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaDeserializationMiddleware.js"() {
    init_transport();
    init_operation();
    schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
      const { response } = await next(args);
      const { operationSchema } = getSmithyContext(context);
      const [, ns, n2, t8, i2, o2] = operationSchema ?? [];
      try {
        const parsed = await config.protocol.deserializeResponse(operation(ns, n2, t8, i2, o2), {
          ...config,
          ...context
        }, response);
        return {
          response,
          output: parsed
        };
      } catch (error) {
        Object.defineProperty(error, "$response", {
          value: response,
          enumerable: false,
          writable: false,
          configurable: false
        });
        if (!("$metadata" in error)) {
          const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
          try {
            error.message += "\n  " + hint;
          } catch (ignored) {
            if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
              console.warn(hint);
            } else {
              context.logger?.warn?.(hint);
            }
          }
          if (typeof error.$responseBodyText !== "undefined") {
            if (error.$response) {
              error.$response.body = error.$responseBodyText;
            }
          }
          try {
            if (HttpResponse.isInstance(response)) {
              const { headers = {}, statusCode } = response;
              const headerEntries = Object.entries(headers);
              error.$metadata = {
                httpStatusCode: statusCode,
                requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
                extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
                cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
              };
            }
          } catch (ignored) {
          }
        }
        throw error;
      }
    };
    findHeader = (pattern, headers) => {
      return (headers.find(([k2]) => {
        return k2.match(pattern);
      }) || [void 0, void 0])[1];
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaSerializationMiddleware.js
var schemaSerializationMiddleware;
var init_schemaSerializationMiddleware = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/middleware/schemaSerializationMiddleware.js"() {
    init_transport();
    init_operation();
    schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
      const { operationSchema } = getSmithyContext(context);
      const [, ns, n2, t8, i2, o2] = operationSchema ?? [];
      const endpoint = context.endpointV2 ? async () => toEndpointV1(context.endpointV2) : config.endpoint;
      const request = await config.protocol.serializeRequest(operation(ns, n2, t8, i2, o2), args.input, {
        ...config,
        ...context,
        endpoint
      });
      return next({
        ...args,
        request
      });
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/middleware/getSchemaSerdePlugin.js
function getSchemaSerdePlugin(config) {
  return {
    applyToStack: (commandStack) => {
      commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
      commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
      config.protocol.setSerdeContext(config);
    }
  };
}
var deserializerMiddlewareOption, serializerMiddlewareOption;
var init_getSchemaSerdePlugin = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/middleware/getSchemaSerdePlugin.js"() {
    init_schemaDeserializationMiddleware();
    init_schemaSerializationMiddleware();
    deserializerMiddlewareOption = {
      name: "deserializerMiddleware",
      step: "deserialize",
      tags: ["DESERIALIZER"],
      override: true
    };
    serializerMiddlewareOption = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: true
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/schemas/translateTraits.js
function translateTraits(indicator) {
  if (typeof indicator === "object") {
    return indicator;
  }
  indicator = indicator | 0;
  if (traitsCache[indicator]) {
    return traitsCache[indicator];
  }
  const traits = {};
  let i2 = 0;
  for (const trait of [
    "httpLabel",
    "idempotent",
    "idempotencyToken",
    "sensitive",
    "httpPayload",
    "httpResponseCode",
    "httpQueryParams"
  ]) {
    if ((indicator >> i2++ & 1) === 1) {
      traits[trait] = 1;
    }
  }
  return traitsCache[indicator] = traits;
}
var traitsCache;
var init_translateTraits = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/schemas/translateTraits.js"() {
    traitsCache = [];
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js
function member(memberSchema, memberName) {
  if (memberSchema instanceof NormalizedSchema) {
    return Object.assign(memberSchema, {
      memberName,
      _isMemberSchema: true
    });
  }
  const internalCtorAccess = NormalizedSchema;
  return new internalCtorAccess(memberSchema, memberName);
}
var anno, simpleSchemaCacheN, simpleSchemaCacheS, NormalizedSchema, isMemberSchema, isStaticSchema;
var init_NormalizedSchema = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js"() {
    init_deref();
    init_translateTraits();
    anno = {
      it: Symbol.for("@smithy/nor-struct-it"),
      ns: Symbol.for("@smithy/ns")
    };
    simpleSchemaCacheN = [];
    simpleSchemaCacheS = {};
    NormalizedSchema = class _NormalizedSchema {
      ref;
      memberName;
      static symbol = Symbol.for("@smithy/nor");
      symbol = _NormalizedSchema.symbol;
      name;
      schema;
      _isMemberSchema;
      traits;
      memberTraits;
      normalizedTraits;
      constructor(ref, memberName) {
        this.ref = ref;
        this.memberName = memberName;
        const traitStack = [];
        let _ref = ref;
        let schema = ref;
        this._isMemberSchema = false;
        while (isMemberSchema(_ref)) {
          traitStack.push(_ref[1]);
          _ref = _ref[0];
          schema = deref(_ref);
          this._isMemberSchema = true;
        }
        if (traitStack.length > 0) {
          this.memberTraits = {};
          for (let i2 = traitStack.length - 1; i2 >= 0; --i2) {
            const traitSet = traitStack[i2];
            Object.assign(this.memberTraits, translateTraits(traitSet));
          }
        } else {
          this.memberTraits = 0;
        }
        if (schema instanceof _NormalizedSchema) {
          const computedMemberTraits = this.memberTraits;
          Object.assign(this, schema);
          this.memberTraits = Object.assign({}, computedMemberTraits, schema.getMemberTraits(), this.getMemberTraits());
          this.normalizedTraits = void 0;
          this.memberName = memberName ?? schema.memberName;
          return;
        }
        this.schema = deref(schema);
        if (isStaticSchema(this.schema)) {
          this.name = `${this.schema[1]}#${this.schema[2]}`;
          this.traits = this.schema[3];
        } else {
          this.name = this.memberName ?? String(schema);
          this.traits = 0;
        }
        if (this._isMemberSchema && !memberName) {
          throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
        }
      }
      static [Symbol.hasInstance](lhs) {
        const isPrototype = this.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
          const ns = lhs;
          return ns.symbol === this.symbol;
        }
        return isPrototype;
      }
      static of(ref) {
        const keyAble = typeof ref === "function" || typeof ref === "object" && ref !== null;
        if (typeof ref === "number") {
          if (simpleSchemaCacheN[ref]) {
            return simpleSchemaCacheN[ref];
          }
        } else if (typeof ref === "string") {
          if (simpleSchemaCacheS[ref]) {
            return simpleSchemaCacheS[ref];
          }
        } else if (keyAble) {
          if (ref[anno.ns]) {
            return ref[anno.ns];
          }
        }
        const sc = deref(ref);
        if (sc instanceof _NormalizedSchema) {
          return sc;
        }
        if (isMemberSchema(sc)) {
          const [ns2, traits] = sc;
          if (ns2 instanceof _NormalizedSchema) {
            Object.assign(ns2.getMergedTraits(), translateTraits(traits));
            return ns2;
          }
          throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
        }
        const ns = new _NormalizedSchema(sc);
        if (keyAble) {
          return ref[anno.ns] = ns;
        }
        if (typeof sc === "string") {
          return simpleSchemaCacheS[sc] = ns;
        }
        if (typeof sc === "number") {
          return simpleSchemaCacheN[sc] = ns;
        }
        return ns;
      }
      getSchema() {
        const sc = this.schema;
        if (Array.isArray(sc) && sc[0] === 0) {
          return sc[4];
        }
        return sc;
      }
      getName(withNamespace = false) {
        const { name } = this;
        const short = !withNamespace && name && name.includes("#");
        return short ? name.split("#")[1] : name || void 0;
      }
      getMemberName() {
        return this.memberName;
      }
      isMemberSchema() {
        return this._isMemberSchema;
      }
      isListSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" ? sc >= 64 && sc < 128 : sc[0] === 1;
      }
      isMapSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" ? sc >= 128 && sc <= 255 : sc[0] === 2;
      }
      isStructSchema() {
        const sc = this.getSchema();
        if (typeof sc !== "object") {
          return false;
        }
        const id = sc[0];
        return id === 3 || id === -3 || id === 4;
      }
      isUnionSchema() {
        const sc = this.getSchema();
        if (typeof sc !== "object") {
          return false;
        }
        return sc[0] === 4;
      }
      isBlobSchema() {
        const sc = this.getSchema();
        return sc === 21 || sc === 42;
      }
      isTimestampSchema() {
        const sc = this.getSchema();
        return typeof sc === "number" && sc >= 4 && sc <= 7;
      }
      isUnitSchema() {
        return this.getSchema() === "unit";
      }
      isDocumentSchema() {
        return this.getSchema() === 15;
      }
      isStringSchema() {
        return this.getSchema() === 0;
      }
      isBooleanSchema() {
        return this.getSchema() === 2;
      }
      isNumericSchema() {
        return this.getSchema() === 1;
      }
      isBigIntegerSchema() {
        return this.getSchema() === 17;
      }
      isBigDecimalSchema() {
        return this.getSchema() === 19;
      }
      isStreaming() {
        const { streaming } = this.getMergedTraits();
        return !!streaming || this.getSchema() === 42;
      }
      isIdempotencyToken() {
        return !!this.getMergedTraits().idempotencyToken;
      }
      getMergedTraits() {
        return this.normalizedTraits ?? (this.normalizedTraits = {
          ...this.getOwnTraits(),
          ...this.getMemberTraits()
        });
      }
      getMemberTraits() {
        return translateTraits(this.memberTraits);
      }
      getOwnTraits() {
        return translateTraits(this.traits);
      }
      getKeySchema() {
        const [isDoc, isMap] = [this.isDocumentSchema(), this.isMapSchema()];
        if (!isDoc && !isMap) {
          throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
        }
        const schema = this.getSchema();
        const memberSchema = isDoc ? 15 : schema[4] ?? 0;
        return member([memberSchema, 0], "key");
      }
      getValueSchema() {
        const sc = this.getSchema();
        const [isDoc, isMap, isList] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()];
        const memberSchema = typeof sc === "number" ? 63 & sc : sc && typeof sc === "object" && (isMap || isList) ? sc[3 + sc[0]] : isDoc ? 15 : void 0;
        if (memberSchema != null) {
          return member([memberSchema, 0], isMap ? "value" : "member");
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
      }
      getMemberSchema(memberName) {
        const struct = this.getSchema();
        if (this.isStructSchema() && struct[4].includes(memberName)) {
          const i2 = struct[4].indexOf(memberName);
          const memberSchema = struct[5][i2];
          return member(isMemberSchema(memberSchema) ? memberSchema : [memberSchema, 0], memberName);
        }
        if (this.isDocumentSchema()) {
          return member([15, 0], memberName);
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no member=${memberName}.`);
      }
      getMemberSchemas() {
        const buffer = {};
        try {
          for (const [k2, v2] of this.structIterator()) {
            buffer[k2] = v2;
          }
        } catch (ignored) {
        }
        return buffer;
      }
      getEventStreamMember() {
        if (this.isStructSchema()) {
          for (const [memberName, memberSchema] of this.structIterator()) {
            if (memberSchema.isStreaming() && memberSchema.isStructSchema()) {
              return memberName;
            }
          }
        }
        return "";
      }
      *structIterator() {
        if (this.isUnitSchema()) {
          return;
        }
        if (!this.isStructSchema()) {
          throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
        }
        const struct = this.getSchema();
        const z2 = struct[4].length;
        let it = struct[anno.it];
        if (it && z2 === it.length) {
          yield* it;
          return;
        }
        it = Array(z2);
        for (let i2 = 0; i2 < z2; ++i2) {
          const k2 = struct[4][i2];
          const v2 = member([struct[5][i2], 0], k2);
          yield it[i2] = [k2, v2];
        }
        struct[anno.it] = it;
      }
    };
    isMemberSchema = (sc) => Array.isArray(sc) && sc.length === 2;
    isStaticSchema = (sc) => Array.isArray(sc) && sc.length >= 5;
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js
var TypeRegistry;
var init_TypeRegistry = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js"() {
    TypeRegistry = class _TypeRegistry {
      namespace;
      schemas;
      exceptions;
      static registries = /* @__PURE__ */ new Map();
      constructor(namespace, schemas = /* @__PURE__ */ new Map(), exceptions = /* @__PURE__ */ new Map()) {
        this.namespace = namespace;
        this.schemas = schemas;
        this.exceptions = exceptions;
      }
      static for(namespace) {
        if (!_TypeRegistry.registries.has(namespace)) {
          _TypeRegistry.registries.set(namespace, new _TypeRegistry(namespace));
        }
        return _TypeRegistry.registries.get(namespace);
      }
      copyFrom(other) {
        const { schemas, exceptions } = this;
        for (const [k2, v2] of other.schemas) {
          if (!schemas.has(k2)) {
            schemas.set(k2, v2);
          }
        }
        for (const [k2, v2] of other.exceptions) {
          if (!exceptions.has(k2)) {
            exceptions.set(k2, v2);
          }
        }
      }
      register(shapeId, schema) {
        const qualifiedName = this.normalizeShapeId(shapeId);
        for (const r2 of [this, _TypeRegistry.for(qualifiedName.split("#")[0])]) {
          r2.schemas.set(qualifiedName, schema);
        }
      }
      getSchema(shapeId) {
        const id = this.normalizeShapeId(shapeId);
        if (!this.schemas.has(id)) {
          if (!shapeId.includes("#")) {
            const suffix = "#" + shapeId;
            const candidates = [];
            for (const [shapeId2, schema] of this.schemas.entries()) {
              if (shapeId2.endsWith(suffix)) {
                candidates.push(schema);
              }
            }
            if (candidates.length === 1) {
              return candidates[0];
            }
          }
          throw new Error(`@smithy/core/schema - schema not found for ${id}`);
        }
        return this.schemas.get(id);
      }
      registerError(es, ctor) {
        const $error = es;
        const ns = $error[1];
        for (const r2 of [this, _TypeRegistry.for(ns)]) {
          r2.schemas.set(ns + "#" + $error[2], $error);
          r2.exceptions.set($error, ctor);
        }
      }
      getErrorCtor(es) {
        const $error = es;
        if (this.exceptions.has($error)) {
          return this.exceptions.get($error);
        }
        const registry = _TypeRegistry.for($error[1]);
        return registry.exceptions.get($error);
      }
      getBaseException() {
        for (const exceptionKey of this.exceptions.keys()) {
          if (Array.isArray(exceptionKey)) {
            const [, ns, name] = exceptionKey;
            const id = ns + "#" + name;
            if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
              return exceptionKey;
            }
          }
        }
        return void 0;
      }
      find(predicate) {
        for (const schema of this.schemas.values()) {
          if (predicate(schema)) {
            return schema;
          }
        }
        return void 0;
      }
      clear() {
        this.schemas.clear();
        this.exceptions.clear();
      }
      normalizeShapeId(shapeId) {
        if (shapeId.includes("#")) {
          return shapeId;
        }
        return this.namespace + "#" + shapeId;
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/schema/index.js
var init_schema = __esm({
  "node_modules/@smithy/core/dist-es/submodules/schema/index.js"() {
    init_getSchemaSerdePlugin();
    init_NormalizedSchema();
    init_translateTraits();
    init_TypeRegistry();
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-base64/constants-for-browser.js
var chars, alphabetByEncoding, alphabetByValue, bitsPerLetter, bitsPerByte, maxLetterValue;
var init_constants_for_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-base64/constants-for-browser.js"() {
    chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`;
    alphabetByEncoding = Object.entries(chars).reduce((acc, [i2, c2]) => {
      acc[c2] = Number(i2);
      return acc;
    }, {});
    alphabetByValue = chars.split("");
    bitsPerLetter = 6;
    bitsPerByte = 8;
    maxLetterValue = 63;
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-base64/fromBase64.browser.js
var fromBase64;
var init_fromBase64_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-base64/fromBase64.browser.js"() {
    init_constants_for_browser();
    fromBase64 = (input) => {
      let totalByteLength = input.length / 4 * 3;
      if (input.slice(-2) === "==") {
        totalByteLength -= 2;
      } else if (input.slice(-1) === "=") {
        totalByteLength--;
      }
      const out = new ArrayBuffer(totalByteLength);
      const dataView = new DataView(out);
      for (let i2 = 0; i2 < input.length; i2 += 4) {
        let bits = 0;
        let bitLength = 0;
        for (let j2 = i2, limit = i2 + 3; j2 <= limit; j2++) {
          if (input[j2] !== "=") {
            if (!(input[j2] in alphabetByEncoding)) {
              throw new TypeError(`Invalid character ${input[j2]} in base64 string.`);
            }
            bits |= alphabetByEncoding[input[j2]] << (limit - j2) * bitsPerLetter;
            bitLength += bitsPerLetter;
          } else {
            bits >>= bitsPerLetter;
          }
        }
        const chunkOffset = i2 / 4 * 3;
        bits >>= bitLength % bitsPerByte;
        const byteLength = Math.floor(bitLength / bitsPerByte);
        for (let k2 = 0; k2 < byteLength; k2++) {
          const offset = (byteLength - k2 - 1) * bitsPerByte;
          dataView.setUint8(chunkOffset + k2, (bits & 255 << offset) >> offset);
        }
      }
      return new Uint8Array(out);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/fromUtf8.browser.js
var fromUtf8;
var init_fromUtf8_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/fromUtf8.browser.js"() {
    fromUtf8 = (input) => new TextEncoder().encode(input);
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-base64/toBase64.browser.js
function toBase64(_input) {
  let input;
  if (typeof _input === "string") {
    input = fromUtf8(_input);
  } else {
    input = _input;
  }
  const isArrayLike = typeof input === "object" && typeof input.length === "number";
  const isUint8Array = typeof input === "object" && typeof input.byteOffset === "number" && typeof input.byteLength === "number";
  if (!isArrayLike && !isUint8Array) {
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  }
  let str = "";
  for (let i2 = 0; i2 < input.length; i2 += 3) {
    let bits = 0;
    let bitLength = 0;
    for (let j2 = i2, limit = Math.min(i2 + 3, input.length); j2 < limit; j2++) {
      bits |= input[j2] << (limit - j2 - 1) * bitsPerByte;
      bitLength += bitsPerByte;
    }
    const bitClusterCount = Math.ceil(bitLength / bitsPerLetter);
    bits <<= bitClusterCount * bitsPerLetter - bitLength;
    for (let k2 = 1; k2 <= bitClusterCount; k2++) {
      const offset = (bitClusterCount - k2) * bitsPerLetter;
      str += alphabetByValue[(bits & maxLetterValue << offset) >> offset];
    }
    str += "==".slice(0, 4 - bitClusterCount);
  }
  return str;
}
var init_toBase64_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-base64/toBase64.browser.js"() {
    init_fromUtf8_browser();
    init_constants_for_browser();
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/blob/Uint8ArrayBlobAdapter.js
function bindUint8ArrayBlobAdapter(toUtf82, fromUtf82, toBase642, fromBase642) {
  return class Uint8ArrayBlobAdapter2 extends Uint8Array {
    static fromString(source, encoding = "utf-8") {
      if (typeof source === "string") {
        if (encoding === "base64") {
          return Uint8ArrayBlobAdapter2.mutate(fromBase642(source));
        }
        return Uint8ArrayBlobAdapter2.mutate(fromUtf82(source));
      }
      throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
    }
    static mutate(source) {
      Object.setPrototypeOf(source, Uint8ArrayBlobAdapter2.prototype);
      return source;
    }
    transformToString(encoding = "utf-8") {
      if (encoding === "base64") {
        return toBase642(this);
      }
      return toUtf82(this);
    }
  };
}
var init_Uint8ArrayBlobAdapter = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/blob/Uint8ArrayBlobAdapter.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUtf8.browser.js
var toUtf8;
var init_toUtf8_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUtf8.browser.js"() {
    toUtf8 = (input) => {
      if (typeof input === "string") {
        return input;
      }
      if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      }
      return new TextDecoder("utf-8").decode(input);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/uuid/v4.js
function bindV4(getRandomValues) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return () => crypto.randomUUID();
  }
  return () => {
    const rnds = new Uint8Array(16);
    getRandomValues(rnds);
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    return decimalToHex[rnds[0]] + decimalToHex[rnds[1]] + decimalToHex[rnds[2]] + decimalToHex[rnds[3]] + "-" + decimalToHex[rnds[4]] + decimalToHex[rnds[5]] + "-" + decimalToHex[rnds[6]] + decimalToHex[rnds[7]] + "-" + decimalToHex[rnds[8]] + decimalToHex[rnds[9]] + "-" + decimalToHex[rnds[10]] + decimalToHex[rnds[11]] + decimalToHex[rnds[12]] + decimalToHex[rnds[13]] + decimalToHex[rnds[14]] + decimalToHex[rnds[15]];
  };
}
var decimalToHex;
var init_v4 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/uuid/v4.js"() {
    decimalToHex = Array.from({ length: 256 }, (_, i2) => i2.toString(16).padStart(2, "0"));
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js
var expectNumber, MAX_FLOAT, expectFloat32, expectLong, expectShort, expectByte, expectSizedInt, castInt, strictParseFloat32, NUMBER_REGEX, parseNumber, strictParseShort, strictParseByte, stackTraceWarning, logger;
var init_parse_utils = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js"() {
    expectNumber = (value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
          if (String(parsed) !== String(value)) {
            logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
          }
          return parsed;
        }
      }
      if (typeof value === "number") {
        return value;
      }
      throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
    };
    MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
    expectFloat32 = (value) => {
      const expected = expectNumber(value);
      if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
          throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
      }
      return expected;
    };
    expectLong = (value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
      }
      throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
    };
    expectShort = (value) => expectSizedInt(value, 16);
    expectByte = (value) => expectSizedInt(value, 8);
    expectSizedInt = (value, size) => {
      const expected = expectLong(value);
      if (expected !== void 0 && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
      }
      return expected;
    };
    castInt = (value, size) => {
      switch (size) {
        case 32:
          return Int32Array.of(value)[0];
        case 16:
          return Int16Array.of(value)[0];
        case 8:
          return Int8Array.of(value)[0];
      }
    };
    strictParseFloat32 = (value) => {
      if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
      }
      return expectFloat32(value);
    };
    NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
    parseNumber = (value) => {
      const matches = value.match(NUMBER_REGEX);
      if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
      }
      return parseFloat(value);
    };
    strictParseShort = (value) => {
      if (typeof value === "string") {
        return expectShort(parseNumber(value));
      }
      return expectShort(value);
    };
    strictParseByte = (value) => {
      if (typeof value === "string") {
        return expectByte(parseNumber(value));
      }
      return expectByte(value);
    };
    stackTraceWarning = (message) => {
      return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s2) => !s2.includes("stackTraceWarning")).join("\n");
    };
    logger = {
      warn: console.warn
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js
function dateToUtcString(date2) {
  const year2 = date2.getUTCFullYear();
  const month = date2.getUTCMonth();
  const dayOfWeek = date2.getUTCDay();
  const dayOfMonthInt = date2.getUTCDate();
  const hoursInt = date2.getUTCHours();
  const minutesInt = date2.getUTCMinutes();
  const secondsInt = date2.getUTCSeconds();
  const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
  const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
  const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
  const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
  return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year2} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
var DAYS, MONTHS, RFC3339, RFC3339_WITH_OFFSET, IMF_FIXDATE, RFC_850_DATE, ASC_TIME, parseRfc7231DateTime, buildDate, parseTwoDigitYear, FIFTY_YEARS_IN_MILLIS, adjustRfc850Year, parseMonthByShortName, DAYS_IN_MONTH, validateDayOfMonth, isLeapYear, parseDateValue, parseMilliseconds, stripLeadingZeroes;
var init_date_utils = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js"() {
    init_parse_utils();
    DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
    RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}:\d{2})|[zZ])$/);
    IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
    RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
    ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
    parseRfc7231DateTime = (value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
      }
      let match = IMF_FIXDATE.exec(value);
      if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
      }
      match = RFC_850_DATE.exec(value);
      if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
          hours,
          minutes,
          seconds,
          fractionalMilliseconds
        }));
      }
      match = ASC_TIME.exec(value);
      if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
      }
      throw new TypeError("Invalid RFC-7231 date-time value");
    };
    buildDate = (year2, month, day, time2) => {
      const adjustedMonth = month - 1;
      validateDayOfMonth(year2, adjustedMonth, day);
      return new Date(Date.UTC(year2, adjustedMonth, day, parseDateValue(time2.hours, "hour", 0, 23), parseDateValue(time2.minutes, "minute", 0, 59), parseDateValue(time2.seconds, "seconds", 0, 60), parseMilliseconds(time2.fractionalMilliseconds)));
    };
    parseTwoDigitYear = (value) => {
      const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
      const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
      if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
      }
      return valueInThisCentury;
    };
    FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
    adjustRfc850Year = (input) => {
      if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
      }
      return input;
    };
    parseMonthByShortName = (value) => {
      const monthIdx = MONTHS.indexOf(value);
      if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
      }
      return monthIdx + 1;
    };
    DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    validateDayOfMonth = (year2, month, day) => {
      let maxDays = DAYS_IN_MONTH[month];
      if (month === 1 && isLeapYear(year2)) {
        maxDays = 29;
      }
      if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year2}: ${day}`);
      }
    };
    isLeapYear = (year2) => {
      return year2 % 4 === 0 && (year2 % 100 !== 0 || year2 % 400 === 0);
    };
    parseDateValue = (value, type, lower, upper) => {
      const dateVal = strictParseByte(stripLeadingZeroes(value));
      if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
      }
      return dateVal;
    };
    parseMilliseconds = (value) => {
      if (value === null || value === void 0) {
        return 0;
      }
      return strictParseFloat32("0." + value) * 1e3;
    };
    stripLeadingZeroes = (value) => {
      let idx = 0;
      while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
      }
      if (idx === 0) {
        return value;
      }
      return value.slice(idx);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/lazy-json.js
var LazyJsonString;
var init_lazy_json = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/lazy-json.js"() {
    LazyJsonString = function LazyJsonString2(val) {
      const str = Object.assign(new String(val), {
        deserializeJSON() {
          return JSON.parse(String(val));
        },
        toString() {
          return String(val);
        },
        toJSON() {
          return String(val);
        }
      });
      return str;
    };
    LazyJsonString.from = (object) => {
      if (object && typeof object === "object" && (object instanceof LazyJsonString || "deserializeJSON" in object)) {
        return object;
      } else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) {
        return LazyJsonString(String(object));
      }
      return LazyJsonString(JSON.stringify(object));
    };
    LazyJsonString.fromObject = LazyJsonString.from;
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/quote-header.js
function quoteHeader(part) {
  if (part.includes(",") || part.includes('"')) {
    part = `"${part.replace(/"/g, '\\"')}"`;
  }
  return part;
}
var init_quote_header = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/quote-header.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/schema-serde-lib/schema-date-utils.js
function range(v2, min, max) {
  const _v = Number(v2);
  if (_v < min || _v > max) {
    throw new Error(`Value ${_v} out of range [${min}, ${max}]`);
  }
}
var ddd, mmm, time, date, year, RFC3339_WITH_OFFSET2, IMF_FIXDATE2, RFC_850_DATE2, ASC_TIME2, months, _parseEpochTimestamp, _parseRfc3339DateTimeWithOffset, _parseRfc7231DateTime;
var init_schema_date_utils = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/schema-serde-lib/schema-date-utils.js"() {
    ddd = `(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?`;
    mmm = `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
    time = `(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?`;
    date = `(\\d?\\d)`;
    year = `(\\d{4})`;
    RFC3339_WITH_OFFSET2 = new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/);
    IMF_FIXDATE2 = new RegExp(`^${ddd}, ${date} ${mmm} ${year} ${time} GMT$`);
    RFC_850_DATE2 = new RegExp(`^${ddd}, ${date}-${mmm}-(\\d\\d) ${time} GMT$`);
    ASC_TIME2 = new RegExp(`^${ddd} ${mmm} ( [1-9]|\\d\\d) ${time} ${year}$`);
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    _parseEpochTimestamp = (value) => {
      if (value == null) {
        return void 0;
      }
      let num = NaN;
      if (typeof value === "number") {
        num = value;
      } else if (typeof value === "string") {
        if (!/^-?\d*\.?\d+$/.test(value)) {
          throw new TypeError(`parseEpochTimestamp - numeric string invalid.`);
        }
        num = Number.parseFloat(value);
      } else if (typeof value === "object" && value.tag === 1) {
        num = value.value;
      }
      if (isNaN(num) || Math.abs(num) === Infinity) {
        throw new TypeError("Epoch timestamps must be valid finite numbers.");
      }
      return new Date(Math.round(num * 1e3));
    };
    _parseRfc3339DateTimeWithOffset = (value) => {
      if (value == null) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC3339 timestamps must be strings");
      }
      const matches = RFC3339_WITH_OFFSET2.exec(value);
      if (!matches) {
        throw new TypeError(`Invalid RFC3339 timestamp format ${value}`);
      }
      const [, yearStr, monthStr, dayStr, hours, minutes, seconds, , ms, offsetStr] = matches;
      range(monthStr, 1, 12);
      range(dayStr, 1, 31);
      range(hours, 0, 23);
      range(minutes, 0, 59);
      range(seconds, 0, 60);
      const date2 = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), Number(hours), Number(minutes), Number(seconds), Number(ms) ? Math.round(parseFloat(`0.${ms}`) * 1e3) : 0));
      date2.setUTCFullYear(Number(yearStr));
      if (offsetStr.toUpperCase() != "Z") {
        const [, sign2, offsetH, offsetM] = /([+-])(\d\d):(\d\d)/.exec(offsetStr) || [void 0, "+", 0, 0];
        const scalar = sign2 === "-" ? 1 : -1;
        date2.setTime(date2.getTime() + scalar * (Number(offsetH) * 60 * 60 * 1e3 + Number(offsetM) * 60 * 1e3));
      }
      return date2;
    };
    _parseRfc7231DateTime = (value) => {
      if (value == null) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC7231 timestamps must be strings.");
      }
      let day;
      let month;
      let year2;
      let hour;
      let minute;
      let second;
      let fraction;
      let matches;
      if (matches = IMF_FIXDATE2.exec(value)) {
        [, day, month, year2, hour, minute, second, fraction] = matches;
      } else if (matches = RFC_850_DATE2.exec(value)) {
        [, day, month, year2, hour, minute, second, fraction] = matches;
        year2 = (Number(year2) + 1900).toString();
      } else if (matches = ASC_TIME2.exec(value)) {
        [, month, day, hour, minute, second, fraction, year2] = matches;
      }
      if (year2 && second) {
        const timestamp = Date.UTC(Number(year2), months.indexOf(month), Number(day), Number(hour), Number(minute), Number(second), fraction ? Math.round(parseFloat(`0.${fraction}`) * 1e3) : 0);
        range(day, 1, 31);
        range(hour, 0, 23);
        range(minute, 0, 59);
        range(second, 0, 60);
        const date2 = new Date(timestamp);
        date2.setUTCFullYear(Number(year2));
        return date2;
      }
      throw new TypeError(`Invalid RFC7231 date-time value ${value}.`);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/split-every.js
function splitEvery(value, delimiter, numDelimiters) {
  if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
    throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
  }
  const segments = value.split(delimiter);
  if (numDelimiters === 1) {
    return segments;
  }
  const compoundSegments = [];
  let currentSegment = "";
  for (let i2 = 0; i2 < segments.length; i2++) {
    if (currentSegment === "") {
      currentSegment = segments[i2];
    } else {
      currentSegment += delimiter + segments[i2];
    }
    if ((i2 + 1) % numDelimiters === 0) {
      compoundSegments.push(currentSegment);
      currentSegment = "";
    }
  }
  if (currentSegment !== "") {
    compoundSegments.push(currentSegment);
  }
  return compoundSegments;
}
var init_split_every = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/split-every.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/split-header.js
var splitHeader;
var init_split_header = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/split-header.js"() {
    splitHeader = (value) => {
      const z2 = value.length;
      const values = [];
      let withinQuotes = false;
      let prevChar = void 0;
      let anchor = 0;
      for (let i2 = 0; i2 < z2; ++i2) {
        const char = value[i2];
        switch (char) {
          case `"`:
            if (prevChar !== "\\") {
              withinQuotes = !withinQuotes;
            }
            break;
          case ",":
            if (!withinQuotes) {
              values.push(value.slice(anchor, i2));
              anchor = i2 + 1;
            }
            break;
          default:
        }
        prevChar = char;
      }
      values.push(value.slice(anchor));
      return values.map((v2) => {
        v2 = v2.trim();
        const z3 = v2.length;
        if (z3 < 2) {
          return v2;
        }
        if (v2[0] === `"` && v2[z3 - 1] === `"`) {
          v2 = v2.slice(1, z3 - 1);
        }
        return v2.replace(/\\"/g, '"');
      });
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/value/NumericValue.js
var format, NumericValue;
var init_NumericValue = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/value/NumericValue.js"() {
    format = /^-?((0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/;
    NumericValue = class _NumericValue {
      string;
      type;
      constructor(string, type) {
        this.string = string;
        this.type = type;
        if (!format.test(string)) {
          throw new Error(`@smithy/core/serde - NumericValue string must conform to the Smithy bigDecimal format. Received: "${string}"`);
        }
      }
      toString() {
        return this.string;
      }
      static [Symbol.hasInstance](object) {
        if (!object || typeof object !== "object") {
          return false;
        }
        const _nv = object;
        return _NumericValue.prototype.isPrototypeOf(object) || _nv.type === "bigDecimal" && format.test(_nv.string);
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-hex-encoding/hex-encoding.js
function fromHex(encoded) {
  if (encoded.length % 2 !== 0) {
    throw new Error("Hex encoded strings must have an even number length");
  }
  const out = new Uint8Array(encoded.length / 2);
  for (let i2 = 0; i2 < encoded.length; i2 += 2) {
    const encodedByte = encoded.slice(i2, i2 + 2).toLowerCase();
    if (encodedByte in HEX_TO_SHORT) {
      out[i2 / 2] = HEX_TO_SHORT[encodedByte];
    } else {
      throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
    }
  }
  return out;
}
function toHex(bytes2) {
  let out = "";
  for (let i2 = 0; i2 < bytes2.byteLength; i2++) {
    out += SHORT_TO_HEX[bytes2[i2]];
  }
  return out;
}
var SHORT_TO_HEX, HEX_TO_SHORT;
var init_hex_encoding = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-hex-encoding/hex-encoding.js"() {
    SHORT_TO_HEX = {};
    HEX_TO_SHORT = {};
    for (let i2 = 0; i2 < 256; i2++) {
      let encodedByte = i2.toString(16).toLowerCase();
      if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
      }
      SHORT_TO_HEX[i2] = encodedByte;
      HEX_TO_SHORT[encodedByte] = i2;
    }
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-body-length/calculateBodyLength.browser.js
var TEXT_ENCODER, calculateBodyLength;
var init_calculateBodyLength_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-body-length/calculateBodyLength.browser.js"() {
    TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder() : null;
    calculateBodyLength = (body) => {
      if (typeof body === "string") {
        if (TEXT_ENCODER) {
          return TEXT_ENCODER.encode(body).byteLength;
        }
        let len = body.length;
        for (let i2 = len - 1; i2 >= 0; i2--) {
          const code = body.charCodeAt(i2);
          if (code > 127 && code <= 2047)
            len++;
          else if (code > 2047 && code <= 65535)
            len += 2;
          if (code >= 56320 && code <= 57343)
            i2--;
        }
        return len;
      } else if (typeof body.byteLength === "number") {
        return body.byteLength;
      } else if (typeof body.size === "number") {
        return body.size;
      }
      throw new Error(`Body Length computation failed for ${body}`);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUint8Array.browser.js
var toUint8Array;
var init_toUint8Array_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-utf8/toUint8Array.browser.js"() {
    init_fromUtf8_browser();
    toUint8Array = (data) => {
      if (data instanceof Uint8Array) {
        return data;
      }
      if (typeof data === "string") {
        return fromUtf8(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/concatBytes.js
function concatBytes(arrays, length) {
  if (length === void 0) {
    length = 0;
    for (const bytes2 of arrays) {
      length += bytes2.byteLength;
    }
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const buf of arrays) {
    result.set(buf, offset);
    offset += buf.byteLength;
  }
  return result;
}
var init_concatBytes = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/concatBytes.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/is-array-buffer/is-array-buffer.js
var isArrayBuffer;
var init_is_array_buffer = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/is-array-buffer/is-array-buffer.js"() {
    isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromConfig.browser.js
var getEndpointFromConfig;
var init_getEndpointFromConfig_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromConfig.browser.js"() {
    getEndpointFromConfig = async (serviceId) => void 0;
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/s3.js
var resolveParamsForS3, DOMAIN_PATTERN, IP_ADDRESS_PATTERN, DOTS_PATTERN, isDnsCompatibleBucketName, isArnBucketName;
var init_s3 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/s3.js"() {
    resolveParamsForS3 = async (endpointParams) => {
      const bucket = endpointParams?.Bucket || "";
      if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
      }
      if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
          throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
      } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
      }
      if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
      }
      return endpointParams;
    };
    DOMAIN_PATTERN = /^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
    IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
    DOTS_PATTERN = /\.\./;
    isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
    isArnBucketName = (bucketName) => {
      const [arn, partition2, service, , , bucket] = bucketName.split(":");
      const isArn = arn === "arn" && bucketName.split(":").length >= 6;
      const isValidArn = Boolean(isArn && partition2 && service && bucket);
      if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
      }
      return isValidArn;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/index.js
var init_service_customizations = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/service-customizations/index.js"() {
    init_s3();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/createConfigValueProvider.js
var createConfigValueProvider;
var init_createConfigValueProvider = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/createConfigValueProvider.js"() {
    createConfigValueProvider = (configKey, canonicalEndpointParamKey, config, isClientContextParam = false) => {
      const configProvider = async () => {
        let configValue;
        if (isClientContextParam) {
          const clientContextParams = config.clientContextParams;
          const nestedValue = clientContextParams?.[configKey];
          configValue = nestedValue ?? config[configKey] ?? config[canonicalEndpointParamKey];
        } else {
          configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        }
        if (typeof configValue === "function") {
          return configValue();
        }
        return configValue;
      };
      if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
          return configValue;
        };
      }
      if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = credentials?.accountId ?? credentials?.AccountId;
          return configValue;
        };
      }
      if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
          if (config.isCustomEndpoint === false) {
            return void 0;
          }
          const endpoint = await configProvider();
          if (endpoint && typeof endpoint === "object") {
            if ("url" in endpoint) {
              return endpoint.url.href;
            }
            if ("hostname" in endpoint) {
              const { protocol, hostname, port, path } = endpoint;
              return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
            }
          }
          return endpoint;
        };
      }
      return configProvider;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/toEndpointV1.js
var init_toEndpointV12 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/toEndpointV1.js"() {
    init_transport();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromInstructions.js
function bindGetEndpointFromInstructions(getEndpointFromConfig2) {
  return async (commandInput, instructionsSupplier, clientConfig, context) => {
    if (!clientConfig.isCustomEndpoint && !clientConfig.ignoreConfiguredEndpointUrls) {
      let endpointFromConfig;
      if (clientConfig.serviceConfiguredEndpoint) {
        endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
      } else {
        endpointFromConfig = await getEndpointFromConfig2(clientConfig.serviceId);
      }
      if (endpointFromConfig) {
        clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
        clientConfig.isCustomEndpoint = true;
        context?.logger?.debug?.(`@smithy/core/endpoints - resolved endpoint from config: ${endpointFromConfig}`);
      }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
      throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    if (clientConfig.isCustomEndpoint && clientConfig.endpoint) {
      const customEndpoint = await clientConfig.endpoint();
      if (customEndpoint?.headers) {
        endpoint.headers ??= {};
        for (const [name, value] of Object.entries(customEndpoint.headers)) {
          endpoint.headers[name] = Array.isArray(value) ? value : [value];
        }
      }
    }
    return endpoint;
  };
}
var resolveParams;
var init_getEndpointFromInstructions = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/adaptors/getEndpointFromInstructions.js"() {
    init_service_customizations();
    init_createConfigValueProvider();
    init_toEndpointV12();
    resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
      const endpointParams = {};
      const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
      for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
          case "staticContextParams":
            endpointParams[name] = instruction.value;
            break;
          case "contextParams":
            endpointParams[name] = commandInput[instruction.name];
            break;
          case "clientContextParams":
          case "builtInParams":
            endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig, instruction.type !== "builtInParams")();
            break;
          case "operationContextParams":
            endpointParams[name] = instruction.get(commandInput);
            break;
          default:
            throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
      }
      if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
      }
      if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
      }
      return endpointParams;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/endpointMiddleware.js
function setFeature(context, feature, value) {
  if (!context.__smithy_context) {
    context.__smithy_context = { features: {} };
  } else if (!context.__smithy_context.features) {
    context.__smithy_context.features = {};
  }
  context.__smithy_context.features[feature] = value;
}
function bindEndpointMiddleware(getEndpointFromConfig2) {
  const getEndpointFromInstructions2 = bindGetEndpointFromInstructions(getEndpointFromConfig2);
  return ({ config, instructions }) => {
    return (next, context) => async (args) => {
      if (config.isCustomEndpoint) {
        setFeature(context, "ENDPOINT_OVERRIDE", "N");
      }
      const endpoint = await getEndpointFromInstructions2(args.input, {
        getEndpointParameterInstructions() {
          return instructions;
        }
      }, { ...config }, context);
      context.endpointV2 = endpoint;
      context.authSchemes = endpoint.properties?.authSchemes;
      const authScheme = context.authSchemes?.[0];
      if (authScheme) {
        context["signing_region"] = authScheme.signingRegion;
        context["signing_service"] = authScheme.signingName;
        const smithyContext = getSmithyContext(context);
        const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
        if (httpAuthOption) {
          httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
            signing_region: authScheme.signingRegion,
            signingRegion: authScheme.signingRegion,
            signing_service: authScheme.signingName,
            signingName: authScheme.signingName,
            signingRegionSet: authScheme.signingRegionSet
          }, authScheme.properties);
        }
      }
      return next({
        ...args
      });
    };
  };
}
var init_endpointMiddleware = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/endpointMiddleware.js"() {
    init_transport();
    init_getEndpointFromInstructions();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/getEndpointPlugin.js
function bindGetEndpointPlugin(getEndpointFromConfig2) {
  const endpointMiddleware2 = bindEndpointMiddleware(getEndpointFromConfig2);
  return (config, instructions) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(endpointMiddleware2({
        config,
        instructions
      }), endpointMiddlewareOptions);
    }
  });
}
var serializerMiddlewareOption2, endpointMiddlewareOptions;
var init_getEndpointPlugin = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/getEndpointPlugin.js"() {
    init_endpointMiddleware();
    serializerMiddlewareOption2 = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: true
    };
    endpointMiddlewareOptions = {
      step: "serialize",
      tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
      name: "endpointV2Middleware",
      override: true,
      relation: "before",
      toMiddleware: serializerMiddlewareOption2.name
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/resolveEndpointConfig.js
function bindResolveEndpointConfig(getEndpointFromConfig2) {
  return (input) => {
    const tls = input.tls ?? true;
    const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
    const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await normalizeProvider(endpoint)()) : void 0;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = Object.assign(input, {
      endpoint: customEndpointProvider,
      tls,
      isCustomEndpoint,
      useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false),
      useFipsEndpoint: normalizeProvider(useFipsEndpoint ?? false),
      ignoreConfiguredEndpointUrls: !!input.ignoreConfiguredEndpointUrls
    });
    let configuredEndpointPromise = void 0;
    resolvedConfig.serviceConfiguredEndpoint = async () => {
      if (input.serviceId && !configuredEndpointPromise) {
        configuredEndpointPromise = getEndpointFromConfig2(input.serviceId);
      }
      return configuredEndpointPromise;
    };
    return resolvedConfig;
  };
}
var init_resolveEndpointConfig = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/middleware-endpoint/resolveEndpointConfig.js"() {
    init_transport();
    init_toEndpointV12();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/bdd/BinaryDecisionDiagram.js
var BinaryDecisionDiagram;
var init_BinaryDecisionDiagram = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/bdd/BinaryDecisionDiagram.js"() {
    BinaryDecisionDiagram = class _BinaryDecisionDiagram {
      nodes;
      root;
      conditions;
      results;
      constructor(bdd2, root2, conditions, results) {
        this.nodes = bdd2;
        this.root = root2;
        this.conditions = conditions;
        this.results = results;
      }
      static from(bdd2, root2, conditions, results) {
        return new _BinaryDecisionDiagram(bdd2, root2, conditions, results);
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/cache/EndpointCache.js
var EndpointCache;
var init_EndpointCache = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/cache/EndpointCache.js"() {
    EndpointCache = class {
      capacity;
      data = /* @__PURE__ */ new Map();
      parameters = [];
      constructor({ size, params }) {
        this.capacity = size ?? 50;
        if (params) {
          this.parameters = params;
        }
      }
      get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
          return resolver();
        }
        if (!this.data.has(key)) {
          if (this.data.size > this.capacity + 10) {
            const keys = this.data.keys();
            let i2 = 0;
            while (true) {
              const { value, done } = keys.next();
              this.data.delete(value);
              if (done || ++i2 > 10) {
                break;
              }
            }
          }
          this.data.set(key, resolver());
        }
        return this.data.get(key);
      }
      size() {
        return this.data.size;
      }
      hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
          return false;
        }
        for (const param of parameters) {
          const val = String(endpointParams[param] ?? "");
          if (val.includes("|;")) {
            return false;
          }
          buffer += val + "|;";
        }
        return buffer;
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/EndpointError.js
var EndpointError;
var init_EndpointError = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/EndpointError.js"() {
    EndpointError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "EndpointError";
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/index.js
var init_types = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/types/index.js"() {
    init_EndpointError();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/debugId.js
var debugId;
var init_debugId = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/debugId.js"() {
    debugId = "endpoints";
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/toDebugString.js
function toDebugString(input) {
  if (typeof input !== "object" || input == null) {
    return input;
  }
  if ("ref" in input) {
    return `$${toDebugString(input.ref)}`;
  }
  if ("fn" in input) {
    return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
  }
  return JSON.stringify(input, null, 2);
}
var init_toDebugString = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/toDebugString.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/index.js
var init_debug = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/debug/index.js"() {
    init_debugId();
    init_toDebugString();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/customEndpointFunctions.js
var customEndpointFunctions;
var init_customEndpointFunctions = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/customEndpointFunctions.js"() {
    customEndpointFunctions = {};
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/booleanEquals.js
var booleanEquals;
var init_booleanEquals = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/booleanEquals.js"() {
    booleanEquals = (value1, value2) => value1 === value2;
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/coalesce.js
function coalesce(...args) {
  for (const arg of args) {
    if (arg != null) {
      return arg;
    }
  }
  return void 0;
}
var init_coalesce = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/coalesce.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttrPathList.js
var getAttrPathList;
var init_getAttrPathList = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttrPathList.js"() {
    init_types();
    getAttrPathList = (path) => {
      const parts = path.split(".");
      const pathList = [];
      for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
          if (part.indexOf("]") !== part.length - 1) {
            throw new EndpointError(`Path: '${path}' does not end with ']'`);
          }
          const arrayIndex = part.slice(squareBracketIndex + 1, -1);
          if (Number.isNaN(parseInt(arrayIndex))) {
            throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
          }
          if (squareBracketIndex !== 0) {
            pathList.push(part.slice(0, squareBracketIndex));
          }
          pathList.push(arrayIndex);
        } else {
          pathList.push(part);
        }
      }
      return pathList;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttr.js
var getAttr;
var init_getAttr = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/getAttr.js"() {
    init_types();
    init_getAttrPathList();
    getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
      if (typeof acc !== "object") {
        throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
      } else if (Array.isArray(acc)) {
        const i2 = parseInt(index);
        return acc[i2 < 0 ? acc.length + i2 : i2];
      }
      return acc[index];
    }, value);
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isSet.js
var isSet;
var init_isSet = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isSet.js"() {
    isSet = (value) => value != null;
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/ite.js
function ite(condition, trueValue, falseValue) {
  return condition ? trueValue : falseValue;
}
var init_ite = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/ite.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/not.js
var not;
var init_not = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/not.js"() {
    not = (value) => !value;
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isIpAddress.js
var IP_V4_REGEX, isIpAddress;
var init_isIpAddress = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/isIpAddress.js"() {
    IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
    isIpAddress = (value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/parseURL.js
var DEFAULT_PORTS, parseURL;
var init_parseURL = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/parseURL.js"() {
    init_dist_es();
    init_isIpAddress();
    DEFAULT_PORTS = {
      [EndpointURLScheme.HTTP]: 80,
      [EndpointURLScheme.HTTPS]: 443
    };
    parseURL = (value) => {
      const whatwgURL = (() => {
        try {
          if (value instanceof URL) {
            return value;
          }
          if (typeof value === "object" && "hostname" in value) {
            const { hostname: hostname2, port, protocol: protocol2 = "", path = "", query = {} } = value;
            const url = new URL(`${protocol2}//${hostname2}${port ? `:${port}` : ""}${path}`);
            url.search = Object.entries(query).map(([k2, v2]) => `${k2}=${v2}`).join("&");
            return url;
          }
          return new URL(value);
        } catch (ignored) {
          return null;
        }
      })();
      if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
      }
      const urlString = whatwgURL.href;
      const { host, hostname, pathname, protocol, search } = whatwgURL;
      if (search) {
        return null;
      }
      const scheme = protocol.slice(0, -1);
      if (!Object.values(EndpointURLScheme).includes(scheme)) {
        return null;
      }
      const isIp = isIpAddress(hostname);
      const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
      const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
      return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp
      };
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/split.js
function split(value, delimiter, limit) {
  if (limit === 1) {
    return [value];
  }
  if (value === "") {
    return [""];
  }
  const parts = value.split(delimiter);
  if (limit === 0) {
    return parts;
  }
  return parts.slice(0, limit - 1).concat(parts.slice(1).join(delimiter));
}
var init_split = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/split.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/stringEquals.js
var stringEquals;
var init_stringEquals = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/stringEquals.js"() {
    stringEquals = (value1, value2) => value1 === value2;
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/substring.js
var substring;
var init_substring = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/substring.js"() {
    substring = (input, start, stop, reverse) => {
      if (input == null || start >= stop || input.length < stop || /[^\u0000-\u007f]/.test(input)) {
        return null;
      }
      if (!reverse) {
        return input.substring(start, stop);
      }
      return input.substring(input.length - stop, input.length - start);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/uriEncode.js
var uriEncode;
var init_uriEncode = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/uriEncode.js"() {
    uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c2) => `%${c2.charCodeAt(0).toString(16).toUpperCase()}`);
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/index.js
var init_lib = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/lib/index.js"() {
    init_booleanEquals();
    init_coalesce();
    init_getAttr();
    init_isSet();
    init_transport();
    init_ite();
    init_not();
    init_parseURL();
    init_split();
    init_stringEquals();
    init_substring();
    init_uriEncode();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/endpointFunctions.js
var endpointFunctions;
var init_endpointFunctions = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/endpointFunctions.js"() {
    init_lib();
    endpointFunctions = {
      booleanEquals,
      coalesce,
      getAttr,
      isSet,
      isValidHostLabel,
      ite,
      not,
      parseURL,
      split,
      stringEquals,
      substring,
      uriEncode
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateTemplate.js
var evaluateTemplate;
var init_evaluateTemplate = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateTemplate.js"() {
    init_lib();
    evaluateTemplate = (template, options) => {
      const evaluatedTemplateArr = [];
      const { referenceRecord, endpointParams } = options;
      let currentIndex = 0;
      while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(currentIndex));
          break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex));
          break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
          currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
          const [refName, attrName] = parameterName.split("#");
          evaluatedTemplateArr.push(getAttr(referenceRecord[refName] ?? endpointParams[refName], attrName));
        } else {
          evaluatedTemplateArr.push(referenceRecord[parameterName] ?? endpointParams[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
      }
      return evaluatedTemplateArr.join("");
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getReferenceValue.js
var getReferenceValue;
var init_getReferenceValue = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getReferenceValue.js"() {
    getReferenceValue = ({ ref }, options) => {
      return options.referenceRecord[ref] ?? options.endpointParams[ref];
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateExpression.js
var evaluateExpression, callFunction, group;
var init_evaluateExpression = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateExpression.js"() {
    init_types();
    init_customEndpointFunctions();
    init_endpointFunctions();
    init_evaluateTemplate();
    init_getReferenceValue();
    evaluateExpression = (obj, keyName, options) => {
      if (typeof obj === "string") {
        return evaluateTemplate(obj, options);
      } else if (obj["fn"]) {
        return group.callFunction(obj, options);
      } else if (obj["ref"]) {
        return getReferenceValue(obj, options);
      }
      throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
    };
    callFunction = ({ fn, argv }, options) => {
      const evaluatedArgs = Array(argv.length);
      for (let i2 = 0; i2 < evaluatedArgs.length; ++i2) {
        const arg = argv[i2];
        if (typeof arg === "boolean" || typeof arg === "number") {
          evaluatedArgs[i2] = arg;
        } else {
          evaluatedArgs[i2] = group.evaluateExpression(arg, "arg", options);
        }
      }
      const namespaceSeparatorIndex = fn.indexOf(".");
      if (namespaceSeparatorIndex !== -1) {
        const namespaceFunctions = customEndpointFunctions[fn.slice(0, namespaceSeparatorIndex)];
        const customFunction = namespaceFunctions?.[fn.slice(namespaceSeparatorIndex + 1)];
        if (typeof customFunction === "function") {
          return customFunction(...evaluatedArgs);
        }
      }
      const callable = endpointFunctions[fn];
      if (typeof callable === "function") {
        return callable(...evaluatedArgs);
      }
      throw new Error(`function ${fn} not loaded in endpointFunctions.`);
    };
    group = {
      evaluateExpression,
      callFunction
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/callFunction.js
var init_callFunction = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/callFunction.js"() {
    init_evaluateExpression();
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateCondition.js
var evaluateCondition;
var init_evaluateCondition = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/evaluateCondition.js"() {
    init_debug();
    init_types();
    init_callFunction();
    evaluateCondition = (condition, options) => {
      const { assign } = condition;
      if (assign && assign in options.referenceRecord) {
        throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
      }
      const value = callFunction(condition, options);
      options.logger?.debug?.(`${debugId} evaluateCondition: ${toDebugString(condition)} = ${toDebugString(value)}`);
      const result = value === "" ? true : !!value;
      if (assign != null) {
        return { result, toAssign: { name: assign, value } };
      }
      return { result };
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointHeaders.js
var getEndpointHeaders;
var init_getEndpointHeaders = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointHeaders.js"() {
    init_types();
    init_evaluateExpression();
    getEndpointHeaders = (headers, options) => Object.entries(headers ?? {}).reduce((acc, [headerKey, headerVal]) => {
      acc[headerKey] = headerVal.map((headerValEntry) => {
        const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
        if (typeof processedExpr !== "string") {
          throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
        }
        return processedExpr;
      });
      return acc;
    }, {});
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointProperties.js
var getEndpointProperties, getEndpointProperty, group2;
var init_getEndpointProperties = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointProperties.js"() {
    init_types();
    init_evaluateTemplate();
    getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => {
      acc[propertyKey] = group2.getEndpointProperty(propertyVal, options);
      return acc;
    }, {});
    getEndpointProperty = (property, options) => {
      if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
      }
      switch (typeof property) {
        case "string":
          return evaluateTemplate(property, options);
        case "object":
          if (property === null) {
            throw new EndpointError(`Unexpected endpoint property: ${property}`);
          }
          return group2.getEndpointProperties(property, options);
        case "boolean":
          return property;
        default:
          throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
      }
    };
    group2 = {
      getEndpointProperty,
      getEndpointProperties
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointUrl.js
var getEndpointUrl;
var init_getEndpointUrl = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/utils/getEndpointUrl.js"() {
    init_types();
    init_evaluateExpression();
    getEndpointUrl = (endpointUrl, options) => {
      const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
      if (typeof expression === "string") {
        try {
          return new URL(expression);
        } catch (error) {
          console.error(`Failed to construct URL with ${expression}`, error);
          throw error;
        }
      }
      throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/decideEndpoint.js
var RESULT, decideEndpoint;
var init_decideEndpoint = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/util-endpoints/decideEndpoint.js"() {
    init_types();
    init_evaluateCondition();
    init_evaluateExpression();
    init_getEndpointHeaders();
    init_getEndpointProperties();
    init_getEndpointUrl();
    RESULT = 1e8;
    decideEndpoint = (bdd2, options) => {
      const { nodes: nodes2, root: root2, results, conditions } = bdd2;
      let ref = root2;
      const referenceRecord = {};
      const closure = {
        referenceRecord,
        endpointParams: options.endpointParams,
        logger: options.logger
      };
      while (ref !== 1 && ref !== -1 && ref < RESULT) {
        const node_i = 3 * (Math.abs(ref) - 1);
        const [condition_i, highRef, lowRef] = [nodes2[node_i], nodes2[node_i + 1], nodes2[node_i + 2]];
        const [fn, argv, assign] = conditions[condition_i];
        const evaluation = evaluateCondition({ fn, assign, argv }, closure);
        if (evaluation.toAssign) {
          const { name, value } = evaluation.toAssign;
          referenceRecord[name] = value;
        }
        ref = ref >= 0 === evaluation.result ? highRef : lowRef;
      }
      if (ref >= RESULT) {
        const result = results[ref - RESULT];
        if (result[0] === -1) {
          const [, errorExpression] = result;
          throw new EndpointError(evaluateExpression(errorExpression, "Error", closure));
        }
        const [url, properties, headers] = result;
        return {
          url: getEndpointUrl(url, closure),
          properties: getEndpointProperties(properties, closure),
          headers: getEndpointHeaders(headers ?? {}, closure)
        };
      }
      throw new EndpointError(`No matching endpoint.`);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/endpoints/index.browser.js
var getEndpointFromInstructions, resolveEndpointConfig, endpointMiddleware, getEndpointPlugin;
var init_index_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/endpoints/index.browser.js"() {
    init_getEndpointFromConfig_browser();
    init_getEndpointFromInstructions();
    init_endpointMiddleware();
    init_getEndpointPlugin();
    init_resolveEndpointConfig();
    init_BinaryDecisionDiagram();
    init_EndpointCache();
    init_decideEndpoint();
    init_isIpAddress();
    init_transport();
    init_customEndpointFunctions();
    init_getEndpointFromInstructions();
    getEndpointFromInstructions = bindGetEndpointFromInstructions(getEndpointFromConfig);
    resolveEndpointConfig = bindResolveEndpointConfig(getEndpointFromConfig);
    endpointMiddleware = bindEndpointMiddleware(getEndpointFromConfig);
    getEndpointPlugin = bindGetEndpointPlugin(getEndpointFromConfig);
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/checksum/ChecksumStream.browser.js
var ReadableStreamRef, ChecksumStream;
var init_ChecksumStream_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/checksum/ChecksumStream.browser.js"() {
    ReadableStreamRef = typeof ReadableStream === "function" ? ReadableStream : function() {
    };
    ChecksumStream = class extends ReadableStreamRef {
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/stream-type-check.js
var isReadableStream, isBlob;
var init_stream_type_check = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/stream-type-check.js"() {
    isReadableStream = (stream) => typeof ReadableStream === "function" && (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);
    isBlob = (blob) => {
      return typeof Blob === "function" && (blob?.constructor?.name === Blob.name || blob instanceof Blob);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/checksum/createChecksumStream.browser.js
var createChecksumStream;
var init_createChecksumStream_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/checksum/createChecksumStream.browser.js"() {
    init_toBase64_browser();
    init_stream_type_check();
    init_ChecksumStream_browser();
    createChecksumStream = ({ expectedChecksum, checksum, source, checksumSourceLocation, base64Encoder }) => {
      if (!isReadableStream(source)) {
        throw new Error(`@smithy/util-stream: unsupported source type ${source?.constructor?.name ?? source} in ChecksumStream.`);
      }
      const encoder = base64Encoder ?? toBase64;
      if (typeof TransformStream !== "function") {
        throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
      }
      const transform = new TransformStream({
        start() {
        },
        async transform(chunk, controller) {
          checksum.update(chunk);
          controller.enqueue(chunk);
        },
        async flush(controller) {
          const digest2 = await checksum.digest();
          const received = encoder(digest2);
          if (expectedChecksum !== received) {
            const error = new Error(`Checksum mismatch: expected "${expectedChecksum}" but received "${received}" in response header "${checksumSourceLocation}".`);
            controller.error(error);
          } else {
            controller.terminate();
          }
        }
      });
      source.pipeThrough(transform);
      const readable = transform.readable;
      Object.setPrototypeOf(readable, ChecksumStream.prototype);
      return readable;
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/ByteArrayCollector.js
var ByteArrayCollector;
var init_ByteArrayCollector = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/ByteArrayCollector.js"() {
    ByteArrayCollector = class {
      allocByteArray;
      byteLength = 0;
      byteArrays = [];
      constructor(allocByteArray) {
        this.allocByteArray = allocByteArray;
      }
      push(byteArray) {
        this.byteArrays.push(byteArray);
        this.byteLength += byteArray.byteLength;
      }
      flush() {
        if (this.byteArrays.length === 1) {
          const bytes2 = this.byteArrays[0];
          this.reset();
          return bytes2;
        }
        const aggregation = this.allocByteArray(this.byteLength);
        let cursor = 0;
        for (let i2 = 0; i2 < this.byteArrays.length; ++i2) {
          const bytes2 = this.byteArrays[i2];
          aggregation.set(bytes2, cursor);
          cursor += bytes2.byteLength;
        }
        this.reset();
        return aggregation;
      }
      reset() {
        this.byteArrays = [];
        this.byteLength = 0;
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/createBufferedReadable.browser.js
function createBufferedReadableStream(upstream, size, logger2) {
  const reader = upstream.getReader();
  let streamBufferingLoggedWarning = false;
  let bytesSeen = 0;
  const buffers = ["", new ByteArrayCollector((size2) => new Uint8Array(size2))];
  let mode = -1;
  const pull = async (controller) => {
    const { value, done } = await reader.read();
    const chunk = value;
    if (done) {
      if (mode !== -1) {
        const remainder = flush(buffers, mode);
        if (sizeOf(remainder) > 0) {
          controller.enqueue(remainder);
        }
      }
      controller.close();
    } else {
      const chunkMode = modeOf(chunk, false);
      if (mode !== chunkMode) {
        if (mode >= 0) {
          controller.enqueue(flush(buffers, mode));
        }
        mode = chunkMode;
      }
      if (mode === -1) {
        controller.enqueue(chunk);
        return;
      }
      const chunkSize = sizeOf(chunk);
      bytesSeen += chunkSize;
      const bufferSize = sizeOf(buffers[mode]);
      if (chunkSize >= size && bufferSize === 0) {
        controller.enqueue(chunk);
      } else {
        const newSize = merge(buffers, mode, chunk);
        if (!streamBufferingLoggedWarning && bytesSeen > size * 2) {
          streamBufferingLoggedWarning = true;
          logger2?.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${size}, automatically buffering.`);
        }
        if (newSize >= size) {
          controller.enqueue(flush(buffers, mode));
        } else {
          await pull(controller);
        }
      }
    }
  };
  return new ReadableStream({
    pull
  });
}
function merge(buffers, mode, chunk) {
  switch (mode) {
    case 0:
      buffers[0] += chunk;
      return sizeOf(buffers[0]);
    case 1:
    case 2:
      buffers[mode].push(chunk);
      return sizeOf(buffers[mode]);
  }
}
function flush(buffers, mode) {
  switch (mode) {
    case 0:
      const s2 = buffers[0];
      buffers[0] = "";
      return s2;
    case 1:
    case 2:
      return buffers[mode].flush();
  }
  throw new Error(`@smithy/util-stream - invalid index ${mode} given to flush()`);
}
function sizeOf(chunk) {
  return chunk?.byteLength ?? chunk?.length ?? 0;
}
function modeOf(chunk, allowBuffer = true) {
  if (allowBuffer && typeof Buffer !== "undefined" && chunk instanceof Buffer) {
    return 2;
  }
  if (chunk instanceof Uint8Array) {
    return 1;
  }
  if (typeof chunk === "string") {
    return 0;
  }
  return -1;
}
var createBufferedReadable;
var init_createBufferedReadable_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/createBufferedReadable.browser.js"() {
    init_ByteArrayCollector();
    createBufferedReadable = createBufferedReadableStream;
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/getAwsChunkedEncodingStream.browser.js
var getAwsChunkedEncodingStream;
var init_getAwsChunkedEncodingStream_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/getAwsChunkedEncodingStream.browser.js"() {
    getAwsChunkedEncodingStream = (readableStream, options) => {
      const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
      const checksumRequired = base64Encoder !== void 0 && bodyLengthChecker !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
      const digest2 = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : void 0;
      const reader = readableStream.getReader();
      return new ReadableStream({
        async pull(controller) {
          const { value, done } = await reader.read();
          if (done) {
            controller.enqueue(`0\r
`);
            if (checksumRequired) {
              const checksum = base64Encoder(await digest2);
              controller.enqueue(`${checksumLocationName}:${checksum}\r
`);
              controller.enqueue(`\r
`);
            }
            controller.close();
          } else {
            controller.enqueue(`${(bodyLengthChecker(value) || 0).toString(16)}\r
${value}\r
`);
          }
        }
      });
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/stream-collector.browser.js
async function collectBlob(blob) {
  return blob.arrayBuffer().then((ab2) => new Uint8Array(ab2));
}
async function collectReadableStream(stream) {
  const chunks = [];
  const reader = stream.getReader();
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value);
      length += value.length;
    }
    if (done) {
      break;
    }
  }
  return concatBytes(chunks, length);
}
var streamCollector;
var init_stream_collector_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/stream-collector.browser.js"() {
    init_concatBytes();
    init_stream_type_check();
    streamCollector = async (stream) => {
      if (isBlob(stream)) {
        return collectBlob(stream);
      }
      return collectReadableStream(stream);
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/util-stream/sdk-stream-mixin.browser.js
var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED, sdkStreamMixin, isBlobInstance;
var init_sdk_stream_mixin_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/util-stream/sdk-stream-mixin.browser.js"() {
    init_toBase64_browser();
    init_hex_encoding();
    init_toUtf8_browser();
    init_stream_collector_browser();
    init_stream_type_check();
    ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
    sdkStreamMixin = (stream) => {
      if (!isBlobInstance(stream) && !isReadableStream(stream)) {
        const name = stream?.__proto__?.constructor?.name || stream;
        throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
      }
      let transformed = false;
      const transformToByteArray = async () => {
        if (transformed) {
          throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await streamCollector(stream);
      };
      const blobToWebStream = (blob) => {
        if (typeof blob.stream !== "function") {
          throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\nIf you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
        }
        return blob.stream();
      };
      return Object.assign(stream, {
        transformToByteArray,
        transformToString: async (encoding) => {
          const buf = await transformToByteArray();
          if (encoding === "base64") {
            return toBase64(buf);
          } else if (encoding === "hex") {
            return toHex(buf);
          } else if (encoding === void 0 || encoding === "utf8" || encoding === "utf-8") {
            return toUtf8(buf);
          } else if (typeof TextDecoder === "function") {
            return new TextDecoder(encoding).decode(buf);
          } else {
            throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
          }
        },
        transformToWebStream: () => {
          if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
          }
          transformed = true;
          if (isBlobInstance(stream)) {
            return blobToWebStream(stream);
          } else if (isReadableStream(stream)) {
            return stream;
          } else {
            throw new Error(`Cannot transform payload to web stream, got ${stream}`);
          }
        }
      });
    };
    isBlobInstance = (stream) => typeof Blob === "function" && stream instanceof Blob;
  }
});

// node_modules/@smithy/core/dist-es/submodules/serde/index.browser.js
var no, Uint8ArrayBlobAdapter, _getRandomValues, v4, generateIdempotencyToken;
var init_index_browser2 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/serde/index.browser.js"() {
    init_fromBase64_browser();
    init_toBase64_browser();
    init_Uint8ArrayBlobAdapter();
    init_fromUtf8_browser();
    init_toUtf8_browser();
    init_v4();
    init_date_utils();
    init_lazy_json();
    init_quote_header();
    init_schema_date_utils();
    init_split_every();
    init_split_header();
    init_NumericValue();
    init_hex_encoding();
    init_calculateBodyLength_browser();
    init_toUint8Array_browser();
    init_concatBytes();
    init_is_array_buffer();
    init_createChecksumStream_browser();
    init_createBufferedReadable_browser();
    init_getAwsChunkedEncodingStream_browser();
    init_sdk_stream_mixin_browser();
    init_stream_collector_browser();
    init_transport();
    no = Symbol.for("node-only");
    Uint8ArrayBlobAdapter = class extends bindUint8ArrayBlobAdapter(toUtf8, fromUtf8, toBase64, fromBase64) {
    };
    _getRandomValues = (array) => crypto.getRandomValues(array);
    v4 = bindV4(_getRandomValues);
    generateIdempotencyToken = v4;
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/chunked-blob-reader/chunked-blob-reader.js
async function blobReader(blob, onChunk, chunkSize = 1024 * 1024) {
  const size = blob.size;
  let totalBytesRead = 0;
  while (totalBytesRead < size) {
    const slice = blob.slice(totalBytesRead, Math.min(size, totalBytesRead + chunkSize));
    onChunk(new Uint8Array(await slice.arrayBuffer()));
    totalBytesRead += slice.size;
  }
}
var init_chunked_blob_reader = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/chunked-blob-reader/chunked-blob-reader.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/hash-blob-browser/blobHasher.js
var blobHasher;
var init_blobHasher = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/hash-blob-browser/blobHasher.js"() {
    init_chunked_blob_reader();
    blobHasher = async function blobHasher2(hashCtor, blob) {
      const hash = new hashCtor();
      await blobReader(blob, (chunk) => {
        hash.update(chunk);
      });
      return hash.digest();
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/md5/Md5Js.js
function compress(state, block) {
  let a2 = state[0], b2 = state[1], c2 = state[2], d2 = state[3];
  for (let i2 = 0; i2 < 64; ++i2) {
    let f2, g2;
    if (i2 < 16) {
      f2 = b2 & c2 | ~b2 & d2;
      g2 = i2;
    } else if (i2 < 32) {
      f2 = d2 & b2 | c2 & ~d2;
      g2 = (5 * i2 + 1) % 16;
    } else if (i2 < 48) {
      f2 = b2 ^ c2 ^ d2;
      g2 = (3 * i2 + 5) % 16;
    } else {
      f2 = c2 ^ (b2 | ~d2);
      g2 = 7 * i2 % 16;
    }
    const x2 = block.getUint32(g2 * 4, true);
    const tmp = d2;
    d2 = c2;
    c2 = b2;
    const s2 = S[(i2 >> 4) * 4 + (i2 & 3)];
    const sum = (a2 + f2 & M) + (x2 + T[i2] & M) & M;
    b2 = b2 + ((sum << s2 | sum >>> 32 - s2) >>> 0) & M;
    a2 = tmp;
  }
  state[0] = state[0] + a2 & M;
  state[1] = state[1] + b2 & M;
  state[2] = state[2] + c2 & M;
  state[3] = state[3] + d2 & M;
}
var Md5Js, INIT, M, S, T;
var init_Md5Js = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/md5/Md5Js.js"() {
    init_index_browser2();
    Md5Js = class {
      digestLength = 16;
      state = Uint32Array.from(INIT);
      writeBuffer = new DataView(new ArrayBuffer(64));
      bufferLength = 0;
      bytesHashed = 0;
      update(sourceData) {
        const data = toUint8Array(sourceData);
        let pos = 0;
        let len = data.byteLength;
        this.bytesHashed += len;
        while (len > 0) {
          this.writeBuffer.setUint8(this.bufferLength++, data[pos++]);
          --len;
          if (this.bufferLength === 64) {
            compress(this.state, this.writeBuffer);
            this.bufferLength = 0;
          }
        }
      }
      async digest() {
        const state = Uint32Array.from(this.state);
        const buf = new DataView(this.writeBuffer.buffer.slice(0));
        let bufLen = this.bufferLength;
        const bits = this.bytesHashed * 8;
        buf.setUint8(bufLen++, 128);
        if (this.bufferLength % 64 >= 56) {
          for (let i2 = bufLen; i2 < 64; ++i2) {
            buf.setUint8(i2, 0);
          }
          compress(state, buf);
          bufLen = 0;
        }
        for (let i2 = bufLen; i2 < 56; ++i2) {
          buf.setUint8(i2, 0);
        }
        buf.setUint32(56, bits >>> 0, true);
        buf.setUint32(60, Math.floor(bits / 2 ** 32), true);
        compress(state, buf);
        const out = new Uint8Array(16);
        const view = new DataView(out.buffer);
        for (let i2 = 0; i2 < 4; ++i2) {
          view.setUint32(i2 * 4, state[i2], true);
        }
        return out;
      }
      reset() {
        this.state.set(INIT);
        this.writeBuffer = new DataView(new ArrayBuffer(64));
        this.bufferLength = 0;
        this.bytesHashed = 0;
      }
    };
    INIT = [1732584193, 4023233417, 2562383102, 271733878];
    M = 4294967295;
    S = Uint8Array.of(7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21);
    T = Array.from({ length: 64 }, (_, i2) => Math.abs(Math.sin(i2 + 1)) * 2 ** 32 >>> 0);
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/crc32/Crc32Js.js
var CRC32_TABLE, ONES, Crc32Js;
var init_Crc32Js = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/crc32/Crc32Js.js"() {
    CRC32_TABLE = new Uint32Array(256);
    for (let i2 = 0; i2 < 256; ++i2) {
      let c2 = i2;
      for (let j2 = 0; j2 < 8; ++j2) {
        c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
      }
      CRC32_TABLE[i2] = c2 >>> 0;
    }
    ONES = 4294967295;
    Crc32Js = class {
      digestLength = 4;
      checksum = ONES;
      update(data) {
        for (let i2 = 0; i2 < data.length; ++i2) {
          this.checksum = this.checksum >>> 8 ^ CRC32_TABLE[(this.checksum ^ data[i2]) & 255];
        }
      }
      digestSync() {
        return (this.checksum ^ ONES) >>> 0;
      }
      async digest() {
        const value = this.digestSync();
        const out = new Uint8Array(4);
        new DataView(out.buffer).setUint32(0, value, false);
        return out;
      }
      reset() {
        this.checksum = ONES;
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/sha256/Sha256Js.js
var BLOCK, DIGEST_LENGTH, MAX_HASHABLE_LENGTH, Sha256Js, INIT2, K;
var init_Sha256Js = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/sha256/Sha256Js.js"() {
    init_index_browser2();
    BLOCK = 64;
    DIGEST_LENGTH = 32;
    MAX_HASHABLE_LENGTH = 2 ** 53 - 1;
    Sha256Js = class _Sha256Js {
      digestLength = DIGEST_LENGTH;
      state = Int32Array.from(INIT2);
      w;
      buffer = new Uint8Array(64);
      bufferLength = 0;
      bytesHashed = 0;
      finished = false;
      inner;
      outer;
      constructor(secret) {
        if (secret) {
          const key = _Sha256Js.normalizeKey(secret);
          this.inner = new _Sha256Js();
          this.outer = new _Sha256Js();
          const { inner, outer } = this;
          const pad2 = new Uint8Array(BLOCK * 2);
          for (let i2 = 0; i2 < BLOCK; ++i2) {
            pad2[i2] = 54 ^ key[i2];
            pad2[i2 + BLOCK] = 92 ^ key[i2];
          }
          inner.update(pad2.subarray(0, BLOCK));
          outer.update(pad2.subarray(BLOCK));
        }
      }
      update(data) {
        if (this.finished) {
          throw new Error("Attempted to update an already finished HMAC.");
        }
        if (this.inner) {
          this.inner.update(data);
          return;
        }
        const chunk = toUint8Array(data);
        let position = 0;
        let { byteLength } = chunk;
        this.bytesHashed += byteLength;
        if (this.bytesHashed * 8 > MAX_HASHABLE_LENGTH) {
          throw new Error("Cannot hash more than 2^53 - 1 bits");
        }
        while (byteLength > 0) {
          this.buffer[this.bufferLength++] = chunk[position++];
          byteLength--;
          if (this.bufferLength === BLOCK) {
            this.hashBuffer();
            this.bufferLength = 0;
          }
        }
      }
      async digest() {
        const { inner, outer } = this;
        if (inner && outer) {
          if (this.finished) {
            throw new Error("Attempted to digest an already finished HMAC.");
          }
          this.finished = true;
          const innerDigest = inner.digestSync();
          outer.update(innerDigest);
          return outer.digestSync();
        }
        return this.digestSync();
      }
      reset() {
        this.state = Int32Array.from(INIT2);
        this.buffer = new Uint8Array(64);
        this.bufferLength = 0;
        this.bytesHashed = 0;
      }
      digestSync() {
        const state = this.state.slice();
        const buffer = this.buffer.slice();
        let bufferLength = this.bufferLength;
        const bitsHashed = this.bytesHashed * 8;
        const bufferView = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
        bufferView.setUint8(bufferLength++, 128);
        if ((bufferLength - 1) % BLOCK >= BLOCK - 8) {
          for (let i2 = bufferLength; i2 < BLOCK; ++i2) {
            bufferView.setUint8(i2, 0);
          }
          this.hashBufferWith(state, buffer);
          bufferLength = 0;
        }
        for (let i2 = bufferLength; i2 < BLOCK - 8; ++i2) {
          bufferView.setUint8(i2, 0);
        }
        bufferView.setUint32(BLOCK - 8, Math.floor(bitsHashed / 4294967296), false);
        bufferView.setUint32(BLOCK - 4, bitsHashed, false);
        this.hashBufferWith(state, buffer);
        const out = new Uint8Array(DIGEST_LENGTH);
        for (let i2 = 0; i2 < 8; ++i2) {
          out[i2 * 4] = state[i2] >>> 24 & 255;
          out[i2 * 4 + 1] = state[i2] >>> 16 & 255;
          out[i2 * 4 + 2] = state[i2] >>> 8 & 255;
          out[i2 * 4 + 3] = state[i2] >>> 0 & 255;
        }
        return out;
      }
      static normalizeKey(secret) {
        const key = toUint8Array(secret);
        if (key.byteLength > BLOCK) {
          const h2 = new _Sha256Js();
          h2.update(key);
          const out = h2.digestSync();
          const padded = new Uint8Array(BLOCK);
          padded.set(out);
          return padded;
        }
        if (key.byteLength < BLOCK) {
          const padded = new Uint8Array(BLOCK);
          padded.set(key);
          return padded;
        }
        return key;
      }
      hashBuffer() {
        this.hashBufferWith(this.state, this.buffer);
      }
      hashBufferWith(state, buffer) {
        const w2 = this.w ??= new Int32Array(64);
        let s0 = state[0], s1 = state[1], s2 = state[2], s3 = state[3], s4 = state[4], s5 = state[5], s6 = state[6], s7 = state[7];
        for (let i2 = 0; i2 < BLOCK; ++i2) {
          if (i2 < 16) {
            w2[i2] = (buffer[i2 * 4] & 255) << 24 | (buffer[i2 * 4 + 1] & 255) << 16 | (buffer[i2 * 4 + 2] & 255) << 8 | buffer[i2 * 4 + 3] & 255;
          } else {
            let u2 = w2[i2 - 2];
            const t13 = (u2 >>> 17 | u2 << 15) ^ (u2 >>> 19 | u2 << 13) ^ u2 >>> 10;
            u2 = w2[i2 - 15];
            const t23 = (u2 >>> 7 | u2 << 25) ^ (u2 >>> 18 | u2 << 14) ^ u2 >>> 3;
            w2[i2] = (t13 + w2[i2 - 7] | 0) + (t23 + w2[i2 - 16] | 0);
          }
          const t12 = (((s4 >>> 6 | s4 << 26) ^ (s4 >>> 11 | s4 << 21) ^ (s4 >>> 25 | s4 << 7)) + (s4 & s5 ^ ~s4 & s6) | 0) + (s7 + (K[i2] + w2[i2] | 0) | 0) | 0;
          const t22 = ((s0 >>> 2 | s0 << 30) ^ (s0 >>> 13 | s0 << 19) ^ (s0 >>> 22 | s0 << 10)) + (s0 & s1 ^ s0 & s2 ^ s1 & s2) | 0;
          s7 = s6;
          s6 = s5;
          s5 = s4;
          s4 = s3 + t12 | 0;
          s3 = s2;
          s2 = s1;
          s1 = s0;
          s0 = t12 + t22 | 0;
        }
        state[0] += s0;
        state[1] += s1;
        state[2] += s2;
        state[3] += s3;
        state[4] += s4;
        state[5] += s5;
        state[6] += s6;
        state[7] += s7;
      }
    };
    INIT2 = new Int32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    K = new Int32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/sha256/Sha256WebCrypto.js
var digest, sign, importKey, subtle, MAX_PENDING_BYTES, Sha256WebCrypto;
var init_Sha256WebCrypto = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/sha256/Sha256WebCrypto.js"() {
    init_index_browser2();
    init_Sha256Js();
    ({ digest, sign, importKey } = globalThis?.crypto?.subtle ?? {});
    subtle = typeof digest === "function" && typeof sign === "function" && typeof importKey === "function" ? globalThis.crypto.subtle : void 0;
    MAX_PENDING_BYTES = 8 * 1024 * 1024;
    Sha256WebCrypto = class {
      digestLength = 32;
      secret;
      pending = [];
      pendingBytes = 0;
      fallback;
      finished = false;
      constructor(secret) {
        if (secret) {
          this.secret = toUint8Array(secret);
        }
      }
      update(data) {
        if (this.finished) {
          throw new Error("Attempted to update an already finished HMAC.");
        }
        if (this.fallback) {
          this.fallback.update(data);
          return;
        }
        this.pending.push(data.slice());
        this.pendingBytes += data.byteLength;
        if (this.pendingBytes >= MAX_PENDING_BYTES) {
          this.switchToFallback();
        }
      }
      async digest() {
        if (this.fallback) {
          return this.fallback.digest();
        }
        if (this.secret && this.finished) {
          throw new Error("Attempted to digest an already finished HMAC.");
        }
        const data = concatBytes(this.pending);
        if (subtle) {
          if (this.secret) {
            this.finished = true;
            const key = await subtle.importKey("raw", this.secret, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
            const sig = await subtle.sign("HMAC", key, data);
            return new Uint8Array(sig);
          }
          const hash = await subtle.digest("SHA-256", data);
          return new Uint8Array(hash);
        }
        const sha2562 = new Sha256Js(this.secret);
        sha2562.update(data);
        return sha2562.digest();
      }
      reset() {
        this.pending = [];
        this.pendingBytes = 0;
        this.fallback = void 0;
        this.finished = false;
      }
      switchToFallback() {
        const sha256Js = new Sha256Js(this.secret);
        for (const chunk of this.pending) {
          sha256Js.update(chunk);
        }
        this.fallback = sha256Js;
        this.pending = [];
        this.pendingBytes = 0;
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/checksum/index.browser.js
var no2;
var init_index_browser3 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/checksum/index.browser.js"() {
    init_blobHasher();
    init_Md5Js();
    init_Crc32Js();
    init_Sha256WebCrypto();
    no2 = Symbol.for("node-only");
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/Int64.js
function negate(bytes2) {
  for (let i2 = 0; i2 < 8; i2++) {
    bytes2[i2] ^= 255;
  }
  for (let i2 = 7; i2 > -1; i2--) {
    bytes2[i2]++;
    if (bytes2[i2] !== 0)
      break;
  }
}
var Int64;
var init_Int64 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/Int64.js"() {
    init_index_browser2();
    Int64 = class _Int64 {
      bytes;
      constructor(bytes2) {
        this.bytes = bytes2;
        if (bytes2.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes2 = new Uint8Array(8);
        for (let i2 = 7, remaining = Math.abs(Math.round(number)); i2 > -1 && remaining > 0; i2--, remaining /= 256) {
          bytes2[i2] = remaining;
        }
        if (number < 0) {
          negate(bytes2);
        }
        return new _Int64(bytes2);
      }
      valueOf() {
        const bytes2 = this.bytes.slice(0);
        const negative = bytes2[0] & 128;
        if (negative) {
          negate(bytes2);
        }
        return parseInt(toHex(bytes2), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/HeaderMarshaller.js
var HeaderMarshaller, HEADER_VALUE_TYPE, BOOLEAN_TAG, BYTE_TAG, SHORT_TAG, INT_TAG, LONG_TAG, BINARY_TAG, STRING_TAG, TIMESTAMP_TAG, UUID_TAG, UUID_PATTERN;
var init_HeaderMarshaller = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/HeaderMarshaller.js"() {
    init_transport();
    init_index_browser2();
    init_Int64();
    HeaderMarshaller = class {
      toUtf8;
      fromUtf8;
      constructor(toUtf82, fromUtf82) {
        this.toUtf8 = toUtf82;
        this.fromUtf8 = fromUtf82;
      }
      format(headers) {
        const chunks = [];
        for (const headerName in headers) {
          if (!hasOwn(headers, headerName))
            continue;
          const bytes2 = this.fromUtf8(headerName);
          chunks.push(Uint8Array.from([bytes2.byteLength]), bytes2, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes2) => carry + bytes2.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([header.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(0, 3);
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(0, 4);
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(0, 6);
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = this.fromUtf8(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(0, 7);
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set(fromHex(header.value.replace(/-/g, "")), 1);
            return uuidBytes;
        }
      }
      parse(headers) {
        const out = {};
        let position = 0;
        while (position < headers.byteLength) {
          const nameLength = headers.getUint8(position++);
          const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
          position += nameLength;
          switch (headers.getUint8(position++)) {
            case 0:
              out[name] = {
                type: BOOLEAN_TAG,
                value: true
              };
              break;
            case 1:
              out[name] = {
                type: BOOLEAN_TAG,
                value: false
              };
              break;
            case 2:
              out[name] = {
                type: BYTE_TAG,
                value: headers.getInt8(position++)
              };
              break;
            case 3:
              out[name] = {
                type: SHORT_TAG,
                value: headers.getInt16(position, false)
              };
              position += 2;
              break;
            case 4:
              out[name] = {
                type: INT_TAG,
                value: headers.getInt32(position, false)
              };
              position += 4;
              break;
            case 5:
              out[name] = {
                type: LONG_TAG,
                value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
              };
              position += 8;
              break;
            case 6:
              const binaryLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: BINARY_TAG,
                value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
              };
              position += binaryLength;
              break;
            case 7:
              const stringLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: STRING_TAG,
                value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
              };
              position += stringLength;
              break;
            case 8:
              out[name] = {
                type: TIMESTAMP_TAG,
                value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
              };
              position += 8;
              break;
            case 9:
              const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
              position += 16;
              out[name] = {
                type: UUID_TAG,
                value: `${toHex(uuidBytes.subarray(0, 4))}-${toHex(uuidBytes.subarray(4, 6))}-${toHex(uuidBytes.subarray(6, 8))}-${toHex(uuidBytes.subarray(8, 10))}-${toHex(uuidBytes.subarray(10))}`
              };
              break;
            default:
              throw new Error(`Unrecognized header type tag`);
          }
        }
        return out;
      }
    };
    (function(HEADER_VALUE_TYPE3) {
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolTrue"] = 0] = "boolTrue";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolFalse"] = 1] = "boolFalse";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byte"] = 2] = "byte";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["short"] = 3] = "short";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["integer"] = 4] = "integer";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["long"] = 5] = "long";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byteArray"] = 6] = "byteArray";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["string"] = 7] = "string";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["timestamp"] = 8] = "timestamp";
      HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["uuid"] = 9] = "uuid";
    })(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
    BOOLEAN_TAG = "boolean";
    BYTE_TAG = "byte";
    SHORT_TAG = "short";
    INT_TAG = "integer";
    LONG_TAG = "long";
    BINARY_TAG = "binary";
    STRING_TAG = "string";
    TIMESTAMP_TAG = "timestamp";
    UUID_TAG = "uuid";
    UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/splitMessage.js
function splitMessage({ byteLength, byteOffset, buffer }) {
  if (byteLength < MINIMUM_MESSAGE_LENGTH) {
    throw new Error("Provided message too short to accommodate event stream message overhead");
  }
  const view = new DataView(buffer, byteOffset, byteLength);
  const messageLength = view.getUint32(0, false);
  if (byteLength !== messageLength) {
    throw new Error("Reported message length does not match received message length");
  }
  const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
  const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
  const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
  const checksummer = new Crc32Js();
  checksummer.update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
  if (expectedPreludeChecksum !== checksummer.digestSync()) {
    throw new Error(`The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digestSync()})`);
  }
  checksummer.update(new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH)));
  if (expectedMessageChecksum !== checksummer.digestSync()) {
    throw new Error(`The message checksum (${checksummer.digestSync()}) did not match the expected value of ${expectedMessageChecksum}`);
  }
  return {
    headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
    body: new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength, messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH))
  };
}
var PRELUDE_MEMBER_LENGTH, PRELUDE_LENGTH, CHECKSUM_LENGTH, MINIMUM_MESSAGE_LENGTH;
var init_splitMessage = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/splitMessage.js"() {
    init_index_browser3();
    PRELUDE_MEMBER_LENGTH = 4;
    PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
    CHECKSUM_LENGTH = 4;
    MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/EventStreamCodec.js
var EventStreamCodec;
var init_EventStreamCodec = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/EventStreamCodec.js"() {
    init_index_browser3();
    init_HeaderMarshaller();
    init_splitMessage();
    EventStreamCodec = class {
      headerMarshaller;
      messageBuffer;
      isEndOfStream;
      constructor(toUtf82, fromUtf82) {
        this.headerMarshaller = new HeaderMarshaller(toUtf82, fromUtf82);
        this.messageBuffer = [];
        this.isEndOfStream = false;
      }
      feed(message) {
        this.messageBuffer.push(this.decode(message));
      }
      endOfStream() {
        this.isEndOfStream = true;
      }
      getMessage() {
        const message = this.messageBuffer.pop();
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessage() {
            return message;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      getAvailableMessages() {
        const messages = this.messageBuffer;
        this.messageBuffer = [];
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessages() {
            return messages;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      encode({ headers: rawHeaders, body }) {
        const headers = this.headerMarshaller.format(rawHeaders);
        const length = headers.byteLength + body.byteLength + 16;
        const out = new Uint8Array(length);
        const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
        const checksum = new Crc32Js();
        view.setUint32(0, length, false);
        view.setUint32(4, headers.byteLength, false);
        checksum.update(out.subarray(0, 8));
        view.setUint32(8, checksum.digestSync(), false);
        out.set(headers, 12);
        out.set(body, headers.byteLength + 12);
        checksum.update(out.subarray(8, length - 4));
        view.setUint32(length - 4, checksum.digestSync(), false);
        return out;
      }
      decode(message) {
        const { headers, body } = splitMessage(message);
        return { headers: this.headerMarshaller.parse(headers), body };
      }
      formatHeaders(rawHeaders) {
        return this.headerMarshaller.format(rawHeaders);
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageDecoderStream.js
var MessageDecoderStream;
var init_MessageDecoderStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageDecoderStream.js"() {
    MessageDecoderStream = class {
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const bytes2 of this.options.inputStream) {
          const decoded = this.options.decoder.decode(bytes2);
          yield decoded;
        }
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageEncoderStream.js
var MessageEncoderStream;
var init_MessageEncoderStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/MessageEncoderStream.js"() {
    MessageEncoderStream = class {
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const msg of this.options.messageStream) {
          const encoded = this.options.encoder.encode(msg);
          yield encoded;
        }
        if (this.options.includeEndFrame) {
          yield new Uint8Array(0);
        }
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageDecoderStream.js
var SmithyMessageDecoderStream;
var init_SmithyMessageDecoderStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageDecoderStream.js"() {
    SmithyMessageDecoderStream = class {
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const message of this.options.messageStream) {
          const deserialized = await this.options.deserializer(message);
          if (deserialized === void 0)
            continue;
          yield deserialized;
        }
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageEncoderStream.js
var SmithyMessageEncoderStream;
var init_SmithyMessageEncoderStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-codec/SmithyMessageEncoderStream.js"() {
    SmithyMessageEncoderStream = class {
      options;
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const chunk of this.options.inputStream) {
          const payloadBuf = this.options.serializer(chunk);
          yield payloadBuf;
        }
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getChunkedStream.js
function getChunkedStream(source) {
  let currentMessageTotalLength = 0;
  let currentMessagePendingLength = 0;
  let currentMessage = null;
  let messageLengthBuffer = null;
  const allocateMessage = (size) => {
    if (typeof size !== "number") {
      throw new Error("Attempted to allocate an event message where size was not a number: " + size);
    }
    currentMessageTotalLength = size;
    currentMessagePendingLength = 4;
    currentMessage = new Uint8Array(size);
    const currentMessageView = new DataView(currentMessage.buffer);
    currentMessageView.setUint32(0, size, false);
  };
  const iterator = async function* () {
    const sourceIterator = source[Symbol.asyncIterator]();
    while (true) {
      const { value, done } = await sourceIterator.next();
      if (done) {
        if (!currentMessageTotalLength) {
          return;
        } else if (currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }
      const chunkLength = value.length;
      let currentOffset = 0;
      while (currentOffset < chunkLength) {
        if (!currentMessage) {
          const bytesRemaining = chunkLength - currentOffset;
          if (!messageLengthBuffer) {
            messageLengthBuffer = new Uint8Array(4);
          }
          const numBytesForTotal = Math.min(4 - currentMessagePendingLength, bytesRemaining);
          messageLengthBuffer.set(value.slice(currentOffset, currentOffset + numBytesForTotal), currentMessagePendingLength);
          currentMessagePendingLength += numBytesForTotal;
          currentOffset += numBytesForTotal;
          if (currentMessagePendingLength < 4) {
            break;
          }
          allocateMessage(new DataView(messageLengthBuffer.buffer).getUint32(0, false));
          messageLengthBuffer = null;
        }
        const numBytesToWrite = Math.min(currentMessageTotalLength - currentMessagePendingLength, chunkLength - currentOffset);
        currentMessage.set(value.slice(currentOffset, currentOffset + numBytesToWrite), currentMessagePendingLength);
        currentMessagePendingLength += numBytesToWrite;
        currentOffset += numBytesToWrite;
        if (currentMessageTotalLength && currentMessageTotalLength === currentMessagePendingLength) {
          yield currentMessage;
          currentMessage = null;
          currentMessageTotalLength = 0;
          currentMessagePendingLength = 0;
        }
      }
    }
  };
  return {
    [Symbol.asyncIterator]: iterator
  };
}
var init_getChunkedStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getChunkedStream.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getUnmarshalledStream.js
function getUnmarshalledStream(source, options) {
  const messageUnmarshaller = getMessageUnmarshaller(options.deserializer, options.toUtf8);
  return {
    [Symbol.asyncIterator]: async function* () {
      for await (const chunk of source) {
        const message = options.eventStreamCodec.decode(chunk);
        const type = await messageUnmarshaller(message);
        if (type === void 0)
          continue;
        yield type;
      }
    }
  };
}
function getMessageUnmarshaller(deserializer, toUtf82) {
  return async function(message) {
    const { value: messageType } = message.headers[":message-type"];
    if (messageType === "error") {
      const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
      unmodeledError.name = message.headers[":error-code"].value;
      throw unmodeledError;
    } else if (messageType === "exception") {
      const code = message.headers[":exception-type"].value;
      const exception = { [code]: message };
      const deserializedException = await deserializer(exception);
      if (deserializedException.$unknown) {
        const error = new Error(toUtf82(message.body));
        error.name = code;
        throw error;
      }
      throw deserializedException[code];
    } else if (messageType === "event") {
      const event = {
        [message.headers[":event-type"].value]: message
      };
      const deserialized = await deserializer(event);
      if (deserialized.$unknown)
        return;
      return deserialized;
    } else {
      throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
    }
  };
}
var init_getUnmarshalledStream = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/getUnmarshalledStream.js"() {
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/EventStreamMarshaller.js
var EventStreamMarshaller, eventStreamSerdeProvider;
var init_EventStreamMarshaller = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-universal/EventStreamMarshaller.js"() {
    init_EventStreamCodec();
    init_MessageDecoderStream();
    init_MessageEncoderStream();
    init_SmithyMessageDecoderStream();
    init_SmithyMessageEncoderStream();
    init_getChunkedStream();
    init_getUnmarshalledStream();
    EventStreamMarshaller = class {
      eventStreamCodec;
      utfEncoder;
      constructor({ utf8Encoder, utf8Decoder }) {
        this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
      }
      deserialize(body, deserializer) {
        const inputStream = getChunkedStream(body);
        return new SmithyMessageDecoderStream({
          messageStream: new MessageDecoderStream({ inputStream, decoder: this.eventStreamCodec }),
          deserializer: getMessageUnmarshaller(deserializer, this.utfEncoder)
        });
      }
      serialize(inputStream, serializer) {
        return new MessageEncoderStream({
          messageStream: new SmithyMessageEncoderStream({ inputStream, serializer }),
          encoder: this.eventStreamCodec,
          includeEndFrame: true
        });
      }
    };
    eventStreamSerdeProvider = (options) => new EventStreamMarshaller(options);
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/utils.js
var readableStreamToIterable, iterableToReadableStream;
var init_utils = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/utils.js"() {
    readableStreamToIterable = (readableStream) => ({
      [Symbol.asyncIterator]: async function* () {
        const reader = readableStream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done)
              return;
            yield value;
          }
        } finally {
          reader.releaseLock();
        }
      }
    });
    iterableToReadableStream = (asyncIterable) => {
      const iterator = asyncIterable[Symbol.asyncIterator]();
      return new ReadableStream({
        async pull(controller) {
          const { done, value } = await iterator.next();
          if (done) {
            return controller.close();
          }
          controller.enqueue(value);
        }
      });
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/EventStreamMarshaller.browser.js
var EventStreamMarshaller2, isReadableStream2, eventStreamSerdeProvider2;
var init_EventStreamMarshaller_browser = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde/EventStreamMarshaller.browser.js"() {
    init_EventStreamMarshaller();
    init_utils();
    EventStreamMarshaller2 = class {
      universalMarshaller;
      constructor({ utf8Encoder, utf8Decoder }) {
        this.universalMarshaller = new EventStreamMarshaller({
          utf8Decoder,
          utf8Encoder
        });
      }
      deserialize(body, deserializer) {
        const bodyIterable = isReadableStream2(body) ? readableStreamToIterable(body) : body;
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
      }
      serialize(input, serializer) {
        const serializedIterable = this.universalMarshaller.serialize(input, serializer);
        return typeof ReadableStream === "function" ? iterableToReadableStream(serializedIterable) : serializedIterable;
      }
    };
    isReadableStream2 = (body) => typeof ReadableStream === "function" && body instanceof ReadableStream;
    eventStreamSerdeProvider2 = (options) => new EventStreamMarshaller2(options);
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-config-resolver/EventStreamSerdeConfig.js
var resolveEventStreamSerdeConfig;
var init_EventStreamSerdeConfig = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/eventstream-serde-config-resolver/EventStreamSerdeConfig.js"() {
    resolveEventStreamSerdeConfig = (input) => Object.assign(input, {
      eventStreamMarshaller: input.eventStreamSerdeProvider(input)
    });
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/EventStreamSerde.js
var EventStreamSerde;
var init_EventStreamSerde = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/EventStreamSerde.js"() {
    init_transport();
    init_schema();
    init_index_browser2();
    EventStreamSerde = class {
      marshaller;
      serializer;
      deserializer;
      serdeContext;
      defaultContentType;
      compositeErrorRegistry;
      constructor({ marshaller, serializer, deserializer, serdeContext, defaultContentType, compositeErrorRegistry }) {
        this.marshaller = marshaller;
        this.serializer = serializer;
        this.deserializer = deserializer;
        this.serdeContext = serdeContext;
        this.defaultContentType = defaultContentType;
        this.compositeErrorRegistry = compositeErrorRegistry;
      }
      async serializeEventStream({ eventStream, requestSchema, initialRequest, initialMessageType }) {
        const marshaller = this.marshaller;
        const eventStreamMember = requestSchema.getEventStreamMember();
        const unionSchema = requestSchema.getMemberSchema(eventStreamMember);
        const serializer = this.serializer;
        const defaultContentType = this.defaultContentType;
        const initialRequestMarker = Symbol("initialRequestMarker");
        const eventStreamIterable = {
          async *[Symbol.asyncIterator]() {
            if (initialRequest) {
              const headers = {
                ":event-type": { type: "string", value: initialMessageType ?? "initial-request" },
                ":message-type": { type: "string", value: "event" },
                ":content-type": { type: "string", value: defaultContentType }
              };
              serializer.write(requestSchema, initialRequest);
              const body = serializer.flush();
              yield {
                [initialRequestMarker]: true,
                headers,
                body
              };
            }
            for await (const page of eventStream) {
              yield page;
            }
          }
        };
        return marshaller.serialize(eventStreamIterable, (event) => {
          if (event[initialRequestMarker]) {
            return {
              headers: event.headers,
              body: event.body
            };
          }
          let unionMember = "";
          for (const key in event) {
            if (!hasOwn(event, key))
              continue;
            if (key !== "__type") {
              unionMember = key;
              break;
            }
          }
          const { additionalHeaders, body, eventType, explicitPayloadContentType } = this.writeEventBody(unionMember, unionSchema, event);
          const headers = {
            ":event-type": { type: "string", value: eventType },
            ":message-type": { type: "string", value: "event" },
            ":content-type": { type: "string", value: explicitPayloadContentType ?? defaultContentType },
            ...additionalHeaders
          };
          return {
            headers,
            body
          };
        });
      }
      async deserializeEventStream({ response, responseSchema, initialResponseContainer, initialMessageType }) {
        const marshaller = this.marshaller;
        const eventStreamMember = responseSchema.getEventStreamMember();
        const unionSchema = responseSchema.getMemberSchema(eventStreamMember);
        const memberSchemas = unionSchema.getMemberSchemas();
        const initialResponseMarker = Symbol("initialResponseMarker");
        const asyncIterable = marshaller.deserialize(response.body, async (event) => {
          let unionMember = "";
          for (const key in event) {
            if (!hasOwn(event, key))
              continue;
            if (key !== "__type") {
              unionMember = key;
              break;
            }
          }
          const body = event[unionMember].body;
          if (unionMember === (initialMessageType ?? "initial-response")) {
            const dataObject = await this.deserializer.read(responseSchema, body);
            delete dataObject[eventStreamMember];
            return {
              [initialResponseMarker]: true,
              ...dataObject
            };
          } else if (unionMember in memberSchemas) {
            const eventStreamSchema = memberSchemas[unionMember];
            if (eventStreamSchema.isStructSchema()) {
              const out = {};
              let hasBindings = false;
              for (const [name, member2] of eventStreamSchema.structIterator()) {
                const { eventHeader, eventPayload } = member2.getMergedTraits();
                hasBindings = hasBindings || Boolean(eventHeader || eventPayload);
                if (eventPayload) {
                  if (member2.isBlobSchema()) {
                    out[name] = body;
                  } else if (member2.isStringSchema()) {
                    out[name] = (this.serdeContext?.utf8Encoder ?? toUtf8)(body);
                  } else if (member2.isStructSchema()) {
                    out[name] = await this.deserializer.read(member2, body);
                  }
                } else if (eventHeader) {
                  const value = event[unionMember].headers[name]?.value;
                  if (value != null) {
                    if (member2.isNumericSchema()) {
                      if (value && typeof value === "object" && "bytes" in value) {
                        out[name] = BigInt(value.toString());
                      } else {
                        out[name] = Number(value);
                      }
                    } else {
                      out[name] = value;
                    }
                  }
                }
              }
              return {
                [unionMember]: await this.readEventMember(eventStreamSchema, body, hasBindings, out)
              };
            }
            return {
              [unionMember]: await this.deserializer.read(eventStreamSchema, body)
            };
          } else {
            return {
              $unknown: event
            };
          }
        });
        const asyncIterator = asyncIterable[Symbol.asyncIterator]();
        const firstEvent = await asyncIterator.next();
        if (firstEvent.done) {
          return asyncIterable;
        }
        if (firstEvent.value?.[initialResponseMarker]) {
          if (!responseSchema) {
            throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
          }
          for (const key in firstEvent.value) {
            if (!hasOwn(firstEvent.value, key))
              continue;
            initialResponseContainer[key] = firstEvent.value[key];
          }
        }
        return {
          async *[Symbol.asyncIterator]() {
            if (!firstEvent?.value?.[initialResponseMarker]) {
              yield firstEvent.value;
            }
            while (true) {
              const { done, value } = await asyncIterator.next();
              if (done) {
                break;
              }
              yield value;
            }
          }
        };
      }
      async readEventMember(eventStreamSchema, body, hasBindings, out) {
        let ErrCtor;
        const staticStructuralSchema = eventStreamSchema.getSchema();
        if (Array.isArray(staticStructuralSchema) && staticStructuralSchema[0] === -3) {
          const namespace = staticStructuralSchema[1];
          const nsRegistry = TypeRegistry.for(namespace);
          this.compositeErrorRegistry?.copyFrom(nsRegistry);
          ErrCtor = (this.compositeErrorRegistry ?? nsRegistry)?.getErrorCtor(staticStructuralSchema);
        }
        const dataObject = hasBindings ? out : body.byteLength === 0 ? {} : await this.deserializer.read(eventStreamSchema, body);
        if (ErrCtor) {
          const message = dataObject.message ?? dataObject.Message ?? "Unknown";
          const metadata = {};
          const $fault = eventStreamSchema.getMergedTraits().error;
          if ($fault) {
            metadata.$fault = $fault;
          }
          return Object.assign(new ErrCtor({}), metadata, {
            message
          }, dataObject);
        }
        return dataObject;
      }
      writeEventBody(unionMember, unionSchema, event) {
        const serializer = this.serializer;
        let eventType = unionMember;
        let explicitPayloadMember = null;
        let explicitPayloadContentType;
        const isKnownSchema = (() => {
          const struct = unionSchema.getSchema();
          return struct[4].includes(unionMember);
        })();
        const additionalHeaders = {};
        if (!isKnownSchema) {
          const [type, value] = event[unionMember];
          eventType = type;
          serializer.write(15, value);
        } else {
          const eventSchema = unionSchema.getMemberSchema(unionMember);
          if (eventSchema.isStructSchema()) {
            for (const [memberName, memberSchema] of eventSchema.structIterator()) {
              const { eventHeader, eventPayload } = memberSchema.getMergedTraits();
              if (eventPayload) {
                explicitPayloadMember = memberName;
              } else if (eventHeader) {
                const value = event[unionMember][memberName];
                let type = "binary";
                if (memberSchema.isNumericSchema()) {
                  if ((-2) ** 31 <= value && value <= 2 ** 31 - 1) {
                    type = "integer";
                  } else {
                    type = "long";
                  }
                } else if (memberSchema.isTimestampSchema()) {
                  type = "timestamp";
                } else if (memberSchema.isStringSchema()) {
                  type = "string";
                } else if (memberSchema.isBooleanSchema()) {
                  type = "boolean";
                }
                if (value != null) {
                  additionalHeaders[memberName] = {
                    type,
                    value
                  };
                  delete event[unionMember][memberName];
                }
              }
            }
            if (explicitPayloadMember !== null) {
              const payloadSchema = eventSchema.getMemberSchema(explicitPayloadMember);
              if (payloadSchema.isBlobSchema()) {
                explicitPayloadContentType = "application/octet-stream";
              } else if (payloadSchema.isStringSchema()) {
                explicitPayloadContentType = "text/plain";
              }
              serializer.write(payloadSchema, event[unionMember][explicitPayloadMember]);
            } else {
              serializer.write(eventSchema, event[unionMember]);
            }
          } else if (eventSchema.isUnitSchema()) {
            serializer.write(eventSchema, {});
          } else {
            throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
          }
        }
        const messageSerialization = serializer.flush() ?? new Uint8Array();
        const body = typeof messageSerialization === "string" ? (this.serdeContext?.utf8Decoder ?? fromUtf8)(messageSerialization) : messageSerialization;
        return {
          body,
          eventType,
          explicitPayloadContentType,
          additionalHeaders
        };
      }
    };
  }
});

// node_modules/@smithy/core/dist-es/submodules/event-streams/index.browser.js
var index_browser_exports = {};
__export(index_browser_exports, {
  EventStreamCodec: () => EventStreamCodec,
  EventStreamMarshaller: () => EventStreamMarshaller2,
  EventStreamSerde: () => EventStreamSerde,
  HeaderMarshaller: () => HeaderMarshaller,
  Int64: () => Int64,
  MessageDecoderStream: () => MessageDecoderStream,
  MessageEncoderStream: () => MessageEncoderStream,
  SmithyMessageDecoderStream: () => SmithyMessageDecoderStream,
  SmithyMessageEncoderStream: () => SmithyMessageEncoderStream,
  UniversalEventStreamMarshaller: () => EventStreamMarshaller,
  eventStreamSerdeProvider: () => eventStreamSerdeProvider2,
  getChunkedStream: () => getChunkedStream,
  getMessageUnmarshaller: () => getMessageUnmarshaller,
  getUnmarshalledStream: () => getUnmarshalledStream,
  iterableToReadableStream: () => iterableToReadableStream,
  readableStreamToIterable: () => readableStreamToIterable,
  resolveEventStreamSerdeConfig: () => resolveEventStreamSerdeConfig,
  universalEventStreamSerdeProvider: () => eventStreamSerdeProvider
});
var init_index_browser4 = __esm({
  "node_modules/@smithy/core/dist-es/submodules/event-streams/index.browser.js"() {
    init_EventStreamCodec();
    init_HeaderMarshaller();
    init_Int64();
    init_MessageDecoderStream();
    init_MessageEncoderStream();
    init_SmithyMessageDecoderStream();
    init_SmithyMessageEncoderStream();
    init_EventStreamMarshaller_browser();
    init_utils();
    init_EventStreamMarshaller();
    init_getChunkedStream();
    init_getUnmarshalledStream();
    init_EventStreamSerdeConfig();
    init_EventStreamSerde();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VaultPixPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian7 = require("obsidian");

// src/settings.ts
var DEFAULT_SETTINGS = {
  enabled: true,
  workMode: "automatic",
  autoProcessPaste: true,
  autoProcessDrop: true,
  image: {
    outputFormat: "webp",
    webpQuality: 82,
    jpegQuality: 85,
    avifQuality: 70,
    resizeMode: "long-edge",
    resizeWidth: 2560,
    resizeHeight: 2560,
    longEdge: 2560,
    shortEdge: 1440,
    preventUpscale: true,
    preserveGif: true,
    preserveSvg: true
  },
  naming: {
    filenameTemplate: "{noteName}-{index}",
    remotePathTemplate: "obsidian/{YYYY}/{MM}/{noteName}",
    conflictStrategy: "hash",
    hashLength: 12,
    unicodeFilenames: true
  },
  uploader: {
    provider: "r2",
    endpoint: "",
    region: "auto",
    bucket: "",
    accessKeyId: "",
    secretAccessKey: "",
    publicBaseUrl: "",
    pathPrefix: "",
    forcePathStyle: false
  },
  markdown: { preserveAlt: true, wikiSizeStrategy: "html", imageAlignment: "center" },
  cleanup: { strategy: "backup", backupFolder: ".vaultpix-backup" },
  batch: { concurrency: 3, retries: 3, timeoutMs: 15e3, verifyUpload: true },
  advanced: { manifestEnabled: true, logLevel: "info" }
};
function mergeSettings(data) {
  const saved = data && typeof data === "object" ? data : {};
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    image: { ...DEFAULT_SETTINGS.image, ...saved.image },
    naming: { ...DEFAULT_SETTINGS.naming, ...saved.naming },
    uploader: { ...DEFAULT_SETTINGS.uploader, ...saved.uploader },
    markdown: { ...DEFAULT_SETTINGS.markdown, ...saved.markdown },
    cleanup: { ...DEFAULT_SETTINGS.cleanup, ...saved.cleanup },
    batch: { ...DEFAULT_SETTINGS.batch, ...saved.batch },
    advanced: { ...DEFAULT_SETTINGS.advanced, ...saved.advanced }
  };
}

// src/utils/logger.ts
var RANK = { error: 0, warn: 1, info: 2, debug: 3 };
var Logger = class {
  constructor(level = "info") {
    this.level = level;
  }
  setLevel(level) {
    this.level = level;
  }
  error(message, detail) {
    this.log("error", message, detail);
  }
  warn(message, detail) {
    this.log("warn", message, detail);
  }
  info(message, detail) {
    this.log("info", message, detail);
  }
  debug(message, detail) {
    this.log("debug", message, detail);
  }
  log(level, message, detail) {
    if (RANK[level] > RANK[this.level]) return;
    const safeDetail = typeof detail === "string" ? detail.replace(/(authorization|secret|token|access.?key)\s*[:=]\s*\S+/gi, "$1=[\u5DF2\u9690\u85CF]") : detail;
    const fn = level === "debug" ? console.debug : level === "info" ? console.info : level === "warn" ? console.warn : console.error;
    fn(`[\u56FE\u7247\u8D44\u4EA7\u7BA1\u5BB6][${level.toUpperCase()}] ${message}`, safeDetail ?? "");
  }
};

// src/utils/mime.ts
var MIME_BY_EXTENSION = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
  svg: "image/svg+xml",
  bmp: "image/bmp",
  tif: "image/tiff",
  tiff: "image/tiff",
  heic: "image/heic",
  heif: "image/heif"
};
var IMAGE_EXTENSIONS = new Set(Object.keys(MIME_BY_EXTENSION));
function extensionOf(name) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}
function mimeFromName(name) {
  return MIME_BY_EXTENSION[extensionOf(name)] ?? "application/octet-stream";
}
function extensionForMime(mime) {
  const hit = Object.entries(MIME_BY_EXTENSION).find(([, value]) => value === mime);
  return hit?.[0] === "jpg" ? "jpeg" : hit?.[0] ?? "bin";
}
function isImageName(name) {
  return IMAGE_EXTENSIONS.has(extensionOf(name));
}

// src/markdown/MarkdownImageParser.ts
var MarkdownImageParser = class {
  parse(content, notePath) {
    const protectedRanges = this.protectedRanges(content);
    const references = [];
    this.collect(content, notePath, /!\[\[([^\]\n]+)\]\]/g, "wiki", protectedRanges, references);
    this.collect(content, notePath, /!\[([^\]\n]*)\]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+["'][^"'\n]*["'])?\s*\)/g, "markdown", protectedRanges, references);
    this.collect(content, notePath, /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi, "html", protectedRanges, references);
    return references.sort((a2, b2) => a2.start - b2.start);
  }
  collect(content, notePath, regex, type, protectedRanges, output) {
    for (const match of content.matchAll(regex)) {
      const start = match.index;
      if (start === void 0 || this.isProtected(start, protectedRanges)) continue;
      let imagePath = "", alt = "", displayWidth;
      if (type === "wiki") {
        const parts = (match[1] ?? "").split("|");
        imagePath = parts[0]?.trim() ?? "";
        const width = Number(parts[1]);
        if (Number.isFinite(width) && width > 0) displayWidth = width;
      } else if (type === "markdown") {
        alt = match[1] ?? "";
        imagePath = (match[2] ?? match[3] ?? "").trim();
      } else {
        imagePath = match[1]?.trim() ?? "";
        alt = /\balt\s*=\s*["']([^"']*)["']/i.exec(match[0])?.[1] ?? "";
        const width = Number(/\bwidth\s*=\s*["']?(\d+)/i.exec(match[0])?.[1]);
        if (Number.isFinite(width) && width > 0) displayWidth = width;
      }
      if (!imagePath) continue;
      try {
        imagePath = decodeURIComponent(imagePath);
      } catch {
      }
      output.push({
        notePath,
        imagePath,
        rawLink: match[0],
        linkType: type,
        alt,
        displayWidth,
        start,
        end: start + match[0].length,
        remote: /^(?:https?:)?\/\//i.test(imagePath)
      });
    }
  }
  protectedRanges(content) {
    const ranges = [];
    if (content.startsWith("---\n") || content.startsWith("---\r\n")) {
      const match = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.exec(content);
      if (match) ranges.push({ start: 0, end: match[0].length });
    }
    for (const match of content.matchAll(/^( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\2\s*$/gm)) {
      if (match.index !== void 0) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    for (const match of content.matchAll(/<!--(?:[\s\S]*?)-->|<(?:pre|code)\b[^>]*>[\s\S]*?<\/(?:pre|code)>/gi)) {
      if (match.index !== void 0) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    for (const match of content.matchAll(/(`+)(?!`)(?:[^`\n]|`(?!\1))*?\1/g)) {
      if (match.index !== void 0) ranges.push({ start: match.index, end: match.index + match[0].length });
    }
    return ranges.sort((a2, b2) => a2.start - b2.start);
  }
  isProtected(position, ranges) {
    return ranges.some((range2) => position >= range2.start && position < range2.end);
  }
};

// src/markdown/MarkdownReplacer.ts
var MarkdownReplacer = class {
  apply(content, replacements) {
    const sorted = [...replacements].sort((a2, b2) => b2.start - a2.start);
    let previousStart = content.length + 1;
    let result = content;
    for (const replacement of sorted) {
      if (replacement.start < 0 || replacement.end > content.length || replacement.start >= replacement.end) throw new Error("Markdown \u66FF\u6362\u8303\u56F4\u65E0\u6548\u3002");
      if (replacement.end > previousStart) throw new Error("Markdown \u66FF\u6362\u8303\u56F4\u4E92\u76F8\u91CD\u53E0\u3002");
      if (content.slice(replacement.start, replacement.end) !== replacement.expected) throw new Error("\u7B14\u8BB0\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u5DF2\u505C\u6B62\u5199\u5165\u4EE5\u907F\u514D\u8986\u76D6\u65B0\u5185\u5BB9\u3002");
      result = result.slice(0, replacement.start) + replacement.replacement + result.slice(replacement.end);
      previousStart = replacement.start;
    }
    return result;
  }
};

// src/markdown/ImageAlignment.ts
var OPEN_WRAPPER = /<span\s+class=["']iam-image-align-(?:left|center|right)["']\s*>\s*$/i;
var CLOSE_WRAPPER = /^\s*<\/span>/i;
function imageAlignmentReplacement(content, reference, alignment) {
  const before = content.slice(0, reference.start);
  const after = content.slice(reference.end);
  const open = OPEN_WRAPPER.exec(before);
  const close = CLOSE_WRAPPER.exec(after);
  const wrapped = open?.index !== void 0 && close !== null;
  const start = wrapped && open ? open.index : reference.start;
  const end = wrapped && close ? reference.end + close[0].length : reference.end;
  const replacement = alignment ? `<span class="iam-image-align-${alignment}">${reference.rawLink}</span>` : reference.rawLink;
  return { start, end, expected: content.slice(start, end), replacement };
}

// src/utils/path.ts
function normalizeVaultPath(path) {
  return path.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "").replace(/\/{2,}/g, "/");
}
function joinVaultPath(...parts) {
  return normalizeVaultPath(parts.filter(Boolean).join("/"));
}
function sanitizePathSegment(value, unicode = true) {
  let result = value.normalize("NFKC").replace(/[\\/:*?"<>|#^[\]]/g, "-").replace(/\s+/g, "-").replace(/-{2,}/g, "-").replace(/^[-. ]+|[-. ]+$/g, "");
  if (!unicode) result = result.normalize("NFKD").replace(/[^\x00-\x7F]/g, "").replace(/[^A-Za-z0-9._-]/g, "-");
  return result || "image";
}
function encodeUrlPath(path) {
  return normalizeVaultPath(path).split("/").map(encodeURIComponent).join("/");
}

// src/manifest/ManifestStore.ts
var ManifestStore = class {
  constructor(app, pluginId) {
    this.app = app;
    this.pluginId = pluginId;
  }
  data = { version: 1, items: [] };
  loaded = false;
  writeChain = Promise.resolve();
  async load() {
    if (this.loaded) return;
    const path = this.filePath();
    if (await this.app.vault.adapter.exists(path)) {
      const raw = await this.app.vault.adapter.read(path);
      try {
        const parsed = JSON.parse(raw);
        this.data = { version: 1, items: Array.isArray(parsed.items) ? parsed.items : [] };
      } catch {
        await this.ensureDirectory();
        await this.app.vault.adapter.write(joinVaultPath(this.directory(), `image-manifest.corrupt-${Date.now()}.json`), raw);
        this.data = { version: 1, items: [] };
      }
    }
    this.loaded = true;
  }
  async upsert(item) {
    await this.load();
    const existingIndex = this.data.items.findIndex((candidate) => candidate.id === item.id || candidate.processedHash === item.processedHash);
    if (existingIndex >= 0) {
      const previous = this.data.items[existingIndex];
      if (previous) this.data.items[existingIndex] = { ...previous, ...item, sourcePath: previous.sourcePath, createdAt: previous.createdAt, references: [.../* @__PURE__ */ new Set([...previous.references, ...item.references])] };
    } else this.data.items.push(item);
    await this.save();
  }
  async findByProcessedHash(hash) {
    await this.load();
    return this.data.items.find((item) => item.processedHash === hash);
  }
  async findBySourcePath(path) {
    await this.load();
    return this.data.items.find((item) => item.sourcePath === path);
  }
  async all() {
    await this.load();
    return this.data.items.map((item) => ({ ...item, references: [...item.references] }));
  }
  async removeByMigrationUrls(urls) {
    await this.load();
    this.data.items = this.data.items.filter((item) => !urls.has(item.url));
    await this.save();
  }
  async save() {
    this.writeChain = this.writeChain.then(async () => {
      await this.ensureDirectory();
      await this.app.vault.adapter.write(this.filePath(), JSON.stringify(this.data, null, 2));
    });
    await this.writeChain;
  }
  directory() {
    return joinVaultPath(this.app.vault.configDir, "plugins", this.pluginId, "data");
  }
  filePath() {
    return joinVaultPath(this.directory(), "image-manifest.json");
  }
  async ensureDirectory() {
    let current = "";
    for (const segment of this.directory().split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!await this.app.vault.adapter.exists(current)) await this.app.vault.adapter.mkdir(current);
    }
  }
};

// src/manifest/MigrationStore.ts
var MigrationStore = class {
  constructor(app, pluginId) {
    this.app = app;
    this.pluginId = pluginId;
  }
  writeChain = Promise.resolve();
  async save(record) {
    const content = JSON.stringify(record, null, 2);
    const pointer = JSON.stringify({ migrationId: record.migrationId });
    this.writeChain = this.writeChain.then(async () => {
      await this.ensureDirectory();
      await this.app.vault.adapter.write(this.recordPath(record.migrationId), content);
      await this.app.vault.adapter.write(joinVaultPath(this.directory(), "latest.json"), pointer);
    });
    await this.writeChain;
  }
  async loadLatest() {
    const pointer = joinVaultPath(this.directory(), "latest.json");
    if (!await this.app.vault.adapter.exists(pointer)) return void 0;
    try {
      const { migrationId } = JSON.parse(await this.app.vault.adapter.read(pointer));
      if (!migrationId || !await this.app.vault.adapter.exists(this.recordPath(migrationId))) return void 0;
      return JSON.parse(await this.app.vault.adapter.read(this.recordPath(migrationId)));
    } catch {
      return void 0;
    }
  }
  directory() {
    return joinVaultPath(this.app.vault.configDir, "plugins", this.pluginId, "data", "migrations");
  }
  recordPath(id) {
    return joinVaultPath(this.directory(), `${id}.json`);
  }
  async ensureDirectory() {
    let current = "";
    for (const segment of this.directory().split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!await this.app.vault.adapter.exists(current)) await this.app.vault.adapter.mkdir(current);
    }
  }
};

// src/scanner/VaultScanner.ts
var import_obsidian = require("obsidian");

// src/utils/hash.ts
async function sha256(data) {
  const digest2 = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest2), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// src/scanner/VaultScanner.ts
var VaultScanner = class {
  constructor(app, parser2) {
    this.app = app;
    this.parser = parser2;
  }
  async scan(calculateDuplicates = true) {
    const markdownFiles = this.app.vault.getMarkdownFiles();
    const imageFiles = this.app.vault.getFiles().filter((file) => isImageName(file.name));
    const assets = /* @__PURE__ */ new Map();
    let localReferences = 0, remoteReferences = 0, missingReferences = 0;
    for (const note of markdownFiles) {
      const content = await this.app.vault.cachedRead(note);
      for (const reference of this.parser.parse(content, note.path)) {
        if (reference.remote) {
          remoteReferences++;
          continue;
        }
        const target = this.app.metadataCache.getFirstLinkpathDest(reference.imagePath, note.path);
        if (!(target instanceof import_obsidian.TFile) || !isImageName(target.name)) {
          missingReferences++;
          continue;
        }
        localReferences++;
        reference.imagePath = target.path;
        const asset = assets.get(target.path) ?? { localPath: target.path, size: target.stat.size, references: [] };
        asset.references.push(reference);
        assets.set(target.path, asset);
      }
    }
    const duplicatesByHash = /* @__PURE__ */ new Map();
    if (calculateDuplicates) {
      const sizeGroups = /* @__PURE__ */ new Map();
      for (const file of imageFiles) sizeGroups.set(file.stat.size, [...sizeGroups.get(file.stat.size) ?? [], file]);
      for (const group3 of sizeGroups.values()) {
        if (group3.length < 2) continue;
        for (const file of group3) {
          const hash = await sha256(await this.app.vault.readBinary(file));
          duplicatesByHash.set(hash, [...duplicatesByHash.get(hash) ?? [], file.path]);
          const asset = assets.get(file.path);
          if (asset) asset.hash = hash;
        }
      }
    }
    return {
      markdownFiles: markdownFiles.length,
      imageFiles: imageFiles.length,
      localReferences,
      remoteReferences,
      missingReferences,
      unreferenced: imageFiles.filter((file) => !assets.has(file.path)).map((file) => file.path),
      duplicates: [...duplicatesByHash.values()].filter((paths) => paths.length > 1),
      localBytes: imageFiles.reduce((sum, file) => sum + file.stat.size, 0),
      assets
    };
  }
};

// src/utils/errors.ts
var ImageAssetError = class extends Error {
  constructor(code, message, cause) {
    super(message);
    this.code = code;
    this.cause = cause;
    this.name = "ImageAssetError";
  }
};
function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/core/image/BrowserImageProcessor.ts
var BrowserImageProcessor = class {
  async process(input, settings) {
    if (!input.data.byteLength || !input.mimeType.startsWith("image/")) {
      throw new ImageAssetError("INVALID_IMAGE" /* INVALID_IMAGE */, `\u201C${input.name}\u201D\u4E0D\u662F\u6709\u6548\u56FE\u7247\u3002`);
    }
    const inputExtension = extensionOf(input.name);
    const preserve = settings.outputFormat === "original" || inputExtension === "gif" && settings.preserveGif || inputExtension === "svg" && settings.preserveSvg;
    if (preserve) {
      const dimensions = await this.readDimensions(input).catch(() => ({ width: 0, height: 0 }));
      return this.finish(input.data.slice(0), input.mimeType, dimensions.width, dimensions.height, input.data.byteLength);
    }
    const bitmap = await this.decode(input);
    try {
      const geometry = this.calculateGeometry(bitmap.width, bitmap.height, settings);
      const canvas = document.createElement("canvas");
      canvas.width = geometry.canvasWidth;
      canvas.height = geometry.canvasHeight;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) throw new ImageAssetError("ENCODE_FAILED" /* ENCODE_FAILED */, "\u5F53\u524D\u73AF\u5883\u65E0\u6CD5\u521B\u5EFA\u56FE\u7247\u753B\u5E03\u3002");
      context.drawImage(bitmap, geometry.sx, geometry.sy, geometry.sw, geometry.sh, 0, 0, geometry.canvasWidth, geometry.canvasHeight);
      const mimeType = this.outputMime(settings.outputFormat);
      const quality = this.quality(settings);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality));
      if (!blob || settings.outputFormat === "avif" && blob.type !== "image/avif") {
        throw new ImageAssetError("UNSUPPORTED_FORMAT" /* UNSUPPORTED_FORMAT */, `\u5F53\u524D Obsidian/Electron \u73AF\u5883\u4E0D\u652F\u6301\u8F93\u51FA ${settings.outputFormat.toUpperCase()}\u3002`);
      }
      return this.finish(await blob.arrayBuffer(), blob.type || mimeType, canvas.width, canvas.height, input.data.byteLength);
    } finally {
      bitmap.close();
    }
  }
  async decode(input) {
    try {
      return await createImageBitmap(new Blob([input.data], { type: input.mimeType }), { imageOrientation: "from-image" });
    } catch (error) {
      throw new ImageAssetError("DECODE_FAILED" /* DECODE_FAILED */, `\u65E0\u6CD5\u89E3\u7801\u201C${input.name}\u201D\uFF0C\u8BE5\u683C\u5F0F\u53EF\u80FD\u4E0D\u53D7\u5F53\u524D\u73AF\u5883\u652F\u6301\u3002`, error);
    }
  }
  async readDimensions(input) {
    const bitmap = await this.decode(input);
    try {
      return { width: bitmap.width, height: bitmap.height };
    } finally {
      bitmap.close();
    }
  }
  async finish(data, mimeType, width, height, originalSize) {
    return {
      data,
      mimeType,
      width,
      height,
      originalSize,
      processedSize: data.byteLength,
      format: extensionForMime(mimeType),
      hash: await sha256(data)
    };
  }
  outputMime(format2) {
    if (format2 === "jpeg") return "image/jpeg";
    if (format2 === "png") return "image/png";
    if (format2 === "avif") return "image/avif";
    return "image/webp";
  }
  quality(settings) {
    if (settings.outputFormat === "jpeg") return settings.jpegQuality / 100;
    if (settings.outputFormat === "avif") return settings.avifQuality / 100;
    return settings.webpQuality / 100;
  }
  calculateGeometry(width, height, settings) {
    const identity = { canvasWidth: width, canvasHeight: height, sx: 0, sy: 0, sw: width, sh: height };
    if (settings.resizeMode === "none") return identity;
    let targetWidth = width;
    let targetHeight = height;
    if (settings.resizeMode === "width") targetWidth = settings.resizeWidth;
    if (settings.resizeMode === "height") targetHeight = settings.resizeHeight;
    if (settings.resizeMode === "long-edge") {
      const scale2 = settings.longEdge / Math.max(width, height);
      targetWidth = width * scale2;
      targetHeight = height * scale2;
    } else if (settings.resizeMode === "short-edge") {
      const scale2 = settings.shortEdge / Math.min(width, height);
      targetWidth = width * scale2;
      targetHeight = height * scale2;
    } else if (settings.resizeMode === "width") {
      targetHeight = height * (targetWidth / width);
    } else if (settings.resizeMode === "height") {
      targetWidth = width * (targetHeight / height);
    } else if (settings.resizeMode === "fit") {
      const scale2 = Math.min(settings.resizeWidth / width, settings.resizeHeight / height);
      targetWidth = width * scale2;
      targetHeight = height * scale2;
    } else if (settings.resizeMode === "fill" || settings.resizeMode === "fixed") {
      const canvasWidth = settings.resizeWidth;
      const canvasHeight = settings.resizeHeight;
      const sourceRatio = width / height;
      const targetRatio = canvasWidth / canvasHeight;
      let sw = width, sh = height, sx = 0, sy = 0;
      if (sourceRatio > targetRatio) {
        sw = height * targetRatio;
        sx = (width - sw) / 2;
      } else {
        sh = width / targetRatio;
        sy = (height - sh) / 2;
      }
      if (settings.preventUpscale && canvasWidth > width && canvasHeight > height) return identity;
      return { canvasWidth, canvasHeight, sx, sy, sw, sh };
    }
    const scale = Math.min(targetWidth / width, targetHeight / height);
    if (settings.preventUpscale && scale >= 1) return identity;
    return { ...identity, canvasWidth: Math.max(1, Math.round(targetWidth)), canvasHeight: Math.max(1, Math.round(targetHeight)) };
  }
};

// src/naming/TemplateEngine.ts
function pad(value, size = 2) {
  return String(value).padStart(size, "0");
}
var TemplateEngine = class {
  render(template, context, pathMode = false, unicode = true) {
    const now = context.now ?? /* @__PURE__ */ new Date();
    const values = {
      noteName: context.noteName,
      fileName: context.fileName,
      folderName: context.folderName,
      vaultName: context.vaultName,
      notePath: context.notePath.replace(/\.md$/i, ""),
      YYYY: String(now.getFullYear()),
      MM: pad(now.getMonth() + 1),
      DD: pad(now.getDate()),
      HH: pad(now.getHours()),
      mm: pad(now.getMinutes()),
      ss: pad(now.getSeconds()),
      timestamp: String(now.getTime()),
      index: pad(context.index, 3),
      uuid: crypto.randomUUID(),
      hash: context.hash
    };
    const rendered = template.replace(/\{(frontmatter:([^}]+)|hash(?::(\d+))?|[A-Za-z]+)\}/g, (_match, token, frontmatterKey, hashLength) => {
      if (token.startsWith("frontmatter:")) {
        const value = context.frontmatter?.[frontmatterKey ?? ""];
        return value === void 0 || value === null ? "" : String(value);
      }
      if (token.startsWith("hash")) return context.hash.slice(0, Number(hashLength || context.hash.length));
      return values[token] ?? "";
    });
    if (!pathMode) return sanitizePathSegment(rendered, unicode);
    return rendered.split(/[\\/]+/).filter(Boolean).map((part) => sanitizePathSegment(part, unicode)).join("/");
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/constants.js
var RequestChecksumCalculation = {
  WHEN_SUPPORTED: "WHEN_SUPPORTED",
  WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_REQUEST_CHECKSUM_CALCULATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ResponseChecksumValidation = {
  WHEN_SUPPORTED: "WHEN_SUPPORTED",
  WHEN_REQUIRED: "WHEN_REQUIRED"
};
var DEFAULT_RESPONSE_CHECKSUM_VALIDATION = RequestChecksumCalculation.WHEN_SUPPORTED;
var ChecksumAlgorithm;
(function(ChecksumAlgorithm2) {
  ChecksumAlgorithm2["MD5"] = "MD5";
  ChecksumAlgorithm2["CRC32"] = "CRC32";
  ChecksumAlgorithm2["CRC32C"] = "CRC32C";
  ChecksumAlgorithm2["CRC64NVME"] = "CRC64NVME";
  ChecksumAlgorithm2["SHA1"] = "SHA1";
  ChecksumAlgorithm2["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var ChecksumLocation;
(function(ChecksumLocation2) {
  ChecksumLocation2["HEADER"] = "header";
  ChecksumLocation2["TRAILER"] = "trailer";
})(ChecksumLocation || (ChecksumLocation = {}));
var DEFAULT_CHECKSUM_ALGORITHM = ChecksumAlgorithm.CRC32;

// node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
function setCredentialFeature(credentials, feature, value) {
  if (!credentials.$source) {
    credentials.$source = {};
  }
  credentials.$source[feature] = value;
  return credentials;
}

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/isStreamingPayload/isStreamingPayload.browser.js
var isStreamingPayload = (request) => request?.body instanceof ReadableStream;

// node_modules/@smithy/core/dist-es/submodules/client/middleware-stack/MiddlewareStack.js
var getAllAliases = (name, aliases) => {
  const _aliases = [];
  if (name) {
    _aliases.push(name);
  }
  if (aliases) {
    for (const alias of aliases) {
      _aliases.push(alias);
    }
  }
  return _aliases;
};
var getMiddlewareNameWithAliases = (name, aliases) => {
  return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
};
var constructStack = () => {
  let absoluteEntries = [];
  let relativeEntries = [];
  let identifyOnResolve = false;
  const entriesNameSet = /* @__PURE__ */ new Set();
  const sort = (entries) => entries.sort((a2, b2) => stepWeights[b2.step] - stepWeights[a2.step] || priorityWeights[b2.priority || "normal"] - priorityWeights[a2.priority || "normal"]);
  const removeByName = (toRemove) => {
    let isRemoved = false;
    const filterCb = (entry) => {
      const aliases = getAllAliases(entry.name, entry.aliases);
      if (aliases.includes(toRemove)) {
        isRemoved = true;
        for (const alias of aliases) {
          entriesNameSet.delete(alias);
        }
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };
  const removeByReference = (toRemove) => {
    let isRemoved = false;
    const filterCb = (entry) => {
      if (entry.middleware === toRemove) {
        isRemoved = true;
        for (const alias of getAllAliases(entry.name, entry.aliases)) {
          entriesNameSet.delete(alias);
        }
        return false;
      }
      return true;
    };
    absoluteEntries = absoluteEntries.filter(filterCb);
    relativeEntries = relativeEntries.filter(filterCb);
    return isRemoved;
  };
  const cloneTo = (toStack) => {
    absoluteEntries.forEach((entry) => {
      toStack.add(entry.middleware, { ...entry });
    });
    relativeEntries.forEach((entry) => {
      toStack.addRelativeTo(entry.middleware, { ...entry });
    });
    toStack.identifyOnResolve?.(stack.identifyOnResolve());
    return toStack;
  };
  const expandRelativeMiddlewareList = (from) => {
    const expandedMiddlewareList = [];
    from.before.forEach((entry) => {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
      }
    });
    expandedMiddlewareList.push(from);
    from.after.reverse().forEach((entry) => {
      if (entry.before.length === 0 && entry.after.length === 0) {
        expandedMiddlewareList.push(entry);
      } else {
        expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
      }
    });
    return expandedMiddlewareList;
  };
  const getMiddlewareList = (debug = false) => {
    const normalizedAbsoluteEntries = [];
    const normalizedRelativeEntries = [];
    const normalizedEntriesNameMap = {};
    absoluteEntries.forEach((entry) => {
      const normalizedEntry = {
        ...entry,
        before: [],
        after: []
      };
      for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
        normalizedEntriesNameMap[alias] = normalizedEntry;
      }
      normalizedAbsoluteEntries.push(normalizedEntry);
    });
    relativeEntries.forEach((entry) => {
      const normalizedEntry = {
        ...entry,
        before: [],
        after: []
      };
      for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
        normalizedEntriesNameMap[alias] = normalizedEntry;
      }
      normalizedRelativeEntries.push(normalizedEntry);
    });
    normalizedRelativeEntries.forEach((entry) => {
      if (entry.toMiddleware) {
        const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
        if (toMiddleware === void 0) {
          if (debug) {
            return;
          }
          throw new Error(`${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`);
        }
        if (entry.relation === "after") {
          toMiddleware.after.push(entry);
        }
        if (entry.relation === "before") {
          toMiddleware.before.push(entry);
        }
      }
    });
    const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList) => {
      wholeList.push(...expandedMiddlewareList);
      return wholeList;
    }, []);
    return mainChain;
  };
  const stack = {
    add: (middleware, options = {}) => {
      const { name, override, aliases: _aliases } = options;
      const entry = {
        step: "initialize",
        priority: "normal",
        middleware,
        ...options
      };
      const aliases = getAllAliases(name, _aliases);
      if (aliases.length > 0) {
        if (aliases.some((alias) => entriesNameSet.has(alias))) {
          if (!override)
            throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
          for (const alias of aliases) {
            const toOverrideIndex = absoluteEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a2) => a2 === alias));
            if (toOverrideIndex === -1) {
              continue;
            }
            const toOverride = absoluteEntries[toOverrideIndex];
            if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
              throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`);
            }
            absoluteEntries.splice(toOverrideIndex, 1);
          }
        }
        for (const alias of aliases) {
          entriesNameSet.add(alias);
        }
      }
      absoluteEntries.push(entry);
    },
    addRelativeTo: (middleware, options) => {
      const { name, override, aliases: _aliases } = options;
      const entry = {
        middleware,
        ...options
      };
      const aliases = getAllAliases(name, _aliases);
      if (aliases.length > 0) {
        if (aliases.some((alias) => entriesNameSet.has(alias))) {
          if (!override)
            throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
          for (const alias of aliases) {
            const toOverrideIndex = relativeEntries.findIndex((entry2) => entry2.name === alias || entry2.aliases?.some((a2) => a2 === alias));
            if (toOverrideIndex === -1) {
              continue;
            }
            const toOverride = relativeEntries[toOverrideIndex];
            if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
              throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`);
            }
            relativeEntries.splice(toOverrideIndex, 1);
          }
        }
        for (const alias of aliases) {
          entriesNameSet.add(alias);
        }
      }
      relativeEntries.push(entry);
    },
    clone: () => cloneTo(constructStack()),
    use: (plugin) => {
      plugin.applyToStack(stack);
    },
    remove: (toRemove) => {
      if (typeof toRemove === "string")
        return removeByName(toRemove);
      else
        return removeByReference(toRemove);
    },
    removeByTag: (toRemove) => {
      let isRemoved = false;
      const filterCb = (entry) => {
        const { tags, name, aliases: _aliases } = entry;
        if (tags && tags.includes(toRemove)) {
          const aliases = getAllAliases(name, _aliases);
          for (const alias of aliases) {
            entriesNameSet.delete(alias);
          }
          isRemoved = true;
          return false;
        }
        return true;
      };
      absoluteEntries = absoluteEntries.filter(filterCb);
      relativeEntries = relativeEntries.filter(filterCb);
      return isRemoved;
    },
    concat: (from) => {
      const cloned = cloneTo(constructStack());
      cloned.use(from);
      cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
      return cloned;
    },
    applyToStack: cloneTo,
    identify: () => {
      return getMiddlewareList(true).map((mw) => {
        const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
        return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
      });
    },
    identifyOnResolve(toggle) {
      if (typeof toggle === "boolean")
        identifyOnResolve = toggle;
      return identifyOnResolve;
    },
    resolve: (handler, context) => {
      for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) {
        handler = middleware(handler, context);
      }
      if (identifyOnResolve) {
        console.log(stack.identify());
      }
      return handler;
    }
  };
  return stack;
};
var stepWeights = {
  initialize: 5,
  serialize: 4,
  build: 3,
  finalizeRequest: 2,
  deserialize: 1
};
var priorityWeights = {
  high: 3,
  normal: 2,
  low: 1
};

// node_modules/@smithy/core/dist-es/submodules/client/index.js
init_transport();
init_transport();

// node_modules/@smithy/core/dist-es/submodules/client/invalid-dependency/invalidProvider.js
var invalidProvider = (message) => () => Promise.reject(message);

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/client.js
var Client = class {
  config;
  middlewareStack = constructStack();
  initConfig;
  handlers;
  constructor(config) {
    this.config = config;
    const { protocol, protocolSettings } = config;
    if (protocolSettings) {
      if (typeof protocol === "function") {
        config.protocol = new protocol(protocolSettings);
      }
    }
  }
  send(command2, optionsOrCb, cb) {
    const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
    const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
    const useHandlerCache = options === void 0 && this.config.cacheMiddleware === true;
    let handler;
    if (useHandlerCache) {
      if (!this.handlers) {
        this.handlers = /* @__PURE__ */ new WeakMap();
      }
      const handlers = this.handlers;
      if (handlers.has(command2.constructor)) {
        handler = handlers.get(command2.constructor);
      } else {
        handler = command2.resolveMiddleware(this.middlewareStack, this.config, options);
        handlers.set(command2.constructor, handler);
      }
    } else {
      delete this.handlers;
      handler = command2.resolveMiddleware(this.middlewareStack, this.config, options);
    }
    if (callback) {
      handler(command2).then((result) => callback(null, result.output), (err) => callback(err)).catch(() => {
      });
    } else {
      return handler(command2).then((result) => result.output);
    }
  }
  destroy() {
    this.config?.requestHandler?.destroy?.();
    delete this.handlers;
  }
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/command.js
init_dist_es();

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/schemaLogFilter.js
init_schema();
var SENSITIVE_STRING = "***SensitiveInformation***";
function schemaLogFilter(schema, data) {
  if (data == null) {
    return data;
  }
  const ns = NormalizedSchema.of(schema);
  if (ns.getMergedTraits().sensitive) {
    return SENSITIVE_STRING;
  }
  if (ns.isListSchema()) {
    const isSensitive = !!ns.getValueSchema().getMergedTraits().sensitive;
    if (isSensitive) {
      return SENSITIVE_STRING;
    }
  } else if (ns.isMapSchema()) {
    const isSensitive = !!ns.getKeySchema().getMergedTraits().sensitive || !!ns.getValueSchema().getMergedTraits().sensitive;
    if (isSensitive) {
      return SENSITIVE_STRING;
    }
  } else if (ns.isStructSchema() && typeof data === "object") {
    const object = data;
    const newObject = {};
    for (const [member2, memberNs] of ns.structIterator()) {
      if (object[member2] != null) {
        newObject[member2] = schemaLogFilter(memberNs, object[member2]);
      }
    }
    return newObject;
  }
  return data;
}

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/command.js
var Command = class {
  middlewareStack = constructStack();
  schema;
  static classBuilder() {
    return new ClassBuilder();
  }
  resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
    for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
      this.middlewareStack.use(mw);
    }
    const stack = clientStack.concat(this.middlewareStack);
    const { logger: logger2 } = configuration;
    const handlerExecutionContext = {
      logger: logger2,
      clientName,
      commandName,
      inputFilterSensitiveLog,
      outputFilterSensitiveLog,
      [SMITHY_CONTEXT_KEY]: {
        commandInstance: this,
        ...smithyContext
      },
      ...additionalContext
    };
    const { requestHandler } = configuration;
    let requestOptions = options ?? {};
    if (smithyContext.eventStream) {
      requestOptions = {
        isEventStream: true,
        ...requestOptions
      };
    }
    return stack.resolve((request) => requestHandler.handle(request.request, requestOptions), handlerExecutionContext);
  }
};
var ClassBuilder = class {
  _init = () => {
  };
  _ep = {};
  _middlewareFn = () => [];
  _commandName = "";
  _clientName = "";
  _additionalContext = {};
  _smithyContext = {};
  _inputFilterSensitiveLog = void 0;
  _outputFilterSensitiveLog = void 0;
  _serializer = null;
  _deserializer = null;
  _operationSchema;
  init(cb) {
    this._init = cb;
  }
  ep(endpointParameterInstructions) {
    this._ep = endpointParameterInstructions;
    return this;
  }
  m(middlewareSupplier) {
    this._middlewareFn = middlewareSupplier;
    return this;
  }
  s(service, operation2, smithyContext = {}) {
    this._smithyContext = {
      service,
      operation: operation2,
      ...smithyContext
    };
    return this;
  }
  c(additionalContext = {}) {
    this._additionalContext = additionalContext;
    return this;
  }
  n(clientName, commandName) {
    this._clientName = clientName;
    this._commandName = commandName;
    return this;
  }
  f(inputFilter = (_) => _, outputFilter = (_) => _) {
    this._inputFilterSensitiveLog = inputFilter;
    this._outputFilterSensitiveLog = outputFilter;
    return this;
  }
  ser(serializer) {
    this._serializer = serializer;
    return this;
  }
  de(deserializer) {
    this._deserializer = deserializer;
    return this;
  }
  sc(operation2) {
    this._operationSchema = operation2;
    this._smithyContext.operationSchema = operation2;
    return this;
  }
  build() {
    const closure = this;
    let CommandRef;
    return CommandRef = class extends Command {
      input;
      static getEndpointParameterInstructions() {
        return closure._ep;
      }
      constructor(...[input]) {
        super();
        this.input = input ?? {};
        closure._init(this);
        this.schema = closure._operationSchema;
      }
      resolveMiddleware(stack, configuration, options) {
        const op = closure._operationSchema;
        const input = op?.[4] ?? op?.input;
        const output = op?.[5] ?? op?.output;
        return this.resolveMiddlewareWithContext(stack, configuration, options, {
          CommandCtor: CommandRef,
          middlewareFn: closure._middlewareFn,
          clientName: closure._clientName,
          commandName: closure._commandName,
          inputFilterSensitiveLog: closure._inputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, input) : (_) => _),
          outputFilterSensitiveLog: closure._outputFilterSensitiveLog ?? (op ? schemaLogFilter.bind(null, output) : (_) => _),
          smithyContext: closure._smithyContext,
          additionalContext: closure._additionalContext
        });
      }
      serialize = closure._serializer;
      deserialize = closure._deserializer;
    };
  }
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/exceptions.js
var ServiceException = class _ServiceException extends Error {
  $fault;
  $response;
  $retryable;
  $metadata;
  constructor(options) {
    super(options.message);
    Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
    this.name = options.name;
    this.$fault = options.$fault;
    this.$metadata = options.$metadata;
  }
  static isInstance(value) {
    if (!value)
      return false;
    const candidate = value;
    return _ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
  }
  static [Symbol.hasInstance](instance) {
    if (!instance)
      return false;
    const candidate = instance;
    if (this === _ServiceException) {
      return _ServiceException.isInstance(instance);
    }
    if (_ServiceException.isInstance(instance)) {
      if (candidate.name && this.name) {
        return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
      }
      return this.prototype.isPrototypeOf(instance);
    }
    return false;
  }
};
var decorateServiceException = (exception, additions = {}) => {
  Object.entries(additions).filter(([, v2]) => v2 !== void 0).forEach(([k2, v2]) => {
    if (exception[k2] == void 0 || exception[k2] === "") {
      exception[k2] = v2;
    }
  });
  const message = exception.message || exception.Message || "UnknownError";
  exception.message = message;
  delete exception.Message;
  return exception;
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/defaults-mode.js
var loadConfigsForDefaultMode = (mode) => {
  switch (mode) {
    case "standard":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "in-region":
      return {
        retryMode: "standard",
        connectionTimeout: 1100
      };
    case "cross-region":
      return {
        retryMode: "standard",
        connectionTimeout: 3100
      };
    case "mobile":
      return {
        retryMode: "standard",
        connectionTimeout: 3e4
      };
    default:
      return {};
  }
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/checksum.js
init_transport();
init_dist_es();
var knownAlgorithms = Object.values(AlgorithmId);
var getChecksumConfiguration = (runtimeConfig) => {
  const checksumAlgorithms = [];
  for (const id in AlgorithmId) {
    if (!hasOwn(AlgorithmId, id))
      continue;
    const algorithmId = AlgorithmId[id];
    if (runtimeConfig[algorithmId] === void 0) {
      continue;
    }
    checksumAlgorithms.push({
      algorithmId: () => algorithmId,
      checksumConstructor: () => runtimeConfig[algorithmId]
    });
  }
  for (const [id, ChecksumCtor] of Object.entries(runtimeConfig.checksumAlgorithms ?? {})) {
    checksumAlgorithms.push({
      algorithmId: () => id,
      checksumConstructor: () => ChecksumCtor
    });
  }
  return {
    addChecksumAlgorithm(algo) {
      runtimeConfig.checksumAlgorithms = runtimeConfig.checksumAlgorithms ?? {};
      const id = algo.algorithmId();
      const ctor = algo.checksumConstructor();
      if (knownAlgorithms.includes(id)) {
        runtimeConfig.checksumAlgorithms[id.toUpperCase()] = ctor;
      } else {
        runtimeConfig.checksumAlgorithms[id] = ctor;
      }
      checksumAlgorithms.push(algo);
    },
    checksumAlgorithms() {
      return checksumAlgorithms;
    }
  };
};
var resolveChecksumRuntimeConfig = (clientConfig) => {
  const runtimeConfig = {};
  clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
    const id = checksumAlgorithm.algorithmId();
    if (knownAlgorithms.includes(id)) {
      runtimeConfig[id] = checksumAlgorithm.checksumConstructor();
    }
  });
  return runtimeConfig;
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/retry.js
var getRetryConfiguration = (runtimeConfig) => {
  return {
    setRetryStrategy(retryStrategy) {
      runtimeConfig.retryStrategy = retryStrategy;
    },
    retryStrategy() {
      return runtimeConfig.retryStrategy;
    }
  };
};
var resolveRetryRuntimeConfig = (retryStrategyConfiguration) => {
  const runtimeConfig = {};
  runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
  return runtimeConfig;
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/extensions/defaultExtensionConfiguration.js
var getDefaultExtensionConfiguration = (runtimeConfig) => {
  return Object.assign(getChecksumConfiguration(runtimeConfig), getRetryConfiguration(runtimeConfig));
};
var resolveDefaultRuntimeConfig2 = (config) => {
  return Object.assign(resolveChecksumRuntimeConfig(config), resolveRetryRuntimeConfig(config));
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/get-value-from-text-node.js
init_transport();
var getValueFromTextNode = (obj) => {
  const textNodeName = "#text";
  for (const key in obj) {
    if (!hasOwn(obj, key))
      continue;
    if (obj[key][textNodeName] !== void 0) {
      obj[key] = obj[key][textNodeName];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = getValueFromTextNode(obj[key]);
    }
  }
  return obj;
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/NoOpLogger.js
var NoOpLogger = class {
  trace() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
};

// node_modules/@smithy/core/dist-es/submodules/client/smithy-client/client-command-builder.js
function makeBuilder(common, service, name, ep) {
  return function makeCommand(added, plugins, op, $, smithyContext = {}) {
    const epMerged = Object.assign({}, common, added);
    return Command.classBuilder().ep(epMerged).m(function(CommandCtor, clientStack, config, options) {
      const list = plugins.call(this, CommandCtor, clientStack, config, options);
      list.unshift(ep(config, CommandCtor.getEndpointParameterInstructions()));
      return list;
    }).s(service, op, smithyContext).n(name, op.charAt(0).toUpperCase() + op.slice(1) + "Command").sc($).build();
  };
}

// node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js
init_index_browser2();
var collectBody = async (streamBody = new Uint8Array(), context) => {
  if (streamBody instanceof Uint8Array) {
    return Uint8ArrayBlobAdapter.mutate(streamBody);
  }
  if (!streamBody) {
    return Uint8ArrayBlobAdapter.mutate(new Uint8Array());
  }
  const fromContext = context.streamCollector(streamBody);
  return Uint8ArrayBlobAdapter.mutate(await fromContext);
};

// node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js
function extendedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c2) {
    return "%" + c2.charCodeAt(0).toString(16).toUpperCase();
  });
}

// node_modules/@smithy/core/dist-es/submodules/protocols/HttpBindingProtocol.js
init_transport();
init_schema();
init_index_browser2();
init_transport();

// node_modules/@smithy/core/dist-es/submodules/protocols/HttpProtocol.js
init_transport();
init_schema();
init_transport();

// node_modules/@smithy/core/dist-es/submodules/protocols/SerdeContext.js
var SerdeContext = class {
  serdeContext;
  setSerdeContext(serdeContext) {
    this.serdeContext = serdeContext;
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/HttpProtocol.js
var HttpProtocol = class extends SerdeContext {
  options;
  compositeErrorRegistry;
  constructor(options) {
    super();
    this.options = options;
    this.compositeErrorRegistry = TypeRegistry.for(options.defaultNamespace);
    for (const etr of options.errorTypeRegistries ?? []) {
      this.compositeErrorRegistry.copyFrom(etr);
    }
  }
  getRequestType() {
    return HttpRequest;
  }
  getResponseType() {
    return HttpResponse;
  }
  setSerdeContext(serdeContext) {
    this.serdeContext = serdeContext;
    this.serializer.setSerdeContext(serdeContext);
    this.deserializer.setSerdeContext(serdeContext);
    if (this.getPayloadCodec()) {
      this.getPayloadCodec().setSerdeContext(serdeContext);
    }
  }
  updateServiceEndpoint(request, endpoint) {
    if ("url" in endpoint) {
      request.protocol = endpoint.url.protocol;
      request.hostname = endpoint.url.hostname;
      request.port = endpoint.url.port ? Number(endpoint.url.port) : void 0;
      request.path = endpoint.url.pathname;
      request.fragment = endpoint.url.hash || void 0;
      request.username = endpoint.url.username || void 0;
      request.password = endpoint.url.password || void 0;
      if (!request.query) {
        request.query = {};
      }
      for (const [k2, v2] of endpoint.url.searchParams.entries()) {
        request.query[k2] = v2;
      }
      if (endpoint.headers) {
        for (const name in endpoint.headers) {
          if (!hasOwn(endpoint.headers, name))
            continue;
          request.headers[name] = endpoint.headers[name].join(", ");
        }
      }
      return request;
    } else {
      request.protocol = endpoint.protocol;
      request.hostname = endpoint.hostname;
      request.port = endpoint.port ? Number(endpoint.port) : void 0;
      request.path = endpoint.path;
      request.query = {
        ...endpoint.query
      };
      if (endpoint.headers) {
        for (const name in endpoint.headers) {
          if (!hasOwn(endpoint.headers, name))
            continue;
          request.headers[name] = endpoint.headers[name];
        }
      }
      return request;
    }
  }
  setHostPrefix(request, operationSchema, input) {
    if (this.serdeContext?.disableHostPrefix) {
      return;
    }
    const inputNs = NormalizedSchema.of(operationSchema.input);
    const opTraits = translateTraits(operationSchema.traits ?? {});
    if (opTraits.endpoint) {
      let hostPrefix = opTraits.endpoint?.[0];
      if (typeof hostPrefix === "string") {
        for (const [name, member2] of inputNs.structIterator()) {
          if (!member2.getMergedTraits().hostLabel) {
            continue;
          }
          const replacement = input[name];
          if (typeof replacement !== "string") {
            throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
          }
          hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
        }
        request.hostname = hostPrefix + request.hostname;
        if (!isValidHostname(request.hostname)) {
          throw new Error(`[${request.hostname}] is not a valid hostname.`);
        }
      }
    }
  }
  deserializeMetadata(output) {
    return {
      httpStatusCode: output.statusCode,
      requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
      extendedRequestId: output.headers["x-amz-id-2"],
      cfId: output.headers["x-amz-cf-id"]
    };
  }
  async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
    const eventStreamSerde = await this.loadEventStreamCapability();
    return eventStreamSerde.serializeEventStream({
      eventStream,
      requestSchema,
      initialRequest
    });
  }
  async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
    const eventStreamSerde = await this.loadEventStreamCapability();
    return eventStreamSerde.deserializeEventStream({
      response,
      responseSchema,
      initialResponseContainer
    });
  }
  async loadEventStreamCapability() {
    const { EventStreamSerde: EventStreamSerde2, eventStreamSerdeProvider: eventStreamSerdeProvider3 } = await Promise.resolve().then(() => (init_index_browser4(), index_browser_exports));
    const marshaller = this.resolveEventStreamMarshaller(eventStreamSerdeProvider3);
    return new EventStreamSerde2({
      marshaller,
      serializer: this.serializer,
      deserializer: this.deserializer,
      serdeContext: this.serdeContext,
      defaultContentType: this.getDefaultContentType(),
      compositeErrorRegistry: this.compositeErrorRegistry
    });
  }
  resolveEventStreamMarshaller(importedProvider) {
    const context = this.serdeContext;
    if (context.eventStreamMarshaller) {
      return context.eventStreamMarshaller;
    }
    return importedProvider(this.serdeContext);
  }
  getDefaultContentType() {
    throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
  }
  async deserializeHttpMessage(schema, context, response, arg4, arg5) {
    void schema;
    void context;
    void response;
    void arg4;
    void arg5;
    return [];
  }
  getEventStreamMarshaller() {
    const context = this.serdeContext;
    if (!context.eventStreamMarshaller) {
      throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
    }
    return context.eventStreamMarshaller;
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/HttpBindingProtocol.js
var HttpBindingProtocol = class extends HttpProtocol {
  async serializeRequest(operationSchema, _input, context) {
    const input = _input && typeof _input === "object" ? _input : {};
    const serializer = this.serializer;
    const query = {};
    const headers = {};
    const endpoint = await context.endpoint();
    const ns = NormalizedSchema.of(operationSchema?.input);
    const payloadMemberNames = [];
    const payloadMemberSchemas = [];
    let hasNonHttpBindingMember = false;
    let payload;
    const request = new HttpRequest({
      protocol: "",
      hostname: "",
      port: void 0,
      path: "",
      fragment: void 0,
      query,
      headers,
      body: void 0
    });
    if (endpoint) {
      this.updateServiceEndpoint(request, endpoint);
      this.setHostPrefix(request, operationSchema, input);
      const opTraits = translateTraits(operationSchema.traits);
      if (opTraits.http) {
        request.method = opTraits.http[0];
        const [path, search] = opTraits.http[1].split("?");
        if (request.path == "/") {
          request.path = path;
        } else {
          request.path += path;
        }
        const traitSearchParams = new URLSearchParams(search ?? "");
        for (const [key, value] of traitSearchParams) {
          query[key] = value;
        }
      }
    }
    for (const [memberName, memberNs] of ns.structIterator()) {
      const memberTraits = memberNs.getMergedTraits() ?? {};
      const inputMemberValue = input[memberName];
      if (inputMemberValue == null && !memberNs.isIdempotencyToken()) {
        if (memberTraits.httpLabel) {
          if (request.path.includes(`{${memberName}+}`) || request.path.includes(`{${memberName}}`)) {
            throw new Error(`No value provided for input HTTP label: ${memberName}.`);
          }
        }
        continue;
      }
      if (memberTraits.httpPayload) {
        const isStreaming2 = memberNs.isStreaming();
        if (isStreaming2) {
          const isEventStream = memberNs.isStructSchema();
          if (isEventStream) {
            if (input[memberName]) {
              payload = await this.serializeEventStream({
                eventStream: input[memberName],
                requestSchema: ns
              });
            }
          } else {
            payload = inputMemberValue;
          }
        } else {
          serializer.write(memberNs, inputMemberValue);
          payload = serializer.flush();
        }
      } else if (memberTraits.httpLabel) {
        serializer.write(memberNs, inputMemberValue);
        const replacement = serializer.flush();
        if (request.path.includes(`{${memberName}+}`)) {
          request.path = request.path.replace(`{${memberName}+}`, replacement.split("/").map(extendedEncodeURIComponent).join("/"));
        } else if (request.path.includes(`{${memberName}}`)) {
          request.path = request.path.replace(`{${memberName}}`, extendedEncodeURIComponent(replacement));
        }
      } else if (memberTraits.httpHeader) {
        serializer.write(memberNs, inputMemberValue);
        headers[memberTraits.httpHeader.toLowerCase()] = String(serializer.flush());
      } else if (typeof memberTraits.httpPrefixHeaders === "string") {
        for (const key in inputMemberValue) {
          if (!hasOwn(inputMemberValue, key))
            continue;
          const val = inputMemberValue[key];
          const amalgam = memberTraits.httpPrefixHeaders + key;
          serializer.write([memberNs.getValueSchema(), { httpHeader: amalgam }], val);
          headers[amalgam.toLowerCase()] = serializer.flush();
        }
      } else if (memberTraits.httpQuery || memberTraits.httpQueryParams) {
        this.serializeQuery(memberNs, inputMemberValue, query);
      } else {
        hasNonHttpBindingMember = true;
        payloadMemberNames.push(memberName);
        payloadMemberSchemas.push(memberNs);
      }
    }
    if (hasNonHttpBindingMember && input) {
      const [namespace, name] = (ns.getName(true) ?? "#Unknown").split("#");
      const requiredMembers = ns.getSchema()[6];
      const payloadSchema = [
        3,
        namespace,
        name,
        ns.getMergedTraits(),
        payloadMemberNames,
        payloadMemberSchemas,
        void 0
      ];
      if (requiredMembers) {
        payloadSchema[6] = requiredMembers;
      } else {
        payloadSchema.pop();
      }
      serializer.write(payloadSchema, input);
      payload = serializer.flush();
    }
    request.headers = headers;
    request.query = query;
    request.body = payload;
    return request;
  }
  serializeQuery(ns, data, query) {
    const serializer = this.serializer;
    const traits = ns.getMergedTraits();
    if (traits.httpQueryParams) {
      for (const key in data) {
        if (!hasOwn(data, key))
          continue;
        if (!(key in query)) {
          const val = data[key];
          const valueSchema = ns.getValueSchema();
          Object.assign(valueSchema.getMergedTraits(), {
            ...traits,
            httpQuery: key,
            httpQueryParams: void 0
          });
          this.serializeQuery(valueSchema, val, query);
        }
      }
      return;
    }
    if (ns.isListSchema()) {
      const sparse = !!ns.getMergedTraits().sparse;
      const buffer = [];
      for (const item of data) {
        serializer.write([ns.getValueSchema(), traits], item);
        const serializable = serializer.flush();
        if (sparse || serializable !== void 0) {
          buffer.push(serializable);
        }
      }
      query[traits.httpQuery] = buffer;
    } else {
      serializer.write([ns, traits], data);
      query[traits.httpQuery] = serializer.flush();
    }
  }
  async deserializeResponse(operationSchema, context, response) {
    const deserializer = this.deserializer;
    const ns = NormalizedSchema.of(operationSchema.output);
    const dataObject = {};
    if (response.statusCode >= 300) {
      const bytes2 = await collectBody(response.body, context);
      if (bytes2.byteLength > 0) {
        Object.assign(dataObject, await deserializer.read(15, bytes2));
      }
      await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
      throw new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
    }
    for (const header in response.headers) {
      if (!hasOwn(response.headers, header))
        continue;
      const value = response.headers[header];
      delete response.headers[header];
      response.headers[header.toLowerCase()] = value;
    }
    const nonHttpBindingMembers = await this.deserializeHttpMessage(ns, context, response, dataObject);
    if (nonHttpBindingMembers.length) {
      const bytes2 = await collectBody(response.body, context);
      if (bytes2.byteLength > 0) {
        const dataFromBody = await deserializer.read(ns, bytes2);
        for (const member2 of nonHttpBindingMembers) {
          if (dataFromBody[member2] != null) {
            dataObject[member2] = dataFromBody[member2];
          }
        }
      }
    } else if (nonHttpBindingMembers.discardResponseBody) {
      await collectBody(response.body, context);
    }
    dataObject.$metadata = this.deserializeMetadata(response);
    return dataObject;
  }
  async deserializeHttpMessage(schema, context, response, arg4, arg5) {
    let dataObject;
    if (arg4 instanceof Set) {
      dataObject = arg5;
    } else {
      dataObject = arg4;
    }
    let discardResponseBody = true;
    const deserializer = this.deserializer;
    const ns = NormalizedSchema.of(schema);
    const nonHttpBindingMembers = [];
    for (const [memberName, memberSchema] of ns.structIterator()) {
      const memberTraits = memberSchema.getMemberTraits();
      if (memberTraits.httpPayload) {
        discardResponseBody = false;
        const isStreaming2 = memberSchema.isStreaming();
        if (isStreaming2) {
          const isEventStream = memberSchema.isStructSchema();
          if (isEventStream) {
            dataObject[memberName] = await this.deserializeEventStream({
              response,
              responseSchema: ns
            });
          } else {
            dataObject[memberName] = sdkStreamMixin(response.body);
          }
        } else if (response.body) {
          const bytes2 = await collectBody(response.body, context);
          if (bytes2.byteLength > 0) {
            dataObject[memberName] = await deserializer.read(memberSchema, bytes2);
          }
        }
      } else if (memberTraits.httpHeader) {
        const key = String(memberTraits.httpHeader).toLowerCase();
        const value = response.headers[key];
        if (null != value) {
          if (memberSchema.isListSchema()) {
            const headerListValueSchema = memberSchema.getValueSchema();
            headerListValueSchema.getMergedTraits().httpHeader = key;
            let sections;
            if (headerListValueSchema.isTimestampSchema() && headerListValueSchema.getSchema() === 4) {
              sections = splitEvery(value, ",", 2);
            } else {
              sections = splitHeader(value);
            }
            const list = [];
            for (const section of sections) {
              list.push(await deserializer.read(headerListValueSchema, section.trim()));
            }
            dataObject[memberName] = list;
          } else {
            dataObject[memberName] = await deserializer.read(memberSchema, value);
          }
        }
      } else if (memberTraits.httpPrefixHeaders !== void 0) {
        dataObject[memberName] = {};
        for (const header in response.headers) {
          if (!hasOwn(response.headers, header))
            continue;
          if (header.startsWith(memberTraits.httpPrefixHeaders)) {
            const value = response.headers[header];
            const valueSchema = memberSchema.getValueSchema();
            valueSchema.getMergedTraits().httpHeader = header;
            dataObject[memberName][header.slice(memberTraits.httpPrefixHeaders.length)] = await deserializer.read(valueSchema, value);
          }
        }
      } else if (memberTraits.httpResponseCode) {
        dataObject[memberName] = response.statusCode;
      } else {
        nonHttpBindingMembers.push(memberName);
      }
    }
    nonHttpBindingMembers.discardResponseBody = discardResponseBody;
    return nonHttpBindingMembers;
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/FromStringShapeDeserializer.js
init_schema();
init_index_browser2();

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/determineTimestampFormat.js
function determineTimestampFormat(ns, settings) {
  if (settings.timestampFormat.useTrait) {
    if (ns.isTimestampSchema() && (ns.getSchema() === 5 || ns.getSchema() === 6 || ns.getSchema() === 7)) {
      return ns.getSchema();
    }
  }
  const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
  const bindingFormat = settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? 6 : Boolean(httpQuery) || Boolean(httpLabel) ? 5 : void 0 : void 0;
  return bindingFormat ?? settings.timestampFormat.default;
}

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/FromStringShapeDeserializer.js
var FromStringShapeDeserializer = class extends SerdeContext {
  settings;
  constructor(settings) {
    super();
    this.settings = settings;
  }
  read(_schema, data) {
    const ns = NormalizedSchema.of(_schema);
    if (ns.isListSchema()) {
      return splitHeader(data).map((item) => this.read(ns.getValueSchema(), item));
    }
    if (ns.isBlobSchema()) {
      return (this.serdeContext?.base64Decoder ?? fromBase64)(data);
    }
    if (ns.isTimestampSchema()) {
      const format2 = determineTimestampFormat(ns, this.settings);
      switch (format2) {
        case 5:
          return _parseRfc3339DateTimeWithOffset(data);
        case 6:
          return _parseRfc7231DateTime(data);
        case 7:
          return _parseEpochTimestamp(data);
        default:
          console.warn("Missing timestamp format, parsing value with Date constructor:", data);
          return new Date(data);
      }
    }
    if (ns.isStringSchema()) {
      const mediaType = ns.getMergedTraits().mediaType;
      let intermediateValue = data;
      if (mediaType) {
        if (ns.getMergedTraits().httpHeader) {
          intermediateValue = this.base64ToUtf8(intermediateValue);
        }
        const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
        if (isJson) {
          intermediateValue = LazyJsonString.from(intermediateValue);
        }
        return intermediateValue;
      }
    }
    if (ns.isNumericSchema()) {
      return Number(data);
    }
    if (ns.isBigIntegerSchema()) {
      return BigInt(data);
    }
    if (ns.isBigDecimalSchema()) {
      return new NumericValue(data, "bigDecimal");
    }
    if (ns.isBooleanSchema()) {
      return String(data).toLowerCase() === "true";
    }
    return data;
  }
  base64ToUtf8(base64String) {
    return (this.serdeContext?.utf8Encoder ?? toUtf8)((this.serdeContext?.base64Decoder ?? fromBase64)(base64String));
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeDeserializer.js
init_schema();
init_index_browser2();
var HttpInterceptingShapeDeserializer = class extends SerdeContext {
  codecDeserializer;
  stringDeserializer;
  constructor(codecDeserializer, codecSettings) {
    super();
    this.codecDeserializer = codecDeserializer;
    this.stringDeserializer = new FromStringShapeDeserializer(codecSettings);
  }
  setSerdeContext(serdeContext) {
    this.stringDeserializer.setSerdeContext(serdeContext);
    this.codecDeserializer.setSerdeContext(serdeContext);
    this.serdeContext = serdeContext;
  }
  read(schema, data) {
    const ns = NormalizedSchema.of(schema);
    const traits = ns.getMergedTraits();
    const toString = this.serdeContext?.utf8Encoder ?? toUtf8;
    if (traits.httpHeader || traits.httpResponseCode) {
      return this.stringDeserializer.read(ns, toString(data));
    }
    if (traits.httpPayload) {
      if (ns.isBlobSchema()) {
        const toBytes = this.serdeContext?.utf8Decoder ?? fromUtf8;
        if (typeof data === "string") {
          return toBytes(data);
        }
        return data;
      } else if (ns.isStringSchema()) {
        if ("byteLength" in data) {
          return toString(data);
        }
        return data;
      }
    }
    return this.codecDeserializer.read(ns, data);
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeSerializer.js
init_schema();

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/ToStringShapeSerializer.js
init_schema();
init_index_browser2();
var ToStringShapeSerializer = class extends SerdeContext {
  settings;
  stringBuffer = "";
  constructor(settings) {
    super();
    this.settings = settings;
  }
  write(schema, value) {
    const ns = NormalizedSchema.of(schema);
    switch (typeof value) {
      case "object":
        if (value === null) {
          this.stringBuffer = "null";
          return;
        }
        if (ns.isTimestampSchema()) {
          if (!(value instanceof Date)) {
            throw new Error(`@smithy/core/protocols - received non-Date value ${value} when schema expected Date in ${ns.getName(true)}`);
          }
          const format2 = determineTimestampFormat(ns, this.settings);
          switch (format2) {
            case 5:
              this.stringBuffer = value.toISOString().replace(".000Z", "Z");
              break;
            case 6:
              this.stringBuffer = dateToUtcString(value);
              break;
            case 7:
              this.stringBuffer = String(value.getTime() / 1e3);
              break;
            default:
              console.warn("Missing timestamp format, using epoch seconds", value);
              this.stringBuffer = String(value.getTime() / 1e3);
          }
          return;
        }
        if (ns.isBlobSchema() && "byteLength" in value) {
          this.stringBuffer = (this.serdeContext?.base64Encoder ?? toBase64)(value);
          return;
        }
        if (ns.isListSchema() && Array.isArray(value)) {
          let buffer = "";
          for (const item of value) {
            this.write([ns.getValueSchema(), ns.getMergedTraits()], item);
            const headerItem = this.flush();
            const serialized = ns.getValueSchema().isTimestampSchema() ? headerItem : quoteHeader(headerItem);
            if (buffer !== "") {
              buffer += ", ";
            }
            buffer += serialized;
          }
          this.stringBuffer = buffer;
          return;
        }
        this.stringBuffer = JSON.stringify(value, null, 2);
        break;
      case "string":
        const mediaType = ns.getMergedTraits().mediaType;
        let intermediateValue = value;
        if (mediaType) {
          const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
          if (isJson) {
            intermediateValue = LazyJsonString.from(intermediateValue);
          }
          if (ns.getMergedTraits().httpHeader) {
            this.stringBuffer = (this.serdeContext?.base64Encoder ?? toBase64)(intermediateValue.toString());
            return;
          }
        }
        this.stringBuffer = value;
        break;
      default:
        if (ns.isIdempotencyToken()) {
          this.stringBuffer = generateIdempotencyToken();
        } else {
          this.stringBuffer = String(value);
        }
    }
  }
  flush() {
    const buffer = this.stringBuffer;
    this.stringBuffer = "";
    return buffer;
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/serde/HttpInterceptingShapeSerializer.js
var HttpInterceptingShapeSerializer = class {
  codecSerializer;
  stringSerializer;
  buffer;
  constructor(codecSerializer, codecSettings, stringSerializer = new ToStringShapeSerializer(codecSettings)) {
    this.codecSerializer = codecSerializer;
    this.stringSerializer = stringSerializer;
  }
  setSerdeContext(serdeContext) {
    this.codecSerializer.setSerdeContext(serdeContext);
    this.stringSerializer.setSerdeContext(serdeContext);
  }
  write(schema, value) {
    const ns = NormalizedSchema.of(schema);
    const traits = ns.getMergedTraits();
    if (traits.httpHeader || traits.httpLabel || traits.httpQuery) {
      this.stringSerializer.write(ns, value);
      this.buffer = this.stringSerializer.flush();
      return;
    }
    return this.codecSerializer.write(ns, value);
  }
  flush() {
    if (this.buffer !== void 0) {
      const buffer = this.buffer;
      this.buffer = void 0;
      return buffer;
    }
    return this.codecSerializer.flush();
  }
};

// node_modules/@smithy/core/dist-es/submodules/protocols/index.js
init_transport();
init_transport();

// node_modules/@smithy/core/dist-es/submodules/protocols/protocol-http/extensions/httpExtensionConfiguration.js
var getHttpHandlerExtensionConfiguration = (runtimeConfig) => {
  if (runtimeConfig.logger && runtimeConfig.logger.constructor?.name !== "NoOpLogger") {
    runtimeConfig.requestHandler?.updateHttpClientConfig?.(Symbol.for("logger"), runtimeConfig.logger);
  }
  return {
    setHttpHandler(handler) {
      runtimeConfig.requestHandler = handler;
    },
    httpHandler() {
      return runtimeConfig.requestHandler;
    },
    updateHttpClientConfig(key, value) {
      runtimeConfig.requestHandler?.updateHttpClientConfig(key, value);
    },
    httpHandlerConfigs() {
      return runtimeConfig.requestHandler.httpHandlerConfigs();
    }
  };
};
var resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration) => {
  return {
    requestHandler: httpHandlerExtensionConfiguration.httpHandler()
  };
};

// node_modules/@smithy/core/dist-es/submodules/protocols/middleware-content-length/contentLengthMiddleware.js
init_transport();
var CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
  return (next) => async (args) => {
    const request = args.request;
    if (HttpRequest.isInstance(request)) {
      const { body, headers } = request;
      if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
        try {
          const length = bodyLengthChecker(body);
          if (length != null) {
            request.headers = {
              ...request.headers,
              [CONTENT_LENGTH_HEADER]: String(length)
            };
          }
        } catch (ignored) {
        }
      }
    }
    return next({
      ...args,
      request
    });
  };
}
var contentLengthMiddlewareOptions = {
  step: "build",
  tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
  name: "contentLengthMiddleware",
  override: true
};
var getContentLengthPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
  }
});

// node_modules/@smithy/core/dist-es/submodules/protocols/util-uri-escape/escape-uri.js
var escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
var hexEncode = (c2) => `%${c2.charCodeAt(0).toString(16).toUpperCase()}`;

// node_modules/@smithy/core/dist-es/submodules/protocols/querystring-builder/buildQueryString.js
function buildQueryString(query) {
  const parts = [];
  for (let key of Object.keys(query).sort()) {
    const value = query[key];
    key = escapeUri(key);
    if (Array.isArray(value)) {
      for (let i2 = 0, iLen = value.length; i2 < iLen; i2++) {
        parts.push(`${key}=${escapeUri(value[i2])}`);
      }
    } else {
      let qsEntry = key;
      if (value || typeof value === "string") {
        qsEntry += `=${escapeUri(value)}`;
      }
      parts.push(qsEntry);
    }
  }
  return parts.join("&");
}

// node_modules/@smithy/core/dist-es/submodules/protocols/index.js
init_transport();

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/retryMiddleware.js
init_index_browser2();

// node_modules/@smithy/core/dist-es/submodules/retry/service-error-classification/constants.js
var THROTTLING_ERROR_CODES = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException",
  "TransactionInProgressException"
];
var TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
var TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
var NODEJS_NETWORK_ERROR_CODES = ["EHOSTUNREACH", "ENETUNREACH", "ENOTFOUND", "EAI_AGAIN"];

// node_modules/@smithy/core/dist-es/submodules/retry/service-error-classification/service-error-classification.js
var isRetryableByTrait = (error) => error?.$retryable !== void 0;
var isClockSkewCorrectedError = (error) => error.$metadata?.clockSkewCorrected;
var isBrowserNetworkError = (error) => {
  const errorMessages = /* @__PURE__ */ new Set([
    "Failed to fetch",
    "NetworkError when attempting to fetch resource",
    "The Internet connection appears to be offline",
    "Load failed",
    "Network request failed"
  ]);
  const isValid = error && error instanceof TypeError;
  if (!isValid) {
    return false;
  }
  return errorMessages.has(error.message);
};
var isThrottlingError = (error) => error.$metadata?.httpStatusCode === 429 || THROTTLING_ERROR_CODES.includes(error.name) || error.$retryable?.throttling == true;
var isTransientError = (error, depth = 0) => isRetryableByTrait(error) || isClockSkewCorrectedError(error) || error.name === "InvalidSignatureException" && error.message?.includes("Signature expired") || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes(error?.code || "") || NODEJS_NETWORK_ERROR_CODES.includes(error?.code || "") || TRANSIENT_ERROR_STATUS_CODES.includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || isNodeJsHttp2TransientError(error) || error.cause !== void 0 && depth <= 10 && isTransientError(error.cause, depth + 1);
var isServerError = (error) => {
  if (error.$metadata?.httpStatusCode !== void 0) {
    const statusCode = error.$metadata.httpStatusCode;
    if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
      return true;
    }
    return false;
  }
  return false;
};
function isNodeJsHttp2TransientError(error) {
  return error.code === "ERR_HTTP2_STREAM_ERROR" && error.message.includes("NGHTTP2_REFUSED_STREAM");
}

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/constants.js
var MAXIMUM_RETRY_DELAY = 20 * 1e3;
var INITIAL_RETRY_TOKENS = 500;
var NO_RETRY_INCREMENT = 1;
var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
var REQUEST_HEADER = "amz-sdk-request";

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/parseRetryAfterHeader.js
init_transport();
init_index_browser2();
function parseRetryAfterHeader(response, logger2) {
  if (!HttpResponse.isInstance(response)) {
    return;
  }
  for (const header in response.headers) {
    if (!hasOwn(response.headers, header))
      continue;
    const h2 = header.toLowerCase();
    if (h2 === "retry-after") {
      const retryAfter = response.headers[header];
      let retryAfterSeconds = NaN;
      if (retryAfter.endsWith("GMT")) {
        try {
          const date2 = parseRfc7231DateTime(retryAfter);
          retryAfterSeconds = (date2.getTime() - Date.now()) / 1e3;
        } catch (e2) {
          logger2?.trace?.("Failed to parse retry-after header");
          logger2?.trace?.(e2);
        }
      } else if (retryAfter.match(/ GMT, ((\d+)|(\d+\.\d+))$/)) {
        retryAfterSeconds = Number(retryAfter.match(/ GMT, ([\d.]+)$/)?.[1]);
      } else if (retryAfter.match(/^((\d+)|(\d+\.\d+))$/)) {
        retryAfterSeconds = Number(retryAfter);
      } else if (Date.parse(retryAfter) >= Date.now()) {
        retryAfterSeconds = (Date.parse(retryAfter) - Date.now()) / 1e3;
      }
      if (isNaN(retryAfterSeconds)) {
        return;
      }
      return new Date(Date.now() + retryAfterSeconds * 1e3);
    } else if (h2 === "x-amz-retry-after") {
      const v2 = response.headers[header];
      const backoffMilliseconds = Number(v2);
      if (isNaN(backoffMilliseconds)) {
        logger2?.trace?.(`Failed to parse x-amz-retry-after=${v2}`);
        return;
      }
      return new Date(Date.now() + backoffMilliseconds);
    }
  }
}

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/util.js
var asSdkError = (error) => {
  if (error instanceof Error)
    return error;
  if (error instanceof Object)
    return Object.assign(new Error(), error);
  if (typeof error === "string")
    return new Error(error);
  return new Error(`AWS SDK error wrapper for ${error}`);
};

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/retryMiddleware.js
function bindRetryMiddleware(isStreamingPayload2) {
  return (options) => (next, context) => async (args) => {
    let retryStrategy = await options.retryStrategy();
    const maxAttempts = await options.maxAttempts();
    if (isRetryStrategyV2(retryStrategy)) {
      retryStrategy = retryStrategy;
      let retryToken = await retryStrategy.acquireInitialRetryToken((context["partition_id"] ?? "") + (context.__retryLongPoll ? ":longpoll" : ""));
      let lastError = new Error();
      let attempts = 0;
      let totalRetryDelay = 0;
      const { request } = args;
      const isRequest = HttpRequest.isInstance(request);
      if (isRequest) {
        request.headers[INVOCATION_ID_HEADER] = v4();
      }
      while (true) {
        try {
          if (isRequest) {
            request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
          }
          const { response, output } = await next(args);
          retryStrategy.recordSuccess(retryToken);
          output.$metadata.attempts = attempts + 1;
          output.$metadata.totalRetryDelay = totalRetryDelay;
          return { response, output };
        } catch (e2) {
          const retryErrorInfo = getRetryErrorInfo(e2, options.logger);
          lastError = asSdkError(e2);
          if (isRequest && isStreamingPayload2(request)) {
            (context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
            throw lastError;
          }
          try {
            retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
          } catch (ignoredRefreshError) {
            if (!lastError.$metadata) {
              lastError.$metadata = {};
            }
            lastError.$metadata.attempts = attempts + 1;
            lastError.$metadata.totalRetryDelay = totalRetryDelay;
            throw lastError;
          }
          attempts = retryToken.getRetryCount();
          const delay = retryToken.getRetryDelay();
          totalRetryDelay += (retryToken?.$retryLog?.acquisitionDelay ?? 0) + delay;
          if (delay > 0) {
            await cooldown(delay);
          }
        }
      }
    } else {
      retryStrategy = retryStrategy;
      if (retryStrategy?.mode) {
        context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
      }
      return retryStrategy.retry(next, args);
    }
  };
}
var cooldown = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
var getRetryErrorInfo = (error, logger2) => {
  const errorInfo = {
    error,
    errorType: getRetryErrorType(error)
  };
  const retryAfterHint = parseRetryAfterHeader(error.$response, logger2);
  if (retryAfterHint) {
    errorInfo.retryAfterHint = retryAfterHint;
  }
  return errorInfo;
};
var getRetryErrorType = (error) => {
  if (isThrottlingError(error))
    return "THROTTLING";
  if (isTransientError(error))
    return "TRANSIENT";
  if (isServerError(error))
    return "SERVER_ERROR";
  return "CLIENT_ERROR";
};
var retryMiddlewareOptions = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: true
};
function bindGetRetryPlugin(isStreamingPayload2) {
  const retryMiddleware2 = bindRetryMiddleware(isStreamingPayload2);
  return (options) => ({
    applyToStack: (clientStack) => {
      clientStack.add(retryMiddleware2(options), retryMiddlewareOptions);
    }
  });
}

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRateLimiter.js
var DefaultRateLimiter = class _DefaultRateLimiter {
  static setTimeoutFn = (fn, delay) => setTimeout(fn, delay);
  beta;
  minCapacity;
  minFillRate;
  scaleConstant;
  smooth;
  enabled = false;
  availableTokens = 0;
  lastMaxRate = 0;
  measuredTxRate = 0;
  requestCount = 0;
  fillRate;
  lastThrottleTime;
  lastTimestamp = 0;
  lastTxRateBucket;
  maxCapacity;
  timeWindow = 0;
  constructor(options) {
    this.beta = options?.beta ?? 0.7;
    this.minCapacity = options?.minCapacity ?? 1;
    this.minFillRate = options?.minFillRate ?? 0.5;
    this.scaleConstant = options?.scaleConstant ?? 0.4;
    this.smooth = options?.smooth ?? 0.8;
    this.lastThrottleTime = this.getCurrentTimeInSeconds();
    this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
    this.fillRate = this.minFillRate;
    this.maxCapacity = this.minCapacity;
  }
  async getSendToken() {
    return this.acquireTokenBucket(1);
  }
  updateClientSendingRate(response) {
    let calculatedRate;
    this.updateMeasuredRate();
    const retryErrorInfo = response;
    const isThrottling = retryErrorInfo?.errorType === "THROTTLING" || isThrottlingError(retryErrorInfo?.error ?? response);
    if (isThrottling) {
      const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
      this.lastMaxRate = rateToUse;
      this.calculateTimeWindow();
      this.lastThrottleTime = this.getCurrentTimeInSeconds();
      calculatedRate = this.cubicThrottle(rateToUse);
      this.enableTokenBucket();
    } else {
      this.calculateTimeWindow();
      calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
    }
    const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
    this.updateTokenBucketRate(newRate);
  }
  getCurrentTimeInSeconds() {
    return Date.now() / 1e3;
  }
  async acquireTokenBucket(amount) {
    if (!this.enabled) {
      return;
    }
    this.refillTokenBucket();
    while (amount > this.availableTokens) {
      const delay = (amount - this.availableTokens) / this.fillRate * 1e3;
      await new Promise((resolve) => _DefaultRateLimiter.setTimeoutFn(resolve, delay));
      this.refillTokenBucket();
    }
    this.availableTokens = this.availableTokens - amount;
  }
  refillTokenBucket() {
    const timestamp = this.getCurrentTimeInSeconds();
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      return;
    }
    const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
    this.availableTokens = Math.min(this.maxCapacity, this.availableTokens + fillAmount);
    this.lastTimestamp = timestamp;
  }
  calculateTimeWindow() {
    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
  }
  cubicThrottle(rateToUse) {
    return this.getPrecise(rateToUse * this.beta);
  }
  cubicSuccess(timestamp) {
    return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
  }
  enableTokenBucket() {
    this.enabled = true;
  }
  updateTokenBucketRate(newRate) {
    this.refillTokenBucket();
    this.fillRate = Math.max(newRate, this.minFillRate);
    this.maxCapacity = Math.max(newRate, this.minCapacity);
    this.availableTokens = Math.min(this.availableTokens, this.maxCapacity);
  }
  updateMeasuredRate() {
    const t8 = this.getCurrentTimeInSeconds();
    const timeBucket = Math.floor(t8 * 2) / 2;
    this.requestCount++;
    if (timeBucket > this.lastTxRateBucket) {
      const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
      this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
      this.requestCount = 0;
      this.lastTxRateBucket = timeBucket;
    }
  }
  getPrecise(num) {
    return parseFloat(num.toFixed(8));
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/retries-2026-config.js
var Retry = class _Retry {
  static v2026 = typeof process !== "undefined" && process.env?.SMITHY_NEW_RETRIES_2026 === "true";
  static delay() {
    return _Retry.v2026 ? 50 : 100;
  }
  static throttlingDelay() {
    return _Retry.v2026 ? 1e3 : 500;
  }
  static cost() {
    return _Retry.v2026 ? 14 : 5;
  }
  static throttlingCost() {
    return _Retry.v2026 ? 5 : 10;
  }
  static modifiedCostType() {
    return _Retry.v2026 ? "THROTTLING" : "TRANSIENT";
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRetryBackoffStrategy.js
var DefaultRetryBackoffStrategy = class {
  x = Retry.delay();
  computeNextBackoffDelay(i2) {
    const b2 = Math.random();
    const r2 = 2;
    const t_i = b2 * Math.min(this.x * r2 ** i2, MAXIMUM_RETRY_DELAY);
    return Math.floor(t_i);
  }
  setDelayBase(delay) {
    this.x = delay;
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/DefaultRetryToken.js
var DefaultRetryToken = class {
  delay;
  count;
  cost;
  longPoll;
  $retryLog = {
    acquisitionDelay: 0
  };
  constructor(delay, count, cost, longPoll) {
    this.delay = delay;
    this.count = count;
    this.cost = cost;
    this.longPoll = longPoll;
  }
  getRetryCount() {
    return this.count;
  }
  getRetryDelay() {
    return Math.min(MAXIMUM_RETRY_DELAY, this.delay);
  }
  getRetryCost() {
    return this.cost;
  }
  isLongPoll() {
    return this.longPoll;
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/config.js
var RETRY_MODES;
(function(RETRY_MODES2) {
  RETRY_MODES2["STANDARD"] = "standard";
  RETRY_MODES2["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
var DEFAULT_MAX_ATTEMPTS = 3;
var DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/StandardRetryStrategy.js
var refusal = {
  incompatible: 1,
  attempts: 2,
  capacity: 3
};
var StandardRetryStrategy = class {
  mode = RETRY_MODES.STANDARD;
  retryBackoffStrategy;
  capacity = INITIAL_RETRY_TOKENS;
  maxAttemptsProvider;
  baseDelay;
  constructor(arg1) {
    if (typeof arg1 === "number") {
      this.maxAttemptsProvider = async () => arg1;
    } else if (typeof arg1 === "function") {
      this.maxAttemptsProvider = arg1;
    } else if (arg1 && typeof arg1 === "object") {
      this.maxAttemptsProvider = async () => arg1.maxAttempts;
      this.baseDelay = arg1.baseDelay;
      this.retryBackoffStrategy = arg1.backoff;
    }
    this.maxAttemptsProvider ??= async () => DEFAULT_MAX_ATTEMPTS;
    this.baseDelay ??= Retry.delay();
    this.retryBackoffStrategy ??= new DefaultRetryBackoffStrategy();
  }
  async acquireInitialRetryToken(retryTokenScope) {
    return new DefaultRetryToken(Retry.delay(), 0, void 0, Retry.v2026 && retryTokenScope.includes(":longpoll"));
  }
  async refreshRetryTokenForRetry(token, errorInfo) {
    const maxAttempts = await this.getMaxAttempts();
    const retryCode = this.retryCode(token, errorInfo, maxAttempts);
    const shouldRetry = retryCode === 0;
    const isLongPoll = token.isLongPoll?.();
    if (shouldRetry || isLongPoll) {
      const errorType = errorInfo.errorType;
      this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? Retry.throttlingDelay() : this.baseDelay);
      const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
      let retryDelay = delayFromErrorType;
      if (errorInfo.retryAfterHint instanceof Date) {
        retryDelay = Math.max(delayFromErrorType, Math.min(errorInfo.retryAfterHint.getTime() - Date.now(), delayFromErrorType + 5e3));
      }
      if (!shouldRetry) {
        const longPollBackoff = Retry.v2026 && retryCode === refusal.capacity && isLongPoll ? retryDelay : 0;
        if (longPollBackoff > 0) {
          await new Promise((r2) => setTimeout(r2, longPollBackoff));
        }
      } else {
        const capacityCost = this.getCapacityCost(errorType);
        this.capacity -= capacityCost;
        const nextToken = new DefaultRetryToken(0, token.getRetryCount() + 1, capacityCost, token.isLongPoll?.() ?? false);
        await new Promise((r2) => setTimeout(r2, retryDelay));
        nextToken.$retryLog.acquisitionDelay = retryDelay;
        return nextToken;
      }
    }
    throw new Error("No retry token available");
  }
  recordSuccess(token) {
    this.capacity = Math.min(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
  }
  getCapacity() {
    return this.capacity;
  }
  async maxAttempts() {
    return this.maxAttemptsProvider();
  }
  async getMaxAttempts() {
    try {
      return await this.maxAttemptsProvider();
    } catch (ignored) {
      console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
      return DEFAULT_MAX_ATTEMPTS;
    }
  }
  retryCode(tokenToRenew, errorInfo, maxAttempts) {
    const attempts = tokenToRenew.getRetryCount() + 1;
    const retryableStatus = this.isRetryableError(errorInfo.errorType) ? 0 : refusal.incompatible;
    const attemptStatus = attempts < maxAttempts ? 0 : refusal.attempts;
    const capacityStatus = this.capacity >= this.getCapacityCost(errorInfo.errorType) ? 0 : refusal.capacity;
    return retryableStatus || attemptStatus || capacityStatus;
  }
  getCapacityCost(errorType) {
    return errorType === Retry.modifiedCostType() ? Retry.throttlingCost() : Retry.cost();
  }
  isRetryableError(errorType) {
    return errorType === "THROTTLING" || errorType === "TRANSIENT";
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/util-retry/AdaptiveRetryStrategy.js
var AdaptiveRetryStrategy = class {
  mode = RETRY_MODES.ADAPTIVE;
  rateLimiter;
  standardRetryStrategy;
  constructor(maxAttemptsProvider, options) {
    const { rateLimiter } = options ?? {};
    this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
    this.standardRetryStrategy = options ? new StandardRetryStrategy({
      maxAttempts: typeof maxAttemptsProvider === "number" ? maxAttemptsProvider : 3,
      ...options
    }) : new StandardRetryStrategy(maxAttemptsProvider);
  }
  async acquireInitialRetryToken(retryTokenScope) {
    const token = await this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
    await this.rateLimiter.getSendToken();
    return token;
  }
  async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
    this.rateLimiter.updateClientSendingRate(errorInfo);
    const token = await this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
    await this.rateLimiter.getSendToken();
    return token;
  }
  recordSuccess(token) {
    this.rateLimiter.updateClientSendingRate({});
    this.standardRetryStrategy.recordSuccess(token);
  }
  async maxAttemptsProvider() {
    return this.standardRetryStrategy.maxAttempts();
  }
};

// node_modules/@smithy/core/dist-es/submodules/retry/middleware-retry/configurations.js
var resolveRetryConfig = (input, defaults) => {
  const { retryStrategy, retryMode } = input;
  const { defaultMaxAttempts = DEFAULT_MAX_ATTEMPTS, defaultBaseDelay = Retry.delay() } = defaults ?? {};
  const maxAttemptsProvider = normalizeProvider(input.maxAttempts ?? defaultMaxAttempts);
  let controller = retryStrategy ? Promise.resolve(retryStrategy) : void 0;
  const getDefault = async () => {
    const maxAttempts = await maxAttemptsProvider();
    const adaptive = await normalizeProvider(retryMode)() === RETRY_MODES.ADAPTIVE;
    if (adaptive) {
      return new AdaptiveRetryStrategy(maxAttemptsProvider, {
        maxAttempts,
        baseDelay: defaultBaseDelay
      });
    }
    return new StandardRetryStrategy({
      maxAttempts,
      baseDelay: defaultBaseDelay
    });
  };
  return Object.assign(input, {
    maxAttempts: maxAttemptsProvider,
    retryStrategy: () => controller ??= getDefault()
  });
};

// node_modules/@smithy/core/dist-es/submodules/retry/index.browser.js
var no3 = Symbol.for("node-only");
var retryMiddleware = bindRetryMiddleware(isStreamingPayload);
var getRetryPlugin = bindGetRetryPlugin(isStreamingPayload);

// node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js
Retry.v2026 ||= typeof process === "object" && process.env?.AWS_NEW_RETRIES_2026 === "true";
function setFeature2(context, feature, value) {
  if (!context.__aws_sdk_context) {
    context.__aws_sdk_context = {
      features: {}
    };
  } else if (!context.__aws_sdk_context.features) {
    context.__aws_sdk_context.features = {};
  }
  context.__aws_sdk_context.features[feature] = value;
}

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-host-header/hostHeaderMiddleware.js
function resolveHostHeaderConfig(input) {
  return input;
}
var hostHeaderMiddleware = (options) => (next) => async (args) => {
  if (!HttpRequest.isInstance(args.request))
    return next(args);
  const { request } = args;
  const { handlerProtocol = "" } = options.requestHandler.metadata || {};
  if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
    delete request.headers["host"];
    request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
  } else if (!request.headers["host"]) {
    let host = request.hostname;
    if (request.port != null)
      host += `:${request.port}`;
    request.headers["host"] = host;
  }
  return next(args);
};
var hostHeaderMiddlewareOptions = {
  name: "hostHeaderMiddleware",
  step: "build",
  priority: "low",
  tags: ["HOST"],
  override: true
};
var getHostHeaderPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-logger/loggerMiddleware.js
var loggerMiddleware = () => (next, context) => async (args) => {
  try {
    const response = await next(args);
    const { clientName, commandName, logger: logger2, dynamoDbDocumentClientOptions = {} } = context;
    const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
    const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
    const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
    const { $metadata, ...outputWithoutMetadata } = response.output;
    logger2?.info?.({
      clientName,
      commandName,
      input: inputFilterSensitiveLog(args.input),
      output: outputFilterSensitiveLog(outputWithoutMetadata),
      metadata: $metadata
    });
    return response;
  } catch (error) {
    const { clientName, commandName, logger: logger2, dynamoDbDocumentClientOptions = {} } = context;
    const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
    const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
    logger2?.error?.({
      clientName,
      commandName,
      input: inputFilterSensitiveLog(args.input),
      error,
      metadata: error.$metadata
    });
    throw error;
  }
};
var loggerMiddlewareOptions = {
  name: "loggerMiddleware",
  tags: ["LOGGER"],
  step: "initialize",
  override: true
};
var getLoggerPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-recursion-detection/getRecursionDetectionPlugin.browser.js
var getRecursionDetectionPlugin = (options) => ({
  applyToStack: (clientStack) => {
  }
});

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js
init_transport();

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/resolveAuthOptions.js
var resolveAuthOptions = (candidateAuthOptions, authSchemePreference) => {
  if (!authSchemePreference || authSchemePreference.length === 0) {
    return candidateAuthOptions;
  }
  const preferredAuthOptions = [];
  for (const preferredSchemeName of authSchemePreference) {
    for (const candidateAuthOption of candidateAuthOptions) {
      const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
      if (candidateAuthSchemeName === preferredSchemeName) {
        preferredAuthOptions.push(candidateAuthOption);
      }
    }
  }
  for (const candidateAuthOption of candidateAuthOptions) {
    if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) {
      preferredAuthOptions.push(candidateAuthOption);
    }
  }
  return preferredAuthOptions;
};

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js
function convertHttpAuthSchemesToMap(httpAuthSchemes) {
  const map = /* @__PURE__ */ new Map();
  for (const scheme of httpAuthSchemes) {
    map.set(scheme.schemeId, scheme);
  }
  return map;
}
var httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
  const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
  const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
  const resolvedOptions = resolveAuthOptions(options, authSchemePreference);
  const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
  const smithyContext = getSmithyContext(context);
  const failureReasons = [];
  for (const option of resolvedOptions) {
    const scheme = authSchemes.get(option.schemeId);
    if (!scheme) {
      failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
      continue;
    }
    const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
    if (!identityProvider) {
      failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
      continue;
    }
    const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
    option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
    option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
    smithyContext.selectedHttpAuthScheme = {
      httpAuthOption: option,
      identity: await identityProvider(option.identityProperties),
      signer: scheme.signer
    };
    break;
  }
  if (!smithyContext.selectedHttpAuthScheme) {
    throw new Error(failureReasons.join("\n"));
  }
  return next(args);
};

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js
var httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
  step: "serialize",
  tags: ["HTTP_AUTH_SCHEME"],
  name: "httpAuthSchemeMiddleware",
  override: true,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
};
var getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
      httpAuthSchemeParametersProvider,
      identityProviderConfigProvider
    }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
  }
});

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-signing/httpSigningMiddleware.js
init_transport();
var defaultErrorHandler = (signingProperties) => (error) => {
  throw error;
};
var defaultSuccessHandler = (httpResponse, signingProperties) => {
};
var httpSigningMiddleware = (config) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  const smithyContext = getSmithyContext(context);
  const scheme = smithyContext.selectedHttpAuthScheme;
  if (!scheme) {
    throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
  }
  const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
  const output = await next({
    ...args,
    request: await signer.sign(args.request, identity, signingProperties)
  }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
  (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
  return output;
};

// node_modules/@smithy/core/dist-es/legacy-root-exports/middleware-http-signing/getHttpSigningMiddleware.js
var httpSigningMiddlewareOptions = {
  step: "finalizeRequest",
  tags: ["HTTP_SIGNING"],
  name: "httpSigningMiddleware",
  aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
  override: true,
  relation: "after",
  toMiddleware: "retryMiddleware"
};
var getHttpSigningPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(httpSigningMiddleware(config), httpSigningMiddlewareOptions);
  }
});

// node_modules/@smithy/core/dist-es/normalizeProvider.js
var normalizeProvider2 = (input) => {
  if (typeof input === "function")
    return input;
  const promisified = Promise.resolve(input);
  return () => promisified;
};

// node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/DefaultIdentityProviderConfig.js
init_transport();
var DefaultIdentityProviderConfig = class {
  authSchemes = /* @__PURE__ */ new Map();
  constructor(config) {
    for (const key in config) {
      if (!hasOwn(config, key))
        continue;
      const value = config[key];
      if (value !== void 0) {
        this.authSchemes.set(key, value);
      }
    }
  }
  getIdentityProvider(schemeId) {
    return this.authSchemes.get(schemeId);
  }
};

// node_modules/@smithy/core/dist-es/legacy-root-exports/util-identity-and-auth/memoizeIdentityProvider.js
var createIsIdentityExpiredFunction = (expirationMs) => function isIdentityExpired2(identity) {
  return doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
};
var EXPIRATION_MS = 3e5;
var isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
var doesIdentityRequireRefresh = (identity) => identity.expiration !== void 0;
var memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
  if (provider === void 0) {
    return void 0;
  }
  const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
  let resolved;
  let pending;
  let hasResult;
  let isConstant = false;
  const coalesceProvider = async (options) => {
    if (!pending) {
      pending = normalizedProvider(options);
    }
    try {
      resolved = await pending;
      hasResult = true;
      isConstant = false;
    } finally {
      pending = void 0;
    }
    return resolved;
  };
  if (isExpired === void 0) {
    return async (options) => {
      if (!hasResult || options?.forceRefresh) {
        resolved = await coalesceProvider(options);
      }
      return resolved;
    };
  }
  return async (options) => {
    if (!hasResult || options?.forceRefresh) {
      resolved = await coalesceProvider(options);
    }
    if (isConstant) {
      return resolved;
    }
    if (!requiresRefresh(resolved)) {
      isConstant = true;
      return resolved;
    }
    if (isExpired(resolved)) {
      await coalesceProvider(options);
      return resolved;
    }
    return resolved;
  };
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/configurations.js
var DEFAULT_UA_APP_ID = void 0;
function isValidUserAgentAppId(appId) {
  if (appId === void 0) {
    return true;
  }
  return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
  const normalizedAppIdProvider = normalizeProvider2(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
  const { customUserAgent } = input;
  return Object.assign(input, {
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    userAgentAppId: async () => {
      const appId = await normalizedAppIdProvider();
      if (!isValidUserAgentAppId(appId)) {
        const logger2 = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
        if (typeof appId !== "string") {
          logger2?.warn("userAgentAppId must be a string or undefined.");
        } else if (appId.length > 50) {
          logger2?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return appId;
    }
  });
}

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/partitions.js
var partitionsInfo = {
  "partitions": [
    {
      "id": "aws",
      "outputs": {
        "dnsSuffix": "amazonaws.com",
        "dualStackDnsSuffix": "api.aws",
        "implicitGlobalRegion": "us-east-1",
        "name": "aws",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
      "regions": {
        "af-south-1": {
          "description": "Africa (Cape Town)"
        },
        "ap-east-1": {
          "description": "Asia Pacific (Hong Kong)"
        },
        "ap-east-2": {
          "description": "Asia Pacific (Taipei)"
        },
        "ap-northeast-1": {
          "description": "Asia Pacific (Tokyo)"
        },
        "ap-northeast-2": {
          "description": "Asia Pacific (Seoul)"
        },
        "ap-northeast-3": {
          "description": "Asia Pacific (Osaka)"
        },
        "ap-south-1": {
          "description": "Asia Pacific (Mumbai)"
        },
        "ap-south-2": {
          "description": "Asia Pacific (Hyderabad)"
        },
        "ap-southeast-1": {
          "description": "Asia Pacific (Singapore)"
        },
        "ap-southeast-2": {
          "description": "Asia Pacific (Sydney)"
        },
        "ap-southeast-3": {
          "description": "Asia Pacific (Jakarta)"
        },
        "ap-southeast-4": {
          "description": "Asia Pacific (Melbourne)"
        },
        "ap-southeast-5": {
          "description": "Asia Pacific (Malaysia)"
        },
        "ap-southeast-6": {
          "description": "Asia Pacific (New Zealand)"
        },
        "ap-southeast-7": {
          "description": "Asia Pacific (Thailand)"
        },
        "aws-global": {
          "description": "aws global region"
        },
        "ca-central-1": {
          "description": "Canada (Central)"
        },
        "ca-west-1": {
          "description": "Canada West (Calgary)"
        },
        "eu-central-1": {
          "description": "Europe (Frankfurt)"
        },
        "eu-central-2": {
          "description": "Europe (Zurich)"
        },
        "eu-north-1": {
          "description": "Europe (Stockholm)"
        },
        "eu-south-1": {
          "description": "Europe (Milan)"
        },
        "eu-south-2": {
          "description": "Europe (Spain)"
        },
        "eu-west-1": {
          "description": "Europe (Ireland)"
        },
        "eu-west-2": {
          "description": "Europe (London)"
        },
        "eu-west-3": {
          "description": "Europe (Paris)"
        },
        "il-central-1": {
          "description": "Israel (Tel Aviv)"
        },
        "me-central-1": {
          "description": "Middle East (UAE)"
        },
        "me-south-1": {
          "description": "Middle East (Bahrain)"
        },
        "mx-central-1": {
          "description": "Mexico (Central)"
        },
        "sa-east-1": {
          "description": "South America (Sao Paulo)"
        },
        "us-east-1": {
          "description": "US East (N. Virginia)"
        },
        "us-east-2": {
          "description": "US East (Ohio)"
        },
        "us-west-1": {
          "description": "US West (N. California)"
        },
        "us-west-2": {
          "description": "US West (Oregon)"
        }
      }
    },
    {
      "id": "aws-cn",
      "outputs": {
        "dnsSuffix": "amazonaws.com.cn",
        "dualStackDnsSuffix": "api.amazonwebservices.com.cn",
        "implicitGlobalRegion": "cn-northwest-1",
        "name": "aws-cn",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^cn\\-\\w+\\-\\d+$",
      "regions": {
        "aws-cn-global": {
          "description": "aws-cn global region"
        },
        "cn-north-1": {
          "description": "China (Beijing)"
        },
        "cn-northwest-1": {
          "description": "China (Ningxia)"
        }
      }
    },
    {
      "id": "aws-eusc",
      "outputs": {
        "dnsSuffix": "amazonaws.eu",
        "dualStackDnsSuffix": "api.amazonwebservices.eu",
        "implicitGlobalRegion": "eusc-de-east-1",
        "name": "aws-eusc",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^eusc\\-(de)\\-\\w+\\-\\d+$",
      "regions": {
        "eusc-de-east-1": {
          "description": "AWS European Sovereign Cloud (Germany)"
        }
      }
    },
    {
      "id": "aws-iso",
      "outputs": {
        "dnsSuffix": "c2s.ic.gov",
        "dualStackDnsSuffix": "api.aws.ic.gov",
        "implicitGlobalRegion": "us-iso-east-1",
        "name": "aws-iso",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^us\\-iso\\-\\w+\\-\\d+$",
      "regions": {
        "aws-iso-global": {
          "description": "aws-iso global region"
        },
        "us-iso-east-1": {
          "description": "US ISO East"
        },
        "us-iso-west-1": {
          "description": "US ISO WEST"
        }
      }
    },
    {
      "id": "aws-iso-b",
      "outputs": {
        "dnsSuffix": "sc2s.sgov.gov",
        "dualStackDnsSuffix": "api.aws.scloud",
        "implicitGlobalRegion": "us-isob-east-1",
        "name": "aws-iso-b",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^us\\-isob\\-\\w+\\-\\d+$",
      "regions": {
        "aws-iso-b-global": {
          "description": "aws-iso-b global region"
        },
        "us-isob-east-1": {
          "description": "US ISOB East (Ohio)"
        },
        "us-isob-west-1": {
          "description": "US ISOB West"
        }
      }
    },
    {
      "id": "aws-iso-e",
      "outputs": {
        "dnsSuffix": "cloud.adc-e.uk",
        "dualStackDnsSuffix": "api.cloud-aws.adc-e.uk",
        "implicitGlobalRegion": "eu-isoe-west-1",
        "name": "aws-iso-e",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^eu\\-isoe\\-\\w+\\-\\d+$",
      "regions": {
        "aws-iso-e-global": {
          "description": "aws-iso-e global region"
        },
        "eu-isoe-west-1": {
          "description": "EU ISOE West"
        }
      }
    },
    {
      "id": "aws-iso-f",
      "outputs": {
        "dnsSuffix": "csp.hci.ic.gov",
        "dualStackDnsSuffix": "api.aws.hci.ic.gov",
        "implicitGlobalRegion": "us-isof-south-1",
        "name": "aws-iso-f",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^us\\-isof\\-\\w+\\-\\d+$",
      "regions": {
        "aws-iso-f-global": {
          "description": "aws-iso-f global region"
        },
        "us-isof-east-1": {
          "description": "US ISOF EAST"
        },
        "us-isof-south-1": {
          "description": "US ISOF SOUTH"
        }
      }
    },
    {
      "id": "aws-us-gov",
      "outputs": {
        "dnsSuffix": "amazonaws.com",
        "dualStackDnsSuffix": "api.aws",
        "implicitGlobalRegion": "us-gov-west-1",
        "name": "aws-us-gov",
        "supportsDualStack": true,
        "supportsFIPS": true
      },
      "regionRegex": "^us\\-gov\\-\\w+\\-\\d+$",
      "regions": {
        "aws-us-gov-global": {
          "description": "aws-us-gov global region"
        },
        "us-gov-east-1": {
          "description": "AWS GovCloud (US-East)"
        },
        "us-gov-west-1": {
          "description": "AWS GovCloud (US-West)"
        }
      }
    }
  ],
  "version": "1.1"
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/partition.js
var selectedPartitionsInfo = partitionsInfo;
var selectedUserAgentPrefix = "";
var partition = (value) => {
  const { partitions } = selectedPartitionsInfo;
  for (const partition2 of partitions) {
    const { regions, outputs } = partition2;
    for (const [region, regionData] of Object.entries(regions)) {
      if (region === value) {
        return {
          ...outputs,
          ...regionData
        };
      }
    }
  }
  for (const partition2 of partitions) {
    const { regionRegex, outputs } = partition2;
    if (new RegExp(regionRegex).test(value)) {
      return {
        ...outputs
      };
    }
  }
  const DEFAULT_PARTITION = partitions.find((partition2) => partition2.id === "aws");
  if (!DEFAULT_PARTITION) {
    throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
  }
  return {
    ...DEFAULT_PARTITION.outputs
  };
};
var getUserAgentPrefix = () => selectedUserAgentPrefix;

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/check-features.js
var ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
async function checkFeatures(context, config, args) {
  const request = args.request;
  if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
    setFeature2(context, "PROTOCOL_RPC_V2_CBOR", "M");
  }
  if (typeof config.retryStrategy === "function") {
    const retryStrategy = await config.retryStrategy();
    if (typeof retryStrategy.mode === "string") {
      switch (retryStrategy.mode) {
        case RETRY_MODES.ADAPTIVE:
          setFeature2(context, "RETRY_MODE_ADAPTIVE", "F");
          break;
        case RETRY_MODES.STANDARD:
          setFeature2(context, "RETRY_MODE_STANDARD", "E");
          break;
      }
    }
  }
  if (typeof config.accountIdEndpointMode === "function") {
    const endpointV2 = context.endpointV2;
    if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
      setFeature2(context, "ACCOUNT_ID_ENDPOINT", "O");
    }
    switch (await config.accountIdEndpointMode?.()) {
      case "disabled":
        setFeature2(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        setFeature2(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        setFeature2(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
  if (identity?.$source) {
    const credentials = identity;
    if (credentials.accountId) {
      setFeature2(context, "RESOLVED_ACCOUNT_ID", "T");
    }
    for (const [key, value] of Object.entries(credentials.$source ?? {})) {
      setFeature2(context, key, value);
    }
  }
}

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/constants.js
var USER_AGENT = "user-agent";
var X_AMZ_USER_AGENT = "x-amz-user-agent";
var SPACE = " ";
var UA_NAME_SEPARATOR = "/";
var UA_NAME_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w]/g;
var UA_VALUE_ESCAPE_REGEX = /[^!$%&'*+\-.^_`|~\w#]/g;
var UA_ESCAPE_CHAR = "-";

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/encode-features.js
var BYTE_LIMIT = 1024;
function encodeFeatures(features) {
  let buffer = "";
  for (const key in features) {
    const val = features[key];
    if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
      if (buffer.length) {
        buffer += "," + val;
      } else {
        buffer += val;
      }
      continue;
    }
    break;
  }
  return buffer;
}

// node_modules/@aws-sdk/core/dist-es/submodules/client/middleware-user-agent/user-agent-middleware.js
var userAgentMiddleware = (options) => (next, context) => async (args) => {
  const { request } = args;
  if (!HttpRequest.isInstance(request)) {
    return next(args);
  }
  const { headers } = request;
  const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
  const defaultUserAgent2 = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
  await checkFeatures(context, options, args);
  const awsContext = context;
  defaultUserAgent2.push(`m/${encodeFeatures(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
  const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
  const appId = await options.userAgentAppId();
  if (appId) {
    defaultUserAgent2.push(escapeUserAgent([`app`, `${appId}`]));
  }
  const prefix = getUserAgentPrefix();
  const sdkUserAgentValue = (prefix ? [prefix] : []).concat([...defaultUserAgent2, ...userAgent, ...customUserAgent]).join(SPACE);
  const normalUAValue = [
    ...defaultUserAgent2.filter((section) => section.startsWith("aws-sdk-")),
    ...customUserAgent
  ].join(SPACE);
  if (options.runtime !== "browser") {
    if (normalUAValue) {
      headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
    }
    headers[USER_AGENT] = sdkUserAgentValue;
  } else {
    headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
  }
  return next({
    ...args,
    request
  });
};
var escapeUserAgent = (userAgentPair) => {
  const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
  const version = userAgentPair[1]?.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
  const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
  const prefix = name.substring(0, prefixSeparatorIndex);
  let uaName = name.substring(prefixSeparatorIndex + 1);
  if (prefix === "api") {
    uaName = uaName.toLowerCase();
  }
  return [prefix, uaName, version].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
    switch (index) {
      case 0:
        return item;
      case 1:
        return `${acc}/${item}`;
      default:
        return `${acc}#${item}`;
    }
  }, "");
};
var getUserAgentMiddlewareOptions = {
  name: "getUserAgentMiddleware",
  step: "build",
  priority: "low",
  tags: ["SET_USER_AGENT", "USER_AGENT"],
  override: true
};
var getUserAgentPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-user-agent-browser/defaultUserAgent.js
var createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => async (config) => {
  const navigator2 = typeof window !== "undefined" ? window.navigator : void 0;
  const uaString = navigator2?.userAgent ?? "";
  const osName = navigator2?.userAgentData?.platform ?? fallback.os(uaString) ?? "other";
  const osVersion = void 0;
  const brands = navigator2?.userAgentData?.brands ?? [];
  const brand = brands[brands.length - 1];
  const browserName = brand?.brand ?? fallback.browser(uaString) ?? "unknown";
  const browserVersion = brand?.version ?? "unknown";
  const sections = [
    ["aws-sdk-js", clientVersion],
    ["ua", "2.1"],
    [`os/${osName}`, osVersion],
    ["lang/js"],
    ["md/browser", `${browserName}_${browserVersion}`]
  ];
  if (serviceId) {
    sections.push([`api/${serviceId}`, clientVersion]);
  }
  const appId = await config?.userAgentAppId?.();
  if (appId) {
    sections.push([`app/${appId}`]);
  }
  return sections;
};
var fallback = {
  os(ua) {
    if (/iPhone|iPad|iPod/.test(ua))
      return "iOS";
    if (/Macintosh|Mac OS X/.test(ua))
      return "macOS";
    if (/Windows NT/.test(ua))
      return "Windows";
    if (/Android/.test(ua))
      return "Android";
    if (/Linux/.test(ua))
      return "Linux";
    return void 0;
  },
  browser(ua) {
    if (/EdgiOS|EdgA|Edg\//.test(ua))
      return "Microsoft Edge";
    if (/Firefox\//.test(ua))
      return "Firefox";
    if (/Chrome\//.test(ua))
      return "Chrome";
    if (/Safari\//.test(ua))
      return "Safari";
    return void 0;
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/aws.js
init_index_browser();

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/isVirtualHostableS3Bucket.js
init_index_browser();

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/isIpAddress.js
init_index_browser();

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/isVirtualHostableS3Bucket.js
var isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
  if (allowSubDomains) {
    for (const label of value.split(".")) {
      if (!isVirtualHostableS3Bucket(label)) {
        return false;
      }
    }
    return true;
  }
  if (!isValidHostLabel(value)) {
    return false;
  }
  if (value.length < 3 || value.length > 63) {
    return false;
  }
  if (value !== value.toLowerCase()) {
    return false;
  }
  if (isIpAddress(value)) {
    return false;
  }
  return true;
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/lib/aws/parseArn.js
var ARN_DELIMITER = ":";
var RESOURCE_DELIMITER = "/";
var parseArn = (value) => {
  const segments = value.split(ARN_DELIMITER);
  if (segments.length < 6)
    return null;
  const [arn, partition2, service, region, accountId, ...resourcePath] = segments;
  if (arn !== "arn" || partition2 === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
    return null;
  const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
  return {
    partition: partition2,
    service,
    region,
    accountId,
    resourceId
  };
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/util-endpoints/aws.js
var awsEndpointFunctions = {
  isVirtualHostableS3Bucket,
  parseArn,
  partition
};
customEndpointFunctions.aws = awsEndpointFunctions;

// node_modules/@smithy/core/dist-es/submodules/config/property-provider/memoize.js
var memoize = (provider, isExpired, requiresRefresh) => {
  let resolved;
  let pending;
  let hasResult;
  let isConstant = false;
  const coalesceProvider = async () => {
    if (!pending) {
      pending = provider();
    }
    try {
      resolved = await pending;
      hasResult = true;
      isConstant = false;
    } finally {
      pending = void 0;
    }
    return resolved;
  };
  if (isExpired === void 0) {
    return async (options) => {
      if (!hasResult || options?.forceRefresh) {
        resolved = await coalesceProvider();
      }
      return resolved;
    };
  }
  return async (options) => {
    if (!hasResult || options?.forceRefresh) {
      resolved = await coalesceProvider();
    }
    if (isConstant) {
      return resolved;
    }
    if (requiresRefresh && !requiresRefresh(resolved)) {
      isConstant = true;
      return resolved;
    }
    if (isExpired(resolved)) {
      await coalesceProvider();
      return resolved;
    }
    return resolved;
  };
};

// node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/checkRegion.js
init_transport();
var validRegions = /* @__PURE__ */ new Set();
var checkRegion = (region, check = isValidHostLabel) => {
  if (!validRegions.has(region) && !check(region)) {
    if (region === "*") {
      console.warn(`@smithy/config-resolver WARN - Please use the caller region instead of "*". See "sigv4a" in https://github.com/aws/aws-sdk-js-v3/blob/main/supplemental-docs/CLIENTS.md.`);
    } else {
      throw new Error(`Region not accepted: region="${region}" is not a valid hostname component.`);
    }
  } else {
    validRegions.add(region);
  }
};

// node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/isFipsRegion.js
var isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));

// node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/getRealRegion.js
var getRealRegion = (region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;

// node_modules/@smithy/core/dist-es/submodules/config/config-resolver/regionConfig/resolveRegionConfig.js
var resolveRegionConfig = (input) => {
  const { region, useFipsEndpoint } = input;
  if (!region) {
    throw new Error("Region is missing");
  }
  return Object.assign(input, {
    region: async () => {
      const providedRegion = typeof region === "function" ? await region() : region;
      const realRegion = getRealRegion(providedRegion);
      checkRegion(realRegion);
      return realRegion;
    },
    useFipsEndpoint: async () => {
      const providedRegion = typeof region === "string" ? region : await region();
      if (isFipsRegion(providedRegion)) {
        return true;
      }
      return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
    }
  });
};

// node_modules/@smithy/core/dist-es/submodules/config/defaults-mode/constants.js
var DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];

// node_modules/@smithy/core/dist-es/submodules/config/defaults-mode/resolveDefaultsModeConfig.browser.js
var resolveDefaultsModeConfig = ({ defaultsMode } = {}) => memoize(async () => {
  const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
  switch (mode?.toLowerCase()) {
    case "auto":
      return Promise.resolve(useMobileConfiguration() ? "mobile" : "standard");
    case "mobile":
    case "in-region":
    case "cross-region":
    case "standard":
    case "legacy":
      return Promise.resolve(mode?.toLocaleLowerCase());
    case void 0:
      return Promise.resolve("legacy");
    default:
      throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
  }
});
var useMobileConfiguration = () => {
  const navigator2 = window?.navigator;
  if (navigator2?.connection) {
    const { effectiveType, rtt, downlink } = navigator2.connection;
    const slow = typeof effectiveType === "string" && effectiveType !== "4g" || Number(rtt) > 100 || Number(downlink) < 10;
    if (slow) {
      return true;
    }
  }
  return navigator2?.userAgentData?.mobile || typeof navigator2?.maxTouchPoints === "number" && navigator2?.maxTouchPoints > 1;
};

// node_modules/@smithy/core/dist-es/submodules/config/index.browser.js
var no4 = Symbol.for("node-only");
var DEFAULT_USE_DUALSTACK_ENDPOINT = false;
var DEFAULT_USE_FIPS_ENDPOINT = false;

// node_modules/@aws-sdk/core/dist-es/submodules/client/region-config-resolver/extensions.js
var getAwsRegionExtensionConfiguration = (runtimeConfig) => {
  return {
    setRegion(region) {
      runtimeConfig.region = region;
    },
    region() {
      return runtimeConfig.region;
    }
  };
};
var resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
  return {
    region: awsRegionExtensionConfiguration.region()
  };
};

// node_modules/@aws-sdk/core/dist-es/submodules/client/index.browser.js
var no5 = Symbol.for("node-only");

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/flexibleChecksumsMiddleware.js
init_index_browser2();

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/getChecksumAlgorithmForRequest.js
var getChecksumAlgorithmForRequest = (input, { requestChecksumRequired, requestAlgorithmMember, requestChecksumCalculation }) => {
  if (!requestAlgorithmMember) {
    return requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired ? DEFAULT_CHECKSUM_ALGORITHM : void 0;
  }
  if (!input[requestAlgorithmMember]) {
    return void 0;
  }
  const checksumAlgorithm = input[requestAlgorithmMember];
  return checksumAlgorithm;
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/getChecksumLocationName.js
var getChecksumLocationName = (algorithm) => algorithm === ChecksumAlgorithm.MD5 ? "content-md5" : `x-amz-checksum-${algorithm.toLowerCase()}`;

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/hasHeader.js
var hasHeader = (header, headers) => {
  const soughtHeader = header.toLowerCase();
  for (const headerName of Object.keys(headers)) {
    if (soughtHeader === headerName.toLowerCase()) {
      return true;
    }
  }
  return false;
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/hasHeaderWithPrefix.js
var hasHeaderWithPrefix = (headerPrefix, headers) => {
  const soughtHeaderPrefix = headerPrefix.toLowerCase();
  for (const headerName of Object.keys(headers)) {
    if (headerName.toLowerCase().startsWith(soughtHeaderPrefix)) {
      return true;
    }
  }
  return false;
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/isStreaming.js
init_index_browser2();
var isStreaming = (body) => body !== void 0 && typeof body !== "string" && !ArrayBuffer.isView(body) && !isArrayBuffer(body);

// node_modules/@aws-sdk/checksums/dist-es/submodules/crc/crc32c/Crc32cJs.js
var T2 = new Uint32Array(256);
for (let i2 = 0; i2 < 256; ++i2) {
  let c2 = i2;
  for (let j2 = 0; j2 < 8; ++j2) {
    c2 = c2 & 1 ? 2197175160 ^ c2 >>> 1 : c2 >>> 1;
  }
  T2[i2] = c2 >>> 0;
}
var Crc32cJs = class {
  digestLength = 4;
  crc = 4294967295;
  update(data) {
    let crc = this.crc;
    for (let i2 = 0; i2 < data.length; ++i2) {
      crc = crc >>> 8 ^ T2[(crc ^ data[i2]) & 255];
    }
    this.crc = crc;
  }
  async digest() {
    const value = (this.crc ^ 4294967295) >>> 0;
    const out = new Uint8Array(4);
    out[0] = value >>> 24;
    out[1] = value >>> 16 & 255;
    out[2] = value >>> 8 & 255;
    out[3] = value & 255;
    return out;
  }
  reset() {
    this.crc = 4294967295;
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/crc/crc64-nvme/Crc64NvmeJs.js
var generateCRC64NVMETable = () => {
  const sliceLength = 8;
  const tables = new Array(sliceLength);
  for (let slice = 0; slice < sliceLength; slice++) {
    const table = new Array(512);
    for (let i2 = 0; i2 < 256; i2++) {
      let crc = BigInt(i2);
      for (let j2 = 0; j2 < 8 * (slice + 1); j2++) {
        if (crc & 1n) {
          crc = crc >> 1n ^ 0x9a6c9329ac4bc9b5n;
        } else {
          crc = crc >> 1n;
        }
      }
      table[i2 * 2] = Number(crc >> 32n & 0xffffffffn);
      table[i2 * 2 + 1] = Number(crc & 0xffffffffn);
    }
    tables[slice] = new Uint32Array(table);
  }
  return tables;
};
var CRC64_NVME_REVERSED_TABLE;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var ensureTablesInitialized = () => {
  if (!CRC64_NVME_REVERSED_TABLE) {
    CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();
    [t0, t1, t2, t3, t4, t5, t6, t7] = CRC64_NVME_REVERSED_TABLE;
  }
};
var Crc64NvmeJs = class {
  c1 = 0;
  c2 = 0;
  constructor() {
    ensureTablesInitialized();
    this.reset();
  }
  update(data) {
    const len = data.length;
    let i2 = 0;
    let crc1 = this.c1;
    let crc2 = this.c2;
    while (i2 + 8 <= len) {
      const idx0 = ((crc2 ^ data[i2++]) & 255) << 1;
      const idx1 = ((crc2 >>> 8 ^ data[i2++]) & 255) << 1;
      const idx2 = ((crc2 >>> 16 ^ data[i2++]) & 255) << 1;
      const idx3 = ((crc2 >>> 24 ^ data[i2++]) & 255) << 1;
      const idx4 = ((crc1 ^ data[i2++]) & 255) << 1;
      const idx5 = ((crc1 >>> 8 ^ data[i2++]) & 255) << 1;
      const idx6 = ((crc1 >>> 16 ^ data[i2++]) & 255) << 1;
      const idx7 = ((crc1 >>> 24 ^ data[i2++]) & 255) << 1;
      crc1 = t7[idx0] ^ t6[idx1] ^ t5[idx2] ^ t4[idx3] ^ t3[idx4] ^ t2[idx5] ^ t1[idx6] ^ t0[idx7];
      crc2 = t7[idx0 + 1] ^ t6[idx1 + 1] ^ t5[idx2 + 1] ^ t4[idx3 + 1] ^ t3[idx4 + 1] ^ t2[idx5 + 1] ^ t1[idx6 + 1] ^ t0[idx7 + 1];
    }
    while (i2 < len) {
      const idx = ((crc2 ^ data[i2]) & 255) << 1;
      crc2 = (crc2 >>> 8 | (crc1 & 255) << 24) >>> 0;
      crc1 = crc1 >>> 8 ^ t0[idx];
      crc2 ^= t0[idx + 1];
      ++i2;
    }
    this.c1 = crc1;
    this.c2 = crc2;
  }
  async digest() {
    const c1 = this.c1 ^ 4294967295;
    const c2 = this.c2 ^ 4294967295;
    return new Uint8Array([
      c1 >>> 24,
      c1 >>> 16 & 255,
      c1 >>> 8 & 255,
      c1 & 255,
      c2 >>> 24,
      c2 >>> 16 & 255,
      c2 >>> 8 & 255,
      c2 & 255
    ]);
  }
  reset() {
    this.c1 = 4294967295;
    this.c2 = 4294967295;
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/crc/index.browser.js
init_index_browser3();
var no6 = Symbol.for("node-only");

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/types.js
var CLIENT_SUPPORTED_ALGORITHMS = [
  ChecksumAlgorithm.CRC32,
  ChecksumAlgorithm.CRC32C,
  ChecksumAlgorithm.CRC64NVME,
  ChecksumAlgorithm.SHA1,
  ChecksumAlgorithm.SHA256
];
var PRIORITY_ORDER_ALGORITHMS = [
  ChecksumAlgorithm.SHA256,
  ChecksumAlgorithm.SHA1,
  ChecksumAlgorithm.CRC32,
  ChecksumAlgorithm.CRC32C,
  ChecksumAlgorithm.CRC64NVME
];

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/selectChecksumAlgorithmFunction.js
var selectChecksumAlgorithmFunction = (checksumAlgorithm, config) => {
  const { checksumAlgorithms = {} } = config;
  switch (checksumAlgorithm) {
    case ChecksumAlgorithm.MD5:
      return checksumAlgorithms?.MD5 ?? config.md5;
    case ChecksumAlgorithm.CRC32:
      return checksumAlgorithms?.CRC32 ?? Crc32Js;
    case ChecksumAlgorithm.CRC32C:
      return checksumAlgorithms?.CRC32C ?? Crc32cJs;
    case ChecksumAlgorithm.CRC64NVME:
      return checksumAlgorithms?.CRC64NVME ?? Crc64NvmeJs;
    case ChecksumAlgorithm.SHA1:
      return checksumAlgorithms?.SHA1 ?? config.sha1;
    case ChecksumAlgorithm.SHA256:
      return checksumAlgorithms?.SHA256 ?? config.sha256;
    default:
      if (checksumAlgorithms?.[checksumAlgorithm]) {
        return checksumAlgorithms[checksumAlgorithm];
      }
      throw new Error(`The checksum algorithm "${checksumAlgorithm}" is not supported by the client. Select one of ${CLIENT_SUPPORTED_ALGORITHMS}, or provide an implementation to  the client constructor checksums field.`);
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/stringHasher.js
init_index_browser2();
var stringHasher = (checksumAlgorithmFn, body) => {
  const hash = new checksumAlgorithmFn();
  hash.update(toUint8Array(body || ""));
  return hash.digest();
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/flexibleChecksumsMiddleware.js
var flexibleChecksumsMiddlewareOptions = {
  name: "flexibleChecksumsMiddleware",
  step: "build",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  if (hasHeaderWithPrefix("x-amz-checksum-", args.request.headers)) {
    return next(args);
  }
  const { request, input } = args;
  const { body: requestBody, headers } = request;
  const { base64Encoder, streamHasher } = config;
  const { requestChecksumRequired, requestAlgorithmMember } = middlewareConfig;
  const requestChecksumCalculation = await config.requestChecksumCalculation();
  const requestAlgorithmMemberName = requestAlgorithmMember?.name;
  const requestAlgorithmMemberHttpHeader = requestAlgorithmMember?.httpHeader;
  if (requestAlgorithmMemberName && !input[requestAlgorithmMemberName]) {
    if (requestChecksumCalculation === RequestChecksumCalculation.WHEN_SUPPORTED || requestChecksumRequired) {
      input[requestAlgorithmMemberName] = DEFAULT_CHECKSUM_ALGORITHM;
      if (requestAlgorithmMemberHttpHeader) {
        headers[requestAlgorithmMemberHttpHeader] = DEFAULT_CHECKSUM_ALGORITHM;
      }
    }
  }
  const checksumAlgorithm = getChecksumAlgorithmForRequest(input, {
    requestChecksumRequired,
    requestAlgorithmMember: requestAlgorithmMember?.name,
    requestChecksumCalculation
  });
  let updatedBody = requestBody;
  let updatedHeaders = headers;
  if (checksumAlgorithm) {
    switch (checksumAlgorithm) {
      case ChecksumAlgorithm.CRC32:
        setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32", "U");
        break;
      case ChecksumAlgorithm.CRC32C:
        setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_CRC32C", "V");
        break;
      case ChecksumAlgorithm.CRC64NVME:
        setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_CRC64", "W");
        break;
      case ChecksumAlgorithm.SHA1:
        setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_SHA1", "X");
        break;
      case ChecksumAlgorithm.SHA256:
        setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_SHA256", "Y");
        break;
    }
    const checksumLocationName = getChecksumLocationName(checksumAlgorithm);
    const checksumAlgorithmFn = selectChecksumAlgorithmFunction(checksumAlgorithm, config);
    if (isStreaming(requestBody)) {
      const { getAwsChunkedEncodingStream: getAwsChunkedEncodingStream2, bodyLengthChecker } = config;
      updatedBody = getAwsChunkedEncodingStream2(typeof config.requestStreamBufferSize === "number" && config.requestStreamBufferSize >= 8 * 1024 ? createBufferedReadable(requestBody, config.requestStreamBufferSize, context.logger) : requestBody, {
        base64Encoder,
        bodyLengthChecker,
        checksumLocationName,
        checksumAlgorithmFn,
        streamHasher
      });
      updatedHeaders = {
        ...headers,
        "content-encoding": headers["content-encoding"] ? `${headers["content-encoding"]},aws-chunked` : "aws-chunked",
        "transfer-encoding": "chunked",
        "x-amz-decoded-content-length": headers["content-length"],
        "x-amz-content-sha256": "STREAMING-UNSIGNED-PAYLOAD-TRAILER",
        "x-amz-trailer": checksumLocationName
      };
      delete updatedHeaders["content-length"];
    } else if (!hasHeader(checksumLocationName, headers)) {
      const rawChecksum = await stringHasher(checksumAlgorithmFn, requestBody);
      updatedHeaders = {
        ...headers,
        [checksumLocationName]: base64Encoder(rawChecksum)
      };
    }
  }
  try {
    const result = await next({
      ...args,
      request: {
        ...request,
        headers: updatedHeaders,
        body: updatedBody
      }
    });
    return result;
  } catch (e2) {
    if (e2 instanceof Error && e2.name === "InvalidChunkSizeError") {
      try {
        if (!e2.message.endsWith(".")) {
          e2.message += ".";
        }
        e2.message += " Set [requestStreamBufferSize=number e.g. 65_536] in client constructor to instruct AWS SDK to buffer your input stream.";
      } catch (ignored) {
      }
    }
    throw e2;
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/flexibleChecksumsInputMiddleware.js
var flexibleChecksumsInputMiddlewareOptions = {
  name: "flexibleChecksumsInputMiddleware",
  toMiddleware: "serializerMiddleware",
  relation: "before",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsInputMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  const input = args.input;
  const { requestValidationModeMember } = middlewareConfig;
  const requestChecksumCalculation = await config.requestChecksumCalculation();
  const responseChecksumValidation = await config.responseChecksumValidation();
  switch (requestChecksumCalculation) {
    case RequestChecksumCalculation.WHEN_REQUIRED:
      setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_REQUIRED", "a");
      break;
    case RequestChecksumCalculation.WHEN_SUPPORTED:
      setFeature2(context, "FLEXIBLE_CHECKSUMS_REQ_WHEN_SUPPORTED", "Z");
      break;
  }
  switch (responseChecksumValidation) {
    case ResponseChecksumValidation.WHEN_REQUIRED:
      setFeature2(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_REQUIRED", "c");
      break;
    case ResponseChecksumValidation.WHEN_SUPPORTED:
      setFeature2(context, "FLEXIBLE_CHECKSUMS_RES_WHEN_SUPPORTED", "b");
      break;
  }
  if (requestValidationModeMember && !input[requestValidationModeMember]) {
    if (responseChecksumValidation === ResponseChecksumValidation.WHEN_SUPPORTED) {
      input[requestValidationModeMember] = "ENABLED";
    }
  }
  return next(args);
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/getChecksumAlgorithmListForResponse.js
var getChecksumAlgorithmListForResponse = (responseAlgorithms = []) => {
  const validChecksumAlgorithms = [];
  let i2 = PRIORITY_ORDER_ALGORITHMS.length;
  for (const algorithm of responseAlgorithms) {
    const priority = PRIORITY_ORDER_ALGORITHMS.indexOf(algorithm);
    if (priority !== -1) {
      validChecksumAlgorithms[priority] = algorithm;
    } else {
      validChecksumAlgorithms[i2++] = algorithm;
    }
  }
  return validChecksumAlgorithms.filter(Boolean);
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/isChecksumWithPartNumber.js
var isChecksumWithPartNumber = (checksum) => {
  const lastHyphenIndex = checksum.lastIndexOf("-");
  if (lastHyphenIndex !== -1) {
    const numberPart = checksum.slice(lastHyphenIndex + 1);
    if (!numberPart.startsWith("0")) {
      const number = parseInt(numberPart, 10);
      if (!isNaN(number) && number >= 1 && number <= 1e4) {
        return true;
      }
    }
  }
  return false;
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/validateChecksumFromResponse.js
init_index_browser2();

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/getChecksum.js
var getChecksum = async (body, { checksumAlgorithmFn, base64Encoder }) => base64Encoder(await stringHasher(checksumAlgorithmFn, body));

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/validateChecksumFromResponse.js
var validateChecksumFromResponse = async (response, { config, responseAlgorithms, logger: logger2 }) => {
  const checksumAlgorithms = getChecksumAlgorithmListForResponse(responseAlgorithms);
  const { body: responseBody, headers: responseHeaders } = response;
  for (const algorithm of checksumAlgorithms) {
    const responseHeader = getChecksumLocationName(algorithm);
    const checksumFromResponse = responseHeaders[responseHeader];
    if (checksumFromResponse) {
      let checksumAlgorithmFn;
      try {
        checksumAlgorithmFn = selectChecksumAlgorithmFunction(algorithm, config);
      } catch (error) {
        if (algorithm === ChecksumAlgorithm.CRC64NVME) {
          logger2?.warn(`Skipping ${ChecksumAlgorithm.CRC64NVME} checksum validation: ${error.message}`);
          continue;
        }
        throw error;
      }
      const { base64Encoder } = config;
      if (isStreaming(responseBody)) {
        response.body = createChecksumStream({
          expectedChecksum: checksumFromResponse,
          checksumSourceLocation: responseHeader,
          checksum: new checksumAlgorithmFn(),
          source: responseBody,
          base64Encoder
        });
        return;
      }
      const checksum = await getChecksum(responseBody, { checksumAlgorithmFn, base64Encoder });
      if (checksum === checksumFromResponse) {
        break;
      }
      throw new Error(`Checksum mismatch: expected "${checksum}" but received "${checksumFromResponse}" in response header "${responseHeader}".`);
    }
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/flexibleChecksumsResponseMiddleware.js
var flexibleChecksumsResponseMiddlewareOptions = {
  name: "flexibleChecksumsResponseMiddleware",
  toMiddleware: "deserializerMiddleware",
  relation: "after",
  tags: ["BODY_CHECKSUM"],
  override: true
};
var flexibleChecksumsResponseMiddleware = (config, middlewareConfig) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  const input = args.input;
  const result = await next(args);
  const response = result.response;
  const { requestValidationModeMember, responseAlgorithms } = middlewareConfig;
  if (requestValidationModeMember && input[requestValidationModeMember] === "ENABLED") {
    const { clientName, commandName } = context;
    const customChecksumAlgorithms = Object.keys(config.checksumAlgorithms ?? {}).filter((algorithm) => {
      const responseHeader = getChecksumLocationName(algorithm);
      return response.headers[responseHeader] !== void 0;
    });
    const algoList = getChecksumAlgorithmListForResponse([
      ...responseAlgorithms ?? [],
      ...customChecksumAlgorithms
    ]);
    const isS3WholeObjectMultipartGetResponseChecksum = clientName === "S3Client" && commandName === "GetObjectCommand" && algoList.every((algorithm) => {
      const responseHeader = getChecksumLocationName(algorithm);
      const checksumFromResponse = response.headers[responseHeader];
      return !checksumFromResponse || isChecksumWithPartNumber(checksumFromResponse);
    });
    if (isS3WholeObjectMultipartGetResponseChecksum) {
      return result;
    }
    await validateChecksumFromResponse(response, {
      config,
      responseAlgorithms: algoList,
      logger: context.logger
    });
  }
  return result;
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/getFlexibleChecksumsPlugin.js
var getFlexibleChecksumsPlugin = (config, middlewareConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.add(flexibleChecksumsMiddleware(config, middlewareConfig), flexibleChecksumsMiddlewareOptions);
    clientStack.addRelativeTo(flexibleChecksumsInputMiddleware(config, middlewareConfig), flexibleChecksumsInputMiddlewareOptions);
    clientStack.addRelativeTo(flexibleChecksumsResponseMiddleware(config, middlewareConfig), flexibleChecksumsResponseMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/checksums/dist-es/submodules/flexible-checksums/resolveFlexibleChecksumsConfig.js
var resolveFlexibleChecksumsConfig = (input) => {
  const { requestChecksumCalculation, responseChecksumValidation, requestStreamBufferSize } = input;
  return Object.assign(input, {
    requestChecksumCalculation: normalizeProvider(requestChecksumCalculation ?? DEFAULT_REQUEST_CHECKSUM_CALCULATION),
    responseChecksumValidation: normalizeProvider(responseChecksumValidation ?? DEFAULT_RESPONSE_CHECKSUM_VALIDATION),
    requestStreamBufferSize: Number(requestStreamBufferSize ?? 0),
    checksumAlgorithms: input.checksumAlgorithms ?? {}
  });
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-check-content-length-header/check-content-length-header.js
var CONTENT_LENGTH_HEADER2 = "content-length";
var DECODED_CONTENT_LENGTH_HEADER = "x-amz-decoded-content-length";
function checkContentLengthHeader() {
  return (next, context) => async (args) => {
    const { request } = args;
    if (HttpRequest.isInstance(request)) {
      if (!(CONTENT_LENGTH_HEADER2 in request.headers) && !(DECODED_CONTENT_LENGTH_HEADER in request.headers)) {
        const message = `Are you using a Stream of unknown length as the Body of a PutObject request? Consider using Upload instead from @aws-sdk/lib-storage.`;
        if (typeof context?.logger?.warn === "function" && !(context.logger instanceof NoOpLogger)) {
          context.logger.warn(message);
        } else {
          console.warn(message);
        }
      }
    }
    return next({ ...args });
  };
}
var checkContentLengthHeaderMiddlewareOptions = {
  step: "finalizeRequest",
  tags: ["CHECK_CONTENT_LENGTH_HEADER"],
  name: "getCheckContentLengthHeaderPlugin",
  override: true
};
var getCheckContentLengthHeaderPlugin = (unused) => ({
  applyToStack: (clientStack) => {
    clientStack.add(checkContentLengthHeader(), checkContentLengthHeaderMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-region-redirect/region-redirect-endpoint-middleware.js
var regionRedirectEndpointMiddleware = (config) => {
  return (next, context) => async (args) => {
    const originalRegion = await config.region();
    const regionProviderRef = config.region;
    let unlock = () => {
    };
    if (context.__s3RegionRedirect) {
      Object.defineProperty(config, "region", {
        writable: false,
        value: async () => {
          return context.__s3RegionRedirect;
        }
      });
      unlock = () => Object.defineProperty(config, "region", {
        writable: true,
        value: regionProviderRef
      });
    }
    try {
      const result = await next(args);
      if (context.__s3RegionRedirect) {
        unlock();
        const region = await config.region();
        if (originalRegion !== region) {
          throw new Error("Region was not restored following S3 region redirect.");
        }
      }
      return result;
    } catch (e2) {
      unlock();
      throw e2;
    }
  };
};
var regionRedirectEndpointMiddlewareOptions = {
  tags: ["REGION_REDIRECT", "S3"],
  name: "regionRedirectEndpointMiddleware",
  override: true,
  relation: "before",
  toMiddleware: "endpointV2Middleware"
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-region-redirect/region-redirect-middleware.js
function regionRedirectMiddleware(clientConfig) {
  return (next, context) => async (args) => {
    try {
      return await next(args);
    } catch (err) {
      if (clientConfig.followRegionRedirects) {
        const statusCode = err?.$metadata?.httpStatusCode;
        const isHeadBucket = context.commandName === "HeadBucketCommand";
        const bucketRegionHeader = err?.$response?.headers?.["x-amz-bucket-region"];
        if (bucketRegionHeader) {
          if (statusCode === 301 || statusCode === 400 && (err?.name === "IllegalLocationConstraintException" || isHeadBucket)) {
            try {
              const actualRegion = bucketRegionHeader;
              context.logger?.debug(`Redirecting from ${await clientConfig.region()} to ${actualRegion}`);
              context.__s3RegionRedirect = actualRegion;
            } catch (e2) {
              throw new Error("Region redirect failed: " + e2);
            }
            return next(args);
          }
        }
      }
      throw err;
    }
  };
}
var regionRedirectMiddlewareOptions = {
  step: "initialize",
  tags: ["REGION_REDIRECT", "S3"],
  name: "regionRedirectMiddleware",
  override: true
};
var getRegionRedirectMiddlewarePlugin = (clientConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.add(regionRedirectMiddleware(clientConfig), regionRedirectMiddlewareOptions);
    clientStack.addRelativeTo(regionRedirectEndpointMiddleware(clientConfig), regionRedirectEndpointMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/classes/S3ExpressIdentityCache.js
var S3ExpressIdentityCache = class _S3ExpressIdentityCache {
  data;
  lastPurgeTime = Date.now();
  static EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS = 3e4;
  constructor(data = {}) {
    this.data = data;
  }
  get(key) {
    const entry = this.data[key];
    if (!entry) {
      return;
    }
    return entry;
  }
  set(key, entry) {
    this.data[key] = entry;
    return entry;
  }
  delete(key) {
    delete this.data[key];
  }
  async purgeExpired() {
    const now = Date.now();
    if (this.lastPurgeTime + _S3ExpressIdentityCache.EXPIRED_CREDENTIAL_PURGE_INTERVAL_MS > now) {
      return;
    }
    for (const key in this.data) {
      const entry = this.data[key];
      if (!entry.isRefreshing) {
        const credential = await entry.identity;
        if (credential.expiration) {
          if (credential.expiration.getTime() < now) {
            delete this.data[key];
          }
        }
      }
    }
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/classes/S3ExpressIdentityCacheEntry.js
var S3ExpressIdentityCacheEntry = class {
  _identity;
  isRefreshing;
  accessed;
  constructor(_identity, isRefreshing = false, accessed = Date.now()) {
    this._identity = _identity;
    this.isRefreshing = isRefreshing;
    this.accessed = accessed;
  }
  get identity() {
    this.accessed = Date.now();
    return this._identity;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/classes/S3ExpressIdentityProviderImpl.js
var S3ExpressIdentityProviderImpl = class _S3ExpressIdentityProviderImpl {
  createSessionFn;
  cache;
  static REFRESH_WINDOW_MS = 6e4;
  constructor(createSessionFn, cache2 = new S3ExpressIdentityCache()) {
    this.createSessionFn = createSessionFn;
    this.cache = cache2;
  }
  async getS3ExpressIdentity(awsIdentity, identityProperties) {
    const key = identityProperties.Bucket;
    const { cache: cache2 } = this;
    const entry = cache2.get(key);
    if (entry) {
      return entry.identity.then((identity) => {
        const isExpired = (identity.expiration?.getTime() ?? 0) < Date.now();
        if (isExpired) {
          return cache2.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
        }
        const isExpiringSoon = (identity.expiration?.getTime() ?? 0) < Date.now() + _S3ExpressIdentityProviderImpl.REFRESH_WINDOW_MS;
        if (isExpiringSoon && !entry.isRefreshing) {
          entry.isRefreshing = true;
          this.getIdentity(key).then((id) => {
            cache2.set(key, new S3ExpressIdentityCacheEntry(Promise.resolve(id)));
          });
        }
        return identity;
      });
    }
    return cache2.set(key, new S3ExpressIdentityCacheEntry(this.getIdentity(key))).identity;
  }
  async getIdentity(key) {
    await this.cache.purgeExpired().catch((error) => {
      console.warn("Error while clearing expired entries in S3ExpressIdentityCache: \n" + error);
    });
    const session = await this.createSessionFn(key);
    if (!session.Credentials?.AccessKeyId || !session.Credentials?.SecretAccessKey) {
      throw new Error("s3#createSession response credential missing AccessKeyId or SecretAccessKey.");
    }
    const identity = {
      accessKeyId: session.Credentials.AccessKeyId,
      secretAccessKey: session.Credentials.SecretAccessKey,
      sessionToken: session.Credentials.SessionToken,
      expiration: session.Credentials.Expiration ? new Date(session.Credentials.Expiration) : void 0
    };
    return identity;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-configuration/s3Configuration.js
var resolveS3Config = (input, { session }) => {
  const [s3ClientProvider, CreateSessionCommandCtor] = session;
  const { forcePathStyle, useAccelerateEndpoint, disableMultiregionAccessPoints, followRegionRedirects, s3ExpressIdentityProvider, bucketEndpoint, expectContinueHeader } = input;
  return Object.assign(input, {
    forcePathStyle: forcePathStyle ?? false,
    useAccelerateEndpoint: useAccelerateEndpoint ?? false,
    disableMultiregionAccessPoints: disableMultiregionAccessPoints ?? false,
    followRegionRedirects: followRegionRedirects ?? false,
    s3ExpressIdentityProvider: s3ExpressIdentityProvider ?? new S3ExpressIdentityProviderImpl(async (key) => s3ClientProvider().send(new CreateSessionCommandCtor({
      Bucket: key
    }))),
    bucketEndpoint: bucketEndpoint ?? false,
    expectContinueHeader: expectContinueHeader ?? 2097152
  });
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-expires/s3-expires-middleware.js
init_index_browser2();
var s3ExpiresMiddleware = (config) => {
  return (next, context) => async (args) => {
    const result = await next(args);
    const { response } = result;
    if (HttpResponse.isInstance(response)) {
      if (response.headers.expires) {
        response.headers.expiresstring = response.headers.expires;
        try {
          parseRfc7231DateTime(response.headers.expires);
        } catch (e2) {
          context.logger?.warn(`AWS SDK Warning for ${context.clientName}::${context.commandName} response parsing (${response.headers.expires}): ${e2}`);
          delete response.headers.expires;
        }
      }
    }
    return result;
  };
};
var s3ExpiresMiddlewareOptions = {
  tags: ["S3"],
  name: "s3ExpiresMiddleware",
  override: true,
  relation: "after",
  toMiddleware: "deserializerMiddleware"
};
var getS3ExpiresMiddlewarePlugin = (clientConfig) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(s3ExpiresMiddleware(clientConfig), s3ExpiresMiddlewareOptions);
  }
});

// node_modules/@smithy/signature-v4/dist-es/SignatureV4.js
init_index_browser2();

// node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js
init_index_browser2();
init_index_browser2();
var HeaderFormatter = class {
  format(headers) {
    const chunks = [];
    for (const headerName in headers) {
      if (!hasOwn(headers, headerName))
        continue;
      const bytes2 = fromUtf8(headerName);
      chunks.push(Uint8Array.from([bytes2.byteLength]), bytes2, this.formatHeaderValue(headers[headerName]));
    }
    const out = new Uint8Array(chunks.reduce((carry, bytes2) => carry + bytes2.byteLength, 0));
    let position = 0;
    for (const chunk of chunks) {
      out.set(chunk, position);
      position += chunk.byteLength;
    }
    return out;
  }
  formatHeaderValue(header) {
    switch (header.type) {
      case "boolean":
        return Uint8Array.from([header.value ? 0 : 1]);
      case "byte":
        return Uint8Array.from([2, header.value]);
      case "short":
        const shortView = new DataView(new ArrayBuffer(3));
        shortView.setUint8(0, 3);
        shortView.setInt16(1, header.value, false);
        return new Uint8Array(shortView.buffer);
      case "integer":
        const intView = new DataView(new ArrayBuffer(5));
        intView.setUint8(0, 4);
        intView.setInt32(1, header.value, false);
        return new Uint8Array(intView.buffer);
      case "long":
        const longBytes = new Uint8Array(9);
        longBytes[0] = 5;
        longBytes.set(header.value.bytes, 1);
        return longBytes;
      case "binary":
        const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
        binView.setUint8(0, 6);
        binView.setUint16(1, header.value.byteLength, false);
        const binBytes = new Uint8Array(binView.buffer);
        binBytes.set(header.value, 3);
        return binBytes;
      case "string":
        const utf8Bytes = fromUtf8(header.value);
        const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
        strView.setUint8(0, 7);
        strView.setUint16(1, utf8Bytes.byteLength, false);
        const strBytes = new Uint8Array(strView.buffer);
        strBytes.set(utf8Bytes, 3);
        return strBytes;
      case "timestamp":
        const tsBytes = new Uint8Array(9);
        tsBytes[0] = 8;
        tsBytes.set(Int642.fromNumber(header.value.valueOf()).bytes, 1);
        return tsBytes;
      case "uuid":
        if (!UUID_PATTERN2.test(header.value)) {
          throw new Error(`Invalid UUID received: ${header.value}`);
        }
        const uuidBytes = new Uint8Array(17);
        uuidBytes[0] = 9;
        uuidBytes.set(fromHex(header.value.replace(/-/g, "")), 1);
        return uuidBytes;
    }
  }
};
var HEADER_VALUE_TYPE2;
(function(HEADER_VALUE_TYPE3) {
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolTrue"] = 0] = "boolTrue";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["boolFalse"] = 1] = "boolFalse";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byte"] = 2] = "byte";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["short"] = 3] = "short";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["integer"] = 4] = "integer";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["long"] = 5] = "long";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["byteArray"] = 6] = "byteArray";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["string"] = 7] = "string";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["timestamp"] = 8] = "timestamp";
  HEADER_VALUE_TYPE3[HEADER_VALUE_TYPE3["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE2 || (HEADER_VALUE_TYPE2 = {}));
var UUID_PATTERN2 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
var Int642 = class _Int64 {
  bytes;
  constructor(bytes2) {
    this.bytes = bytes2;
    if (bytes2.byteLength !== 8) {
      throw new Error("Int64 buffers must be exactly 8 bytes");
    }
  }
  static fromNumber(number) {
    if (number > 9223372036854776e3 || number < -9223372036854776e3) {
      throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
    }
    const bytes2 = new Uint8Array(8);
    for (let i2 = 7, remaining = Math.abs(Math.round(number)); i2 > -1 && remaining > 0; i2--, remaining /= 256) {
      bytes2[i2] = remaining;
    }
    if (number < 0) {
      negate2(bytes2);
    }
    return new _Int64(bytes2);
  }
  valueOf() {
    const bytes2 = this.bytes.slice(0);
    const negative = bytes2[0] & 128;
    if (negative) {
      negate2(bytes2);
    }
    return parseInt(toHex(bytes2), 16) * (negative ? -1 : 1);
  }
  toString() {
    return String(this.valueOf());
  }
};
function negate2(bytes2) {
  for (let i2 = 0; i2 < 8; i2++) {
    bytes2[i2] ^= 255;
  }
  for (let i2 = 7; i2 > -1; i2--) {
    bytes2[i2]++;
    if (bytes2[i2] !== 0)
      break;
  }
}

// node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js
init_index_browser2();

// node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js
init_index_browser2();

// node_modules/@smithy/signature-v4/dist-es/constants.js
var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
var AUTH_HEADER = "authorization";
var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
var DATE_HEADER = "date";
var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
var SHA256_HEADER = "x-amz-content-sha256";
var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
var ALWAYS_UNSIGNABLE_HEADERS = {
  authorization: true,
  "cache-control": true,
  connection: true,
  expect: true,
  from: true,
  "keep-alive": true,
  "max-forwards": true,
  pragma: true,
  referer: true,
  te: true,
  trailer: true,
  "transfer-encoding": true,
  upgrade: true,
  "user-agent": true,
  "x-amzn-trace-id": true
};
var PROXY_HEADER_PATTERN = /^proxy-/;
var SEC_HEADER_PATTERN = /^sec-/;
var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var MAX_CACHE_SIZE = 50;
var KEY_TYPE_IDENTIFIER = "aws4_request";
var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;

// node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js
var getCanonicalQuery = ({ query = {} }) => {
  const keys = [];
  const serialized = {};
  for (const key in query) {
    if (!hasOwn(query, key))
      continue;
    if (key.toLowerCase() === SIGNATURE_HEADER) {
      continue;
    }
    const encodedKey = escapeUri(key);
    keys.push(encodedKey);
    const value = query[key];
    if (typeof value === "string") {
      serialized[encodedKey] = `${encodedKey}=${escapeUri(value)}`;
    } else if (Array.isArray(value)) {
      serialized[encodedKey] = value.slice(0).reduce((encoded, value2) => encoded.concat([`${encodedKey}=${escapeUri(value2)}`]), []).sort().join("&");
    }
  }
  return keys.sort().map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
};

// node_modules/@smithy/signature-v4/dist-es/utilDate.js
var iso8601 = (time2) => toDate(time2).toISOString().replace(/\.\d{3}Z$/, "Z");
var toDate = (time2) => {
  if (typeof time2 === "number") {
    return new Date(time2 * 1e3);
  }
  if (typeof time2 === "string") {
    if (Number(time2)) {
      return new Date(Number(time2) * 1e3);
    }
    return new Date(time2);
  }
  return time2;
};

// node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js
var SignatureV4Base = class {
  service;
  regionProvider;
  credentialProvider;
  sha256;
  uriEscapePath;
  applyChecksum;
  constructor({ applyChecksum, credentials, region, service, sha256: sha2562, uriEscapePath = true }) {
    this.service = service;
    this.sha256 = sha2562;
    this.uriEscapePath = uriEscapePath;
    this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
    this.regionProvider = normalizeProvider(region);
    this.credentialProvider = normalizeProvider(credentials);
  }
  createCanonicalRequest(request, canonicalHeaders, payloadHash) {
    const sortedHeaders = Object.keys(canonicalHeaders).sort();
    return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
  }
  async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
    const hash = new this.sha256();
    hash.update(toUint8Array(canonicalRequest));
    const hashedRequest = await hash.digest();
    return `${algorithmIdentifier}
${longDate}
${credentialScope}
${toHex(hashedRequest)}`;
  }
  getCanonicalPath({ path }) {
    if (this.uriEscapePath) {
      const normalizedPathSegments = [];
      for (const pathSegment of path.split("/")) {
        if (pathSegment?.length === 0)
          continue;
        if (pathSegment === ".")
          continue;
        if (pathSegment === "..") {
          normalizedPathSegments.pop();
        } else {
          normalizedPathSegments.push(pathSegment);
        }
      }
      const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
      const doubleEncoded = escapeUri(normalizedPath);
      return doubleEncoded.replace(/%2F/g, "/");
    }
    return path;
  }
  validateResolvedCredentials(credentials) {
    if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") {
      throw new Error("Resolved credential object is not valid");
    }
  }
  formatDate(now) {
    const longDate = iso8601(now).replace(/[-:]/g, "");
    return {
      longDate,
      shortDate: longDate.slice(0, 8)
    };
  }
  getCanonicalHeaderList(headers) {
    return Object.keys(headers).sort().join(";");
  }
};

// node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js
init_index_browser2();
var signingKeyCache = {};
var cacheQueue = [];
var createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
var getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
  const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
  const cacheKey = `${shortDate}:${region}:${service}:${toHex(credsHash)}:${credentials.sessionToken}`;
  if (cacheKey in signingKeyCache) {
    return signingKeyCache[cacheKey];
  }
  cacheQueue.push(cacheKey);
  while (cacheQueue.length > MAX_CACHE_SIZE) {
    delete signingKeyCache[cacheQueue.shift()];
  }
  let key = `AWS4${credentials.secretAccessKey}`;
  for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
    key = await hmac(sha256Constructor, key, signable);
  }
  return signingKeyCache[cacheKey] = key;
};
var hmac = (ctor, secret, data) => {
  const hash = new ctor(secret);
  hash.update(toUint8Array(data));
  return hash.digest();
};

// node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js
var getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
  const canonical = {};
  for (const headerName of Object.keys(headers).sort()) {
    if (headers[headerName] == void 0) {
      continue;
    }
    const canonicalHeaderName = headerName.toLowerCase();
    if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || unsignableHeaders?.has(canonicalHeaderName) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
      if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
        continue;
      }
    }
    canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
  }
  return canonical;
};

// node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js
init_index_browser2();
init_index_browser2();
var getPayloadHash = async ({ headers, body }, hashConstructor) => {
  for (const headerName in headers) {
    if (!hasOwn(headers, headerName))
      continue;
    if (headerName.toLowerCase() === SHA256_HEADER) {
      return headers[headerName];
    }
  }
  if (body == void 0) {
    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  } else if (typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
    const hashCtor = new hashConstructor();
    hashCtor.update(toUint8Array(body));
    return toHex(await hashCtor.digest());
  }
  return UNSIGNED_PAYLOAD;
};

// node_modules/@smithy/signature-v4/dist-es/headerUtil.js
init_index_browser2();
var hasHeader2 = (soughtHeader, headers) => {
  soughtHeader = soughtHeader.toLowerCase();
  for (const headerName in headers) {
    if (!hasOwn(headers, headerName))
      continue;
    if (soughtHeader === headerName.toLowerCase()) {
      return true;
    }
  }
  return false;
};

// node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js
init_index_browser2();
var moveHeadersToQuery = (request, options = {}) => {
  const { headers, query = {} } = HttpRequest.clone(request);
  for (const name in headers) {
    if (!hasOwn(headers, name))
      continue;
    const lname = name.toLowerCase();
    if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
      query[name] = headers[name];
      delete headers[name];
    }
  }
  return {
    ...request,
    headers,
    query
  };
};

// node_modules/@smithy/signature-v4/dist-es/prepareRequest.js
init_index_browser2();
var prepareRequest = (request) => {
  request = HttpRequest.clone(request);
  for (const headerName in request.headers) {
    if (!hasOwn(request.headers, headerName))
      continue;
    if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
      delete request.headers[headerName];
    }
  }
  return request;
};

// node_modules/@smithy/signature-v4/dist-es/SignatureV4.js
var SignatureV4 = class extends SignatureV4Base {
  headerFormatter = new HeaderFormatter();
  constructor({ applyChecksum, credentials, region, service, sha256: sha2562, uriEscapePath = true }) {
    super({
      applyChecksum,
      credentials,
      region,
      service,
      sha256: sha2562,
      uriEscapePath
    });
  }
  async presign(originalRequest, options = {}) {
    const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
    const credentials = await this.credentialProvider();
    this.validateResolvedCredentials(credentials);
    const region = signingRegion ?? await this.regionProvider();
    const { longDate, shortDate } = this.formatDate(signingDate);
    if (expiresIn > MAX_PRESIGNED_TTL) {
      return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
    }
    const scope = createScope(shortDate, region, signingService ?? this.service);
    const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders, hoistableHeaders });
    if (credentials.sessionToken) {
      request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
    }
    request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
    request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
    request.query[AMZ_DATE_QUERY_PARAM] = longDate;
    request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
    const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
    request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
    request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
    return request;
  }
  async sign(toSign, options) {
    if (typeof toSign === "string") {
      return this.signString(toSign, options);
    } else if (toSign.headers && toSign.payload) {
      return this.signEvent(toSign, options);
    } else if (toSign.message) {
      return this.signMessage(toSign, options);
    } else {
      return this.signRequest(toSign, options);
    }
  }
  async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService, eventStreamCredentials }) {
    const region = signingRegion ?? await this.regionProvider();
    const { shortDate, longDate } = this.formatDate(signingDate);
    const scope = createScope(shortDate, region, signingService ?? this.service);
    const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
    const hash = new this.sha256();
    hash.update(headers);
    const hashedHeaders = toHex(await hash.digest());
    const stringToSign = [
      EVENT_ALGORITHM_IDENTIFIER,
      longDate,
      scope,
      priorSignature,
      hashedHeaders,
      hashedPayload
    ].join("\n");
    return this.signString(stringToSign, {
      signingDate,
      signingRegion: region,
      signingService,
      eventStreamCredentials
    });
  }
  async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials }) {
    const promise = this.signEvent({
      headers: this.headerFormatter.format(signableMessage.message.headers),
      payload: signableMessage.message.body
    }, {
      signingDate,
      signingRegion,
      signingService,
      priorSignature: signableMessage.priorSignature,
      eventStreamCredentials
    });
    return promise.then((signature) => {
      return { message: signableMessage.message, signature };
    });
  }
  async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, eventStreamCredentials } = {}) {
    const credentials = eventStreamCredentials ?? await this.credentialProvider();
    this.validateResolvedCredentials(credentials);
    const region = signingRegion ?? await this.regionProvider();
    const { shortDate } = this.formatDate(signingDate);
    const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
    hash.update(toUint8Array(stringToSign));
    return toHex(await hash.digest());
  }
  async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
    const credentials = await this.credentialProvider();
    this.validateResolvedCredentials(credentials);
    const region = signingRegion ?? await this.regionProvider();
    const request = prepareRequest(requestToSign);
    const { longDate, shortDate } = this.formatDate(signingDate);
    const scope = createScope(shortDate, region, signingService ?? this.service);
    request.headers[AMZ_DATE_HEADER] = longDate;
    if (credentials.sessionToken) {
      request.headers[TOKEN_HEADER] = credentials.sessionToken;
    }
    const payloadHash = await getPayloadHash(request, this.sha256);
    if (!hasHeader2(SHA256_HEADER, request.headers) && this.applyChecksum) {
      request.headers[SHA256_HEADER] = payloadHash;
    }
    const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
    const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
    request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
    return request;
  }
  async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
    const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
    const hash = new this.sha256(await keyPromise);
    hash.update(toUint8Array(stringToSign));
    return toHex(await hash.digest());
  }
  getSigningKey(credentials, region, shortDate, service) {
    return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
  }
};

// node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js
var signatureV4aContainer = {
  SignatureV4a: null
};

// node_modules/@aws-sdk/signature-v4-multi-region/dist-es/signature-v4-crt-container.js
var signatureV4CrtContainer = {
  CrtSignerV4: null
};

// node_modules/@aws-sdk/signature-v4-multi-region/dist-es/SignatureV4SignWithCredentials.js
var SESSION_TOKEN_QUERY_PARAM = "X-Amz-S3session-Token";
var SESSION_TOKEN_HEADER = SESSION_TOKEN_QUERY_PARAM.toLowerCase();
var SignatureV4SignWithCredentials = class extends SignatureV4 {
  async signWithCredentials(requestToSign, credentials, options) {
    const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
    requestToSign.headers[SESSION_TOKEN_HEADER] = credentials.sessionToken;
    const privateAccess = this;
    setSingleOverride(privateAccess, credentialsWithoutSessionToken);
    return privateAccess.signRequest(requestToSign, options ?? {});
  }
  async presignWithCredentials(requestToSign, credentials, options) {
    const credentialsWithoutSessionToken = getCredentialsWithoutSessionToken(credentials);
    delete requestToSign.headers[SESSION_TOKEN_HEADER];
    requestToSign.headers[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
    requestToSign.query = requestToSign.query ?? {};
    requestToSign.query[SESSION_TOKEN_QUERY_PARAM] = credentials.sessionToken;
    const privateAccess = this;
    setSingleOverride(privateAccess, credentialsWithoutSessionToken);
    return this.presign(requestToSign, options);
  }
};
function getCredentialsWithoutSessionToken(credentials) {
  return {
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    expiration: credentials.expiration
  };
}
function setSingleOverride(privateAccess, credentialsWithoutSessionToken) {
  const currentCredentialProvider = privateAccess.credentialProvider;
  privateAccess.credentialProvider = () => {
    privateAccess.credentialProvider = currentCredentialProvider;
    return Promise.resolve(credentialsWithoutSessionToken);
  };
}

// node_modules/@aws-sdk/signature-v4-multi-region/dist-es/SignatureV4MultiRegion.js
var SignatureV4MultiRegion = class {
  sigv4aSigner;
  sigv4Signer;
  signerOptions;
  static sigv4aDependency() {
    if (typeof signatureV4CrtContainer.CrtSignerV4 === "function") {
      return "crt";
    } else if (typeof signatureV4aContainer.SignatureV4a === "function") {
      return "js";
    }
    return "none";
  }
  constructor(options) {
    this.sigv4Signer = new SignatureV4SignWithCredentials(options);
    this.signerOptions = options;
  }
  async sign(requestToSign, options = {}) {
    if (options.signingRegion === "*") {
      return this.getSigv4aSigner().sign(requestToSign, options);
    }
    return this.sigv4Signer.sign(requestToSign, options);
  }
  async signWithCredentials(requestToSign, credentials, options = {}) {
    if (options.signingRegion === "*") {
      const signer = this.getSigv4aSigner();
      const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
      if (CrtSignerV4 && signer instanceof CrtSignerV4) {
        return signer.signWithCredentials(requestToSign, credentials, options);
      } else {
        throw new Error(`signWithCredentials with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`);
      }
    }
    return this.sigv4Signer.signWithCredentials(requestToSign, credentials, options);
  }
  async presign(originalRequest, options = {}) {
    if (options.signingRegion === "*") {
      const signer = this.getSigv4aSigner();
      const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
      if (CrtSignerV4 && signer instanceof CrtSignerV4) {
        return signer.presign(originalRequest, options);
      } else {
        throw new Error(`presign with signingRegion '*' is only supported when using the CRT dependency @aws-sdk/signature-v4-crt. Please check whether you have installed the "@aws-sdk/signature-v4-crt" package explicitly. You must also register the package by calling [require("@aws-sdk/signature-v4-crt");] or an ESM equivalent such as [import "@aws-sdk/signature-v4-crt";]. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt`);
      }
    }
    return this.sigv4Signer.presign(originalRequest, options);
  }
  async presignWithCredentials(originalRequest, credentials, options = {}) {
    if (options.signingRegion === "*") {
      throw new Error("Method presignWithCredentials is not supported for [signingRegion=*].");
    }
    return this.sigv4Signer.presignWithCredentials(originalRequest, credentials, options);
  }
  getSigv4aSigner() {
    if (!this.sigv4aSigner) {
      const CrtSignerV4 = signatureV4CrtContainer.CrtSignerV4;
      const JsSigV4aSigner = signatureV4aContainer.SignatureV4a;
      if (this.signerOptions.runtime === "node") {
        if (!CrtSignerV4 && !JsSigV4aSigner) {
          throw new Error("Neither CRT nor JS SigV4a implementation is available. Please load either @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a. For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
        }
        if (CrtSignerV4 && typeof CrtSignerV4 === "function") {
          this.sigv4aSigner = new CrtSignerV4({
            ...this.signerOptions,
            signingAlgorithm: 1
          });
        } else if (JsSigV4aSigner && typeof JsSigV4aSigner === "function") {
          this.sigv4aSigner = new JsSigV4aSigner({
            ...this.signerOptions
          });
        } else {
          throw new Error("Available SigV4a implementation is not a valid constructor. Please ensure you've properly imported @aws-sdk/signature-v4-crt or @aws-sdk/signature-v4a.For more information please go to https://github.com/aws/aws-sdk-js-v3#functionality-requiring-aws-common-runtime-crt");
        }
      } else {
        if (!JsSigV4aSigner || typeof JsSigV4aSigner !== "function") {
          throw new Error("JS SigV4a implementation is not available or not a valid constructor. Please check whether you have installed the @aws-sdk/signature-v4a package explicitly. The CRT implementation is not available for browsers. You must also register the package by calling [require('@aws-sdk/signature-v4a');] or an ESM equivalent such as [import '@aws-sdk/signature-v4a';]. For more information please go to https://github.com/aws/aws-sdk-js-v3#using-javascript-non-crt-implementation-of-sigv4a");
        }
        this.sigv4aSigner = new JsSigV4aSigner({
          ...this.signerOptions
        });
      }
    }
    return this.sigv4aSigner;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/constants.js
var S3_EXPRESS_BUCKET_TYPE = "Directory";
var S3_EXPRESS_BACKEND = "S3Express";
var S3_EXPRESS_AUTH_SCHEME = "sigv4-s3express";
var SESSION_TOKEN_QUERY_PARAM2 = "X-Amz-S3session-Token";
var SESSION_TOKEN_HEADER2 = SESSION_TOKEN_QUERY_PARAM2.toLowerCase();

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/functions/s3ExpressMiddleware.js
var s3ExpressMiddleware = (options) => {
  return (next, context) => async (args) => {
    if (context.endpointV2) {
      const endpoint = context.endpointV2;
      const isS3ExpressAuth = endpoint.properties?.authSchemes?.[0]?.name === S3_EXPRESS_AUTH_SCHEME;
      const isS3ExpressBucket = endpoint.properties?.backend === S3_EXPRESS_BACKEND || endpoint.properties?.bucketType === S3_EXPRESS_BUCKET_TYPE;
      if (isS3ExpressBucket) {
        setFeature2(context, "S3_EXPRESS_BUCKET", "J");
        context.isS3ExpressBucket = true;
      }
      if (isS3ExpressAuth) {
        const requestBucket = args.input.Bucket;
        if (requestBucket) {
          const s3ExpressIdentity = await options.s3ExpressIdentityProvider.getS3ExpressIdentity(await options.credentials(), {
            Bucket: requestBucket
          });
          context.s3ExpressIdentity = s3ExpressIdentity;
          if (HttpRequest.isInstance(args.request) && s3ExpressIdentity.sessionToken) {
            args.request.headers[SESSION_TOKEN_HEADER2] = s3ExpressIdentity.sessionToken;
          }
        }
      }
    }
    return next(args);
  };
};
var s3ExpressMiddlewareOptions = {
  name: "s3ExpressMiddleware",
  step: "build",
  tags: ["S3", "S3_EXPRESS"],
  override: true
};
var getS3ExpressPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(s3ExpressMiddleware(options), s3ExpressMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/functions/signS3Express.js
var signS3Express = async (s3ExpressIdentity, signingOptions, request, sigV4MultiRegionSigner) => {
  const signedRequest = await sigV4MultiRegionSigner.signWithCredentials(request, s3ExpressIdentity, {});
  if (signedRequest.headers["X-Amz-Security-Token"] || signedRequest.headers["x-amz-security-token"]) {
    throw new Error("X-Amz-Security-Token must not be set for s3-express requests.");
  }
  return signedRequest;
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-s3-express/functions/s3ExpressHttpSigningMiddleware.js
var defaultErrorHandler2 = (signingProperties) => (error) => {
  throw error;
};
var defaultSuccessHandler2 = (httpResponse, signingProperties) => {
};
var s3ExpressHttpSigningMiddleware = (config) => (next, context) => async (args) => {
  if (!HttpRequest.isInstance(args.request)) {
    return next(args);
  }
  const smithyContext = getSmithyContext(context);
  const scheme = smithyContext.selectedHttpAuthScheme;
  if (!scheme) {
    throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
  }
  const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
  let request;
  if (context.s3ExpressIdentity) {
    request = await signS3Express(context.s3ExpressIdentity, signingProperties, args.request, await config.signer());
  } else {
    request = await signer.sign(args.request, identity, signingProperties);
  }
  const output = await next({
    ...args,
    request
  }).catch((signer.errorHandler || defaultErrorHandler2)(signingProperties));
  (signer.successHandler || defaultSuccessHandler2)(output.response, signingProperties);
  return output;
};
var getS3ExpressHttpSigningPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(s3ExpressHttpSigningMiddleware(config), httpSigningMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/to-stream/toStream.browser.js
function toStream(bytes2) {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(bytes2);
      controller.close();
    }
  });
}

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-throw-200-exceptions/throw-200-exceptions.js
var THROW_IF_EMPTY_BODY = {
  CopyObjectCommand: true,
  UploadPartCopyCommand: true,
  CompleteMultipartUploadCommand: true
};
var throw200ExceptionsMiddleware = (config) => (next, context) => async (args) => {
  const result = await next(args);
  const { response } = result;
  if (!HttpResponse.isInstance(response)) {
    return result;
  }
  const { statusCode, body } = response;
  if (statusCode < 200 || statusCode >= 300) {
    return result;
  }
  const bodyBytes = await collectBody2(body, config);
  response.body = toStream(bodyBytes);
  if (bodyBytes.length === 0 && THROW_IF_EMPTY_BODY[context.commandName]) {
    const err = new Error("S3 aborted request");
    err.$metadata = {
      httpStatusCode: 503
    };
    err.name = "InternalError";
    throw err;
  }
  const bodyStringTail = config.utf8Encoder(bodyBytes.subarray(bodyBytes.length - 16));
  if (bodyStringTail && bodyStringTail.endsWith("</Error>")) {
    response.statusCode = 503;
  }
  return result;
};
var collectBody2 = (streamBody = new Uint8Array(), context) => {
  if (streamBody instanceof Uint8Array) {
    return Promise.resolve(streamBody);
  }
  return context.streamCollector(streamBody) || Promise.resolve(new Uint8Array());
};
var throw200ExceptionsMiddlewareOptions = {
  relation: "after",
  toMiddleware: "deserializerMiddleware",
  tags: ["THROW_200_EXCEPTIONS", "S3"],
  name: "throw200ExceptionsMiddleware",
  override: true
};
var getThrow200ExceptionsPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(throw200ExceptionsMiddleware(config), throw200ExceptionsMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/util/util-arn-parser/arn.js
var validate = (str) => typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-region-redirect/bucket-endpoint-middleware.js
function bucketEndpointMiddleware(options) {
  return (next, context) => async (args) => {
    if (options.bucketEndpoint) {
      const endpoint = context.endpointV2;
      if (endpoint) {
        const bucket = args.input.Bucket;
        if (typeof bucket === "string") {
          try {
            const bucketEndpointUrl = new URL(bucket);
            context.endpointV2 = {
              ...endpoint,
              url: bucketEndpointUrl
            };
          } catch (e2) {
            const warning = `@aws-sdk/middleware-sdk-s3: bucketEndpoint=true was set but Bucket=${bucket} could not be parsed as URL.`;
            if (context.logger?.constructor?.name === "NoOpLogger") {
              console.warn(warning);
            } else {
              context.logger?.warn?.(warning);
            }
            throw e2;
          }
        }
      }
    }
    return next(args);
  };
}
var bucketEndpointMiddlewareOptions = {
  name: "bucketEndpointMiddleware",
  override: true,
  relation: "after",
  toMiddleware: "endpointV2Middleware"
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-validate-bucket-name/validate-bucket-name.js
function validateBucketNameMiddleware({ bucketEndpoint }) {
  return (next) => async (args) => {
    const { input: { Bucket } } = args;
    if (!bucketEndpoint && typeof Bucket === "string" && !validate(Bucket) && Bucket.indexOf("/") >= 0) {
      const err = new Error(`Bucket name shouldn't contain '/', received '${Bucket}'`);
      err.name = "InvalidBucketName";
      throw err;
    }
    return next({ ...args });
  };
}
var validateBucketNameMiddlewareOptions = {
  step: "initialize",
  tags: ["VALIDATE_BUCKET_NAME"],
  name: "validateBucketNameMiddleware",
  override: true
};
var getValidateBucketNamePlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(validateBucketNameMiddleware(options), validateBucketNameMiddlewareOptions);
    clientStack.addRelativeTo(bucketEndpointMiddleware(options), bucketEndpointMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/ProtocolLib.js
init_schema();
var ProtocolLib = class {
  queryCompat;
  errorRegistry;
  constructor(queryCompat = false) {
    this.queryCompat = queryCompat;
  }
  resolveRestContentType(defaultContentType, inputSchema) {
    const members = inputSchema.getMemberSchemas();
    const httpPayloadMember = Object.values(members).find((m2) => {
      return !!m2.getMergedTraits().httpPayload;
    });
    if (httpPayloadMember) {
      const mediaType = httpPayloadMember.getMergedTraits().mediaType;
      if (mediaType) {
        return mediaType;
      } else if (httpPayloadMember.isStringSchema()) {
        return "text/plain";
      } else if (httpPayloadMember.isBlobSchema()) {
        return "application/octet-stream";
      } else {
        return defaultContentType;
      }
    } else if (!inputSchema.isUnitSchema()) {
      const hasBody = Object.values(members).find((m2) => {
        const { httpQuery, httpQueryParams, httpHeader, httpLabel, httpPrefixHeaders } = m2.getMergedTraits();
        const noPrefixHeaders = httpPrefixHeaders === void 0;
        return !httpQuery && !httpQueryParams && !httpHeader && !httpLabel && noPrefixHeaders;
      });
      if (hasBody) {
        return defaultContentType;
      }
    }
  }
  async getErrorSchemaOrThrowBaseException(errorIdentifier, defaultNamespace, response, dataObject, metadata, getErrorSchema) {
    let errorName = errorIdentifier;
    if (errorIdentifier.includes("#")) {
      [, errorName] = errorIdentifier.split("#");
    }
    const errorMetadata = {
      $metadata: metadata,
      $fault: response.statusCode < 500 ? "client" : "server"
    };
    if (!this.errorRegistry) {
      throw new Error("@aws-sdk/core/protocols - error handler not initialized.");
    }
    try {
      const errorSchema = getErrorSchema?.(this.errorRegistry, errorName) ?? this.errorRegistry.getSchema(errorIdentifier);
      return { errorSchema, errorMetadata };
    } catch (e2) {
      dataObject.message = dataObject.message ?? dataObject.Message ?? "UnknownError";
      const synthetic = this.errorRegistry;
      const baseExceptionSchema = synthetic.getBaseException();
      if (baseExceptionSchema) {
        const ErrorCtor = synthetic.getErrorCtor(baseExceptionSchema) ?? Error;
        throw this.decorateServiceException(Object.assign(new ErrorCtor({ name: errorName }), errorMetadata), dataObject);
      }
      const d2 = dataObject;
      const message = d2?.message ?? d2?.Message ?? d2?.Error?.Message ?? d2?.Error?.message;
      throw this.decorateServiceException(Object.assign(new Error(message), {
        name: errorName
      }, errorMetadata), dataObject);
    }
  }
  compose(composite, errorIdentifier, defaultNamespace) {
    let namespace = defaultNamespace;
    if (errorIdentifier.includes("#")) {
      [namespace] = errorIdentifier.split("#");
    }
    const staticRegistry = TypeRegistry.for(namespace);
    const defaultSyntheticRegistry = TypeRegistry.for("smithy.ts.sdk.synthetic." + defaultNamespace);
    composite.copyFrom(staticRegistry);
    composite.copyFrom(defaultSyntheticRegistry);
    this.errorRegistry = composite;
  }
  decorateServiceException(exception, additions = {}) {
    if (this.queryCompat) {
      const msg = exception.Message ?? additions.Message;
      const error = decorateServiceException(exception, additions);
      if (msg) {
        error.message = msg;
      }
      const errorObj = error.Error ?? {};
      errorObj.Type = error.Error?.Type;
      errorObj.Code = error.Error?.Code;
      errorObj.Message = error.Error?.message ?? error.Error?.Message ?? msg;
      error.Error = errorObj;
      const reqId = error.$metadata.requestId;
      if (reqId) {
        error.RequestId = reqId;
      }
      return error;
    }
    return decorateServiceException(exception, additions);
  }
  setQueryCompatError(output, response) {
    const queryErrorHeader = response.headers?.["x-amzn-query-error"];
    if (output !== void 0 && queryErrorHeader != null) {
      const [Code, Type] = queryErrorHeader.split(";");
      const keys = Object.keys(output);
      const Error2 = {
        Code,
        Type
      };
      output.Code = Code;
      output.Type = Type;
      for (let i2 = 0; i2 < keys.length; i2++) {
        const k2 = keys[i2];
        Error2[k2 === "message" ? "Message" : k2] = output[k2];
      }
      delete Error2.__type;
      output.Error = Error2;
    }
  }
  queryCompatOutput(queryCompatErrorData, errorData) {
    if (queryCompatErrorData.Error) {
      errorData.Error = queryCompatErrorData.Error;
    }
    if (queryCompatErrorData.Type) {
      errorData.Type = queryCompatErrorData.Type;
    }
    if (queryCompatErrorData.Code) {
      errorData.Code = queryCompatErrorData.Code;
    }
  }
  findQueryCompatibleError(registry, errorName) {
    try {
      return registry.getSchema(errorName);
    } catch (e2) {
      return registry.find((schema) => NormalizedSchema.of(schema).getMergedTraits().awsQueryError?.[0] === errorName);
    }
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/ConfigurableSerdeContext.js
var SerdeContextConfig = class {
  serdeContext;
  setSerdeContext(serdeContext) {
    this.serdeContext = serdeContext;
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/UnionSerde.js
var UnionSerde = class {
  from;
  to;
  keys;
  constructor(from, to) {
    this.from = from;
    this.to = to;
    const keys = Object.keys(this.from);
    const set = new Set(keys);
    set.delete("__type");
    this.keys = set;
  }
  mark(key) {
    this.keys.delete(key);
  }
  hasUnknown() {
    return this.keys.size === 1 && Object.keys(this.to).length === 0;
  }
  writeUnknown() {
    if (this.hasUnknown()) {
      const k2 = this.keys.values().next().value;
      const v2 = this.from[k2];
      this.to.$unknown = [k2, v2];
    }
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/writeKey.js
function writeKey(obj) {
  Object.defineProperty(obj, "__proto__", { value: void 0, writable: true, enumerable: true, configurable: true });
}

// node_modules/@aws-sdk/xml-builder/dist-es/escape-attribute.js
var ATTR_ESCAPE_RE = /[&<>"]/g;
var ATTR_ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escapeAttribute(value) {
  return value.replace(ATTR_ESCAPE_RE, (ch) => ATTR_ESCAPE_MAP[ch]);
}

// node_modules/@aws-sdk/xml-builder/dist-es/escape-element.js
var ELEMENT_ESCAPE_RE = /[&"'<>\r\n\u0085\u2028]/g;
var ELEMENT_ESCAPE_MAP = {
  "&": "&amp;",
  '"': "&quot;",
  "'": "&apos;",
  "<": "&lt;",
  ">": "&gt;",
  "\r": "&#x0D;",
  "\n": "&#x0A;",
  "\x85": "&#x85;",
  "\u2028": "&#x2028;"
};
function escapeElement(value) {
  return value.replace(ELEMENT_ESCAPE_RE, (ch) => ELEMENT_ESCAPE_MAP[ch]);
}

// node_modules/@aws-sdk/xml-builder/dist-es/XmlText.js
var XmlText = class {
  value;
  constructor(value) {
    this.value = value;
  }
  toString() {
    return escapeElement("" + this.value);
  }
};

// node_modules/@aws-sdk/xml-builder/dist-es/XmlNode.js
var XmlNode = class _XmlNode {
  name;
  children;
  attributes = {};
  static of(name, childText, withName) {
    const node = new _XmlNode(name);
    if (childText !== void 0) {
      node.addChildNode(new XmlText(childText));
    }
    if (withName !== void 0) {
      node.withName(withName);
    }
    return node;
  }
  constructor(name, children = []) {
    this.name = name;
    this.children = children;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  addAttribute(name, value) {
    this.attributes[name] = value;
    return this;
  }
  addChildNode(child) {
    this.children.push(child);
    return this;
  }
  removeAttribute(name) {
    delete this.attributes[name];
    return this;
  }
  n(name) {
    this.name = name;
    return this;
  }
  c(child) {
    this.children.push(child);
    return this;
  }
  a(name, value) {
    if (value != null) {
      this.attributes[name] = value;
    }
    return this;
  }
  cc(input, field, withName = field) {
    if (input[field] != null) {
      const node = _XmlNode.of(field, input[field]).withName(withName);
      this.c(node);
    }
  }
  l(input, listName, memberName, valueProvider) {
    if (input[listName] != null) {
      const nodes2 = valueProvider();
      nodes2.map((node) => {
        node.withName(memberName);
        this.c(node);
      });
    }
  }
  lc(input, listName, memberName, valueProvider) {
    if (input[listName] != null) {
      const nodes2 = valueProvider();
      const containerNode = new _XmlNode(memberName);
      nodes2.map((node) => {
        containerNode.c(node);
      });
      this.c(containerNode);
    }
  }
  toString() {
    const hasChildren = Boolean(this.children.length);
    let xmlText = `<${this.name}`;
    const attributes = this.attributes;
    for (const attributeName of Object.keys(attributes)) {
      const attribute = attributes[attributeName];
      if (attribute != null) {
        xmlText += ` ${attributeName}="${escapeAttribute("" + attribute)}"`;
      }
    }
    return xmlText += !hasChildren ? "/>" : `>${this.children.map((c2) => c2.toString()).join("")}</${this.name}>`;
  }
};

// node_modules/@aws-sdk/xml-builder/dist-es/xml-parser.browser.js
var parser;
function parseXML(xmlString) {
  if (!parser) {
    parser = new DOMParser();
  }
  const xmlDocument = parser.parseFromString(xmlString, "application/xml");
  if (xmlDocument.getElementsByTagName("parsererror").length > 0) {
    throw new Error("DOMParser XML parsing error.");
  }
  const xmlToObj = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent?.trim()) {
        return node.textContent;
      }
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node;
      if (element.attributes.length === 0 && element.childNodes.length === 0) {
        return "";
      }
      const obj = {};
      const attributes = Array.from(element.attributes);
      for (const attr of attributes) {
        obj[`${attr.name}`] = attr.value;
      }
      const childNodes = Array.from(element.childNodes);
      for (const child of childNodes) {
        const childResult = xmlToObj(child);
        if (childResult != null) {
          const childName = child.nodeName;
          if (childNodes.length === 1 && attributes.length === 0 && childName === "#text") {
            return childResult;
          }
          if (childName in obj) {
            if (Array.isArray(obj[childName])) {
              obj[childName].push(childResult);
            } else {
              obj[childName] = [obj[childName], childResult];
            }
          } else {
            obj[childName] = childResult;
          }
        } else if (childNodes.length === 1 && attributes.length === 0) {
          return element.textContent;
        }
      }
      return obj;
    }
    return null;
  };
  return {
    [xmlDocument.documentElement.nodeName]: xmlToObj(xmlDocument.documentElement)
  };
}

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlShapeDeserializer.js
init_schema();
init_index_browser2();
var XmlShapeDeserializer = class extends SerdeContextConfig {
  settings;
  stringDeserializer;
  constructor(settings) {
    super();
    this.settings = settings;
    this.stringDeserializer = new FromStringShapeDeserializer(settings);
  }
  setSerdeContext(serdeContext) {
    this.serdeContext = serdeContext;
    this.stringDeserializer.setSerdeContext(serdeContext);
  }
  read(schema, bytes2, key) {
    const ns = NormalizedSchema.of(schema);
    const memberSchemas = ns.getMemberSchemas();
    const isEventPayload = ns.isStructSchema() && ns.isMemberSchema() && !!Object.values(memberSchemas).find((memberNs) => {
      return !!memberNs.getMemberTraits().eventPayload;
    });
    if (isEventPayload) {
      const output = {};
      const memberName = Object.keys(memberSchemas)[0];
      const eventMemberSchema = memberSchemas[memberName];
      if (eventMemberSchema.isBlobSchema()) {
        output[memberName] = bytes2;
      } else {
        output[memberName] = this.read(memberSchemas[memberName], bytes2);
      }
      return output;
    }
    const xmlString = (this.serdeContext?.utf8Encoder ?? toUtf8)(bytes2);
    const parsedObject = this.parseXml(xmlString);
    return this.readSchema(schema, key ? parsedObject[key] : parsedObject);
  }
  readSchema(_schema, value) {
    const ns = NormalizedSchema.of(_schema);
    if (ns.isUnitSchema()) {
      return;
    }
    const traits = ns.getMergedTraits();
    if (ns.isListSchema() && !Array.isArray(value)) {
      return this.readSchema(ns, [value]);
    }
    if (value == null) {
      return value;
    }
    if (typeof value === "object") {
      const flat = !!traits.xmlFlattened;
      if (ns.isListSchema()) {
        const listValue = ns.getValueSchema();
        const buffer2 = [];
        const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
        const source = flat ? value : (value[0] ?? value)[sourceKey];
        if (source == null) {
          return buffer2;
        }
        const sourceArray = Array.isArray(source) ? source : [source];
        for (const v2 of sourceArray) {
          buffer2.push(this.readSchema(listValue, v2));
        }
        return buffer2;
      }
      const buffer = {};
      if (ns.isMapSchema()) {
        const keyNs = ns.getKeySchema();
        const memberNs = ns.getValueSchema();
        let entries;
        if (flat) {
          entries = Array.isArray(value) ? value : [value];
        } else {
          entries = Array.isArray(value.entry) ? value.entry : [value.entry];
        }
        const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
        const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
        for (const entry of entries) {
          const key = entry[keyProperty];
          const value2 = entry[valueProperty];
          if (key === "__proto__") {
            writeKey(buffer);
          }
          buffer[key] = this.readSchema(memberNs, value2);
        }
        return buffer;
      }
      if (ns.isStructSchema()) {
        const union = ns.isUnionSchema();
        let unionSerde;
        if (union) {
          unionSerde = new UnionSerde(value, buffer);
        }
        for (const [memberName, memberSchema] of ns.structIterator()) {
          const memberTraits = memberSchema.getMergedTraits();
          const xmlObjectKey = !memberTraits.httpPayload ? memberSchema.getMemberTraits().xmlName ?? memberName : memberTraits.xmlName ?? memberSchema.getName();
          if (union) {
            unionSerde.mark(xmlObjectKey);
          }
          if (value[xmlObjectKey] != null) {
            buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
          }
        }
        if (union) {
          unionSerde.writeUnknown();
        }
        return buffer;
      }
      if (ns.isDocumentSchema()) {
        return value;
      }
      throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
    }
    if (ns.isListSchema()) {
      return [];
    }
    if (ns.isMapSchema() || ns.isStructSchema()) {
      return {};
    }
    return this.stringDeserializer.read(ns, value);
  }
  parseXml(xml) {
    if (xml.length) {
      let parsedObj;
      try {
        parsedObj = parseXML(xml);
      } catch (e2) {
        if (e2 && typeof e2 === "object") {
          Object.defineProperty(e2, "$responseBodyText", {
            value: xml
          });
        }
        throw e2;
      }
      const textNodeName = "#text";
      const key = Object.keys(parsedObj)[0];
      const parsedObjToReturn = parsedObj[key];
      if (parsedObjToReturn[textNodeName]) {
        parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
        delete parsedObjToReturn[textNodeName];
      }
      return getValueFromTextNode(parsedObjToReturn);
    }
    return {};
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/AwsRestXmlProtocol.js
init_schema();

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js
var loadRestXmlErrorCode = (output, data) => {
  if (data?.Error?.Code !== void 0) {
    return data.Error.Code;
  }
  if (data?.Code !== void 0) {
    return data.Code;
  }
  if (output.statusCode == 404) {
    return "NotFound";
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlShapeSerializer.js
init_schema();
init_index_browser2();
init_index_browser2();
var XmlShapeSerializer = class extends SerdeContextConfig {
  settings;
  stringBuffer;
  byteBuffer;
  buffer;
  constructor(settings) {
    super();
    this.settings = settings;
  }
  write(schema, value) {
    const ns = NormalizedSchema.of(schema);
    if (ns.isStringSchema() && typeof value === "string") {
      this.stringBuffer = value;
    } else if (ns.isBlobSchema()) {
      this.byteBuffer = "byteLength" in value ? value : (this.serdeContext?.base64Decoder ?? fromBase64)(value);
    } else {
      this.buffer = this.writeStruct(ns, value, void 0);
      const traits = ns.getMergedTraits();
      if (traits.httpPayload && !traits.xmlName) {
        this.buffer.withName(ns.getName());
      }
    }
  }
  flush() {
    if (this.byteBuffer !== void 0) {
      const bytes2 = this.byteBuffer;
      delete this.byteBuffer;
      return bytes2;
    }
    if (this.stringBuffer !== void 0) {
      const str = this.stringBuffer;
      delete this.stringBuffer;
      return str;
    }
    const buffer = this.buffer;
    if (this.settings.xmlNamespace) {
      if (!buffer?.attributes?.["xmlns"]) {
        buffer.addAttribute("xmlns", this.settings.xmlNamespace);
      }
    }
    delete this.buffer;
    return buffer.toString();
  }
  writeStruct(ns, value, parentXmlns) {
    const traits = ns.getMergedTraits();
    const name = ns.isMemberSchema() && !traits.httpPayload ? ns.getMemberTraits().xmlName ?? ns.getMemberName() : traits.xmlName ?? ns.getName();
    if (!name || !ns.isStructSchema()) {
      throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write struct with empty name or non-struct, schema=${ns.getName(true)}.`);
    }
    const structXmlNode = XmlNode.of(name);
    const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
    for (const [memberName, memberSchema] of ns.structIterator()) {
      const val = value[memberName];
      if (val != null || memberSchema.isIdempotencyToken()) {
        if (memberSchema.getMergedTraits().xmlAttribute) {
          structXmlNode.addAttribute(memberSchema.getMergedTraits().xmlName ?? memberName, this.writeSimple(memberSchema, val));
          continue;
        }
        if (memberSchema.isListSchema()) {
          this.writeList(memberSchema, val, structXmlNode, xmlns);
        } else if (memberSchema.isMapSchema()) {
          this.writeMap(memberSchema, val, structXmlNode, xmlns);
        } else if (memberSchema.isStructSchema()) {
          structXmlNode.addChildNode(this.writeStruct(memberSchema, val, xmlns));
        } else {
          const memberNode = XmlNode.of(memberSchema.getMergedTraits().xmlName ?? memberSchema.getMemberName());
          this.writeSimpleInto(memberSchema, val, memberNode, xmlns);
          structXmlNode.addChildNode(memberNode);
        }
      }
    }
    const { $unknown } = value;
    if ($unknown && ns.isUnionSchema() && Array.isArray($unknown) && Object.keys(value).length === 1) {
      const [k2, v2] = $unknown;
      const node = XmlNode.of(k2);
      if (typeof v2 !== "string") {
        if (value instanceof XmlNode || value instanceof XmlText) {
          structXmlNode.addChildNode(value);
        } else {
          throw new Error(`@aws-sdk - $unknown union member in XML requires value of type string, @aws-sdk/xml-builder::XmlNode or XmlText.`);
        }
      }
      this.writeSimpleInto(0, v2, node, xmlns);
      structXmlNode.addChildNode(node);
    }
    if (xmlns) {
      structXmlNode.addAttribute(xmlnsAttr, xmlns);
    }
    return structXmlNode;
  }
  writeList(listMember, array, container, parentXmlns) {
    if (!listMember.isMemberSchema()) {
      throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member list: ${listMember.getName(true)}`);
    }
    const listTraits = listMember.getMergedTraits();
    const listValueSchema = listMember.getValueSchema();
    const listValueTraits = listValueSchema.getMergedTraits();
    const sparse = !!listValueTraits.sparse;
    const flat = !!listTraits.xmlFlattened;
    const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(listMember, parentXmlns);
    const writeItem = (container2, value) => {
      if (listValueSchema.isListSchema()) {
        this.writeList(listValueSchema, Array.isArray(value) ? value : [value], container2, xmlns);
      } else if (listValueSchema.isMapSchema()) {
        this.writeMap(listValueSchema, value, container2, xmlns);
      } else if (listValueSchema.isStructSchema()) {
        const struct = this.writeStruct(listValueSchema, value, xmlns);
        container2.addChildNode(struct.withName(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member"));
      } else {
        const listItemNode = XmlNode.of(flat ? listTraits.xmlName ?? listMember.getMemberName() : listValueTraits.xmlName ?? "member");
        this.writeSimpleInto(listValueSchema, value, listItemNode, xmlns);
        container2.addChildNode(listItemNode);
      }
    };
    if (flat) {
      for (const value of array) {
        if (sparse || value != null) {
          writeItem(container, value);
        }
      }
    } else {
      const listNode = XmlNode.of(listTraits.xmlName ?? listMember.getMemberName());
      if (xmlns) {
        listNode.addAttribute(xmlnsAttr, xmlns);
      }
      for (const value of array) {
        if (sparse || value != null) {
          writeItem(listNode, value);
        }
      }
      container.addChildNode(listNode);
    }
  }
  writeMap(mapMember, map, container, parentXmlns, containerIsMap = false) {
    if (!mapMember.isMemberSchema()) {
      throw new Error(`@aws-sdk/core/protocols - xml serializer, cannot write non-member map: ${mapMember.getName(true)}`);
    }
    const mapTraits = mapMember.getMergedTraits();
    const mapKeySchema = mapMember.getKeySchema();
    const mapKeyTraits = mapKeySchema.getMergedTraits();
    const keyTag = mapKeyTraits.xmlName ?? "key";
    const mapValueSchema = mapMember.getValueSchema();
    const mapValueTraits = mapValueSchema.getMergedTraits();
    const valueTag = mapValueTraits.xmlName ?? "value";
    const sparse = !!mapValueTraits.sparse;
    const flat = !!mapTraits.xmlFlattened;
    const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(mapMember, parentXmlns);
    const addKeyValue = (entry, key, val) => {
      const keyNode = XmlNode.of(keyTag, key);
      const [keyXmlnsAttr, keyXmlns] = this.getXmlnsAttribute(mapKeySchema, xmlns);
      if (keyXmlns) {
        keyNode.addAttribute(keyXmlnsAttr, keyXmlns);
      }
      entry.addChildNode(keyNode);
      let valueNode = XmlNode.of(valueTag);
      if (mapValueSchema.isListSchema()) {
        this.writeList(mapValueSchema, val, valueNode, xmlns);
      } else if (mapValueSchema.isMapSchema()) {
        this.writeMap(mapValueSchema, val, valueNode, xmlns, true);
      } else if (mapValueSchema.isStructSchema()) {
        valueNode = this.writeStruct(mapValueSchema, val, xmlns);
      } else {
        this.writeSimpleInto(mapValueSchema, val, valueNode, xmlns);
      }
      entry.addChildNode(valueNode);
    };
    if (flat) {
      for (const key in map) {
        const val = map[key];
        if (sparse || val != null) {
          const entry = XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
          addKeyValue(entry, key, val);
          container.addChildNode(entry);
        }
      }
    } else {
      let mapNode;
      if (!containerIsMap) {
        mapNode = XmlNode.of(mapTraits.xmlName ?? mapMember.getMemberName());
        if (xmlns) {
          mapNode.addAttribute(xmlnsAttr, xmlns);
        }
        container.addChildNode(mapNode);
      }
      for (const key in map) {
        const val = map[key];
        if (sparse || val != null) {
          const entry = XmlNode.of("entry");
          addKeyValue(entry, key, val);
          (containerIsMap ? container : mapNode).addChildNode(entry);
        }
      }
    }
  }
  writeSimple(_schema, value) {
    if (null === value) {
      throw new Error("@aws-sdk/core/protocols - (XML serializer) cannot write null value.");
    }
    const ns = NormalizedSchema.of(_schema);
    let nodeContents = null;
    if (value && typeof value === "object") {
      if (ns.isBlobSchema()) {
        nodeContents = (this.serdeContext?.base64Encoder ?? toBase64)(value);
      } else if (ns.isTimestampSchema() && value instanceof Date) {
        const format2 = determineTimestampFormat(ns, this.settings);
        switch (format2) {
          case 5:
            nodeContents = value.toISOString().replace(".000Z", "Z");
            break;
          case 6:
            nodeContents = dateToUtcString(value);
            break;
          case 7:
            nodeContents = String(value.getTime() / 1e3);
            break;
          default:
            console.warn("Missing timestamp format, using http date", value);
            nodeContents = dateToUtcString(value);
            break;
        }
      } else if (ns.isBigDecimalSchema() && value) {
        if (value instanceof NumericValue) {
          return value.string;
        }
        return String(value);
      } else if (ns.isMapSchema() || ns.isListSchema()) {
        throw new Error("@aws-sdk/core/protocols - xml serializer, cannot call _write() on List/Map schema, call writeList or writeMap() instead.");
      } else {
        throw new Error(`@aws-sdk/core/protocols - xml serializer, unhandled schema type for object value and schema: ${ns.getName(true)}`);
      }
    }
    if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isBigIntegerSchema() || ns.isBigDecimalSchema()) {
      nodeContents = String(value);
    }
    if (ns.isStringSchema()) {
      if (value === void 0 && ns.isIdempotencyToken()) {
        nodeContents = generateIdempotencyToken();
      } else {
        nodeContents = String(value);
      }
    }
    if (nodeContents === null) {
      throw new Error(`Unhandled schema-value pair ${ns.getName(true)}=${value}`);
    }
    return nodeContents;
  }
  writeSimpleInto(_schema, value, into, parentXmlns) {
    const nodeContents = this.writeSimple(_schema, value);
    const ns = NormalizedSchema.of(_schema);
    const content = new XmlText(nodeContents);
    const [xmlnsAttr, xmlns] = this.getXmlnsAttribute(ns, parentXmlns);
    if (xmlns) {
      into.addAttribute(xmlnsAttr, xmlns);
    }
    into.addChildNode(content);
  }
  getXmlnsAttribute(ns, parentXmlns) {
    const traits = ns.getMergedTraits();
    const [prefix, xmlns] = traits.xmlNamespace ?? [];
    if (xmlns && xmlns !== parentXmlns) {
      return [prefix ? `xmlns:${prefix}` : "xmlns", xmlns];
    }
    return [void 0, void 0];
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/XmlCodec.js
var XmlCodec = class extends SerdeContextConfig {
  settings;
  constructor(settings) {
    super();
    this.settings = settings;
  }
  createSerializer() {
    const serializer = new XmlShapeSerializer(this.settings);
    serializer.setSerdeContext(this.serdeContext);
    return serializer;
  }
  createDeserializer() {
    const deserializer = new XmlShapeDeserializer(this.settings);
    deserializer.setSerdeContext(this.serdeContext);
    return deserializer;
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/AwsRestXmlProtocol.js
var AwsRestXmlProtocol = class extends HttpBindingProtocol {
  codec;
  serializer;
  deserializer;
  mixin = new ProtocolLib();
  constructor(options) {
    super(options);
    const settings = {
      timestampFormat: {
        useTrait: true,
        default: 5
      },
      httpBindings: true,
      xmlNamespace: options.xmlNamespace,
      serviceNamespace: options.defaultNamespace
    };
    this.codec = new XmlCodec(settings);
    this.serializer = new HttpInterceptingShapeSerializer(this.codec.createSerializer(), settings);
    this.deserializer = new HttpInterceptingShapeDeserializer(this.codec.createDeserializer(), settings);
  }
  getPayloadCodec() {
    return this.codec;
  }
  getShapeId() {
    return "aws.protocols#restXml";
  }
  async serializeRequest(operationSchema, input, context) {
    const request = await super.serializeRequest(operationSchema, input, context);
    const inputSchema = NormalizedSchema.of(operationSchema.input);
    if (!request.headers["content-type"]) {
      const contentType = this.mixin.resolveRestContentType(this.getDefaultContentType(), inputSchema);
      if (contentType) {
        request.headers["content-type"] = contentType;
      }
    }
    if (typeof request.body === "string" && request.headers["content-type"] === this.getDefaultContentType() && !request.body.startsWith("<?xml ") && !this.hasUnstructuredPayloadBinding(inputSchema)) {
      request.body = '<?xml version="1.0" encoding="UTF-8"?>' + request.body;
    }
    return request;
  }
  async deserializeResponse(operationSchema, context, response) {
    return super.deserializeResponse(operationSchema, context, response);
  }
  async handleError(operationSchema, context, response, dataObject, metadata) {
    const errorIdentifier = loadRestXmlErrorCode(response, dataObject) ?? "Unknown";
    this.mixin.compose(this.compositeErrorRegistry, errorIdentifier, this.options.defaultNamespace);
    if (dataObject.Error && typeof dataObject.Error === "object") {
      for (const key of Object.keys(dataObject.Error)) {
        dataObject[key] = dataObject.Error[key];
        if (key.toLowerCase() === "message") {
          dataObject.message = dataObject.Error[key];
        }
      }
    }
    if (dataObject.RequestId && !metadata.requestId) {
      metadata.requestId = dataObject.RequestId;
    }
    const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, dataObject, metadata);
    const ns = NormalizedSchema.of(errorSchema);
    const message = dataObject.Error?.message ?? dataObject.Error?.Message ?? dataObject.message ?? dataObject.Message ?? "UnknownError";
    const ErrorCtor = this.compositeErrorRegistry.getErrorCtor(errorSchema) ?? Error;
    const exception = new ErrorCtor({});
    await this.deserializeHttpMessage(errorSchema, context, response, dataObject);
    const output = {};
    const errorDeserializer = this.codec.createDeserializer();
    for (const [name, member2] of ns.structIterator()) {
      const target = member2.getMergedTraits().xmlName ?? name;
      const value = dataObject.Error?.[target] ?? dataObject[target];
      output[name] = errorDeserializer.readSchema(member2, value);
    }
    throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
      $fault: ns.getMergedTraits().error,
      message
    }, output), dataObject);
  }
  getDefaultContentType() {
    return "application/xml";
  }
  hasUnstructuredPayloadBinding(ns) {
    for (const [, member2] of ns.structIterator()) {
      if (member2.getMergedTraits().httpPayload) {
        return !(member2.isStructSchema() || member2.isMapSchema() || member2.isListSchema());
      }
    }
    return false;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/protocol/S3RestXmlProtocol.js
init_schema();
var S3RestXmlProtocol = class extends AwsRestXmlProtocol {
  async serializeRequest(operationSchema, input, context) {
    const request = await super.serializeRequest(operationSchema, input, context);
    const ns = NormalizedSchema.of(operationSchema.input);
    const staticStructureSchema = ns.getSchema();
    let bucketMemberIndex = 0;
    const requiredMemberCount = staticStructureSchema[6] ?? 0;
    if (input && typeof input === "object") {
      for (const [memberName, memberNs] of ns.structIterator()) {
        if (++bucketMemberIndex > requiredMemberCount) {
          break;
        }
        if (memberName === "Bucket") {
          if (!input.Bucket && memberNs.getMergedTraits().httpLabel) {
            throw new Error(`No value provided for input HTTP label: Bucket.`);
          }
          break;
        }
      }
    }
    return request;
  }
};

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-expect-continue/middleware-expect-continue.js
function addExpectContinueMiddleware(options) {
  return (next) => async (args) => {
    const { request } = args;
    if (options.expectContinueHeader !== false && HttpRequest.isInstance(request) && request.body && options.runtime === "node" && options.requestHandler?.constructor?.name !== "FetchHttpHandler") {
      let sendHeader = true;
      if (typeof options.expectContinueHeader === "number") {
        try {
          const bodyLength = Number(request.headers?.["content-length"]) ?? options.bodyLengthChecker?.(request.body) ?? Infinity;
          sendHeader = bodyLength >= options.expectContinueHeader;
        } catch (e2) {
        }
      } else {
        sendHeader = !!options.expectContinueHeader;
      }
      if (sendHeader) {
        request.headers.Expect = "100-continue";
      }
    }
    return next({
      ...args,
      request
    });
  };
}
var addExpectContinueMiddlewareOptions = {
  step: "build",
  tags: ["SET_EXPECT_HEADER", "EXPECT_HEADER"],
  name: "addExpectContinueMiddleware",
  override: true
};
var getAddExpectContinuePlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(addExpectContinueMiddleware(options), addExpectContinueMiddlewareOptions);
  }
});

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/middleware-ssec/middleware-ssec.js
function ssecMiddleware(options) {
  return (next) => async (args) => {
    const input = { ...args.input };
    const properties = [
      {
        target: "SSECustomerKey",
        hash: "SSECustomerKeyMD5"
      },
      {
        target: "CopySourceSSECustomerKey",
        hash: "CopySourceSSECustomerKeyMD5"
      }
    ];
    for (const prop of properties) {
      const value = input[prop.target];
      if (value) {
        let valueForHash;
        if (typeof value === "string") {
          if (isValidBase64EncodedSSECustomerKey(value, options)) {
            valueForHash = options.base64Decoder(value);
          } else {
            valueForHash = options.utf8Decoder(value);
            input[prop.target] = options.base64Encoder(valueForHash);
          }
        } else {
          valueForHash = ArrayBuffer.isView(value) ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength) : new Uint8Array(value);
          input[prop.target] = options.base64Encoder(valueForHash);
        }
        const hash = new options.md5();
        hash.update(valueForHash);
        input[prop.hash] = options.base64Encoder(await hash.digest());
      }
    }
    return next({
      ...args,
      input
    });
  };
}
var ssecMiddlewareOptions = {
  name: "ssecMiddleware",
  step: "initialize",
  tags: ["SSE"],
  override: true
};
var getSsecPlugin = (config) => ({
  applyToStack: (clientStack) => {
    clientStack.add(ssecMiddleware(config), ssecMiddlewareOptions);
  }
});
function isValidBase64EncodedSSECustomerKey(str, options) {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!base64Regex.test(str))
    return false;
  try {
    const decodedBytes = options.base64Decoder(str);
    return decodedBytes.length === 32;
  } catch {
    return false;
  }
}

// node_modules/@aws-sdk/middleware-sdk-s3/dist-es/submodules/s3/index.browser.js
var no7 = Symbol.for("node-only");

// node_modules/@aws-sdk/client-s3/dist-es/S3Client.js
init_index_browser();
init_index_browser4();
init_schema();

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js
var getDateHeader = (response) => HttpResponse.isInstance(response) ? response.headers?.date ?? response.headers?.Date : void 0;
var getAgeHeader = (response) => HttpResponse.isInstance(response) ? response.headers?.age ?? response.headers?.Age : void 0;

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js
var getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js
var getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset, timeRequestSent, ageHeader) => {
  if (ageHeader !== void 0) {
    return currentSystemClockOffset;
  }
  const serverTime = Date.parse(clockTime);
  const timeResponseReceived = Date.now();
  if (timeRequestSent !== void 0 && timeResponseReceived - timeRequestSent > 9e5) {
    return currentSystemClockOffset;
  }
  const candidateSkew = timeRequestSent !== void 0 ? serverTime - (timeRequestSent + timeResponseReceived) / 2 : serverTime - timeResponseReceived;
  return candidateSkew;
};

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js
var throwSigningPropertyError = (name, property) => {
  if (!property) {
    throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
  }
  return property;
};
var validateSigningProperties = async (signingProperties) => {
  const context = throwSigningPropertyError("context", signingProperties.context);
  const config = throwSigningPropertyError("config", signingProperties.config);
  const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
  const signerFunction = throwSigningPropertyError("signer", config.signer);
  const signer = await signerFunction(authScheme);
  const signingRegion = signingProperties?.signingRegion;
  const signingRegionSet = signingProperties?.signingRegionSet;
  const signingName = signingProperties?.signingName;
  return {
    config,
    signer,
    signingRegion,
    signingRegionSet,
    signingName
  };
};
var AwsSdkSigV4Signer = class {
  async sign(httpRequest, identity, signingProperties) {
    if (!HttpRequest.isInstance(httpRequest)) {
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    }
    const validatedProps = await validateSigningProperties(signingProperties);
    const { config, signer } = validatedProps;
    let { signingRegion, signingName } = validatedProps;
    const handlerExecutionContext = signingProperties.context;
    if (handlerExecutionContext?.authSchemes?.length ?? 0 > 1) {
      const [first, second] = handlerExecutionContext.authSchemes;
      if (first?.name === "sigv4a" && second?.name === "sigv4") {
        signingRegion = second?.signingRegion ?? signingRegion;
        signingName = second?.signingName ?? signingName;
      }
    }
    const noSkewCorrection = await config.disableClockSkewCorrection?.() === true;
    signingProperties._disableClockSkewCorrection = noSkewCorrection;
    if (!noSkewCorrection) {
      signingProperties._preRequestSystemClockOffset = config.systemClockOffset;
      signingProperties._requestSentAt = Date.now();
    }
    const signedRequest = await signer.sign(httpRequest, {
      signingDate: noSkewCorrection ? /* @__PURE__ */ new Date() : getSkewCorrectedDate(config.systemClockOffset),
      signingRegion,
      signingService: signingName
    });
    return signedRequest;
  }
  errorHandler(signingProperties) {
    return (error) => {
      const errorException = error;
      if (!signingProperties._disableClockSkewCorrection) {
        const serverTime = errorException.ServerTime ?? getDateHeader(errorException.$response);
        if (serverTime) {
          const config = throwSigningPropertyError("config", signingProperties.config);
          const preRequestOffset = signingProperties._preRequestSystemClockOffset;
          const timeRequestSent = signingProperties._requestSentAt;
          const ageHeader = getAgeHeader(errorException.$response);
          const newOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset, timeRequestSent, ageHeader);
          config.systemClockOffset = newOffset;
          const skewExceedsThreshold = Math.abs(newOffset) >= 24e4;
          const isLocalCorrection = newOffset !== preRequestOffset;
          const isConcurrentCorrection = preRequestOffset !== void 0 && preRequestOffset !== newOffset;
          if (skewExceedsThreshold && (isLocalCorrection || isConcurrentCorrection) && errorException.$metadata) {
            errorException.$metadata.clockSkewCorrected = true;
          }
        }
      }
      throw error;
    };
  }
  successHandler(httpResponse, signingProperties) {
    if (signingProperties._disableClockSkewCorrection) {
      return;
    }
    const dateHeader = getDateHeader(httpResponse);
    if (dateHeader) {
      const config = throwSigningPropertyError("config", signingProperties.config);
      const timeRequestSent = signingProperties._requestSentAt;
      const ageHeader = getAgeHeader(httpResponse);
      config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset, timeRequestSent, ageHeader);
    }
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4ASigner.js
var AwsSdkSigV4ASigner = class extends AwsSdkSigV4Signer {
  async sign(httpRequest, identity, signingProperties) {
    if (!HttpRequest.isInstance(httpRequest)) {
      throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
    }
    const { config, signer, signingRegion, signingRegionSet, signingName } = await validateSigningProperties(signingProperties);
    const configResolvedSigningRegionSet = await config.sigv4aSigningRegionSet?.();
    const multiRegionOverride = (configResolvedSigningRegionSet ?? signingRegionSet ?? [signingRegion]).join(",");
    const noSkewCorrection = await config.disableClockSkewCorrection?.() === true;
    signingProperties._disableClockSkewCorrection = noSkewCorrection;
    if (!noSkewCorrection) {
      signingProperties._preRequestSystemClockOffset = config.systemClockOffset;
      signingProperties._requestSentAt = Date.now();
    }
    const signedRequest = await signer.sign(httpRequest, {
      signingDate: noSkewCorrection ? /* @__PURE__ */ new Date() : getSkewCorrectedDate(config.systemClockOffset),
      signingRegion: multiRegionOverride,
      signingService: signingName
    });
    return signedRequest;
  }
};

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4AConfig.js
var resolveAwsSdkSigV4AConfig = (config) => {
  config.sigv4aSigningRegionSet = normalizeProvider2(config.sigv4aSigningRegionSet);
  return config;
};

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js
var bindResolveAwsSdkSigV4Config = (defaultDisableClockSkewCorrection) => (config) => {
  let inputCredentials = config.credentials;
  let isUserSupplied = !!config.credentials;
  let resolvedCredentials = void 0;
  Object.defineProperty(config, "credentials", {
    set(credentials) {
      if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
        isUserSupplied = true;
      }
      inputCredentials = credentials;
      const memoizedProvider = normalizeCredentialProvider(config, {
        credentials: inputCredentials,
        credentialDefaultProvider: config.credentialDefaultProvider
      });
      const boundProvider = bindCallerConfig(config, memoizedProvider);
      if (isUserSupplied && !boundProvider.attributed) {
        const isCredentialObject = typeof inputCredentials === "object" && inputCredentials !== null;
        resolvedCredentials = async (options) => {
          const creds = await boundProvider(options);
          const attributedCreds = creds;
          if (isCredentialObject && (!attributedCreds.$source || Object.keys(attributedCreds.$source).length === 0)) {
            return setCredentialFeature(attributedCreds, "CREDENTIALS_CODE", "e");
          }
          return attributedCreds;
        };
        resolvedCredentials.memoized = boundProvider.memoized;
        resolvedCredentials.configBound = boundProvider.configBound;
        resolvedCredentials.attributed = true;
      } else {
        resolvedCredentials = boundProvider;
      }
    },
    get() {
      return resolvedCredentials;
    },
    enumerable: true,
    configurable: true
  });
  config.credentials = inputCredentials;
  const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256: sha2562 } = config;
  let signer;
  if (config.signer) {
    signer = normalizeProvider2(config.signer);
  } else if (config.regionInfoProvider) {
    signer = () => normalizeProvider2(config.region)().then(async (region) => [
      await config.regionInfoProvider(region, {
        useFipsEndpoint: await config.useFipsEndpoint(),
        useDualstackEndpoint: await config.useDualstackEndpoint()
      }) || {},
      region
    ]).then(([regionInfo, region]) => {
      const { signingRegion, signingService } = regionInfo;
      config.signingRegion = config.signingRegion || signingRegion || region;
      config.signingName = config.signingName || signingService || config.serviceId;
      const params = {
        ...config,
        credentials: config.credentials,
        region: config.signingRegion,
        service: config.signingName,
        sha256: sha2562,
        uriEscapePath: signingEscapePath
      };
      const SignerCtor = config.signerConstructor || SignatureV4;
      return new SignerCtor(params);
    });
  } else {
    signer = async (authScheme) => {
      authScheme = Object.assign({}, {
        name: "sigv4",
        signingName: config.signingName || config.defaultSigningName,
        signingRegion: await normalizeProvider2(config.region)(),
        properties: {}
      }, authScheme);
      const signingRegion = authScheme.signingRegion;
      const signingService = authScheme.signingName;
      config.signingRegion = config.signingRegion || signingRegion;
      config.signingName = config.signingName || signingService || config.serviceId;
      const params = {
        ...config,
        credentials: config.credentials,
        region: config.signingRegion,
        service: config.signingName,
        sha256: sha2562,
        uriEscapePath: signingEscapePath
      };
      const SignerCtor = config.signerConstructor || SignatureV4;
      return new SignerCtor(params);
    };
  }
  const resolvedConfig = Object.assign(config, {
    systemClockOffset,
    signingEscapePath,
    signer,
    disableClockSkewCorrection: normalizeProvider2(config.disableClockSkewCorrection ?? defaultDisableClockSkewCorrection)
  });
  return resolvedConfig;
};
function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
  let credentialsProvider;
  if (credentials) {
    if (!credentials?.memoized) {
      credentialsProvider = memoizeIdentityProvider(credentials, isIdentityExpired, doesIdentityRequireRefresh);
    } else {
      credentialsProvider = credentials;
    }
  } else {
    if (credentialDefaultProvider) {
      credentialsProvider = normalizeProvider2(credentialDefaultProvider(Object.assign({}, config, {
        parentClientConfig: config
      })));
    } else {
      credentialsProvider = async () => {
        throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
      };
    }
  }
  credentialsProvider.memoized = true;
  return credentialsProvider;
}
function bindCallerConfig(config, credentialsProvider) {
  if (credentialsProvider.configBound) {
    return credentialsProvider;
  }
  const fn = async (options) => credentialsProvider({ ...options, callerClientConfig: config });
  fn.memoized = credentialsProvider.memoized;
  fn.configBound = true;
  return fn;
}

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/clock-skew-defaults.browser.js
var DEFAULT_DISABLE_CLOCK_SKEW_CORRECTION = false;

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/index.browser.js
var no8 = Symbol.for("node-only");
var resolveAwsSdkSigV4Config = bindResolveAwsSdkSigV4Config(DEFAULT_DISABLE_CLOCK_SKEW_CORRECTION);

// node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthSchemeProvider.js
init_index_browser();

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/endpointResolver.js
init_index_browser();

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/bdd.js
init_index_browser();
var aw = "ref";
var ax = "argv";
var ay = "backend";
var az = "authSchemes";
var aA = "disableDoubleEncoding";
var aB = "signingName";
var aC = "signingRegion";
var aD = "signingRegionSet";
var a = -1;
var b = true;
var c = false;
var d = "isSet";
var e = "booleanEquals";
var f = "stringEquals";
var g = "coalesce";
var h = "substring";
var i = "";
var j = "aws.partition";
var k = "partitionResult";
var l = "accessPointSuffix";
var m = "regionPrefix";
var n = (n2) => "outpostId_ssa_" + n2 + i;
var o = "hardwareType";
var p = "ite";
var q = "isValidHostLabel";
var s = "sigv4";
var t = "aws.isVirtualHostableS3Bucket";
var u = "url";
var v = "getAttr";
var w = "bucketArn";
var x = "--";
var y = "arnType";
var z = "accesspoint";
var A = (n2) => "accessPointName_ssa_" + n2 + i;
var B = "s3-object-lambda";
var C = "s3-outposts";
var D = "bucketPartition";
var E = "us-east-1";
var F = "outpostType";
var G = "name";
var H = "s3";
var I = "{url#scheme}://{Bucket}.{url#authority}{url#path}";
var J = "{url#scheme}://{url#authority}{url#path}";
var K2 = "{url#scheme}://{url#authority}{url#normalizedPath}{Bucket}";
var L = "https://{Bucket}.s3-accelerate.{partitionResult#dnsSuffix}";
var M2 = "https://{Bucket}.s3.{partitionResult#dnsSuffix}";
var N = (n2) => "{url#scheme}://{accessPointName_ssa_" + n2 + "}-{bucketArn#accountId}.{url#authority}{url#path}";
var O = (n2) => "Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and `-`. Found: `{accessPointName_ssa_" + n2 + "}`";
var P = "sigv4a";
var Q = "{url#scheme}://{url#authority}{url#normalizedPath}{uri_encoded_bucket}";
var R = "https://s3.{partitionResult#dnsSuffix}/{uri_encoded_bucket}";
var S2 = "https://s3.{partitionResult#dnsSuffix}";
var T3 = { [aw]: "UseFIPS" };
var U = { [aw]: "UseDualStack" };
var V = { [aw]: "Bucket" };
var W = { "fn": v, [ax]: [{ [aw]: k }, G] };
var X = { [aw]: u };
var Y = { [aw]: "Region" };
var Z = { [aw]: w };
var aa = { [aw]: y };
var ab = { [aw]: "accessPointName_ssa_1" };
var ac = { "fn": v, [ax]: [Z, "region"] };
var ad = { [aw]: o };
var ae = { "fn": v, [ax]: [Z, "service"] };
var af = { "fn": v, [ax]: [Z, "accountId"] };
var ag = { [ay]: "S3Express", [az]: [{ [aA]: true, [G]: "{_s3e_auth}", [aB]: "s3express", [aC]: "{Region}" }] };
var ah = { [ay]: "S3Express", [az]: [{ [aA]: true, [G]: s, [aB]: "s3express", [aC]: "{Region}" }] };
var ai = { [az]: [{ [aA]: true, [G]: P, [aB]: C, [aD]: ["*"] }, { [aA]: true, [G]: s, [aB]: C, [aC]: "{Region}" }] };
var aj = { [az]: [{ [aA]: true, [G]: s, [aB]: H, [aC]: E }] };
var ak = { [az]: [{ [aA]: true, [G]: s, [aB]: H, [aC]: "{Region}" }] };
var al = { [az]: [{ [aA]: true, [G]: s, [aB]: B, [aC]: "{bucketArn#region}" }] };
var am = { [az]: [{ [aA]: true, [G]: s, [aB]: H, [aC]: "{bucketArn#region}" }] };
var an = { [az]: [{ [aA]: true, [G]: P, [aB]: C, [aD]: ["*"] }, { [aA]: true, [G]: s, [aB]: C, [aC]: "{bucketArn#region}" }] };
var ao = { [az]: [{ [aA]: true, [G]: s, [aB]: B, [aC]: "{Region}" }] };
var ap = [Y];
var aq = [{ [aw]: "Endpoint" }];
var as = [V];
var at = [V, 0, 7, true];
var au = [Z, "resourceId[1]"];
var av = ["*"];
var _data = {
  conditions: [
    [d, ap],
    [e, [{ [aw]: "Accelerate" }, b]],
    [e, [T3, b]],
    [e, [U, b]],
    [d, aq],
    [d, as],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 0, 6, b] }, i] }, "--x-s3"]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: at }, i] }, "--xa-s3"]],
    [j, ap, k],
    [h, at, l],
    [f, [{ [aw]: l }, "--op-s3"]],
    [h, [V, 8, 12, b], m],
    [h, [V, 32, 49, b], n(2)],
    [h, [V, 49, 50, b], o],
    [e, [{ [aw]: "ForcePathStyle" }, b]],
    [f, [W, "aws-cn"]],
    [p, [U, ".dualstack", i], "_s3e_ds"],
    [q, [{ [aw]: n(2) }, c]],
    [p, [T3, "-fips", i], "_s3e_fips"],
    [p, [{ fn: g, [ax]: [{ [aw]: "DisableS3ExpressSessionAuth" }, c] }, s, "sigv4-s3express"], "_s3e_auth"],
    [t, [V, c]],
    ["parseURL", aq, u],
    [e, [{ fn: g, [ax]: [{ [aw]: "UseS3ExpressControlEndpoint" }, c] }, b]],
    [t, [V, b]],
    [f, [{ fn: v, [ax]: [X, "scheme"] }, "http"]],
    [q, [Y, c]],
    ["aws.parseArn", as, w],
    [v, [{ fn: "split", [ax]: [V, x, 0] }, "[-2]"], "s3expressAvailabilityZoneId"],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 0, 4, c] }, i] }, "arn:"]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 16, 18, b] }, i] }, x]],
    [e, [{ fn: v, [ax]: [X, "isIp"] }, b]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 21, 23, b] }, i] }, x]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 27, 29, b] }, i] }, x]],
    [f, [{ [aw]: m }, "beta"]],
    ["uriEncode", as, "uri_encoded_bucket"],
    [q, [Y, b]],
    [e, [{ fn: g, [ax]: [{ [aw]: "UseObjectLambdaEndpoint" }, c] }, b]],
    [v, [Z, "resourceId[0]"], y],
    [f, [aa, i]],
    [f, [aa, z]],
    [v, au, A(1)],
    [f, [ab, i]],
    [f, [ac, i]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 14, 16, b] }, i] }, x]],
    [f, [ad, "e"]],
    [f, [ad, "o"]],
    [f, [Y, "aws-global"]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 19, 21, b] }, i] }, x]],
    [f, [ae, B]],
    [e, [{ fn: g, [ax]: [{ [aw]: "DisableAccessPoints" }, c] }, b]],
    [f, [ae, C]],
    [j, [ac], D],
    [q, [ab, b]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 26, 28, b] }, i] }, x]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 15, 17, b] }, i] }, x]],
    [v, [Z, "resourceId[4]"]],
    [f, [{ fn: g, [ax]: [{ fn: h, [ax]: [V, 20, 22, b] }, i] }, x]],
    [e, [{ [aw]: "UseGlobalEndpoint" }, b]],
    [f, [Y, E]],
    [v, au, n(1)],
    [e, [{ fn: g, [ax]: [{ [aw]: "UseArnRegion" }, b] }, b]],
    [q, [{ [aw]: n(1) }, c]],
    [v, [Z, "resourceId[2]"], F],
    [f, [Y, ac]],
    [f, [{ fn: v, [ax]: [{ [aw]: D }, G] }, W]],
    [e, [{ [aw]: "DisableMultiRegionAccessPoints" }, b]],
    [q, [ac, b]],
    [f, [{ fn: v, [ax]: [Z, "partition"] }, W]],
    [f, [af, i]],
    [f, [ae, H]],
    [q, [af, c]],
    [v, [Z, "resourceId[3]"], A(2)],
    [q, [ab, c]],
    [f, [{ [aw]: F }, z]],
    [q, [{ [aw]: A(2) }, c]]
  ],
  results: [
    [a],
    [a, "Accelerate cannot be used with FIPS"],
    [a, "Cannot set dual-stack in combination with a custom endpoint."],
    [a, "A custom endpoint cannot be combined with FIPS"],
    [a, "A custom endpoint cannot be combined with S3 Accelerate"],
    [a, "Partition does not support FIPS"],
    [a, "S3Express does not support S3 Accelerate."],
    ["{url#scheme}://{url#authority}/{uri_encoded_bucket}{url#path}", ag],
    [I, ag],
    [a, "S3Express bucket name is not a valid virtual hostable name."],
    ["https://s3express-control{_s3e_fips}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ah],
    ["https://{Bucket}.s3express{_s3e_fips}-{s3expressAvailabilityZoneId}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}", ag],
    [a, "Unrecognized S3Express bucket name format."],
    [J, ag],
    ["https://s3express-control{_s3e_fips}{_s3e_ds}.{Region}.{partitionResult#dnsSuffix}", ah],
    [a, "Expected a endpoint to be specified but no endpoint was found"],
    ["https://{Bucket}.ec2.{url#authority}", ai],
    ["https://{Bucket}.ec2.s3-outposts.{Region}.{partitionResult#dnsSuffix}", ai],
    ["https://{Bucket}.op-{outpostId_ssa_2}.{url#authority}", ai],
    ["https://{Bucket}.op-{outpostId_ssa_2}.s3-outposts.{Region}.{partitionResult#dnsSuffix}", ai],
    [a, 'Unrecognized hardware type: "Expected hardware type o or e but got {hardwareType}"'],
    [a, "Invalid Outposts Bucket alias - it must be a valid bucket name."],
    [a, "Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`."],
    [a, "Custom endpoint `{Endpoint}` was not a valid URI"],
    [a, "S3 Accelerate cannot be used in this region"],
    ["https://{Bucket}.s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://{Bucket}.s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
    ["https://{Bucket}.s3-fips.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://{Bucket}.s3-fips.{Region}.{partitionResult#dnsSuffix}", ak],
    ["https://{Bucket}.s3-accelerate.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://{Bucket}.s3-accelerate.dualstack.{partitionResult#dnsSuffix}", ak],
    ["https://{Bucket}.s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://{Bucket}.s3.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
    [K2, aj],
    [I, aj],
    [K2, ak],
    [I, ak],
    [L, aj],
    [L, ak],
    [M2, aj],
    [M2, ak],
    ["https://{Bucket}.s3.{Region}.{partitionResult#dnsSuffix}", ak],
    [a, "Invalid region: region was not a valid DNS name."],
    [a, "S3 Object Lambda does not support Dual-stack"],
    [a, "S3 Object Lambda does not support S3 Accelerate"],
    [a, "Access points are not supported for this operation"],
    [a, "Invalid configuration: region from ARN `{bucketArn#region}` does not match client region `{Region}` and UseArnRegion is `false`"],
    [a, "Invalid ARN: Missing account id"],
    [N(1), al],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-object-lambda-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", al],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-object-lambda.{bucketArn#region}.{bucketPartition#dnsSuffix}", al],
    [a, O(1)],
    [a, "Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and `-`. Found: `{bucketArn#accountId}`"],
    [a, "Invalid region in ARN: `{bucketArn#region}` (invalid DNS name)"],
    [a, "Client was configured for partition `{partitionResult#name}` but ARN (`{Bucket}`) has `{bucketPartition#name}`"],
    [a, "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`."],
    [a, "Invalid ARN: bucket ARN is missing a region"],
    [a, "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided"],
    [a, "Invalid ARN: Object Lambda ARNs only support `accesspoint` arn types, but found: `{arnType}`"],
    [a, "Access Points do not support S3 Accelerate"],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint-fips.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint-fips.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint.dualstack.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
    [N(1), am],
    ["https://{accessPointName_ssa_1}-{bucketArn#accountId}.s3-accesspoint.{bucketArn#region}.{bucketPartition#dnsSuffix}", am],
    [a, "Invalid ARN: The ARN was not for the S3 service, found: {bucketArn#service}"],
    [a, "S3 MRAP does not support dual-stack"],
    [a, "S3 MRAP does not support FIPS"],
    [a, "S3 MRAP does not support S3 Accelerate"],
    [a, "Invalid configuration: Multi-Region Access Point ARNs are disabled."],
    ["https://{accessPointName_ssa_1}.accesspoint.s3-global.{partitionResult#dnsSuffix}", { [az]: [{ [aA]: b, name: P, [aB]: H, [aD]: av }] }],
    [a, "Client was configured for partition `{partitionResult#name}` but bucket referred to partition `{bucketArn#partition}`"],
    [a, "Invalid Access Point Name"],
    [a, "S3 Outposts does not support Dual-stack"],
    [a, "S3 Outposts does not support FIPS"],
    [a, "S3 Outposts does not support S3 Accelerate"],
    [a, "Invalid Arn: Outpost Access Point ARN contains sub resources"],
    ["https://{accessPointName_ssa_2}-{bucketArn#accountId}.{outpostId_ssa_1}.{url#authority}", an],
    ["https://{accessPointName_ssa_2}-{bucketArn#accountId}.{outpostId_ssa_1}.s3-outposts.{bucketArn#region}.{bucketPartition#dnsSuffix}", an],
    [a, O(2)],
    [a, "Expected an outpost type `accesspoint`, found {outpostType}"],
    [a, "Invalid ARN: expected an access point name"],
    [a, "Invalid ARN: Expected a 4-component resource"],
    [a, "Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and `-`. Found: `{outpostId_ssa_1}`"],
    [a, "Invalid ARN: The Outpost Id was not set"],
    [a, "Invalid ARN: Unrecognized format: {Bucket} (type: {arnType})"],
    [a, "Invalid ARN: No ARN type specified"],
    [a, "Invalid ARN: `{Bucket}` was not a valid ARN"],
    [a, "Path-style addressing cannot be used with ARN buckets"],
    ["https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
    ["https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
    ["https://s3-fips.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
    ["https://s3-fips.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
    ["https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", aj],
    ["https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
    [Q, aj],
    [Q, ak],
    [R, aj],
    [R, ak],
    ["https://s3.{Region}.{partitionResult#dnsSuffix}/{uri_encoded_bucket}", ak],
    [a, "Path-style addressing cannot be used with S3 Accelerate"],
    [J, ao],
    ["https://s3-object-lambda-fips.{Region}.{partitionResult#dnsSuffix}", ao],
    ["https://s3-object-lambda.{Region}.{partitionResult#dnsSuffix}", ao],
    ["https://s3-fips.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://s3-fips.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
    ["https://s3-fips.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://s3-fips.{Region}.{partitionResult#dnsSuffix}", ak],
    ["https://s3.dualstack.us-east-1.{partitionResult#dnsSuffix}", aj],
    ["https://s3.dualstack.{Region}.{partitionResult#dnsSuffix}", ak],
    [J, aj],
    [J, ak],
    [S2, aj],
    [S2, ak],
    ["https://s3.{Region}.{partitionResult#dnsSuffix}", ak],
    [a, "A region must be set when sending requests to S3."]
  ]
};
var root = 2;
var r = 1e8;
var nodes = new Int32Array([
  -1,
  1,
  -1,
  0,
  3,
  r + 115,
  1,
  424,
  4,
  2,
  272,
  5,
  3,
  233,
  6,
  4,
  85,
  7,
  5,
  15,
  8,
  8,
  9,
  r + 115,
  16,
  10,
  13,
  18,
  11,
  13,
  19,
  12,
  13,
  22,
  r + 14,
  13,
  35,
  14,
  r + 42,
  36,
  r + 103,
  435,
  6,
  271,
  16,
  7,
  270,
  17,
  8,
  19,
  18,
  14,
  501,
  106,
  9,
  20,
  24,
  10,
  21,
  24,
  11,
  22,
  24,
  12,
  23,
  24,
  13,
  547,
  24,
  14,
  77,
  25,
  20,
  73,
  26,
  26,
  27,
  78,
  37,
  28,
  r + 86,
  38,
  r + 86,
  29,
  39,
  47,
  30,
  48,
  r + 58,
  31,
  50,
  32,
  r + 85,
  51,
  33,
  136,
  55,
  r + 76,
  34,
  59,
  35,
  r + 84,
  60,
  39,
  36,
  61,
  37,
  r + 83,
  62,
  38,
  146,
  63,
  41,
  r + 46,
  61,
  40,
  r + 83,
  62,
  41,
  150,
  64,
  42,
  r + 54,
  66,
  43,
  r + 53,
  70,
  44,
  r + 52,
  71,
  45,
  r + 81,
  73,
  46,
  r + 80,
  74,
  r + 78,
  r + 79,
  40,
  48,
  r + 57,
  41,
  r + 57,
  49,
  42,
  185,
  50,
  48,
  62,
  51,
  49,
  r + 45,
  52,
  51,
  53,
  526,
  60,
  56,
  54,
  62,
  r + 55,
  55,
  63,
  57,
  r + 46,
  62,
  r + 55,
  57,
  64,
  58,
  r + 54,
  66,
  59,
  r + 53,
  69,
  60,
  r + 65,
  70,
  61,
  r + 52,
  72,
  r + 64,
  r + 51,
  49,
  r + 45,
  63,
  51,
  64,
  526,
  60,
  67,
  65,
  62,
  r + 55,
  66,
  63,
  68,
  r + 46,
  62,
  r + 55,
  68,
  64,
  69,
  r + 54,
  66,
  70,
  r + 53,
  68,
  r + 47,
  71,
  70,
  72,
  r + 52,
  72,
  r + 50,
  r + 51,
  25,
  74,
  r + 42,
  46,
  r + 39,
  75,
  57,
  76,
  r + 41,
  58,
  r + 40,
  r + 41,
  26,
  r + 88,
  78,
  28,
  r + 87,
  79,
  34,
  82,
  80,
  35,
  81,
  545,
  36,
  r + 103,
  r + 115,
  46,
  r + 97,
  83,
  57,
  84,
  r + 99,
  58,
  r + 98,
  r + 99,
  5,
  101,
  86,
  8,
  87,
  r + 115,
  16,
  88,
  89,
  18,
  91,
  89,
  19,
  90,
  92,
  21,
  97,
  95,
  19,
  93,
  92,
  21,
  98,
  95,
  21,
  97,
  94,
  22,
  r + 14,
  95,
  35,
  96,
  r + 42,
  36,
  r + 103,
  r + 42,
  22,
  r + 13,
  98,
  35,
  99,
  r + 42,
  36,
  r + 101,
  100,
  46,
  r + 110,
  r + 111,
  6,
  214,
  102,
  7,
  208,
  103,
  8,
  119,
  104,
  14,
  118,
  105,
  21,
  106,
  r + 23,
  26,
  107,
  502,
  37,
  108,
  r + 86,
  38,
  r + 86,
  109,
  39,
  112,
  110,
  48,
  r + 58,
  111,
  50,
  136,
  r + 85,
  40,
  113,
  r + 57,
  41,
  r + 57,
  114,
  42,
  115,
  500,
  48,
  r + 56,
  116,
  52,
  117,
  r + 72,
  65,
  r + 69,
  r + 72,
  21,
  501,
  r + 23,
  9,
  120,
  124,
  10,
  121,
  124,
  11,
  122,
  124,
  12,
  123,
  124,
  13,
  202,
  124,
  14,
  195,
  125,
  20,
  190,
  126,
  21,
  127,
  r + 23,
  23,
  128,
  129,
  24,
  189,
  129,
  26,
  130,
  197,
  37,
  131,
  r + 86,
  38,
  r + 86,
  132,
  39,
  159,
  133,
  48,
  r + 58,
  134,
  50,
  135,
  r + 85,
  51,
  141,
  136,
  55,
  r + 76,
  137,
  59,
  138,
  r + 84,
  60,
  r + 83,
  139,
  61,
  140,
  r + 83,
  63,
  r + 83,
  r + 46,
  55,
  r + 76,
  142,
  59,
  143,
  r + 84,
  60,
  148,
  144,
  61,
  145,
  r + 83,
  62,
  147,
  146,
  63,
  150,
  r + 46,
  63,
  153,
  r + 46,
  61,
  149,
  r + 83,
  62,
  153,
  150,
  64,
  151,
  r + 54,
  66,
  152,
  r + 53,
  70,
  r + 82,
  r + 52,
  64,
  154,
  r + 54,
  66,
  155,
  r + 53,
  70,
  156,
  r + 52,
  71,
  157,
  r + 81,
  73,
  158,
  r + 80,
  74,
  r + 77,
  r + 79,
  40,
  160,
  r + 57,
  41,
  r + 57,
  161,
  42,
  185,
  162,
  48,
  174,
  163,
  49,
  r + 45,
  164,
  51,
  165,
  526,
  60,
  168,
  166,
  62,
  r + 55,
  167,
  63,
  169,
  r + 46,
  62,
  r + 55,
  169,
  64,
  170,
  r + 54,
  66,
  171,
  r + 53,
  69,
  172,
  r + 65,
  70,
  173,
  r + 52,
  72,
  r + 63,
  r + 51,
  49,
  r + 45,
  175,
  51,
  176,
  526,
  60,
  179,
  177,
  62,
  r + 55,
  178,
  63,
  180,
  r + 46,
  62,
  r + 55,
  180,
  64,
  181,
  r + 54,
  66,
  182,
  r + 53,
  68,
  r + 47,
  183,
  70,
  184,
  r + 52,
  72,
  r + 48,
  r + 51,
  48,
  r + 56,
  186,
  52,
  187,
  r + 72,
  65,
  r + 69,
  188,
  67,
  r + 70,
  r + 71,
  25,
  r + 36,
  r + 42,
  21,
  191,
  r + 23,
  25,
  192,
  r + 42,
  30,
  194,
  193,
  46,
  r + 34,
  r + 36,
  46,
  r + 33,
  r + 35,
  21,
  196,
  r + 23,
  26,
  r + 88,
  197,
  28,
  r + 87,
  198,
  34,
  201,
  199,
  35,
  200,
  545,
  36,
  r + 101,
  r + 115,
  46,
  r + 95,
  r + 96,
  17,
  203,
  r + 22,
  20,
  204,
  r + 21,
  21,
  205,
  550,
  33,
  206,
  550,
  44,
  r + 16,
  207,
  45,
  r + 18,
  r + 20,
  8,
  209,
  215,
  16,
  210,
  220,
  18,
  211,
  220,
  19,
  212,
  224,
  20,
  213,
  227,
  21,
  231,
  401,
  8,
  218,
  215,
  19,
  216,
  r + 9,
  20,
  217,
  227,
  21,
  231,
  r + 9,
  16,
  219,
  220,
  18,
  223,
  220,
  19,
  221,
  224,
  20,
  222,
  227,
  21,
  231,
  r + 12,
  19,
  226,
  224,
  20,
  225,
  r + 9,
  21,
  r + 9,
  r + 12,
  20,
  230,
  227,
  21,
  228,
  r + 9,
  30,
  229,
  r + 9,
  34,
  r + 7,
  r + 9,
  21,
  231,
  415,
  30,
  232,
  r + 8,
  34,
  r + 7,
  r + 8,
  4,
  r + 2,
  234,
  5,
  235,
  480,
  6,
  271,
  236,
  7,
  270,
  237,
  8,
  238,
  491,
  9,
  239,
  243,
  10,
  240,
  243,
  11,
  241,
  243,
  12,
  242,
  243,
  13,
  547,
  243,
  14,
  266,
  244,
  20,
  264,
  245,
  26,
  246,
  267,
  37,
  247,
  r + 86,
  38,
  r + 86,
  248,
  39,
  249,
  518,
  40,
  250,
  r + 57,
  41,
  r + 57,
  251,
  42,
  538,
  252,
  48,
  r + 43,
  253,
  49,
  r + 45,
  254,
  51,
  255,
  526,
  60,
  258,
  256,
  62,
  r + 55,
  257,
  63,
  259,
  r + 46,
  62,
  r + 55,
  259,
  64,
  260,
  r + 54,
  66,
  261,
  r + 53,
  69,
  262,
  r + 65,
  70,
  263,
  r + 52,
  72,
  r + 62,
  r + 51,
  25,
  265,
  r + 42,
  46,
  r + 31,
  r + 32,
  26,
  r + 88,
  267,
  28,
  r + 87,
  268,
  34,
  269,
  544,
  46,
  r + 93,
  r + 94,
  8,
  397,
  r + 9,
  8,
  407,
  r + 9,
  3,
  346,
  273,
  4,
  r + 3,
  274,
  5,
  284,
  275,
  8,
  276,
  r + 115,
  15,
  r + 5,
  277,
  16,
  278,
  281,
  18,
  279,
  281,
  19,
  280,
  281,
  22,
  r + 14,
  281,
  35,
  282,
  r + 42,
  36,
  r + 102,
  283,
  46,
  r + 106,
  r + 107,
  6,
  405,
  285,
  7,
  395,
  286,
  8,
  295,
  287,
  14,
  501,
  288,
  26,
  289,
  502,
  37,
  290,
  r + 86,
  38,
  r + 86,
  291,
  39,
  292,
  307,
  40,
  293,
  r + 57,
  41,
  r + 57,
  294,
  42,
  335,
  500,
  9,
  296,
  300,
  10,
  297,
  300,
  11,
  298,
  300,
  12,
  299,
  300,
  13,
  394,
  300,
  14,
  339,
  301,
  15,
  r + 5,
  302,
  20,
  337,
  303,
  26,
  304,
  341,
  37,
  305,
  r + 86,
  38,
  r + 86,
  306,
  39,
  309,
  307,
  48,
  r + 58,
  308,
  50,
  r + 74,
  r + 85,
  40,
  310,
  r + 57,
  41,
  r + 57,
  311,
  42,
  335,
  312,
  48,
  324,
  313,
  49,
  r + 45,
  314,
  51,
  315,
  526,
  60,
  318,
  316,
  62,
  r + 55,
  317,
  63,
  319,
  r + 46,
  62,
  r + 55,
  319,
  64,
  320,
  r + 54,
  66,
  321,
  r + 53,
  69,
  322,
  r + 65,
  70,
  323,
  r + 52,
  72,
  r + 61,
  r + 51,
  49,
  r + 45,
  325,
  51,
  326,
  526,
  60,
  329,
  327,
  62,
  r + 55,
  328,
  63,
  330,
  r + 46,
  62,
  r + 55,
  330,
  64,
  331,
  r + 54,
  66,
  332,
  r + 53,
  68,
  r + 47,
  333,
  70,
  334,
  r + 52,
  72,
  r + 49,
  r + 51,
  48,
  r + 56,
  336,
  52,
  r + 67,
  r + 72,
  25,
  338,
  r + 42,
  46,
  r + 27,
  r + 28,
  15,
  r + 5,
  340,
  26,
  r + 88,
  341,
  28,
  r + 87,
  342,
  34,
  345,
  343,
  35,
  344,
  545,
  36,
  r + 102,
  r + 115,
  46,
  r + 91,
  r + 92,
  4,
  r + 2,
  347,
  5,
  357,
  348,
  8,
  349,
  r + 115,
  15,
  r + 5,
  350,
  16,
  351,
  354,
  18,
  352,
  354,
  19,
  353,
  354,
  22,
  r + 14,
  354,
  35,
  355,
  r + 42,
  36,
  r + 43,
  356,
  46,
  r + 104,
  r + 105,
  6,
  405,
  358,
  7,
  395,
  359,
  8,
  360,
  491,
  9,
  361,
  365,
  10,
  362,
  365,
  11,
  363,
  365,
  12,
  364,
  365,
  13,
  394,
  365,
  14,
  389,
  366,
  15,
  r + 5,
  367,
  20,
  387,
  368,
  26,
  369,
  391,
  37,
  370,
  r + 86,
  38,
  r + 86,
  371,
  39,
  372,
  518,
  40,
  373,
  r + 57,
  41,
  r + 57,
  374,
  42,
  538,
  375,
  48,
  r + 43,
  376,
  49,
  r + 45,
  377,
  51,
  378,
  526,
  60,
  381,
  379,
  62,
  r + 55,
  380,
  63,
  382,
  r + 46,
  62,
  r + 55,
  382,
  64,
  383,
  r + 54,
  66,
  384,
  r + 53,
  69,
  385,
  r + 65,
  70,
  386,
  r + 52,
  72,
  r + 60,
  r + 51,
  25,
  388,
  r + 42,
  46,
  r + 25,
  r + 26,
  15,
  r + 5,
  390,
  26,
  r + 88,
  391,
  28,
  r + 87,
  392,
  34,
  393,
  544,
  46,
  r + 89,
  r + 90,
  15,
  r + 5,
  547,
  8,
  396,
  r + 9,
  15,
  r + 5,
  397,
  16,
  398,
  410,
  18,
  399,
  410,
  19,
  400,
  410,
  20,
  401,
  r + 9,
  27,
  402,
  r + 12,
  29,
  r + 11,
  403,
  31,
  r + 11,
  404,
  32,
  r + 11,
  422,
  8,
  406,
  r + 9,
  15,
  r + 5,
  407,
  16,
  408,
  410,
  18,
  409,
  410,
  19,
  411,
  410,
  20,
  r + 12,
  r + 9,
  20,
  414,
  412,
  22,
  413,
  r + 9,
  34,
  r + 10,
  r + 9,
  22,
  416,
  415,
  27,
  419,
  r + 12,
  27,
  418,
  417,
  34,
  r + 10,
  r + 12,
  34,
  r + 10,
  419,
  43,
  r + 11,
  420,
  47,
  r + 11,
  421,
  53,
  r + 11,
  422,
  54,
  r + 11,
  423,
  56,
  r + 11,
  r + 12,
  2,
  r + 1,
  425,
  3,
  478,
  426,
  4,
  r + 4,
  427,
  5,
  438,
  428,
  8,
  429,
  r + 115,
  16,
  430,
  433,
  18,
  431,
  433,
  19,
  432,
  433,
  22,
  r + 14,
  433,
  35,
  434,
  r + 42,
  36,
  r + 44,
  435,
  46,
  r + 112,
  436,
  57,
  437,
  r + 114,
  58,
  r + 113,
  r + 114,
  6,
  r + 6,
  439,
  7,
  r + 6,
  440,
  8,
  450,
  441,
  14,
  501,
  442,
  26,
  443,
  502,
  37,
  444,
  r + 86,
  38,
  r + 86,
  445,
  39,
  446,
  465,
  40,
  447,
  r + 57,
  41,
  r + 57,
  448,
  42,
  471,
  449,
  48,
  r + 44,
  500,
  9,
  451,
  455,
  10,
  452,
  455,
  11,
  453,
  455,
  12,
  454,
  455,
  13,
  547,
  455,
  14,
  473,
  456,
  15,
  460,
  457,
  20,
  458,
  461,
  25,
  459,
  r + 42,
  46,
  r + 37,
  r + 38,
  20,
  540,
  461,
  26,
  462,
  474,
  37,
  463,
  r + 86,
  38,
  r + 86,
  464,
  39,
  467,
  465,
  48,
  r + 58,
  466,
  50,
  r + 75,
  r + 85,
  40,
  468,
  r + 57,
  41,
  r + 57,
  469,
  42,
  471,
  470,
  48,
  r + 44,
  524,
  48,
  r + 44,
  472,
  52,
  r + 68,
  r + 72,
  26,
  r + 88,
  474,
  28,
  r + 87,
  475,
  34,
  r + 100,
  476,
  35,
  477,
  545,
  36,
  r + 44,
  r + 115,
  4,
  r + 2,
  479,
  5,
  488,
  480,
  8,
  481,
  r + 115,
  16,
  482,
  485,
  18,
  483,
  485,
  19,
  484,
  485,
  22,
  r + 14,
  485,
  35,
  486,
  r + 42,
  36,
  r + 43,
  487,
  46,
  r + 108,
  r + 109,
  6,
  r + 6,
  489,
  7,
  r + 6,
  490,
  8,
  503,
  491,
  14,
  501,
  492,
  26,
  493,
  502,
  37,
  494,
  r + 86,
  38,
  r + 86,
  495,
  39,
  496,
  518,
  40,
  497,
  r + 57,
  41,
  r + 57,
  498,
  42,
  538,
  499,
  48,
  r + 43,
  500,
  49,
  r + 45,
  526,
  26,
  r + 88,
  502,
  28,
  r + 87,
  r + 115,
  9,
  504,
  508,
  10,
  505,
  508,
  11,
  506,
  508,
  12,
  507,
  508,
  13,
  547,
  508,
  14,
  541,
  509,
  15,
  513,
  510,
  20,
  511,
  514,
  25,
  512,
  r + 42,
  46,
  r + 29,
  r + 30,
  20,
  540,
  514,
  26,
  515,
  542,
  37,
  516,
  r + 86,
  38,
  r + 86,
  517,
  39,
  520,
  518,
  48,
  r + 58,
  519,
  50,
  r + 73,
  r + 85,
  40,
  521,
  r + 57,
  41,
  r + 57,
  522,
  42,
  538,
  523,
  48,
  r + 43,
  524,
  49,
  r + 45,
  525,
  51,
  529,
  526,
  60,
  r + 55,
  527,
  62,
  r + 55,
  528,
  63,
  r + 55,
  r + 46,
  60,
  532,
  530,
  62,
  r + 55,
  531,
  63,
  533,
  r + 46,
  62,
  r + 55,
  533,
  64,
  534,
  r + 54,
  66,
  535,
  r + 53,
  69,
  536,
  r + 65,
  70,
  537,
  r + 52,
  72,
  r + 59,
  r + 51,
  48,
  r + 43,
  539,
  52,
  r + 66,
  r + 72,
  25,
  r + 24,
  r + 42,
  26,
  r + 88,
  542,
  28,
  r + 87,
  543,
  34,
  r + 100,
  544,
  35,
  546,
  545,
  36,
  r + 42,
  r + 115,
  36,
  r + 43,
  r + 115,
  17,
  548,
  r + 22,
  20,
  549,
  r + 21,
  33,
  552,
  550,
  44,
  r + 17,
  551,
  45,
  r + 19,
  r + 20,
  44,
  r + 15,
  553,
  45,
  r + 15,
  r + 20
]);
var bdd = BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/endpointResolver.js
var cache = new EndpointCache({
  size: 50,
  params: [
    "Accelerate",
    "Bucket",
    "DisableAccessPoints",
    "DisableMultiRegionAccessPoints",
    "DisableS3ExpressSessionAuth",
    "Endpoint",
    "ForcePathStyle",
    "Region",
    "UseArnRegion",
    "UseDualStack",
    "UseFIPS",
    "UseGlobalEndpoint",
    "UseObjectLambdaEndpoint",
    "UseS3ExpressControlEndpoint"
  ]
});
var defaultEndpointResolver = (endpointParams, context = {}) => {
  return cache.get(endpointParams, () => decideEndpoint(bdd, {
    endpointParams,
    logger: context.logger
  }));
};
customEndpointFunctions.aws = awsEndpointFunctions;

// node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthSchemeProvider.js
var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
  if (!input) {
    throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
  }
  const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
  const instructionsFn = getSmithyContext(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
  if (!instructionsFn) {
    throw new Error(`getEndpointParameterInstructions() is not defined on '${context.commandName}'`);
  }
  const endpointParameters = await resolveParams(input, { getEndpointParameterInstructions: instructionsFn }, config);
  return Object.assign(defaultParameters, endpointParameters);
};
var _defaultS3HttpAuthSchemeParametersProvider = async (config, context, input) => {
  return {
    operation: getSmithyContext(context).operation,
    region: await normalizeProvider(config.region)() || (() => {
      throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
    })()
  };
};
var defaultS3HttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultS3HttpAuthSchemeParametersProvider);
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "s3",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
function createAwsAuthSigv4aHttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4a",
    signingProperties: {
      name: "s3",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
var createEndpointRuleSetHttpAuthSchemeProvider = (defaultEndpointResolver2, defaultHttpAuthSchemeResolver, createHttpAuthOptionFunctions) => {
  const endpointRuleSetHttpAuthSchemeProvider = (authParameters) => {
    const endpoint = defaultEndpointResolver2(authParameters);
    const authSchemes = endpoint.properties?.authSchemes;
    if (!authSchemes) {
      return defaultHttpAuthSchemeResolver(authParameters);
    }
    const options = [];
    for (const scheme of authSchemes) {
      const { name: resolvedName, properties = {}, ...rest } = scheme;
      const name = resolvedName.toLowerCase();
      if (resolvedName !== name) {
        console.warn(`HttpAuthScheme has been normalized with lowercasing: '${resolvedName}' to '${name}'`);
      }
      let schemeId;
      if (name === "sigv4a") {
        schemeId = "aws.auth#sigv4a";
        const sigv4Present = authSchemes.find((s2) => {
          const name2 = s2.name.toLowerCase();
          return name2 !== "sigv4a" && name2.startsWith("sigv4");
        });
        if (SignatureV4MultiRegion.sigv4aDependency() === "none" && sigv4Present) {
          continue;
        }
      } else if (name.startsWith("sigv4")) {
        schemeId = "aws.auth#sigv4";
      } else {
        throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${name}'`);
      }
      const createOption = createHttpAuthOptionFunctions[schemeId];
      if (!createOption) {
        throw new Error(`Could not find HttpAuthOption create function for '${schemeId}'`);
      }
      const option = createOption(authParameters);
      option.schemeId = schemeId;
      option.signingProperties = { ...option.signingProperties || {}, ...rest, ...properties };
      options.push(option);
    }
    return options;
  };
  return endpointRuleSetHttpAuthSchemeProvider;
};
var _defaultS3HttpAuthSchemeProvider = (authParameters) => {
  const options = [];
  switch (authParameters.operation) {
    default: {
      options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
    }
  }
  return options;
};
var defaultS3HttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(defaultEndpointResolver, _defaultS3HttpAuthSchemeProvider, {
  "aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
  "aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption
});
var resolveHttpAuthSchemeConfig = (config) => {
  const config_0 = resolveAwsSdkSigV4Config(config);
  const config_1 = resolveAwsSdkSigV4AConfig(config_0);
  return Object.assign(config_1, {
    authSchemePreference: normalizeProvider(config.authSchemePreference ?? [])
  });
};

// node_modules/@aws-sdk/client-s3/dist-es/commandBuilder.js
init_index_browser();

// node_modules/@aws-sdk/client-s3/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters = (options) => {
  return Object.assign(options, {
    useFipsEndpoint: options.useFipsEndpoint ?? false,
    useDualstackEndpoint: options.useDualstackEndpoint ?? false,
    forcePathStyle: options.forcePathStyle ?? false,
    useAccelerateEndpoint: options.useAccelerateEndpoint ?? false,
    useGlobalEndpoint: options.useGlobalEndpoint ?? false,
    disableMultiregionAccessPoints: options.disableMultiregionAccessPoints ?? false,
    defaultSigningName: "s3",
    clientContextParams: options.clientContextParams ?? {}
  });
};
var commonParams = {
  ForcePathStyle: { type: "clientContextParams", name: "forcePathStyle" },
  UseArnRegion: { type: "clientContextParams", name: "useArnRegion" },
  DisableMultiRegionAccessPoints: { type: "clientContextParams", name: "disableMultiregionAccessPoints" },
  Accelerate: { type: "clientContextParams", name: "useAccelerateEndpoint" },
  DisableS3ExpressSessionAuth: { type: "clientContextParams", name: "disableS3ExpressSessionAuth" },
  UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
  UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
  Endpoint: { type: "builtInParams", name: "endpoint" },
  Region: { type: "builtInParams", name: "region" },
  UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
};

// node_modules/@aws-sdk/client-s3/dist-es/commandBuilder.js
var command = makeBuilder(commonParams, "AmazonS3", "S3Client", getEndpointPlugin);
var _ep0 = {
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
};
var _ep4 = {
  DisableS3ExpressSessionAuth: { type: "staticContextParams", value: true },
  Bucket: { type: "contextParams", name: "Bucket" }
};
var _ep5 = {
  Bucket: { type: "contextParams", name: "Bucket" }
};
var _mw0 = (Command2, cs, config, o2) => [
  getThrow200ExceptionsPlugin(config)
];
var _mw8 = (Command2, cs, config, o2) => [
  getThrow200ExceptionsPlugin(config),
  getSsecPlugin(config),
  getS3ExpiresMiddlewarePlugin(config)
];
var _mw11 = (Command2, cs, config, o2) => [
  getFlexibleChecksumsPlugin(config, {
    requestAlgorithmMember: { "httpHeader": "x-amz-sdk-checksum-algorithm", "name": "ChecksumAlgorithm" },
    requestChecksumRequired: false
  }),
  getCheckContentLengthHeaderPlugin(config),
  getThrow200ExceptionsPlugin(config),
  getSsecPlugin(config)
];

// node_modules/@aws-sdk/client-s3/dist-es/schemas/schemas_0.js
init_schema();

// node_modules/@aws-sdk/client-s3/dist-es/models/S3ServiceException.js
var S3ServiceException = class _S3ServiceException extends ServiceException {
  constructor(options) {
    super(options);
    Object.setPrototypeOf(this, _S3ServiceException.prototype);
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/models/errors.js
var NoSuchUpload = class _NoSuchUpload extends S3ServiceException {
  name = "NoSuchUpload";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchUpload",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchUpload.prototype);
  }
};
var AccessDenied = class _AccessDenied extends S3ServiceException {
  name = "AccessDenied";
  $fault = "client";
  constructor(opts) {
    super({
      name: "AccessDenied",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AccessDenied.prototype);
  }
};
var ObjectNotInActiveTierError = class _ObjectNotInActiveTierError extends S3ServiceException {
  name = "ObjectNotInActiveTierError";
  $fault = "client";
  constructor(opts) {
    super({
      name: "ObjectNotInActiveTierError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ObjectNotInActiveTierError.prototype);
  }
};
var BucketAlreadyExists = class _BucketAlreadyExists extends S3ServiceException {
  name = "BucketAlreadyExists";
  $fault = "client";
  constructor(opts) {
    super({
      name: "BucketAlreadyExists",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _BucketAlreadyExists.prototype);
  }
};
var BucketAlreadyOwnedByYou = class _BucketAlreadyOwnedByYou extends S3ServiceException {
  name = "BucketAlreadyOwnedByYou";
  $fault = "client";
  constructor(opts) {
    super({
      name: "BucketAlreadyOwnedByYou",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _BucketAlreadyOwnedByYou.prototype);
  }
};
var NoSuchBucket = class _NoSuchBucket extends S3ServiceException {
  name = "NoSuchBucket";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchBucket",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchBucket.prototype);
  }
};
var NoSuchKey = class _NoSuchKey extends S3ServiceException {
  name = "NoSuchKey";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchKey",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchKey.prototype);
  }
};
var InvalidObjectState = class _InvalidObjectState extends S3ServiceException {
  name = "InvalidObjectState";
  $fault = "client";
  StorageClass;
  AccessTier;
  constructor(opts) {
    super({
      name: "InvalidObjectState",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidObjectState.prototype);
    this.StorageClass = opts.StorageClass;
    this.AccessTier = opts.AccessTier;
  }
};
var NoSuchAnnotation = class _NoSuchAnnotation extends S3ServiceException {
  name = "NoSuchAnnotation";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NoSuchAnnotation",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NoSuchAnnotation.prototype);
  }
};
var NotFound = class _NotFound extends S3ServiceException {
  name = "NotFound";
  $fault = "client";
  constructor(opts) {
    super({
      name: "NotFound",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _NotFound.prototype);
  }
};
var InvalidPrefix = class _InvalidPrefix extends S3ServiceException {
  name = "InvalidPrefix";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidPrefix",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidPrefix.prototype);
  }
};
var EncryptionTypeMismatch = class _EncryptionTypeMismatch extends S3ServiceException {
  name = "EncryptionTypeMismatch";
  $fault = "client";
  constructor(opts) {
    super({
      name: "EncryptionTypeMismatch",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _EncryptionTypeMismatch.prototype);
  }
};
var InvalidRequest = class _InvalidRequest extends S3ServiceException {
  name = "InvalidRequest";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidRequest",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidRequest.prototype);
  }
};
var InvalidWriteOffset = class _InvalidWriteOffset extends S3ServiceException {
  name = "InvalidWriteOffset";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidWriteOffset",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidWriteOffset.prototype);
  }
};
var TooManyParts = class _TooManyParts extends S3ServiceException {
  name = "TooManyParts";
  $fault = "client";
  constructor(opts) {
    super({
      name: "TooManyParts",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _TooManyParts.prototype);
  }
};
var AnnotationLimitExceeded = class _AnnotationLimitExceeded extends S3ServiceException {
  name = "AnnotationLimitExceeded";
  $fault = "client";
  constructor(opts) {
    super({
      name: "AnnotationLimitExceeded",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AnnotationLimitExceeded.prototype);
  }
};
var AnnotationNameTooLong = class _AnnotationNameTooLong extends S3ServiceException {
  name = "AnnotationNameTooLong";
  $fault = "client";
  constructor(opts) {
    super({
      name: "AnnotationNameTooLong",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _AnnotationNameTooLong.prototype);
  }
};
var InvalidAnnotationName = class _InvalidAnnotationName extends S3ServiceException {
  name = "InvalidAnnotationName";
  $fault = "client";
  constructor(opts) {
    super({
      name: "InvalidAnnotationName",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _InvalidAnnotationName.prototype);
  }
};
var UnsupportedMediaType = class _UnsupportedMediaType extends S3ServiceException {
  name = "UnsupportedMediaType";
  $fault = "client";
  constructor(opts) {
    super({
      name: "UnsupportedMediaType",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _UnsupportedMediaType.prototype);
  }
};
var IdempotencyParameterMismatch = class _IdempotencyParameterMismatch extends S3ServiceException {
  name = "IdempotencyParameterMismatch";
  $fault = "client";
  constructor(opts) {
    super({
      name: "IdempotencyParameterMismatch",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _IdempotencyParameterMismatch.prototype);
  }
};
var ObjectAlreadyInActiveTierError = class _ObjectAlreadyInActiveTierError extends S3ServiceException {
  name = "ObjectAlreadyInActiveTierError";
  $fault = "client";
  constructor(opts) {
    super({
      name: "ObjectAlreadyInActiveTierError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, _ObjectAlreadyInActiveTierError.prototype);
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/schemas/schemas_0.js
var _A = "Account";
var _AAO = "AnalyticsAndOperator";
var _AC = "AccelerateConfiguration";
var _ACL = "AccessControlList";
var _ACL_ = "ACL";
var _ACLn = "AnalyticsConfigurationList";
var _ACP = "AccessControlPolicy";
var _ACT = "AccessControlTranslation";
var _ACn = "AnalyticsConfiguration";
var _ACnn = "AnnotationCount";
var _AD = "AccessDenied";
var _ADb = "AbortDate";
var _ADn = "AnnotationDirective";
var _AE = "AnnotationEntry";
var _AED = "AnalyticsExportDestination";
var _AF = "AnalyticsFilter";
var _AH = "AllowedHeaders";
var _AHl = "AllowedHeader";
var _AI = "AccountId";
var _AIMU = "AbortIncompleteMultipartUpload";
var _AKI = "AccessKeyId";
var _AL = "AnnotationList";
var _ALE = "AnnotationLimitExceeded";
var _AM = "AllowedMethods";
var _AMU = "AbortMultipartUpload";
var _AMUO = "AbortMultipartUploadOutput";
var _AMUR = "AbortMultipartUploadRequest";
var _AMl = "AllowedMethod";
var _AN = "AnnotationName";
var _ANTL = "AnnotationNameTooLong";
var _AO = "AllowedOrigins";
var _AOl = "AllowedOrigin";
var _AP = "AnnotationPayload";
var _APA = "AccessPointAlias";
var _APAc = "AccessPointArn";
var _APn = "AnnotationPrefix";
var _AQRD = "AllowQuotedRecordDelimiter";
var _AR = "AcceptRanges";
var _ARI = "AbortRuleId";
var _AS = "AbacStatus";
var _ASBD = "AnalyticsS3BucketDestination";
var _ASSEBD = "ApplyServerSideEncryptionByDefault";
var _ASr = "ArchiveStatus";
var _AT = "AccessTier";
var _ATC = "AnnotationTableConfiguration";
var _ATCR = "AnnotationTableConfigurationResult";
var _ATCU = "AnnotationTableConfigurationUpdates";
var _An = "And";
var _Ann = "Annotations";
var _B = "Bucket";
var _BA = "BucketArn";
var _BAE = "BucketAlreadyExists";
var _BAI = "BucketAccountId";
var _BAOBY = "BucketAlreadyOwnedByYou";
var _BET = "BlockedEncryptionTypes";
var _BGR = "BypassGovernanceRetention";
var _BI = "BucketInfo";
var _BKE = "BucketKeyEnabled";
var _BLC = "BucketLifecycleConfiguration";
var _BLN = "BucketLocationName";
var _BLS = "BucketLoggingStatus";
var _BLT = "BucketLocationType";
var _BN = "BucketNamespace";
var _BNu = "BucketName";
var _BP = "BytesProcessed";
var _BPA = "BlockPublicAcls";
var _BPP = "BlockPublicPolicy";
var _BR = "BucketRegion";
var _BRy = "BytesReturned";
var _BS = "BytesScanned";
var _Bo = "Body";
var _Bu = "Buckets";
var _C = "Checksum";
var _CA = "ChecksumAlgorithm";
var _CACL = "CannedACL";
var _CB = "CreateBucket";
var _CBC = "CreateBucketConfiguration";
var _CBMC = "CreateBucketMetadataConfiguration";
var _CBMCR = "CreateBucketMetadataConfigurationRequest";
var _CBMTC = "CreateBucketMetadataTableConfiguration";
var _CBMTCR = "CreateBucketMetadataTableConfigurationRequest";
var _CBO = "CreateBucketOutput";
var _CBR = "CreateBucketRequest";
var _CC = "CacheControl";
var _CCRC = "ChecksumCRC32";
var _CCRCC = "ChecksumCRC32C";
var _CCRCNVME = "ChecksumCRC64NVME";
var _CC_ = "Cache-Control";
var _CD = "CreationDate";
var _CD_ = "Content-Disposition";
var _CDo = "ContentDisposition";
var _CE = "ContinuationEvent";
var _CE_ = "Content-Encoding";
var _CEo = "ContentEncoding";
var _CF = "CloudFunction";
var _CFC = "CloudFunctionConfiguration";
var _CL = "ContentLanguage";
var _CL_ = "Content-Language";
var _CL__ = "Content-Length";
var _CLo = "ContentLength";
var _CM = "Content-MD5";
var _CMD = "ChecksumMD5";
var _CMDo = "ContentMD5";
var _CMU = "CompletedMultipartUpload";
var _CMUO = "CompleteMultipartUploadOutput";
var _CMUOr = "CreateMultipartUploadOutput";
var _CMUR = "CompleteMultipartUploadResult";
var _CMURo = "CompleteMultipartUploadRequest";
var _CMURr = "CreateMultipartUploadRequest";
var _CMUo = "CompleteMultipartUpload";
var _CMUr = "CreateMultipartUpload";
var _CMh = "ChecksumMode";
var _CO = "CopyObject";
var _COO = "CopyObjectOutput";
var _COR = "CopyObjectResult";
var _CORSC = "CORSConfiguration";
var _CORSR = "CORSRules";
var _CORSRu = "CORSRule";
var _CORo = "CopyObjectRequest";
var _CP = "CommonPrefix";
var _CPL = "CommonPrefixList";
var _CPLo = "CompletedPartList";
var _CPR = "CopyPartResult";
var _CPo = "CompletedPart";
var _CPom = "CommonPrefixes";
var _CR = "ContentRange";
var _CRSBA = "ConfirmRemoveSelfBucketAccess";
var _CR_ = "Content-Range";
var _CS = "ConfigurationState";
var _CSHA = "ChecksumSHA1";
var _CSHAh = "ChecksumSHA256";
var _CSHAhe = "ChecksumSHA512";
var _CSIM = "CopySourceIfMatch";
var _CSIMS = "CopySourceIfModifiedSince";
var _CSINM = "CopySourceIfNoneMatch";
var _CSIUS = "CopySourceIfUnmodifiedSince";
var _CSO = "CreateSessionOutput";
var _CSR = "CreateSessionResult";
var _CSRo = "CopySourceRange";
var _CSRr = "CreateSessionRequest";
var _CSSSECA = "CopySourceSSECustomerAlgorithm";
var _CSSSECK = "CopySourceSSECustomerKey";
var _CSSSECKMD = "CopySourceSSECustomerKeyMD5";
var _CSV = "CSV";
var _CSVI = "CopySourceVersionId";
var _CSVIn = "CSVInput";
var _CSVO = "CSVOutput";
var _CSo = "CopySource";
var _CSr = "CreateSession";
var _CT = "ChecksumType";
var _CT_ = "Content-Type";
var _CTl = "ClientToken";
var _CTo = "ContentType";
var _CTom = "CompressionType";
var _CTon = "ContinuationToken";
var _CXXHASH = "ChecksumXXHASH64";
var _CXXHASHh = "ChecksumXXHASH3";
var _CXXHASHhe = "ChecksumXXHASH128";
var _Co = "Condition";
var _Cod = "Code";
var _Com = "Comments";
var _Con = "Contents";
var _Cont = "Cont";
var _Cr = "Credentials";
var _D = "Days";
var _DAI = "DaysAfterInitiation";
var _DB = "DeleteBucket";
var _DBAC = "DeleteBucketAnalyticsConfiguration";
var _DBACR = "DeleteBucketAnalyticsConfigurationRequest";
var _DBC = "DeleteBucketCors";
var _DBCR = "DeleteBucketCorsRequest";
var _DBE = "DeleteBucketEncryption";
var _DBER = "DeleteBucketEncryptionRequest";
var _DBIC = "DeleteBucketInventoryConfiguration";
var _DBICR = "DeleteBucketInventoryConfigurationRequest";
var _DBITC = "DeleteBucketIntelligentTieringConfiguration";
var _DBITCR = "DeleteBucketIntelligentTieringConfigurationRequest";
var _DBL = "DeleteBucketLifecycle";
var _DBLR = "DeleteBucketLifecycleRequest";
var _DBMC = "DeleteBucketMetadataConfiguration";
var _DBMCR = "DeleteBucketMetadataConfigurationRequest";
var _DBMCRe = "DeleteBucketMetricsConfigurationRequest";
var _DBMCe = "DeleteBucketMetricsConfiguration";
var _DBMTC = "DeleteBucketMetadataTableConfiguration";
var _DBMTCR = "DeleteBucketMetadataTableConfigurationRequest";
var _DBOC = "DeleteBucketOwnershipControls";
var _DBOCR = "DeleteBucketOwnershipControlsRequest";
var _DBP = "DeleteBucketPolicy";
var _DBPR = "DeleteBucketPolicyRequest";
var _DBR = "DeleteBucketRequest";
var _DBRR = "DeleteBucketReplicationRequest";
var _DBRe = "DeleteBucketReplication";
var _DBT = "DeleteBucketTagging";
var _DBTR = "DeleteBucketTaggingRequest";
var _DBW = "DeleteBucketWebsite";
var _DBWR = "DeleteBucketWebsiteRequest";
var _DE = "DataExport";
var _DIM = "DestinationIfMatch";
var _DIMS = "DestinationIfModifiedSince";
var _DINM = "DestinationIfNoneMatch";
var _DIUS = "DestinationIfUnmodifiedSince";
var _DM = "DeleteMarker";
var _DME = "DeleteMarkerEntry";
var _DMR = "DeleteMarkerReplication";
var _DMVI = "DeleteMarkerVersionId";
var _DMe = "DeleteMarkers";
var _DN = "DisplayName";
var _DO = "DeletedObject";
var _DOA = "DeleteObjectAnnotation";
var _DOAO = "DeleteObjectAnnotationOutput";
var _DOAR = "DeleteObjectAnnotationRequest";
var _DOO = "DeleteObjectOutput";
var _DOOe = "DeleteObjectsOutput";
var _DOR = "DeleteObjectRequest";
var _DORe = "DeleteObjectsRequest";
var _DOT = "DeleteObjectTagging";
var _DOTO = "DeleteObjectTaggingOutput";
var _DOTR = "DeleteObjectTaggingRequest";
var _DOe = "DeletedObjects";
var _DOel = "DeleteObject";
var _DOele = "DeleteObjects";
var _DPAB = "DeletePublicAccessBlock";
var _DPABR = "DeletePublicAccessBlockRequest";
var _DR = "DataRedundancy";
var _DRe = "DefaultRetention";
var _DRel = "DeleteResult";
var _DRes = "DestinationResult";
var _Da = "Date";
var _De = "Delete";
var _Del = "Deleted";
var _Deli = "Delimiter";
var _Des = "Destination";
var _Desc = "Description";
var _Det = "Details";
var _E = "Error";
var _EA = "EmailAddress";
var _EBC = "EventBridgeConfiguration";
var _EBO = "ExpectedBucketOwner";
var _EC = "EncryptionConfiguration";
var _ECr = "ErrorCode";
var _ED = "ErrorDetails";
var _EDr = "ErrorDocument";
var _EE = "EndEvent";
var _EH = "ExposeHeaders";
var _EHx = "ExposeHeader";
var _EM = "ErrorMessage";
var _EODM = "ExpiredObjectDeleteMarker";
var _EOR = "ExistingObjectReplication";
var _ES = "ExpiresString";
var _ESBO = "ExpectedSourceBucketOwner";
var _ET = "ETag";
var _ETL = "EncryptionTypeList";
var _ETM = "EncryptionTypeMismatch";
var _ETn = "EncryptionType";
var _ETnc = "EncodingType";
var _ETv = "EventThreshold";
var _ETx = "ExpressionType";
var _En = "Encryption";
var _Ena = "Enabled";
var _End = "End";
var _Er = "Errors";
var _Ev = "Events";
var _Eve = "Event";
var _Ex = "Expiration";
var _Exp = "Expires";
var _Expr = "Expression";
var _F = "Filter";
var _FD = "FieldDelimiter";
var _FHI = "FileHeaderInfo";
var _FO = "FetchOwner";
var _FR = "FilterRule";
var _FRL = "FilterRuleList";
var _FRi = "FilterRules";
var _Fi = "Field";
var _Fo = "Format";
var _Fr = "Frequency";
var _G = "Grants";
var _GBA = "GetBucketAbac";
var _GBAC = "GetBucketAccelerateConfiguration";
var _GBACO = "GetBucketAccelerateConfigurationOutput";
var _GBACOe = "GetBucketAnalyticsConfigurationOutput";
var _GBACR = "GetBucketAccelerateConfigurationRequest";
var _GBACRe = "GetBucketAnalyticsConfigurationRequest";
var _GBACe = "GetBucketAnalyticsConfiguration";
var _GBAO = "GetBucketAbacOutput";
var _GBAOe = "GetBucketAclOutput";
var _GBAR = "GetBucketAbacRequest";
var _GBARe = "GetBucketAclRequest";
var _GBAe = "GetBucketAcl";
var _GBC = "GetBucketCors";
var _GBCO = "GetBucketCorsOutput";
var _GBCR = "GetBucketCorsRequest";
var _GBE = "GetBucketEncryption";
var _GBEO = "GetBucketEncryptionOutput";
var _GBER = "GetBucketEncryptionRequest";
var _GBIC = "GetBucketInventoryConfiguration";
var _GBICO = "GetBucketInventoryConfigurationOutput";
var _GBICR = "GetBucketInventoryConfigurationRequest";
var _GBITC = "GetBucketIntelligentTieringConfiguration";
var _GBITCO = "GetBucketIntelligentTieringConfigurationOutput";
var _GBITCR = "GetBucketIntelligentTieringConfigurationRequest";
var _GBL = "GetBucketLocation";
var _GBLC = "GetBucketLifecycleConfiguration";
var _GBLCO = "GetBucketLifecycleConfigurationOutput";
var _GBLCR = "GetBucketLifecycleConfigurationRequest";
var _GBLO = "GetBucketLocationOutput";
var _GBLOe = "GetBucketLoggingOutput";
var _GBLR = "GetBucketLocationRequest";
var _GBLRe = "GetBucketLoggingRequest";
var _GBLe = "GetBucketLogging";
var _GBMC = "GetBucketMetadataConfiguration";
var _GBMCO = "GetBucketMetadataConfigurationOutput";
var _GBMCOe = "GetBucketMetricsConfigurationOutput";
var _GBMCR = "GetBucketMetadataConfigurationResult";
var _GBMCRe = "GetBucketMetadataConfigurationRequest";
var _GBMCRet = "GetBucketMetricsConfigurationRequest";
var _GBMCe = "GetBucketMetricsConfiguration";
var _GBMTC = "GetBucketMetadataTableConfiguration";
var _GBMTCO = "GetBucketMetadataTableConfigurationOutput";
var _GBMTCR = "GetBucketMetadataTableConfigurationResult";
var _GBMTCRe = "GetBucketMetadataTableConfigurationRequest";
var _GBNC = "GetBucketNotificationConfiguration";
var _GBNCR = "GetBucketNotificationConfigurationRequest";
var _GBOC = "GetBucketOwnershipControls";
var _GBOCO = "GetBucketOwnershipControlsOutput";
var _GBOCR = "GetBucketOwnershipControlsRequest";
var _GBP = "GetBucketPolicy";
var _GBPO = "GetBucketPolicyOutput";
var _GBPR = "GetBucketPolicyRequest";
var _GBPS = "GetBucketPolicyStatus";
var _GBPSO = "GetBucketPolicyStatusOutput";
var _GBPSR = "GetBucketPolicyStatusRequest";
var _GBR = "GetBucketReplication";
var _GBRO = "GetBucketReplicationOutput";
var _GBRP = "GetBucketRequestPayment";
var _GBRPO = "GetBucketRequestPaymentOutput";
var _GBRPR = "GetBucketRequestPaymentRequest";
var _GBRR = "GetBucketReplicationRequest";
var _GBT = "GetBucketTagging";
var _GBTO = "GetBucketTaggingOutput";
var _GBTR = "GetBucketTaggingRequest";
var _GBV = "GetBucketVersioning";
var _GBVO = "GetBucketVersioningOutput";
var _GBVR = "GetBucketVersioningRequest";
var _GBW = "GetBucketWebsite";
var _GBWO = "GetBucketWebsiteOutput";
var _GBWR = "GetBucketWebsiteRequest";
var _GFC = "GrantFullControl";
var _GJP = "GlacierJobParameters";
var _GO = "GetObject";
var _GOA = "GetObjectAcl";
var _GOAO = "GetObjectAclOutput";
var _GOAOe = "GetObjectAnnotationOutput";
var _GOAOet = "GetObjectAttributesOutput";
var _GOAP = "GetObjectAttributesParts";
var _GOAR = "GetObjectAclRequest";
var _GOARe = "GetObjectAnnotationRequest";
var _GOARet = "GetObjectAttributesResponse";
var _GOARetb = "GetObjectAttributesRequest";
var _GOAe = "GetObjectAnnotation";
var _GOAet = "GetObjectAttributes";
var _GOLC = "GetObjectLockConfiguration";
var _GOLCO = "GetObjectLockConfigurationOutput";
var _GOLCR = "GetObjectLockConfigurationRequest";
var _GOLH = "GetObjectLegalHold";
var _GOLHO = "GetObjectLegalHoldOutput";
var _GOLHR = "GetObjectLegalHoldRequest";
var _GOO = "GetObjectOutput";
var _GOR = "GetObjectRequest";
var _GORO = "GetObjectRetentionOutput";
var _GORR = "GetObjectRetentionRequest";
var _GORe = "GetObjectRetention";
var _GOT = "GetObjectTagging";
var _GOTO = "GetObjectTaggingOutput";
var _GOTOe = "GetObjectTorrentOutput";
var _GOTR = "GetObjectTaggingRequest";
var _GOTRe = "GetObjectTorrentRequest";
var _GOTe = "GetObjectTorrent";
var _GPAB = "GetPublicAccessBlock";
var _GPABO = "GetPublicAccessBlockOutput";
var _GPABR = "GetPublicAccessBlockRequest";
var _GR = "GrantRead";
var _GRACP = "GrantReadACP";
var _GW = "GrantWrite";
var _GWACP = "GrantWriteACP";
var _Gr = "Grant";
var _Gra = "Grantee";
var _HB = "HeadBucket";
var _HBO = "HeadBucketOutput";
var _HBR = "HeadBucketRequest";
var _HECRE = "HttpErrorCodeReturnedEquals";
var _HN = "HostName";
var _HO = "HeadObject";
var _HOO = "HeadObjectOutput";
var _HOR = "HeadObjectRequest";
var _HRC = "HttpRedirectCode";
var _I = "Id";
var _IAN = "InvalidAnnotationName";
var _IC = "InventoryConfiguration";
var _ICL = "InventoryConfigurationList";
var _ID = "ID";
var _IDn = "IndexDocument";
var _IDnv = "InventoryDestination";
var _IE = "IsEnabled";
var _IEn = "InventoryEncryption";
var _IF = "InventoryFilter";
var _IL = "IsLatest";
var _IM = "IfMatch";
var _IMIT = "IfMatchInitiatedTime";
var _IMLMT = "IfMatchLastModifiedTime";
var _IMS = "IfMatchSize";
var _IMS_ = "If-Modified-Since";
var _IMSf = "IfModifiedSince";
var _IMUR = "InitiateMultipartUploadResult";
var _IM_ = "If-Match";
var _INM = "IfNoneMatch";
var _INM_ = "If-None-Match";
var _IOF = "InventoryOptionalFields";
var _IOS = "InvalidObjectState";
var _IOV = "IncludedObjectVersions";
var _IP = "InvalidPrefix";
var _IPA = "IgnorePublicAcls";
var _IPM = "IdempotencyParameterMismatch";
var _IPs = "IsPublic";
var _IR = "InvalidRequest";
var _IRIP = "IsRestoreInProgress";
var _IS = "InputSerialization";
var _ISBD = "InventoryS3BucketDestination";
var _ISn = "InventorySchedule";
var _IT = "IsTruncated";
var _ITAO = "IntelligentTieringAndOperator";
var _ITC = "IntelligentTieringConfiguration";
var _ITCL = "IntelligentTieringConfigurationList";
var _ITCR = "InventoryTableConfigurationResult";
var _ITCU = "InventoryTableConfigurationUpdates";
var _ITCn = "InventoryTableConfiguration";
var _ITF = "IntelligentTieringFilter";
var _IUS = "IfUnmodifiedSince";
var _IUS_ = "If-Unmodified-Since";
var _IWO = "InvalidWriteOffset";
var _In = "Initiator";
var _Ini = "Initiated";
var _JSON = "JSON";
var _JSONI = "JSONInput";
var _JSONO = "JSONOutput";
var _JTC = "JournalTableConfiguration";
var _JTCR = "JournalTableConfigurationResult";
var _JTCU = "JournalTableConfigurationUpdates";
var _K = "Key";
var _KC = "KeyCount";
var _KI = "KeyId";
var _KKA = "KmsKeyArn";
var _KM = "KeyMarker";
var _KMSC = "KMSContext";
var _KMSKA = "KMSKeyArn";
var _KMSKI = "KMSKeyId";
var _KMSMKID = "KMSMasterKeyID";
var _KPE = "KeyPrefixEquals";
var _L = "Location";
var _LAMBR = "ListAllMyBucketsResult";
var _LAMDBR = "ListAllMyDirectoryBucketsResult";
var _LB = "ListBuckets";
var _LBAC = "ListBucketAnalyticsConfigurations";
var _LBACO = "ListBucketAnalyticsConfigurationsOutput";
var _LBACR = "ListBucketAnalyticsConfigurationResult";
var _LBACRi = "ListBucketAnalyticsConfigurationsRequest";
var _LBIC = "ListBucketInventoryConfigurations";
var _LBICO = "ListBucketInventoryConfigurationsOutput";
var _LBICR = "ListBucketInventoryConfigurationsRequest";
var _LBITC = "ListBucketIntelligentTieringConfigurations";
var _LBITCO = "ListBucketIntelligentTieringConfigurationsOutput";
var _LBITCR = "ListBucketIntelligentTieringConfigurationsRequest";
var _LBMC = "ListBucketMetricsConfigurations";
var _LBMCO = "ListBucketMetricsConfigurationsOutput";
var _LBMCR = "ListBucketMetricsConfigurationsRequest";
var _LBO = "ListBucketsOutput";
var _LBR = "ListBucketsRequest";
var _LBRi = "ListBucketResult";
var _LC = "LocationConstraint";
var _LCi = "LifecycleConfiguration";
var _LDB = "ListDirectoryBuckets";
var _LDBO = "ListDirectoryBucketsOutput";
var _LDBR = "ListDirectoryBucketsRequest";
var _LE = "LoggingEnabled";
var _LEi = "LifecycleExpiration";
var _LFA = "LambdaFunctionArn";
var _LFC = "LambdaFunctionConfiguration";
var _LFCL = "LambdaFunctionConfigurationList";
var _LFCa = "LambdaFunctionConfigurations";
var _LH = "LegalHold";
var _LI = "LocationInfo";
var _LICR = "ListInventoryConfigurationsResult";
var _LM = "LastModified";
var _LMCR = "ListMetricsConfigurationsResult";
var _LMT = "LastModifiedTime";
var _LMU = "ListMultipartUploads";
var _LMUO = "ListMultipartUploadsOutput";
var _LMUR = "ListMultipartUploadsResult";
var _LMURi = "ListMultipartUploadsRequest";
var _LM_ = "Last-Modified";
var _LO = "ListObjects";
var _LOA = "ListObjectAnnotations";
var _LOAO = "ListObjectAnnotationsOutput";
var _LOAR = "ListObjectAnnotationsRequest";
var _LOO = "ListObjectsOutput";
var _LOR = "ListObjectsRequest";
var _LOV = "ListObjectsV2";
var _LOVO = "ListObjectsV2Output";
var _LOVOi = "ListObjectVersionsOutput";
var _LOVR = "ListObjectsV2Request";
var _LOVRi = "ListObjectVersionsRequest";
var _LOVi = "ListObjectVersions";
var _LP = "ListParts";
var _LPO = "ListPartsOutput";
var _LPR = "ListPartsResult";
var _LPRi = "ListPartsRequest";
var _LR = "LifecycleRule";
var _LRAO = "LifecycleRuleAndOperator";
var _LRF = "LifecycleRuleFilter";
var _LRi = "LifecycleRules";
var _LVR = "ListVersionsResult";
var _M = "Metadata";
var _MAO = "MetricsAndOperator";
var _MAR = "MaxAnnotationResults";
var _MAS = "MaxAgeSeconds";
var _MB = "MaxBuckets";
var _MC = "MetadataConfiguration";
var _MCL = "MetricsConfigurationList";
var _MCR = "MetadataConfigurationResult";
var _MCe = "MetricsConfiguration";
var _MD = "MetadataDirective";
var _MDB = "MaxDirectoryBuckets";
var _MDf = "MfaDelete";
var _ME = "MetadataEntry";
var _MF = "MetricsFilter";
var _MFA = "MFA";
var _MFAD = "MFADelete";
var _MK = "MaxKeys";
var _MM = "MissingMeta";
var _MOS = "MpuObjectSize";
var _MP = "MaxParts";
var _MTC = "MetadataTableConfiguration";
var _MTCR = "MetadataTableConfigurationResult";
var _MTEC = "MetadataTableEncryptionConfiguration";
var _MU = "MultipartUpload";
var _MUL = "MultipartUploadList";
var _MUa = "MaxUploads";
var _Ma = "Marker";
var _Me = "Metrics";
var _Mes = "Message";
var _Mi = "Minutes";
var _Mo = "Mode";
var _N = "Name";
var _NC = "NotificationConfiguration";
var _NCF = "NotificationConfigurationFilter";
var _NCT = "NextContinuationToken";
var _ND = "NoncurrentDays";
var _NEKKAS = "NonEmptyKmsKeyArnString";
var _NF = "NotFound";
var _NKM = "NextKeyMarker";
var _NM = "NextMarker";
var _NNV = "NewerNoncurrentVersions";
var _NPNM = "NextPartNumberMarker";
var _NSA = "NoSuchAnnotation";
var _NSB = "NoSuchBucket";
var _NSK = "NoSuchKey";
var _NSU = "NoSuchUpload";
var _NUIM = "NextUploadIdMarker";
var _NVE = "NoncurrentVersionExpiration";
var _NVIM = "NextVersionIdMarker";
var _NVT = "NoncurrentVersionTransitions";
var _NVTL = "NoncurrentVersionTransitionList";
var _NVTo = "NoncurrentVersionTransition";
var _O = "Owner";
var _OA = "ObjectAttributes";
var _OAIATE = "ObjectAlreadyInActiveTierError";
var _OC = "OwnershipControls";
var _OCR = "OwnershipControlsRule";
var _OCRw = "OwnershipControlsRules";
var _OE = "ObjectEncryption";
var _OF = "OptionalFields";
var _OI = "ObjectIdentifier";
var _OIL = "ObjectIdentifierList";
var _OIM = "ObjectIfMatch";
var _OL = "OutputLocation";
var _OLC = "ObjectLockConfiguration";
var _OLE = "ObjectLockEnabled";
var _OLEFB = "ObjectLockEnabledForBucket";
var _OLLH = "ObjectLockLegalHold";
var _OLLHS = "ObjectLockLegalHoldStatus";
var _OLM = "ObjectLockMode";
var _OLR = "ObjectLockRetention";
var _OLRUD = "ObjectLockRetainUntilDate";
var _OLRb = "ObjectLockRule";
var _OLb = "ObjectList";
var _ONIATE = "ObjectNotInActiveTierError";
var _OO = "ObjectOwnership";
var _OOA = "OptionalObjectAttributes";
var _OP = "ObjectParts";
var _OPb = "ObjectPart";
var _OS = "ObjectSize";
var _OSGT = "ObjectSizeGreaterThan";
var _OSLT = "ObjectSizeLessThan";
var _OSV = "OutputSchemaVersion";
var _OSu = "OutputSerialization";
var _OV = "ObjectVersion";
var _OVI = "ObjectVersionId";
var _OVL = "ObjectVersionList";
var _Ob = "Objects";
var _Obj = "Object";
var _P = "Prefix";
var _PABC = "PublicAccessBlockConfiguration";
var _PBA = "PutBucketAbac";
var _PBAC = "PutBucketAccelerateConfiguration";
var _PBACR = "PutBucketAccelerateConfigurationRequest";
var _PBACRu = "PutBucketAnalyticsConfigurationRequest";
var _PBACu = "PutBucketAnalyticsConfiguration";
var _PBAR = "PutBucketAbacRequest";
var _PBARu = "PutBucketAclRequest";
var _PBAu = "PutBucketAcl";
var _PBC = "PutBucketCors";
var _PBCR = "PutBucketCorsRequest";
var _PBE = "PutBucketEncryption";
var _PBER = "PutBucketEncryptionRequest";
var _PBIC = "PutBucketInventoryConfiguration";
var _PBICR = "PutBucketInventoryConfigurationRequest";
var _PBITC = "PutBucketIntelligentTieringConfiguration";
var _PBITCR = "PutBucketIntelligentTieringConfigurationRequest";
var _PBL = "PutBucketLogging";
var _PBLC = "PutBucketLifecycleConfiguration";
var _PBLCO = "PutBucketLifecycleConfigurationOutput";
var _PBLCR = "PutBucketLifecycleConfigurationRequest";
var _PBLR = "PutBucketLoggingRequest";
var _PBMC = "PutBucketMetricsConfiguration";
var _PBMCR = "PutBucketMetricsConfigurationRequest";
var _PBNC = "PutBucketNotificationConfiguration";
var _PBNCR = "PutBucketNotificationConfigurationRequest";
var _PBOC = "PutBucketOwnershipControls";
var _PBOCR = "PutBucketOwnershipControlsRequest";
var _PBP = "PutBucketPolicy";
var _PBPR = "PutBucketPolicyRequest";
var _PBR = "PutBucketReplication";
var _PBRP = "PutBucketRequestPayment";
var _PBRPR = "PutBucketRequestPaymentRequest";
var _PBRR = "PutBucketReplicationRequest";
var _PBT = "PutBucketTagging";
var _PBTR = "PutBucketTaggingRequest";
var _PBV = "PutBucketVersioning";
var _PBVR = "PutBucketVersioningRequest";
var _PBW = "PutBucketWebsite";
var _PBWR = "PutBucketWebsiteRequest";
var _PC = "PartsCount";
var _PDS = "PartitionDateSource";
var _PE = "ProgressEvent";
var _PI = "ParquetInput";
var _PL = "PartsList";
var _PN = "PartNumber";
var _PNM = "PartNumberMarker";
var _PO = "PutObject";
var _POA = "PutObjectAcl";
var _POAO = "PutObjectAclOutput";
var _POAOu = "PutObjectAnnotationOutput";
var _POAR = "PutObjectAclRequest";
var _POARu = "PutObjectAnnotationRequest";
var _POAu = "PutObjectAnnotation";
var _POLC = "PutObjectLockConfiguration";
var _POLCO = "PutObjectLockConfigurationOutput";
var _POLCR = "PutObjectLockConfigurationRequest";
var _POLH = "PutObjectLegalHold";
var _POLHO = "PutObjectLegalHoldOutput";
var _POLHR = "PutObjectLegalHoldRequest";
var _POO = "PutObjectOutput";
var _POR = "PutObjectRequest";
var _PORO = "PutObjectRetentionOutput";
var _PORR = "PutObjectRetentionRequest";
var _PORu = "PutObjectRetention";
var _POT = "PutObjectTagging";
var _POTO = "PutObjectTaggingOutput";
var _POTR = "PutObjectTaggingRequest";
var _PP = "PartitionedPrefix";
var _PPAB = "PutPublicAccessBlock";
var _PPABR = "PutPublicAccessBlockRequest";
var _PS = "PolicyStatus";
var _Pa = "Parts";
var _Par = "Part";
var _Parq = "Parquet";
var _Pay = "Payer";
var _Payl = "Payload";
var _Pe = "Permission";
var _Po = "Policy";
var _Pr = "Progress";
var _Pri = "Priority";
var _Pro = "Protocol";
var _Q = "Quiet";
var _QA = "QueueArn";
var _QC = "QuoteCharacter";
var _QCL = "QueueConfigurationList";
var _QCu = "QueueConfigurations";
var _QCue = "QueueConfiguration";
var _QEC = "QuoteEscapeCharacter";
var _QF = "QuoteFields";
var _Qu = "Queue";
var _R = "Role";
var _RART = "RedirectAllRequestsTo";
var _RC = "RequestCharged";
var _RCC = "ResponseCacheControl";
var _RCD = "ResponseContentDisposition";
var _RCE = "ResponseContentEncoding";
var _RCL = "ResponseContentLanguage";
var _RCT = "ResponseContentType";
var _RCe = "ReplicationConfiguration";
var _RD = "RecordDelimiter";
var _RE = "ResponseExpires";
var _RED = "RestoreExpiryDate";
var _REe = "RecordExpiration";
var _REec = "RecordsEvent";
var _RKKID = "ReplicaKmsKeyID";
var _RKPW = "ReplaceKeyPrefixWith";
var _RKW = "ReplaceKeyWith";
var _RM = "ReplicaModifications";
var _RO = "RenameObject";
var _ROO = "RenameObjectOutput";
var _ROOe = "RestoreObjectOutput";
var _ROP = "RestoreOutputPath";
var _ROR = "RenameObjectRequest";
var _RORe = "RestoreObjectRequest";
var _ROe = "RestoreObject";
var _RP = "RequestPayer";
var _RPB = "RestrictPublicBuckets";
var _RPC = "RequestPaymentConfiguration";
var _RPe = "RequestProgress";
var _RR = "RoutingRules";
var _RRAO = "ReplicationRuleAndOperator";
var _RRF = "ReplicationRuleFilter";
var _RRe = "ReplicationRule";
var _RRep = "ReplicationRules";
var _RReq = "RequestRoute";
var _RRes = "RestoreRequest";
var _RRo = "RoutingRule";
var _RS = "ReplicationStatus";
var _RSe = "RestoreStatus";
var _RSen = "RenameSource";
var _RT = "ReplicationTime";
var _RTV = "ReplicationTimeValue";
var _RTe = "RequestToken";
var _RUD = "RetainUntilDate";
var _Ra = "Range";
var _Re = "Restore";
var _Rec = "Records";
var _Red = "Redirect";
var _Ret = "Retention";
var _Ru = "Rules";
var _Rul = "Rule";
var _S = "Status";
var _SA = "StartAfter";
var _SAK = "SecretAccessKey";
var _SAs = "SseAlgorithm";
var _SB = "StreamingBlob";
var _SBD = "S3BucketDestination";
var _SC = "StorageClass";
var _SCA = "StorageClassAnalysis";
var _SCADE = "StorageClassAnalysisDataExport";
var _SCV = "SessionCredentialValue";
var _SCe = "SessionCredentials";
var _SCt = "StatusCode";
var _SDV = "SkipDestinationValidation";
var _SE = "StatsEvent";
var _SIM = "SourceIfMatch";
var _SIMS = "SourceIfModifiedSince";
var _SINM = "SourceIfNoneMatch";
var _SIUS = "SourceIfUnmodifiedSince";
var _SK = "SSE-KMS";
var _SKEO = "SseKmsEncryptedObjects";
var _SKF = "S3KeyFilter";
var _SKe = "S3Key";
var _SL = "S3Location";
var _SM = "SessionMode";
var _SOC = "SelectObjectContent";
var _SOCES = "SelectObjectContentEventStream";
var _SOCO = "SelectObjectContentOutput";
var _SOCR = "SelectObjectContentRequest";
var _SP = "SelectParameters";
var _SPi = "SimplePrefix";
var _SR = "ScanRange";
var _SS = "SSE-S3";
var _SSC = "SourceSelectionCriteria";
var _SSE = "ServerSideEncryption";
var _SSEA = "SSEAlgorithm";
var _SSEBD = "ServerSideEncryptionByDefault";
var _SSEC = "ServerSideEncryptionConfiguration";
var _SSECA = "SSECustomerAlgorithm";
var _SSECK = "SSECustomerKey";
var _SSECKMD = "SSECustomerKeyMD5";
var _SSEKMS = "SSEKMS";
var _SSEKMSE = "SSEKMSEncryption";
var _SSEKMSEC = "SSEKMSEncryptionContext";
var _SSEKMSKI = "SSEKMSKeyId";
var _SSER = "ServerSideEncryptionRule";
var _SSERe = "ServerSideEncryptionRules";
var _SSES = "SSES3";
var _ST = "SessionToken";
var _STD = "S3TablesDestination";
var _STDR = "S3TablesDestinationResult";
var _S_ = "S3";
var _Sc = "Schedule";
var _Si = "Size";
var _St = "Start";
var _Sta = "Stats";
var _Su = "Suffix";
var _T = "Tags";
var _TA = "TableArn";
var _TAo = "TopicArn";
var _TB = "TargetBucket";
var _TBA = "TableBucketArn";
var _TBT = "TableBucketType";
var _TC = "TagCount";
var _TCL = "TopicConfigurationList";
var _TCo = "TopicConfigurations";
var _TCop = "TopicConfiguration";
var _TD = "TaggingDirective";
var _TDMOS = "TransitionDefaultMinimumObjectSize";
var _TG = "TargetGrants";
var _TGa = "TargetGrant";
var _TL = "TieringList";
var _TLr = "TransitionList";
var _TMP = "TooManyParts";
var _TN = "TableName";
var _TNa = "TableNamespace";
var _TOKF = "TargetObjectKeyFormat";
var _TP = "TargetPrefix";
var _TPC = "TotalPartsCount";
var _TS = "TableStatus";
var _TSa = "TagSet";
var _Ta = "Tag";
var _Tag = "Tagging";
var _Ti = "Tier";
var _Tie = "Tierings";
var _Tier = "Tiering";
var _Tim = "Time";
var _To = "Token";
var _Top = "Topic";
var _Tr = "Transitions";
var _Tra = "Transition";
var _Ty = "Type";
var _U = "Uploads";
var _UBMATC = "UpdateBucketMetadataAnnotationTableConfiguration";
var _UBMATCR = "UpdateBucketMetadataAnnotationTableConfigurationRequest";
var _UBMITC = "UpdateBucketMetadataInventoryTableConfiguration";
var _UBMITCR = "UpdateBucketMetadataInventoryTableConfigurationRequest";
var _UBMJTC = "UpdateBucketMetadataJournalTableConfiguration";
var _UBMJTCR = "UpdateBucketMetadataJournalTableConfigurationRequest";
var _UI = "UploadId";
var _UIM = "UploadIdMarker";
var _UM = "UserMetadata";
var _UMT = "UnsupportedMediaType";
var _UOE = "UpdateObjectEncryption";
var _UOER = "UpdateObjectEncryptionRequest";
var _UOERp = "UpdateObjectEncryptionResponse";
var _UP = "UploadPart";
var _UPC = "UploadPartCopy";
var _UPCO = "UploadPartCopyOutput";
var _UPCR = "UploadPartCopyRequest";
var _UPO = "UploadPartOutput";
var _UPR = "UploadPartRequest";
var _URI = "URI";
var _Up = "Upload";
var _V = "Value";
var _VC = "VersioningConfiguration";
var _VI = "VersionId";
var _VIM = "VersionIdMarker";
var _Ve = "Versions";
var _Ver = "Version";
var _WC = "WebsiteConfiguration";
var _WGOR = "WriteGetObjectResponse";
var _WGORR = "WriteGetObjectResponseRequest";
var _WOB = "WriteOffsetBytes";
var _WRL = "WebsiteRedirectLocation";
var _Y = "Years";
var _aN = "annotationName";
var _ap = "annotation-prefix";
var _ar = "accept-ranges";
var _br = "bucket-region";
var _c = "client";
var _ct = "continuation-token";
var _d = "delimiter";
var _e = "error";
var _eP = "eventPayload";
var _en = "endpoint";
var _et = "encoding-type";
var _fo = "fetch-owner";
var _h = "http";
var _hC = "httpChecksum";
var _hE = "httpError";
var _hH = "httpHeader";
var _hL = "hostLabel";
var _hP = "httpPayload";
var _hPH = "httpPrefixHeaders";
var _hQ = "httpQuery";
var _hi = "http://www.w3.org/2001/XMLSchema-instance";
var _i = "id";
var _iT = "idempotencyToken";
var _km = "key-marker";
var _m = "marker";
var _mar = "max-annotation-results";
var _mb = "max-buckets";
var _mdb = "max-directory-buckets";
var _mk = "max-keys";
var _mp = "max-parts";
var _mu = "max-uploads";
var _p = "prefix";
var _pN = "partNumber";
var _pnm = "part-number-marker";
var _rcc = "response-cache-control";
var _rcd = "response-content-disposition";
var _rce = "response-content-encoding";
var _rcl = "response-content-language";
var _rct = "response-content-type";
var _re = "response-expires";
var _s = "smithy.ts.sdk.synthetic.com.amazonaws.s3";
var _sa = "start-after";
var _st = "streaming";
var _uI = "uploadId";
var _uim = "upload-id-marker";
var _vI = "versionId";
var _vim = "version-id-marker";
var _x = "xsi";
var _xA = "xmlAttribute";
var _xF = "xmlFlattened";
var _xN = "xmlName";
var _xNm = "xmlNamespace";
var _xaa = "x-amz-acl";
var _xaad = "x-amz-abort-date";
var _xaapa = "x-amz-access-point-alias";
var _xaari = "x-amz-abort-rule-id";
var _xaas = "x-amz-archive-status";
var _xaba = "x-amz-bucket-arn";
var _xabgr = "x-amz-bypass-governance-retention";
var _xabln = "x-amz-bucket-location-name";
var _xablt = "x-amz-bucket-location-type";
var _xabn = "x-amz-bucket-namespace";
var _xabole = "x-amz-bucket-object-lock-enabled";
var _xabolt = "x-amz-bucket-object-lock-token";
var _xabr = "x-amz-bucket-region";
var _xaca = "x-amz-checksum-algorithm";
var _xacc = "x-amz-checksum-crc32";
var _xacc_ = "x-amz-checksum-crc32c";
var _xacc__ = "x-amz-checksum-crc64nvme";
var _xacm = "x-amz-checksum-md5";
var _xacm_ = "x-amz-checksum-mode";
var _xacrsba = "x-amz-confirm-remove-self-bucket-access";
var _xacs = "x-amz-checksum-sha1";
var _xacs_ = "x-amz-checksum-sha256";
var _xacs__ = "x-amz-checksum-sha512";
var _xacs___ = "x-amz-copy-source";
var _xacsim = "x-amz-copy-source-if-match";
var _xacsims = "x-amz-copy-source-if-modified-since";
var _xacsinm = "x-amz-copy-source-if-none-match";
var _xacsius = "x-amz-copy-source-if-unmodified-since";
var _xacsm = "x-amz-create-session-mode";
var _xacsr = "x-amz-copy-source-range";
var _xacssseca = "x-amz-copy-source-server-side-encryption-customer-algorithm";
var _xacssseck = "x-amz-copy-source-server-side-encryption-customer-key";
var _xacssseckM = "x-amz-copy-source-server-side-encryption-customer-key-MD5";
var _xacsvi = "x-amz-copy-source-version-id";
var _xact = "x-amz-checksum-type";
var _xact_ = "x-amz-client-token";
var _xacx = "x-amz-checksum-xxhash64";
var _xacx_ = "x-amz-checksum-xxhash3";
var _xacx__ = "x-amz-checksum-xxhash128";
var _xadm = "x-amz-delete-marker";
var _xae = "x-amz-expiration";
var _xaebo = "x-amz-expected-bucket-owner";
var _xafec = "x-amz-fwd-error-code";
var _xafem = "x-amz-fwd-error-message";
var _xafhCC = "x-amz-fwd-header-Cache-Control";
var _xafhCD = "x-amz-fwd-header-Content-Disposition";
var _xafhCE = "x-amz-fwd-header-Content-Encoding";
var _xafhCL = "x-amz-fwd-header-Content-Language";
var _xafhCR = "x-amz-fwd-header-Content-Range";
var _xafhCT = "x-amz-fwd-header-Content-Type";
var _xafhE = "x-amz-fwd-header-ETag";
var _xafhE_ = "x-amz-fwd-header-Expires";
var _xafhLM = "x-amz-fwd-header-Last-Modified";
var _xafhar = "x-amz-fwd-header-accept-ranges";
var _xafhxacc = "x-amz-fwd-header-x-amz-checksum-crc32";
var _xafhxacc_ = "x-amz-fwd-header-x-amz-checksum-crc32c";
var _xafhxacc__ = "x-amz-fwd-header-x-amz-checksum-crc64nvme";
var _xafhxacm = "x-amz-fwd-header-x-amz-checksum-md5";
var _xafhxacs = "x-amz-fwd-header-x-amz-checksum-sha1";
var _xafhxacs_ = "x-amz-fwd-header-x-amz-checksum-sha256";
var _xafhxacs__ = "x-amz-fwd-header-x-amz-checksum-sha512";
var _xafhxacx = "x-amz-fwd-header-x-amz-checksum-xxhash64";
var _xafhxacx_ = "x-amz-fwd-header-x-amz-checksum-xxhash3";
var _xafhxacx__ = "x-amz-fwd-header-x-amz-checksum-xxhash128";
var _xafhxadm = "x-amz-fwd-header-x-amz-delete-marker";
var _xafhxae = "x-amz-fwd-header-x-amz-expiration";
var _xafhxamm = "x-amz-fwd-header-x-amz-missing-meta";
var _xafhxampc = "x-amz-fwd-header-x-amz-mp-parts-count";
var _xafhxaollh = "x-amz-fwd-header-x-amz-object-lock-legal-hold";
var _xafhxaolm = "x-amz-fwd-header-x-amz-object-lock-mode";
var _xafhxaolrud = "x-amz-fwd-header-x-amz-object-lock-retain-until-date";
var _xafhxar = "x-amz-fwd-header-x-amz-restore";
var _xafhxarc = "x-amz-fwd-header-x-amz-request-charged";
var _xafhxars = "x-amz-fwd-header-x-amz-replication-status";
var _xafhxasc = "x-amz-fwd-header-x-amz-storage-class";
var _xafhxasse = "x-amz-fwd-header-x-amz-server-side-encryption";
var _xafhxasseakki = "x-amz-fwd-header-x-amz-server-side-encryption-aws-kms-key-id";
var _xafhxassebke = "x-amz-fwd-header-x-amz-server-side-encryption-bucket-key-enabled";
var _xafhxasseca = "x-amz-fwd-header-x-amz-server-side-encryption-customer-algorithm";
var _xafhxasseckM = "x-amz-fwd-header-x-amz-server-side-encryption-customer-key-MD5";
var _xafhxatc = "x-amz-fwd-header-x-amz-tagging-count";
var _xafhxavi = "x-amz-fwd-header-x-amz-version-id";
var _xafs = "x-amz-fwd-status";
var _xagfc = "x-amz-grant-full-control";
var _xagr = "x-amz-grant-read";
var _xagra = "x-amz-grant-read-acp";
var _xagw = "x-amz-grant-write";
var _xagwa = "x-amz-grant-write-acp";
var _xaimit = "x-amz-if-match-initiated-time";
var _xaimlmt = "x-amz-if-match-last-modified-time";
var _xaims = "x-amz-if-match-size";
var _xam = "x-amz-meta-";
var _xam_ = "x-amz-mfa";
var _xamd = "x-amz-metadata-directive";
var _xamm = "x-amz-missing-meta";
var _xamos = "x-amz-mp-object-size";
var _xamp = "x-amz-max-parts";
var _xampc = "x-amz-mp-parts-count";
var _xaoa = "x-amz-object-attributes";
var _xaoad = "x-amz-object-annotation-directive";
var _xaoim = "x-amz-object-if-match";
var _xaollh = "x-amz-object-lock-legal-hold";
var _xaolm = "x-amz-object-lock-mode";
var _xaolrud = "x-amz-object-lock-retain-until-date";
var _xaoo = "x-amz-object-ownership";
var _xaooa = "x-amz-optional-object-attributes";
var _xaos = "x-amz-object-size";
var _xaovi = "x-amz-object-version-id";
var _xapnm = "x-amz-part-number-marker";
var _xar = "x-amz-restore";
var _xarc = "x-amz-request-charged";
var _xarop = "x-amz-restore-output-path";
var _xarp = "x-amz-request-payer";
var _xarr = "x-amz-request-route";
var _xars = "x-amz-replication-status";
var _xars_ = "x-amz-rename-source";
var _xarsim = "x-amz-rename-source-if-match";
var _xarsims = "x-amz-rename-source-if-modified-since";
var _xarsinm = "x-amz-rename-source-if-none-match";
var _xarsius = "x-amz-rename-source-if-unmodified-since";
var _xart = "x-amz-request-token";
var _xasc = "x-amz-storage-class";
var _xasca = "x-amz-sdk-checksum-algorithm";
var _xasdv = "x-amz-skip-destination-validation";
var _xasebo = "x-amz-source-expected-bucket-owner";
var _xasse = "x-amz-server-side-encryption";
var _xasseakki = "x-amz-server-side-encryption-aws-kms-key-id";
var _xassebke = "x-amz-server-side-encryption-bucket-key-enabled";
var _xassec = "x-amz-server-side-encryption-context";
var _xasseca = "x-amz-server-side-encryption-customer-algorithm";
var _xasseck = "x-amz-server-side-encryption-customer-key";
var _xasseckM = "x-amz-server-side-encryption-customer-key-MD5";
var _xat = "x-amz-tagging";
var _xatc = "x-amz-tagging-count";
var _xatd = "x-amz-tagging-directive";
var _xatdmos = "x-amz-transition-default-minimum-object-size";
var _xavi = "x-amz-version-id";
var _xawob = "x-amz-write-offset-bytes";
var _xawrl = "x-amz-website-redirect-location";
var _xs = "xsi:type";
var n0 = "com.amazonaws.s3";
var _s_registry = TypeRegistry.for(_s);
var S3ServiceException$ = [-3, _s, "S3ServiceException", 0, [], []];
_s_registry.registerError(S3ServiceException$, S3ServiceException);
var n0_registry = TypeRegistry.for(n0);
var AccessDenied$ = [
  -3,
  n0,
  _AD,
  { [_e]: _c, [_hE]: 403 },
  [],
  []
];
n0_registry.registerError(AccessDenied$, AccessDenied);
var AnnotationLimitExceeded$ = [
  -3,
  n0,
  _ALE,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(AnnotationLimitExceeded$, AnnotationLimitExceeded);
var AnnotationNameTooLong$ = [
  -3,
  n0,
  _ANTL,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(AnnotationNameTooLong$, AnnotationNameTooLong);
var BucketAlreadyExists$ = [
  -3,
  n0,
  _BAE,
  { [_e]: _c, [_hE]: 409 },
  [],
  []
];
n0_registry.registerError(BucketAlreadyExists$, BucketAlreadyExists);
var BucketAlreadyOwnedByYou$ = [
  -3,
  n0,
  _BAOBY,
  { [_e]: _c, [_hE]: 409 },
  [],
  []
];
n0_registry.registerError(BucketAlreadyOwnedByYou$, BucketAlreadyOwnedByYou);
var EncryptionTypeMismatch$ = [
  -3,
  n0,
  _ETM,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(EncryptionTypeMismatch$, EncryptionTypeMismatch);
var IdempotencyParameterMismatch$ = [
  -3,
  n0,
  _IPM,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(IdempotencyParameterMismatch$, IdempotencyParameterMismatch);
var InvalidAnnotationName$ = [
  -3,
  n0,
  _IAN,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(InvalidAnnotationName$, InvalidAnnotationName);
var InvalidObjectState$ = [
  -3,
  n0,
  _IOS,
  { [_e]: _c, [_hE]: 403 },
  [_SC, _AT],
  [0, 0]
];
n0_registry.registerError(InvalidObjectState$, InvalidObjectState);
var InvalidPrefix$ = [
  -3,
  n0,
  _IP,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(InvalidPrefix$, InvalidPrefix);
var InvalidRequest$ = [
  -3,
  n0,
  _IR,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(InvalidRequest$, InvalidRequest);
var InvalidWriteOffset$ = [
  -3,
  n0,
  _IWO,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(InvalidWriteOffset$, InvalidWriteOffset);
var NoSuchAnnotation$ = [
  -3,
  n0,
  _NSA,
  { [_e]: _c, [_hE]: 404 },
  [],
  []
];
n0_registry.registerError(NoSuchAnnotation$, NoSuchAnnotation);
var NoSuchBucket$ = [
  -3,
  n0,
  _NSB,
  { [_e]: _c, [_hE]: 404 },
  [],
  []
];
n0_registry.registerError(NoSuchBucket$, NoSuchBucket);
var NoSuchKey$ = [
  -3,
  n0,
  _NSK,
  { [_e]: _c, [_hE]: 404 },
  [],
  []
];
n0_registry.registerError(NoSuchKey$, NoSuchKey);
var NoSuchUpload$ = [
  -3,
  n0,
  _NSU,
  { [_e]: _c, [_hE]: 404 },
  [],
  []
];
n0_registry.registerError(NoSuchUpload$, NoSuchUpload);
var NotFound$ = [
  -3,
  n0,
  _NF,
  { [_e]: _c },
  [],
  []
];
n0_registry.registerError(NotFound$, NotFound);
var ObjectAlreadyInActiveTierError$ = [
  -3,
  n0,
  _OAIATE,
  { [_e]: _c, [_hE]: 403 },
  [],
  []
];
n0_registry.registerError(ObjectAlreadyInActiveTierError$, ObjectAlreadyInActiveTierError);
var ObjectNotInActiveTierError$ = [
  -3,
  n0,
  _ONIATE,
  { [_e]: _c, [_hE]: 403 },
  [],
  []
];
n0_registry.registerError(ObjectNotInActiveTierError$, ObjectNotInActiveTierError);
var TooManyParts$ = [
  -3,
  n0,
  _TMP,
  { [_e]: _c, [_hE]: 400 },
  [],
  []
];
n0_registry.registerError(TooManyParts$, TooManyParts);
var UnsupportedMediaType$ = [
  -3,
  n0,
  _UMT,
  { [_e]: _c, [_hE]: 415 },
  [],
  []
];
n0_registry.registerError(UnsupportedMediaType$, UnsupportedMediaType);
var errorTypeRegistries = [
  _s_registry,
  n0_registry
];
var CopySourceSSECustomerKey = [0, n0, _CSSSECK, 8, 0];
var NonEmptyKmsKeyArnString = [0, n0, _NEKKAS, 8, 0];
var SessionCredentialValue = [0, n0, _SCV, 8, 0];
var SSECustomerKey = [0, n0, _SSECK, 8, 0];
var SSEKMSEncryptionContext = [0, n0, _SSEKMSEC, 8, 0];
var SSEKMSKeyId = [0, n0, _SSEKMSKI, 8, 0];
var StreamingBlob = [0, n0, _SB, { [_st]: 1 }, 42];
var AbacStatus$ = [
  3,
  n0,
  _AS,
  0,
  [_S],
  [0]
];
var AbortIncompleteMultipartUpload$ = [
  3,
  n0,
  _AIMU,
  0,
  [_DAI],
  [1]
];
var AbortMultipartUploadOutput$ = [
  3,
  n0,
  _AMUO,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var AbortMultipartUploadRequest$ = [
  3,
  n0,
  _AMUR,
  0,
  [_B, _K, _UI, _RP, _EBO, _IMIT],
  [[0, 1], [0, 1], [0, { [_hQ]: _uI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [6, { [_hH]: _xaimit }]],
  3
];
var AccelerateConfiguration$ = [
  3,
  n0,
  _AC,
  0,
  [_S],
  [0]
];
var AccessControlPolicy$ = [
  3,
  n0,
  _ACP,
  0,
  [_G, _O],
  [[() => Grants, { [_xN]: _ACL }], () => Owner$]
];
var AccessControlTranslation$ = [
  3,
  n0,
  _ACT,
  0,
  [_O],
  [0],
  1
];
var AnalyticsAndOperator$ = [
  3,
  n0,
  _AAO,
  0,
  [_P, _T],
  [0, [() => TagSet, { [_xF]: 1, [_xN]: _Ta }]]
];
var AnalyticsConfiguration$ = [
  3,
  n0,
  _ACn,
  0,
  [_I, _SCA, _F],
  [0, () => StorageClassAnalysis$, [() => AnalyticsFilter$, 0]],
  2
];
var AnalyticsExportDestination$ = [
  3,
  n0,
  _AED,
  0,
  [_SBD],
  [() => AnalyticsS3BucketDestination$],
  1
];
var AnalyticsS3BucketDestination$ = [
  3,
  n0,
  _ASBD,
  0,
  [_Fo, _B, _BAI, _P],
  [0, 0, 0, 0],
  2
];
var AnnotationEntry$ = [
  3,
  n0,
  _AE,
  0,
  [_AN, _LM, _Si, _ET, _CA, _RS],
  [0, 4, 1, 0, [64 | 0, { [_xF]: 1 }], 0],
  3
];
var AnnotationTableConfiguration$ = [
  3,
  n0,
  _ATC,
  0,
  [_CS, _EC, _R],
  [0, () => MetadataTableEncryptionConfiguration$, 0],
  1
];
var AnnotationTableConfigurationResult$ = [
  3,
  n0,
  _ATCR,
  0,
  [_CS, _TS, _E, _TN, _TA, _R],
  [0, 0, () => ErrorDetails$, 0, 0, 0],
  1
];
var AnnotationTableConfigurationUpdates$ = [
  3,
  n0,
  _ATCU,
  0,
  [_CS, _EC, _R],
  [0, () => MetadataTableEncryptionConfiguration$, 0],
  1
];
var BlockedEncryptionTypes$ = [
  3,
  n0,
  _BET,
  0,
  [_ETn],
  [[() => EncryptionTypeList, { [_xF]: 1 }]]
];
var Bucket$ = [
  3,
  n0,
  _B,
  0,
  [_N, _CD, _BR, _BA],
  [0, 4, 0, 0]
];
var BucketInfo$ = [
  3,
  n0,
  _BI,
  0,
  [_DR, _Ty],
  [0, 0]
];
var BucketLifecycleConfiguration$ = [
  3,
  n0,
  _BLC,
  0,
  [_Ru],
  [[() => LifecycleRules, { [_xF]: 1, [_xN]: _Rul }]],
  1
];
var BucketLoggingStatus$ = [
  3,
  n0,
  _BLS,
  0,
  [_LE],
  [[() => LoggingEnabled$, 0]]
];
var Checksum$ = [
  3,
  n0,
  _C,
  0,
  [_CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var CommonPrefix$ = [
  3,
  n0,
  _CP,
  0,
  [_P],
  [0]
];
var CompletedMultipartUpload$ = [
  3,
  n0,
  _CMU,
  0,
  [_Pa],
  [[() => CompletedPartList, { [_xF]: 1, [_xN]: _Par }]]
];
var CompletedPart$ = [
  3,
  n0,
  _CPo,
  0,
  [_ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _PN],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];
var CompleteMultipartUploadOutput$ = [
  3,
  n0,
  _CMUO,
  { [_xN]: _CMUR },
  [_L, _B, _K, _Ex, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _SSE, _VI, _SSEKMSKI, _BKE, _RC],
  [0, 0, 0, [0, { [_hH]: _xae }], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [0, { [_hH]: _xasse }], [0, { [_hH]: _xavi }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarc }]]
];
var CompleteMultipartUploadRequest$ = [
  3,
  n0,
  _CMURo,
  0,
  [_B, _K, _UI, _MU, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _MOS, _RP, _EBO, _IM, _INM, _SSECA, _SSECK, _SSECKMD],
  [[0, 1], [0, 1], [0, { [_hQ]: _uI }], [() => CompletedMultipartUpload$, { [_hP]: 1, [_xN]: _CMUo }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [1, { [_hH]: _xamos }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _IM_ }], [0, { [_hH]: _INM_ }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }]],
  3
];
var Condition$ = [
  3,
  n0,
  _Co,
  0,
  [_HECRE, _KPE],
  [0, 0]
];
var ContinuationEvent$ = [
  3,
  n0,
  _CE,
  0,
  [],
  []
];
var CopyObjectOutput$ = [
  3,
  n0,
  _COO,
  0,
  [_COR, _Ex, _CSVI, _VI, _SSE, _SSECA, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _RC],
  [[() => CopyObjectResult$, 16], [0, { [_hH]: _xae }], [0, { [_hH]: _xacsvi }], [0, { [_hH]: _xavi }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarc }]]
];
var CopyObjectRequest$ = [
  3,
  n0,
  _CORo,
  0,
  [_B, _CSo, _K, _ACL_, _CC, _CA, _CDo, _CEo, _CL, _CTo, _CSIM, _CSIMS, _CSINM, _CSIUS, _Exp, _GFC, _GR, _GRACP, _GWACP, _IM, _INM, _M, _MD, _TD, _ADn, _SSE, _SC, _WRL, _SSECA, _SSECK, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _CSSSECA, _CSSSECK, _CSSSECKMD, _RP, _Tag, _OLM, _OLRUD, _OLLHS, _EBO, _ESBO],
  [[0, 1], [0, { [_hH]: _xacs___ }], [0, 1], [0, { [_hH]: _xaa }], [0, { [_hH]: _CC_ }], [0, { [_hH]: _xaca }], [0, { [_hH]: _CD_ }], [0, { [_hH]: _CE_ }], [0, { [_hH]: _CL_ }], [0, { [_hH]: _CT_ }], [0, { [_hH]: _xacsim }], [4, { [_hH]: _xacsims }], [0, { [_hH]: _xacsinm }], [4, { [_hH]: _xacsius }], [4, { [_hH]: _Exp }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagwa }], [0, { [_hH]: _IM_ }], [0, { [_hH]: _INM_ }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xamd }], [0, { [_hH]: _xatd }], [0, { [_hH]: _xaoad }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xasc }], [0, { [_hH]: _xawrl }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xacssseca }], [() => CopySourceSSECustomerKey, { [_hH]: _xacssseck }], [0, { [_hH]: _xacssseckM }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xat }], [0, { [_hH]: _xaolm }], [5, { [_hH]: _xaolrud }], [0, { [_hH]: _xaollh }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasebo }]],
  3
];
var CopyObjectResult$ = [
  3,
  n0,
  _COR,
  0,
  [_ET, _LM, _CT, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe],
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var CopyPartResult$ = [
  3,
  n0,
  _CPR,
  0,
  [_ET, _LM, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe],
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var CORSConfiguration$ = [
  3,
  n0,
  _CORSC,
  0,
  [_CORSR],
  [[() => CORSRules, { [_xF]: 1, [_xN]: _CORSRu }]],
  1
];
var CORSRule$ = [
  3,
  n0,
  _CORSRu,
  0,
  [_AM, _AO, _ID, _AH, _EH, _MAS],
  [[64 | 0, { [_xF]: 1, [_xN]: _AMl }], [64 | 0, { [_xF]: 1, [_xN]: _AOl }], 0, [64 | 0, { [_xF]: 1, [_xN]: _AHl }], [64 | 0, { [_xF]: 1, [_xN]: _EHx }], 1],
  2
];
var CreateBucketConfiguration$ = [
  3,
  n0,
  _CBC,
  0,
  [_LC, _L, _B, _T],
  [0, () => LocationInfo$, () => BucketInfo$, [() => TagSet, 0]]
];
var CreateBucketMetadataConfigurationRequest$ = [
  3,
  n0,
  _CBMCR,
  0,
  [_B, _MC, _CMDo, _CA, _EBO],
  [[0, 1], [() => MetadataConfiguration$, { [_hP]: 1, [_xN]: _MC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var CreateBucketMetadataTableConfigurationRequest$ = [
  3,
  n0,
  _CBMTCR,
  0,
  [_B, _MTC, _CMDo, _CA, _EBO],
  [[0, 1], [() => MetadataTableConfiguration$, { [_hP]: 1, [_xN]: _MTC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var CreateBucketOutput$ = [
  3,
  n0,
  _CBO,
  0,
  [_L, _BA],
  [[0, { [_hH]: _L }], [0, { [_hH]: _xaba }]]
];
var CreateBucketRequest$ = [
  3,
  n0,
  _CBR,
  0,
  [_B, _ACL_, _CBC, _GFC, _GR, _GRACP, _GW, _GWACP, _OLEFB, _OO, _BN],
  [[0, 1], [0, { [_hH]: _xaa }], [() => CreateBucketConfiguration$, { [_hP]: 1, [_xN]: _CBC }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagw }], [0, { [_hH]: _xagwa }], [2, { [_hH]: _xabole }], [0, { [_hH]: _xaoo }], [0, { [_hH]: _xabn }]],
  1
];
var CreateMultipartUploadOutput$ = [
  3,
  n0,
  _CMUOr,
  { [_xN]: _IMUR },
  [_ADb, _ARI, _B, _K, _UI, _SSE, _SSECA, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _RC, _CA, _CT],
  [[4, { [_hH]: _xaad }], [0, { [_hH]: _xaari }], [0, { [_xN]: _B }], 0, 0, [0, { [_hH]: _xasse }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarc }], [0, { [_hH]: _xaca }], [0, { [_hH]: _xact }]]
];
var CreateMultipartUploadRequest$ = [
  3,
  n0,
  _CMURr,
  0,
  [_B, _K, _ACL_, _CC, _CDo, _CEo, _CL, _CTo, _Exp, _GFC, _GR, _GRACP, _GWACP, _M, _SSE, _SC, _WRL, _SSECA, _SSECK, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _RP, _Tag, _OLM, _OLRUD, _OLLHS, _EBO, _CA, _CT],
  [[0, 1], [0, 1], [0, { [_hH]: _xaa }], [0, { [_hH]: _CC_ }], [0, { [_hH]: _CD_ }], [0, { [_hH]: _CE_ }], [0, { [_hH]: _CL_ }], [0, { [_hH]: _CT_ }], [4, { [_hH]: _Exp }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagwa }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xasc }], [0, { [_hH]: _xawrl }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xat }], [0, { [_hH]: _xaolm }], [5, { [_hH]: _xaolrud }], [0, { [_hH]: _xaollh }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xaca }], [0, { [_hH]: _xact }]],
  2
];
var CreateSessionOutput$ = [
  3,
  n0,
  _CSO,
  { [_xN]: _CSR },
  [_Cr, _SSE, _SSEKMSKI, _SSEKMSEC, _BKE],
  [[() => SessionCredentials$, { [_xN]: _Cr }], [0, { [_hH]: _xasse }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }]],
  1
];
var CreateSessionRequest$ = [
  3,
  n0,
  _CSRr,
  0,
  [_B, _SM, _SSE, _SSEKMSKI, _SSEKMSEC, _BKE],
  [[0, 1], [0, { [_hH]: _xacsm }], [0, { [_hH]: _xasse }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }]],
  1
];
var CSVInput$ = [
  3,
  n0,
  _CSVIn,
  0,
  [_FHI, _Com, _QEC, _RD, _FD, _QC, _AQRD],
  [0, 0, 0, 0, 0, 0, 2]
];
var CSVOutput$ = [
  3,
  n0,
  _CSVO,
  0,
  [_QF, _QEC, _RD, _FD, _QC],
  [0, 0, 0, 0, 0]
];
var DefaultRetention$ = [
  3,
  n0,
  _DRe,
  0,
  [_Mo, _D, _Y],
  [0, 1, 1]
];
var Delete$ = [
  3,
  n0,
  _De,
  0,
  [_Ob, _Q],
  [[() => ObjectIdentifierList, { [_xF]: 1, [_xN]: _Obj }], 2],
  1
];
var DeleteBucketAnalyticsConfigurationRequest$ = [
  3,
  n0,
  _DBACR,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var DeleteBucketCorsRequest$ = [
  3,
  n0,
  _DBCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketEncryptionRequest$ = [
  3,
  n0,
  _DBER,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketIntelligentTieringConfigurationRequest$ = [
  3,
  n0,
  _DBITCR,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var DeleteBucketInventoryConfigurationRequest$ = [
  3,
  n0,
  _DBICR,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var DeleteBucketLifecycleRequest$ = [
  3,
  n0,
  _DBLR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketMetadataConfigurationRequest$ = [
  3,
  n0,
  _DBMCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketMetadataTableConfigurationRequest$ = [
  3,
  n0,
  _DBMTCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketMetricsConfigurationRequest$ = [
  3,
  n0,
  _DBMCRe,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var DeleteBucketOwnershipControlsRequest$ = [
  3,
  n0,
  _DBOCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketPolicyRequest$ = [
  3,
  n0,
  _DBPR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketReplicationRequest$ = [
  3,
  n0,
  _DBRR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketRequest$ = [
  3,
  n0,
  _DBR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketTaggingRequest$ = [
  3,
  n0,
  _DBTR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeleteBucketWebsiteRequest$ = [
  3,
  n0,
  _DBWR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var DeletedObject$ = [
  3,
  n0,
  _DO,
  0,
  [_K, _VI, _DM, _DMVI],
  [0, 0, 2, 0]
];
var DeleteMarkerEntry$ = [
  3,
  n0,
  _DME,
  0,
  [_O, _K, _VI, _IL, _LM],
  [() => Owner$, 0, 0, 2, 4]
];
var DeleteMarkerReplication$ = [
  3,
  n0,
  _DMR,
  0,
  [_S],
  [0]
];
var DeleteObjectAnnotationOutput$ = [
  3,
  n0,
  _DOAO,
  0,
  [_OVI, _RC],
  [[0, { [_hH]: _xaovi }], [0, { [_hH]: _xarc }]]
];
var DeleteObjectAnnotationRequest$ = [
  3,
  n0,
  _DOAR,
  0,
  [_B, _K, _AN, _VI, _RP, _EBO, _OIM],
  [[0, 1], [0, 1], [0, { [_hQ]: _aN }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xaoim }]],
  3
];
var DeleteObjectOutput$ = [
  3,
  n0,
  _DOO,
  0,
  [_DM, _VI, _RC],
  [[2, { [_hH]: _xadm }], [0, { [_hH]: _xavi }], [0, { [_hH]: _xarc }]]
];
var DeleteObjectRequest$ = [
  3,
  n0,
  _DOR,
  0,
  [_B, _K, _MFA, _VI, _RP, _BGR, _EBO, _IM, _IMLMT, _IMS],
  [[0, 1], [0, 1], [0, { [_hH]: _xam_ }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [2, { [_hH]: _xabgr }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _IM_ }], [6, { [_hH]: _xaimlmt }], [1, { [_hH]: _xaims }]],
  2
];
var DeleteObjectsOutput$ = [
  3,
  n0,
  _DOOe,
  { [_xN]: _DRel },
  [_Del, _RC, _Er],
  [[() => DeletedObjects, { [_xF]: 1 }], [0, { [_hH]: _xarc }], [() => Errors, { [_xF]: 1, [_xN]: _E }]]
];
var DeleteObjectsRequest$ = [
  3,
  n0,
  _DORe,
  0,
  [_B, _De, _MFA, _RP, _BGR, _EBO, _CA],
  [[0, 1], [() => Delete$, { [_hP]: 1, [_xN]: _De }], [0, { [_hH]: _xam_ }], [0, { [_hH]: _xarp }], [2, { [_hH]: _xabgr }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasca }]],
  2
];
var DeleteObjectTaggingOutput$ = [
  3,
  n0,
  _DOTO,
  0,
  [_VI],
  [[0, { [_hH]: _xavi }]]
];
var DeleteObjectTaggingRequest$ = [
  3,
  n0,
  _DOTR,
  0,
  [_B, _K, _VI, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [0, { [_hH]: _xaebo }]],
  2
];
var DeletePublicAccessBlockRequest$ = [
  3,
  n0,
  _DPABR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var Destination$ = [
  3,
  n0,
  _Des,
  0,
  [_B, _A, _SC, _ACT, _EC, _RT, _Me],
  [0, 0, 0, () => AccessControlTranslation$, () => EncryptionConfiguration$, () => ReplicationTime$, () => Metrics$],
  1
];
var DestinationResult$ = [
  3,
  n0,
  _DRes,
  0,
  [_TBT, _TBA, _TNa],
  [0, 0, 0]
];
var Encryption$ = [
  3,
  n0,
  _En,
  0,
  [_ETn, _KMSKI, _KMSC],
  [0, [() => SSEKMSKeyId, 0], 0],
  1
];
var EncryptionConfiguration$ = [
  3,
  n0,
  _EC,
  0,
  [_RKKID],
  [0]
];
var EndEvent$ = [
  3,
  n0,
  _EE,
  0,
  [],
  []
];
var _Error$ = [
  3,
  n0,
  _E,
  0,
  [_K, _VI, _Cod, _Mes],
  [0, 0, 0, 0]
];
var ErrorDetails$ = [
  3,
  n0,
  _ED,
  0,
  [_ECr, _EM],
  [0, 0]
];
var ErrorDocument$ = [
  3,
  n0,
  _EDr,
  0,
  [_K],
  [0],
  1
];
var EventBridgeConfiguration$ = [
  3,
  n0,
  _EBC,
  0,
  [],
  []
];
var ExistingObjectReplication$ = [
  3,
  n0,
  _EOR,
  0,
  [_S],
  [0],
  1
];
var FilterRule$ = [
  3,
  n0,
  _FR,
  0,
  [_N, _V],
  [0, 0]
];
var GetBucketAbacOutput$ = [
  3,
  n0,
  _GBAO,
  0,
  [_AS],
  [[() => AbacStatus$, 16]]
];
var GetBucketAbacRequest$ = [
  3,
  n0,
  _GBAR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketAccelerateConfigurationOutput$ = [
  3,
  n0,
  _GBACO,
  { [_xN]: _AC },
  [_S, _RC],
  [0, [0, { [_hH]: _xarc }]]
];
var GetBucketAccelerateConfigurationRequest$ = [
  3,
  n0,
  _GBACR,
  0,
  [_B, _EBO, _RP],
  [[0, 1], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xarp }]],
  1
];
var GetBucketAclOutput$ = [
  3,
  n0,
  _GBAOe,
  { [_xN]: _ACP },
  [_O, _G],
  [() => Owner$, [() => Grants, { [_xN]: _ACL }]]
];
var GetBucketAclRequest$ = [
  3,
  n0,
  _GBARe,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketAnalyticsConfigurationOutput$ = [
  3,
  n0,
  _GBACOe,
  0,
  [_ACn],
  [[() => AnalyticsConfiguration$, 16]]
];
var GetBucketAnalyticsConfigurationRequest$ = [
  3,
  n0,
  _GBACRe,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var GetBucketCorsOutput$ = [
  3,
  n0,
  _GBCO,
  { [_xN]: _CORSC },
  [_CORSR],
  [[() => CORSRules, { [_xF]: 1, [_xN]: _CORSRu }]]
];
var GetBucketCorsRequest$ = [
  3,
  n0,
  _GBCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketEncryptionOutput$ = [
  3,
  n0,
  _GBEO,
  0,
  [_SSEC],
  [[() => ServerSideEncryptionConfiguration$, 16]]
];
var GetBucketEncryptionRequest$ = [
  3,
  n0,
  _GBER,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketIntelligentTieringConfigurationOutput$ = [
  3,
  n0,
  _GBITCO,
  0,
  [_ITC],
  [[() => IntelligentTieringConfiguration$, 16]]
];
var GetBucketIntelligentTieringConfigurationRequest$ = [
  3,
  n0,
  _GBITCR,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var GetBucketInventoryConfigurationOutput$ = [
  3,
  n0,
  _GBICO,
  0,
  [_IC],
  [[() => InventoryConfiguration$, 16]]
];
var GetBucketInventoryConfigurationRequest$ = [
  3,
  n0,
  _GBICR,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var GetBucketLifecycleConfigurationOutput$ = [
  3,
  n0,
  _GBLCO,
  { [_xN]: _LCi },
  [_Ru, _TDMOS],
  [[() => LifecycleRules, { [_xF]: 1, [_xN]: _Rul }], [0, { [_hH]: _xatdmos }]]
];
var GetBucketLifecycleConfigurationRequest$ = [
  3,
  n0,
  _GBLCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketLocationOutput$ = [
  3,
  n0,
  _GBLO,
  { [_xN]: _LC },
  [_LC],
  [0]
];
var GetBucketLocationRequest$ = [
  3,
  n0,
  _GBLR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketLoggingOutput$ = [
  3,
  n0,
  _GBLOe,
  { [_xN]: _BLS },
  [_LE],
  [[() => LoggingEnabled$, 0]]
];
var GetBucketLoggingRequest$ = [
  3,
  n0,
  _GBLRe,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketMetadataConfigurationOutput$ = [
  3,
  n0,
  _GBMCO,
  0,
  [_GBMCR],
  [[() => GetBucketMetadataConfigurationResult$, 16]]
];
var GetBucketMetadataConfigurationRequest$ = [
  3,
  n0,
  _GBMCRe,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketMetadataConfigurationResult$ = [
  3,
  n0,
  _GBMCR,
  0,
  [_MCR],
  [() => MetadataConfigurationResult$],
  1
];
var GetBucketMetadataTableConfigurationOutput$ = [
  3,
  n0,
  _GBMTCO,
  0,
  [_GBMTCR],
  [[() => GetBucketMetadataTableConfigurationResult$, 16]]
];
var GetBucketMetadataTableConfigurationRequest$ = [
  3,
  n0,
  _GBMTCRe,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketMetadataTableConfigurationResult$ = [
  3,
  n0,
  _GBMTCR,
  0,
  [_MTCR, _S, _E],
  [() => MetadataTableConfigurationResult$, 0, () => ErrorDetails$],
  2
];
var GetBucketMetricsConfigurationOutput$ = [
  3,
  n0,
  _GBMCOe,
  0,
  [_MCe],
  [[() => MetricsConfiguration$, 16]]
];
var GetBucketMetricsConfigurationRequest$ = [
  3,
  n0,
  _GBMCRet,
  0,
  [_B, _I, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [0, { [_hH]: _xaebo }]],
  2
];
var GetBucketNotificationConfigurationRequest$ = [
  3,
  n0,
  _GBNCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketOwnershipControlsOutput$ = [
  3,
  n0,
  _GBOCO,
  0,
  [_OC],
  [[() => OwnershipControls$, 16]]
];
var GetBucketOwnershipControlsRequest$ = [
  3,
  n0,
  _GBOCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketPolicyOutput$ = [
  3,
  n0,
  _GBPO,
  0,
  [_Po],
  [[0, 16]]
];
var GetBucketPolicyRequest$ = [
  3,
  n0,
  _GBPR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketPolicyStatusOutput$ = [
  3,
  n0,
  _GBPSO,
  0,
  [_PS],
  [[() => PolicyStatus$, 16]]
];
var GetBucketPolicyStatusRequest$ = [
  3,
  n0,
  _GBPSR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketReplicationOutput$ = [
  3,
  n0,
  _GBRO,
  0,
  [_RCe],
  [[() => ReplicationConfiguration$, 16]]
];
var GetBucketReplicationRequest$ = [
  3,
  n0,
  _GBRR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketRequestPaymentOutput$ = [
  3,
  n0,
  _GBRPO,
  { [_xN]: _RPC },
  [_Pay],
  [0]
];
var GetBucketRequestPaymentRequest$ = [
  3,
  n0,
  _GBRPR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketTaggingOutput$ = [
  3,
  n0,
  _GBTO,
  { [_xN]: _Tag },
  [_TSa],
  [[() => TagSet, 0]],
  1
];
var GetBucketTaggingRequest$ = [
  3,
  n0,
  _GBTR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketVersioningOutput$ = [
  3,
  n0,
  _GBVO,
  { [_xN]: _VC },
  [_S, _MFAD],
  [0, [0, { [_xN]: _MDf }]]
];
var GetBucketVersioningRequest$ = [
  3,
  n0,
  _GBVR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetBucketWebsiteOutput$ = [
  3,
  n0,
  _GBWO,
  { [_xN]: _WC },
  [_RART, _IDn, _EDr, _RR],
  [() => RedirectAllRequestsTo$, () => IndexDocument$, () => ErrorDocument$, [() => RoutingRules, 0]]
];
var GetBucketWebsiteRequest$ = [
  3,
  n0,
  _GBWR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetObjectAclOutput$ = [
  3,
  n0,
  _GOAO,
  { [_xN]: _ACP },
  [_O, _G, _RC],
  [() => Owner$, [() => Grants, { [_xN]: _ACL }], [0, { [_hH]: _xarc }]]
];
var GetObjectAclRequest$ = [
  3,
  n0,
  _GOAR,
  0,
  [_B, _K, _VI, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  2
];
var GetObjectAnnotationOutput$ = [
  3,
  n0,
  _GOAOe,
  0,
  [_AP, _OVI, _LM, _CLo, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _SSE, _RC, _RS],
  [[() => StreamingBlob, 16], [0, { [_hH]: _xaovi }], [4, { [_hH]: _LM_ }], [1, { [_hH]: _CL__ }], [0, { [_hH]: _ET }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xarc }], [0, { [_hH]: _xars }]]
];
var GetObjectAnnotationRequest$ = [
  3,
  n0,
  _GOARe,
  0,
  [_B, _K, _AN, _VI, _RP, _EBO, _CMh],
  [[0, 1], [0, 1], [0, { [_hQ]: _aN }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xacm_ }]],
  3
];
var GetObjectAttributesOutput$ = [
  3,
  n0,
  _GOAOet,
  { [_xN]: _GOARet },
  [_DM, _LM, _VI, _RC, _ET, _C, _OP, _SC, _OS],
  [[2, { [_hH]: _xadm }], [4, { [_hH]: _LM_ }], [0, { [_hH]: _xavi }], [0, { [_hH]: _xarc }], 0, () => Checksum$, [() => GetObjectAttributesParts$, 0], 0, 1]
];
var GetObjectAttributesParts$ = [
  3,
  n0,
  _GOAP,
  0,
  [_TPC, _PNM, _NPNM, _MP, _IT, _Pa],
  [[1, { [_xN]: _PC }], 0, 0, 1, 2, [() => PartsList, { [_xF]: 1, [_xN]: _Par }]]
];
var GetObjectAttributesRequest$ = [
  3,
  n0,
  _GOARetb,
  0,
  [_B, _K, _OA, _VI, _MP, _PNM, _SSECA, _SSECK, _SSECKMD, _RP, _EBO],
  [[0, 1], [0, 1], [64 | 0, { [_hH]: _xaoa }], [0, { [_hQ]: _vI }], [1, { [_hH]: _xamp }], [0, { [_hH]: _xapnm }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  3
];
var GetObjectLegalHoldOutput$ = [
  3,
  n0,
  _GOLHO,
  0,
  [_LH],
  [[() => ObjectLockLegalHold$, { [_hP]: 1, [_xN]: _LH }]]
];
var GetObjectLegalHoldRequest$ = [
  3,
  n0,
  _GOLHR,
  0,
  [_B, _K, _VI, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  2
];
var GetObjectLockConfigurationOutput$ = [
  3,
  n0,
  _GOLCO,
  0,
  [_OLC],
  [[() => ObjectLockConfiguration$, 16]]
];
var GetObjectLockConfigurationRequest$ = [
  3,
  n0,
  _GOLCR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GetObjectOutput$ = [
  3,
  n0,
  _GOO,
  0,
  [_Bo, _DM, _AR, _Ex, _Re, _LM, _CLo, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _MM, _VI, _CC, _CDo, _CEo, _CL, _CR, _CTo, _Exp, _ES, _WRL, _SSE, _M, _SSECA, _SSECKMD, _SSEKMSKI, _BKE, _SC, _RC, _RS, _PC, _TC, _OLM, _OLRUD, _OLLHS],
  [[() => StreamingBlob, 16], [2, { [_hH]: _xadm }], [0, { [_hH]: _ar }], [0, { [_hH]: _xae }], [0, { [_hH]: _xar }], [4, { [_hH]: _LM_ }], [1, { [_hH]: _CL__ }], [0, { [_hH]: _ET }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [1, { [_hH]: _xamm }], [0, { [_hH]: _xavi }], [0, { [_hH]: _CC_ }], [0, { [_hH]: _CD_ }], [0, { [_hH]: _CE_ }], [0, { [_hH]: _CL_ }], [0, { [_hH]: _CR_ }], [0, { [_hH]: _CT_ }], [4, { [_hH]: _Exp }], [0, { [_hH]: _ES }], [0, { [_hH]: _xawrl }], [0, { [_hH]: _xasse }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xasc }], [0, { [_hH]: _xarc }], [0, { [_hH]: _xars }], [1, { [_hH]: _xampc }], [1, { [_hH]: _xatc }], [0, { [_hH]: _xaolm }], [5, { [_hH]: _xaolrud }], [0, { [_hH]: _xaollh }]]
];
var GetObjectRequest$ = [
  3,
  n0,
  _GOR,
  0,
  [_B, _K, _IM, _IMSf, _INM, _IUS, _Ra, _RCC, _RCD, _RCE, _RCL, _RCT, _RE, _VI, _SSECA, _SSECK, _SSECKMD, _RP, _PN, _EBO, _CMh],
  [[0, 1], [0, 1], [0, { [_hH]: _IM_ }], [4, { [_hH]: _IMS_ }], [0, { [_hH]: _INM_ }], [4, { [_hH]: _IUS_ }], [0, { [_hH]: _Ra }], [0, { [_hQ]: _rcc }], [0, { [_hQ]: _rcd }], [0, { [_hQ]: _rce }], [0, { [_hQ]: _rcl }], [0, { [_hQ]: _rct }], [6, { [_hQ]: _re }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [0, { [_hH]: _xarp }], [1, { [_hQ]: _pN }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xacm_ }]],
  2
];
var GetObjectRetentionOutput$ = [
  3,
  n0,
  _GORO,
  0,
  [_Ret],
  [[() => ObjectLockRetention$, { [_hP]: 1, [_xN]: _Ret }]]
];
var GetObjectRetentionRequest$ = [
  3,
  n0,
  _GORR,
  0,
  [_B, _K, _VI, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  2
];
var GetObjectTaggingOutput$ = [
  3,
  n0,
  _GOTO,
  { [_xN]: _Tag },
  [_TSa, _VI],
  [[() => TagSet, 0], [0, { [_hH]: _xavi }]],
  1
];
var GetObjectTaggingRequest$ = [
  3,
  n0,
  _GOTR,
  0,
  [_B, _K, _VI, _EBO, _RP],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xarp }]],
  2
];
var GetObjectTorrentOutput$ = [
  3,
  n0,
  _GOTOe,
  0,
  [_Bo, _RC],
  [[() => StreamingBlob, 16], [0, { [_hH]: _xarc }]]
];
var GetObjectTorrentRequest$ = [
  3,
  n0,
  _GOTRe,
  0,
  [_B, _K, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  2
];
var GetPublicAccessBlockOutput$ = [
  3,
  n0,
  _GPABO,
  0,
  [_PABC],
  [[() => PublicAccessBlockConfiguration$, 16]]
];
var GetPublicAccessBlockRequest$ = [
  3,
  n0,
  _GPABR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var GlacierJobParameters$ = [
  3,
  n0,
  _GJP,
  0,
  [_Ti],
  [0],
  1
];
var Grant$ = [
  3,
  n0,
  _Gr,
  0,
  [_Gra, _Pe],
  [[() => Grantee$, { [_xNm]: [_x, _hi] }], 0]
];
var Grantee$ = [
  3,
  n0,
  _Gra,
  0,
  [_Ty, _DN, _EA, _ID, _URI],
  [[0, { [_xA]: 1, [_xN]: _xs }], 0, 0, 0, 0],
  1
];
var HeadBucketOutput$ = [
  3,
  n0,
  _HBO,
  0,
  [_BA, _BLT, _BLN, _BR, _APA],
  [[0, { [_hH]: _xaba }], [0, { [_hH]: _xablt }], [0, { [_hH]: _xabln }], [0, { [_hH]: _xabr }], [2, { [_hH]: _xaapa }]]
];
var HeadBucketRequest$ = [
  3,
  n0,
  _HBR,
  0,
  [_B, _EBO],
  [[0, 1], [0, { [_hH]: _xaebo }]],
  1
];
var HeadObjectOutput$ = [
  3,
  n0,
  _HOO,
  0,
  [_DM, _AR, _Ex, _Re, _ASr, _LM, _CLo, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _ET, _MM, _VI, _CC, _CDo, _CEo, _CL, _CTo, _CR, _Exp, _ES, _WRL, _SSE, _M, _SSECA, _SSECKMD, _SSEKMSKI, _BKE, _SC, _RC, _RS, _PC, _TC, _OLM, _OLRUD, _OLLHS],
  [[2, { [_hH]: _xadm }], [0, { [_hH]: _ar }], [0, { [_hH]: _xae }], [0, { [_hH]: _xar }], [0, { [_hH]: _xaas }], [4, { [_hH]: _LM_ }], [1, { [_hH]: _CL__ }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [0, { [_hH]: _ET }], [1, { [_hH]: _xamm }], [0, { [_hH]: _xavi }], [0, { [_hH]: _CC_ }], [0, { [_hH]: _CD_ }], [0, { [_hH]: _CE_ }], [0, { [_hH]: _CL_ }], [0, { [_hH]: _CT_ }], [0, { [_hH]: _CR_ }], [4, { [_hH]: _Exp }], [0, { [_hH]: _ES }], [0, { [_hH]: _xawrl }], [0, { [_hH]: _xasse }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xasc }], [0, { [_hH]: _xarc }], [0, { [_hH]: _xars }], [1, { [_hH]: _xampc }], [1, { [_hH]: _xatc }], [0, { [_hH]: _xaolm }], [5, { [_hH]: _xaolrud }], [0, { [_hH]: _xaollh }]]
];
var HeadObjectRequest$ = [
  3,
  n0,
  _HOR,
  0,
  [_B, _K, _IM, _IMSf, _INM, _IUS, _Ra, _RCC, _RCD, _RCE, _RCL, _RCT, _RE, _VI, _SSECA, _SSECK, _SSECKMD, _RP, _PN, _EBO, _CMh],
  [[0, 1], [0, 1], [0, { [_hH]: _IM_ }], [4, { [_hH]: _IMS_ }], [0, { [_hH]: _INM_ }], [4, { [_hH]: _IUS_ }], [0, { [_hH]: _Ra }], [0, { [_hQ]: _rcc }], [0, { [_hQ]: _rcd }], [0, { [_hQ]: _rce }], [0, { [_hQ]: _rcl }], [0, { [_hQ]: _rct }], [6, { [_hQ]: _re }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [0, { [_hH]: _xarp }], [1, { [_hQ]: _pN }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xacm_ }]],
  2
];
var IndexDocument$ = [
  3,
  n0,
  _IDn,
  0,
  [_Su],
  [0],
  1
];
var Initiator$ = [
  3,
  n0,
  _In,
  0,
  [_ID, _DN],
  [0, 0]
];
var InputSerialization$ = [
  3,
  n0,
  _IS,
  0,
  [_CSV, _CTom, _JSON, _Parq],
  [() => CSVInput$, 0, () => JSONInput$, () => ParquetInput$]
];
var IntelligentTieringAndOperator$ = [
  3,
  n0,
  _ITAO,
  0,
  [_P, _T],
  [0, [() => TagSet, { [_xF]: 1, [_xN]: _Ta }]]
];
var IntelligentTieringConfiguration$ = [
  3,
  n0,
  _ITC,
  0,
  [_I, _S, _Tie, _F],
  [0, 0, [() => TieringList, { [_xF]: 1, [_xN]: _Tier }], [() => IntelligentTieringFilter$, 0]],
  3
];
var IntelligentTieringFilter$ = [
  3,
  n0,
  _ITF,
  0,
  [_P, _Ta, _An],
  [0, () => Tag$, [() => IntelligentTieringAndOperator$, 0]]
];
var InventoryConfiguration$ = [
  3,
  n0,
  _IC,
  0,
  [_Des, _IE, _I, _IOV, _Sc, _F, _OF],
  [[() => InventoryDestination$, 0], 2, 0, 0, () => InventorySchedule$, () => InventoryFilter$, [() => InventoryOptionalFields, 0]],
  5
];
var InventoryDestination$ = [
  3,
  n0,
  _IDnv,
  0,
  [_SBD],
  [[() => InventoryS3BucketDestination$, 0]],
  1
];
var InventoryEncryption$ = [
  3,
  n0,
  _IEn,
  0,
  [_SSES, _SSEKMS],
  [[() => SSES3$, { [_xN]: _SS }], [() => SSEKMS$, { [_xN]: _SK }]]
];
var InventoryFilter$ = [
  3,
  n0,
  _IF,
  0,
  [_P],
  [0],
  1
];
var InventoryS3BucketDestination$ = [
  3,
  n0,
  _ISBD,
  0,
  [_B, _Fo, _AI, _P, _En],
  [0, 0, 0, 0, [() => InventoryEncryption$, 0]],
  2
];
var InventorySchedule$ = [
  3,
  n0,
  _ISn,
  0,
  [_Fr],
  [0],
  1
];
var InventoryTableConfiguration$ = [
  3,
  n0,
  _ITCn,
  0,
  [_CS, _EC],
  [0, () => MetadataTableEncryptionConfiguration$],
  1
];
var InventoryTableConfigurationResult$ = [
  3,
  n0,
  _ITCR,
  0,
  [_CS, _TS, _E, _TN, _TA],
  [0, 0, () => ErrorDetails$, 0, 0],
  1
];
var InventoryTableConfigurationUpdates$ = [
  3,
  n0,
  _ITCU,
  0,
  [_CS, _EC],
  [0, () => MetadataTableEncryptionConfiguration$],
  1
];
var JournalTableConfiguration$ = [
  3,
  n0,
  _JTC,
  0,
  [_REe, _EC],
  [() => RecordExpiration$, () => MetadataTableEncryptionConfiguration$],
  1
];
var JournalTableConfigurationResult$ = [
  3,
  n0,
  _JTCR,
  0,
  [_TS, _TN, _REe, _E, _TA],
  [0, 0, () => RecordExpiration$, () => ErrorDetails$, 0],
  3
];
var JournalTableConfigurationUpdates$ = [
  3,
  n0,
  _JTCU,
  0,
  [_REe],
  [() => RecordExpiration$],
  1
];
var JSONInput$ = [
  3,
  n0,
  _JSONI,
  0,
  [_Ty],
  [0]
];
var JSONOutput$ = [
  3,
  n0,
  _JSONO,
  0,
  [_RD],
  [0]
];
var LambdaFunctionConfiguration$ = [
  3,
  n0,
  _LFC,
  0,
  [_LFA, _Ev, _I, _F],
  [[0, { [_xN]: _CF }], [64 | 0, { [_xF]: 1, [_xN]: _Eve }], 0, [() => NotificationConfigurationFilter$, 0]],
  2
];
var LifecycleExpiration$ = [
  3,
  n0,
  _LEi,
  0,
  [_Da, _D, _EODM],
  [5, 1, 2]
];
var LifecycleRule$ = [
  3,
  n0,
  _LR,
  0,
  [_S, _Ex, _ID, _P, _F, _Tr, _NVT, _NVE, _AIMU],
  [0, () => LifecycleExpiration$, 0, 0, [() => LifecycleRuleFilter$, 0], [() => TransitionList, { [_xF]: 1, [_xN]: _Tra }], [() => NoncurrentVersionTransitionList, { [_xF]: 1, [_xN]: _NVTo }], () => NoncurrentVersionExpiration$, () => AbortIncompleteMultipartUpload$],
  1
];
var LifecycleRuleAndOperator$ = [
  3,
  n0,
  _LRAO,
  0,
  [_P, _T, _OSGT, _OSLT],
  [0, [() => TagSet, { [_xF]: 1, [_xN]: _Ta }], 1, 1]
];
var LifecycleRuleFilter$ = [
  3,
  n0,
  _LRF,
  0,
  [_P, _Ta, _OSGT, _OSLT, _An],
  [0, () => Tag$, 1, 1, [() => LifecycleRuleAndOperator$, 0]]
];
var ListBucketAnalyticsConfigurationsOutput$ = [
  3,
  n0,
  _LBACO,
  { [_xN]: _LBACR },
  [_IT, _CTon, _NCT, _ACLn],
  [2, 0, 0, [() => AnalyticsConfigurationList, { [_xF]: 1, [_xN]: _ACn }]]
];
var ListBucketAnalyticsConfigurationsRequest$ = [
  3,
  n0,
  _LBACRi,
  0,
  [_B, _CTon, _EBO],
  [[0, 1], [0, { [_hQ]: _ct }], [0, { [_hH]: _xaebo }]],
  1
];
var ListBucketIntelligentTieringConfigurationsOutput$ = [
  3,
  n0,
  _LBITCO,
  0,
  [_IT, _CTon, _NCT, _ITCL],
  [2, 0, 0, [() => IntelligentTieringConfigurationList, { [_xF]: 1, [_xN]: _ITC }]]
];
var ListBucketIntelligentTieringConfigurationsRequest$ = [
  3,
  n0,
  _LBITCR,
  0,
  [_B, _CTon, _EBO],
  [[0, 1], [0, { [_hQ]: _ct }], [0, { [_hH]: _xaebo }]],
  1
];
var ListBucketInventoryConfigurationsOutput$ = [
  3,
  n0,
  _LBICO,
  { [_xN]: _LICR },
  [_CTon, _ICL, _IT, _NCT],
  [0, [() => InventoryConfigurationList, { [_xF]: 1, [_xN]: _IC }], 2, 0]
];
var ListBucketInventoryConfigurationsRequest$ = [
  3,
  n0,
  _LBICR,
  0,
  [_B, _CTon, _EBO],
  [[0, 1], [0, { [_hQ]: _ct }], [0, { [_hH]: _xaebo }]],
  1
];
var ListBucketMetricsConfigurationsOutput$ = [
  3,
  n0,
  _LBMCO,
  { [_xN]: _LMCR },
  [_IT, _CTon, _NCT, _MCL],
  [2, 0, 0, [() => MetricsConfigurationList, { [_xF]: 1, [_xN]: _MCe }]]
];
var ListBucketMetricsConfigurationsRequest$ = [
  3,
  n0,
  _LBMCR,
  0,
  [_B, _CTon, _EBO],
  [[0, 1], [0, { [_hQ]: _ct }], [0, { [_hH]: _xaebo }]],
  1
];
var ListBucketsOutput$ = [
  3,
  n0,
  _LBO,
  { [_xN]: _LAMBR },
  [_Bu, _O, _CTon, _P],
  [[() => Buckets, 0], () => Owner$, 0, 0]
];
var ListBucketsRequest$ = [
  3,
  n0,
  _LBR,
  0,
  [_MB, _CTon, _P, _BR],
  [[1, { [_hQ]: _mb }], [0, { [_hQ]: _ct }], [0, { [_hQ]: _p }], [0, { [_hQ]: _br }]]
];
var ListDirectoryBucketsOutput$ = [
  3,
  n0,
  _LDBO,
  { [_xN]: _LAMDBR },
  [_Bu, _CTon],
  [[() => Buckets, 0], 0]
];
var ListDirectoryBucketsRequest$ = [
  3,
  n0,
  _LDBR,
  0,
  [_CTon, _MDB],
  [[0, { [_hQ]: _ct }], [1, { [_hQ]: _mdb }]]
];
var ListMultipartUploadsOutput$ = [
  3,
  n0,
  _LMUO,
  { [_xN]: _LMUR },
  [_B, _KM, _UIM, _NKM, _P, _Deli, _NUIM, _MUa, _IT, _U, _CPom, _ETnc, _RC],
  [0, 0, 0, 0, 0, 0, 0, 1, 2, [() => MultipartUploadList, { [_xF]: 1, [_xN]: _Up }], [() => CommonPrefixList, { [_xF]: 1 }], 0, [0, { [_hH]: _xarc }]]
];
var ListMultipartUploadsRequest$ = [
  3,
  n0,
  _LMURi,
  0,
  [_B, _Deli, _ETnc, _KM, _MUa, _P, _UIM, _EBO, _RP],
  [[0, 1], [0, { [_hQ]: _d }], [0, { [_hQ]: _et }], [0, { [_hQ]: _km }], [1, { [_hQ]: _mu }], [0, { [_hQ]: _p }], [0, { [_hQ]: _uim }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xarp }]],
  1
];
var ListObjectAnnotationsOutput$ = [
  3,
  n0,
  _LOAO,
  0,
  [_Ann, _B, _K, _OVI, _APn, _MAR, _ACnn, _CTon, _NCT, _RC],
  [[() => AnnotationList, 0], 0, 0, [0, { [_hH]: _xaovi }], 0, 1, 1, 0, 0, [0, { [_hH]: _xarc }]]
];
var ListObjectAnnotationsRequest$ = [
  3,
  n0,
  _LOAR,
  0,
  [_B, _K, _VI, _MAR, _APn, _CTon, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [1, { [_hQ]: _mar }], [0, { [_hQ]: _ap }], [0, { [_hQ]: _ct }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  2
];
var ListObjectsOutput$ = [
  3,
  n0,
  _LOO,
  { [_xN]: _LBRi },
  [_IT, _Ma, _NM, _Con, _N, _P, _Deli, _MK, _CPom, _ETnc, _RC],
  [2, 0, 0, [() => ObjectList, { [_xF]: 1 }], 0, 0, 0, 1, [() => CommonPrefixList, { [_xF]: 1 }], 0, [0, { [_hH]: _xarc }]]
];
var ListObjectsRequest$ = [
  3,
  n0,
  _LOR,
  0,
  [_B, _Deli, _ETnc, _Ma, _MK, _P, _RP, _EBO, _OOA],
  [[0, 1], [0, { [_hQ]: _d }], [0, { [_hQ]: _et }], [0, { [_hQ]: _m }], [1, { [_hQ]: _mk }], [0, { [_hQ]: _p }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [64 | 0, { [_hH]: _xaooa }]],
  1
];
var ListObjectsV2Output$ = [
  3,
  n0,
  _LOVO,
  { [_xN]: _LBRi },
  [_IT, _Con, _N, _P, _Deli, _MK, _CPom, _ETnc, _KC, _CTon, _NCT, _SA, _RC],
  [2, [() => ObjectList, { [_xF]: 1 }], 0, 0, 0, 1, [() => CommonPrefixList, { [_xF]: 1 }], 0, 1, 0, 0, 0, [0, { [_hH]: _xarc }]]
];
var ListObjectsV2Request$ = [
  3,
  n0,
  _LOVR,
  0,
  [_B, _Deli, _ETnc, _MK, _P, _CTon, _FO, _SA, _RP, _EBO, _OOA],
  [[0, 1], [0, { [_hQ]: _d }], [0, { [_hQ]: _et }], [1, { [_hQ]: _mk }], [0, { [_hQ]: _p }], [0, { [_hQ]: _ct }], [2, { [_hQ]: _fo }], [0, { [_hQ]: _sa }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [64 | 0, { [_hH]: _xaooa }]],
  1
];
var ListObjectVersionsOutput$ = [
  3,
  n0,
  _LOVOi,
  { [_xN]: _LVR },
  [_IT, _KM, _VIM, _NKM, _NVIM, _Ve, _DMe, _N, _P, _Deli, _MK, _CPom, _ETnc, _RC],
  [2, 0, 0, 0, 0, [() => ObjectVersionList, { [_xF]: 1, [_xN]: _Ver }], [() => DeleteMarkers, { [_xF]: 1, [_xN]: _DM }], 0, 0, 0, 1, [() => CommonPrefixList, { [_xF]: 1 }], 0, [0, { [_hH]: _xarc }]]
];
var ListObjectVersionsRequest$ = [
  3,
  n0,
  _LOVRi,
  0,
  [_B, _Deli, _ETnc, _KM, _MK, _P, _VIM, _EBO, _RP, _OOA],
  [[0, 1], [0, { [_hQ]: _d }], [0, { [_hQ]: _et }], [0, { [_hQ]: _km }], [1, { [_hQ]: _mk }], [0, { [_hQ]: _p }], [0, { [_hQ]: _vim }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xarp }], [64 | 0, { [_hH]: _xaooa }]],
  1
];
var ListPartsOutput$ = [
  3,
  n0,
  _LPO,
  { [_xN]: _LPR },
  [_ADb, _ARI, _B, _K, _UI, _PNM, _NPNM, _MP, _IT, _Pa, _In, _O, _SC, _RC, _CA, _CT],
  [[4, { [_hH]: _xaad }], [0, { [_hH]: _xaari }], 0, 0, 0, 0, 0, 1, 2, [() => Parts, { [_xF]: 1, [_xN]: _Par }], () => Initiator$, () => Owner$, 0, [0, { [_hH]: _xarc }], 0, 0]
];
var ListPartsRequest$ = [
  3,
  n0,
  _LPRi,
  0,
  [_B, _K, _UI, _MP, _PNM, _RP, _EBO, _SSECA, _SSECK, _SSECKMD],
  [[0, 1], [0, 1], [0, { [_hQ]: _uI }], [1, { [_hQ]: _mp }], [0, { [_hQ]: _pnm }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }]],
  3
];
var LocationInfo$ = [
  3,
  n0,
  _LI,
  0,
  [_Ty, _N],
  [0, 0]
];
var LoggingEnabled$ = [
  3,
  n0,
  _LE,
  0,
  [_TB, _TP, _TG, _TOKF],
  [0, 0, [() => TargetGrants, 0], [() => TargetObjectKeyFormat$, 0]],
  2
];
var MetadataConfiguration$ = [
  3,
  n0,
  _MC,
  0,
  [_JTC, _ITCn, _ATC],
  [() => JournalTableConfiguration$, () => InventoryTableConfiguration$, () => AnnotationTableConfiguration$],
  1
];
var MetadataConfigurationResult$ = [
  3,
  n0,
  _MCR,
  0,
  [_DRes, _JTCR, _ITCR, _ATCR],
  [() => DestinationResult$, () => JournalTableConfigurationResult$, () => InventoryTableConfigurationResult$, () => AnnotationTableConfigurationResult$],
  1
];
var MetadataEntry$ = [
  3,
  n0,
  _ME,
  0,
  [_N, _V],
  [0, 0]
];
var MetadataTableConfiguration$ = [
  3,
  n0,
  _MTC,
  0,
  [_STD],
  [() => S3TablesDestination$],
  1
];
var MetadataTableConfigurationResult$ = [
  3,
  n0,
  _MTCR,
  0,
  [_STDR],
  [() => S3TablesDestinationResult$],
  1
];
var MetadataTableEncryptionConfiguration$ = [
  3,
  n0,
  _MTEC,
  0,
  [_SAs, _KKA],
  [0, 0],
  1
];
var Metrics$ = [
  3,
  n0,
  _Me,
  0,
  [_S, _ETv],
  [0, () => ReplicationTimeValue$],
  1
];
var MetricsAndOperator$ = [
  3,
  n0,
  _MAO,
  0,
  [_P, _T, _APAc],
  [0, [() => TagSet, { [_xF]: 1, [_xN]: _Ta }], 0]
];
var MetricsConfiguration$ = [
  3,
  n0,
  _MCe,
  0,
  [_I, _F],
  [0, [() => MetricsFilter$, 0]],
  1
];
var MultipartUpload$ = [
  3,
  n0,
  _MU,
  0,
  [_UI, _K, _Ini, _SC, _O, _In, _CA, _CT],
  [0, 0, 4, 0, () => Owner$, () => Initiator$, 0, 0]
];
var NoncurrentVersionExpiration$ = [
  3,
  n0,
  _NVE,
  0,
  [_ND, _NNV],
  [1, 1]
];
var NoncurrentVersionTransition$ = [
  3,
  n0,
  _NVTo,
  0,
  [_ND, _SC, _NNV],
  [1, 0, 1]
];
var NotificationConfiguration$ = [
  3,
  n0,
  _NC,
  0,
  [_TCo, _QCu, _LFCa, _EBC],
  [[() => TopicConfigurationList, { [_xF]: 1, [_xN]: _TCop }], [() => QueueConfigurationList, { [_xF]: 1, [_xN]: _QCue }], [() => LambdaFunctionConfigurationList, { [_xF]: 1, [_xN]: _CFC }], () => EventBridgeConfiguration$]
];
var NotificationConfigurationFilter$ = [
  3,
  n0,
  _NCF,
  0,
  [_K],
  [[() => S3KeyFilter$, { [_xN]: _SKe }]]
];
var _Object$ = [
  3,
  n0,
  _Obj,
  0,
  [_K, _LM, _ET, _CA, _CT, _Si, _SC, _O, _RSe],
  [0, 4, 0, [64 | 0, { [_xF]: 1 }], 0, 1, 0, () => Owner$, () => RestoreStatus$]
];
var ObjectIdentifier$ = [
  3,
  n0,
  _OI,
  0,
  [_K, _VI, _ET, _LMT, _Si],
  [0, 0, 0, 6, 1],
  1
];
var ObjectLockConfiguration$ = [
  3,
  n0,
  _OLC,
  0,
  [_OLE, _Rul],
  [0, () => ObjectLockRule$]
];
var ObjectLockLegalHold$ = [
  3,
  n0,
  _OLLH,
  0,
  [_S],
  [0]
];
var ObjectLockRetention$ = [
  3,
  n0,
  _OLR,
  0,
  [_Mo, _RUD],
  [0, 5]
];
var ObjectLockRule$ = [
  3,
  n0,
  _OLRb,
  0,
  [_DRe],
  [() => DefaultRetention$]
];
var ObjectPart$ = [
  3,
  n0,
  _OPb,
  0,
  [_PN, _Si, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var ObjectVersion$ = [
  3,
  n0,
  _OV,
  0,
  [_ET, _CA, _CT, _Si, _SC, _K, _VI, _IL, _LM, _O, _RSe],
  [0, [64 | 0, { [_xF]: 1 }], 0, 1, 0, 0, 0, 2, 4, () => Owner$, () => RestoreStatus$]
];
var OutputLocation$ = [
  3,
  n0,
  _OL,
  0,
  [_S_],
  [[() => S3Location$, 0]]
];
var OutputSerialization$ = [
  3,
  n0,
  _OSu,
  0,
  [_CSV, _JSON],
  [() => CSVOutput$, () => JSONOutput$]
];
var Owner$ = [
  3,
  n0,
  _O,
  0,
  [_DN, _ID],
  [0, 0]
];
var OwnershipControls$ = [
  3,
  n0,
  _OC,
  0,
  [_Ru],
  [[() => OwnershipControlsRules, { [_xF]: 1, [_xN]: _Rul }]],
  1
];
var OwnershipControlsRule$ = [
  3,
  n0,
  _OCR,
  0,
  [_OO],
  [0],
  1
];
var ParquetInput$ = [
  3,
  n0,
  _PI,
  0,
  [],
  []
];
var Part$ = [
  3,
  n0,
  _Par,
  0,
  [_PN, _LM, _ET, _Si, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe],
  [1, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var PartitionedPrefix$ = [
  3,
  n0,
  _PP,
  { [_xN]: _PP },
  [_PDS],
  [0]
];
var PolicyStatus$ = [
  3,
  n0,
  _PS,
  0,
  [_IPs],
  [[2, { [_xN]: _IPs }]]
];
var Progress$ = [
  3,
  n0,
  _Pr,
  0,
  [_BS, _BP, _BRy],
  [1, 1, 1]
];
var ProgressEvent$ = [
  3,
  n0,
  _PE,
  0,
  [_Det],
  [[() => Progress$, { [_eP]: 1 }]]
];
var PublicAccessBlockConfiguration$ = [
  3,
  n0,
  _PABC,
  0,
  [_BPA, _IPA, _BPP, _RPB],
  [[2, { [_xN]: _BPA }], [2, { [_xN]: _IPA }], [2, { [_xN]: _BPP }], [2, { [_xN]: _RPB }]]
];
var PutBucketAbacRequest$ = [
  3,
  n0,
  _PBAR,
  0,
  [_B, _AS, _CMDo, _CA, _EBO],
  [[0, 1], [() => AbacStatus$, { [_hP]: 1, [_xN]: _AS }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketAccelerateConfigurationRequest$ = [
  3,
  n0,
  _PBACR,
  0,
  [_B, _AC, _EBO, _CA],
  [[0, 1], [() => AccelerateConfiguration$, { [_hP]: 1, [_xN]: _AC }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasca }]],
  2
];
var PutBucketAclRequest$ = [
  3,
  n0,
  _PBARu,
  0,
  [_B, _ACL_, _ACP, _CMDo, _CA, _GFC, _GR, _GRACP, _GW, _GWACP, _EBO],
  [[0, 1], [0, { [_hH]: _xaa }], [() => AccessControlPolicy$, { [_hP]: 1, [_xN]: _ACP }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagw }], [0, { [_hH]: _xagwa }], [0, { [_hH]: _xaebo }]],
  1
];
var PutBucketAnalyticsConfigurationRequest$ = [
  3,
  n0,
  _PBACRu,
  0,
  [_B, _I, _ACn, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [() => AnalyticsConfiguration$, { [_hP]: 1, [_xN]: _ACn }], [0, { [_hH]: _xaebo }]],
  3
];
var PutBucketCorsRequest$ = [
  3,
  n0,
  _PBCR,
  0,
  [_B, _CORSC, _CMDo, _CA, _EBO],
  [[0, 1], [() => CORSConfiguration$, { [_hP]: 1, [_xN]: _CORSC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketEncryptionRequest$ = [
  3,
  n0,
  _PBER,
  0,
  [_B, _SSEC, _CMDo, _CA, _EBO],
  [[0, 1], [() => ServerSideEncryptionConfiguration$, { [_hP]: 1, [_xN]: _SSEC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketIntelligentTieringConfigurationRequest$ = [
  3,
  n0,
  _PBITCR,
  0,
  [_B, _I, _ITC, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [() => IntelligentTieringConfiguration$, { [_hP]: 1, [_xN]: _ITC }], [0, { [_hH]: _xaebo }]],
  3
];
var PutBucketInventoryConfigurationRequest$ = [
  3,
  n0,
  _PBICR,
  0,
  [_B, _I, _IC, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [() => InventoryConfiguration$, { [_hP]: 1, [_xN]: _IC }], [0, { [_hH]: _xaebo }]],
  3
];
var PutBucketLifecycleConfigurationOutput$ = [
  3,
  n0,
  _PBLCO,
  0,
  [_TDMOS],
  [[0, { [_hH]: _xatdmos }]]
];
var PutBucketLifecycleConfigurationRequest$ = [
  3,
  n0,
  _PBLCR,
  0,
  [_B, _CA, _LCi, _EBO, _TDMOS],
  [[0, 1], [0, { [_hH]: _xasca }], [() => BucketLifecycleConfiguration$, { [_hP]: 1, [_xN]: _LCi }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xatdmos }]],
  1
];
var PutBucketLoggingRequest$ = [
  3,
  n0,
  _PBLR,
  0,
  [_B, _BLS, _CMDo, _CA, _EBO],
  [[0, 1], [() => BucketLoggingStatus$, { [_hP]: 1, [_xN]: _BLS }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketMetricsConfigurationRequest$ = [
  3,
  n0,
  _PBMCR,
  0,
  [_B, _I, _MCe, _EBO],
  [[0, 1], [0, { [_hQ]: _i }], [() => MetricsConfiguration$, { [_hP]: 1, [_xN]: _MCe }], [0, { [_hH]: _xaebo }]],
  3
];
var PutBucketNotificationConfigurationRequest$ = [
  3,
  n0,
  _PBNCR,
  0,
  [_B, _NC, _EBO, _SDV],
  [[0, 1], [() => NotificationConfiguration$, { [_hP]: 1, [_xN]: _NC }], [0, { [_hH]: _xaebo }], [2, { [_hH]: _xasdv }]],
  2
];
var PutBucketOwnershipControlsRequest$ = [
  3,
  n0,
  _PBOCR,
  0,
  [_B, _OC, _CMDo, _EBO, _CA],
  [[0, 1], [() => OwnershipControls$, { [_hP]: 1, [_xN]: _OC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasca }]],
  2
];
var PutBucketPolicyRequest$ = [
  3,
  n0,
  _PBPR,
  0,
  [_B, _Po, _CMDo, _CA, _CRSBA, _EBO],
  [[0, 1], [0, 16], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [2, { [_hH]: _xacrsba }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketReplicationRequest$ = [
  3,
  n0,
  _PBRR,
  0,
  [_B, _RCe, _CMDo, _CA, _To, _EBO],
  [[0, 1], [() => ReplicationConfiguration$, { [_hP]: 1, [_xN]: _RCe }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xabolt }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketRequestPaymentRequest$ = [
  3,
  n0,
  _PBRPR,
  0,
  [_B, _RPC, _CMDo, _CA, _EBO],
  [[0, 1], [() => RequestPaymentConfiguration$, { [_hP]: 1, [_xN]: _RPC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketTaggingRequest$ = [
  3,
  n0,
  _PBTR,
  0,
  [_B, _Tag, _CMDo, _CA, _EBO],
  [[0, 1], [() => Tagging$, { [_hP]: 1, [_xN]: _Tag }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketVersioningRequest$ = [
  3,
  n0,
  _PBVR,
  0,
  [_B, _VC, _CMDo, _CA, _MFA, _EBO],
  [[0, 1], [() => VersioningConfiguration$, { [_hP]: 1, [_xN]: _VC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xam_ }], [0, { [_hH]: _xaebo }]],
  2
];
var PutBucketWebsiteRequest$ = [
  3,
  n0,
  _PBWR,
  0,
  [_B, _WC, _CMDo, _CA, _EBO],
  [[0, 1], [() => WebsiteConfiguration$, { [_hP]: 1, [_xN]: _WC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutObjectAclOutput$ = [
  3,
  n0,
  _POAO,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var PutObjectAclRequest$ = [
  3,
  n0,
  _POAR,
  0,
  [_B, _K, _ACL_, _ACP, _CMDo, _CA, _GFC, _GR, _GRACP, _GW, _GWACP, _RP, _VI, _EBO],
  [[0, 1], [0, 1], [0, { [_hH]: _xaa }], [() => AccessControlPolicy$, { [_hP]: 1, [_xN]: _ACP }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagw }], [0, { [_hH]: _xagwa }], [0, { [_hH]: _xarp }], [0, { [_hQ]: _vI }], [0, { [_hH]: _xaebo }]],
  2
];
var PutObjectAnnotationOutput$ = [
  3,
  n0,
  _POAOu,
  0,
  [_K, _AN, _OVI, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _SSE, _RC],
  [0, 0, [0, { [_hH]: _xaovi }], [0, { [_hH]: _ET }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xarc }]]
];
var PutObjectAnnotationRequest$ = [
  3,
  n0,
  _POARu,
  0,
  [_B, _K, _AN, _AP, _VI, _OIM, _CA, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CMDo, _RP, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _aN }], [() => StreamingBlob, 16], [0, { [_hQ]: _vI }], [0, { [_hH]: _xaoim }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _CM }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  4
];
var PutObjectLegalHoldOutput$ = [
  3,
  n0,
  _POLHO,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var PutObjectLegalHoldRequest$ = [
  3,
  n0,
  _POLHR,
  0,
  [_B, _K, _LH, _RP, _VI, _CMDo, _CA, _EBO],
  [[0, 1], [0, 1], [() => ObjectLockLegalHold$, { [_hP]: 1, [_xN]: _LH }], [0, { [_hH]: _xarp }], [0, { [_hQ]: _vI }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutObjectLockConfigurationOutput$ = [
  3,
  n0,
  _POLCO,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var PutObjectLockConfigurationRequest$ = [
  3,
  n0,
  _POLCR,
  0,
  [_B, _OLC, _RP, _To, _CMDo, _CA, _EBO],
  [[0, 1], [() => ObjectLockConfiguration$, { [_hP]: 1, [_xN]: _OLC }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xabolt }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  1
];
var PutObjectOutput$ = [
  3,
  n0,
  _POO,
  0,
  [_Ex, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _CT, _SSE, _VI, _SSECA, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _Si, _RC],
  [[0, { [_hH]: _xae }], [0, { [_hH]: _ET }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xact }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xavi }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [1, { [_hH]: _xaos }], [0, { [_hH]: _xarc }]]
];
var PutObjectRequest$ = [
  3,
  n0,
  _POR,
  0,
  [_B, _K, _ACL_, _Bo, _CC, _CDo, _CEo, _CL, _CLo, _CMDo, _CTo, _CA, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _Exp, _IM, _INM, _GFC, _GR, _GRACP, _GWACP, _WOB, _M, _SSE, _SC, _WRL, _SSECA, _SSECK, _SSECKMD, _SSEKMSKI, _SSEKMSEC, _BKE, _RP, _Tag, _OLM, _OLRUD, _OLLHS, _EBO],
  [[0, 1], [0, 1], [0, { [_hH]: _xaa }], [() => StreamingBlob, 16], [0, { [_hH]: _CC_ }], [0, { [_hH]: _CD_ }], [0, { [_hH]: _CE_ }], [0, { [_hH]: _CL_ }], [1, { [_hH]: _CL__ }], [0, { [_hH]: _CM }], [0, { [_hH]: _CT_ }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [4, { [_hH]: _Exp }], [0, { [_hH]: _IM_ }], [0, { [_hH]: _INM_ }], [0, { [_hH]: _xagfc }], [0, { [_hH]: _xagr }], [0, { [_hH]: _xagra }], [0, { [_hH]: _xagwa }], [1, { [_hH]: _xawob }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xasse }], [0, { [_hH]: _xasc }], [0, { [_hH]: _xawrl }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [() => SSEKMSEncryptionContext, { [_hH]: _xassec }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xat }], [0, { [_hH]: _xaolm }], [5, { [_hH]: _xaolrud }], [0, { [_hH]: _xaollh }], [0, { [_hH]: _xaebo }]],
  2
];
var PutObjectRetentionOutput$ = [
  3,
  n0,
  _PORO,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var PutObjectRetentionRequest$ = [
  3,
  n0,
  _PORR,
  0,
  [_B, _K, _Ret, _RP, _VI, _BGR, _CMDo, _CA, _EBO],
  [[0, 1], [0, 1], [() => ObjectLockRetention$, { [_hP]: 1, [_xN]: _Ret }], [0, { [_hH]: _xarp }], [0, { [_hQ]: _vI }], [2, { [_hH]: _xabgr }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var PutObjectTaggingOutput$ = [
  3,
  n0,
  _POTO,
  0,
  [_VI],
  [[0, { [_hH]: _xavi }]]
];
var PutObjectTaggingRequest$ = [
  3,
  n0,
  _POTR,
  0,
  [_B, _K, _Tag, _VI, _CMDo, _CA, _EBO, _RP],
  [[0, 1], [0, 1], [() => Tagging$, { [_hP]: 1, [_xN]: _Tag }], [0, { [_hQ]: _vI }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xarp }]],
  3
];
var PutPublicAccessBlockRequest$ = [
  3,
  n0,
  _PPABR,
  0,
  [_B, _PABC, _CMDo, _CA, _EBO],
  [[0, 1], [() => PublicAccessBlockConfiguration$, { [_hP]: 1, [_xN]: _PABC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var QueueConfiguration$ = [
  3,
  n0,
  _QCue,
  0,
  [_QA, _Ev, _I, _F],
  [[0, { [_xN]: _Qu }], [64 | 0, { [_xF]: 1, [_xN]: _Eve }], 0, [() => NotificationConfigurationFilter$, 0]],
  2
];
var RecordExpiration$ = [
  3,
  n0,
  _REe,
  0,
  [_Ex, _D],
  [0, 1],
  1
];
var RecordsEvent$ = [
  3,
  n0,
  _REec,
  0,
  [_Payl],
  [[21, { [_eP]: 1 }]]
];
var Redirect$ = [
  3,
  n0,
  _Red,
  0,
  [_HN, _HRC, _Pro, _RKPW, _RKW],
  [0, 0, 0, 0, 0]
];
var RedirectAllRequestsTo$ = [
  3,
  n0,
  _RART,
  0,
  [_HN, _Pro],
  [0, 0],
  1
];
var RenameObjectOutput$ = [
  3,
  n0,
  _ROO,
  0,
  [],
  []
];
var RenameObjectRequest$ = [
  3,
  n0,
  _ROR,
  0,
  [_B, _K, _RSen, _DIM, _DINM, _DIMS, _DIUS, _SIM, _SINM, _SIMS, _SIUS, _CTl],
  [[0, 1], [0, 1], [0, { [_hH]: _xars_ }], [0, { [_hH]: _IM_ }], [0, { [_hH]: _INM_ }], [4, { [_hH]: _IMS_ }], [4, { [_hH]: _IUS_ }], [0, { [_hH]: _xarsim }], [0, { [_hH]: _xarsinm }], [6, { [_hH]: _xarsims }], [6, { [_hH]: _xarsius }], [0, { [_hH]: _xact_, [_iT]: 1 }]],
  3
];
var ReplicaModifications$ = [
  3,
  n0,
  _RM,
  0,
  [_S],
  [0],
  1
];
var ReplicationConfiguration$ = [
  3,
  n0,
  _RCe,
  0,
  [_R, _Ru],
  [0, [() => ReplicationRules, { [_xF]: 1, [_xN]: _Rul }]],
  2
];
var ReplicationRule$ = [
  3,
  n0,
  _RRe,
  0,
  [_S, _Des, _ID, _Pri, _P, _F, _SSC, _EOR, _DMR],
  [0, () => Destination$, 0, 1, 0, [() => ReplicationRuleFilter$, 0], () => SourceSelectionCriteria$, () => ExistingObjectReplication$, () => DeleteMarkerReplication$],
  2
];
var ReplicationRuleAndOperator$ = [
  3,
  n0,
  _RRAO,
  0,
  [_P, _T],
  [0, [() => TagSet, { [_xF]: 1, [_xN]: _Ta }]]
];
var ReplicationRuleFilter$ = [
  3,
  n0,
  _RRF,
  0,
  [_P, _Ta, _An],
  [0, () => Tag$, [() => ReplicationRuleAndOperator$, 0]]
];
var ReplicationTime$ = [
  3,
  n0,
  _RT,
  0,
  [_S, _Tim],
  [0, () => ReplicationTimeValue$],
  2
];
var ReplicationTimeValue$ = [
  3,
  n0,
  _RTV,
  0,
  [_Mi],
  [1]
];
var RequestPaymentConfiguration$ = [
  3,
  n0,
  _RPC,
  0,
  [_Pay],
  [0],
  1
];
var RequestProgress$ = [
  3,
  n0,
  _RPe,
  0,
  [_Ena],
  [2]
];
var RestoreObjectOutput$ = [
  3,
  n0,
  _ROOe,
  0,
  [_RC, _ROP],
  [[0, { [_hH]: _xarc }], [0, { [_hH]: _xarop }]]
];
var RestoreObjectRequest$ = [
  3,
  n0,
  _RORe,
  0,
  [_B, _K, _VI, _RRes, _RP, _CA, _EBO],
  [[0, 1], [0, 1], [0, { [_hQ]: _vI }], [() => RestoreRequest$, { [_hP]: 1, [_xN]: _RRes }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var RestoreRequest$ = [
  3,
  n0,
  _RRes,
  0,
  [_D, _GJP, _Ty, _Ti, _Desc, _SP, _OL],
  [1, () => GlacierJobParameters$, 0, 0, 0, () => SelectParameters$, [() => OutputLocation$, 0]]
];
var RestoreStatus$ = [
  3,
  n0,
  _RSe,
  0,
  [_IRIP, _RED],
  [2, 4]
];
var RoutingRule$ = [
  3,
  n0,
  _RRo,
  0,
  [_Red, _Co],
  [() => Redirect$, () => Condition$],
  1
];
var S3KeyFilter$ = [
  3,
  n0,
  _SKF,
  0,
  [_FRi],
  [[() => FilterRuleList, { [_xF]: 1, [_xN]: _FR }]]
];
var S3Location$ = [
  3,
  n0,
  _SL,
  0,
  [_BNu, _P, _En, _CACL, _ACL, _Tag, _UM, _SC],
  [0, 0, [() => Encryption$, 0], 0, [() => Grants, 0], [() => Tagging$, 0], [() => UserMetadata, 0], 0],
  2
];
var S3TablesDestination$ = [
  3,
  n0,
  _STD,
  0,
  [_TBA, _TN],
  [0, 0],
  2
];
var S3TablesDestinationResult$ = [
  3,
  n0,
  _STDR,
  0,
  [_TBA, _TN, _TA, _TNa],
  [0, 0, 0, 0],
  4
];
var ScanRange$ = [
  3,
  n0,
  _SR,
  0,
  [_St, _End],
  [1, 1]
];
var SelectObjectContentOutput$ = [
  3,
  n0,
  _SOCO,
  0,
  [_Payl],
  [[() => SelectObjectContentEventStream$, 16]]
];
var SelectObjectContentRequest$ = [
  3,
  n0,
  _SOCR,
  0,
  [_B, _K, _Expr, _ETx, _IS, _OSu, _SSECA, _SSECK, _SSECKMD, _RPe, _SR, _EBO],
  [[0, 1], [0, 1], 0, 0, () => InputSerialization$, () => OutputSerialization$, [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], () => RequestProgress$, () => ScanRange$, [0, { [_hH]: _xaebo }]],
  6
];
var SelectParameters$ = [
  3,
  n0,
  _SP,
  0,
  [_IS, _ETx, _Expr, _OSu],
  [() => InputSerialization$, 0, 0, () => OutputSerialization$],
  4
];
var ServerSideEncryptionByDefault$ = [
  3,
  n0,
  _SSEBD,
  0,
  [_SSEA, _KMSMKID],
  [0, [() => SSEKMSKeyId, 0]],
  1
];
var ServerSideEncryptionConfiguration$ = [
  3,
  n0,
  _SSEC,
  0,
  [_Ru],
  [[() => ServerSideEncryptionRules, { [_xF]: 1, [_xN]: _Rul }]],
  1
];
var ServerSideEncryptionRule$ = [
  3,
  n0,
  _SSER,
  0,
  [_ASSEBD, _BKE, _BET],
  [[() => ServerSideEncryptionByDefault$, 0], 2, [() => BlockedEncryptionTypes$, 0]]
];
var SessionCredentials$ = [
  3,
  n0,
  _SCe,
  0,
  [_AKI, _SAK, _ST, _Ex],
  [[0, { [_xN]: _AKI }], [() => SessionCredentialValue, { [_xN]: _SAK }], [() => SessionCredentialValue, { [_xN]: _ST }], [4, { [_xN]: _Ex }]],
  4
];
var SimplePrefix$ = [
  3,
  n0,
  _SPi,
  { [_xN]: _SPi },
  [],
  []
];
var SourceSelectionCriteria$ = [
  3,
  n0,
  _SSC,
  0,
  [_SKEO, _RM],
  [() => SseKmsEncryptedObjects$, () => ReplicaModifications$]
];
var SSEKMS$ = [
  3,
  n0,
  _SSEKMS,
  { [_xN]: _SK },
  [_KI],
  [[() => SSEKMSKeyId, 0]],
  1
];
var SseKmsEncryptedObjects$ = [
  3,
  n0,
  _SKEO,
  0,
  [_S],
  [0],
  1
];
var SSEKMSEncryption$ = [
  3,
  n0,
  _SSEKMSE,
  { [_xN]: _SK },
  [_KMSKA, _BKE],
  [[() => NonEmptyKmsKeyArnString, 0], 2],
  1
];
var SSES3$ = [
  3,
  n0,
  _SSES,
  { [_xN]: _SS },
  [],
  []
];
var Stats$ = [
  3,
  n0,
  _Sta,
  0,
  [_BS, _BP, _BRy],
  [1, 1, 1]
];
var StatsEvent$ = [
  3,
  n0,
  _SE,
  0,
  [_Det],
  [[() => Stats$, { [_eP]: 1 }]]
];
var StorageClassAnalysis$ = [
  3,
  n0,
  _SCA,
  0,
  [_DE],
  [() => StorageClassAnalysisDataExport$]
];
var StorageClassAnalysisDataExport$ = [
  3,
  n0,
  _SCADE,
  0,
  [_OSV, _Des],
  [0, () => AnalyticsExportDestination$],
  2
];
var Tag$ = [
  3,
  n0,
  _Ta,
  0,
  [_K, _V],
  [0, 0],
  2
];
var Tagging$ = [
  3,
  n0,
  _Tag,
  0,
  [_TSa],
  [[() => TagSet, 0]],
  1
];
var TargetGrant$ = [
  3,
  n0,
  _TGa,
  0,
  [_Gra, _Pe],
  [[() => Grantee$, { [_xNm]: [_x, _hi] }], 0]
];
var TargetObjectKeyFormat$ = [
  3,
  n0,
  _TOKF,
  0,
  [_SPi, _PP],
  [[() => SimplePrefix$, { [_xN]: _SPi }], [() => PartitionedPrefix$, { [_xN]: _PP }]]
];
var Tiering$ = [
  3,
  n0,
  _Tier,
  0,
  [_D, _AT],
  [1, 0],
  2
];
var TopicConfiguration$ = [
  3,
  n0,
  _TCop,
  0,
  [_TAo, _Ev, _I, _F],
  [[0, { [_xN]: _Top }], [64 | 0, { [_xF]: 1, [_xN]: _Eve }], 0, [() => NotificationConfigurationFilter$, 0]],
  2
];
var Transition$ = [
  3,
  n0,
  _Tra,
  0,
  [_Da, _D, _SC],
  [5, 1, 0]
];
var UpdateBucketMetadataAnnotationTableConfigurationRequest$ = [
  3,
  n0,
  _UBMATCR,
  0,
  [_B, _ATC, _CMDo, _CA, _EBO],
  [[0, 1], [() => AnnotationTableConfigurationUpdates$, { [_hP]: 1, [_xN]: _ATC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var UpdateBucketMetadataInventoryTableConfigurationRequest$ = [
  3,
  n0,
  _UBMITCR,
  0,
  [_B, _ITCn, _CMDo, _CA, _EBO],
  [[0, 1], [() => InventoryTableConfigurationUpdates$, { [_hP]: 1, [_xN]: _ITCn }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var UpdateBucketMetadataJournalTableConfigurationRequest$ = [
  3,
  n0,
  _UBMJTCR,
  0,
  [_B, _JTC, _CMDo, _CA, _EBO],
  [[0, 1], [() => JournalTableConfigurationUpdates$, { [_hP]: 1, [_xN]: _JTC }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xaebo }]],
  2
];
var UpdateObjectEncryptionRequest$ = [
  3,
  n0,
  _UOER,
  0,
  [_B, _K, _OE, _VI, _RP, _EBO, _CMDo, _CA],
  [[0, 1], [0, 1], [() => ObjectEncryption$, 16], [0, { [_hQ]: _vI }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }]],
  3
];
var UpdateObjectEncryptionResponse$ = [
  3,
  n0,
  _UOERp,
  0,
  [_RC],
  [[0, { [_hH]: _xarc }]]
];
var UploadPartCopyOutput$ = [
  3,
  n0,
  _UPCO,
  0,
  [_CSVI, _CPR, _SSE, _SSECA, _SSECKMD, _SSEKMSKI, _BKE, _RC],
  [[0, { [_hH]: _xacsvi }], [() => CopyPartResult$, 16], [0, { [_hH]: _xasse }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarc }]]
];
var UploadPartCopyRequest$ = [
  3,
  n0,
  _UPCR,
  0,
  [_B, _CSo, _K, _PN, _UI, _CSIM, _CSIMS, _CSINM, _CSIUS, _CSRo, _SSECA, _SSECK, _SSECKMD, _CSSSECA, _CSSSECK, _CSSSECKMD, _RP, _EBO, _ESBO],
  [[0, 1], [0, { [_hH]: _xacs___ }], [0, 1], [1, { [_hQ]: _pN }], [0, { [_hQ]: _uI }], [0, { [_hH]: _xacsim }], [4, { [_hH]: _xacsims }], [0, { [_hH]: _xacsinm }], [4, { [_hH]: _xacsius }], [0, { [_hH]: _xacsr }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [0, { [_hH]: _xacssseca }], [() => CopySourceSSECustomerKey, { [_hH]: _xacssseck }], [0, { [_hH]: _xacssseckM }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }], [0, { [_hH]: _xasebo }]],
  5
];
var UploadPartOutput$ = [
  3,
  n0,
  _UPO,
  0,
  [_SSE, _ET, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _SSECA, _SSECKMD, _SSEKMSKI, _BKE, _RC],
  [[0, { [_hH]: _xasse }], [0, { [_hH]: _ET }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xasseca }], [0, { [_hH]: _xasseckM }], [() => SSEKMSKeyId, { [_hH]: _xasseakki }], [2, { [_hH]: _xassebke }], [0, { [_hH]: _xarc }]]
];
var UploadPartRequest$ = [
  3,
  n0,
  _UPR,
  0,
  [_B, _K, _PN, _UI, _Bo, _CLo, _CMDo, _CA, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _SSECA, _SSECK, _SSECKMD, _RP, _EBO],
  [[0, 1], [0, 1], [1, { [_hQ]: _pN }], [0, { [_hQ]: _uI }], [() => StreamingBlob, 16], [1, { [_hH]: _CL__ }], [0, { [_hH]: _CM }], [0, { [_hH]: _xasca }], [0, { [_hH]: _xacc }], [0, { [_hH]: _xacc_ }], [0, { [_hH]: _xacc__ }], [0, { [_hH]: _xacs }], [0, { [_hH]: _xacs_ }], [0, { [_hH]: _xacs__ }], [0, { [_hH]: _xacm }], [0, { [_hH]: _xacx }], [0, { [_hH]: _xacx_ }], [0, { [_hH]: _xacx__ }], [0, { [_hH]: _xasseca }], [() => SSECustomerKey, { [_hH]: _xasseck }], [0, { [_hH]: _xasseckM }], [0, { [_hH]: _xarp }], [0, { [_hH]: _xaebo }]],
  4
];
var VersioningConfiguration$ = [
  3,
  n0,
  _VC,
  0,
  [_MFAD, _S],
  [[0, { [_xN]: _MDf }], 0]
];
var WebsiteConfiguration$ = [
  3,
  n0,
  _WC,
  0,
  [_EDr, _IDn, _RART, _RR],
  [() => ErrorDocument$, () => IndexDocument$, () => RedirectAllRequestsTo$, [() => RoutingRules, 0]]
];
var WriteGetObjectResponseRequest$ = [
  3,
  n0,
  _WGORR,
  0,
  [_RReq, _RTe, _Bo, _SCt, _ECr, _EM, _AR, _CC, _CDo, _CEo, _CL, _CLo, _CR, _CTo, _CCRC, _CCRCC, _CCRCNVME, _CSHA, _CSHAh, _CSHAhe, _CMD, _CXXHASH, _CXXHASHh, _CXXHASHhe, _DM, _ET, _Exp, _Ex, _LM, _MM, _M, _OLM, _OLLHS, _OLRUD, _PC, _RS, _RC, _Re, _SSE, _SSECA, _SSEKMSKI, _SSECKMD, _SC, _TC, _VI, _BKE],
  [[0, { [_hL]: 1, [_hH]: _xarr }], [0, { [_hH]: _xart }], [() => StreamingBlob, 16], [1, { [_hH]: _xafs }], [0, { [_hH]: _xafec }], [0, { [_hH]: _xafem }], [0, { [_hH]: _xafhar }], [0, { [_hH]: _xafhCC }], [0, { [_hH]: _xafhCD }], [0, { [_hH]: _xafhCE }], [0, { [_hH]: _xafhCL }], [1, { [_hH]: _CL__ }], [0, { [_hH]: _xafhCR }], [0, { [_hH]: _xafhCT }], [0, { [_hH]: _xafhxacc }], [0, { [_hH]: _xafhxacc_ }], [0, { [_hH]: _xafhxacc__ }], [0, { [_hH]: _xafhxacs }], [0, { [_hH]: _xafhxacs_ }], [0, { [_hH]: _xafhxacs__ }], [0, { [_hH]: _xafhxacm }], [0, { [_hH]: _xafhxacx }], [0, { [_hH]: _xafhxacx_ }], [0, { [_hH]: _xafhxacx__ }], [2, { [_hH]: _xafhxadm }], [0, { [_hH]: _xafhE }], [4, { [_hH]: _xafhE_ }], [0, { [_hH]: _xafhxae }], [4, { [_hH]: _xafhLM }], [1, { [_hH]: _xafhxamm }], [128 | 0, { [_hPH]: _xam }], [0, { [_hH]: _xafhxaolm }], [0, { [_hH]: _xafhxaollh }], [5, { [_hH]: _xafhxaolrud }], [1, { [_hH]: _xafhxampc }], [0, { [_hH]: _xafhxars }], [0, { [_hH]: _xafhxarc }], [0, { [_hH]: _xafhxar }], [0, { [_hH]: _xafhxasse }], [0, { [_hH]: _xafhxasseca }], [() => SSEKMSKeyId, { [_hH]: _xafhxasseakki }], [0, { [_hH]: _xafhxasseckM }], [0, { [_hH]: _xafhxasc }], [1, { [_hH]: _xafhxatc }], [0, { [_hH]: _xafhxavi }], [2, { [_hH]: _xafhxassebke }]],
  2
];
var __Unit = "unit";
var AllowedHeaders = 64 | 0;
var AllowedMethods = 64 | 0;
var AllowedOrigins = 64 | 0;
var AnalyticsConfigurationList = [
  1,
  n0,
  _ACLn,
  0,
  [
    () => AnalyticsConfiguration$,
    0
  ]
];
var AnnotationList = [
  1,
  n0,
  _AL,
  0,
  [
    () => AnnotationEntry$,
    { [_xN]: _AE }
  ]
];
var Buckets = [
  1,
  n0,
  _Bu,
  0,
  [
    () => Bucket$,
    { [_xN]: _B }
  ]
];
var ChecksumAlgorithmList = 64 | 0;
var CommonPrefixList = [
  1,
  n0,
  _CPL,
  0,
  () => CommonPrefix$
];
var CompletedPartList = [
  1,
  n0,
  _CPLo,
  0,
  () => CompletedPart$
];
var CORSRules = [
  1,
  n0,
  _CORSR,
  0,
  [
    () => CORSRule$,
    0
  ]
];
var DeletedObjects = [
  1,
  n0,
  _DOe,
  0,
  () => DeletedObject$
];
var DeleteMarkers = [
  1,
  n0,
  _DMe,
  0,
  () => DeleteMarkerEntry$
];
var EncryptionTypeList = [
  1,
  n0,
  _ETL,
  0,
  [
    0,
    { [_xN]: _ETn }
  ]
];
var Errors = [
  1,
  n0,
  _Er,
  0,
  () => _Error$
];
var EventList = 64 | 0;
var ExposeHeaders = 64 | 0;
var FilterRuleList = [
  1,
  n0,
  _FRL,
  0,
  () => FilterRule$
];
var Grants = [
  1,
  n0,
  _G,
  0,
  [
    () => Grant$,
    { [_xN]: _Gr }
  ]
];
var IntelligentTieringConfigurationList = [
  1,
  n0,
  _ITCL,
  0,
  [
    () => IntelligentTieringConfiguration$,
    0
  ]
];
var InventoryConfigurationList = [
  1,
  n0,
  _ICL,
  0,
  [
    () => InventoryConfiguration$,
    0
  ]
];
var InventoryOptionalFields = [
  1,
  n0,
  _IOF,
  0,
  [
    0,
    { [_xN]: _Fi }
  ]
];
var LambdaFunctionConfigurationList = [
  1,
  n0,
  _LFCL,
  0,
  [
    () => LambdaFunctionConfiguration$,
    0
  ]
];
var LifecycleRules = [
  1,
  n0,
  _LRi,
  0,
  [
    () => LifecycleRule$,
    0
  ]
];
var MetricsConfigurationList = [
  1,
  n0,
  _MCL,
  0,
  [
    () => MetricsConfiguration$,
    0
  ]
];
var MultipartUploadList = [
  1,
  n0,
  _MUL,
  0,
  () => MultipartUpload$
];
var NoncurrentVersionTransitionList = [
  1,
  n0,
  _NVTL,
  0,
  () => NoncurrentVersionTransition$
];
var ObjectAttributesList = 64 | 0;
var ObjectIdentifierList = [
  1,
  n0,
  _OIL,
  0,
  () => ObjectIdentifier$
];
var ObjectList = [
  1,
  n0,
  _OLb,
  0,
  [
    () => _Object$,
    0
  ]
];
var ObjectVersionList = [
  1,
  n0,
  _OVL,
  0,
  [
    () => ObjectVersion$,
    0
  ]
];
var OptionalObjectAttributesList = 64 | 0;
var OwnershipControlsRules = [
  1,
  n0,
  _OCRw,
  0,
  () => OwnershipControlsRule$
];
var Parts = [
  1,
  n0,
  _Pa,
  0,
  () => Part$
];
var PartsList = [
  1,
  n0,
  _PL,
  0,
  () => ObjectPart$
];
var QueueConfigurationList = [
  1,
  n0,
  _QCL,
  0,
  [
    () => QueueConfiguration$,
    0
  ]
];
var ReplicationRules = [
  1,
  n0,
  _RRep,
  0,
  [
    () => ReplicationRule$,
    0
  ]
];
var RoutingRules = [
  1,
  n0,
  _RR,
  0,
  [
    () => RoutingRule$,
    { [_xN]: _RRo }
  ]
];
var ServerSideEncryptionRules = [
  1,
  n0,
  _SSERe,
  0,
  [
    () => ServerSideEncryptionRule$,
    0
  ]
];
var TagSet = [
  1,
  n0,
  _TSa,
  0,
  [
    () => Tag$,
    { [_xN]: _Ta }
  ]
];
var TargetGrants = [
  1,
  n0,
  _TG,
  0,
  [
    () => TargetGrant$,
    { [_xN]: _Gr }
  ]
];
var TieringList = [
  1,
  n0,
  _TL,
  0,
  () => Tiering$
];
var TopicConfigurationList = [
  1,
  n0,
  _TCL,
  0,
  [
    () => TopicConfiguration$,
    0
  ]
];
var TransitionList = [
  1,
  n0,
  _TLr,
  0,
  () => Transition$
];
var UserMetadata = [
  1,
  n0,
  _UM,
  0,
  [
    () => MetadataEntry$,
    { [_xN]: _ME }
  ]
];
var Metadata = 128 | 0;
var AnalyticsFilter$ = [
  4,
  n0,
  _AF,
  0,
  [_P, _Ta, _An],
  [0, () => Tag$, [() => AnalyticsAndOperator$, 0]]
];
var MetricsFilter$ = [
  4,
  n0,
  _MF,
  0,
  [_P, _Ta, _APAc, _An],
  [0, () => Tag$, 0, [() => MetricsAndOperator$, 0]]
];
var ObjectEncryption$ = [
  4,
  n0,
  _OE,
  0,
  [_SSEKMS],
  [[() => SSEKMSEncryption$, { [_xN]: _SK }]]
];
var SelectObjectContentEventStream$ = [
  4,
  n0,
  _SOCES,
  { [_st]: 1 },
  [_Rec, _Sta, _Pr, _Cont, _End],
  [[() => RecordsEvent$, 0], [() => StatsEvent$, 0], [() => ProgressEvent$, 0], () => ContinuationEvent$, () => EndEvent$]
];
var AbortMultipartUpload$ = [
  9,
  n0,
  _AMU,
  { [_h]: ["DELETE", "/{Key+}?x-id=AbortMultipartUpload", 204] },
  () => AbortMultipartUploadRequest$,
  () => AbortMultipartUploadOutput$
];
var CompleteMultipartUpload$ = [
  9,
  n0,
  _CMUo,
  { [_h]: ["POST", "/{Key+}", 200] },
  () => CompleteMultipartUploadRequest$,
  () => CompleteMultipartUploadOutput$
];
var CopyObject$ = [
  9,
  n0,
  _CO,
  { [_h]: ["PUT", "/{Key+}?x-id=CopyObject", 200] },
  () => CopyObjectRequest$,
  () => CopyObjectOutput$
];
var CreateBucket$ = [
  9,
  n0,
  _CB,
  { [_h]: ["PUT", "/", 200] },
  () => CreateBucketRequest$,
  () => CreateBucketOutput$
];
var CreateBucketMetadataConfiguration$ = [
  9,
  n0,
  _CBMC,
  { [_hC]: "-", [_h]: ["POST", "/?metadataConfiguration", 200] },
  () => CreateBucketMetadataConfigurationRequest$,
  () => __Unit
];
var CreateBucketMetadataTableConfiguration$ = [
  9,
  n0,
  _CBMTC,
  { [_hC]: "-", [_h]: ["POST", "/?metadataTable", 200] },
  () => CreateBucketMetadataTableConfigurationRequest$,
  () => __Unit
];
var CreateMultipartUpload$ = [
  9,
  n0,
  _CMUr,
  { [_h]: ["POST", "/{Key+}?uploads", 200] },
  () => CreateMultipartUploadRequest$,
  () => CreateMultipartUploadOutput$
];
var CreateSession$ = [
  9,
  n0,
  _CSr,
  { [_h]: ["GET", "/?session", 200] },
  () => CreateSessionRequest$,
  () => CreateSessionOutput$
];
var DeleteBucket$ = [
  9,
  n0,
  _DB,
  { [_h]: ["DELETE", "/", 204] },
  () => DeleteBucketRequest$,
  () => __Unit
];
var DeleteBucketAnalyticsConfiguration$ = [
  9,
  n0,
  _DBAC,
  { [_h]: ["DELETE", "/?analytics", 204] },
  () => DeleteBucketAnalyticsConfigurationRequest$,
  () => __Unit
];
var DeleteBucketCors$ = [
  9,
  n0,
  _DBC,
  { [_h]: ["DELETE", "/?cors", 204] },
  () => DeleteBucketCorsRequest$,
  () => __Unit
];
var DeleteBucketEncryption$ = [
  9,
  n0,
  _DBE,
  { [_h]: ["DELETE", "/?encryption", 204] },
  () => DeleteBucketEncryptionRequest$,
  () => __Unit
];
var DeleteBucketIntelligentTieringConfiguration$ = [
  9,
  n0,
  _DBITC,
  { [_h]: ["DELETE", "/?intelligent-tiering", 204] },
  () => DeleteBucketIntelligentTieringConfigurationRequest$,
  () => __Unit
];
var DeleteBucketInventoryConfiguration$ = [
  9,
  n0,
  _DBIC,
  { [_h]: ["DELETE", "/?inventory", 204] },
  () => DeleteBucketInventoryConfigurationRequest$,
  () => __Unit
];
var DeleteBucketLifecycle$ = [
  9,
  n0,
  _DBL,
  { [_h]: ["DELETE", "/?lifecycle", 204] },
  () => DeleteBucketLifecycleRequest$,
  () => __Unit
];
var DeleteBucketMetadataConfiguration$ = [
  9,
  n0,
  _DBMC,
  { [_h]: ["DELETE", "/?metadataConfiguration", 204] },
  () => DeleteBucketMetadataConfigurationRequest$,
  () => __Unit
];
var DeleteBucketMetadataTableConfiguration$ = [
  9,
  n0,
  _DBMTC,
  { [_h]: ["DELETE", "/?metadataTable", 204] },
  () => DeleteBucketMetadataTableConfigurationRequest$,
  () => __Unit
];
var DeleteBucketMetricsConfiguration$ = [
  9,
  n0,
  _DBMCe,
  { [_h]: ["DELETE", "/?metrics", 204] },
  () => DeleteBucketMetricsConfigurationRequest$,
  () => __Unit
];
var DeleteBucketOwnershipControls$ = [
  9,
  n0,
  _DBOC,
  { [_h]: ["DELETE", "/?ownershipControls", 204] },
  () => DeleteBucketOwnershipControlsRequest$,
  () => __Unit
];
var DeleteBucketPolicy$ = [
  9,
  n0,
  _DBP,
  { [_h]: ["DELETE", "/?policy", 204] },
  () => DeleteBucketPolicyRequest$,
  () => __Unit
];
var DeleteBucketReplication$ = [
  9,
  n0,
  _DBRe,
  { [_h]: ["DELETE", "/?replication", 204] },
  () => DeleteBucketReplicationRequest$,
  () => __Unit
];
var DeleteBucketTagging$ = [
  9,
  n0,
  _DBT,
  { [_h]: ["DELETE", "/?tagging", 204] },
  () => DeleteBucketTaggingRequest$,
  () => __Unit
];
var DeleteBucketWebsite$ = [
  9,
  n0,
  _DBW,
  { [_h]: ["DELETE", "/?website", 204] },
  () => DeleteBucketWebsiteRequest$,
  () => __Unit
];
var DeleteObject$ = [
  9,
  n0,
  _DOel,
  { [_h]: ["DELETE", "/{Key+}?x-id=DeleteObject", 204] },
  () => DeleteObjectRequest$,
  () => DeleteObjectOutput$
];
var DeleteObjectAnnotation$ = [
  9,
  n0,
  _DOA,
  { [_h]: ["DELETE", "/{Key+}?annotation", 204] },
  () => DeleteObjectAnnotationRequest$,
  () => DeleteObjectAnnotationOutput$
];
var DeleteObjects$ = [
  9,
  n0,
  _DOele,
  { [_hC]: "-", [_h]: ["POST", "/?delete", 200] },
  () => DeleteObjectsRequest$,
  () => DeleteObjectsOutput$
];
var DeleteObjectTagging$ = [
  9,
  n0,
  _DOT,
  { [_h]: ["DELETE", "/{Key+}?tagging", 204] },
  () => DeleteObjectTaggingRequest$,
  () => DeleteObjectTaggingOutput$
];
var DeletePublicAccessBlock$ = [
  9,
  n0,
  _DPAB,
  { [_h]: ["DELETE", "/?publicAccessBlock", 204] },
  () => DeletePublicAccessBlockRequest$,
  () => __Unit
];
var GetBucketAbac$ = [
  9,
  n0,
  _GBA,
  { [_h]: ["GET", "/?abac", 200] },
  () => GetBucketAbacRequest$,
  () => GetBucketAbacOutput$
];
var GetBucketAccelerateConfiguration$ = [
  9,
  n0,
  _GBAC,
  { [_h]: ["GET", "/?accelerate", 200] },
  () => GetBucketAccelerateConfigurationRequest$,
  () => GetBucketAccelerateConfigurationOutput$
];
var GetBucketAcl$ = [
  9,
  n0,
  _GBAe,
  { [_h]: ["GET", "/?acl", 200] },
  () => GetBucketAclRequest$,
  () => GetBucketAclOutput$
];
var GetBucketAnalyticsConfiguration$ = [
  9,
  n0,
  _GBACe,
  { [_h]: ["GET", "/?analytics&x-id=GetBucketAnalyticsConfiguration", 200] },
  () => GetBucketAnalyticsConfigurationRequest$,
  () => GetBucketAnalyticsConfigurationOutput$
];
var GetBucketCors$ = [
  9,
  n0,
  _GBC,
  { [_h]: ["GET", "/?cors", 200] },
  () => GetBucketCorsRequest$,
  () => GetBucketCorsOutput$
];
var GetBucketEncryption$ = [
  9,
  n0,
  _GBE,
  { [_h]: ["GET", "/?encryption", 200] },
  () => GetBucketEncryptionRequest$,
  () => GetBucketEncryptionOutput$
];
var GetBucketIntelligentTieringConfiguration$ = [
  9,
  n0,
  _GBITC,
  { [_h]: ["GET", "/?intelligent-tiering&x-id=GetBucketIntelligentTieringConfiguration", 200] },
  () => GetBucketIntelligentTieringConfigurationRequest$,
  () => GetBucketIntelligentTieringConfigurationOutput$
];
var GetBucketInventoryConfiguration$ = [
  9,
  n0,
  _GBIC,
  { [_h]: ["GET", "/?inventory&x-id=GetBucketInventoryConfiguration", 200] },
  () => GetBucketInventoryConfigurationRequest$,
  () => GetBucketInventoryConfigurationOutput$
];
var GetBucketLifecycleConfiguration$ = [
  9,
  n0,
  _GBLC,
  { [_h]: ["GET", "/?lifecycle", 200] },
  () => GetBucketLifecycleConfigurationRequest$,
  () => GetBucketLifecycleConfigurationOutput$
];
var GetBucketLocation$ = [
  9,
  n0,
  _GBL,
  { [_h]: ["GET", "/?location", 200] },
  () => GetBucketLocationRequest$,
  () => GetBucketLocationOutput$
];
var GetBucketLogging$ = [
  9,
  n0,
  _GBLe,
  { [_h]: ["GET", "/?logging", 200] },
  () => GetBucketLoggingRequest$,
  () => GetBucketLoggingOutput$
];
var GetBucketMetadataConfiguration$ = [
  9,
  n0,
  _GBMC,
  { [_h]: ["GET", "/?metadataConfiguration", 200] },
  () => GetBucketMetadataConfigurationRequest$,
  () => GetBucketMetadataConfigurationOutput$
];
var GetBucketMetadataTableConfiguration$ = [
  9,
  n0,
  _GBMTC,
  { [_h]: ["GET", "/?metadataTable", 200] },
  () => GetBucketMetadataTableConfigurationRequest$,
  () => GetBucketMetadataTableConfigurationOutput$
];
var GetBucketMetricsConfiguration$ = [
  9,
  n0,
  _GBMCe,
  { [_h]: ["GET", "/?metrics&x-id=GetBucketMetricsConfiguration", 200] },
  () => GetBucketMetricsConfigurationRequest$,
  () => GetBucketMetricsConfigurationOutput$
];
var GetBucketNotificationConfiguration$ = [
  9,
  n0,
  _GBNC,
  { [_h]: ["GET", "/?notification", 200] },
  () => GetBucketNotificationConfigurationRequest$,
  () => NotificationConfiguration$
];
var GetBucketOwnershipControls$ = [
  9,
  n0,
  _GBOC,
  { [_h]: ["GET", "/?ownershipControls", 200] },
  () => GetBucketOwnershipControlsRequest$,
  () => GetBucketOwnershipControlsOutput$
];
var GetBucketPolicy$ = [
  9,
  n0,
  _GBP,
  { [_h]: ["GET", "/?policy", 200] },
  () => GetBucketPolicyRequest$,
  () => GetBucketPolicyOutput$
];
var GetBucketPolicyStatus$ = [
  9,
  n0,
  _GBPS,
  { [_h]: ["GET", "/?policyStatus", 200] },
  () => GetBucketPolicyStatusRequest$,
  () => GetBucketPolicyStatusOutput$
];
var GetBucketReplication$ = [
  9,
  n0,
  _GBR,
  { [_h]: ["GET", "/?replication", 200] },
  () => GetBucketReplicationRequest$,
  () => GetBucketReplicationOutput$
];
var GetBucketRequestPayment$ = [
  9,
  n0,
  _GBRP,
  { [_h]: ["GET", "/?requestPayment", 200] },
  () => GetBucketRequestPaymentRequest$,
  () => GetBucketRequestPaymentOutput$
];
var GetBucketTagging$ = [
  9,
  n0,
  _GBT,
  { [_h]: ["GET", "/?tagging", 200] },
  () => GetBucketTaggingRequest$,
  () => GetBucketTaggingOutput$
];
var GetBucketVersioning$ = [
  9,
  n0,
  _GBV,
  { [_h]: ["GET", "/?versioning", 200] },
  () => GetBucketVersioningRequest$,
  () => GetBucketVersioningOutput$
];
var GetBucketWebsite$ = [
  9,
  n0,
  _GBW,
  { [_h]: ["GET", "/?website", 200] },
  () => GetBucketWebsiteRequest$,
  () => GetBucketWebsiteOutput$
];
var GetObject$ = [
  9,
  n0,
  _GO,
  { [_hC]: "-", [_h]: ["GET", "/{Key+}?x-id=GetObject", 200] },
  () => GetObjectRequest$,
  () => GetObjectOutput$
];
var GetObjectAcl$ = [
  9,
  n0,
  _GOA,
  { [_h]: ["GET", "/{Key+}?acl", 200] },
  () => GetObjectAclRequest$,
  () => GetObjectAclOutput$
];
var GetObjectAnnotation$ = [
  9,
  n0,
  _GOAe,
  { [_hC]: "-", [_h]: ["GET", "/{Key+}?annotation&x-id=GetObjectAnnotation", 200] },
  () => GetObjectAnnotationRequest$,
  () => GetObjectAnnotationOutput$
];
var GetObjectAttributes$ = [
  9,
  n0,
  _GOAet,
  { [_h]: ["GET", "/{Key+}?attributes", 200] },
  () => GetObjectAttributesRequest$,
  () => GetObjectAttributesOutput$
];
var GetObjectLegalHold$ = [
  9,
  n0,
  _GOLH,
  { [_h]: ["GET", "/{Key+}?legal-hold", 200] },
  () => GetObjectLegalHoldRequest$,
  () => GetObjectLegalHoldOutput$
];
var GetObjectLockConfiguration$ = [
  9,
  n0,
  _GOLC,
  { [_h]: ["GET", "/?object-lock", 200] },
  () => GetObjectLockConfigurationRequest$,
  () => GetObjectLockConfigurationOutput$
];
var GetObjectRetention$ = [
  9,
  n0,
  _GORe,
  { [_h]: ["GET", "/{Key+}?retention", 200] },
  () => GetObjectRetentionRequest$,
  () => GetObjectRetentionOutput$
];
var GetObjectTagging$ = [
  9,
  n0,
  _GOT,
  { [_h]: ["GET", "/{Key+}?tagging", 200] },
  () => GetObjectTaggingRequest$,
  () => GetObjectTaggingOutput$
];
var GetObjectTorrent$ = [
  9,
  n0,
  _GOTe,
  { [_h]: ["GET", "/{Key+}?torrent", 200] },
  () => GetObjectTorrentRequest$,
  () => GetObjectTorrentOutput$
];
var GetPublicAccessBlock$ = [
  9,
  n0,
  _GPAB,
  { [_h]: ["GET", "/?publicAccessBlock", 200] },
  () => GetPublicAccessBlockRequest$,
  () => GetPublicAccessBlockOutput$
];
var HeadBucket$ = [
  9,
  n0,
  _HB,
  { [_h]: ["HEAD", "/", 200] },
  () => HeadBucketRequest$,
  () => HeadBucketOutput$
];
var HeadObject$ = [
  9,
  n0,
  _HO,
  { [_h]: ["HEAD", "/{Key+}", 200] },
  () => HeadObjectRequest$,
  () => HeadObjectOutput$
];
var ListBucketAnalyticsConfigurations$ = [
  9,
  n0,
  _LBAC,
  { [_h]: ["GET", "/?analytics&x-id=ListBucketAnalyticsConfigurations", 200] },
  () => ListBucketAnalyticsConfigurationsRequest$,
  () => ListBucketAnalyticsConfigurationsOutput$
];
var ListBucketIntelligentTieringConfigurations$ = [
  9,
  n0,
  _LBITC,
  { [_h]: ["GET", "/?intelligent-tiering&x-id=ListBucketIntelligentTieringConfigurations", 200] },
  () => ListBucketIntelligentTieringConfigurationsRequest$,
  () => ListBucketIntelligentTieringConfigurationsOutput$
];
var ListBucketInventoryConfigurations$ = [
  9,
  n0,
  _LBIC,
  { [_h]: ["GET", "/?inventory&x-id=ListBucketInventoryConfigurations", 200] },
  () => ListBucketInventoryConfigurationsRequest$,
  () => ListBucketInventoryConfigurationsOutput$
];
var ListBucketMetricsConfigurations$ = [
  9,
  n0,
  _LBMC,
  { [_h]: ["GET", "/?metrics&x-id=ListBucketMetricsConfigurations", 200] },
  () => ListBucketMetricsConfigurationsRequest$,
  () => ListBucketMetricsConfigurationsOutput$
];
var ListBuckets$ = [
  9,
  n0,
  _LB,
  { [_h]: ["GET", "/?x-id=ListBuckets", 200] },
  () => ListBucketsRequest$,
  () => ListBucketsOutput$
];
var ListDirectoryBuckets$ = [
  9,
  n0,
  _LDB,
  { [_h]: ["GET", "/?x-id=ListDirectoryBuckets", 200] },
  () => ListDirectoryBucketsRequest$,
  () => ListDirectoryBucketsOutput$
];
var ListMultipartUploads$ = [
  9,
  n0,
  _LMU,
  { [_h]: ["GET", "/?uploads", 200] },
  () => ListMultipartUploadsRequest$,
  () => ListMultipartUploadsOutput$
];
var ListObjectAnnotations$ = [
  9,
  n0,
  _LOA,
  { [_h]: ["GET", "/{Key+}?annotation&x-id=ListObjectAnnotations", 200] },
  () => ListObjectAnnotationsRequest$,
  () => ListObjectAnnotationsOutput$
];
var ListObjects$ = [
  9,
  n0,
  _LO,
  { [_h]: ["GET", "/", 200] },
  () => ListObjectsRequest$,
  () => ListObjectsOutput$
];
var ListObjectsV2$ = [
  9,
  n0,
  _LOV,
  { [_h]: ["GET", "/?list-type=2", 200] },
  () => ListObjectsV2Request$,
  () => ListObjectsV2Output$
];
var ListObjectVersions$ = [
  9,
  n0,
  _LOVi,
  { [_h]: ["GET", "/?versions", 200] },
  () => ListObjectVersionsRequest$,
  () => ListObjectVersionsOutput$
];
var ListParts$ = [
  9,
  n0,
  _LP,
  { [_h]: ["GET", "/{Key+}?x-id=ListParts", 200] },
  () => ListPartsRequest$,
  () => ListPartsOutput$
];
var PutBucketAbac$ = [
  9,
  n0,
  _PBA,
  { [_hC]: "-", [_h]: ["PUT", "/?abac", 200] },
  () => PutBucketAbacRequest$,
  () => __Unit
];
var PutBucketAccelerateConfiguration$ = [
  9,
  n0,
  _PBAC,
  { [_hC]: "-", [_h]: ["PUT", "/?accelerate", 200] },
  () => PutBucketAccelerateConfigurationRequest$,
  () => __Unit
];
var PutBucketAcl$ = [
  9,
  n0,
  _PBAu,
  { [_hC]: "-", [_h]: ["PUT", "/?acl", 200] },
  () => PutBucketAclRequest$,
  () => __Unit
];
var PutBucketAnalyticsConfiguration$ = [
  9,
  n0,
  _PBACu,
  { [_h]: ["PUT", "/?analytics", 200] },
  () => PutBucketAnalyticsConfigurationRequest$,
  () => __Unit
];
var PutBucketCors$ = [
  9,
  n0,
  _PBC,
  { [_hC]: "-", [_h]: ["PUT", "/?cors", 200] },
  () => PutBucketCorsRequest$,
  () => __Unit
];
var PutBucketEncryption$ = [
  9,
  n0,
  _PBE,
  { [_hC]: "-", [_h]: ["PUT", "/?encryption", 200] },
  () => PutBucketEncryptionRequest$,
  () => __Unit
];
var PutBucketIntelligentTieringConfiguration$ = [
  9,
  n0,
  _PBITC,
  { [_h]: ["PUT", "/?intelligent-tiering", 200] },
  () => PutBucketIntelligentTieringConfigurationRequest$,
  () => __Unit
];
var PutBucketInventoryConfiguration$ = [
  9,
  n0,
  _PBIC,
  { [_h]: ["PUT", "/?inventory", 200] },
  () => PutBucketInventoryConfigurationRequest$,
  () => __Unit
];
var PutBucketLifecycleConfiguration$ = [
  9,
  n0,
  _PBLC,
  { [_hC]: "-", [_h]: ["PUT", "/?lifecycle", 200] },
  () => PutBucketLifecycleConfigurationRequest$,
  () => PutBucketLifecycleConfigurationOutput$
];
var PutBucketLogging$ = [
  9,
  n0,
  _PBL,
  { [_hC]: "-", [_h]: ["PUT", "/?logging", 200] },
  () => PutBucketLoggingRequest$,
  () => __Unit
];
var PutBucketMetricsConfiguration$ = [
  9,
  n0,
  _PBMC,
  { [_h]: ["PUT", "/?metrics", 200] },
  () => PutBucketMetricsConfigurationRequest$,
  () => __Unit
];
var PutBucketNotificationConfiguration$ = [
  9,
  n0,
  _PBNC,
  { [_h]: ["PUT", "/?notification", 200] },
  () => PutBucketNotificationConfigurationRequest$,
  () => __Unit
];
var PutBucketOwnershipControls$ = [
  9,
  n0,
  _PBOC,
  { [_hC]: "-", [_h]: ["PUT", "/?ownershipControls", 200] },
  () => PutBucketOwnershipControlsRequest$,
  () => __Unit
];
var PutBucketPolicy$ = [
  9,
  n0,
  _PBP,
  { [_hC]: "-", [_h]: ["PUT", "/?policy", 200] },
  () => PutBucketPolicyRequest$,
  () => __Unit
];
var PutBucketReplication$ = [
  9,
  n0,
  _PBR,
  { [_hC]: "-", [_h]: ["PUT", "/?replication", 200] },
  () => PutBucketReplicationRequest$,
  () => __Unit
];
var PutBucketRequestPayment$ = [
  9,
  n0,
  _PBRP,
  { [_hC]: "-", [_h]: ["PUT", "/?requestPayment", 200] },
  () => PutBucketRequestPaymentRequest$,
  () => __Unit
];
var PutBucketTagging$ = [
  9,
  n0,
  _PBT,
  { [_hC]: "-", [_h]: ["PUT", "/?tagging", 200] },
  () => PutBucketTaggingRequest$,
  () => __Unit
];
var PutBucketVersioning$ = [
  9,
  n0,
  _PBV,
  { [_hC]: "-", [_h]: ["PUT", "/?versioning", 200] },
  () => PutBucketVersioningRequest$,
  () => __Unit
];
var PutBucketWebsite$ = [
  9,
  n0,
  _PBW,
  { [_hC]: "-", [_h]: ["PUT", "/?website", 200] },
  () => PutBucketWebsiteRequest$,
  () => __Unit
];
var PutObject$ = [
  9,
  n0,
  _PO,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?x-id=PutObject", 200] },
  () => PutObjectRequest$,
  () => PutObjectOutput$
];
var PutObjectAcl$ = [
  9,
  n0,
  _POA,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?acl", 200] },
  () => PutObjectAclRequest$,
  () => PutObjectAclOutput$
];
var PutObjectAnnotation$ = [
  9,
  n0,
  _POAu,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?annotation", 200] },
  () => PutObjectAnnotationRequest$,
  () => PutObjectAnnotationOutput$
];
var PutObjectLegalHold$ = [
  9,
  n0,
  _POLH,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?legal-hold", 200] },
  () => PutObjectLegalHoldRequest$,
  () => PutObjectLegalHoldOutput$
];
var PutObjectLockConfiguration$ = [
  9,
  n0,
  _POLC,
  { [_hC]: "-", [_h]: ["PUT", "/?object-lock", 200] },
  () => PutObjectLockConfigurationRequest$,
  () => PutObjectLockConfigurationOutput$
];
var PutObjectRetention$ = [
  9,
  n0,
  _PORu,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?retention", 200] },
  () => PutObjectRetentionRequest$,
  () => PutObjectRetentionOutput$
];
var PutObjectTagging$ = [
  9,
  n0,
  _POT,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?tagging", 200] },
  () => PutObjectTaggingRequest$,
  () => PutObjectTaggingOutput$
];
var PutPublicAccessBlock$ = [
  9,
  n0,
  _PPAB,
  { [_hC]: "-", [_h]: ["PUT", "/?publicAccessBlock", 200] },
  () => PutPublicAccessBlockRequest$,
  () => __Unit
];
var RenameObject$ = [
  9,
  n0,
  _RO,
  { [_h]: ["PUT", "/{Key+}?renameObject", 200] },
  () => RenameObjectRequest$,
  () => RenameObjectOutput$
];
var RestoreObject$ = [
  9,
  n0,
  _ROe,
  { [_hC]: "-", [_h]: ["POST", "/{Key+}?restore", 200] },
  () => RestoreObjectRequest$,
  () => RestoreObjectOutput$
];
var SelectObjectContent$ = [
  9,
  n0,
  _SOC,
  { [_h]: ["POST", "/{Key+}?select&select-type=2", 200] },
  () => SelectObjectContentRequest$,
  () => SelectObjectContentOutput$
];
var UpdateBucketMetadataAnnotationTableConfiguration$ = [
  9,
  n0,
  _UBMATC,
  { [_hC]: "-", [_h]: ["PUT", "/?metadataAnnotationTable", 200] },
  () => UpdateBucketMetadataAnnotationTableConfigurationRequest$,
  () => __Unit
];
var UpdateBucketMetadataInventoryTableConfiguration$ = [
  9,
  n0,
  _UBMITC,
  { [_hC]: "-", [_h]: ["PUT", "/?metadataInventoryTable", 200] },
  () => UpdateBucketMetadataInventoryTableConfigurationRequest$,
  () => __Unit
];
var UpdateBucketMetadataJournalTableConfiguration$ = [
  9,
  n0,
  _UBMJTC,
  { [_hC]: "-", [_h]: ["PUT", "/?metadataJournalTable", 200] },
  () => UpdateBucketMetadataJournalTableConfigurationRequest$,
  () => __Unit
];
var UpdateObjectEncryption$ = [
  9,
  n0,
  _UOE,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?encryption", 200] },
  () => UpdateObjectEncryptionRequest$,
  () => UpdateObjectEncryptionResponse$
];
var UploadPart$ = [
  9,
  n0,
  _UP,
  { [_hC]: "-", [_h]: ["PUT", "/{Key+}?x-id=UploadPart", 200] },
  () => UploadPartRequest$,
  () => UploadPartOutput$
];
var UploadPartCopy$ = [
  9,
  n0,
  _UPC,
  { [_h]: ["PUT", "/{Key+}?x-id=UploadPartCopy", 200] },
  () => UploadPartCopyRequest$,
  () => UploadPartCopyOutput$
];
var WriteGetObjectResponse$ = [
  9,
  n0,
  _WGOR,
  { [_en]: ["{RequestRoute}."], [_h]: ["POST", "/WriteGetObjectResponse", 200] },
  () => WriteGetObjectResponseRequest$,
  () => __Unit
];

// node_modules/@aws-sdk/client-s3/dist-es/commands/CreateSessionCommand.js
var CreateSessionCommand = class extends command(_ep4, _mw0, "CreateSession", CreateSession$) {
};

// node_modules/@aws-sdk/client-s3/package.json
var package_default = {
  name: "@aws-sdk/client-s3",
  version: "3.1120.0",
  description: "AWS SDK for JavaScript S3 Client for Node.js, Browser and React Native",
  homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-s3",
  license: "Apache-2.0",
  author: {
    name: "AWS SDK for JavaScript Team",
    url: "https://aws.amazon.com/sdk-for-javascript/"
  },
  repository: {
    type: "git",
    url: "https://github.com/aws/aws-sdk-js-v3.git",
    directory: "clients/client-s3"
  },
  files: [
    "dist-*/**"
  ],
  sideEffects: false,
  main: "./dist-cjs/index.js",
  module: "./dist-es/index.js",
  browser: {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
  },
  types: "./dist-types/index.d.ts",
  typesVersions: {
    "<4.5": {
      "dist-types/*": [
        "dist-types/ts3.4/*"
      ]
    }
  },
  "react-native": {
    "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
  },
  scripts: {
    build: "concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
    "build:cjs": "node ../../scripts/compilation/inline",
    "build:es": "premove dist-es && tsc -p tsconfig.es.json",
    "build:include:deps": 'yarn g:turbo run build -F="$npm_package_name"',
    "build:types": "premove dist-types && tsc -p tsconfig.types.json",
    "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
    clean: "premove dist-cjs dist-es dist-types",
    "extract:docs": "api-extractor run --local",
    "generate:client": "node ../../scripts/generate-clients/single-service",
    test: "yarn g:vitest run --passWithNoTests",
    "test:watch": "yarn g:vitest watch --passWithNoTests",
    "test:integration": "yarn g:vitest run --passWithNoTests -c vitest.config.integ.mts",
    "test:integration:watch": "yarn g:vitest watch --passWithNoTests -c vitest.config.integ.mts",
    "test:e2e": "yarn g:vitest run -c vitest.config.e2e.mts",
    "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.mts",
    "test:browser": "yarn g:vitest run -c vitest.config.browser.mts",
    "test:browser:watch": "yarn g:vitest watch -c vitest.config.browser.mts",
    "test:index": "tsc -p tsconfig.test.json && node ./test/index-objects.spec.mjs"
  },
  dependencies: {
    "@aws-sdk/checksums": "^3.1000.29",
    "@aws-sdk/core": "^3.977.9",
    "@aws-sdk/credential-provider-node": "^3.972.81",
    "@aws-sdk/middleware-sdk-s3": "^3.972.75",
    "@aws-sdk/signature-v4-multi-region": "^3.996.46",
    "@aws-sdk/types": "^3.974.5",
    "@smithy/core": "^3.33.3",
    "@smithy/fetch-http-handler": "^5.7.2",
    "@smithy/node-http-handler": "^4.11.3",
    "@smithy/types": "^4.17.2",
    tslib: "^2.6.2"
  },
  devDependencies: {
    "@aws-sdk/signature-v4-crt": "3.1120.0",
    "@smithy/snapshot-testing": "^2.3.2",
    "@tsconfig/node20": "20.1.8",
    "@types/node": "^20.14.8",
    concurrently: "7.0.0",
    "downlevel-dts": "0.10.1",
    premove: "4.0.0",
    typescript: "~7.0.2",
    vitest: "^4.0.17"
  },
  engines: {
    node: ">=20.0.0"
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.browser.js
init_index_browser3();
init_index_browser4();
init_index_browser2();

// node_modules/@smithy/fetch-http-handler/dist-es/create-request.js
function createRequest(url, requestOptions) {
  return new Request(url, requestOptions);
}

// node_modules/@smithy/fetch-http-handler/dist-es/request-timeout.js
function requestTimeout(timeoutInMs = 0) {
  return new Promise((resolve, reject) => {
    if (timeoutInMs) {
      setTimeout(() => {
        const timeoutError = new Error(`Request did not complete within ${timeoutInMs} ms`);
        timeoutError.name = "TimeoutError";
        reject(timeoutError);
      }, timeoutInMs);
    }
  });
}

// node_modules/@smithy/fetch-http-handler/dist-es/fetch-http-handler.js
var keepAliveSupport = {
  supported: void 0
};
var FetchHttpHandler = class _FetchHttpHandler {
  config;
  configProvider;
  static create(instanceOrOptions) {
    if (typeof instanceOrOptions?.handle === "function") {
      return instanceOrOptions;
    }
    return new _FetchHttpHandler(instanceOrOptions);
  }
  constructor(options) {
    if (typeof options === "function") {
      this.configProvider = options().then((opts) => opts || {});
    } else {
      this.config = options ?? {};
      this.configProvider = Promise.resolve(this.config);
    }
    if (keepAliveSupport.supported === void 0) {
      keepAliveSupport.supported = Boolean(typeof Request !== "undefined" && "keepalive" in createRequest("https://[::1]"));
    }
  }
  destroy() {
  }
  async handle(request, { abortSignal, requestTimeout: requestTimeout2 } = {}) {
    if (!this.config) {
      this.config = await this.configProvider;
    }
    const requestTimeoutInMs = requestTimeout2 ?? this.config.requestTimeout;
    const keepAlive = this.config.keepAlive === true;
    const credentials = this.config.credentials;
    if (abortSignal?.aborted) {
      const abortError = buildAbortError(abortSignal);
      return Promise.reject(abortError);
    }
    let path = request.path;
    const queryString = buildQueryString(request.query || {});
    if (queryString) {
      path += `?${queryString}`;
    }
    if (request.fragment) {
      path += `#${request.fragment}`;
    }
    let auth = "";
    if (request.username != null || request.password != null) {
      const username = request.username ?? "";
      const password = request.password ?? "";
      auth = `${username}:${password}@`;
    }
    const { port, method } = request;
    const url = `${request.protocol}//${auth}${request.hostname}${port ? `:${port}` : ""}${path}`;
    const body = method === "GET" || method === "HEAD" ? void 0 : request.body;
    const requestOptions = {
      body,
      headers: new Headers(request.headers),
      method,
      credentials
    };
    if (this.config?.cache) {
      requestOptions.cache = this.config.cache;
    }
    if (body) {
      requestOptions.duplex = "half";
    }
    if (typeof AbortController !== "undefined") {
      requestOptions.signal = abortSignal;
    }
    if (keepAliveSupport.supported) {
      requestOptions.keepalive = keepAlive;
    }
    if (typeof this.config.requestInit === "function") {
      Object.assign(requestOptions, this.config.requestInit(request));
    }
    let removeSignalEventListener = () => {
    };
    const fetchRequest = createRequest(url, requestOptions);
    const raceOfPromises = [
      fetch(fetchRequest).then((response) => {
        const fetchHeaders = response.headers;
        const transformedHeaders = {};
        for (const pair of fetchHeaders.entries()) {
          transformedHeaders[pair[0]] = pair[1];
        }
        const hasReadableStream = response.body != void 0;
        if (!hasReadableStream) {
          return response.blob().then((body2) => ({
            response: new HttpResponse({
              headers: transformedHeaders,
              reason: response.statusText,
              statusCode: response.status,
              body: body2
            })
          }));
        }
        return {
          response: new HttpResponse({
            headers: transformedHeaders,
            reason: response.statusText,
            statusCode: response.status,
            body: response.body
          })
        };
      }),
      requestTimeout(requestTimeoutInMs)
    ];
    if (abortSignal) {
      raceOfPromises.push(new Promise((resolve, reject) => {
        const onAbort = () => {
          const abortError = buildAbortError(abortSignal);
          reject(abortError);
        };
        if (typeof abortSignal.addEventListener === "function") {
          const signal = abortSignal;
          signal.addEventListener("abort", onAbort, { once: true });
          removeSignalEventListener = () => signal.removeEventListener("abort", onAbort);
        } else {
          abortSignal.onabort = onAbort;
        }
      }));
    }
    return Promise.race(raceOfPromises).finally(removeSignalEventListener);
  }
  updateHttpClientConfig(key, value) {
    this.config = void 0;
    this.configProvider = this.configProvider.then((config) => {
      config[key] = value;
      return config;
    });
  }
  httpHandlerConfigs() {
    return this.config ?? {};
  }
};
function buildAbortError(abortSignal) {
  const reason = abortSignal && typeof abortSignal === "object" && "reason" in abortSignal ? abortSignal.reason : void 0;
  if (reason) {
    if (reason instanceof Error) {
      const abortError3 = new Error("Request aborted");
      abortError3.name = "AbortError";
      abortError3.cause = reason;
      return abortError3;
    }
    const abortError2 = new Error(String(reason));
    abortError2.name = "AbortError";
    return abortError2;
  }
  const abortError = new Error("Request aborted");
  abortError.name = "AbortError";
  return abortError;
}

// node_modules/@smithy/fetch-http-handler/dist-es/index.js
init_index_browser2();

// node_modules/@aws-sdk/checksums/dist-es/submodules/sha/sha1/Sha1Js.js
init_index_browser2();
var BLOCK2 = 64;
var DIGEST_LENGTH2 = 20;
var INIT3 = new Int32Array([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
var K3 = new Int32Array([1518500249, 1859775393, 2400959708, 3395469782]);
var Sha1Js = class _Sha1Js {
  digestLength = DIGEST_LENGTH2;
  state = Int32Array.from(INIT3);
  w;
  buffer = new Uint8Array(BLOCK2);
  bufferLength = 0;
  bytesHashed = 0;
  finished = false;
  inner;
  outer;
  constructor(secret) {
    if (secret) {
      const key = _Sha1Js.normalizeKey(secret);
      this.inner = new _Sha1Js();
      this.outer = new _Sha1Js();
      const pad2 = new Uint8Array(BLOCK2 * 2);
      for (let i2 = 0; i2 < BLOCK2; ++i2) {
        pad2[i2] = 54 ^ key[i2];
        pad2[i2 + BLOCK2] = 92 ^ key[i2];
      }
      this.inner.update(pad2.subarray(0, BLOCK2));
      this.outer.update(pad2.subarray(BLOCK2));
    }
  }
  update(data) {
    if (this.finished) {
      throw new Error("Attempted to update an already finished HMAC.");
    }
    if (this.inner) {
      this.inner.update(data);
      return;
    }
    let pos = 0;
    let { length } = data;
    this.bytesHashed += length;
    if (this.bufferLength > 0) {
      while (length > 0 && this.bufferLength < BLOCK2) {
        this.buffer[this.bufferLength++] = data[pos++];
        --length;
      }
      if (this.bufferLength === BLOCK2) {
        this.hashBuffer(this.buffer, 0);
        this.bufferLength = 0;
      }
    }
    while (length >= BLOCK2) {
      this.hashBuffer(data, pos);
      pos += BLOCK2;
      length -= BLOCK2;
    }
    while (length > 0) {
      this.buffer[this.bufferLength++] = data[pos++];
      --length;
    }
  }
  async digest() {
    if (this.inner && this.outer) {
      if (this.finished) {
        throw new Error("Attempted to digest an already finished HMAC.");
      }
      this.finished = true;
      const innerDigest = this.inner.digestSync();
      this.outer.update(innerDigest);
      return this.outer.digestSync();
    }
    return this.digestSync();
  }
  reset() {
    this.state = Int32Array.from(INIT3);
    this.buffer = new Uint8Array(BLOCK2);
    this.bufferLength = 0;
    this.bytesHashed = 0;
  }
  digestSync() {
    const state = this.state.slice();
    const buffer = this.buffer.slice();
    let bufferLength = this.bufferLength;
    const bitsHi = this.bytesHashed / 536870912 | 0;
    const bitsLo = this.bytesHashed << 3;
    buffer[bufferLength++] = 128;
    if (bufferLength > BLOCK2 - 8) {
      for (let i2 = bufferLength; i2 < BLOCK2; ++i2) {
        buffer[i2] = 0;
      }
      this.hashBufferWith(state, buffer, 0);
      bufferLength = 0;
    }
    for (let i2 = bufferLength; i2 < BLOCK2 - 8; ++i2) {
      buffer[i2] = 0;
    }
    const v2 = new DataView(buffer.buffer, buffer.byteOffset, BLOCK2);
    v2.setUint32(BLOCK2 - 8, bitsHi, false);
    v2.setUint32(BLOCK2 - 4, bitsLo, false);
    this.hashBufferWith(state, buffer, 0);
    const out = new Uint8Array(DIGEST_LENGTH2);
    out[0] = state[0] >>> 24 & 255;
    out[1] = state[0] >>> 16 & 255;
    out[2] = state[0] >>> 8 & 255;
    out[3] = state[0] & 255;
    out[4] = state[1] >>> 24 & 255;
    out[5] = state[1] >>> 16 & 255;
    out[6] = state[1] >>> 8 & 255;
    out[7] = state[1] & 255;
    out[8] = state[2] >>> 24 & 255;
    out[9] = state[2] >>> 16 & 255;
    out[10] = state[2] >>> 8 & 255;
    out[11] = state[2] & 255;
    out[12] = state[3] >>> 24 & 255;
    out[13] = state[3] >>> 16 & 255;
    out[14] = state[3] >>> 8 & 255;
    out[15] = state[3] & 255;
    out[16] = state[4] >>> 24 & 255;
    out[17] = state[4] >>> 16 & 255;
    out[18] = state[4] >>> 8 & 255;
    out[19] = state[4] & 255;
    return out;
  }
  static normalizeKey(secret) {
    const key = toUint8Array(secret);
    if (key.byteLength > BLOCK2) {
      const h2 = new _Sha1Js();
      h2.update(key);
      const digest2 = h2.digestSync();
      const padded2 = new Uint8Array(BLOCK2);
      padded2.set(digest2);
      return padded2;
    }
    const padded = new Uint8Array(BLOCK2);
    padded.set(key);
    return padded;
  }
  hashBuffer(data, offset) {
    this.hashBufferWith(this.state, data, offset);
  }
  hashBufferWith(state, data, offset) {
    const w2 = this.w ??= new Int32Array(80);
    let s0 = state[0], s1 = state[1], s2 = state[2], s3 = state[3], s4 = state[4];
    for (let t8 = 0; t8 < 16; ++t8) {
      w2[t8] = (data[offset + t8 * 4] & 255) << 24 | (data[offset + t8 * 4 + 1] & 255) << 16 | (data[offset + t8 * 4 + 2] & 255) << 8 | data[offset + t8 * 4 + 3] & 255;
    }
    for (let t8 = 16; t8 < 80; ++t8) {
      const x2 = w2[t8 - 3] ^ w2[t8 - 8] ^ w2[t8 - 14] ^ w2[t8 - 16];
      w2[t8] = x2 << 1 | x2 >>> 31;
    }
    for (let t8 = 0; t8 < 80; ++t8) {
      const r2 = t8 < 20 ? 0 : t8 < 40 ? 1 : t8 < 60 ? 2 : 3;
      const temp = ((s0 << 5 | s0 >>> 27) + (r2 === 0 ? s1 & s2 ^ ~s1 & s3 : r2 === 2 ? s1 & s2 ^ s1 & s3 ^ s2 & s3 : s1 ^ s2 ^ s3) | 0) + (s4 + (K3[r2] + w2[t8] | 0) | 0) | 0;
      s4 = s3;
      s3 = s2;
      s2 = s1 << 30 | s1 >>> 2;
      s1 = s0;
      s0 = temp;
    }
    state[0] = state[0] + s0 | 0;
    state[1] = state[1] + s1 | 0;
    state[2] = state[2] + s2 | 0;
    state[3] = state[3] + s3 | 0;
    state[4] = state[4] + s4 | 0;
  }
};

// node_modules/@aws-sdk/checksums/dist-es/submodules/sha/index.browser.js
var no9 = Symbol.for("node-only");

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.shared.js
init_index_browser3();
init_index_browser2();
var getRuntimeConfig = (config) => {
  return {
    apiVersion: "2006-03-01",
    base64Decoder: config?.base64Decoder ?? fromBase64,
    base64Encoder: config?.base64Encoder ?? toBase64,
    disableHostPrefix: config?.disableHostPrefix ?? false,
    endpointProvider: config?.endpointProvider ?? defaultEndpointResolver,
    extensions: config?.extensions ?? [],
    getAwsChunkedEncodingStream: config?.getAwsChunkedEncodingStream ?? getAwsChunkedEncodingStream,
    httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? defaultS3HttpAuthSchemeProvider,
    httpAuthSchemes: config?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
        signer: new AwsSdkSigV4Signer()
      },
      {
        schemeId: "aws.auth#sigv4a",
        identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
        signer: new AwsSdkSigV4ASigner()
      }
    ],
    logger: config?.logger ?? new NoOpLogger(),
    md5: config?.md5 ?? Md5Js,
    protocol: config?.protocol ?? S3RestXmlProtocol,
    protocolSettings: config?.protocolSettings ?? {
      defaultNamespace: "com.amazonaws.s3",
      errorTypeRegistries,
      xmlNamespace: "http://s3.amazonaws.com/doc/2006-03-01/",
      version: "2006-03-01",
      serviceTarget: "AmazonS3"
    },
    sdkStreamMixin: config?.sdkStreamMixin ?? sdkStreamMixin,
    serviceId: config?.serviceId ?? "S3",
    sha1: config?.sha1 ?? Sha1Js,
    sha256: config?.sha256 ?? Sha256WebCrypto,
    signerConstructor: config?.signerConstructor ?? SignatureV4MultiRegion,
    signingEscapePath: config?.signingEscapePath ?? false,
    urlParser: config?.urlParser ?? parseUrl,
    useArnRegion: config?.useArnRegion ?? void 0,
    utf8Decoder: config?.utf8Decoder ?? fromUtf8,
    utf8Encoder: config?.utf8Encoder ?? toUtf8
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeConfig.browser.js
var getRuntimeConfig2 = (config) => {
  const defaultsMode = resolveDefaultsModeConfig(config);
  const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
  const clientSharedValues = getRuntimeConfig(config);
  return {
    ...clientSharedValues,
    ...config,
    runtime: "browser",
    defaultsMode,
    bodyLengthChecker: config?.bodyLengthChecker ?? calculateBodyLength,
    credentialDefaultProvider: config?.credentialDefaultProvider ?? ((_) => () => Promise.reject(new Error("Credential is missing"))),
    defaultUserAgentProvider: config?.defaultUserAgentProvider ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }),
    eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? eventStreamSerdeProvider2,
    maxAttempts: config?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS,
    region: config?.region ?? invalidProvider("Region is missing"),
    requestHandler: FetchHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
    retryMode: config?.retryMode ?? (async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE),
    streamCollector: config?.streamCollector ?? streamCollector,
    streamHasher: config?.streamHasher ?? blobHasher,
    useDualstackEndpoint: config?.useDualstackEndpoint ?? (() => Promise.resolve(DEFAULT_USE_DUALSTACK_ENDPOINT)),
    useFipsEndpoint: config?.useFipsEndpoint ?? (() => Promise.resolve(DEFAULT_USE_FIPS_ENDPOINT))
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/auth/httpAuthExtensionConfiguration.js
var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
  const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
  let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
  let _credentials = runtimeConfig.credentials;
  return {
    setHttpAuthScheme(httpAuthScheme) {
      const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
      if (index === -1) {
        _httpAuthSchemes.push(httpAuthScheme);
      } else {
        _httpAuthSchemes.splice(index, 1, httpAuthScheme);
      }
    },
    httpAuthSchemes() {
      return _httpAuthSchemes;
    },
    setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
      _httpAuthSchemeProvider = httpAuthSchemeProvider;
    },
    httpAuthSchemeProvider() {
      return _httpAuthSchemeProvider;
    },
    setCredentials(credentials) {
      _credentials = credentials;
    },
    credentials() {
      return _credentials;
    }
  };
};
var resolveHttpAuthRuntimeConfig = (config) => {
  return {
    httpAuthSchemes: config.httpAuthSchemes(),
    httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
    credentials: config.credentials()
  };
};

// node_modules/@aws-sdk/client-s3/dist-es/runtimeExtensions.js
var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
  const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
  extensions.forEach((extension) => extension.configure(extensionConfiguration));
  return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig2(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
};

// node_modules/@aws-sdk/client-s3/dist-es/S3Client.js
var S3Client = class extends Client {
  config;
  constructor(...[configuration]) {
    const _config_0 = getRuntimeConfig2(configuration || {});
    super(_config_0);
    this.initConfig = _config_0;
    const _config_1 = resolveClientEndpointParameters(_config_0);
    const _config_2 = resolveUserAgentConfig(_config_1);
    const _config_3 = resolveFlexibleChecksumsConfig(_config_2);
    const _config_4 = resolveRetryConfig(_config_3);
    const _config_5 = resolveRegionConfig(_config_4);
    const _config_6 = resolveHostHeaderConfig(_config_5);
    const _config_7 = resolveEndpointConfig(_config_6);
    const _config_8 = resolveEventStreamSerdeConfig(_config_7);
    const _config_9 = resolveHttpAuthSchemeConfig(_config_8);
    const _config_10 = resolveS3Config(_config_9, { session: [() => this, CreateSessionCommand] });
    const _config_11 = resolveRuntimeExtensions(_config_10, configuration?.extensions || []);
    this.config = _config_11;
    this.middlewareStack.use(getSchemaSerdePlugin(this.config));
    this.middlewareStack.use(getUserAgentPlugin(this.config));
    this.middlewareStack.use(getRetryPlugin(this.config));
    this.middlewareStack.use(getContentLengthPlugin(this.config));
    this.middlewareStack.use(getHostHeaderPlugin(this.config));
    this.middlewareStack.use(getLoggerPlugin(this.config));
    this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
    this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
      httpAuthSchemeParametersProvider: defaultS3HttpAuthSchemeParametersProvider,
      identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
        "aws.auth#sigv4": config.credentials,
        "aws.auth#sigv4a": config.credentials
      })
    }));
    this.middlewareStack.use(getHttpSigningPlugin(this.config));
    this.middlewareStack.use(getValidateBucketNamePlugin(this.config));
    this.middlewareStack.use(getAddExpectContinuePlugin(this.config));
    this.middlewareStack.use(getRegionRedirectMiddlewarePlugin(this.config));
    this.middlewareStack.use(getS3ExpressPlugin(this.config));
    this.middlewareStack.use(getS3ExpressHttpSigningPlugin(this.config));
  }
  destroy() {
    super.destroy();
  }
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/DeleteObjectCommand.js
var DeleteObjectCommand = class extends command(_ep0, _mw0, "DeleteObject", DeleteObject$) {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/HeadBucketCommand.js
var HeadBucketCommand = class extends command(_ep5, _mw0, "HeadBucket", HeadBucket$) {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/HeadObjectCommand.js
var HeadObjectCommand = class extends command(_ep0, _mw8, "HeadObject", HeadObject$) {
};

// node_modules/@aws-sdk/client-s3/dist-es/commands/PutObjectCommand.js
var PutObjectCommand = class extends command(_ep0, _mw11, "PutObject", PutObject$) {
};

// src/uploaders/provider.ts
var PROVIDER_LABELS = {
  r2: "Cloudflare R2",
  oss: "\u963F\u91CC\u4E91 OSS",
  s3: "\u901A\u7528 S3"
};
function ossEndpoint(region) {
  const normalized = region.trim() || "cn-hangzhou";
  return `https://s3.oss-${normalized}.aliyuncs.com`;
}
function ossPublicBaseUrl(bucket, region) {
  const normalizedBucket = bucket.trim();
  const normalizedRegion = region.trim() || "cn-hangzhou";
  return normalizedBucket ? `https://${normalizedBucket}.oss-${normalizedRegion}.aliyuncs.com` : "";
}
function applyProviderDefaults(settings, provider) {
  settings.provider = provider;
  if (provider === "r2") {
    if (!settings.region.trim() || settings.region === "us-east-1") settings.region = "auto";
    settings.forcePathStyle = false;
    return;
  }
  if (provider === "oss") {
    if (!settings.region.trim() || settings.region === "auto" || settings.region === "us-east-1") settings.region = "cn-hangzhou";
    settings.endpoint = ossEndpoint(settings.region);
    settings.forcePathStyle = false;
    if (!settings.publicBaseUrl.trim()) settings.publicBaseUrl = ossPublicBaseUrl(settings.bucket, settings.region);
    return;
  }
  if (settings.region === "auto") settings.region = "us-east-1";
}

// src/uploaders/S3Uploader.ts
var S3Uploader = class {
  constructor(settings) {
    this.settings = settings;
    this.id = settings.provider;
    this.name = PROVIDER_LABELS[settings.provider];
    this.client = new S3Client({
      region: settings.region || (settings.provider === "r2" ? "auto" : settings.provider === "oss" ? "cn-hangzhou" : "us-east-1"),
      endpoint: settings.endpoint || void 0,
      forcePathStyle: settings.forcePathStyle,
      credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey }
    });
  }
  id;
  name;
  client;
  async testConnection() {
    try {
      this.validateSettings();
      await this.client.send(new HeadBucketCommand({ Bucket: this.settings.bucket }));
      return { success: true, message: `\u5DF2\u6210\u529F\u8FDE\u63A5 ${this.name}\uFF0CBucket \u53EF\u8BBF\u95EE\u3002` };
    } catch (error) {
      return { success: false, message: `\u8FDE\u63A5\u5931\u8D25\uFF1A${errorMessage(error)}` };
    }
  }
  async upload(data, remotePath, metadata) {
    const key = normalizeVaultPath(remotePath);
    try {
      this.validateSettings();
      const response = await this.client.send(new PutObjectCommand({
        Bucket: this.settings.bucket,
        Key: key,
        Body: new Uint8Array(data),
        ContentType: metadata?.contentType,
        Metadata: metadata?.hash ? { "processed-sha256": metadata.hash } : void 0
      }));
      return { success: true, provider: this.id, remotePath: key, url: this.publicUrl(key), etag: response.ETag };
    } catch (error) {
      return { success: false, provider: this.id, remotePath: key, url: "", error: errorMessage(error) };
    }
  }
  async exists(remotePath) {
    this.validateSettings();
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.settings.bucket, Key: normalizeVaultPath(remotePath) }));
      return true;
    } catch (error) {
      const status = error.$metadata?.httpStatusCode;
      if (status === 404) return false;
      throw error;
    }
  }
  async delete(remotePath) {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.settings.bucket, Key: normalizeVaultPath(remotePath) }));
  }
  validateSettings() {
    const missing = [];
    if (!this.settings.endpoint && (this.settings.provider === "r2" || this.settings.provider === "oss")) missing.push("Endpoint");
    if (!this.settings.bucket) missing.push("Bucket");
    if (!this.settings.accessKeyId) missing.push("Access Key ID");
    if (!this.settings.secretAccessKey) missing.push("Secret Access Key");
    if (!this.settings.publicBaseUrl) missing.push("\u516C\u5171\u8BBF\u95EE\u57DF\u540D");
    if (missing.length) throw new Error(`\u8BF7\u5148\u586B\u5199\uFF1A${missing.join("\u3001")}`);
  }
  publicUrl(key) {
    return `${this.settings.publicBaseUrl.replace(/\/+$/, "")}/${encodeUrlPath(key)}`;
  }
};

// src/uploaders/UploadVerifier.ts
var import_obsidian2 = require("obsidian");
var UploadVerifier = class {
  constructor(timeoutMs) {
    this.timeoutMs = timeoutMs;
  }
  async verify(url) {
    let headStatus = 0;
    try {
      const head = await this.timed((0, import_obsidian2.requestUrl)({ url, method: "HEAD", throw: false }));
      headStatus = head.status;
      if (head.status === 200 || head.status === 206) return;
    } catch {
    }
    try {
      const range2 = await this.timed((0, import_obsidian2.requestUrl)({ url, method: "GET", headers: { Range: "bytes=0-0" }, throw: false }));
      if (range2.status === 200 || range2.status === 206) return;
      throw new Error(`HTTP ${range2.status || headStatus}`);
    } catch (error) {
      throw new ImageAssetError("VERIFY_FAILED" /* VERIFY_FAILED */, `\u4E0A\u4F20\u5DF2\u8FD4\u56DE\u6210\u529F\uFF0C\u4F46\u65E0\u6CD5\u5728 ${Math.round(this.timeoutMs / 1e3)} \u79D2\u5185\u9A8C\u8BC1\u516C\u5F00\u5730\u5740\uFF1A${errorMessage(error)}`, error);
    }
  }
  async timed(request) {
    let timer = 0;
    const timeout = new Promise((_, reject) => {
      timer = window.setTimeout(() => reject(new Error("\u8BF7\u6C42\u8D85\u65F6")), this.timeoutMs);
    });
    try {
      return await Promise.race([request, timeout]);
    } finally {
      window.clearTimeout(timer);
    }
  }
};

// src/queue/retry.ts
async function withRetry(operation2, retries, delays = [1e3, 3e3, 1e4]) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation2();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      await new Promise((resolve) => window.setTimeout(resolve, delays[Math.min(attempt, delays.length - 1)] ?? 1e3));
    }
  }
  throw lastError;
}

// src/core/pipeline/ImagePipeline.ts
var ImagePipeline = class {
  constructor(app, getSettings, manifest) {
    this.app = app;
    this.getSettings = getSettings;
    this.manifest = manifest;
  }
  processor = new BrowserImageProcessor();
  templates = new TemplateEngine();
  inflightUploads = /* @__PURE__ */ new Map();
  async execute(request) {
    const settings = this.getSettings();
    const frontmatter = request.note ? this.app.metadataCache.getFileCache(request.note)?.frontmatter : void 0;
    const imageSettings = { ...settings.image };
    if (typeof frontmatter?.["image-format"] === "string" && ["webp", "jpeg", "png", "avif", "original"].includes(frontmatter["image-format"])) {
      imageSettings.outputFormat = frontmatter["image-format"];
    }
    if (typeof frontmatter?.["image-quality"] === "number") {
      const quality = Math.max(1, Math.min(100, frontmatter["image-quality"]));
      imageSettings.webpQuality = quality;
      imageSettings.jpegQuality = quality;
      imageSettings.avifQuality = quality;
    }
    const processed = await this.processor.process(request.input, imageSettings);
    const existing = settings.advanced.manifestEnabled ? await this.manifest.findByProcessedHash(processed.hash) : void 0;
    const context = this.templateContext(request.note, request.input.name, request.index ?? 1, processed.hash, frontmatter);
    const filenameBase = this.templates.render(settings.naming.filenameTemplate, context, false, settings.naming.unicodeFilenames);
    const filename = `${filenameBase}.${processed.format}`;
    const customFolder = typeof frontmatter?.["image-folder"] === "string" ? frontmatter["image-folder"] : "";
    const renderedFolder = customFolder || this.templates.render(settings.naming.remotePathTemplate, context, true, settings.naming.unicodeFilenames);
    let remotePath = joinVaultPath(settings.uploader.pathPrefix, renderedFolder, filename);
    if (!request.upload) return { input: request.input, processed, filename, remotePath, reused: false };
    if (existing?.url) {
      return {
        input: request.input,
        processed,
        filename,
        reused: true,
        remotePath: existing.remotePath,
        uploadResult: { success: true, provider: existing.provider, remotePath: existing.remotePath, url: existing.url }
      };
    }
    const inflight = this.inflightUploads.get(processed.hash);
    if (inflight) {
      const shared = await inflight;
      return { input: request.input, processed, filename, remotePath: shared.remotePath, uploadResult: shared.uploadResult, reused: true };
    }
    const operation2 = this.upload(processed.data, processed.mimeType, processed.hash, remotePath, settings);
    this.inflightUploads.set(processed.hash, operation2);
    try {
      const uploaded = await operation2;
      return { input: request.input, processed, filename, ...uploaded, reused: false };
    } finally {
      this.inflightUploads.delete(processed.hash);
    }
  }
  async commitManifest(result, sourcePath, notePaths) {
    if (!result.uploadResult || !this.getSettings().advanced.manifestEnabled) return;
    const sourceHash = await sha256(result.input.data);
    const now = Date.now();
    const item = {
      id: result.processed.hash,
      sourcePath,
      sourceHash,
      processedHash: result.processed.hash,
      processedFormat: result.processed.format,
      originalSize: result.processed.originalSize,
      processedSize: result.processed.processedSize,
      width: result.processed.width,
      height: result.processed.height,
      provider: result.uploadResult.provider,
      remotePath: result.uploadResult.remotePath,
      url: result.uploadResult.url,
      createdAt: now,
      updatedAt: now,
      references: notePaths
    };
    await this.manifest.upsert(item);
  }
  markdownFor(url, alt = "", displayWidth) {
    const settings = this.getSettings().markdown;
    if (displayWidth && settings.wikiSizeStrategy === "html") {
      const altAttribute = settings.preserveAlt && alt ? ` alt="${this.escapeHtml(alt)}"` : "";
      return `<img src="${this.escapeHtml(url)}" width="${Math.round(displayWidth)}"${altAttribute}>`;
    }
    return `![${settings.preserveAlt ? alt.replace(/([\\\]])/g, "\\$1") : ""}](${url})`;
  }
  templateContext(note, inputName, index, hash, frontmatter) {
    const notePath = note?.path ?? "";
    return {
      noteName: note?.basename ?? this.baseName(inputName).replace(/\.[^.]+$/, ""),
      fileName: this.baseName(inputName).replace(/\.[^.]+$/, ""),
      folderName: note ? this.baseName(note.parent?.path ?? "") || "\u6839\u76EE\u5F55" : "\u526A\u8D34\u677F",
      vaultName: this.app.vault.getName(),
      notePath,
      index,
      hash,
      frontmatter
    };
  }
  async resolveConflict(remotePath, hash, uploader, settings) {
    if (settings.naming.conflictStrategy === "overwrite") return remotePath;
    if (!await uploader.exists(remotePath)) return remotePath;
    if (settings.naming.conflictStrategy === "skip") throw new ImageAssetError("UPLOAD_FAILED" /* UPLOAD_FAILED */, `\u8FDC\u7A0B\u6587\u4EF6\u5DF2\u5B58\u5728\uFF0C\u5DF2\u6309\u8BBE\u7F6E\u8DF3\u8FC7\uFF1A${remotePath}`);
    const dot = remotePath.lastIndexOf(".");
    const stem = dot >= 0 ? remotePath.slice(0, dot) : remotePath;
    const extension = dot >= 0 ? remotePath.slice(dot) : "";
    if (settings.naming.conflictStrategy === "hash") return `${stem}-${hash.slice(0, settings.naming.hashLength)}${extension}`;
    for (let index = 2; index <= 999; index++) {
      const candidate = `${stem}-${String(index).padStart(3, "0")}${extension}`;
      if (!await uploader.exists(candidate)) return candidate;
    }
    throw new ImageAssetError("UPLOAD_FAILED" /* UPLOAD_FAILED */, `\u65E0\u6CD5\u4E3A\u8FDC\u7A0B\u8DEF\u5F84\u751F\u6210\u4E0D\u51B2\u7A81\u7684\u6587\u4EF6\u540D\uFF1A${remotePath}`);
  }
  async upload(data, mimeType, hash, desiredPath, settings) {
    const uploader = new S3Uploader(settings.uploader);
    const remotePath = await this.resolveConflict(desiredPath, hash, uploader, settings);
    const uploadResult = await withRetry(
      () => uploader.upload(data, remotePath, { contentType: mimeType, hash }).then((result) => {
        if (!result.success) throw new ImageAssetError("UPLOAD_FAILED" /* UPLOAD_FAILED */, result.error || "\u4E0A\u4F20\u670D\u52A1\u8FD4\u56DE\u5931\u8D25\u3002");
        return result;
      }),
      settings.batch.retries
    );
    if (settings.batch.verifyUpload) await new UploadVerifier(settings.batch.timeoutMs).verify(uploadResult.url);
    return { remotePath, uploadResult };
  }
  escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  baseName(path) {
    return path.replace(/\\/g, "/").split("/").pop() ?? path;
  }
};

// src/migration/MigrationManager.ts
var import_obsidian3 = require("obsidian");

// src/queue/TaskQueue.ts
var TaskQueue = class {
  constructor(concurrency) {
    this.concurrency = concurrency;
    if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error("\u5E76\u53D1\u6570\u5FC5\u987B\u81F3\u5C11\u4E3A 1\u3002");
  }
  paused = false;
  cancelled = false;
  resumeWaiters = [];
  get isCancelled() {
    return this.cancelled;
  }
  pause() {
    this.paused = true;
  }
  resume() {
    this.paused = false;
    this.resumeWaiters.splice(0).forEach((resolve) => resolve());
  }
  cancel() {
    this.cancelled = true;
    this.resume();
  }
  async run(tasks, onProgress) {
    const results = new Array(tasks.length);
    let next = 0, completed = 0;
    const worker = async () => {
      while (true) {
        await this.waitIfPaused();
        if (this.cancelled || next >= tasks.length) return;
        const index = next++;
        const task = tasks[index];
        if (!task) return;
        try {
          const value = await task();
          results[index] = { status: "fulfilled", value };
          onProgress?.({ completed: ++completed, total: tasks.length, result: value });
        } catch (reason) {
          results[index] = { status: "rejected", reason };
          onProgress?.({ completed: ++completed, total: tasks.length, error: reason });
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(this.concurrency, tasks.length) }, () => worker()));
    return results.filter(Boolean);
  }
  async waitIfPaused() {
    if (!this.paused) return;
    await new Promise((resolve) => this.resumeWaiters.push(resolve));
  }
};

// src/migration/MigrationManager.ts
var MigrationManager = class {
  constructor(app, getSettings, pipeline, migrations, manifest) {
    this.app = app;
    this.getSettings = getSettings;
    this.pipeline = pipeline;
    this.migrations = migrations;
    this.manifest = manifest;
  }
  activeQueue;
  replacer = new MarkdownReplacer();
  pause() {
    this.activeQueue?.pause();
  }
  resume() {
    this.activeQueue?.resume();
  }
  cancel() {
    this.activeQueue?.cancel();
  }
  async dryRun(report, notePath, onProgress) {
    const assets = this.selectAssets(report, notePath);
    const output = [];
    let completed = 0, success = 0, failed = 0;
    for (const asset of assets) {
      const note = this.noteFor(asset);
      try {
        const input = await this.readInput(asset.localPath);
        const result = await this.pipeline.execute({ input, note, sourceFile: this.file(asset.localPath), index: completed + 1, upload: false });
        output.push({ sourcePath: asset.localPath, originalSize: input.data.byteLength, processedSize: result.processed.processedSize, remotePath: result.remotePath, referenceCount: asset.references.length });
        success++;
      } catch (error) {
        output.push({ sourcePath: asset.localPath, originalSize: asset.size, processedSize: asset.size, referenceCount: asset.references.length, error: errorMessage(error) });
        failed++;
      }
      onProgress?.({ completed: ++completed, total: assets.length, success, failed, current: asset.localPath });
    }
    return output;
  }
  async migrate(report, notePath, onProgress) {
    const assets = this.selectAssets(report, notePath);
    const record = {
      migrationId: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: "running",
      items: [],
      noteBackups: []
    };
    for (const asset of assets) record.items.push({ sourcePath: asset.localPath, notesModified: [], status: "pending" });
    await this.migrations.save(record);
    const completedAssets = [];
    let success = 0, failed = 0;
    this.activeQueue = new TaskQueue(this.getSettings().batch.concurrency);
    const tasks = assets.map((asset, index) => async () => {
      const item = record.items[index];
      if (!item) throw new Error("\u8FC1\u79FB\u8BB0\u5F55\u635F\u574F\u3002");
      item.status = "processing";
      record.updatedAt = Date.now();
      await this.migrations.save(record);
      try {
        const note = this.noteFor(asset);
        const frontmatter = note ? this.app.metadataCache.getFileCache(note)?.frontmatter : void 0;
        if (frontmatter?.["image-upload"] === false) {
          item.status = "skipped";
          item.error = "\u8BE5\u7B14\u8BB0\u901A\u8FC7 image-upload: false \u7981\u7528\u4E86\u4E0A\u4F20\u3002";
          return;
        }
        const input = await this.readInput(asset.localPath);
        const result = await this.pipeline.execute({ input, note, sourceFile: this.file(asset.localPath), index: index + 1, upload: true });
        item.remoteUrl = result.uploadResult?.url;
        item.reused = result.reused;
        item.status = "uploaded";
        await this.pipeline.commitManifest(result, asset.localPath, asset.references.map((reference) => reference.notePath));
        completedAssets.push({ asset, result, item });
        success++;
      } catch (error) {
        item.status = "failed";
        item.error = errorMessage(error);
        failed++;
      } finally {
        record.updatedAt = Date.now();
        await this.migrations.save(record);
      }
    });
    await this.activeQueue.run(tasks, (progress) => onProgress?.({ completed: progress.completed, total: progress.total, success, failed }));
    const cancelled = this.activeQueue.isCancelled;
    this.activeQueue = void 0;
    let transactionCommitted = false;
    try {
      await this.commitMarkdown(completedAssets, record);
      for (const completed of completedAssets) {
        const notes = [...new Set(completed.asset.references.map((reference) => reference.notePath))];
        await this.pipeline.commitManifest(completed.result, completed.asset.localPath, notes);
        completed.item.status = "completed";
      }
      record.status = cancelled ? "cancelled" : failed > 0 ? "failed" : "completed";
      if (!notePath && this.getSettings().cleanup.strategy === "backup") {
        for (const completed of completedAssets) {
          const original = report.assets.get(completed.asset.localPath);
          if (original && original.references.length === completed.asset.references.length) {
            completed.item.backupPath = joinVaultPath(this.getSettings().cleanup.backupFolder, record.migrationId, completed.asset.localPath);
          }
        }
      }
      record.updatedAt = Date.now();
      await this.migrations.save(record);
      transactionCommitted = true;
    } catch (error) {
      await this.restoreNotes(record);
      record.status = "failed";
      for (const completed of completedAssets) {
        completed.item.status = "failed";
        completed.item.error = `Markdown \u4E8B\u52A1\u5DF2\u56DE\u6EDA\uFF1A${errorMessage(error)}`;
      }
    }
    if (transactionCommitted && !notePath) {
      try {
        const safeToClean = completedAssets.filter((completed) => report.assets.get(completed.asset.localPath)?.references.length === completed.asset.references.length);
        const cleanupFailed = await this.cleanupFiles(safeToClean, record);
        if (cleanupFailed) record.status = "failed";
      } catch (error) {
        record.status = "failed";
        for (const completed of completedAssets) completed.item.error ??= `\u8FDC\u7A0B\u94FE\u63A5\u5DF2\u7ECF\u751F\u6548\uFF0C\u4F46\u6E05\u7406\u65E5\u5FD7\u5199\u5165\u5931\u8D25\uFF1A${errorMessage(error)}`;
      }
    }
    record.updatedAt = Date.now();
    await this.migrations.save(record);
    return record;
  }
  async rollbackLatest() {
    const record = await this.migrations.loadLatest();
    if (!record || record.status === "rolled-back") return record;
    await this.restoreNotes(record);
    for (const item of record.items) {
      if (!item.backupPath) continue;
      const backup = this.app.vault.getAbstractFileByPath(item.backupPath);
      if (!(backup instanceof import_obsidian3.TFile)) continue;
      if (this.app.vault.getAbstractFileByPath(item.sourcePath)) continue;
      await this.ensureFolder(item.sourcePath.split("/").slice(0, -1).join("/"));
      await this.app.fileManager.renameFile(backup, item.sourcePath);
    }
    await this.manifest.removeByMigrationUrls(new Set(record.items.flatMap((item) => item.remoteUrl && !item.reused ? [item.remoteUrl] : [])));
    record.status = "rolled-back";
    record.updatedAt = Date.now();
    await this.migrations.save(record);
    return record;
  }
  async prepareResume(record) {
    await this.restoreNotes(record);
    for (const item of record.items) {
      if (!item.backupPath) continue;
      const backup = this.app.vault.getAbstractFileByPath(item.backupPath);
      if (!(backup instanceof import_obsidian3.TFile) || this.app.vault.getAbstractFileByPath(item.sourcePath)) continue;
      await this.ensureFolder(item.sourcePath.split("/").slice(0, -1).join("/"));
      await this.app.fileManager.renameFile(backup, item.sourcePath);
    }
    record.status = "cancelled";
    record.updatedAt = Date.now();
    await this.migrations.save(record);
  }
  async commitMarkdown(completedAssets, record) {
    const perNote = /* @__PURE__ */ new Map();
    const itemsByNote = /* @__PURE__ */ new Map();
    for (const completed of completedAssets) {
      const url = completed.result.uploadResult?.url;
      if (!url) continue;
      for (const reference of completed.asset.references) {
        const replacement = this.pipeline.markdownFor(url, reference.alt, reference.displayWidth);
        perNote.set(reference.notePath, [...perNote.get(reference.notePath) ?? [], { start: reference.start, end: reference.end, expected: reference.rawLink, replacement }]);
        itemsByNote.set(reference.notePath, [...itemsByNote.get(reference.notePath) ?? [], completed.item]);
      }
    }
    for (const [notePath, replacements] of perNote) {
      const note = this.file(notePath);
      const before = await this.app.vault.read(note);
      record.noteBackups.push({ notePath, content: before });
      await this.migrations.save(record);
      const after = this.replacer.apply(before, replacements);
      await this.app.vault.modify(note, after);
      const verified = await this.app.vault.read(note);
      if (verified !== after) throw new Error(`\u5199\u5165\u540E\u6821\u9A8C\u5931\u8D25\uFF1A${notePath}`);
      for (const item of itemsByNote.get(notePath) ?? []) {
        item.notesModified = [.../* @__PURE__ */ new Set([...item.notesModified, notePath])];
        item.status = "replaced";
      }
      await this.migrations.save(record);
    }
  }
  async cleanupFiles(completedAssets, record) {
    const strategy = this.getSettings().cleanup.strategy;
    if (strategy === "keep") return false;
    let failed = false;
    for (const completed of completedAssets) {
      const file = this.app.vault.getAbstractFileByPath(completed.asset.localPath);
      if (!(file instanceof import_obsidian3.TFile)) continue;
      try {
        if (strategy === "trash") await this.app.vault.trash(file, true);
        else {
          const backupPath = completed.item.backupPath ?? joinVaultPath(this.getSettings().cleanup.backupFolder, record.migrationId, completed.asset.localPath);
          completed.item.backupPath = backupPath;
          await this.ensureFolder(backupPath.split("/").slice(0, -1).join("/"));
          await this.app.fileManager.renameFile(file, backupPath);
        }
      } catch (error) {
        failed = true;
        completed.item.error = `\u8FDC\u7A0B\u94FE\u63A5\u5DF2\u66F4\u65B0\uFF0C\u4F46\u672C\u5730\u6587\u4EF6\u6E05\u7406\u5931\u8D25\uFF1B\u539F\u6587\u4EF6\u4ECD\u4FDD\u7559\uFF1A${errorMessage(error)}`;
      }
      await this.migrations.save(record);
    }
    return failed;
  }
  async restoreNotes(record) {
    for (const backup of record.noteBackups) {
      const note = this.app.vault.getAbstractFileByPath(backup.notePath);
      if (note instanceof import_obsidian3.TFile) await this.app.vault.modify(note, backup.content);
    }
  }
  selectAssets(report, notePath) {
    return [...report.assets.values()].map((asset) => ({
      ...asset,
      references: asset.references.filter((reference) => {
        if (notePath && reference.notePath !== notePath) return false;
        const note = this.app.vault.getAbstractFileByPath(reference.notePath);
        return !(note instanceof import_obsidian3.TFile) || this.app.metadataCache.getFileCache(note)?.frontmatter?.["image-upload"] !== false;
      })
    })).filter((asset) => asset.references.length > 0);
  }
  noteFor(asset) {
    const path = asset.references[0]?.notePath;
    const file = path ? this.app.vault.getAbstractFileByPath(path) : void 0;
    return file instanceof import_obsidian3.TFile ? file : void 0;
  }
  file(path) {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof import_obsidian3.TFile)) throw new Error(`\u627E\u4E0D\u5230\u6587\u4EF6\uFF1A${path}`);
    return file;
  }
  async readInput(path) {
    const file = this.file(path);
    return { name: file.name, mimeType: mimeFromName(file.name), data: await this.app.vault.readBinary(file) };
  }
  async ensureFolder(path) {
    let current = "";
    for (const segment of (0, import_obsidian3.normalizePath)(path).split("/").filter(Boolean)) {
      current = joinVaultPath(current, segment);
      if (!this.app.vault.getAbstractFileByPath(current)) await this.app.vault.createFolder(current);
    }
  }
};

// src/ui/SettingsTab.ts
var import_obsidian4 = require("obsidian");
var ImageAssetSettingsTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    this.containerEl.addClass("iam-settings");
    this.renderHeader();
    const refreshSetup = this.renderSetupGuide();
    this.renderGeneral(refreshSetup);
    this.renderUploader(refreshSetup);
    this.renderImageProcessing(refreshSetup);
    this.renderNaming();
    this.renderMarkdownAndCleanup();
    this.renderBatchAndAdvanced();
    const footer = this.containerEl.createDiv({ cls: "iam-settings-footer" });
    const icon = footer.createSpan();
    (0, import_obsidian4.setIcon)(icon, "check");
    footer.createSpan({ text: "\u6240\u6709\u66F4\u6539\u90FD\u4F1A\u81EA\u52A8\u4FDD\u5B58\u5230\u5F53\u524D Vault\u3002" });
  }
  renderHeader() {
    const header = this.containerEl.createDiv({ cls: "iam-settings-hero" });
    const mark = header.createDiv({ cls: "iam-settings-hero__mark" });
    (0, import_obsidian4.setIcon)(mark, "images");
    const copy = header.createDiv({ cls: "iam-settings-hero__copy" });
    copy.createEl("h2", { text: "VaultPix \xB7 \u4E91\u56FE\u5323" });
    copy.createEl("p", { text: "\u8BA9\u56FE\u7247\u4ECE\u7C98\u8D34\u3001\u4F18\u5316\u3001\u4E0A\u4F20\u5230\u5907\u4EFD\u59CB\u7EC8\u6E05\u6670\u53EF\u63A7\u3002\u5B8C\u6210\u4E0B\u65B9\u4E09\u6B65\uFF0C\u5373\u53EF\u5F00\u59CB\u4F7F\u7528\u3002" });
  }
  renderSetupGuide() {
    const guide = this.containerEl.createDiv({ cls: "iam-setup-guide" });
    const top = guide.createDiv({ cls: "iam-setup-guide__top" });
    const copy = top.createDiv();
    copy.createEl("h3", { text: "\u5F00\u59CB\u524D\u68C0\u67E5" });
    copy.createEl("p", { text: "\u7EA6 3 \u5206\u949F\u3002\u719F\u6089 S3/R2 \u7684\u7528\u6237\u53EF\u4EE5\u76F4\u63A5\u5C55\u5F00\u5BF9\u5E94\u5206\u7C7B\u3002" });
    const status = top.createSpan({ cls: "iam-status-badge" });
    const steps = guide.createEl("ol", { cls: "iam-setup-steps" });
    const behaviorStep = this.setupStep(steps, "\u9009\u62E9\u5DE5\u4F5C\u65B9\u5F0F", "\u51B3\u5B9A\u7C98\u8D34\u56FE\u7247\u540E\u662F\u5426\u81EA\u52A8\u4E0A\u4F20");
    const providerStep = this.setupStep(steps, "\u586B\u5199\u4E0A\u4F20\u670D\u52A1", "\u914D\u7F6E Bucket\u3001\u5BC6\u94A5\u548C\u516C\u5F00\u57DF\u540D");
    const testStep = this.setupStep(steps, "\u6D4B\u8BD5\u771F\u5B9E\u8FDE\u63A5", "\u786E\u8BA4 Bucket \u6743\u9650\uFF1B\u9996\u6B21\u4E0A\u4F20\u518D\u9A8C\u8BC1\u516C\u5F00\u5730\u5740");
    const summary = guide.createDiv({ cls: "iam-workflow-summary" });
    const summaryIcon = summary.createSpan();
    (0, import_obsidian4.setIcon)(summaryIcon, "workflow");
    const summaryText = summary.createSpan();
    const update = () => {
      const missing = this.missingUploaderFields();
      const tested = this.currentConnectionTest();
      behaviorStep.toggleClass("is-complete", true);
      providerStep.toggleClass("is-complete", missing.length === 0);
      testStep.toggleClass("is-complete", tested?.success === true);
      status.removeClass("is-ready", "is-warning", "is-error");
      if (!this.plugin.settings.enabled) {
        status.addClass("is-warning");
        status.setText("\u63D2\u4EF6\u5DF2\u505C\u7528");
      } else if (this.plugin.settings.workMode !== "automatic" && missing.length) {
        status.addClass("is-ready");
        status.setText("\u672C\u5730\u5904\u7406\u5DF2\u5C31\u7EEA");
      } else if (missing.length) {
        status.addClass("is-warning");
        status.setText(`\u8FD8\u9700\u586B\u5199 ${missing.length} \u9879`);
      } else if (!tested) {
        status.addClass("is-warning");
        status.setText("\u7B49\u5F85\u8FDE\u63A5\u6D4B\u8BD5");
      } else if (tested.success) {
        status.addClass("is-ready");
        status.setText("\u53EF\u4EE5\u5F00\u59CB\u4F7F\u7528");
      } else {
        status.addClass("is-error");
        status.setText("\u8FDE\u63A5\u6D4B\u8BD5\u5931\u8D25");
      }
      const mode = this.plugin.settings.workMode === "automatic" ? "\u81EA\u52A8\u5904\u7406\u5E76\u4E0A\u4F20" : this.plugin.settings.workMode === "semi-automatic" ? "\u81EA\u52A8\u4F18\u5316\u3001\u624B\u52A8\u4E0A\u4F20" : "\u4EC5\u5728\u6267\u884C\u547D\u4EE4\u65F6\u5904\u7406";
      const resize = this.plugin.settings.image.resizeMode === "long-edge" ? `\u6700\u957F\u8FB9 ${this.plugin.settings.image.longEdge}px` : this.resizeModeLabel(this.plugin.settings.image.resizeMode);
      summaryText.setText(`\u5F53\u524D\u6D41\u7A0B\uFF1A${mode} \xB7 ${this.plugin.settings.image.outputFormat.toUpperCase()} \xB7 ${resize} \xB7 ${this.providerLabel()}`);
    };
    update();
    return update;
  }
  renderGeneral(refreshSetup) {
    const content = this.section("\u57FA\u7840\u884C\u4E3A", "\u63A7\u5236\u63D2\u4EF6\u4F55\u65F6\u4ECB\u5165\uFF0C\u4EE5\u53CA\u56FE\u7247\u8FDB\u5165\u7B14\u8BB0\u540E\u7684\u9ED8\u8BA4\u52A8\u4F5C\u3002", "sliders-horizontal", true, this.plugin.settings.enabled ? "\u5DF2\u542F\u7528" : "\u5DF2\u505C\u7528");
    new import_obsidian4.Setting(content).setName("\u542F\u7528\u56FE\u7247\u5904\u7406").setDesc("\u5173\u95ED\u540E\uFF0C\u7C98\u8D34\u548C\u62D6\u62FD\u4F1A\u5B8C\u5168\u4EA4\u7ED9 Obsidian\uFF1B\u56FE\u7247\u7BA1\u7406\u5668\u548C\u624B\u52A8\u547D\u4EE4\u4ECD\u53EF\u4F7F\u7528\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.enabled).onChange((value) => this.persist((s2) => s2.enabled = value, () => {
      this.updateSectionMeta(content, value ? "\u5DF2\u542F\u7528" : "\u5DF2\u505C\u7528");
      refreshSetup();
    })));
    let pasteToggle;
    let dropToggle;
    let updateAutomationState = () => void 0;
    new import_obsidian4.Setting(content).setName("\u5DE5\u4F5C\u6A21\u5F0F").setDesc("\u63A8\u8350\u201C\u81EA\u52A8\u201D\uFF1A\u4E0A\u4F20\u5E76\u9A8C\u8BC1\u6210\u529F\u540E\u624D\u66FF\u6362\u7B14\u8BB0\u94FE\u63A5\uFF1B\u4EFB\u4F55\u5931\u8D25\u90FD\u4F1A\u4FDD\u7559\u672C\u5730\u56FE\u7247\u3002").addDropdown((dropdown) => dropdown.addOptions({ automatic: "\u81EA\u52A8\uFF1A\u4F18\u5316\u5E76\u4E0A\u4F20", "semi-automatic": "\u534A\u81EA\u52A8\uFF1A\u4EC5\u4F18\u5316\u5230\u672C\u5730", manual: "\u624B\u52A8\uFF1A\u4EC5\u54CD\u5E94\u547D\u4EE4" }).setValue(this.plugin.settings.workMode).onChange(async (value) => {
      await this.persist((s2) => s2.workMode = value);
      updateAutomationState();
      refreshSetup();
    }));
    const pasteSetting = new import_obsidian4.Setting(content).setName("\u5904\u7406\u7C98\u8D34\u56FE\u7247").setDesc("\u4ECE\u526A\u8D34\u677F\u7C98\u8D34\u56FE\u7247\u65F6\u6267\u884C\u5F53\u524D\u5DE5\u4F5C\u6A21\u5F0F\u3002\u5931\u8D25\u65F6\u4F1A\u81EA\u52A8\u4FDD\u7559\u4E3A\u672C\u5730\u9644\u4EF6\u3002").addToggle((toggle) => {
      pasteToggle = toggle;
      toggle.setValue(this.plugin.settings.autoProcessPaste).onChange((value) => this.persist((s2) => s2.autoProcessPaste = value));
    });
    const dropSetting = new import_obsidian4.Setting(content).setName("\u5904\u7406\u62D6\u5165\u56FE\u7247").setDesc("\u4ECE\u6587\u4EF6\u7BA1\u7406\u5668\u62D6\u5165\u56FE\u7247\u65F6\u6267\u884C\u5F53\u524D\u5DE5\u4F5C\u6A21\u5F0F\u3002\u5931\u8D25\u65F6\u4E0D\u4F1A\u5220\u9664\u6E90\u6587\u4EF6\u3002").addToggle((toggle) => {
      dropToggle = toggle;
      toggle.setValue(this.plugin.settings.autoProcessDrop).onChange((value) => this.persist((s2) => s2.autoProcessDrop = value));
    });
    updateAutomationState = () => {
      const manual = this.plugin.settings.workMode === "manual";
      pasteSetting.settingEl.toggleClass("is-disabled", manual);
      dropSetting.settingEl.toggleClass("is-disabled", manual);
      pasteToggle?.setDisabled(manual);
      dropToggle?.setDisabled(manual);
    };
    updateAutomationState();
  }
  renderUploader(refreshSetup) {
    const missing = this.missingUploaderFields();
    const tested = this.currentConnectionTest();
    const needsUploadSetup = this.plugin.settings.workMode === "automatic" && (missing.length > 0 || tested?.success !== true);
    const content = this.section("\u4E0A\u4F20\u670D\u52A1", "\u8FDE\u63A5 Cloudflare R2\u3001\u963F\u91CC\u4E91 OSS \u6216\u5176\u4ED6 S3 \u517C\u5BB9\u5BF9\u8C61\u5B58\u50A8\u3002\u81EA\u52A8\u6A21\u5F0F\u5FC5\u987B\u5B8C\u6210\u8FD9\u91CC\u3002", "cloud-upload", needsUploadSetup, tested?.success ? "\u8FDE\u63A5\u6B63\u5E38" : missing.length ? `\u7F3A\u5C11 ${missing.length} \u9879` : "\u5F85\u6D4B\u8BD5");
    const connectionState = content.createDiv({ cls: "iam-connection-state" });
    const connectionIcon = connectionState.createSpan({ cls: "iam-connection-state__icon" });
    const connectionCopy = connectionState.createDiv();
    const connectionTitle = connectionCopy.createEl("strong");
    const connectionDescription = connectionCopy.createEl("span");
    const refreshConnectionState = () => {
      const fields = this.missingUploaderFields();
      const result = this.currentConnectionTest();
      connectionState.removeClass("is-ready", "is-warning", "is-error");
      connectionIcon.empty();
      if (fields.length) {
        connectionState.addClass("is-warning");
        (0, import_obsidian4.setIcon)(connectionIcon, "circle-alert");
        connectionTitle.setText("\u914D\u7F6E\u5C1A\u672A\u5B8C\u6210");
        connectionDescription.setText(`\u8BF7\u586B\u5199\uFF1A${fields.join("\u3001")}\u3002`);
        this.updateSectionMeta(content, `\u7F3A\u5C11 ${fields.length} \u9879`);
      } else if (!result) {
        connectionState.addClass("is-warning");
        (0, import_obsidian4.setIcon)(connectionIcon, "plug-zap");
        connectionTitle.setText("\u914D\u7F6E\u5DF2\u586B\u5199\uFF0C\u5C1A\u672A\u9A8C\u8BC1");
        connectionDescription.setText("\u70B9\u51FB\u672C\u5206\u7C7B\u5E95\u90E8\u7684\u201C\u6D4B\u8BD5\u8FDE\u63A5\u201D\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u6216\u4FEE\u6539\u4EFB\u4F55\u7B14\u8BB0\u3002");
        this.updateSectionMeta(content, "\u5F85\u6D4B\u8BD5");
      } else if (result.success) {
        connectionState.addClass("is-ready");
        (0, import_obsidian4.setIcon)(connectionIcon, "badge-check");
        connectionTitle.setText("\u4E0A\u4F20\u670D\u52A1\u53EF\u4EE5\u4F7F\u7528");
        connectionDescription.setText(`\u6700\u8FD1\u9A8C\u8BC1\uFF1A${new Date(result.testedAt).toLocaleString()}\u3002`);
        this.updateSectionMeta(content, "\u8FDE\u63A5\u6B63\u5E38");
      } else {
        connectionState.addClass("is-error");
        (0, import_obsidian4.setIcon)(connectionIcon, "circle-x");
        connectionTitle.setText("\u4E0A\u6B21\u8FDE\u63A5\u6D4B\u8BD5\u5931\u8D25");
        connectionDescription.setText(result.message || "\u8BF7\u68C0\u67E5 Endpoint\u3001\u5BC6\u94A5\u6743\u9650\u548C Bucket \u540D\u79F0\u540E\u91CD\u8BD5\u3002");
        this.updateSectionMeta(content, "\u6D4B\u8BD5\u5931\u8D25");
      }
      refreshSetup();
    };
    new import_obsidian4.Setting(content).setName("\u670D\u52A1\u7C7B\u578B").setDesc("\u76F4\u63A5\u9009\u62E9\u5B9E\u9645\u4F7F\u7528\u7684\u670D\u52A1\uFF1B\u53EA\u6709\u672A\u5355\u72EC\u5217\u51FA\u7684\u517C\u5BB9\u670D\u52A1\u624D\u9009\u62E9\u201C\u901A\u7528 S3\u201D\u3002").addDropdown((dropdown) => dropdown.addOptions(PROVIDER_LABELS).setValue(this.plugin.settings.uploader.provider).onChange(async (value) => {
      await this.persistUploader((s2) => applyProviderDefaults(s2, value));
      this.display();
    }));
    this.providerHelp(content);
    if (this.plugin.settings.uploader.provider === "oss") {
      this.text(content, "Region\uFF08\u5730\u57DF ID\uFF09", "\u4ECE OSS Bucket \u6982\u89C8\u590D\u5236\uFF0C\u4F8B\u5982\u676D\u5DDE\u662F cn-hangzhou\u3001\u4E1C\u4EAC\u662F ap-northeast-1\u3002", this.plugin.settings.uploader.region, "cn-hangzhou", (value) => this.persistUploader((s2) => {
        s2.region = value.trim();
        s2.endpoint = ossEndpoint(s2.region);
      }, refreshConnectionState));
      this.readonlyText(content, "Endpoint\uFF08\u81EA\u52A8\u751F\u6210\uFF09", "VaultPix \u4F1A\u6309\u5730\u57DF\u751F\u6210 OSS \u7684 S3 \u517C\u5BB9 API \u5730\u5740\uFF0C\u65E0\u9700\u624B\u52A8\u4FEE\u6539\u3002", ossEndpoint(this.plugin.settings.uploader.region));
    } else {
      this.text(content, "Endpoint", "\u5BF9\u8C61\u5B58\u50A8 API \u5730\u5740\uFF0C\u4E0D\u662F\u56FE\u7247\u7684\u516C\u5F00\u8BBF\u95EE\u57DF\u540D\u3002", this.plugin.settings.uploader.endpoint, this.plugin.settings.uploader.provider === "r2" ? "https://<\u8D26\u6237ID>.r2.cloudflarestorage.com" : "https://s3.example.com", (value) => this.persistUploader((s2) => s2.endpoint = value, refreshConnectionState));
      this.text(content, "Region", this.plugin.settings.uploader.provider === "r2" ? "R2 \u56FA\u5B9A\u4F7F\u7528 auto\uFF0C\u901A\u5E38\u65E0\u9700\u4FEE\u6539\u3002" : "\u5BF9\u8C61\u5B58\u50A8\u6240\u5728\u533A\u57DF\uFF0C\u4F8B\u5982 ap-northeast-1\u3002", this.plugin.settings.uploader.region, this.plugin.settings.uploader.provider === "r2" ? "auto" : "ap-northeast-1", (value) => this.persistUploader((s2) => s2.region = value, refreshConnectionState));
    }
    this.text(content, "Bucket", "\u5B58\u50A8\u56FE\u7247\u7684\u5BF9\u8C61\u5B58\u50A8\u6876\u540D\u79F0\uFF0C\u5FC5\u987B\u4E0E API \u5BC6\u94A5\u6743\u9650\u5339\u914D\u3002", this.plugin.settings.uploader.bucket, "obsidian-images", (value) => this.persistUploader((s2) => {
      s2.bucket = value.trim();
    }, refreshConnectionState));
    if (this.plugin.settings.uploader.provider === "oss") {
      new import_obsidian4.Setting(content).setName("\u81EA\u52A8\u586B\u5199 OSS \u5730\u5740").setDesc("\u6839\u636E\u4E0A\u9762\u7684\u5730\u57DF\u548C Bucket \u751F\u6210 Endpoint \u4E0E\u9ED8\u8BA4\u516C\u5171\u8BBF\u95EE\u57DF\u540D\uFF1B\u4F7F\u7528\u81EA\u5B9A\u4E49\u57DF\u540D\u65F6\u53EF\u5728\u751F\u6210\u540E\u4FEE\u6539\u3002").addButton((button) => button.setButtonText("\u751F\u6210\u5E76\u586B\u5165").setIcon("wand-sparkles").onClick(async () => {
        await this.persistUploader((s2) => {
          s2.endpoint = ossEndpoint(s2.region);
          s2.publicBaseUrl = ossPublicBaseUrl(s2.bucket, s2.region);
          s2.forcePathStyle = false;
        });
        this.display();
      }));
    }
    this.secret(content, "Access Key ID", "\u5BF9\u8C61\u5B58\u50A8 API \u5BC6\u94A5\u7684\u6807\u8BC6\uFF0C\u4E0D\u662F Cloudflare \u767B\u5F55\u90AE\u7BB1\u3002", this.plugin.settings.uploader.accessKeyId, (value) => this.persistUploader((s2) => s2.accessKeyId = value, refreshConnectionState));
    this.secret(content, "Secret Access Key", "\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D Vault \u7684\u63D2\u4EF6\u914D\u7F6E\u4E2D\uFF1B\u754C\u9762\u4E0D\u4F1A\u518D\u6B21\u663E\u793A\u660E\u6587\u3002", this.plugin.settings.uploader.secretAccessKey, (value) => this.persistUploader((s2) => s2.secretAccessKey = value, refreshConnectionState));
    this.text(content, "\u516C\u5171\u8BBF\u95EE\u57DF\u540D", this.plugin.settings.uploader.provider === "oss" ? "\u6700\u7EC8\u5199\u5165 Markdown \u7684\u56FE\u7247\u57DF\u540D\u3002\u9ED8\u8BA4\u5730\u5740\u5DF2\u81EA\u52A8\u751F\u6210\uFF0C\u4E5F\u53EF\u4EE5\u6362\u6210\u7ED1\u5B9A\u5230 OSS \u7684\u81EA\u5B9A\u4E49\u57DF\u540D\u3002" : "\u6700\u7EC8\u5199\u5165 Markdown \u7684\u56FE\u7247\u57DF\u540D\uFF0C\u5FC5\u987B\u5141\u8BB8\u533F\u540D\u8BFB\u53D6\u3002", this.plugin.settings.uploader.publicBaseUrl, this.plugin.settings.uploader.provider === "oss" ? "\u586B\u5199 Bucket \u540E\u81EA\u52A8\u751F\u6210" : "https://img.example.com", (value) => this.persistUploader((s2) => s2.publicBaseUrl = value, refreshConnectionState));
    this.text(content, "\u8DEF\u5F84\u524D\u7F00", "\u53EF\u9009\u3002\u7EDF\u4E00\u653E\u5728\u6240\u6709\u8FDC\u7A0B\u8DEF\u5F84\u524D\uFF0C\u4F8B\u5982 notes\uFF1B\u4E0D\u8981\u4EE5\u659C\u6760\u5F00\u5934\u3002", this.plugin.settings.uploader.pathPrefix, "notes", (value) => this.persistUploader((s2) => s2.pathPrefix = value));
    if (this.plugin.settings.uploader.provider === "s3") {
      new import_obsidian4.Setting(content).setName("\u4F7F\u7528 Path Style").setDesc("\u4EC5 MinIO \u6216\u660E\u786E\u8981\u6C42\u8DEF\u5F84\u5F0F URL \u7684\u670D\u52A1\u9700\u8981\u5F00\u542F\uFF1BAWS S3 \u901A\u5E38\u4FDD\u6301\u5173\u95ED\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.uploader.forcePathStyle).onChange((value) => this.persistUploader((s2) => s2.forcePathStyle = value, refreshConnectionState)));
    }
    const security = content.createDiv({ cls: "iam-security-note" });
    const securityIcon = security.createSpan();
    (0, import_obsidian4.setIcon)(securityIcon, "shield-check");
    security.createSpan({ text: "\u5BC6\u94A5\u5B58\u50A8\u5728\u672C\u5730 data.json \u4E2D\uFF0C\u4E0D\u4F1A\u5199\u5165\u7B14\u8BB0\u3001Manifest \u6216\u65E5\u5FD7\u3002\u8BF7\u52FF\u516C\u5F00\u540C\u6B65 Vault \u7684\u914D\u7F6E\u76EE\u5F55\u3002" });
    new import_obsidian4.Setting(content).setName("\u9A8C\u8BC1\u8FD9\u7EC4\u914D\u7F6E").setDesc("\u68C0\u67E5 Bucket \u6743\u9650\u3002\u81EA\u52A8\u4E0A\u4F20\u65F6\u8FD8\u4F1A\u9A8C\u8BC1\u6700\u7EC8\u516C\u5F00 URL \u662F\u5426\u53EF\u8BBF\u95EE\u3002").addButton((button) => this.connectionButton(button, refreshConnectionState));
    refreshConnectionState();
  }
  providerHelp(content) {
    const help = content.createEl("details", { cls: "iam-inline-help" });
    const summary = help.createEl("summary");
    const icon = summary.createSpan();
    (0, import_obsidian4.setIcon)(icon, "circle-help");
    summary.createSpan({ text: this.plugin.settings.uploader.provider === "r2" ? "\u6211\u5728\u54EA\u91CC\u627E\u5230 R2 \u914D\u7F6E\uFF1F" : this.plugin.settings.uploader.provider === "oss" ? "\u7B2C\u4E00\u6B21\u4F7F\u7528 OSS\uFF0C\u5E94\u8BE5\u600E\u4E48\u914D\u7F6E\uFF1F" : "\u8FD9\u4E9B S3 \u5B57\u6BB5\u5206\u522B\u662F\u4EC0\u4E48\uFF1F" });
    const body = help.createDiv({ cls: "iam-inline-help__body" });
    if (this.plugin.settings.uploader.provider === "r2") {
      body.createEl("p", { text: "\u5728 Cloudflare \u63A7\u5236\u53F0\u6253\u5F00 R2\uFF1A" });
      const list = body.createEl("ol");
      list.createEl("li", { text: "\u5728\u201C\u7BA1\u7406 R2 API \u4EE4\u724C\u201D\u4E2D\u521B\u5EFA\u5177\u6709\u5BF9\u8C61\u8BFB\u5199\u6743\u9650\u7684\u4EE4\u724C\uFF0C\u590D\u5236 Access Key ID \u548C Secret Access Key\u3002" });
      list.createEl("li", { text: "Endpoint \u5F62\u5982 https://<\u8D26\u6237ID>.r2.cloudflarestorage.com\uFF0CBucket \u586B R2 \u5B58\u50A8\u6876\u540D\u79F0\u3002" });
      list.createEl("li", { text: "\u5728\u5B58\u50A8\u6876\u8BBE\u7F6E\u4E2D\u7ED1\u5B9A\u81EA\u5B9A\u4E49\u57DF\u540D\u6216\u542F\u7528 r2.dev\uFF0C\u586B\u5165\u53EF\u516C\u5F00\u8BBF\u95EE\u7684\u57FA\u7840\u57DF\u540D\u3002" });
      const links = body.createDiv({ cls: "iam-help-links" });
      links.createEl("a", { text: "R2 API \u51ED\u636E\u6587\u6863", href: "https://developers.cloudflare.com/r2/api/tokens/" });
      links.createEl("a", { text: "R2 \u516C\u5171\u8BBF\u95EE\u6587\u6863", href: "https://developers.cloudflare.com/r2/buckets/public-buckets/" });
    } else if (this.plugin.settings.uploader.provider === "oss") {
      body.createEl("p", { text: "\u5728\u963F\u91CC\u4E91\u63A7\u5236\u53F0\u5B8C\u6210\u4EE5\u4E0B\u8BBE\u7F6E\u540E\uFF0C\u518D\u56DE\u5230\u8FD9\u91CC\u586B\u5199\uFF1A" });
      const list = body.createEl("ol");
      list.createEl("li", { text: "\u521B\u5EFA\u4E00\u4E2A\u53EA\u5B58\u516C\u5F00\u7B14\u8BB0\u56FE\u7247\u7684 OSS Bucket\uFF0C\u8BB0\u5F55 Bucket \u540D\u79F0\u548C\u5730\u57DF ID\u3002" });
      list.createEl("li", { text: "\u5C06\u8BE5 Bucket \u8BBE\u4E3A\u201C\u516C\u5171\u8BFB\u201D\uFF0C\u7EDD\u5BF9\u4E0D\u8981\u9009\u62E9\u201C\u516C\u5171\u8BFB\u5199\u201D\u3002" });
      list.createEl("li", { text: "\u521B\u5EFA\u4E13\u7528 RAM \u7528\u6237\u5E76\u6388\u4E88 OSS \u4E0A\u4F20\u6743\u9650\uFF0C\u590D\u5236 AccessKey ID \u548C AccessKey Secret\u3002" });
      list.createEl("li", { text: "\u5728\u672C\u9875\u586B\u5199\u5730\u57DF\u3001Bucket \u548C\u5BC6\u94A5\uFF1BEndpoint \u4E0E\u9ED8\u8BA4\u516C\u5171\u57DF\u540D\u4F1A\u81EA\u52A8\u751F\u6210\u3002" });
      const links = body.createDiv({ cls: "iam-help-links" });
      links.createEl("a", { text: "VaultPix OSS \u5B8C\u6574\u6559\u7A0B", href: "https://github.com/Sonify2026/vaultpix/blob/main/docs/ALIYUN_OSS.md" });
      links.createEl("a", { text: "\u963F\u91CC\u4E91 OSS \u63A7\u5236\u53F0", href: "https://oss.console.aliyun.com/" });
    } else {
      body.createEl("p", { text: "Endpoint \u662F\u5BF9\u8C61\u5B58\u50A8 API \u5730\u5740\uFF1BRegion \u662F\u533A\u57DF\u6807\u8BC6\uFF1B\u516C\u5171\u8BBF\u95EE\u57DF\u540D\u662F\u6700\u7EC8\u5199\u5165 Markdown \u7684\u56FE\u7247\u57DF\u540D\u3002MinIO \u901A\u5E38\u8FD8\u9700\u8981\u5F00\u542F Path Style\u3002" });
      body.createDiv({ cls: "iam-help-links" }).createEl("a", { text: "AWS S3 URL \u683C\u5F0F\u8BF4\u660E", href: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html" });
    }
  }
  renderImageProcessing(refreshSetup) {
    const content = this.section("\u56FE\u7247\u4F18\u5316", "\u51B3\u5B9A\u8F93\u51FA\u683C\u5F0F\u3001\u753B\u8D28\u4E0E\u5C3A\u5BF8\u3002\u63A8\u8350\u9ED8\u8BA4\u503C\u9002\u5408\u622A\u56FE\u3001\u7167\u7247\u548C\u4E00\u822C\u7B14\u8BB0\u3002", "image", false, this.plugin.settings.image.outputFormat.toUpperCase());
    const note = content.createDiv({ cls: "iam-context-note" });
    const noteIcon = note.createSpan();
    (0, import_obsidian4.setIcon)(noteIcon, "info");
    note.createSpan({ text: "WebP \u517C\u987E\u4F53\u79EF\u3001\u6E05\u6670\u5EA6\u548C\u900F\u660E\u80CC\u666F\uFF0C\u662F\u6700\u7A33\u59A5\u7684\u9ED8\u8BA4\u9009\u62E9\u3002GIF \u4E0E SVG \u9ED8\u8BA4\u4FDD\u6301\u539F\u683C\u5F0F\u3002" });
    const qualityRows = /* @__PURE__ */ new Map();
    const updateQualityRows = () => {
      for (const [format2, row] of qualityRows) row.settingEl.toggle(format2 === this.plugin.settings.image.outputFormat);
      this.updateSectionMeta(content, this.plugin.settings.image.outputFormat.toUpperCase());
      refreshSetup();
    };
    new import_obsidian4.Setting(content).setName("\u8F93\u51FA\u683C\u5F0F").setDesc("\u4FDD\u6301\u539F\u683C\u5F0F\u4E0D\u4F1A\u91CD\u65B0\u7F16\u7801\uFF0C\u4E5F\u4E0D\u4F1A\u6E05\u7406\u5143\u6570\u636E\u3002AVIF \u662F\u5426\u53EF\u7528\u53D6\u51B3\u4E8E Obsidian/Electron \u7248\u672C\u3002").addDropdown((dropdown) => dropdown.addOptions({ webp: "WebP\uFF08\u63A8\u8350\uFF09", jpeg: "JPEG\uFF08\u7167\u7247\uFF09", png: "PNG\uFF08\u65E0\u635F\uFF09", avif: "AVIF\uFF08\u5B9E\u9A8C\u6027\uFF09", original: "\u4FDD\u6301\u539F\u683C\u5F0F" }).setValue(this.plugin.settings.image.outputFormat).onChange(async (value) => {
      await this.persist((s2) => s2.image.outputFormat = value);
      updateQualityRows();
    }));
    qualityRows.set("webp", this.slider(content, "WebP \u8D28\u91CF", "82 \u662F\u6E05\u6670\u5EA6\u4E0E\u4F53\u79EF\u7684\u5747\u8861\u70B9\uFF1B\u63D0\u9AD8\u8D28\u91CF\u4F1A\u663E\u8457\u589E\u52A0\u6587\u4EF6\u5927\u5C0F\u3002", this.plugin.settings.image.webpQuality, (value) => this.persist((s2) => s2.image.webpQuality = value)));
    qualityRows.set("jpeg", this.slider(content, "JPEG \u8D28\u91CF", "85 \u9002\u5408\u7167\u7247\uFF1BJPEG \u4E0D\u652F\u6301\u900F\u660E\u80CC\u666F\u3002", this.plugin.settings.image.jpegQuality, (value) => this.persist((s2) => s2.image.jpegQuality = value)));
    qualityRows.set("avif", this.slider(content, "AVIF \u8D28\u91CF", "70 \u901A\u5E38\u5DF2\u8DB3\u591F\u6E05\u6670\uFF1B\u7F16\u7801\u5931\u8D25\u65F6\u539F\u56FE\u4F1A\u4FDD\u7559\u3002", this.plugin.settings.image.avifQuality, (value) => this.persist((s2) => s2.image.avifQuality = value)));
    const resizeRows = /* @__PURE__ */ new Map();
    const updateResizeRows = () => {
      const mode = this.plugin.settings.image.resizeMode;
      resizeRows.get("width")?.settingEl.toggle(["width", "fit", "fill", "fixed"].includes(mode));
      resizeRows.get("height")?.settingEl.toggle(["height", "fit", "fill", "fixed"].includes(mode));
      resizeRows.get("long")?.settingEl.toggle(mode === "long-edge");
      resizeRows.get("short")?.settingEl.toggle(mode === "short-edge");
      refreshSetup();
    };
    new import_obsidian4.Setting(content).setName("\u5C3A\u5BF8\u8C03\u6574\u65B9\u5F0F").setDesc("\u6700\u957F\u8FB9\u9002\u5408\u65E5\u5E38\u4F7F\u7528\uFF1BFit \u5B8C\u6574\u4FDD\u7559\u753B\u9762\uFF0CFill \u4F1A\u88C1\u526A\u8FB9\u7F18\u4EE5\u586B\u6EE1\u76EE\u6807\u5C3A\u5BF8\u3002").addDropdown((dropdown) => dropdown.addOptions({ none: "\u4E0D\u8C03\u6574\u5C3A\u5BF8", width: "\u9650\u5236\u5BBD\u5EA6", height: "\u9650\u5236\u9AD8\u5EA6", "long-edge": "\u9650\u5236\u6700\u957F\u8FB9\uFF08\u63A8\u8350\uFF09", "short-edge": "\u9650\u5236\u6700\u77ED\u8FB9", fit: "\u9002\u5E94\u76EE\u6807\u8303\u56F4", fill: "\u586B\u5145\u5E76\u88C1\u526A", fixed: "\u56FA\u5B9A\u5C3A\u5BF8\u5E76\u88C1\u526A" }).setValue(this.plugin.settings.image.resizeMode).onChange(async (value) => {
      await this.persist((s2) => s2.image.resizeMode = value);
      updateResizeRows();
    }));
    resizeRows.set("long", this.number(content, "\u6700\u957F\u8FB9", "\u6A2A\u56FE\u9650\u5236\u5BBD\u5EA6\u3001\u7AD6\u56FE\u9650\u5236\u9AD8\u5EA6\uFF1B2560px \u9002\u5408\u9AD8\u5206\u5C4F\u67E5\u770B\u3002", this.plugin.settings.image.longEdge, "px", 1, 2e4, (value) => this.persist((s2) => s2.image.longEdge = value, refreshSetup)));
    resizeRows.set("short", this.number(content, "\u6700\u77ED\u8FB9", "\u4FDD\u8BC1\u8F83\u77ED\u7684\u4E00\u8FB9\u8FBE\u5230\u8BE5\u5C3A\u5BF8\uFF0C\u53EF\u80FD\u4EA7\u751F\u8F83\u5927\u7684\u56FE\u7247\u3002", this.plugin.settings.image.shortEdge, "px", 1, 2e4, (value) => this.persist((s2) => s2.image.shortEdge = value, refreshSetup)));
    resizeRows.set("width", this.number(content, "\u76EE\u6807\u5BBD\u5EA6", "\u7528\u4E8E\u9650\u5236\u5BBD\u5EA6\u3001Fit\u3001Fill \u548C\u56FA\u5B9A\u5C3A\u5BF8\u6A21\u5F0F\u3002", this.plugin.settings.image.resizeWidth, "px", 1, 2e4, (value) => this.persist((s2) => s2.image.resizeWidth = value)));
    resizeRows.set("height", this.number(content, "\u76EE\u6807\u9AD8\u5EA6", "\u7528\u4E8E\u9650\u5236\u9AD8\u5EA6\u3001Fit\u3001Fill \u548C\u56FA\u5B9A\u5C3A\u5BF8\u6A21\u5F0F\u3002", this.plugin.settings.image.resizeHeight, "px", 1, 2e4, (value) => this.persist((s2) => s2.image.resizeHeight = value)));
    new import_obsidian4.Setting(content).setName("\u7981\u6B62\u653E\u5927\u5C0F\u56FE").setDesc("\u56FE\u7247\u5C0F\u4E8E\u76EE\u6807\u5C3A\u5BF8\u65F6\u4FDD\u6301\u539F\u5C3A\u5BF8\uFF0C\u907F\u514D\u63D2\u503C\u653E\u5927\u5BFC\u81F4\u6A21\u7CCA\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.image.preventUpscale).onChange((value) => this.persist((s2) => s2.image.preventUpscale = value)));
    new import_obsidian4.Setting(content).setName("\u4FDD\u7559 GIF \u52A8\u753B").setDesc("\u5F00\u542F\u540E GIF \u4E0D\u4F1A\u8F6C\u7801\uFF0C\u907F\u514D\u52A8\u753B\u4E22\u5931\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.image.preserveGif).onChange((value) => this.persist((s2) => s2.image.preserveGif = value)));
    new import_obsidian4.Setting(content).setName("\u4FDD\u7559 SVG \u77E2\u91CF\u56FE").setDesc("\u5F00\u542F\u540E SVG \u4E0D\u4F1A\u6805\u683C\u5316\uFF0C\u7F29\u653E\u65F6\u4ECD\u4FDD\u6301\u6E05\u6670\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.image.preserveSvg).onChange((value) => this.persist((s2) => s2.image.preserveSvg = value)));
    updateQualityRows();
    updateResizeRows();
  }
  renderNaming() {
    const content = this.section("\u547D\u540D\u4E0E\u8FDC\u7A0B\u76EE\u5F55", "\u5B9A\u4E49\u6700\u7EC8\u6587\u4EF6\u540D\u548C\u5BF9\u8C61\u5B58\u50A8\u4E2D\u7684\u76EE\u5F55\u7ED3\u6784\u3002\u4FEE\u6539\u524D\u5148\u67E5\u770B\u5B9E\u65F6\u793A\u4F8B\u3002", "folder-tree", false, "\u4F7F\u7528\u6A21\u677F");
    const preview = content.createDiv({ cls: "iam-template-preview" });
    preview.createEl("strong", { text: "\u5B9E\u65F6\u793A\u4F8B" });
    const filenamePreview = preview.createEl("code");
    const pathPreview = preview.createEl("code");
    const updatePreview = () => {
      const date2 = /* @__PURE__ */ new Date();
      const values = { noteName: "\u9879\u76EE\u590D\u76D8", fileName: "\u622A\u56FE", folderName: "\u5DE5\u4F5C", vaultName: this.app.vault.getName(), notePath: "\u5DE5\u4F5C/\u9879\u76EE\u590D\u76D8", YYYY: String(date2.getFullYear()), MM: String(date2.getMonth() + 1).padStart(2, "0"), DD: String(date2.getDate()).padStart(2, "0"), HH: "09", mm: "30", ss: "00", timestamp: String(date2.getTime()), index: "001", uuid: "a1b2c3d4", hash: "9f31a2bc410e" };
      const render = (template) => template.replace(/\{(hash(?::\d+)?|[^}]+)\}/g, (_match, token) => {
        if (token.startsWith("hash:")) return values.hash?.slice(0, Number(token.split(":")[1])) ?? "";
        if (token.startsWith("frontmatter:")) return "\u5206\u7C7B";
        return values[token] ?? `{${token}}`;
      });
      const extension = this.plugin.settings.image.outputFormat === "original" ? "\u539F\u6269\u5C55\u540D" : this.plugin.settings.image.outputFormat;
      const filename = `${render(this.plugin.settings.naming.filenameTemplate)}.${extension}`;
      filenamePreview.setText(`\u6587\u4EF6\u540D  ${filename}`);
      pathPreview.setText(`\u8FDC\u7A0B\u8DEF\u5F84  ${this.plugin.settings.uploader.pathPrefix ? `${this.plugin.settings.uploader.pathPrefix}/` : ""}${render(this.plugin.settings.naming.remotePathTemplate)}/${filename}`);
    };
    this.text(content, "\u6587\u4EF6\u540D\u6A21\u677F", "\u63A7\u5236\u6700\u7EC8\u56FE\u7247\u6587\u4EF6\u540D\u3002\u65E0\u9700\u586B\u5199\u6269\u5C55\u540D\uFF0C\u63D2\u4EF6\u4F1A\u81EA\u52A8\u6DFB\u52A0\u3002", this.plugin.settings.naming.filenameTemplate, "{noteName}-{index}", (value) => this.persist((s2) => s2.naming.filenameTemplate = value, updatePreview));
    this.text(content, "\u8FDC\u7A0B\u76EE\u5F55\u6A21\u677F", "\u63A7\u5236 Bucket \u5185\u7684\u76EE\u5F55\u5C42\u7EA7\uFF1B\u8DEF\u5F84\u524D\u7F00\u4F1A\u81EA\u52A8\u653E\u5728\u5B83\u524D\u9762\u3002", this.plugin.settings.naming.remotePathTemplate, "obsidian/{YYYY}/{MM}/{noteName}", (value) => this.persist((s2) => s2.naming.remotePathTemplate = value, updatePreview));
    const help = content.createEl("details", { cls: "iam-inline-help" });
    const summary = help.createEl("summary");
    const helpIcon = summary.createSpan();
    (0, import_obsidian4.setIcon)(helpIcon, "braces");
    summary.createSpan({ text: "\u67E5\u770B\u53EF\u7528\u6A21\u677F\u53D8\u91CF" });
    const variables = help.createDiv({ cls: "iam-token-list" });
    for (const token of ["{noteName}", "{fileName}", "{folderName}", "{vaultName}", "{YYYY}", "{MM}", "{DD}", "{index}", "{hash:12}", "{uuid}", "{frontmatter:key}"]) variables.createEl("code", { text: token });
    const hashLength = this.number(content, "Hash \u957F\u5EA6", "\u4EC5\u5728\u6A21\u677F\u4F7F\u7528 {hash} \u6216 Hash \u51B2\u7A81\u7B56\u7565\u65F6\u751F\u6548\uFF1B12 \u4F4D\u901A\u5E38\u8DB3\u591F\u3002", this.plugin.settings.naming.hashLength, "\u4F4D", 6, 64, (value) => this.persist((s2) => s2.naming.hashLength = value, updatePreview));
    const updateConflict = () => hashLength.settingEl.toggle(this.plugin.settings.naming.conflictStrategy === "hash");
    new import_obsidian4.Setting(content).setName("\u6587\u4EF6\u540D\u51B2\u7A81\u65F6").setDesc("\u63A8\u8350 Hash\uFF1A\u76F8\u540C\u5185\u5BB9\u590D\u7528\u8FDC\u7A0B\u5730\u5740\uFF0C\u4E0D\u540C\u5185\u5BB9\u8FFD\u52A0\u6458\u8981\uFF1B\u8986\u76D6\u53EF\u80FD\u66FF\u6362\u5DF2\u6709\u5BF9\u8C61\u3002").addDropdown((dropdown) => dropdown.addOptions({ hash: "\u6309\u5185\u5BB9 Hash \u5224\u65AD\uFF08\u63A8\u8350\uFF09", increment: "\u81EA\u52A8\u8FFD\u52A0\u7F16\u53F7", skip: "\u8DF3\u8FC7\u51B2\u7A81\u6587\u4EF6", overwrite: "\u8986\u76D6\u8FDC\u7A0B\u6587\u4EF6" }).setValue(this.plugin.settings.naming.conflictStrategy).onChange(async (value) => {
      await this.persist((s2) => s2.naming.conflictStrategy = value);
      updateConflict();
    }));
    new import_obsidian4.Setting(content).setName("\u5141\u8BB8\u4E2D\u6587\u6587\u4EF6\u540D").setDesc("\u5173\u95ED\u540E\u4F1A\u79FB\u9664\u975E ASCII \u5B57\u7B26\uFF0C\u9002\u5408\u4E0D\u652F\u6301 Unicode \u8DEF\u5F84\u7684\u65E7\u7CFB\u7EDF\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.naming.unicodeFilenames).onChange((value) => this.persist((s2) => s2.naming.unicodeFilenames = value, updatePreview)));
    updateConflict();
    updatePreview();
  }
  renderMarkdownAndCleanup() {
    const content = this.section("\u94FE\u63A5\u4E0E\u672C\u5730\u5907\u4EFD", "\u63A7\u5236\u8FDC\u7A0B\u94FE\u63A5\u7684\u5199\u6CD5\uFF0C\u4EE5\u53CA\u8FC1\u79FB\u6210\u529F\u540E\u5982\u4F55\u5904\u7406\u539F\u59CB\u56FE\u7247\u3002", "file-symlink", false, this.cleanupLabel());
    let updateAlignmentPreview = () => void 0;
    new import_obsidian4.Setting(content).setName("\u9ED8\u8BA4\u56FE\u7247\u5BF9\u9F50").setDesc("\u4F5C\u7528\u4E8E Vault \u4E2D\u6240\u6709\u672A\u5355\u72EC\u6307\u5B9A\u5BF9\u9F50\u65B9\u5F0F\u7684\u56FE\u7247\u3002\u9ED8\u8BA4\u5C45\u4E2D\uFF1B\u4E5F\u53EF\u628A\u5149\u6807\u653E\u5728\u56FE\u7247\u94FE\u63A5\u4E0A\uFF0C\u901A\u8FC7\u547D\u4EE4\u9762\u677F\u5355\u72EC\u8BBE\u4E3A\u5C45\u5DE6\u3001\u5C45\u4E2D\u6216\u5C45\u53F3\u3002").addDropdown((dropdown) => dropdown.addOptions({ center: "\u5C45\u4E2D\uFF08\u63A8\u8350\uFF09", left: "\u5C45\u5DE6", right: "\u5C45\u53F3", theme: "\u8DDF\u968F\u5F53\u524D\u4E3B\u9898" }).setValue(this.plugin.settings.markdown.imageAlignment).onChange(async (value) => {
      await this.persist((s2) => s2.markdown.imageAlignment = value);
      updateAlignmentPreview();
    }));
    const alignmentPreview = content.createDiv({ cls: "iam-alignment-preview" });
    alignmentPreview.createSpan({ cls: "iam-alignment-preview__label", text: "\u5BF9\u9F50\u9884\u89C8" });
    const alignmentCanvas = alignmentPreview.createDiv({ cls: "iam-alignment-preview__canvas" });
    const previewImage = alignmentCanvas.createDiv({ cls: "iam-alignment-preview__image" });
    (0, import_obsidian4.setIcon)(previewImage, "image");
    updateAlignmentPreview = () => {
      alignmentCanvas.removeClass("is-left", "is-center", "is-right", "is-theme");
      alignmentCanvas.addClass(`is-${this.plugin.settings.markdown.imageAlignment}`);
    };
    updateAlignmentPreview();
    new import_obsidian4.Setting(content).setName("\u4FDD\u7559\u56FE\u7247\u8BF4\u660E\u6587\u5B57").setDesc("\u4FDD\u7559 Markdown \u7684 alt \u6587\u672C\uFF0C\u4F8B\u5982 ![\u67B6\u6784\u56FE](...) \u4E2D\u7684\u201C\u67B6\u6784\u56FE\u201D\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.markdown.preserveAlt).onChange((value) => this.persist((s2) => s2.markdown.preserveAlt = value)));
    new import_obsidian4.Setting(content).setName("Wiki \u56FE\u7247\u7684\u663E\u793A\u5BBD\u5EA6").setDesc("\u9047\u5230 ![[image.png|600]] \u65F6\uFF0C\u8F6C\u6362\u4E3A HTML \u624D\u80FD\u5728\u8FDC\u7A0B\u94FE\u63A5\u4E2D\u7EE7\u7EED\u4FDD\u7559 600px \u5BBD\u5EA6\u3002").addDropdown((dropdown) => dropdown.addOptions({ html: "\u8F6C\u6362\u4E3A HTML \u56FE\u7247\u6807\u7B7E\u5E76\u4FDD\u7559\u5BBD\u5EA6", ignore: "\u8F93\u51FA\u666E\u901A Markdown\uFF0C\u5FFD\u7565\u5BBD\u5EA6" }).setValue(this.plugin.settings.markdown.wikiSizeStrategy).onChange((value) => this.persist((s2) => s2.markdown.wikiSizeStrategy = value)));
    let backupFolder;
    let warning;
    const updateCleanup = () => {
      backupFolder.settingEl.toggle(this.plugin.settings.cleanup.strategy === "backup");
      warning.toggle(this.plugin.settings.cleanup.strategy === "trash");
      this.updateSectionMeta(content, this.cleanupLabel());
    };
    new import_obsidian4.Setting(content).setName("Vault \u8FC1\u79FB\u6210\u529F\u540E").setDesc("\u63A8\u8350\u79FB\u52A8\u5230\u63D2\u4EF6\u5907\u4EFD\u76EE\u5F55\u3002\u53EA\u6709\u5168\u90E8\u5F15\u7528\u5199\u5165\u5E76\u9A8C\u8BC1\u6210\u529F\u540E\u624D\u4F1A\u6267\u884C\u3002").addDropdown((dropdown) => dropdown.addOptions({ backup: "\u79FB\u52A8\u5230\u5907\u4EFD\u76EE\u5F55\uFF08\u63A8\u8350\uFF09", keep: "\u4FDD\u7559\u539F\u56FE\u7247", trash: "\u79FB\u52A8\u5230\u7CFB\u7EDF\u56DE\u6536\u7AD9" }).setValue(this.plugin.settings.cleanup.strategy).onChange(async (value) => {
      await this.persist((s2) => s2.cleanup.strategy = value);
      updateCleanup();
    }));
    backupFolder = this.text(content, "\u5907\u4EFD\u76EE\u5F55", "\u539F\u76EE\u5F55\u7ED3\u6784\u4F1A\u4FDD\u7559\u5728\u8FC1\u79FB ID \u4E0B\uFF0C\u4FBF\u4E8E\u5B8C\u6574\u64A4\u9500\u3002", this.plugin.settings.cleanup.backupFolder, ".vaultpix-backup", (value) => this.persist((s2) => s2.cleanup.backupFolder = value));
    warning = content.createDiv({ cls: "iam-danger-note" });
    const warningIcon = warning.createSpan();
    (0, import_obsidian4.setIcon)(warningIcon, "triangle-alert");
    warning.createSpan({ text: "\u7CFB\u7EDF\u56DE\u6536\u7AD9\u4E2D\u7684\u6587\u4EF6\u65E0\u6CD5\u7531\u63D2\u4EF6\u81EA\u52A8\u6062\u590D\u3002\u53EA\u6709\u786E\u8BA4\u8FDC\u7A0B\u5907\u4EFD\u53EF\u9760\u65F6\u624D\u4F7F\u7528\u6B64\u9009\u9879\u3002" });
    updateCleanup();
  }
  renderBatchAndAdvanced() {
    const content = this.section("\u4EFB\u52A1\u4E0E\u8BCA\u65AD", "\u6279\u91CF\u8FC1\u79FB\u7684\u901F\u5EA6\u3001\u7F51\u7EDC\u5BB9\u9519\u548C\u95EE\u9898\u6392\u67E5\u9009\u9879\u3002\u9ED8\u8BA4\u503C\u9002\u5408\u5927\u591A\u6570\u7528\u6237\u3002", "gauge", false, `\u5E76\u53D1 ${this.plugin.settings.batch.concurrency}`);
    this.number(content, "\u5E76\u53D1\u4E0A\u4F20\u6570", "\u7F51\u7EDC\u4E0D\u7A33\u5B9A\u6216\u670D\u52A1\u9650\u6D41\u65F6\u964D\u4F4E\u5230 1\u20132\uFF1B\u4E0D\u5EFA\u8BAE\u8D85\u8FC7 5\u3002", this.plugin.settings.batch.concurrency, "\u4E2A", 1, 10, (value) => this.persist((s2) => s2.batch.concurrency = value, () => this.updateSectionMeta(content, `\u5E76\u53D1 ${value}`)));
    this.number(content, "\u5931\u8D25\u91CD\u8BD5\u6B21\u6570", "\u7F51\u7EDC\u9519\u8BEF\u65F6\u6309 1 \u79D2\u30013 \u79D2\u300110 \u79D2\u7684\u9000\u907F\u95F4\u9694\u91CD\u8BD5\u3002\u8BA4\u8BC1\u5931\u8D25\u901A\u5E38\u4E0D\u4F1A\u56E0\u91CD\u8BD5\u89E3\u51B3\u3002", this.plugin.settings.batch.retries, "\u6B21", 0, 10, (value) => this.persist((s2) => s2.batch.retries = value));
    this.number(content, "\u5355\u6B21\u7F51\u7EDC\u8D85\u65F6", "HEAD \u9A8C\u8BC1\u8D85\u65F6\u540E\u4F1A\u5C1D\u8BD5 Range GET\uFF1B\u7F51\u7EDC\u8F83\u6162\u65F6\u53EF\u9002\u5F53\u589E\u52A0\u3002", Math.round(this.plugin.settings.batch.timeoutMs / 1e3), "\u79D2", 1, 120, (value) => this.persist((s2) => s2.batch.timeoutMs = value * 1e3));
    new import_obsidian4.Setting(content).setName("\u9A8C\u8BC1\u516C\u5F00\u56FE\u7247\u5730\u5740").setDesc("\u5F3A\u70C8\u5EFA\u8BAE\u5F00\u542F\u3002\u53EA\u6709 URL \u8FD4\u56DE 200/206 \u540E\u624D\u66FF\u6362\u7B14\u8BB0\u94FE\u63A5\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.batch.verifyUpload).onChange((value) => this.persist((s2) => s2.batch.verifyUpload = value)));
    new import_obsidian4.Setting(content).setName("\u7EF4\u62A4\u8D44\u4EA7\u6E05\u5355").setDesc("\u7528\u4E8E\u589E\u91CF\u626B\u63CF\u3001Hash \u53BB\u91CD\u3001\u56FE\u7247\u7BA1\u7406\u5668\u548C\u8FC1\u79FB\u6062\u590D\uFF1B\u5173\u95ED\u4F1A\u5931\u53BB\u8DE8\u4EFB\u52A1\u53BB\u91CD\u80FD\u529B\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.advanced.manifestEnabled).onChange((value) => this.persist((s2) => s2.advanced.manifestEnabled = value)));
    new import_obsidian4.Setting(content).setName("\u65E5\u5FD7\u8BE6\u7EC6\u7A0B\u5EA6").setDesc("\u6B63\u5E38\u4F7F\u7528\u4FDD\u6301\u201C\u4FE1\u606F\u201D\uFF1B\u6392\u67E5\u95EE\u9898\u65F6\u4E34\u65F6\u9009\u62E9\u201C\u8C03\u8BD5\u201D\u3002\u65E5\u5FD7\u4E0D\u4F1A\u8BB0\u5F55\u5BC6\u94A5\u3002").addDropdown((dropdown) => dropdown.addOptions({ error: "\u4EC5\u9519\u8BEF", warn: "\u9519\u8BEF\u4E0E\u8B66\u544A", info: "\u4FE1\u606F\uFF08\u63A8\u8350\uFF09", debug: "\u8C03\u8BD5\u8BE6\u60C5" }).setValue(this.plugin.settings.advanced.logLevel).onChange((value) => this.persist((s2) => s2.advanced.logLevel = value)));
  }
  section(title, description, icon, open, meta) {
    const details = this.containerEl.createEl("details", { cls: "iam-settings-section" });
    details.open = open;
    const summary = details.createEl("summary", { cls: "iam-settings-section__summary" });
    const iconEl = summary.createSpan({ cls: "iam-settings-section__icon" });
    (0, import_obsidian4.setIcon)(iconEl, icon);
    const copy = summary.createSpan({ cls: "iam-settings-section__copy" });
    copy.createSpan({ cls: "iam-settings-section__title", text: title });
    copy.createSpan({ cls: "iam-settings-section__description", text: description });
    summary.createSpan({ cls: "iam-settings-section__meta", text: meta });
    const chevron = summary.createSpan({ cls: "iam-settings-section__chevron" });
    (0, import_obsidian4.setIcon)(chevron, "chevron-right");
    return details.createDiv({ cls: "iam-settings-section__content" });
  }
  setupStep(list, title, description) {
    const item = list.createEl("li");
    const state = item.createSpan({ cls: "iam-setup-step__state" });
    (0, import_obsidian4.setIcon)(state, "check");
    const copy = item.createSpan();
    copy.createEl("strong", { text: title });
    copy.createEl("span", { text: description });
    return item;
  }
  updateSectionMeta(content, text) {
    const meta = content.closest(".iam-settings-section")?.querySelector(".iam-settings-section__meta");
    meta?.setText(text);
  }
  text(container, name, description, value, placeholder, change) {
    return new import_obsidian4.Setting(container).setName(name).setDesc(description).addText((text) => {
      text.setValue(value).setPlaceholder(placeholder).onChange(change);
      text.inputEl.spellcheck = false;
    });
  }
  secret(container, name, description, value, change) {
    return new import_obsidian4.Setting(container).setName(name).setDesc(description).addText((text) => {
      text.inputEl.type = "password";
      text.inputEl.autocomplete = "new-password";
      text.inputEl.spellcheck = false;
      text.setValue(value).setPlaceholder("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022").onChange(change);
    });
  }
  readonlyText(container, name, description, value) {
    return new import_obsidian4.Setting(container).setName(name).setDesc(description).addText((text) => {
      text.setValue(value).setDisabled(true);
      text.inputEl.spellcheck = false;
    });
  }
  number(container, name, description, value, suffix, min, max, change) {
    const setting = new import_obsidian4.Setting(container).setName(name).setDesc(description);
    setting.controlEl.addClass("iam-number-control");
    setting.addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = String(min);
      text.inputEl.max = String(max);
      text.setValue(String(value)).onChange((raw) => {
        const number = Number(raw);
        if (Number.isFinite(number)) void change(Math.max(min, Math.min(max, Math.round(number))));
      });
    });
    setting.controlEl.createSpan({ cls: "iam-control-suffix", text: suffix });
    return setting;
  }
  slider(container, name, description, value, change) {
    const setting = new import_obsidian4.Setting(container).setName(name).setDesc(description);
    const output = setting.controlEl.createSpan({ cls: "iam-slider-value", text: String(value) });
    setting.addSlider((slider) => slider.setLimits(1, 100, 1).setValue(value).setDynamicTooltip().onChange((next) => {
      output.setText(String(next));
      void change(next);
    }));
    return setting;
  }
  connectionButton(button, refresh) {
    button.setButtonText("\u6D4B\u8BD5\u8FDE\u63A5").setCta().setIcon("plug-zap").onClick(async () => {
      button.setDisabled(true).setButtonText("\u6B63\u5728\u6D4B\u8BD5\u2026");
      const result = await this.plugin.testConnection();
      this.plugin.settings.uploader.lastConnectionTest = { success: result.success, testedAt: Date.now(), message: result.message, signature: this.connectionSignature() };
      await this.plugin.saveSettings();
      button.setDisabled(false).setButtonText(result.success ? "\u8FDE\u63A5\u6B63\u5E38" : "\u91CD\u65B0\u6D4B\u8BD5");
      refresh();
    });
  }
  async persist(change, after) {
    change(this.plugin.settings);
    await this.plugin.saveSettings();
    after?.();
  }
  async persistUploader(change, after) {
    change(this.plugin.settings.uploader);
    this.plugin.settings.uploader.lastConnectionTest = void 0;
    await this.plugin.saveSettings();
    after?.();
  }
  missingUploaderFields() {
    const uploader = this.plugin.settings.uploader;
    const missing = [];
    if ((uploader.provider === "r2" || uploader.provider === "oss") && !uploader.endpoint.trim()) missing.push("Endpoint");
    if (!uploader.bucket.trim()) missing.push("Bucket");
    if (!uploader.accessKeyId.trim()) missing.push("Access Key ID");
    if (!uploader.secretAccessKey.trim()) missing.push("Secret Access Key");
    if (!uploader.publicBaseUrl.trim()) missing.push("\u516C\u5171\u8BBF\u95EE\u57DF\u540D");
    return missing;
  }
  currentConnectionTest() {
    const result = this.plugin.settings.uploader.lastConnectionTest;
    return result?.signature === this.connectionSignature() ? result : void 0;
  }
  connectionSignature() {
    const uploader = this.plugin.settings.uploader;
    return [uploader.provider, uploader.endpoint, uploader.region, uploader.bucket, uploader.accessKeyId, uploader.publicBaseUrl, String(uploader.forcePathStyle)].join("|");
  }
  providerLabel() {
    return PROVIDER_LABELS[this.plugin.settings.uploader.provider];
  }
  cleanupLabel() {
    return this.plugin.settings.cleanup.strategy === "backup" ? "\u5907\u4EFD\u540E\u6E05\u7406" : this.plugin.settings.cleanup.strategy === "keep" ? "\u4FDD\u7559\u539F\u56FE" : "\u79FB\u81F3\u56DE\u6536\u7AD9";
  }
  resizeModeLabel(mode) {
    const labels = { none: "\u4E0D\u8C03\u6574\u5C3A\u5BF8", width: "\u9650\u5236\u5BBD\u5EA6", height: "\u9650\u5236\u9AD8\u5EA6", "long-edge": "\u9650\u5236\u6700\u957F\u8FB9", "short-edge": "\u9650\u5236\u6700\u77ED\u8FB9", fit: "\u9002\u5E94\u8303\u56F4", fill: "\u586B\u5145\u88C1\u526A", fixed: "\u56FA\u5B9A\u5C3A\u5BF8" };
    return labels[mode];
  }
};

// src/ui/ReportModals.ts
var import_obsidian5 = require("obsidian");
function bytes(value) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KB`;
  if (value < 1024 ** 3) return `${(value / 1024 ** 2).toFixed(1)} MB`;
  return `${(value / 1024 ** 3).toFixed(2)} GB`;
}
var ScanReportModal = class extends import_obsidian5.Modal {
  constructor(app, report) {
    super(app);
    this.report = report;
  }
  onOpen() {
    this.titleEl.setText("\u56FE\u7247\u8D44\u4EA7\u626B\u63CF\u62A5\u544A");
    const grid = this.contentEl.createDiv({ cls: "iam-stats" });
    const stats = [
      ["Markdown \u6587\u4EF6", String(this.report.markdownFiles)],
      ["\u56FE\u7247\u6587\u4EF6", String(this.report.imageFiles)],
      ["\u672C\u5730\u5F15\u7528", String(this.report.localReferences)],
      ["\u8FDC\u7A0B\u5F15\u7528", String(this.report.remoteReferences)],
      ["\u7F3A\u5931\u5F15\u7528", String(this.report.missingReferences)],
      ["\u672A\u5F15\u7528\u56FE\u7247", String(this.report.unreferenced.length)],
      ["\u91CD\u590D\u7EC4", String(this.report.duplicates.length)],
      ["\u672C\u5730\u56FE\u7247\u603B\u5927\u5C0F", bytes(this.report.localBytes)]
    ];
    for (const [label, value] of stats) {
      const card = grid.createDiv({ cls: "iam-stat" });
      card.createSpan({ text: value, cls: "iam-stat-value" });
      card.createSpan({ text: label, cls: "iam-stat-label" });
    }
    new import_obsidian5.Setting(this.contentEl).addButton((button) => button.setButtonText("\u5173\u95ED").setCta().onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var DryRunModal = class extends import_obsidian5.Modal {
  constructor(app, items) {
    super(app);
    this.items = items;
  }
  resolve;
  wait() {
    this.open();
    return new Promise((resolve) => this.resolve = resolve);
  }
  onOpen() {
    this.titleEl.setText("\u8FC1\u79FB\u8BD5\u8FD0\u884C\u7ED3\u679C");
    const success = this.items.filter((item) => !item.error);
    const before = success.reduce((sum, item) => sum + item.originalSize, 0);
    const after = success.reduce((sum, item) => sum + item.processedSize, 0);
    this.contentEl.createEl("p", { text: `\u8BA1\u5212\u5904\u7406 ${success.length} \u5F20\u56FE\u7247\uFF1B\u9884\u8BA1 ${bytes(before)} \u2192 ${bytes(after)}\u3002\u8BD5\u8FD0\u884C\u672A\u4E0A\u4F20\u3001\u672A\u4FEE\u6539\u7B14\u8BB0\u3001\u672A\u79FB\u52A8\u6587\u4EF6\u3002` });
    const list = this.contentEl.createDiv({ cls: "iam-preview-list" });
    for (const item of this.items.slice(0, 100)) {
      const row = list.createDiv({ cls: "iam-preview-row" });
      row.createDiv({ text: item.sourcePath, cls: "iam-preview-path" });
      row.createDiv({ text: item.error ? `\u8DF3\u8FC7\uFF1A${item.error}` : `${bytes(item.originalSize)} \u2192 ${bytes(item.processedSize)} \xB7 ${item.referenceCount} \u4E2A\u5F15\u7528 \xB7 ${item.remotePath ?? ""}`, cls: item.error ? "iam-error" : "iam-muted" });
    }
    if (this.items.length > 100) this.contentEl.createEl("p", { text: `\u4EC5\u663E\u793A\u524D 100 \u9879\uFF0C\u5176\u4F59 ${this.items.length - 100} \u9879\u5C06\u5728\u4EFB\u52A1\u4E2D\u5904\u7406\u3002`, cls: "iam-muted" });
    new import_obsidian5.Setting(this.contentEl).addButton((button) => button.setButtonText("\u53D6\u6D88").onClick(() => this.finish(false))).addButton((button) => button.setButtonText("\u5F00\u59CB\u8FC1\u79FB").setCta().onClick(() => this.finish(true)));
  }
  onClose() {
    this.resolve?.(false);
    this.resolve = void 0;
    this.contentEl.empty();
  }
  finish(value) {
    const resolve = this.resolve;
    this.resolve = void 0;
    this.close();
    resolve?.(value);
  }
};
var ProgressModal = class extends import_obsidian5.Modal {
  constructor(app, onPause, onResume, onCancel) {
    super(app);
    this.onPause = onPause;
    this.onResume = onResume;
    this.onCancel = onCancel;
  }
  textEl;
  pauseButton;
  paused = false;
  onOpen() {
    this.titleEl.setText("\u56FE\u7247\u8FC1\u79FB\u8FDB\u884C\u4E2D");
    this.textEl = this.contentEl.createEl("p", { text: "\u6B63\u5728\u51C6\u5907\u2026" });
    new import_obsidian5.Setting(this.contentEl).addButton((button) => {
      this.pauseButton = button.buttonEl;
      button.setButtonText("\u6682\u505C").onClick(() => {
        this.paused = !this.paused;
        if (this.paused) {
          this.onPause();
          button.setButtonText("\u7EE7\u7EED");
        } else {
          this.onResume();
          button.setButtonText("\u6682\u505C");
        }
      });
    }).addButton((button) => button.setButtonText("\u53D6\u6D88").setWarning().onClick(() => {
      this.onCancel();
      new import_obsidian5.Notice("\u5DF2\u8BF7\u6C42\u53D6\u6D88\uFF0C\u6B63\u5728\u6267\u884C\u7684\u56FE\u7247\u4F1A\u5B89\u5168\u7ED3\u675F\u3002");
    }));
  }
  update(progress) {
    this.textEl?.setText(`\u5DF2\u5B8C\u6210 ${progress.completed}/${progress.total} \xB7 \u6210\u529F ${progress.success} \xB7 \u5931\u8D25 ${progress.failed}${progress.current ? `
${progress.current}` : ""}`);
  }
  finish(record) {
    this.textEl?.setText(`\u4EFB\u52A1${record.status === "completed" ? "\u5B8C\u6210" : "\u7ED3\u675F"}\uFF1A\u6210\u529F ${record.items.filter((item) => item.status === "completed").length}\uFF0C\u5931\u8D25 ${record.items.filter((item) => item.status === "failed").length}\u3002`);
    this.pauseButton?.setAttribute("disabled", "true");
  }
};
var RecoveryModal = class extends import_obsidian5.Modal {
  constructor(app, record) {
    super(app);
    this.record = record;
  }
  resolve;
  wait() {
    this.open();
    return new Promise((resolve) => this.resolve = resolve);
  }
  onOpen() {
    this.titleEl.setText("\u68C0\u6D4B\u5230\u672A\u5B8C\u6210\u7684\u56FE\u7247\u8FC1\u79FB");
    this.contentEl.createEl("p", { text: `\u4EFB\u52A1 ${this.record.migrationId} \u672A\u6B63\u5E38\u7ED3\u675F\u3002\u53EF\u4EE5\u6062\u590D\u7B14\u8BB0\u540E\u91CD\u65B0\u7EE7\u7EED\uFF0C\u6216\u4EC5\u67E5\u770B\u5E76\u6682\u4E0D\u5904\u7406\u3002` });
    new import_obsidian5.Setting(this.contentEl).addButton((button) => button.setButtonText("\u6682\u4E0D\u5904\u7406").onClick(() => this.finish("ignore"))).addButton((button) => button.setButtonText("\u56DE\u6EDA").setWarning().onClick(() => this.finish("rollback"))).addButton((button) => button.setButtonText("\u6062\u590D\u5E76\u7EE7\u7EED").setCta().onClick(() => this.finish("resume")));
  }
  onClose() {
    this.resolve?.("ignore");
    this.resolve = void 0;
    this.contentEl.empty();
  }
  finish(action) {
    const resolve = this.resolve;
    this.resolve = void 0;
    this.close();
    resolve?.(action);
  }
};

// src/ui/ImageManagerView.ts
var import_obsidian6 = require("obsidian");
var IMAGE_MANAGER_VIEW = "vaultpix-image-manager";
var ImageManagerView = class extends import_obsidian6.ItemView {
  constructor(leaf, manifest, scanner) {
    super(leaf);
    this.manifest = manifest;
    this.scanner = scanner;
  }
  getViewType() {
    return IMAGE_MANAGER_VIEW;
  }
  getDisplayText() {
    return "VaultPix \u56FE\u7247\u5E93";
  }
  getIcon() {
    return "images";
  }
  async onOpen() {
    const root2 = this.contentEl;
    root2.empty();
    root2.addClass("iam-manager");
    const header = root2.createDiv({ cls: "iam-manager-header" });
    header.createEl("h2", { text: "VaultPix \u56FE\u7247\u5E93" });
    header.createEl("p", { text: "\u6B63\u5728\u8BFB\u53D6\u8D44\u4EA7\u6E05\u5355\u548C Vault \u7D22\u5F15\u2026", cls: "iam-muted" });
    const [items, report] = await Promise.all([this.manifest.all(), this.scanner.scan(false)]);
    header.lastElementChild?.remove();
    header.createEl("p", { text: `\u5DF2\u7BA1\u7406 ${items.length} \u9879 \xB7 \u672C\u5730 ${report.imageFiles} \u5F20 \xB7 \u8FDC\u7A0B\u5F15\u7528 ${report.remoteReferences} \u4E2A \xB7 \u672A\u5F15\u7528 ${report.unreferenced.length} \u5F20`, cls: "iam-muted" });
    const toolbar = root2.createDiv({ cls: "iam-toolbar" });
    const search = toolbar.createEl("input", { type: "search", placeholder: "\u641C\u7D22\u6587\u4EF6\u540D\u3001\u7B14\u8BB0\u6216 URL" });
    search.setAttr("aria-label", "\u641C\u7D22 VaultPix \u56FE\u7247\u8D44\u4EA7");
    const table = root2.createEl("table", { cls: "iam-table" });
    const head = table.createTHead().insertRow();
    for (const label of ["\u6765\u6E90", "\u683C\u5F0F", "\u5927\u5C0F", "\u4E0A\u4F20\u670D\u52A1", "\u8FDC\u7A0B\u5730\u5740", "\u5F15\u7528"]) head.createEl("th", { text: label });
    const body = table.createTBody();
    const render = (query = "") => {
      body.empty();
      const normalized = query.toLowerCase();
      for (const item of items.filter((candidate) => JSON.stringify(candidate).toLowerCase().includes(normalized))) {
        const row = body.insertRow();
        row.createEl("td", { text: item.sourcePath });
        row.createEl("td", { text: item.processedFormat.toUpperCase() });
        row.createEl("td", { text: `${Math.round(item.originalSize / 1024)} \u2192 ${Math.round(item.processedSize / 1024)} KB` });
        row.createEl("td", { text: item.provider.toUpperCase() });
        const urlCell = row.createEl("td");
        urlCell.createEl("a", { text: item.url, href: item.url });
        row.createEl("td", { text: String(item.references.length) });
      }
    };
    search.addEventListener("input", () => render(search.value));
    render();
    if (!items.length) root2.createDiv({ cls: "iam-empty", text: "\u8D44\u4EA7\u6E05\u5355\u8FD8\u662F\u7A7A\u7684\u3002\u5B8C\u6210\u4E00\u6B21\u4E0A\u4F20\u6216\u8FC1\u79FB\u540E\uFF0C\u56FE\u7247\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002" });
  }
};

// src/main.ts
var VaultPixPlugin = class extends import_obsidian7.Plugin {
  settings = DEFAULT_SETTINGS;
  logger;
  parser;
  manifestStore;
  migrations;
  scanner;
  pipeline;
  migrationManager;
  async onload() {
    this.settings = mergeSettings(await this.loadData());
    this.logger = new Logger(this.settings.advanced.logLevel);
    this.parser = new MarkdownImageParser();
    this.manifestStore = new ManifestStore(this.app, this.manifest.id);
    this.migrations = new MigrationStore(this.app, this.manifest.id);
    this.scanner = new VaultScanner(this.app, this.parser);
    this.pipeline = new ImagePipeline(this.app, () => this.settings, this.manifestStore);
    this.migrationManager = new MigrationManager(this.app, () => this.settings, this.pipeline, this.migrations, this.manifestStore);
    await this.manifestStore.load();
    this.registerView(IMAGE_MANAGER_VIEW, (leaf) => new ImageManagerView(leaf, this.manifestStore, this.scanner));
    this.addSettingTab(new ImageAssetSettingsTab(this.app, this));
    this.addRibbonIcon("images", "\u6253\u5F00\u56FE\u7247\u7BA1\u7406\u5668", () => void this.openManager());
    this.registerCommands();
    this.registerInputEvents();
    this.registerContextMenus();
    this.registerMarkdownPostProcessor((element) => {
      const alignment = this.settings.markdown.imageAlignment;
      if (alignment === "theme") return;
      for (const image of element.querySelectorAll("img:not(.emoji)")) {
        if (!image.closest(".iam-image-align-left, .iam-image-align-center, .iam-image-align-right")) image.addClass(`iam-image-default-${alignment}`);
      }
    });
    this.applyImageAlignment();
    this.app.workspace.onLayoutReady(() => void this.checkRecovery());
    this.logger.info("VaultPix \u5DF2\u52A0\u8F7D");
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(IMAGE_MANAGER_VIEW);
    this.clearImageAlignmentClasses();
  }
  async saveSettings() {
    this.logger.setLevel(this.settings.advanced.logLevel);
    await this.saveData(this.settings);
    this.applyImageAlignment();
  }
  applyImageAlignment() {
    this.clearImageAlignmentClasses();
    if (this.settings.markdown.imageAlignment !== "theme") document.body.addClass(`iam-default-image-align-${this.settings.markdown.imageAlignment}`);
  }
  async testConnection() {
    const notice = new import_obsidian7.Notice("\u6B63\u5728\u6D4B\u8BD5\u56FE\u5E8A\u8FDE\u63A5\u2026", 0);
    const result = await new S3Uploader(this.settings.uploader).testConnection();
    notice.hide();
    new import_obsidian7.Notice(result.message, result.success ? 5e3 : 1e4);
    return result;
  }
  registerCommands() {
    this.addCommand({ id: "optimize-current-image", name: "\u4F18\u5316\u5F53\u524D\u56FE\u7247", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, false) });
    this.addCommand({ id: "upload-current-image", name: "\u4E0A\u4F20\u5F53\u524D\u56FE\u7247", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, true) });
    this.addCommand({ id: "optimize-upload-current-image", name: "\u4F18\u5316\u5E76\u4E0A\u4F20\u5F53\u524D\u56FE\u7247", editorCheckCallback: (checking, editor, view) => this.currentImageCommand(checking, editor, view, true) });
    this.addCommand({ id: "align-current-image-left", name: "\u5F53\u524D\u56FE\u7247\uFF1A\u5C45\u5DE6", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "left") });
    this.addCommand({ id: "align-current-image-center", name: "\u5F53\u524D\u56FE\u7247\uFF1A\u5C45\u4E2D", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "center") });
    this.addCommand({ id: "align-current-image-right", name: "\u5F53\u524D\u56FE\u7247\uFF1A\u5C45\u53F3", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view, "right") });
    this.addCommand({ id: "align-current-image-default", name: "\u5F53\u524D\u56FE\u7247\uFF1A\u6062\u590D\u9ED8\u8BA4\u5BF9\u9F50", editorCheckCallback: (checking, editor, view) => this.currentImageAlignmentCommand(checking, editor, view) });
    this.addCommand({ id: "process-current-note", name: "\u5904\u7406\u5F53\u524D\u7B14\u8BB0\u4E2D\u7684\u5168\u90E8\u56FE\u7247", checkCallback: (checking) => {
      const note = this.app.workspace.getActiveFile();
      if (!note) return false;
      if (!checking) void this.runMigration(note.path);
      return true;
    } });
    this.addCommand({ id: "scan-vault-images", name: "\u626B\u63CF\u6574\u4E2A\u5E93\u4E2D\u7684\u56FE\u7247", callback: () => void this.scanVault() });
    this.addCommand({ id: "migrate-vault-images", name: "\u8FC1\u79FB\u6574\u4E2A\u5E93\u4E2D\u7684\u56FE\u7247", callback: () => void this.runMigration() });
    this.addCommand({ id: "open-image-manager", name: "\u6253\u5F00\u56FE\u7247\u7BA1\u7406\u5668", callback: () => void this.openManager() });
    this.addCommand({ id: "test-uploader", name: "\u6D4B\u8BD5\u56FE\u5E8A\u8FDE\u63A5", callback: () => void this.testConnection() });
    this.addCommand({ id: "undo-last-migration", name: "\u64A4\u9500\u4E0A\u4E00\u6B21\u56FE\u7247\u8FC1\u79FB", callback: () => void this.undoMigration() });
  }
  registerInputEvents() {
    this.registerEvent(this.app.workspace.on("editor-paste", (event, editor, view) => {
      if (!(view instanceof import_obsidian7.MarkdownView)) return;
      const files = Array.from(event.clipboardData?.files ?? []).filter((file) => file.type.startsWith("image/") || isImageName(file.name));
      this.maybeHandleInput(event, files, editor, view, "\u7C98\u8D34");
    }));
    this.registerEvent(this.app.workspace.on("editor-drop", (event, editor, view) => {
      if (!(view instanceof import_obsidian7.MarkdownView)) return;
      const files = Array.from(event.dataTransfer?.files ?? []).filter((file) => file.type.startsWith("image/") || isImageName(file.name));
      this.maybeHandleInput(event, files, editor, view, "\u62D6\u62FD");
    }));
  }
  registerContextMenus() {
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      if (!(file instanceof import_obsidian7.TFile) || !isImageName(file.name)) return;
      menu.addItem((item) => item.setTitle("\u4F18\u5316\u5E76\u4E0A\u4F20\u56FE\u7247").setIcon("upload").onClick(() => void this.runFileMigration(file)));
      menu.addItem((item) => item.setTitle("\u590D\u5236 Markdown \u56FE\u7247\u94FE\u63A5").setIcon("copy").onClick(async () => {
        await navigator.clipboard.writeText(`![[${file.path}]]`);
        new import_obsidian7.Notice("\u5DF2\u590D\u5236\u56FE\u7247\u94FE\u63A5\u3002");
      }));
    }));
  }
  maybeHandleInput(event, files, editor, view, source) {
    if (!files.length || !this.settings.enabled || this.settings.workMode === "manual") return;
    if (source === "\u7C98\u8D34" && !this.settings.autoProcessPaste) return;
    if (source === "\u62D6\u62FD" && !this.settings.autoProcessDrop) return;
    const note = view.file;
    if (!note) return;
    if (this.app.metadataCache.getFileCache(note)?.frontmatter?.["image-upload"] === false) return;
    event.preventDefault();
    void this.processIncoming(files, editor, note, source);
  }
  async processIncoming(files, editor, note, source) {
    const links = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!file) continue;
      const fallbackName = file.name || `\u526A\u8D34\u677F-${Date.now()}-${index + 1}.png`;
      const input = { name: fallbackName, mimeType: file.type || mimeFromName(fallbackName), data: await file.arrayBuffer() };
      try {
        const upload = this.settings.workMode === "automatic";
        const result = await this.pipeline.execute({ input, note, index: index + 1, upload });
        if (upload && result.uploadResult) {
          links.push(this.pipeline.markdownFor(result.uploadResult.url, fallbackName.replace(/\.[^.]+$/, "")));
          await this.pipeline.commitManifest(result, `${source}:${fallbackName}`, [note.path]);
        } else links.push(await this.saveLocalResult(result, note));
      } catch (error) {
        this.logger.error(`${source}\u56FE\u7247\u5904\u7406\u5931\u8D25`, errorMessage(error));
        links.push(await this.saveOriginalFallback(input, note));
        new import_obsidian7.Notice(`\u56FE\u7247\u5904\u7406\u6216\u4E0A\u4F20\u5931\u8D25
\u6587\u4EF6\uFF1A${fallbackName}
\u539F\u56E0\uFF1A${errorMessage(error)}
\u5DF2\u4FDD\u7559\u4E3A\u672C\u5730\u9644\u4EF6\uFF0C\u7B14\u8BB0\u672A\u63D2\u5165\u5931\u6548\u8FDC\u7A0B\u5730\u5740\u3002`, 12e3);
      }
    }
    if (links.length) {
      const markdown = links.join("\n");
      try {
        editor.replaceSelection(markdown);
      } catch (error) {
        await navigator.clipboard.writeText(markdown);
        new import_obsidian7.Notice(`\u56FE\u7247\u5DF2\u7ECF\u5B89\u5168\u4FDD\u5B58\u6216\u4E0A\u4F20\uFF0C\u4F46\u7F16\u8F91\u5668\u63D2\u5165\u5931\u8D25\uFF1A${errorMessage(error)}
\u751F\u6210\u7684 Markdown \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\u3002`, 12e3);
      }
    }
  }
  currentImageCommand(checking, editor, view, upload) {
    const note = view.file;
    if (!note) return false;
    const content = editor.getValue();
    const cursorOffset = editor.posToOffset(editor.getCursor());
    const reference = this.parser.parse(content, note.path).find((candidate) => cursorOffset >= candidate.start && cursorOffset <= candidate.end);
    if (!reference || reference.remote) return false;
    const target = this.app.metadataCache.getFirstLinkpathDest(reference.imagePath, note.path);
    if (!(target instanceof import_obsidian7.TFile) || !isImageName(target.name)) return false;
    if (!checking) void this.processCurrentReference(note, target, reference, upload);
    return true;
  }
  currentImageAlignmentCommand(checking, editor, view, alignment) {
    const note = view.file;
    if (!note) return false;
    const content = editor.getValue();
    const cursorOffset = editor.posToOffset(editor.getCursor());
    const reference = this.parser.parse(content, note.path).find((candidate) => cursorOffset >= candidate.start && cursorOffset <= candidate.end);
    if (!reference) return false;
    if (!checking) {
      const replacement = imageAlignmentReplacement(content, reference, alignment);
      editor.replaceRange(replacement.replacement, editor.offsetToPos(replacement.start), editor.offsetToPos(replacement.end));
      const label = alignment === "left" ? "\u5C45\u5DE6" : alignment === "center" ? "\u5C45\u4E2D" : alignment === "right" ? "\u5C45\u53F3" : "\u8DDF\u968F\u9ED8\u8BA4\u8BBE\u7F6E";
      new import_obsidian7.Notice(`\u5F53\u524D\u56FE\u7247\u5DF2\u8BBE\u4E3A${label}\u3002`);
    }
    return true;
  }
  clearImageAlignmentClasses() {
    document.body.removeClass("iam-default-image-align-left", "iam-default-image-align-center", "iam-default-image-align-right");
  }
  async processCurrentReference(note, image, reference, upload) {
    const before = await this.app.vault.read(note);
    try {
      const input = { name: image.name, mimeType: mimeFromName(image.name), data: await this.app.vault.readBinary(image) };
      const result = await this.pipeline.execute({ input, note, sourceFile: image, upload });
      const replacement = upload && result.uploadResult ? this.pipeline.markdownFor(result.uploadResult.url, reference.alt, reference.displayWidth) : await this.saveLocalResult(result, note, reference.alt);
      const after = new MarkdownReplacer().apply(before, [{ start: reference.start, end: reference.end, expected: reference.rawLink, replacement }]);
      await this.app.vault.modify(note, after);
      if (await this.app.vault.read(note) !== after) throw new Error("\u5199\u5165\u540E\u6821\u9A8C\u5931\u8D25\u3002");
      await this.pipeline.commitManifest(result, image.path, [note.path]);
      new import_obsidian7.Notice(upload ? "\u5F53\u524D\u56FE\u7247\u5DF2\u4F18\u5316\u3001\u4E0A\u4F20\u5E76\u5B89\u5168\u66FF\u6362\u3002" : "\u5F53\u524D\u56FE\u7247\u5DF2\u4F18\u5316\u5E76\u4FDD\u5B58\u4E3A\u65B0\u9644\u4EF6\u3002");
    } catch (error) {
      if (await this.app.vault.read(note) !== before) await this.app.vault.modify(note, before);
      new import_obsidian7.Notice(`\u5904\u7406\u5931\u8D25\uFF1A${errorMessage(error)}
\u539F\u56FE\u7247\u4E0E\u7B14\u8BB0\u5DF2\u4FDD\u7559\u3002`, 1e4);
    }
  }
  async saveLocalResult(result, note, alt = "") {
    const path = await this.app.fileManager.getAvailablePathForAttachment(result.filename, note.path);
    const file = await this.app.vault.createBinary(path, result.processed.data);
    return `!${this.app.fileManager.generateMarkdownLink(file, note.path, void 0, alt || void 0)}`;
  }
  async saveOriginalFallback(input, note) {
    const path = await this.app.fileManager.getAvailablePathForAttachment(input.name, note.path);
    const file = await this.app.vault.createBinary(path, input.data);
    return `!${this.app.fileManager.generateMarkdownLink(file, note.path)}`;
  }
  async scanVault() {
    const notice = new import_obsidian7.Notice("\u6B63\u5728\u626B\u63CF\u56FE\u7247\u8D44\u4EA7\u2026", 0);
    try {
      const report = await this.scanner.scan(true);
      notice.hide();
      new ScanReportModal(this.app, report).open();
    } catch (error) {
      notice.hide();
      new import_obsidian7.Notice(`\u626B\u63CF\u5931\u8D25\uFF1A${errorMessage(error)}`, 1e4);
    }
  }
  async runMigration(notePath, existingReport) {
    const scanning = new import_obsidian7.Notice(notePath ? "\u6B63\u5728\u5206\u6790\u5F53\u524D\u7B14\u8BB0\u2026" : "\u6B63\u5728\u626B\u63CF\u6574\u4E2A\u5E93\u2026", 0);
    try {
      const report = existingReport ?? await this.scanner.scan(false);
      scanning.setMessage("\u6B63\u5728\u6267\u884C\u8BD5\u8FD0\u884C\uFF08\u4E0D\u4F1A\u4E0A\u4F20\u6216\u4FEE\u6539\u6587\u4EF6\uFF09\u2026");
      const preview = await this.migrationManager.dryRun(report, notePath);
      scanning.hide();
      if (!preview.length) {
        new import_obsidian7.Notice("\u6CA1\u6709\u9700\u8981\u8FC1\u79FB\u7684\u672C\u5730\u56FE\u7247\u3002");
        return;
      }
      if (!await new DryRunModal(this.app, preview).wait()) return;
      const progress = new ProgressModal(this.app, () => this.migrationManager.pause(), () => this.migrationManager.resume(), () => this.migrationManager.cancel());
      progress.open();
      const record = await this.migrationManager.migrate(report, notePath, (value) => progress.update(value));
      progress.finish(record);
      new import_obsidian7.Notice(`\u8FC1\u79FB\u7ED3\u675F\uFF1A${record.status === "completed" ? "\u5168\u90E8\u6210\u529F" : "\u5B58\u5728\u5931\u8D25\u9879"}\u3002`, 8e3);
    } catch (error) {
      scanning.hide();
      new import_obsidian7.Notice(`\u8FC1\u79FB\u672A\u5F00\u59CB\u6216\u5DF2\u5B89\u5168\u505C\u6B62\uFF1A${errorMessage(error)}`, 12e3);
    }
  }
  async runFileMigration(file) {
    const report = await this.scanner.scan(false);
    const asset = report.assets.get(file.path);
    if (!asset) {
      new import_obsidian7.Notice("\u6CA1\u6709\u627E\u5230\u5F15\u7528\u8BE5\u56FE\u7247\u7684\u7B14\u8BB0\uFF1B\u4E3A\u5B89\u5168\u8D77\u89C1\u672A\u4E0A\u4F20\u6216\u6E05\u7406\u6587\u4EF6\u3002");
      return;
    }
    const scoped = { ...report, assets: /* @__PURE__ */ new Map([[file.path, asset]]) };
    await this.runMigration(void 0, scoped);
  }
  async undoMigration() {
    const record = await this.migrationManager.rollbackLatest();
    if (!record) {
      new import_obsidian7.Notice("\u6CA1\u6709\u53EF\u64A4\u9500\u7684\u8FC1\u79FB\u8BB0\u5F55\u3002");
      return;
    }
    new import_obsidian7.Notice(record.status === "rolled-back" ? "\u5DF2\u6062\u590D\u7B14\u8BB0\u548C\u5907\u4EFD\u76EE\u5F55\u4E2D\u7684\u672C\u5730\u56FE\u7247\u3002\u8FDC\u7A0B\u5BF9\u8C61\u672A\u5220\u9664\u3002" : "\u8BE5\u8FC1\u79FB\u5DF2\u7ECF\u64A4\u9500\u3002", 8e3);
  }
  async openManager() {
    let leaf = this.app.workspace.getLeavesOfType(IMAGE_MANAGER_VIEW)[0] ?? null;
    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({ type: IMAGE_MANAGER_VIEW, active: true });
    }
    this.app.workspace.revealLeaf(leaf);
  }
  async checkRecovery() {
    const record = await this.migrations.loadLatest();
    if (!record || record.status !== "running" && record.status !== "paused") return;
    const action = await new RecoveryModal(this.app, record).wait();
    if (action === "rollback") await this.undoMigration();
    if (action === "resume") {
      await this.migrationManager.prepareResume(record);
      await this.runMigration();
    }
  }
};
