<template>
  <form>
    <label for="name">Meeting Name</label>
    <input type="text" name="name" />
    <label for="id">Meeting ID</label>
    <input type="number" name="id" />

    <button @click.prevent>Done</button>
  </form>
</template>

<script>
export default {};
</script>

<style>
input {
  display: block;
  width: 85%;
  height: 40px;
  margin-bottom: 20px;
  border-color: #418bf9;
  border-style: solid;
  border-radius: 40px;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 20px;
  color: #418bf9;
}

label {
  margin-bottom: 12px;
  display: block;
}

form {
  width: 85%;
  color: #418bf9;
  margin-left: 40px;
  font-size: 20px;
}
</style>