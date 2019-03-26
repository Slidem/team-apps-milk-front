export class User {
  constructor(userBuilder) {
    this._login = userBuilder.login;
    this._firstName = userBuilder.firstName;
    this._lastName = userBuilder.lastName;
    this._email = userBuilder.email;
  }

  get login() {
    return this._login;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }
}

export class UserBuilder {
  withLogin(login) {
    this.login = login;
    return this;
  }

  withFirstName(firstName) {
    this.firstName = firstName;
    return this;
  }

  withLastName(lastName) {
    this.lastName = lastName;
    return this;
  }

  withEmail(email) {
    this.email = email;
    return this;
  }

  build() {
    return new User(this);
  }
}
