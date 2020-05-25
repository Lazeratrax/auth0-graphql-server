// src/database.js

const {MongoMemoryServer} = require("mongodb-memory-server");
const {MongoClient} = require("mongodb");

let database = null;

async function startDatabase() {
    const mongo = new MongoMemoryServer();
    const mongoDBURL = await mongo.getConnectionString();
    const connection = await MongoClient.connect(mongoDBURL, {
        useNewUrlParser: true
    });

    if (!database) {
        database = connection.db();

        await database.collection("users").insertMany([
            {
                _id: 1,
                firstName:
                    {
                        name: "Peter",
                        minLength: 2,
                        maxLength: 30,
                        required: true
                    },
                lastName:
                    {
                        name: "Parker",
                        minLength: 2,
                        maxLength: 30,
                        required: true
                    },
                email:
                    {
                        title: "atrax@mail.ru",
                        minLength: 5,
                        maxLength: 30,
                        required: true
                    },
                password:
                    {
                        title: "qwerty123",
                        minLength: 5,
                        maxLength: 30,
                        required: true
                    },
                avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
                isOnline: {
                    default: false
                }
            },
            {
                _id: 2,
                firstName: "Lena",
                lastName: "Lena",
                age: 27,
                email:
                    {
                        title: "lena@mail.ru",
                        minLength: 5,
                        maxLength: 30,
                    },
                password:
                    {
                        title: "qwerty123",
                        minLength: 5,
                        maxLength: 30,
                        required: true
                    },
                avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
                isOnline: {
                    default: false
                }
            }
        ]);

        await database.collection("table_game").insertMany([
            {
                game: {
                    title: "Манчкин",
                    minLength: 10,
                    maxLength: 30,
                    required: true
                },
                number_of_players: {
                    minNum: 3,
                    maxNum: 7,
                    confirmed: 4,
                    required: true
                },
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png",
                place: "Коласа, 37",
                date_for_play: "2020-11-06",
                userId: {
                    firstName: "Lena",

                }
            }
        ]);

        await database.collection("request_board").insertMany([
            {
                table_game: {
                    title: "Манчкин",
                    ref: "1",
                    required: true
                },
                count_plus: 2,
                userId: "5023eb06",
                registration_time: "2019-11-06T17:34:25+00:00"
            }
        ]);
    }

    return database;
}

module.exports = startDatabase;