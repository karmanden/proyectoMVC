const url = "https://arcane-savannah-93531.herokuapp.com/";

document.addEventListener("DOMContentLoaded", function (event) {
  getDataClient();
  getDataClientRoom();
});

getDataClient = async () => {
  try {
    const response = await getClient(`${url}/client`);
    if (response.ok) {
      const client = await response.json();
      createHeader(client);
      createDataClient(client);
    }
  } catch (error) {
    console.log(error);
  }
};

getDataClientRoom = async () => {
  try {
    const response = await getClient(`${url}/client/reserva`);
    if (response.ok) {
      const client = await response.json();
      createDataRoom(client);
    }
  } catch (error) {
    console.log(error);
  }
};

createHeader = (data) => {
  const containt = document.getElementById("app");

  const header = document.createElement("header");
  const tittle = document.createElement("h1");
  const logout = document.createElement("a");
  tittle.append(document.createTextNode(`Bienvenido ${data.name}`));
  logout.href = "/logout";
  logout.append(document.createTextNode("Close Session"));
  header.append(tittle);
  header.append(logout);
  containt.append(header);
};

createDataRoom = (data) => {
  const containt = document.getElementById("app");

  const datosHabitacion = document.createElement("div");
  datosHabitacion.classList.add("Containt_RoomData");

  const tittle = document.createElement("h1");
  tittle.insertAdjacentText("beforeend", "Habitaciones reservadas");

  const add = document.createElement("a");
  add.href = "/reservar";
  add.insertAdjacentText("beforeend", "Reservar");

  datosHabitacion.append(tittle);
  datosHabitacion.append(add);
  containt.append(datosHabitacion);

  data.forEach(async (element) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.insertAdjacentHTML(
      "beforeend",
      `
        <label>El numero de habitacion: ${element.numero_habitacion}</label><br>
        <label>El precio de la habitacion es: ${element.price}</label><br>
        <label>La reserva fue realizada: ${element.date_reservation}</label>
        <button type="button" id="eliminar">eliminar</button><br><br>
      `
    );
    tittle.insertAdjacentElement("afterend", item);
    document.getElementById("eliminar").addEventListener("click", () => {
      const confi = confirm("Esta seguro de eliminar la reserva?")
      if (confi) {
        borrarHabitacionReservada(element)
        location.reload()
      }
      console.log("cancelado")
    });
  });
};

createDataClient = (data) => {
  const containt = document.getElementById("app");

  const datosCliente = document.createElement("div");
  datosCliente.classList.add("Containt_ClientData");
  datosCliente.insertAdjacentHTML(
    "beforeend",
    `
    <h1>Datos Personales</h1><br>
    <label>Nombre: ${data.name}</label><br>
    <label>Email: ${data.email}</label><br>
    <label>Telefono: ${data.telefono}</label><br>
    <label>Creaste la cuenta: ${data.create_date}</label><br>
    <a href="/update" id="update">Editar datos</a>
    `
  );

  containt.append(datosCliente);
};

borrarHabitacionReservada = async (element) => {
  console.log(element);
  const response = await postReservarHabitacion(
    url + "/habitacion/eliminar",
    JSON.stringify(element)
  );
  try {
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return error;
  }
};
