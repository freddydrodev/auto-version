type VersionVariantKey = "major" | "minor" | "patch";
type VersionVariant = {
    [key in VersionVariantKey]: number;
};
/**
 * @class AutoVersion
 */
declare class AutoVersion {
    /**
     * Return the path of the project
     * @return {string} the path of the project where the package.json is located
     */
    static getLocalPath(): string | undefined;
    /**
     * Return the package.json file of the project
     * @param {string}   [pathname]   the path of the package.json
     * @return {JSON}                 the package.json
     */
    static getPackageJSON(pathname: string): any;
    /**
     * Return the current version of the project
     * @param {string}   [pathname]   the path of the package.json
     * @return {string}               the version number
     * @example
     * AutoVersion.getVersion()              // --> the version of the current project | ex : 0.5.2
     * AutoVersion.getVersion('../any/dir')  // --> the version of the project in this directory
     */
    static getVersion(pathname: string): any;
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
    static setVersion(version: string, pathname: string, indentation: number): void;
    /**
     * Extract the major, minor & patch number from a semver version number
     * @param versionString
     * @return {VersionObject}
     * @example
     * AutoVersion.parse('1.4.2')  // --> {major: 1, minor: 4, patch: 2}
     */
    static parse(versionString: string): VersionVariant;
    /**
     * Stringify a versionObject
     * @param versionObject
     * @return {string}         the version representation of the string
     * @example
     * AutoVersion.stringify({major: 1, minor: 4, patch: 2})  // --> '1.4.2'
     */
    static stringify(versionObject: VersionVariant): string;
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
    static toSemver(versionString: string): string;
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
    static increment(version: string, level: VersionVariantKey): string;
    /**
     * Update the version number for a major update
     * @param  {string} version
     * @return {string} the new version number
     * @example
     * AutoVersion.major('1.0.0')  // --> '2.0.0'
     * AutoVersion.major('0.5.9')  // --> '1.0.0'
     */
    static major(version: string): string;
    /**
     * Update the version number for a minor update
     * @param {string}  version
     * @return {string} the new version number
     * @example
     * AutoVersion.minor('1.0.0')  // --> '1.1.0'
     * AutoVersion.minor('0.5.8')  // --> '0.6.0'
     */
    static minor(version: string): string;
    /**
     * Update the version number for a patch update
     * @param {string}  version
     * @return {string} the new version number
     * @example
     * AutoVersion.patch('1.0.0')  // --> '1.0.1'
     * AutoVersion.patch('0.5.9')  // --> '0.5.10'
     */
    static patch(version: string): string;
}

export { AutoVersion as default };
