<script>
  import "carbon-components-svelte/css/g90.css"
</script>

<svelte:head>
  <title>Gnock port knocker</title>
  <meta property="og:description" content="Private web based port knocking service" />

  <!-- Photo by Feyza  Altun: https://www.pexels.com/photo/person-holding-a-door-knocker-13724494/ -->
  <meta property="og:image" content="https://gnock.net/pexels-feyza-altun-13724494.jpg" />
</svelte:head>

<main>
  <section class="heading">
    <h1>Gnock</h1>
    <p>Private web based port knocking service</p>
  </section>
  <section class="content">
    <slot />
  </section>
  <footer>
    <p>
      Free service by Cocreators OÜ | <a href="https://github.com/cocreators-ee/gnock"
        >Gnock on GitHub</a
      >
    </p>
  </footer>
</main>

<style lang="scss">
  $spacing: 1rem;

  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: $spacing;
    width: 100%;
  }

  section.heading {
    padding-bottom: 2 * $spacing;
  }

  section.content {
    flex-grow: 1;
  }

  footer {
    padding: $spacing;
  }
</style>
