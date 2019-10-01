<template>
  <div class="container">
  <div v-if="smoothie" class="edit-smoothie">
    <h2>Edit  {{smoothie.title}}</h2>
        <div class="jumbotron">
        <form @submit.prevent="EditSmoothie">
        <div class="form-group">
            <label for="title">Smoothie Title: </label>
            <input type="text" class="form-control" v-model="smoothie.title">
        </div>
          <div v-for="(ing,index) in smoothie.ingredients" :key="index">
              <label for="Ingredient">Ingredients</label>
              <input type="text" class="form-control" v-model="smoothie.ingredients[index]">
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
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data(){
        return{
        smoothie : null, 
        another: null,
        feedback:null
        }
    },
    methods:{
     EditSmoothie(){
             if(this.smoothie.title){
              this.feedback = null
              //using slugify
              this.smoothie.slug = slugify(this.smoothie.title,{
                  replacement : '-',
                  remove: /[$*_+~.()'"!\-:@]/g,
                  lower: true
              })
              db.collection('smoothies').doc(this.smoothie.id).update({
              title: this.smoothie.title,
              ingredients: this.smoothie.ingredients,
              slug:this.smoothie.slug
             })
             .then(() => {
                  this.$router.push({ name: 'Index'})
              })
              .catch(err =>{
                  console.log(err)
              })
             }else{
                 this.feedback = 'Please Enter a title'
             }
     }
    },

    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug )
         ref.get().then(snapshot =>{
             snapshot.forEach(doc =>{
              this.smoothie = doc.data(); 
              this.smoothie.id = doc.id
             })
         })
  }
}
</script>

<style>
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