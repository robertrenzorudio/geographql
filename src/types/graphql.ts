import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Country as CountryModel, State as StateModel, City as CityModel } from '@prisma/client';
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

export type City = {
  __typename?: 'City';
  /** The id of the city. */
  id: Scalars['Int'];
  /** The name of the city. */
  name: Scalars['String'];
  /** The id of the state where the city is located. */
  state_id: Scalars['Int'];
  /**
   * The code designated to the state where
   * the city is located.
   */
  state_code: Scalars['String'];
  /** The id of the country where the city is located. */
  country_id: Scalars['Int'];
  /**
   * The ISO Alpha-2 code designated to the
   * country where the city is located.
   */
  country_code: Scalars['String'];
  /** The latitude coordinate of the city. */
  latitude: Scalars['Float'];
  /** The longitude coordinate of the city. */
  longitude: Scalars['Float'];
};

export type CityFilterInput = {
  /** Filter by country ISO Alpha-2 code. */
  ciso2: Scalars['ID'];
  /** Filter by state id withrin supplied csio2. */
  sid?: Maybe<Scalars['Int']>;
  /** Filter by state code within supplied csio2. */
  siso?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  /** The id of the country. */
  id: Scalars['Int'];
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
  /** Get a list of states/provinces/regions within the country. */
  states: Array<State>;
  /** Get a list of cities within the country. */
  cities: Array<State>;
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


export type CountryStatesArgs = {
  page?: Maybe<PaginationInput>;
};


export type CountryCitiesArgs = {
  filter?: Maybe<CountryCitiesFilterInput>;
  page?: Maybe<PaginationInput>;
};

export type CountryCitiesFilterInput = {
  /** Filter by state id. */
  sid?: Maybe<Scalars['Int']>;
  /** Filter by state code. */
  siso?: Maybe<Scalars['String']>;
};

export type CountryFilterInput = {
  /** Filter by region. */
  region?: Maybe<Scalars['String']>;
  /** Filter by subregion. */
  subregion?: Maybe<Scalars['String']>;
};

export type PaginationInput = {
  page: Scalars['Int'];
  size: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Get a list of cities. */
  cities: Array<City>;
  /** Get a specific city by id. */
  city?: Maybe<City>;
  /**
   * Get a list of states by page number and size.
   * Default: page = 0, size = 100.
   */
  countries: Array<Country>;
  /** Get a specific country by id, iso2, iso3, or numeric_code. */
  country?: Maybe<Country>;
  /** Get a specific state by id or by state_code and country_code pair. */
  state?: Maybe<State>;
  /** Get a list of states by page number and size. */
  states: Array<State>;
};


export type QueryCitiesArgs = {
  filter?: Maybe<CityFilterInput>;
  page?: Maybe<PaginationInput>;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryCountriesArgs = {
  filter?: Maybe<CountryFilterInput>;
  page?: Maybe<PaginationInput>;
};


export type QueryCountryArgs = {
  id?: Maybe<Scalars['Int']>;
  iso2?: Maybe<Scalars['ID']>;
  iso3?: Maybe<Scalars['ID']>;
  numeric_code?: Maybe<Scalars['ID']>;
};


export type QueryStateArgs = {
  id?: Maybe<Scalars['Int']>;
  locationCode?: Maybe<StateCountryCodeInput>;
};


export type QueryStatesArgs = {
  filter?: Maybe<StateFilterInput>;
  page?: Maybe<PaginationInput>;
};

export type State = {
  __typename?: 'State';
  /** The id of the state. */
  id: Scalars['Int'];
  /** The name of the state. */
  name: Scalars['String'];
  /**
   * The code designated to the state.
   * Code is unique within the country.
   */
  state_code: Scalars['String'];
  /**
   * The id of the country where the
   * the state is located.
   */
  country_id: Scalars['Int'];
  /**
   * The ISO Alpha-2 code designated to the
   * country where the state is located.
   */
  country_code: Scalars['String'];
  /** Get a list of cities within the state. */
  cities: Array<City>;
  /** The latitude of the state. */
  latitude?: Maybe<Scalars['Float']>;
  /** The longitude of the state. */
  longitude?: Maybe<Scalars['Float']>;
};


export type StateCitiesArgs = {
  page?: Maybe<PaginationInput>;
};

export type StateCountryCodeInput = {
  state_code: Scalars['String'];
  country_code: Scalars['String'];
};

export type StateFilterInput = {
  /** Filter by country id */
  cid?: Maybe<Scalars['Int']>;
  /** Filter by country code */
  ciso2?: Maybe<Scalars['String']>;
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
  City: ResolverTypeWrapper<CityModel>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CityFilterInput: CityFilterInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Country: ResolverTypeWrapper<CountryModel>;
  CountryCitiesFilterInput: CountryCitiesFilterInput;
  CountryFilterInput: CountryFilterInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  PaginationInput: PaginationInput;
  Query: ResolverTypeWrapper<{}>;
  State: ResolverTypeWrapper<StateModel>;
  StateCountryCodeInput: StateCountryCodeInput;
  StateFilterInput: StateFilterInput;
  Timezone: ResolverTypeWrapper<Timezone>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  City: CityModel;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Float: Scalars['Float'];
  CityFilterInput: CityFilterInput;
  ID: Scalars['ID'];
  Country: CountryModel;
  CountryCitiesFilterInput: CountryCitiesFilterInput;
  CountryFilterInput: CountryFilterInput;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  PaginationInput: PaginationInput;
  Query: {};
  State: StateModel;
  StateCountryCodeInput: StateCountryCodeInput;
  StateFilterInput: StateFilterInput;
  Timezone: Timezone;
  Boolean: Scalars['Boolean'];
};

export type CityResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  state_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  country_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iso2?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  iso3?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numeric_code?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  phone_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  states?: Resolver<Array<ResolversTypes['State']>, ParentType, ContextType, RequireFields<CountryStatesArgs, never>>;
  cities?: Resolver<Array<ResolversTypes['State']>, ParentType, ContextType, RequireFields<CountryCitiesArgs, never>>;
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
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCitiesArgs, never>>;
  city?: Resolver<Maybe<ResolversTypes['City']>, ParentType, ContextType, RequireFields<QueryCityArgs, 'id'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountriesArgs, never>>;
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<QueryCountryArgs, never>>;
  state?: Resolver<Maybe<ResolversTypes['State']>, ParentType, ContextType, RequireFields<QueryStateArgs, never>>;
  states?: Resolver<Array<ResolversTypes['State']>, ParentType, ContextType, RequireFields<QueryStatesArgs, never>>;
};

export type StateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['State'] = ResolversParentTypes['State']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  country_code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cities?: Resolver<Array<ResolversTypes['City']>, ParentType, ContextType, RequireFields<StateCitiesArgs, never>>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  City?: CityResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  State?: StateResolvers<ContextType>;
  Timezone?: TimezoneResolvers<ContextType>;
};

