<template>
  <div class="freet-container">
    <div v-if="isAuth&&freet.isRefreet" class="freet-name"> freet {{ freet.freetID }} from <router-link :to="`/profile`" class = "aaa">

                <h class = "single">You</h>
        </router-link> </div>
    <div v-if="isAuth&&!freet.isRefreet" class="freet-name"> freet {{ freet.freetID }} from <router-link :to="`/profile` " class = "aaa">

                <h class = "single">You</h>
        </router-link> </div>
    <div v-if="!isAuth&&freet.isRefreet" class="freet-name"> refreet {{ freet.freetID }} from <router-link :to="`/${freet.name}`" class = "aaa">

                <h class = "single">{{ freet.name }}</h>
        </router-link> </div>
    <div v-if="!isAuth&&!freet.isRefreet" class="freet-name"> refreet {{ freet.freetID }} from <router-link :to="`/${freet.name}`" class = "aaa">

                <h class = "single">{{ freet.name }}</h>
        </router-link></div>

    <div class="freet-content">
      


    <p>{{ freetContent }}</p></div>

    <button class="smallbutton" v-if="!isUpvoted&&isSignedIn" 
                v-on:click="onUpvote"
                variant="info">Upvote</button>

    <button class="smallbutton" v-else-if="isUpvoted" 
                v-on:click="onUndoUpvote"
                variant="info">Undo Upvote</button>
    <button class="smallbutton" v-if="isSignedIn" 
                v-on:click="refreet"
                variant="info">Refreet</button>
    <div v-if="freet.isRefreet"> It is a refreet. </div>
    <div v-if=isSignedIn> <p>It has been upvoted for {{voteCounts}} time(s).</p></div>
    <!-- <p># author? : {{isAuth}}</p> -->
    <!-- <div v-if="isAuth&&freet.isRefreet"> It is your refreet, you could only delete it. </div>
    <div v-if="isAuth&&!freet.isRefreet"> It is your freet, you could edit or delete it. </div> -->


    
    
      
    
    <div class="freet-item-actions">
      <input v-if="isAuth&&this.freet.isRefreet!=1" class="edit" v-model='editFreetForm.content' type="text" name="content" placeholder="New Content">
      <button class="smallbutton" v-if="isAuth&&this.freet.isRefreet!=1" v-on:click="updateFreet">Update</button>
      <button class="smallbutton" v-if="isAuth" v-on:click="deleteFreet">Delete</button>

    </div>
  </div>
</template>


<script>
  import axios from "axios";
  import { eventBus } from "../main";


  export default {
    name: "freet",
    components: {
      // TODO
    },
    props: {
      freet: Object,
      isAuth1: Boolean,
      // key: Object,
      // use
    },
    data () {
        return {
          isSignedIn: false,
          isAuth :this.isAuthor(),
          isUpvoted : false,
          editFreetPopup: false, 
          editFreetForm : {
            content : '',
          },
          voteCounts : this.countVotes(),
          freetContent : this.freet.content,
          freetCurrent : this.freet,
          
          author : {
            username : this.freet.creatorUserID,
          },
        }
      },
    created: function() {
    let authenticated = this.$cookie.get('fritter-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }
    eventBus.$on("signout-success", () => {
      this.$cookie.set('fritter-auth', '');
      this.isSignedIn = false;
      this.isAuth1 = false;
    });
  },
    

    computed : {
      
      
    },

    methods : {
      isAuthor() {
        // problem this is name not ID
        const bodyContent = { creatorUserID: this.freet.creatorUserID};
        // console.log(this.freet.creatorUserID);
        axios.get(`/api/freets/owner?id=${bodyContent.creatorUserID}`, bodyContent)
          .then((response) => {
            // console.log(response.data);
            this.isAuth = response.data;
            return response.data;
          })

        
      },
      countVotes() {
        const bodyContent = { id : this.freet.freetID};
        axios.get(`/api/upvote?id=${bodyContent.id}`, bodyContent)
          .then((response) => {
            // console.log('current votes: ', response.data.votes);
            this.voteCounts = response.data;
          }).catch(err => {
            eventBus.$emit("count-votes-error", err);
          }).then(() => {
          });
      },

      updateFreet: function() {
      const body = { id : this.freet.freetID, content : this.editFreetForm.content };
      axios
        .patch(`/api/freets`, body)
        .then((res) => {
          // handle success
          
          this.freetContent = res.data.content;
          eventBus.$emit("update-freet-success", res);
        })
        .catch(err => {
          // handle error
          eventBus.$emit("update-freet-error", err);
        })
        // problem 2!
        .then(() => ( this.editFreetForm.content = ""));
      },

      deleteFreet: function() {
      const body = { id : this.freet.freetID};
      axios
        .delete(`/api/freets?id=${body.id}`, body)
        .then(() => {
          /* eslint-disable no-console */
          console.log(this.freet);
          eventBus.$emit("delete-freet-success", this.freet);
          this.freetCurrent = {}
        })
        .catch(err => {
          eventBus.$emit("delete-freet-error", err);
        }).then(() => {
        });
        },


      onUpvote: function() {
        // console.log('upvote');
        // evt.preventDefault();
        const body = { id : this.freet.freetID };
        axios.post(`/api/upvote`, body)
          .then((res) => {
            this.isUpvoted = true;
            this.voteCounts = this.countVotes();
            /* eslint-disable no-console */
            console.log(res);
            eventBus.$emit("upvote-success", res);
            // this.countVotes();
          })
          .catch(err => {
            eventBus.$emit("upvote-error", err);
          }).then(() => {
          });
      },

      onUndoUpvote: function() {
        const bodyContent = { id : this.freet.freetID };
        axios.patch("/api/upvote", bodyContent)
          .then(() => {
            this.isUpvoted = false;
            this.voteCounts = this.countVotes();
            /* eslint-disable no-console */
            console.log(this.freet);
            eventBus.$emit("onupvote-success", this.freet);
          })
          .catch(err => {
            eventBus.$emit("onupvote-error", err);
          }).then(() => {
          });
      }, 

      refreet: function() {
        // TODO: display button iff freet not in user.freets
        
        const bodyContent = { id : this.freet.freetID };
        axios.post('/api/refreets', bodyContent)
          .then((response) => {
            /* eslint-disable no-console */
            console.log(Response);
            eventBus.$emit("create-refreet-success", response);
          })
          .catch(err => {
            eventBus.$emit("refreet-error", err);
          }).then(() => {
          });
      },

      goToProfile: function (selected) {
          // when the hash prop changes, this function will be fired.
          let signedUsername = this.$cookie.get('fritter-auth');
          if (selected === signedUsername && selected){
            this.$router.push(`/profile`);
            

          } else if (this.selected !== signedUsername && selected){
            this.$router.push(`/${selected}`);
          }
           
        }




  
  





    },




  }

</script>
