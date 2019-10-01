<template>
  <div class="Index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-header">
        <router-link :to="{ name : 'EditSmoothie', params:{smoothie_slug:smoothie.slug}}">
        <i class="material-icons">edit</i>
        </router-link>
        <i class="material-icons" @click="deleteSmoothies(smoothie.id)">delete</i>
        <h2 class="text-primary">{{smoothie.title}}</h2>
      </div>
      <div class="card-body">
        <ul class="ingredients">
          <li v-for="(ing,index) in smoothie.ingredients" :key="index">
            <span class="badge badge-secondary">{{ing}}</span>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
    methods :{
          deleteSmoothies(id){
           db.collection('smoothies').doc(id).delete()
           .then(() => {
                 this.smoothies = this.smoothies.filter( smoothie => {
              return smoothie.id != id;
            })
           })
          }
    },
    created(){
      //Fetch data from firestore
      db.collection('smoothies').get()
      .then(snapshot => {
         snapshot.forEach(doc => {
           //console.log(doc.data())
           let smoothie = doc.data()
            smoothie.id = doc.id
            this.smoothies.push(smoothie)
            
         })
      })
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;  
}
li{
  list-style-type: none;
  padding:  0px 5px;
}
.Index h2{
  text-align: center;
  font-size: 1.8em;  
  margin-top: 0;

}
.Index .ingredients{
  margin: 30px auto;
}
.Index .ingredients li{
  display: inline-block;
}
.Index i{
  float: right;
  cursor: pointer;
}
</style>
