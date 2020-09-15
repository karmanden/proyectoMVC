getClient = async (url) => {
  let tempHeader = new Headers();
  tempHeader.append("Content-Type", "application/json");
  let requestOptions = {
    method: "GET",
    headers: tempHeader,
    redirect: "follow",
    credentials: "include",
  };
  return await fetch(url, requestOptions);
};

getClientHabitacion = async (url) => {
  let tempHeader = new Headers();
  tempHeader.append("Content-Type", "application/json");
  let requestOptions = {
    method: "GET",
    headers: tempHeader,
    redirect: "follow",
    credentials: "include",
  };
  return await fetch(url, requestOptions);
};

getHabitacionesDisponibles = async (url) => {
  let tempHeader = new Headers();
  tempHeader.append("Content-Type", "application/json");
  let requestOptions = {
    method: "GET",
    headers: tempHeader,
    redirect: "follow",
    credentials: "include",
  };
  return await fetch(url, requestOptions);
};

postReservarHabitacion = async (url, body) => {
  let tempHeader = new Headers();
  tempHeader.append("Content-Type", "application/json");
  let requestOptions = {
    method: "POST",
    body: body,
    headers: tempHeader
  };
  return await fetch(url, requestOptions);
};
