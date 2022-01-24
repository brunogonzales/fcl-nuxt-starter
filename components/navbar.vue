<template>
  <nav class="container">
    <nuxt-link to="/">
      <img
        src="~/assets/logo.svg"
        alt="Learn how to build on Flow"
        style="width: 2em; height: 2em"
      />
    </nuxt-link>
    <ul class="links">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
}
</style>
