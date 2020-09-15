const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./connection");

passport.use(
  "auth",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      db.query(
        `SELECT * FROM client WHERE email = $1`,
        [email],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result.rows.length > 0) {
            const user = result.rows[0];
            if (user.password != password) {
              return done(
                null,
                false,
                req.flash("signinMessage", "Incorrect Password")
              );
            }
            return done(null, user);
          } else {
            return done(
              null,
              false,
              req.flash("signinMessage", "No User Found")
            );
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => {
  db.query(
    `SELECT * FROM client WHERE client_id = $1`,
    [user.client_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      return done(null, result.rows[0]);
    }
  );
});
