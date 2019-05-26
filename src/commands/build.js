const { fork } = require('child_process');
const { log } = require('../log');
const { resolve } = require('path');
const { existsSync } = require('fs');

const { env } = process;
/** @type {import('config').Config} */
let CONFIG;

/**
 * Build the client and / or server
 *
 * @param {string[]} components The components to build. Defaults to everything,
 * but if you wnat to only build client or server, you may provide them here to
 * restrict the process.
 * @param {object} options See below
 * @param {boolean} options.series Build each item in series instead of parallel
 */
async function build(components = [], options = { series: false }) {
  // There's a scenario where config doesn't exist and needs imported
  if (!CONFIG) CONFIG = require('../config');
  if (components.length === 0)
    components = CONFIG.sources.map(source => source.name);

  /**
   * @param {string} component The component to build
   * @return Promise<void>
   */
  function buildComponent(component) {
    return new Promise(resolve =>
      fork(__filename, [], { env })
        .on('exit', () => resolve())
        .send({ CONFIG, action: component })
    );
  }

  if (options.series) {
    const result = [];
    for (const component of components) {
      result.push(await buildComponent(component));
    }
    return result;
  } else return Promise.all(components.map(buildComponent));
}

/**
 * @param {import('commander').Command} program The Commander instance to add
 * commands to
 * @param {import('config').Config} config The runner configuration
 */
function install(program, config) {
  CONFIG = config;
  program
    .command(`build [${config.sources.map(s => s.name).join('|')}...]`)
    .option(
      '--series',
      'Build all the options one at a time instead of in parallel'
    )
    .description('Build the client and / or the server')
    .action((components, options) =>
      build(components, options).catch(console.error)
    );
}

// If this module was run through fork()
// @ts-ignore
if (module.id === '.') {
  process.on('message', async (options = {}) => {
    /** @type {{CONFIG: import('config').Config, action: string}} */
    const { CONFIG, action } = options;

    try {
      const source = CONFIG.sources.find(item => item.name === action);
      if (!source) console.error(`Source type ${action} invalid`);
      else {
        log(`build ${action}`, `Building ${source.entry}`);
        const Bundler = require('parcel-bundler');

        // In cases where defaulted sources exists (ie - client and server), this let's there be an explicit
        // opt-out of the source to prevent extra processing or conflict with existing project structure that
        // should not be processed
        if (source.ignore) {
          console.log('Skipping source', source.name);
          return;
        }

        // Do an explicit check before letting the bundler perform it's task to prevent empty folders
        // from showing up. This way we can support keeping client and server defaulted to values, but not
        // have them clutter the distribution with empty folders when they are not requested.
        if (!existsSync(resolve(source.entry))) {
          throw new Error(`No entries found at ${resolve(source.entry)}`);
        }

        if (CONFIG) {
          const bundler = new Bundler(resolve(source.entry), source.parcel);
          await bundler.bundle();
          process.exit();
        }
      }
    } catch (error) {
      console.error(error);
      process.exit(0);
    }
  });
}

module.exports = { install, build };
