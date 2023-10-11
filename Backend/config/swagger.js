const swaggerJsdoc = require("swagger-jsdoc");
const host = process.env.NODE_ENV === 'production' ? 'https://suomisprint.onrender.com/' : `http://localhost:${process.env.PORT}`

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Suomisprint API",
      version: "1.0.0",
      description: "API for Finnish language courses",
    },
    servers: [
      {
        url: host,
      },
    ],
  },
  apis: ["routes/*.js", "controllers/*.js"],
  components: {
    schemas: {
      Course: {
        type: "object",
        properties: {
          title: {type: "string", required: true},
          provider_id: {type: "string"},
          description: {type: "string"},
          short_description: {type: "string"},
          level: {type: "string"},
          image_url: {type: "string"},
          price: {type: "number"},
          max_students: {type: "number"},
          enrolled: {type: "array"},
          start_date: {type: "number"},
          end_date: {type: "number"},
          start_time: {type: "number"},
          end_time: {type: "number"}
        },
        required: ['title'],
        example: {
          title: "Finnish for beginners",
          provider_id: "65243ffae2f98edeecb37a60",
          description: "Finnish language lessons for people, who only start to explore Finnish language.",
          short_description: "Start your Finnish language journey!",
          level: "A0-A2",
          image_url: "../img/a-woman-in-helsinki.png",
          price: 20,
          max_students: 35,
          enrolled: ["6515850e01b5bdc4ea73a4bb", "65167097605470e10a60a09b"],
          start_date: 1696938595177,
          end_date: 1696940595177,
          start_time: 11.30,
          end_time: 13.00
        },
      },
      User: {
        type: "object",
        properties: {
          name: {type: "string"},
          email: {type: "string"},
          password: {type: "string"},
          phone: {type: "string"},
          role: {type: "number"}
        },
        required: ['name', 'email', 'password', 'role'],
        example: {
          name: "Alan Ryzhewsky",
          email: "alan.r@mail.com",
          password: "password-will-be-hashed",
          phone: "+12 345 67890",
          role: 1
        }
      }
    },
  },
};

const specs = swaggerJsdoc(options);
module.exports = specs;