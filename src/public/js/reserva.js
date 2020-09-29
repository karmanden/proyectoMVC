const url = "https://arcane-savannah-93531.herokuapp.com";

document.addEventListener("DOMContentLoaded", function (event) {
  getRoomAvailables();
});

getRoomAvailables = async () => {
  try {
    const response = await getHabitacionesDisponibles(
      `${url}/habitacion/available`
    );
    if (response.ok) {
      const data = await response.json();
      buildContaintRoomAvailable(data);
    }
  } catch (error) {
    console.log(error);
  }
};

buildContaintRoomAvailable = (data) => {
  const principal = document.getElementById("app");

  const tittle = document.createElement("h1");
  tittle.innerText = "Habitaciones Disponibles";

  const volver = document.createElement("a")
  volver.href = "/dashboard"
  volver.innerText = "Volver"

  const containt = document.createElement("div");
  containt.classList.add("HabitacionesDisponibles");

  principal.append(tittle);
  principal.append(volver)

  data.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.addEventListener("click", () => {
      const conf = confirm("Esta seguro de reservar esta habitacion?")
      if (conf) {
        reservarHabitacion(element);
        location.reload()
      }
      console.log("cancel")
    });
    item.insertAdjacentHTML(
      "beforeend",
      `
            <label>Numero de habitacion: ${element.numero_habitacion}</label><br>
            <label>Precio de habitacion: ${element.price}</label><br><br>
            `
    );
    tittle.insertAdjacentElement('afterend', item);
  });

  principal.append(containt);
};

reservarHabitacion = async (habitacion) => {
  const route = "/habitacion/agregar";
  try {
    const response = await postReservarHabitacion(`${url}${route}`, JSON.stringify(habitacion))
    if (response.ok) {
      const data = await response.json()
      console.log(response)
      return data
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
