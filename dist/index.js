"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => AutoVersion
});
module.exports = __toCommonJS(src_exports);
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_pkg_dir = __toESM(require("pkg-dir"));
var AutoVersion = class _AutoVersion {
  /**
   * Return the path of the project
   * @return {string} the path of the project where the package.json is located
   */
  static getLocalPath() {
    return import_pkg_dir.default.sync(process.cwd());
  }
  /**
   * Return the package.json file of the project
   * @param {string}   [pathname]   the path of the package.json
   * @return {JSON}                 the package.json
   */
  static getPackageJSON(pathname) {
    var _a, _b;
    const packageJSON = require(import_path.default.resolve(
      (_b = (_a = import_pkg_dir.default.sync(pathname)) != null ? _a : _AutoVersion.getLocalPath()) != null ? _b : "",
      "package.json"
    ));
    console.log(packageJSON);
    return packageJSON;
  }
  /**
   * Return the current version of the project
   * @param {string}   [pathname]   the path of the package.json
   * @return {string}               the version number
   * @example
   * AutoVersion.getVersion()              // --> the version of the current project | ex : 0.5.2
   * AutoVersion.getVersion('../any/dir')  // --> the version of the project in this directory
   */
  static getVersion(pathname) {
    const packageJSON = _AutoVersion.getPackageJSON(pathname);
    if (!packageJSON)
      throw Error("Unable to find the package.json");
    return packageJSON.version;
  }
  /**
   * Write the version number into package.json
   * @param {string} version            the version number
   * @param {string} [pathname]         the path of the package.json
   * @param {number} [indentation=4]    the number of space to pretty print the package.json file
   * @example
   * AutoVersion.setVersion('0.2.3')
   * AutoVersion.setVersion('0.2.3', '../any/dir')
   * AutoVersion.setVersion('0.2.3', '../any/dir', 4)  // the package.json will be indented with 4 spaces
   */
  static setVersion(version, pathname, indentation) {
    var _a;
    const packageJSON = _AutoVersion.getPackageJSON(pathname);
    packageJSON.version = version;
    import_fs.default.writeFileSync(
      import_path.default.resolve((_a = _AutoVersion.getLocalPath()) != null ? _a : "", "package.json"),
      JSON.stringify(packageJSON, null, indentation || 4)
    );
  }
  /**
   * Extract the major, minor & patch number from a semver version number
   * @param versionString
   * @return {VersionObject}
   * @example
   * AutoVersion.parse('1.4.2')  // --> {major: 1, minor: 4, patch: 2}
   */
  static parse(versionString) {
    const versionRegex = /(\d+)\.?(\d+)?.?(\d+)?/i;
    let versionObject = { major: 0, minor: 0, patch: 0 };
    if (versionString.match(versionRegex)) {
      const [_, major, minor, patch] = versionString.match(versionRegex);
      versionObject = {
        major: parseInt(major.toString()),
        minor: parseInt(minor.toString()),
        patch: parseInt(patch.toString())
      };
    }
    Object.entries(versionObject).forEach(
      ([key, value]) => !value ? versionObject[key] = 0 : versionObject[key] = parseInt(value.toString())
    );
    return versionObject;
  }
  /**
   * Stringify a versionObject
   * @param versionObject
   * @return {string}         the version representation of the string
   * @example
   * AutoVersion.stringify({major: 1, minor: 4, patch: 2})  // --> '1.4.2'
   */
  static stringify(versionObject) {
    return Object.values(versionObject).reduce(
      (prev, curr) => `${prev}.${curr}`
      // TODO SOLVE THE ANY TYPE
    ).toString();
  }
  /**
   * Convert a version into semver standard
   * @param versionString
   * @return {string}         the semver version number
   * @example
   * AutoVersion.toSemver('1.3.5')      // --> '1.3.5'
   * AutoVersion.toSemver('1.3')        // --> '1.3.0'
   * AutoVersion.toSemver('v1.3.5')     // -->  '1.3.5'
   * AutoVersion.toSemver('version 3')  // -->  '3.0.0'
   */
  static toSemver(versionString) {
    return _AutoVersion.stringify(_AutoVersion.parse(versionString));
  }
  /**
   * Increment the version number
   * @param {string} version
   * @param {string} level    major | minor | patch
   * @return {string}         the incremented version number
   * @example
   * AutoVersion.increment('0.4.7', 'patch')  // --> '0.4.8'
   * AutoVersion.increment('0.4.7', 'minor')  // --> '0.5.0'
   * AutoVersion.increment('0.4.7', 'major')  // --> '1.0.0'
   */
  static increment(version, level) {
    const versionObject = _AutoVersion.parse(version);
    versionObject[level.toLowerCase()]++;
    if (level === "major" || level === "minor")
      versionObject.patch = 0;
    if (level === "major")
      versionObject.minor = 0;
    return _AutoVersion.stringify(versionObject);
  }
  /**
   * Update the version number for a major update
   * @param  {string} version
   * @return {string} the new version number
   * @example
   * AutoVersion.major('1.0.0')  // --> '2.0.0'
   * AutoVersion.major('0.5.9')  // --> '1.0.0'
   */
  static major(version) {
    return _AutoVersion.increment(version, "major");
  }
  /**
   * Update the version number for a minor update
   * @param {string}  version
   * @return {string} the new version number
   * @example
   * AutoVersion.minor('1.0.0')  // --> '1.1.0'
   * AutoVersion.minor('0.5.8')  // --> '0.6.0'
   */
  static minor(version) {
    return _AutoVersion.increment(version, "minor");
  }
  /**
   * Update the version number for a patch update
   * @param {string}  version
   * @return {string} the new version number
   * @example
   * AutoVersion.patch('1.0.0')  // --> '1.0.1'
   * AutoVersion.patch('0.5.9')  // --> '0.5.10'
   */
  static patch(version) {
    return _AutoVersion.increment(version, "patch");
  }
};
//# sourceMappingURL=index.js.map