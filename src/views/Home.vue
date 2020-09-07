<template>
  <div class="home">
    <section class="landing">
      <div class="hero-container">
        <img src="@/assets/logo-text.svg" class="hero-image" />
        <h2 class="hero-text">The one-stop-shop for all your zoom links</h2>
        <router-link class="primary-button go-to" to="/dashboard">
          Go to Zlink <i class="fas fa-arrow-circle-right"></i>
        </router-link>
      </div>
      <div class="image-container">
        <img src="@/assets/home-illustration.svg" class="watermark-image" />
      </div>
      <a href="#features" class="explore">
        <h3 class="explore-text">Explore Features</h3>
        <i class="fas fa-chevron-down primary-text"></i>
      </a>
    </section>
    <section id="features">
      <h1 class="features-heading">Features</h1>
      <ul class="feature-container">
        <li>
          <i class="fas fa-pen feature-icon"></i>
          <span class="feature-text"
            >Add, Edit, and Move all the Zoom links you need</span
          >
        </li>
        <li>
          <i class="fas fa-mobile-alt feature-icon"></i>
          <span class="feature-text"
            >Access and use your links on any device, just sign in!
          </span>
        </li>
        <li>
          <i class="fas fa-video feature-icon"></i>
          <span class="feature-text"
            >Launch Zoom straight from the browser, no need for new tabs</span
          >
        </li>
      </ul>
      <router-link class="primary-button features-go-to go-to" to="/dashboard">
        Go to Zlink <i class="fas fa-arrow-circle-right"></i>
      </router-link>
    </section>
    <footer class="footer">
      Created By Gabriel Casselman <a href="/contact">Contact Me</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style>
.landing {
  height: calc(100vh - 45px);
  height: -o-calc(100vh - 45px); /* opera */
  height: -webkit-calc(100vh - 45px); /* google, safari */
  height: -moz-calc(100vh - 45px); /* firefox */

  width: 100%;

  box-sizing: border-box;

  padding: 30px 0px 0px 30px;

  display: flex;
  align-items: center;
}

.image-container,
.hero-container {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  position: relative;
}

.hero-container {
  padding: 70px;
  padding-right: 10%;
  color: #a82981;
}

.hero-image {
  height: 100px;
}

.hero-text {
  margin: 40px 0 40px 0;
}

.go-to {
  line-height: 32px;
  height: 40px;
}

.image-container {
  overflow: hidden;
  height: 100%;
}

.watermark-image {
  height: 100%;
  opacity: 0.7;
}

.explore {
  position: absolute;
  width: 100%;
  bottom: 50px;
  left: 0px;
  text-align: center;
  color: #a82981;
  text-decoration: none;
  font-size: 1.4em;
}

.explore-text {
  margin: 3px 0 3px 0;
}

#features {
  background-color: #f2f2f2;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-container {
  list-style-type: none;
  padding: 0;
  width: 450px;
}

.feature-container > li {
  margin-bottom: 50px;
}

.feature-icon {
  font-size: 3em;
  float: left;
  margin-right: 40px;
  color: #a8abf7;
  width: 48px;
}

.feature-text {
  color: #a82981;
  font-size: 1.5em;
}

.footer {
  text-align: center;
  background-color: #bfc2ff;
  color: white;
  height: 40px;
  margin-top: -40px;
  line-height: 40px;
}
</style>
