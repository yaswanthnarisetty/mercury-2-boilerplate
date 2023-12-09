import mercury from "@mercury-js/core"

export default mercury.createModel(
  'User',
  {
    name: {
      type: "string",
    },
    email: {
      type: "string",
      requred: true
    },
  },
  {
    //options to enable history tracking
  }
)
