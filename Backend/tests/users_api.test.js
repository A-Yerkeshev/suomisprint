//users_api.test.js
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const bcrypt = require('bcrypt');

describe("User API Tests", () => {

describe("User Registration", () => {

    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    it("should register a new user with name, email, a password and a role", async () => {
      const newUser = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "R3g5T7#gh",
        role: 0
      };
  
      const response = await api
        .post("/api/users/")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);
  
      const user = await User.findOne({ email: newUser.email });
      expect(user).toBeTruthy();
      expect(user.name).toBe(newUser.name);
    });
  
    it("should not register a new user with missing fields", async () => {
      const invalidUser = {
        name: "John Doe",
        email: "johndoe@example.com",
      };
  
      await api
        .post("/api/users/")
        .send(invalidUser)
        .expect(400);
    });
  
    it("should not register a new user with an existing email", async () => {
      const existingUser = {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "R3g5T7#gh",
        role: 0
      };
  
      await api.post("/api/users/").send(existingUser);
  
      const newUser = {
        name: "John Doe",
        email: "janedoe@example.com",
        password: "R3g5T7#gh",
        role: 0
      };
  
      await api
        .post("/api/users/")
        .send(newUser)
        .expect(400);
    });
});
describe("User Login", () => {

    let existingUser;
  
    beforeEach(async () => {
      await User.deleteMany({});
      const passwordHash = await bcrypt.hash("R3g5T7#gh", 10);
      existingUser = new User({
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: passwordHash,
        role: 0
      });
      await existingUser.save();
    });
  
    it("should login an existing user with valid credentials", async () => {
      const credentials = {
        email: "janedoe@example.com",
        password: "R3g5T7#gh"
      };
  
      const response = await api
        .post("/api/users/login")
        .send(credentials)
        .expect(200)
        .expect("Content-Type", /application\/json/);
  
      expect(response.body.token).toBeTruthy();
    });
  
    it("should not login a user with invalid email", async () => {
      const credentials = {
        email: "invalidemail@example.com",
        password: "R3g5T7#gh"
      };
  
      await api
        .post("/api/users/login")
        .send(credentials)
        .expect(400);
    });
  
    it("should not login a user with invalid password", async () => {
      const credentials = {
        email: "janedoe@example.com",
        password: "wrongpassword"
      };
  
      await api
        .post("/api/users/login")
        .send(credentials)
        .expect(400);
    });
  
    // Add more test cases as needed
  });
  
  
    // Add more test cases as needed
    afterAll(() => {
        mongoose.connection.close();
      });
  });
  