(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f68db324"],{"09f6":function(e,t,s){},4148:function(e,t,s){"use strict";var r=s("09f6"),n=s.n(r);n.a},"831d":function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"short-container"},[s("div",{staticClass:"short-name"},[e._v(" "+e._s(e.short.shortName))]),s("p",[e._v("Creator ID: "+e._s(e.creatorIdentity))]),s("p",[e._v("Short URL: "),s("a",{attrs:{target:"_blank",href:"http://localhost:3000/"+e.short.shortName}},[e._v(" http://localhost:3000/"+e._s(e.short.shortName)+" ")])]),s("a",{attrs:{target:"_blank",href:e.short.url}},[e._v(" "+e._s(e.short.url)+" ")]),s("div",{staticClass:"short-item-actions"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.url,expression:"url",modifiers:{trim:!0}}],staticClass:"edit",attrs:{type:"text",name:"url",placeholder:"New Url"},domProps:{value:e.url},on:{input:function(t){t.target.composing||(e.url=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),s("button",{on:{click:e.updateShort}},[e._v("Update")]),s("button",{on:{click:e.deleteShort}},[e._v("Delete")])])])},n=[],a=s("bc3a"),o=s.n(a),i=s("56d7"),c={name:"ShortListItem",props:{short:Object},data:function(){return{url:""}},computed:{creatorIdentity:function(){return this.short.creator?this.short.creator:"anonymous"}},methods:{updateShort:function(){var e=this,t={url:this.url};o.a.put("/api/shorts/".concat(this.short.shortName),t).then((function(e){i["eventBus"].$emit("update-short-success",e)})).catch((function(e){i["eventBus"].$emit("update-short-error",e)})).then((function(){return e.url=""}))},deleteShort:function(){var e=this;o.a.delete("/api/shorts/".concat(this.short.shortName),{}).then((function(){i["eventBus"].$emit("delete-short-success",e.short)})).catch((function(e){i["eventBus"].$emit("delete-short-error",e)}))}}},u=c,l=s("2877"),d=Object(l["a"])(u,r,n,!1,null,null,null);t["a"]=d.exports},"98f2":function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"component",attrs:{id:"sign-out"}},[s("button",{on:{click:e.signOut}},[e._v("Sign Out")])])},n=[],a=s("bc3a"),o=s.n(a),i=s("56d7"),c={name:"SignOut",methods:{signOut:function(){o.a.delete("api/users/session").then((function(){i["eventBus"].$emit("signout-success",!0)})).catch((function(){i["eventBus"].$emit("signout-success",!0)}))}},mounted:function(){var e=this;i["eventBus"].$on("trigger-signout",(function(){e.signOut()}))},beforeDestroy:function(){i["eventBus"].$off("trigger-signout")}},u=c,l=s("2877"),d=Object(l["a"])(u,r,n,!1,null,null,null);t["a"]=d.exports},ba84:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"subcontainer"},[s("div",{staticClass:"header secondary-header"},[e._v(" Freets ")]),s("div",[e.success?s("div",{staticClass:"success-message"},[e._v(" "+e._s(e.success)+" ")]):e._e(),e.error?s("div",{staticClass:"error-message"},[e._v(" "+e._s(e.error)+" ")]):e._e(),s("div",{staticClass:"freets-container"},[e.freets.length?s("div",e._l(e.freets,(function(e){return s("Freet",{key:e.id,attrs:{freet:e}})})),1):s("div",[s("p",{staticStyle:{"text-align":"center"}},[e._v("There are no freets to display. Create one today!")])])])])])},n=[],a=s("bc3a"),o=s.n(a),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"freet-container"},[s("div",{staticClass:"freet-name"},[e._v(" "+e._s(e.freet.freetID))]),s("p",[e._v("Creator ID: "+e._s(e.freet.creatorUserID))]),s("p",[e._v("Freet Content: "+e._s(e.freetContent))]),s("p",[e._v("Freet ID: "+e._s(e.freet.freetID))]),e.isUpvoted?e.isUpvoted?s("button",{attrs:{variant:"info"},on:{click:e.onUndoUpvote}},[e._v("Undo Upvote")]):e._e():s("button",{attrs:{variant:"info"},on:{click:e.onUpvote}},[e._v("Upvote")]),e._v(" # upvotes : "+e._s(e.voteCounts)+" "),s("div",{staticClass:"freet-item-actions"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.editFreetForm.content,expression:"editFreetForm.content"}],staticClass:"edit",attrs:{type:"text",name:"content",placeholder:"New Content"},domProps:{value:e.editFreetForm.content},on:{input:function(t){t.target.composing||e.$set(e.editFreetForm,"content",t.target.value)}}}),s("button",{on:{click:e.updateFreet}},[e._v("Update")]),s("button",{on:{click:e.deleteFreet}},[e._v("Delete")])])])},c=[],u=s("56d7"),l={name:"freet",components:{},props:{freet:Object,user:Object,isSignedIn:Boolean},data:function(){return{isUpvoted:!1,editFreetPopup:!1,editFreetForm:{content:""},voteCounts:this.countVotes(),freetContent:this.freet.content,freetCurrent:this.freet,author:{username:this.freet.creatorUserID}}},computed:{isAuthor:function(){return this.$cookie.get("fritter-auth")==this.freet.creatorUserID}},methods:{countVotes:function(){var e=this,t={id:this.freet.freetID};o.a.get("/api/upvote?id=".concat(t.id),t).then((function(t){e.voteCounts=t.data})).catch((function(e){u["eventBus"].$emit("count-votes-error",e)})).then((function(){}))},updateFreet:function(){var e=this,t={id:this.freet.freetID,content:this.editFreetForm.content};o.a.patch("/api/freets",t).then((function(t){e.freetContent=t.data.content,u["eventBus"].$emit("update-freet-success",t)})).catch((function(e){u["eventBus"].$emit("update-freet-error",e)})).then((function(){return e.editFreetForm.content=""}))},deleteFreet:function(){var e=this,t={id:this.freet.freetID};o.a.delete("/api/freets?id=".concat(t.id),t).then((function(){u["eventBus"].$emit("delete-freet-success",e.freet),e.freetCurrent={}})).catch((function(e){u["eventBus"].$emit("delete-freet-error",e)})).then((function(){}))},onUpvote:function(){var e=this,t={id:this.freet.freetID};o.a.post("/api/upvote",t).then((function(){e.isUpvoted=!0,e.voteCounts=e.countVotes()})).catch((function(e){u["eventBus"].$emit("upvote-error",e)})).then((function(){}))},onUndoUpvote:function(){var e=this,t={id:this.freet.freetID};o.a.patch("/api/upvote",t).then((function(){e.isUpvoted=!1,e.voteCounts=e.countVotes()})).catch((function(e){u["eventBus"].$emit("upvote-error",e)})).then((function(){}))}}},d=l,f=s("2877"),h=Object(f["a"])(d,i,c,!1,null,null,null),m=h.exports,v={name:"FreetList",components:{Freet:m},props:{user:Object,isSignedIn:Boolean},data:function(){return{error:"",success:"",freets:[]}},created:function(){var e=this;u["eventBus"].$on("create-freet-success",(function(t){e.freets.push(t.data)})),u["eventBus"].$on("update-freet-success",(function(t){e.success="Freet name ".concat(t.data.freetName," now resolves to ").concat(t.data.url),e.clearMessages(),e.loadFreets()})),u["eventBus"].$on("delete-freet-success",(function(t){e.success="Freet name ".concat(t.freetName," has been deleted"),e.clearMessages(),e.loadFreets()}))},mounted:function(){this.loadFreets()},methods:{loadFreets:function(){var e=this;o.a.get("/api/freets").then((function(t){e.freets=t.data}))},clearMessages:function(){var e=this;setInterval((function(){e.success="",e.error=""}),5e3)}}},p=v,g=Object(f["a"])(p,r,n,!1,null,null,null);t["a"]=g.exports},c66d:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("UserProfile")],1)},n=[],a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"user-profile"}},[e.isSignedIn?s("div",{staticClass:"form-container"},[e._v(" Signed in as "+e._s(this.$cookie.get("fritter-auth"))+" "),s("SignOut"),e._m(0),s("ChangeUserCredentials")],1):s("div",{staticClass:"form-container"},[[s("b-navbar-item",{attrs:{tag:"router-link",to:{path:"/account"}}},[s("a",{staticClass:"button is-light"},[s("strong",[e._v("Go to sign in page")])])])]],2),e.messages.length?s("div",{staticClass:"success-message",staticStyle:{"text-align":"center"}},e._l(e.messages,(function(t){return s("div",{key:t.id},[e._v(e._s(t))])})),0):e._e()])},o=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"four wide column"},[s("img",{staticClass:"ui tiny avatar image",attrs:{src:"https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm"}})])}],i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("form",{staticClass:"component",attrs:{id:"changeName",method:"post"},on:{submit:function(t){return t.preventDefault(),e.changeUsername(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.username,expression:"username",modifiers:{trim:!0}}],attrs:{id:"username",type:"text",name:"username",placeholder:"New username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e._v(" "),s("br"),s("input",{staticClass:"button",attrs:{type:"submit",value:"Change username"}})]),s("br"),s("form",{staticClass:"component",attrs:{id:"changePass",method:"post"},on:{submit:function(t){return t.preventDefault(),e.changePassword(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.password,expression:"password",modifiers:{trim:!0}}],attrs:{id:"password",type:"text",name:"password",placeholder:"New password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e._v(" "),s("br"),s("input",{staticClass:"button",attrs:{type:"submit",value:"Change password"}})]),e.errors.length?s("div",{staticClass:"error-message",staticStyle:{width:"250px"}},[s("b",[e._v("Please correct the following error(s):")]),s("ul",e._l(e.errors,(function(t){return s("li",{key:t.id},[e._v(e._s(t))])})),0)]):e._e()])},c=[],u=s("bc3a"),l=s.n(u),d=s("56d7"),f={name:"change",data:function(){return{errors:[],username:"",password:""}},methods:{changeUsername:function(){var e=this,t={username:this.username};l.a.put("/api/users",t).then((function(){d["eventBus"].$emit("change-username-success",!0),d["eventBus"].$emit("trigger-signout",!0)})).catch((function(t){e.errors.push(t.response.data.error)})).then((function(){e.resetForm(),e.clearMessages()}))},changePassword:function(){var e=this,t={password:this.password};l.a.put("/api/users/password",t).then((function(){d["eventBus"].$emit("change-password-success",!0),d["eventBus"].$emit("trigger-signout",!0)})).catch((function(t){e.errors.push(t.response.data.error)})).then((function(){e.resetForm(),e.clearMessages()}))},resetForm:function(){this.username="",this.password=""},clearMessages:function(){var e=this;setInterval((function(){e.errors=[]}),5e3)}}},h=f,m=(s("4148"),s("2877")),v=Object(m["a"])(h,i,c,!1,null,"61239e3a",null),p=v.exports,g=s("cd7f"),_=s("98f2"),C={name:"UserProfile",components:{ChangeUserCredentials:p,FritterTitle:g["a"],SignOut:_["a"]},data:function(){return{isSignedIn:!1,messages:[]}},created:function(){var e=this,t=this.$cookie.get("fritter-auth");t&&(this.isSignedIn=!0),d["eventBus"].$on("change-username-success",(function(){e.$cookie.set("fritter-auth",""),e.isSignedIn=!1,e.messages.push("Your username was successfully changed! Please sign in again."),e.clearMessages()})),d["eventBus"].$on("change-password-success",(function(){e.$cookie.set("fritter-auth",""),e.isSignedIn=!1,e.messages.push("Your password was successfully changed! Please sign in again."),e.clearMessages()})),d["eventBus"].$on("signout-success",(function(){e.$cookie.set("fritter-auth",""),e.isSignedIn=!1}))},methods:{clearMessages:function(){var e=this;setInterval((function(){e.messages=[]}),5e3)}}},b=C,F=Object(m["a"])(b,a,o,!1,null,null,null),$=F.exports,w={name:"profile",components:{UserProfile:$}},S=w,y=Object(m["a"])(S,r,n,!1,null,null,null);t["default"]=y.exports},cd7f:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.isSignedIn?s("div",{staticClass:"form-container"},[s("CreateFreetForm"),s("FreetList")],1):s("div",{staticClass:"form-container"},[s("FreetList")],1)])},n=[],a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"subcontainer"},[s("div",{staticClass:"header primary-header"},[e._v(" Create Freet ")]),s("div",{staticClass:"freet-form-container"},[s("form",{attrs:{id:"create-freet",method:"post"},on:{submit:function(t){return t.preventDefault(),e.createFreet(t)}}},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.freetName,expression:"freetName",modifiers:{trim:!0}}],attrs:{id:"name",type:"text",name:"freetName",placeholder:"Enter Freet Name"},domProps:{value:e.freetName},on:{input:function(t){t.target.composing||(e.freetName=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),s("input",{staticClass:"button",attrs:{type:"submit",value:"Create Freet",id:"createFreet"}}),e.success?s("div",{staticClass:"success-message"},[e._v(" "+e._s(e.success)+" ")]):e._e(),e.errors.length?s("div",{staticClass:"error-message"},[s("b",[e._v("Please correct the following error(s):")]),s("ul",e._l(e.errors,(function(t){return s("li",{key:t.id},[e._v(e._s(t))])})),0)]):e._e()])])])},o=[],i=s("bc3a"),c=s.n(i),u=s("56d7"),l={name:"CreateFreetForm",data:function(){return{errors:[],success:"",freetName:""}},methods:{createFreet:function(){var e=this;if(this.errors=[],""===this.freetName)this.errors.push("Freet name is required"),this.clearMessages();else{this.freetName.length>140&&(this.errors.push("Freet should be no longer than 140 words!"),this.clearMessages());var t={freetName:this.freetName};c.a.post("/api/freets",t).then((function(t){e.success="Freet created successfully!",u["eventBus"].$emit("create-freet-success",t)})).catch((function(t){e.errors.push(t.response.data.error)})).then((function(){e.resetForm(),e.clearMessages()}))}},resetForm:function(){this.freetName=""},clearMessages:function(){var e=this;setInterval((function(){e.errors=[],e.success=""}),5e3)}}},d=l,f=s("2877"),h=Object(f["a"])(d,a,o,!1,null,null,null),m=h.exports,v=s("ba84"),p=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"subcontainer"},[s("div",{staticClass:"header secondary-header"},[e._v(" My Freets ")]),s("div",[e.success?s("div",{staticClass:"success-message"},[e._v(" "+e._s(e.success)+" ")]):e._e(),e.error?s("div",{staticClass:"error-message"},[e._v(" "+e._s(e.error)+" ")]):e._e(),s("div",{staticClass:"shorts-container"},[e.shorts.length?s("div",e._l(e.shorts,(function(e){return s("ShortListItem",{key:e.id,attrs:{short:e}})})),1):s("div",[s("p",{staticStyle:{"text-align":"center"}},[e._v("There are no shorts to display. Create one today!")])])])])])},g=[],_=s("831d"),C={name:"ShortList",components:{ShortListItem:_["a"]},data:function(){return{error:"",success:"",shorts:[]}},created:function(){var e=this;u["eventBus"].$on("create-short-success",(function(t){e.shorts.push(t.data)})),u["eventBus"].$on("update-short-success",(function(t){e.success="Short name ".concat(t.data.shortName," now resolves to ").concat(t.data.url),e.clearMessages(),e.loadShorts()})),u["eventBus"].$on("delete-short-success",(function(t){e.success="Short name ".concat(t.shortName," has been deleted"),e.clearMessages(),e.loadShorts()})),u["eventBus"].$on("update-short-error",(function(t){e.error="Error updating short ".concat(t.data.shortName),e.clearMessages(),e.loadShorts()})),u["eventBus"].$on("delete-short-error",(function(t){e.error="Error deleting short ".concat(t.shortName),e.clearMessages(),e.loadShorts()}))},mounted:function(){this.loadShorts()},methods:{loadShorts:function(){var e=this;c.a.get("/api/shorts").then((function(t){e.shorts=t.data}))},clearMessages:function(){var e=this;setInterval((function(){e.success="",e.error=""}),5e3)}}},b=C,F=Object(f["a"])(b,p,g,!1,null,null,null),$=F.exports,w={name:"main",components:{CreateFreetForm:m,FreetList:v["a"],MyFreetList:$},data:function(){return{isSignedIn:!1,messages:[]}},created:function(){var e=this.$cookie.get("fritter-auth");e&&(this.isSignedIn=!0)}},S=w,y=Object(f["a"])(S,r,n,!1,null,null,null);t["a"]=y.exports}}]);
//# sourceMappingURL=chunk-f68db324.765a1ef7.js.map