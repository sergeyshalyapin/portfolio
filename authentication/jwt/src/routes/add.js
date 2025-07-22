import { cookieJwtAuth } from "../middleware/cookieJwtAuth.js";

export default (app) =>
  app.post("/add", cookieJwtAuth, (req, res) => {
    console.log(req.user);
    res.redirect("/welcome");
  });