const db = require("../../config/connection");

exports.getClient = async (req, res) => {
  const user = await db.query(`SELECT * FROM client WHERE client_id = $1`, [
    req.user.client_id,
  ]);
  res.json(user.rows[0]);
  res.end();
};

exports.getClientReserva = async (req, res) => {
  const reservada = await db.query(
    `SELECT habitacion.habitacion_id, habitacion.numero_habitacion, habitacion.price, reservation.date_reservation FROM reservation 
    INNER JOIN habitacion ON habitacion.habitacion_id = reservation.habitacion_id WHERE reservation.client_id = $1`,
    [req.user.client_id]
  );
  res.json(reservada.rows);
  res.end();
};

exports.postUpdateDateClient = async (req, res) => {
  try {
    const client = req.body;
    const update = await db.query(
      `UPDATE client SET name = $1, email = $2, telefono = $3 WHERE client_id = $4`,
      [client.name, client.email, client.telefono, req.user.client_id]
    );
    res.redirect("/dashboard");
    res.send("update succes");
    return update.rows;
  } catch (error) {
    throw error;
  }
};

exports.getHabitacionesLibres = async (req, res) => {
  try {
    const rooms = await db.query(
      `
        SELECT * FROM habitacion WHERE habitacion_id NOT IN (SELECT habitacion_id FROM reservation)
      `
    );
    res.json(rooms.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.postReservarHabitacion = async (req, res) => {
  try {
    const habitacion = await req.body;
    const user = req.user;
    const addHabitacion = await db.query(
      `INSERT INTO reservation (client_id, habitacion_id, date_reservation)
       VALUES ($1, $2, CURRENT_DATE)`,
      [user.client_id, habitacion.habitacion_id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.json({
          message: "Succes insert",
        });
        console.log(result.rows);
      }
    );
    return addHabitacion;
  } catch (error) {
    throw error;
  }
};

exports.deleteReserva = async (req, res) => {
  const reserva = req.body;
  try {
    const delet = await db.query(
      `DELETE FROM reservation WHERE client_id = $1 AND habitacion_id = $2`,
      [
        req.user.client_id,
        reserva.habitacion_id
      ]
    )
    return delet.rows
  } catch (error) {
    throw error
  }
};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
