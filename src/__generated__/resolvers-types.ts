import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IContextValue } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String']['output'];
  completed: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  mode: BookKind;
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export type BookContent = {
  author: Scalars['String']['input'];
  completed: Scalars['Date']['input'];
  mode: BookKind;
  title: Scalars['String']['input'];
};

export enum BookKind {
  Audio = 'a',
  Mixed = 'r-a',
  Regular = 'r'
}

export type Movie = {
  __typename?: 'Movie';
  completed: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  imdbId?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  year: Scalars['String']['output'];
};

export type MovieContent = {
  completed: Scalars['Date']['input'];
  imdbId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  year: Scalars['String']['input'];
};

export type MovieInfo = {
  __typename?: 'MovieInfo';
  found?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  plot?: Maybe<Scalars['String']['output']>;
  poster?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook?: Maybe<Book>;
  createMovie?: Maybe<Movie>;
  deleteBook?: Maybe<Book>;
  deleteMovie?: Maybe<Movie>;
  register?: Maybe<Scalars['String']['output']>;
  updateBook?: Maybe<Book>;
  updateMovie?: Maybe<Movie>;
  updateUser?: Maybe<User>;
};


export type MutationCreateBookArgs = {
  bookContent: BookContent;
  userId: Scalars['ID']['input'];
};


export type MutationCreateMovieArgs = {
  movieContent: MovieContent;
  userId: Scalars['ID']['input'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  captchaToken: Scalars['String']['input'];
  registerData: RegisterData;
};


export type MutationUpdateBookArgs = {
  bookContent: BookContent;
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateMovieArgs = {
  id: Scalars['ID']['input'];
  movieContent: MovieContent;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  settings: SettingsData;
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  login?: Maybe<Scalars['String']['output']>;
  movieInfo?: Maybe<MovieInfo>;
  movies?: Maybe<Array<Maybe<Movie>>>;
  people?: Maybe<Array<Maybe<UserStats>>>;
  user?: Maybe<User>;
};


export type QueryBooksArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMovieInfoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterData = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SettingsData = {
  password?: InputMaybe<Scalars['String']['input']>;
  shareBooks?: InputMaybe<Scalars['Boolean']['input']>;
  shareMovies?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  salt: Scalars['String']['output'];
  shareBooks?: Maybe<Scalars['Boolean']['output']>;
  shareMovies?: Maybe<Scalars['Boolean']['output']>;
};

export type UserStats = {
  __typename?: 'UserStats';
  books: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  movies: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  shareBooks?: Maybe<Scalars['Boolean']['output']>;
  shareMovies?: Maybe<Scalars['Boolean']['output']>;
  total: Scalars['Int']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Book: ResolverTypeWrapper<Book>;
  BookContent: BookContent;
  BookKind: BookKind;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieContent: MovieContent;
  MovieInfo: ResolverTypeWrapper<MovieInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterData: RegisterData;
  SettingsData: SettingsData;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserStats: ResolverTypeWrapper<UserStats>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Book: Book;
  BookContent: BookContent;
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: Movie;
  MovieContent: MovieContent;
  MovieInfo: MovieInfo;
  Mutation: {};
  Query: {};
  RegisterData: RegisterData;
  SettingsData: SettingsData;
  String: Scalars['String']['output'];
  User: User;
  UserStats: UserStats;
}>;

export type BookResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mode?: Resolver<ResolversTypes['BookKind'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookKindResolvers = { AUDIO: 'a', MIXED: 'r-a', REGULAR: 'r' };

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MovieResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  completed?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdbId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieInfoResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['MovieInfo'] = ResolversParentTypes['MovieInfo']> = ResolversObject<{
  found?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  plot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationCreateBookArgs, 'bookContent' | 'userId'>>;
  createMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<MutationCreateMovieArgs, 'movieContent' | 'userId'>>;
  deleteBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationDeleteBookArgs, 'id' | 'userId'>>;
  deleteMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id' | 'userId'>>;
  register?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'captchaToken' | 'registerData'>>;
  updateBook?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<MutationUpdateBookArgs, 'bookContent' | 'id' | 'userId'>>;
  updateMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id' | 'movieContent' | 'userId'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'settings'>>;
}>;

export type QueryResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType, RequireFields<QueryBooksArgs, 'userId'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryLoginArgs>>;
  movieInfo?: Resolver<Maybe<ResolversTypes['MovieInfo']>, ParentType, ContextType, RequireFields<QueryMovieInfoArgs, 'id'>>;
  movies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Movie']>>>, ParentType, ContextType, RequireFields<QueryMoviesArgs, 'userId'>>;
  people?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserStats']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type UserResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  salt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shareBooks?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shareMovies?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserStatsResolvers<ContextType = IContextValue, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = ResolversObject<{
  books?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  movies?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shareBooks?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shareMovies?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContextValue> = ResolversObject<{
  Book?: BookResolvers<ContextType>;
  BookKind?: BookKindResolvers;
  Date?: GraphQLScalarType;
  Movie?: MovieResolvers<ContextType>;
  MovieInfo?: MovieInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
}>;

