import validateRoute from "./auth";
const me = validateRoute((req, res, user) => {
  return res.json(user)
})

export default me