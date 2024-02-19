import mercury from "@mercury-js/core";


mercury.hook.before("CREATE_USER_RECORD", async function (this: any) {
  // console.log("Inside before create hook of user", this) -> Test this out 
  // this.name will hold the record name here it is - USER
  // this.user will contain the context which we are setting up in the setContext
  // this.data will contain the params which we are passing for creating the object
},
)

mercury.hook.after("CREATE_USER_RECORD", async function (this: any) {
  // this.record will contain the data
},
)

mercury.hook.before("UPDATE_USER_RECORD", async function (this: any) {
  // We can set or edit the data in the record before it gets updated

  this.data.name = "Test Name";
},
)

mercury.hook.after("UPDATE_USER_RECORD", async function (this: any) {
},
)

mercury.hook.before("DELETE_USER_RECORD", async function (this: any) {
  // we can do clean up operations before deleting the record
},
)

mercury.hook.after("DELETE_USER_RECORD", async function (this: any) {
  // we can do clean up operations after deleting the record
},
)



