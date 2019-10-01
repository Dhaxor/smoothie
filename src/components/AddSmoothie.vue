<template>
    <div class="container">
    <div class="jumbotron">
    <form @submit.prevent="addSmoothie">
        <div class="form-group">
            <label for="title">Smoothie Title: </label>
            <input type="text" class="form-control" v-model="title">
        </div>
          <div v-for="(ing,index) in Ingredients" :key="index">
              <label for="Ingredient">Ingredients</label>
              <input type="text" class="form-control" v-model="Ingredients[index]">
          </div>
         <div class="form-group">
            <label for="smoothie">Add an Ingredient: </label>
            <input type="text" class="form-control" @keydown.tab.prevent="addIng" v-model="another">
        </div>
        <p v-if="feedback" class="text-danger">{{feedback}}</p>
          <input type="submit" class="btn btn-primary">
    </form>
   </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name : 'AddSmoothie',
    data(){
        return{
           title:null,
           another : null,
           Ingredients:[],
           feedback : null,
           slug:null
        }
 
    },
    methods:{
         addSmoothie(){
             if(this.title){
              this.feedback = null
              //using slugify
              this.slug = slugify(this.title,{
                  replacement : '-',
                  remove: /[$*_+~.()'"!\-:@]/g,
                  lower: true
              })
              db.collection('smoothies').add({
              title: this.title,
              Ingredients: this.Ingredients,
              slug:this.slug
             })
             .then(() => {
                  this.$router.push({ name: 'Index'})
              })
              .catch(err =>{
                  console.log(err)
              })
             }else{
                 this.title = 'Please Enter a title'
             }
            //  console.log(this.title,this.Ingredients)
         },
         //To add the Ingredients
         addIng(){
             if(this.another){
                 this.Ingredients.push(this.another)
                 this.another = null
                 //To make sure the feedback message disappers when the user starts typing
                 this.feedback = null
             }else{
                 this.feedback = 'Please Enter your Ingredients'
             }
         }
    }
}
</script>

<style>
body{
    font-family: 'Vibes', cursive;
    font-size: 30px;
}
.jumbotron{
    background-image: url('../assets/blue.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 30px;
    border-radius: 30px;
}
form{
    color: white;
    font-family: 'Anton', sans-serif;
   
}
</style>