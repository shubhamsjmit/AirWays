<template>
  <div class="header">
    <router-link to="/" class="logo">FlyWays</router-link>
    <div class="header-right">
      <router-link active-class="active" to="/">Home</router-link>
      <router-link active-class="active" to="bookflight">Book Flight</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f1;

  /* Style the header links */
  a {
    float: left;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;

    /* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
    &.logo {
      font-size: 25px;
      font-weight: bold;
    }

    /* Change the background color on mouse-over */
    &:hover {
      background-color: #ddd;
      color: black;
    }

    /* Style the active/current link*/
    &.active {
      background-color: dodgerblue;
      color: white;
    }
  }
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }

  .header-right {
    float: none;
  }
}
</style>