import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Country as CountryModel } from '@prisma/client';
import { MyContext } from './context';
export type Maybe<T> = T extends PromiseLike<infer U> ? Promise<U | null> : T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
};

export type Country = {
  __typename?: 'Country';
  /** The name of the country. */
  name: Scalars['String'];
  /**
   * The two-letter code (ISO Alpha-2) designated to the country.
   * Examples: US (for United States), and PH (for Philippines).
   */
  iso2: Scalars['ID'];
  /**
   * The three-letter code (ISO Alpha-2) designated to the country.
   * Examples: USA (for United States), and PHL (for Philippines).
   */
  iso3: Scalars['ID'];
  /**
   * The three-digit code (ISO numeric) designated to the country.
   * Examples: 236 (for United States), and 020 (for Andora).
   */
  numeric_code: Scalars['ID'];
  /** The dialing code of the country. */
  phone_code: Scalars['String'];
  /** The capital city of the country. */
  capital: Scalars['String'];
  /** The currency of the country. */
  currency: Scalars['String'];
  /** The currency symbol of the country. */
  currency_symbol: Scalars['String'];
  /** The top-level domain of the country. */
  tld: Scalars['String'];
  /** The native name of the country. */
  native: Scalars['String'];
  /** The region where the country is located. */
  region: Scalars['String'];
  /** The subregion where the country is located. */
  subregion: Scalars['String'];
  /** The timezones in the country. */
  timezones: Array<Timezone>;
  /** The translation of the country's name in several languages. */
  translations: Scalars['JSONObject'];
  /** The latitude of the country. */
  latitude: Scalars['Float'];
  /** The longitude of the country. */
  longitude: Scalars['Float'];
  /** The emoji flag of the country. */
  emoji: Scalars['String'];
  /** The unicode of the country's emoji flag. */
  emojiU: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  country?: Maybe<Country>;
  countries: Array<Country>;
};


export type QueryCountryArgs = {
  iso2?: Maybe<Scalars['ID']>;
  iso3?: Maybe<Scalars['ID']>;
  numeric_code?: Maybe<Scalars['ID']>;
};


export type QueryCountriesArgs = {
  count: Scalars['Int'];
};

export type Timezone = {
  __typename?: 'Timezone';
  zone_name: Scalars['String'];
  gmt_offset: Scalars['Int'];
  gmt_offset_name: Scalars['String'];
  abbreviation: Scalars['String'];
  timezone_name: Scalars['String'];
  country_id: Scalars['Int'];
};



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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = {
  Country: ResolverTypeWrapper<CountryModel>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Timezone: ResolverTypeWrapper<Timezone>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Country: CountryModel;
  String: Scalars['String'];
  ID: Scalars['ID'];
  Float: Scalars['Float'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Query: {};
  Int: Scalars['Int'];
  Timezone: Timezone;
  Boolean: Scalars['Boolean'];
};

export type CountryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iso2?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  iso3?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numeric_code?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phone_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  capital?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency_symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tld?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  native?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subregion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timezones?: Resolver<Array<ResolversTypes['Timezone']>, ParentType, ContextType>;
  translations?: Resolver<ResolversTypes['JSONObject'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  emoji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emojiU?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryArgs, never>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountriesArgs, 'count'>>;
};

export type TimezoneResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Timezone'] = ResolversParentTypes['Timezone']> = {
  zone_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gmt_offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gmt_offset_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  abbreviation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timezone_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Country?: CountryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Timezone?: TimezoneResolvers<ContextType>;
};

