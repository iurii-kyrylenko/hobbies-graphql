import { User} from "../models/user";
import { Book } from "../models/book";
import { Movie } from "../models/movie";

export class MongoDatasource {
    dbConnection: any;

    constructor(dbConnection: any) {
        this.dbConnection = dbConnection;
    }

    async getUsers() {
        return User.find();
    }

    async getUser(id: string) {
        return User.findById(id);
    }

    async getBooks(userId: string) {
        return Book.find({ userId });
    }

    async getMovies(userId: string) {
        return Movie.find({ userId });
    }
}
