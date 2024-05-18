import { RESTDataSource } from '@apollo/datasource-rest';

type GoogleSearchResponse = any;

interface BookSearchResult {
    description: string;
    thumbnail: string;
}

const buildQuery = (author: string, title: string) => {
    const inauthor = author;
    const intitle = title.replace(/\s*(:|\().+$/, "");
    return `inauthor:${inauthor}+intitle:${intitle}`;
};

const parseGoogleResponse = (res: GoogleSearchResponse): BookSearchResult => {
    let thumbnail = "",
        description = "";
    const totalItems = res?.totalItems ?? 0;
    for (let i = 0; i < totalItems; i++) {
        const volumnInfo = res?.items?.[i]?.volumeInfo;
        thumbnail = volumnInfo?.imageLinks?.thumbnail ?? "";
        description = volumnInfo?.description ?? "";
        if (thumbnail && description) break;
    }
    return { thumbnail, description };
};

export class BooksAPI extends RESTDataSource {
    override baseURL = process.env.GOOGLE_BOOKS_API;

    async getBookInfo(author: string, title: string) {
        const res = await this.get<GoogleSearchResponse>("volumes", {
            params: { q: buildQuery(author, title) },
        });
        return parseGoogleResponse(res);
    };

    // override willSendRequest(_path: string, req: AugmentedRequest) {
    //     console.log("req.params:", req.params);
    // }
}
