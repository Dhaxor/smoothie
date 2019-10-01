<template>
    <div class="Navbar">
       <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link :to="{name : 'Index'}">         
  <a class="navbar-brand" href="#">Ninja Smoothies</a>
    </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
      <ul class="Navbar-nav ml-auto">
    <router-link :to="{name : 'AddSmoothie'}" style="color:white">
    <li><button type="button" class="btn btn-secondary"><i class="material-icons">add</i></button></li>
    </router-link>
    </ul>

</nav>
    </div>
</template>

<script>
export default {
    Name:'Navbar',
    data(){
        return{

        }
    }
}
</script>


<style>
.for-btn{
  float: right;
}
.navbar-brand{
  font-family: 'Vibes', cursive;
  font-size: 30px;
}
</style>