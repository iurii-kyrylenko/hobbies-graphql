import { Resolvers } from "../__generated__/resolvers-types";
import { bookKindResolver } from "./book-kind.js";
import { queriesResolver } from "./queries.js";
import { mutationsResolver } from "./mutations.js";
import { itemInfoResolver } from "./item-info.js";

const pingResolver = {
    ping: async () => Date.now().toString(),
};

export const resolvers: Resolvers = {
    BookKind: bookKindResolver,
    Query: { ...pingResolver, ...queriesResolver, ...itemInfoResolver },
    Mutation: mutationsResolver,
};
