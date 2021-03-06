## 1.11.0

## Added

- [`ADDED`]: Make the run system ignore server and client if their paths are invalid
- [`ADDED`]: Make the run system not attempt to build things that have no entry

## 1.10.1

## Fixed

- [`FIXED`]: Some packages were displaying security vulnerabilities
- [`FIXED`]: The tags do not sort correctly in release notes
- [`FIXED`]: Unable to have more than one server

## 1.10.0

## Added

- [`ADDED`]: Check additional docker ports when updating environment variables
- [`ADDED`]: Added testing to the project finally (#9)

## Fixed

- [`FIXED`]: Unresolved client or server sources in the configuration will no longer produce empty folders in the dist folder
- [`FIXED`]: Unable to run when specifying outFile

## 1.9.0

## Added

- [`ADDED`]: Allow --production flag to be set to enable minification (#7)
- [`ADDED`]: Check for docker-compose.yml, and don't run docker unless one is found
- [`ADDED`]: Allow finding server and client folders in project root

## 1.8.1

## Fixed

- [`FIXED`]: Cannot read series of undefined

## 1.8.0

## Added

- [`ADDED`]: Implemented --series in build command

## 1.7.2

## Fixed

- [`FIXED`]: Move globby to a dependency

## 1.7.1

## Fixed

- [`FIXED`]: Server wasn't detecting .ts files

## 1.7.0

## Added

- [`ADDED`]: Add a linter that auto-detects lints to run and runs them (#3)
- [`ADDED`]: Added a linter that detects and runs appropriate lints for you

## 1.6.0

## Added

- [`ADDED`]: Action to update GitHub w\ release notes

# 1.5.0

## Added

- [`ADDED`]: Autodetect index.ts or index.js files in src/server

# 1.4.0

## Added

- [`ADDED`]: Made release-notes commit the changed files
- [`ADDED`]: Allow task: tag in release notes

## Task

- [`TASK`]: Update parcel-bundler and other non-essential packages

# 1.3.1

## Fixed

- [`FIXED`]: Release notes unable to obtain version history

# 1.3.0

## Added

- [`ADDED`]: Release notes can add git tags
- [`ADDED`]: Now release notes use version in package.json instead of guessing from git tags

## Fixed

- [`FIXED`]: Removced dependency on node 11.13

# 1.2.2

## Fixed

- [`FIXED`]: Custom commands were not getting picked up
- [`FIXED`]: Docker was being run for everything

# 1.2.1

## Fixed

- [`FIXED`]: Run did not repsect sources array

# 1.2.0

## Added

- [`ADDED`]: Changed build to allow extra sources

# 1.1.0

## Added

- [`ADDED`]: Added a release-notes command to generate release notes
- [`ADDED`]: Added type checking to project
