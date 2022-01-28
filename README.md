# How to use the Flow Client Library (FCL) with Nuxt

Access the FCL instance from any page or component with `this.$fcl` and inside your templates with just `$fcl`. 

For example:

```
 mounted() {
    this.$fcl.currentUser.subscribe((user) => (this.user = user));
  },
  ````

For adding new smart contract addresses or extending the configuration of FCL go to `plugins/fcl.client.js` . 

If you change the name of this file please update it on the plugins property of `nuxt.config.js` as well.

```
  plugins: [
    "~/plugins/fcl.client.js" // run only on client side
  ]
  ```

For more information about Nuxt plugins please refer to [Nuxt documentation](https://nuxtjs.org/docs/directory-structure/plugins/).


For a NextJS starter template, please see this repo: https://github.com/muttoni/fcl-nextjs-quickstart. If you are a Svelte fan check [this other repo](https://github.com/muttoni/fcl-sveltekit-quickstart).


## [Live demo](https://fcl-nuxt.netlify.app/)

[![image](https://user-images.githubusercontent.com/27052451/146340356-e34f3c47-43bc-4c11-926b-b82b99d561c6.png)](https://fcl-nuxt.netlify.app/)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
