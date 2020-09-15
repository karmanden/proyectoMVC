export class Client {
  client_id = "";
  name = "";
  email = "";
  telefono = "";
  create_date = new Date();
  password = "";
  constructor(client_id, name, email, telefono, create_date, password) {
    this.client_id = client_id;
    this.name = name;
    this.email = email;
    this.telefono = telefono;
    this.create_date = create_date;
    this.password = password;
  }
}
