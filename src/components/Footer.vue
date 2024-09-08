<script>
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-container">
        <div class="footer-year">@ 2024</div>

        <a
          class="footer-info"
          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
          target="_blank"
          >Pomodoro Technique Wiki</a
        >
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 20px 0;
  background-color: var(--color-bg-dark);
  color: var(--color-text-contrast);
  font-size: 12px;

  a {
    color: var(--color-text-contrast);
  }

  .footer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
