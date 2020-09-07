<template>
  <div class="loader"></div>
</template>

<style>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #418bf9; /* Blue */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 10px auto;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
