import { Resolvers } from "../__generated__/resolvers-types";
import { bookKindResolver } from "./book-kind.js";
import { queriesResolver } from "./queries.js";
import { mutationsResolver } from "./mutations.js";
import { movieInfoResolver } from "./movie-info.js";

export const resolvers: Resolvers = {
    BookKind: bookKindResolver,
    Query: { ...queriesResolver, ...movieInfoResolver },
    Mutation: mutationsResolver,
};
