/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Call
 *
 */
export type Call = $Result.DefaultSelection<Prisma.$CallPayload>;
/**
 * Model Message
 *
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>;
/**
 * Model ScheduledCall
 *
 */
export type ScheduledCall =
  $Result.DefaultSelection<Prisma.$ScheduledCallPayload>;
/**
 * Model Review
 *
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
    USER: "USER";
    ADMIN: "ADMIN";
    EXPERT: "EXPERT";
  };

  export type Role = (typeof Role)[keyof typeof Role];

  export const BookingStatus: {
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
  };

  export type BookingStatus =
    (typeof BookingStatus)[keyof typeof BookingStatus];

  export const PaymentStatus: {
    PENDING: "PENDING";
    PAID: "PAID";
    FAILED: "FAILED";
  };

  export type PaymentStatus =
    (typeof PaymentStatus)[keyof typeof PaymentStatus];

  export const CallType: {
    AUDIO: "AUDIO";
    VIDEO: "VIDEO";
  };

  export type CallType = (typeof CallType)[keyof typeof CallType];

  export const Plan: {
    FREE: "FREE";
    PRO: "PRO";
    ENTERPRISE: "ENTERPRISE";
  };

  export type Plan = (typeof Plan)[keyof typeof Plan];

  export const CallStatus: {
    ONGOING: "ONGOING";
    COMPLETED: "COMPLETED";
    MISSED: "MISSED";
    CANCELED: "CANCELED";
  };

  export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];

  export const MessageType: {
    TEXT: "TEXT";
    IMAGE: "IMAGE";
    FILE: "FILE";
  };

  export type MessageType = (typeof MessageType)[keyof typeof MessageType];

  export const MessageStatus: {
    SENT: "SENT";
    DELIVERED: "DELIVERED";
    READ: "READ";
  };

  export type MessageStatus =
    (typeof MessageStatus)[keyof typeof MessageStatus];

  export const ScheduledCallStatus: {
    PENDING: "PENDING";
    CONFIRMED: "CONFIRMED";
    CANCELED: "CANCELED";
    COMPLETED: "COMPLETED";
  };

  export type ScheduledCallStatus =
    (typeof ScheduledCallStatus)[keyof typeof ScheduledCallStatus];
}

export type Role = $Enums.Role;

export const Role: typeof $Enums.Role;

export type BookingStatus = $Enums.BookingStatus;

export const BookingStatus: typeof $Enums.BookingStatus;

export type PaymentStatus = $Enums.PaymentStatus;

export const PaymentStatus: typeof $Enums.PaymentStatus;

export type CallType = $Enums.CallType;

export const CallType: typeof $Enums.CallType;

export type Plan = $Enums.Plan;

export const Plan: typeof $Enums.Plan;

export type CallStatus = $Enums.CallStatus;

export const CallStatus: typeof $Enums.CallStatus;

export type MessageType = $Enums.MessageType;

export const MessageType: typeof $Enums.MessageType;

export type MessageStatus = $Enums.MessageStatus;

export const MessageStatus: typeof $Enums.MessageStatus;

export type ScheduledCallStatus = $Enums.ScheduledCallStatus;

export const ScheduledCallStatus: typeof $Enums.ScheduledCallStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: unknown[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: unknown[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: unknown[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: unknown[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<unknown>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.call`: Exposes CRUD operations for the **Call** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Calls
   * const calls = await prisma.call.findMany()
   * ```
   */
  get call(): Prisma.CallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduledCall`: Exposes CRUD operations for the **ScheduledCall** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ScheduledCalls
   * const scheduledCalls = await prisma.scheduledCall.findMany()
   * ```
   */
  get scheduledCall(): Prisma.ScheduledCallDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Reviews
   * const reviews = await prisma.review.findMany()
   * ```
   */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: unknown;
    include: unknown;
  };

  type SelectAndOmit = {
    select: unknown;
    omit: unknown;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<unknown>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: unknown) => $Utils.JsPromise<unknown>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
      ? "Please either choose `select` or `omit`."
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends unknown> =
    T extends Array<unknown>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends bigint
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = unknown;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends unknown> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof unknown, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends unknown, A2 extends unknown> = [A1] extends [
    never,
  ]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly unknown[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends unknown[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Call: "Call";
    Message: "Message";
    ScheduledCall: "ScheduledCall";
    Review: "Review";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, unknown>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "user" | "call" | "message" | "scheduledCall" | "review";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Call: {
        payload: Prisma.$CallPayload<ExtArgs>;
        fields: Prisma.CallFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CallFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CallFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          findFirst: {
            args: Prisma.CallFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CallFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          findMany: {
            args: Prisma.CallFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[];
          };
          create: {
            args: Prisma.CallCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          createMany: {
            args: Prisma.CallCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CallCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[];
          };
          delete: {
            args: Prisma.CallDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          update: {
            args: Prisma.CallUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          deleteMany: {
            args: Prisma.CallDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CallUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CallUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>[];
          };
          upsert: {
            args: Prisma.CallUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CallPayload>;
          };
          aggregate: {
            args: Prisma.CallAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCall>;
          };
          groupBy: {
            args: Prisma.CallGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CallGroupByOutputType>[];
          };
          count: {
            args: Prisma.CallCountArgs<ExtArgs>;
            result: $Utils.Optional<CallCountAggregateOutputType> | number;
          };
        };
      };
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>;
        fields: Prisma.MessageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMessage>;
          };
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MessageGroupByOutputType>[];
          };
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>;
            result: $Utils.Optional<MessageCountAggregateOutputType> | number;
          };
        };
      };
      ScheduledCall: {
        payload: Prisma.$ScheduledCallPayload<ExtArgs>;
        fields: Prisma.ScheduledCallFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ScheduledCallFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ScheduledCallFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          findFirst: {
            args: Prisma.ScheduledCallFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ScheduledCallFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          findMany: {
            args: Prisma.ScheduledCallFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>[];
          };
          create: {
            args: Prisma.ScheduledCallCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          createMany: {
            args: Prisma.ScheduledCallCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ScheduledCallCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>[];
          };
          delete: {
            args: Prisma.ScheduledCallDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          update: {
            args: Prisma.ScheduledCallUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          deleteMany: {
            args: Prisma.ScheduledCallDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ScheduledCallUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ScheduledCallUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>[];
          };
          upsert: {
            args: Prisma.ScheduledCallUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ScheduledCallPayload>;
          };
          aggregate: {
            args: Prisma.ScheduledCallAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateScheduledCall>;
          };
          groupBy: {
            args: Prisma.ScheduledCallGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ScheduledCallGroupByOutputType>[];
          };
          count: {
            args: Prisma.ScheduledCallCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ScheduledCallCountAggregateOutputType>
              | number;
          };
        };
      };
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>;
        fields: Prisma.ReviewFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[];
          };
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[];
          };
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[];
          };
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>;
          };
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateReview>;
          };
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ReviewGroupByOutputType>[];
          };
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>;
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: unknown;
      operations: {
        $executeRaw: {
          args: [
            query: TemplateStringsArray | Prisma.Sql,
            ...values: unknown[],
          ];
          result: unknown;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: unknown[]];
          result: unknown;
        };
        $queryRaw: {
          args: [
            query: TemplateStringsArray | Prisma.Sql,
            ...values: unknown[],
          ];
          result: unknown;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: unknown[]];
          result: unknown;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    call?: CallOmit;
    message?: MessageOmit;
    scheduledCall?: ScheduledCallOmit;
    review?: ReviewOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends unknown> =
    T extends Array<LogLevel | LogDefinition>
      ?
          | GetLogType<T[0]>
          | GetLogType<T[1]>
          | GetLogType<T[2]>
          | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: unknown;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = unknown> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    userCalls: number;
    expertCalls: number;
    scheduledCalls: number;
    expertSchedules: number;
    sentMessages: number;
    receivedMessages: number;
    reviewsGiven: number;
    reviewsReceived: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    userCalls?: boolean | UserCountOutputTypeCountUserCallsArgs;
    expertCalls?: boolean | UserCountOutputTypeCountExpertCallsArgs;
    scheduledCalls?: boolean | UserCountOutputTypeCountScheduledCallsArgs;
    expertSchedules?: boolean | UserCountOutputTypeCountExpertSchedulesArgs;
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs;
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs;
    reviewsGiven?: boolean | UserCountOutputTypeCountReviewsGivenArgs;
    reviewsReceived?: boolean | UserCountOutputTypeCountReviewsReceivedArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CallWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpertCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CallWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScheduledCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ScheduledCallWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpertSchedulesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ScheduledCallWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsGivenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReviewWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsReceivedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReviewWhereInput;
  };

  /**
   * Count Type CallCountOutputType
   */

  export type CallCountOutputType = {
    ScheduledCall: number;
  };

  export type CallCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ScheduledCall?: boolean | CallCountOutputTypeCountScheduledCallArgs;
  };

  // Custom InputTypes
  /**
   * CallCountOutputType without action
   */
  export type CallCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the CallCountOutputType
     */
    select?: CallCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CallCountOutputType without action
   */
  export type CallCountOutputTypeCountScheduledCallArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ScheduledCallWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    firstName: string | null;
    lastName: string | null;
    updatedAt: Date | null;
    gender: string | null;
    bio: string | null;
    externalId: string | null;
    expertise: string | null;
    profilePic: string | null;
    phone: string | null;
    username: string | null;
    certifications: string | null;
    yearsOfExperience: string | null;
    availability: string | null;
    hourlyRate: string | null;
    interests: string | null;
    preferences: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    firstName: string | null;
    lastName: string | null;
    updatedAt: Date | null;
    gender: string | null;
    bio: string | null;
    externalId: string | null;
    expertise: string | null;
    profilePic: string | null;
    phone: string | null;
    username: string | null;
    certifications: string | null;
    yearsOfExperience: string | null;
    availability: string | null;
    hourlyRate: string | null;
    interests: string | null;
    preferences: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    role: number;
    createdAt: number;
    firstName: number;
    lastName: number;
    updatedAt: number;
    gender: number;
    bio: number;
    externalId: number;
    expertise: number;
    profilePic: number;
    phone: number;
    username: number;
    certifications: number;
    yearsOfExperience: number;
    availability: number;
    hourlyRate: number;
    interests: number;
    preferences: number;
    skills: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    firstName?: true;
    lastName?: true;
    updatedAt?: true;
    gender?: true;
    bio?: true;
    externalId?: true;
    expertise?: true;
    profilePic?: true;
    phone?: true;
    username?: true;
    certifications?: true;
    yearsOfExperience?: true;
    availability?: true;
    hourlyRate?: true;
    interests?: true;
    preferences?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    firstName?: true;
    lastName?: true;
    updatedAt?: true;
    gender?: true;
    bio?: true;
    externalId?: true;
    expertise?: true;
    profilePic?: true;
    phone?: true;
    username?: true;
    certifications?: true;
    yearsOfExperience?: true;
    availability?: true;
    hourlyRate?: true;
    interests?: true;
    preferences?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    createdAt?: true;
    firstName?: true;
    lastName?: true;
    updatedAt?: true;
    gender?: true;
    bio?: true;
    externalId?: true;
    expertise?: true;
    profilePic?: true;
    phone?: true;
    username?: true;
    certifications?: true;
    yearsOfExperience?: true;
    availability?: true;
    hourlyRate?: true;
    interests?: true;
    preferences?: true;
    skills?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    role: $Enums.Role | null;
    createdAt: Date;
    firstName: string | null;
    lastName: string | null;
    updatedAt: Date;
    gender: string | null;
    bio: string | null;
    externalId: string | null;
    expertise: string | null;
    profilePic: string | null;
    phone: string | null;
    username: string | null;
    certifications: string | null;
    yearsOfExperience: string | null;
    availability: string | null;
    hourlyRate: string | null;
    interests: string | null;
    preferences: string | null;
    skills: string[];
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      role?: boolean;
      createdAt?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      updatedAt?: boolean;
      gender?: boolean;
      bio?: boolean;
      externalId?: boolean;
      expertise?: boolean;
      profilePic?: boolean;
      phone?: boolean;
      username?: boolean;
      certifications?: boolean;
      yearsOfExperience?: boolean;
      availability?: boolean;
      hourlyRate?: boolean;
      interests?: boolean;
      preferences?: boolean;
      skills?: boolean;
      userCalls?: boolean | User$userCallsArgs<ExtArgs>;
      expertCalls?: boolean | User$expertCallsArgs<ExtArgs>;
      scheduledCalls?: boolean | User$scheduledCallsArgs<ExtArgs>;
      expertSchedules?: boolean | User$expertSchedulesArgs<ExtArgs>;
      sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>;
      receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>;
      reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>;
      reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      role?: boolean;
      createdAt?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      updatedAt?: boolean;
      gender?: boolean;
      bio?: boolean;
      externalId?: boolean;
      expertise?: boolean;
      profilePic?: boolean;
      phone?: boolean;
      username?: boolean;
      certifications?: boolean;
      yearsOfExperience?: boolean;
      availability?: boolean;
      hourlyRate?: boolean;
      interests?: boolean;
      preferences?: boolean;
      skills?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      role?: boolean;
      createdAt?: boolean;
      firstName?: boolean;
      lastName?: boolean;
      updatedAt?: boolean;
      gender?: boolean;
      bio?: boolean;
      externalId?: boolean;
      expertise?: boolean;
      profilePic?: boolean;
      phone?: boolean;
      username?: boolean;
      certifications?: boolean;
      yearsOfExperience?: boolean;
      availability?: boolean;
      hourlyRate?: boolean;
      interests?: boolean;
      preferences?: boolean;
      skills?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    role?: boolean;
    createdAt?: boolean;
    firstName?: boolean;
    lastName?: boolean;
    updatedAt?: boolean;
    gender?: boolean;
    bio?: boolean;
    externalId?: boolean;
    expertise?: boolean;
    profilePic?: boolean;
    phone?: boolean;
    username?: boolean;
    certifications?: boolean;
    yearsOfExperience?: boolean;
    availability?: boolean;
    hourlyRate?: boolean;
    interests?: boolean;
    preferences?: boolean;
    skills?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "email"
    | "role"
    | "createdAt"
    | "firstName"
    | "lastName"
    | "updatedAt"
    | "gender"
    | "bio"
    | "externalId"
    | "expertise"
    | "profilePic"
    | "phone"
    | "username"
    | "certifications"
    | "yearsOfExperience"
    | "availability"
    | "hourlyRate"
    | "interests"
    | "preferences"
    | "skills",
    ExtArgs["result"]["user"]
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    userCalls?: boolean | User$userCallsArgs<ExtArgs>;
    expertCalls?: boolean | User$expertCallsArgs<ExtArgs>;
    scheduledCalls?: boolean | User$scheduledCallsArgs<ExtArgs>;
    expertSchedules?: boolean | User$expertSchedulesArgs<ExtArgs>;
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>;
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>;
    reviewsGiven?: boolean | User$reviewsGivenArgs<ExtArgs>;
    reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "User";
    objects: {
      userCalls: Prisma.$CallPayload<ExtArgs>[];
      expertCalls: Prisma.$CallPayload<ExtArgs>[];
      scheduledCalls: Prisma.$ScheduledCallPayload<ExtArgs>[];
      expertSchedules: Prisma.$ScheduledCallPayload<ExtArgs>[];
      sentMessages: Prisma.$MessagePayload<ExtArgs>[];
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[];
      reviewsGiven: Prisma.$ReviewPayload<ExtArgs>[];
      reviewsReceived: Prisma.$ReviewPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        role: $Enums.Role | null;
        createdAt: Date;
        firstName: string | null;
        lastName: string | null;
        updatedAt: Date;
        gender: string | null;
        bio: string | null;
        externalId: string | null;
        expertise: string | null;
        profilePic: string | null;
        phone: string | null;
        username: string | null;
        certifications: string | null;
        yearsOfExperience: string | null;
        availability: string | null;
        hourlyRate: string | null;
        interests: string | null;
        preferences: string | null;
        skills: string[];
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", unknown>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ' in "having" needs to be provided in "by"',
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userCalls<T extends User$userCallsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$userCallsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$CallPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    expertCalls<T extends User$expertCallsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$expertCallsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$CallPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    scheduledCalls<T extends User$scheduledCallsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$scheduledCallsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ScheduledCallPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    expertSchedules<T extends User$expertSchedulesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$expertSchedulesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ScheduledCallPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sentMessagesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    reviewsGiven<T extends User$reviewsGivenArgs<ExtArgs> = {}>(
      args?: Subset<T, User$reviewsGivenArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ReviewPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    reviewsReceived<T extends User$reviewsReceivedArgs<ExtArgs> = {}>(
      args?: Subset<T, User$reviewsReceivedArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ReviewPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: unknown) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly role: FieldRef<"User", "Role">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly firstName: FieldRef<"User", "String">;
    readonly lastName: FieldRef<"User", "String">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
    readonly gender: FieldRef<"User", "String">;
    readonly bio: FieldRef<"User", "String">;
    readonly externalId: FieldRef<"User", "String">;
    readonly expertise: FieldRef<"User", "String">;
    readonly profilePic: FieldRef<"User", "String">;
    readonly phone: FieldRef<"User", "String">;
    readonly username: FieldRef<"User", "String">;
    readonly certifications: FieldRef<"User", "String">;
    readonly yearsOfExperience: FieldRef<"User", "String">;
    readonly availability: FieldRef<"User", "String">;
    readonly hourlyRate: FieldRef<"User", "String">;
    readonly interests: FieldRef<"User", "String">;
    readonly preferences: FieldRef<"User", "String">;
    readonly skills: FieldRef<"User", "String[]">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.userCalls
   */
  export type User$userCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    where?: CallWhereInput;
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    cursor?: CallWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[];
  };

  /**
   * User.expertCalls
   */
  export type User$expertCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    where?: CallWhereInput;
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    cursor?: CallWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[];
  };

  /**
   * User.scheduledCalls
   */
  export type User$scheduledCallsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    where?: ScheduledCallWhereInput;
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    cursor?: ScheduledCallWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * User.expertSchedules
   */
  export type User$expertSchedulesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    where?: ScheduledCallWhereInput;
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    cursor?: ScheduledCallWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * User.reviewsGiven
   */
  export type User$reviewsGivenArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    where?: ReviewWhereInput;
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    cursor?: ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[];
  };

  /**
   * User.reviewsReceived
   */
  export type User$reviewsReceivedArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    where?: ReviewWhereInput;
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    cursor?: ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Call
   */

  export type AggregateCall = {
    _count: CallCountAggregateOutputType | null;
    _avg: CallAvgAggregateOutputType | null;
    _sum: CallSumAggregateOutputType | null;
    _min: CallMinAggregateOutputType | null;
    _max: CallMaxAggregateOutputType | null;
  };

  export type CallAvgAggregateOutputType = {
    duration: number | null;
  };

  export type CallSumAggregateOutputType = {
    duration: number | null;
  };

  export type CallMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    callType: $Enums.CallType | null;
    duration: number | null;
    status: $Enums.CallStatus | null;
    startedAt: Date | null;
    endedAt: Date | null;
  };

  export type CallMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    callType: $Enums.CallType | null;
    duration: number | null;
    status: $Enums.CallStatus | null;
    startedAt: Date | null;
    endedAt: Date | null;
  };

  export type CallCountAggregateOutputType = {
    id: number;
    userId: number;
    expertId: number;
    callType: number;
    duration: number;
    status: number;
    startedAt: number;
    endedAt: number;
    _all: number;
  };

  export type CallAvgAggregateInputType = {
    duration?: true;
  };

  export type CallSumAggregateInputType = {
    duration?: true;
  };

  export type CallMinAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    duration?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
  };

  export type CallMaxAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    duration?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
  };

  export type CallCountAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    duration?: true;
    status?: true;
    startedAt?: true;
    endedAt?: true;
    _all?: true;
  };

  export type CallAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Call to aggregate.
     */
    where?: CallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Calls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Calls
     **/
    _count?: true | CallCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: CallAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: CallSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CallMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CallMaxAggregateInputType;
  };

  export type GetCallAggregateType<T extends CallAggregateArgs> = {
    [P in keyof T & keyof AggregateCall]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall[P]>
      : GetScalarType<T[P], AggregateCall[P]>;
  };

  export type CallGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: CallWhereInput;
    orderBy?:
      | CallOrderByWithAggregationInput
      | CallOrderByWithAggregationInput[];
    by: CallScalarFieldEnum[] | CallScalarFieldEnum;
    having?: CallScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CallCountAggregateInputType | true;
    _avg?: CallAvgAggregateInputType;
    _sum?: CallSumAggregateInputType;
    _min?: CallMinAggregateInputType;
    _max?: CallMaxAggregateInputType;
  };

  export type CallGroupByOutputType = {
    id: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date;
    endedAt: Date | null;
    _count: CallCountAggregateOutputType | null;
    _avg: CallAvgAggregateOutputType | null;
    _sum: CallSumAggregateOutputType | null;
    _min: CallMinAggregateOutputType | null;
    _max: CallMaxAggregateOutputType | null;
  };

  type GetCallGroupByPayload<T extends CallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof CallGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], CallGroupByOutputType[P]>
          : GetScalarType<T[P], CallGroupByOutputType[P]>;
      }
    >
  >;

  export type CallSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      duration?: boolean;
      status?: boolean;
      startedAt?: boolean;
      endedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
      ScheduledCall?: boolean | Call$ScheduledCallArgs<ExtArgs>;
      _count?: boolean | CallCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["call"]
  >;

  export type CallSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      duration?: boolean;
      status?: boolean;
      startedAt?: boolean;
      endedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["call"]
  >;

  export type CallSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      duration?: boolean;
      status?: boolean;
      startedAt?: boolean;
      endedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["call"]
  >;

  export type CallSelectScalar = {
    id?: boolean;
    userId?: boolean;
    expertId?: boolean;
    callType?: boolean;
    duration?: boolean;
    status?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
  };

  export type CallOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "expertId"
    | "callType"
    | "duration"
    | "status"
    | "startedAt"
    | "endedAt",
    ExtArgs["result"]["call"]
  >;
  export type CallInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
    ScheduledCall?: boolean | Call$ScheduledCallArgs<ExtArgs>;
    _count?: boolean | CallCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CallIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type CallIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $CallPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Call";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      expert: Prisma.$UserPayload<ExtArgs>;
      ScheduledCall: Prisma.$ScheduledCallPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        expertId: string;
        callType: $Enums.CallType;
        duration: number;
        status: $Enums.CallStatus;
        startedAt: Date;
        endedAt: Date | null;
      },
      ExtArgs["result"]["call"]
    >;
    composites: {};
  };

  type CallGetPayload<S extends boolean | null | undefined | CallDefaultArgs> =
    $Result.GetResult<Prisma.$CallPayload, S>;

  type CallCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<CallFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: CallCountAggregateInputType | true;
  };

  export interface CallDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Call"];
      meta: { name: "Call" };
    };
    /**
     * Find zero or one Call that matches the filter.
     * @param {CallFindUniqueArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallFindUniqueArgs>(
      args: SelectSubset<T, CallFindUniqueArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Call that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallFindUniqueOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CallFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Call that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindFirstArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallFindFirstArgs>(
      args?: SelectSubset<T, CallFindFirstArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Call that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindFirstOrThrowArgs} args - Arguments to find a Call
     * @example
     * // Get one Call
     * const call = await prisma.call.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CallFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calls
     * const calls = await prisma.call.findMany()
     *
     * // Get first 10 Calls
     * const calls = await prisma.call.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const callWithIdOnly = await prisma.call.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CallFindManyArgs>(
      args?: SelectSubset<T, CallFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Call.
     * @param {CallCreateArgs} args - Arguments to create a Call.
     * @example
     * // Create one Call
     * const Call = await prisma.call.create({
     *   data: {
     *     // ... data to create a Call
     *   }
     * })
     *
     */
    create<T extends CallCreateArgs>(
      args: SelectSubset<T, CallCreateArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Calls.
     * @param {CallCreateManyArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CallCreateManyArgs>(
      args?: SelectSubset<T, CallCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Calls and returns the data saved in the database.
     * @param {CallCreateManyAndReturnArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const call = await prisma.call.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Calls and only return the `id`
     * const callWithIdOnly = await prisma.call.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CallCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CallCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Call.
     * @param {CallDeleteArgs} args - Arguments to delete one Call.
     * @example
     * // Delete one Call
     * const Call = await prisma.call.delete({
     *   where: {
     *     // ... filter to delete one Call
     *   }
     * })
     *
     */
    delete<T extends CallDeleteArgs>(
      args: SelectSubset<T, CallDeleteArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Call.
     * @param {CallUpdateArgs} args - Arguments to update one Call.
     * @example
     * // Update one Call
     * const call = await prisma.call.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CallUpdateArgs>(
      args: SelectSubset<T, CallUpdateArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Calls.
     * @param {CallDeleteManyArgs} args - Arguments to filter Calls to delete.
     * @example
     * // Delete a few Calls
     * const { count } = await prisma.call.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CallDeleteManyArgs>(
      args?: SelectSubset<T, CallDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CallUpdateManyArgs>(
      args: SelectSubset<T, CallUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Calls and returns the data updated in the database.
     * @param {CallUpdateManyAndReturnArgs} args - Arguments to update many Calls.
     * @example
     * // Update many Calls
     * const call = await prisma.call.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Calls and only return the `id`
     * const callWithIdOnly = await prisma.call.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CallUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CallUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Call.
     * @param {CallUpsertArgs} args - Arguments to update or create a Call.
     * @example
     * // Update or create a Call
     * const call = await prisma.call.upsert({
     *   create: {
     *     // ... data to create a Call
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call we want to update
     *   }
     * })
     */
    upsert<T extends CallUpsertArgs>(
      args: SelectSubset<T, CallUpsertArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallCountArgs} args - Arguments to filter Calls to count.
     * @example
     * // Count the number of Calls
     * const count = await prisma.call.count({
     *   where: {
     *     // ... the filter for the Calls we want to count
     *   }
     * })
     **/
    count<T extends CallCountArgs>(
      args?: Subset<T, CallCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", unknown>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CallCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CallAggregateArgs>(
      args: Subset<T, CallAggregateArgs>
    ): Prisma.PrismaPromise<GetCallAggregateType<T>>;

    /**
     * Group by Call.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallGroupByArgs["orderBy"] }
        : { orderBy?: CallGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ' in "having" needs to be provided in "by"',
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, CallGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetCallGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Call model
     */
    readonly fields: CallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Call.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    expert<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    ScheduledCall<T extends Call$ScheduledCallArgs<ExtArgs> = {}>(
      args?: Subset<T, Call$ScheduledCallArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ScheduledCallPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: unknown) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Call model
   */
  interface CallFieldRefs {
    readonly id: FieldRef<"Call", "String">;
    readonly userId: FieldRef<"Call", "String">;
    readonly expertId: FieldRef<"Call", "String">;
    readonly callType: FieldRef<"Call", "CallType">;
    readonly duration: FieldRef<"Call", "Int">;
    readonly status: FieldRef<"Call", "CallStatus">;
    readonly startedAt: FieldRef<"Call", "DateTime">;
    readonly endedAt: FieldRef<"Call", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Call findUnique
   */
  export type CallFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter, which Call to fetch.
     */
    where: CallWhereUniqueInput;
  };

  /**
   * Call findUniqueOrThrow
   */
  export type CallFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter, which Call to fetch.
     */
    where: CallWhereUniqueInput;
  };

  /**
   * Call findFirst
   */
  export type CallFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter, which Call to fetch.
     */
    where?: CallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Calls.
     */
    cursor?: CallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Calls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[];
  };

  /**
   * Call findFirstOrThrow
   */
  export type CallFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter, which Call to fetch.
     */
    where?: CallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Calls.
     */
    cursor?: CallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Calls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Calls.
     */
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[];
  };

  /**
   * Call findMany
   */
  export type CallFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter, which Calls to fetch.
     */
    where?: CallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Calls to fetch.
     */
    orderBy?: CallOrderByWithRelationInput | CallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Calls.
     */
    cursor?: CallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Calls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Calls.
     */
    skip?: number;
    distinct?: CallScalarFieldEnum | CallScalarFieldEnum[];
  };

  /**
   * Call create
   */
  export type CallCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * The data needed to create a Call.
     */
    data: XOR<CallCreateInput, CallUncheckedCreateInput>;
  };

  /**
   * Call createMany
   */
  export type CallCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Calls.
     */
    data: CallCreateManyInput | CallCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Call createManyAndReturn
   */
  export type CallCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * The data used to create many Calls.
     */
    data: CallCreateManyInput | CallCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Call update
   */
  export type CallUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * The data needed to update a Call.
     */
    data: XOR<CallUpdateInput, CallUncheckedUpdateInput>;
    /**
     * Choose, which Call to update.
     */
    where: CallWhereUniqueInput;
  };

  /**
   * Call updateMany
   */
  export type CallUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Calls.
     */
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyInput>;
    /**
     * Filter which Calls to update
     */
    where?: CallWhereInput;
    /**
     * Limit how many Calls to update.
     */
    limit?: number;
  };

  /**
   * Call updateManyAndReturn
   */
  export type CallUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * The data used to update Calls.
     */
    data: XOR<CallUpdateManyMutationInput, CallUncheckedUpdateManyInput>;
    /**
     * Filter which Calls to update
     */
    where?: CallWhereInput;
    /**
     * Limit how many Calls to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Call upsert
   */
  export type CallUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * The filter to search for the Call to update in case it exists.
     */
    where: CallWhereUniqueInput;
    /**
     * In case the Call found by the `where` argument doesn't exist, create a new Call with this data.
     */
    create: XOR<CallCreateInput, CallUncheckedCreateInput>;
    /**
     * In case the Call was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallUpdateInput, CallUncheckedUpdateInput>;
  };

  /**
   * Call delete
   */
  export type CallDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    /**
     * Filter which Call to delete.
     */
    where: CallWhereUniqueInput;
  };

  /**
   * Call deleteMany
   */
  export type CallDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Calls to delete
     */
    where?: CallWhereInput;
    /**
     * Limit how many Calls to delete.
     */
    limit?: number;
  };

  /**
   * Call.ScheduledCall
   */
  export type Call$ScheduledCallArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    where?: ScheduledCallWhereInput;
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    cursor?: ScheduledCallWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * Call without action
   */
  export type CallDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
  };

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  export type MessageMinAggregateOutputType = {
    id: string | null;
    senderId: string | null;
    receiverId: string | null;
    messageType: $Enums.MessageType | null;
    content: string | null;
    mediaUrl: string | null;
    status: $Enums.MessageStatus | null;
    sentAt: Date | null;
    deliveredAt: Date | null;
    readAt: Date | null;
  };

  export type MessageMaxAggregateOutputType = {
    id: string | null;
    senderId: string | null;
    receiverId: string | null;
    messageType: $Enums.MessageType | null;
    content: string | null;
    mediaUrl: string | null;
    status: $Enums.MessageStatus | null;
    sentAt: Date | null;
    deliveredAt: Date | null;
    readAt: Date | null;
  };

  export type MessageCountAggregateOutputType = {
    id: number;
    senderId: number;
    receiverId: number;
    messageType: number;
    content: number;
    mediaUrl: number;
    status: number;
    sentAt: number;
    deliveredAt: number;
    readAt: number;
    _all: number;
  };

  export type MessageMinAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messageType?: true;
    content?: true;
    mediaUrl?: true;
    status?: true;
    sentAt?: true;
    deliveredAt?: true;
    readAt?: true;
  };

  export type MessageMaxAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messageType?: true;
    content?: true;
    mediaUrl?: true;
    status?: true;
    sentAt?: true;
    deliveredAt?: true;
    readAt?: true;
  };

  export type MessageCountAggregateInputType = {
    id?: true;
    senderId?: true;
    receiverId?: true;
    messageType?: true;
    content?: true;
    mediaUrl?: true;
    status?: true;
    sentAt?: true;
    deliveredAt?: true;
    readAt?: true;
    _all?: true;
  };

  export type MessageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Messages
     **/
    _count?: true | MessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MessageMaxAggregateInputType;
  };

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>;
  };

  export type MessageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithAggregationInput
      | MessageOrderByWithAggregationInput[];
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum;
    having?: MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
  };

  export type MessageGroupByOutputType = {
    id: string;
    senderId: string;
    receiverId: string;
    messageType: $Enums.MessageType;
    content: string | null;
    mediaUrl: string | null;
    status: $Enums.MessageStatus;
    sentAt: Date;
    deliveredAt: Date | null;
    readAt: Date | null;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MessageGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof MessageGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>;
        }
      >
    >;

  export type MessageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      senderId?: boolean;
      receiverId?: boolean;
      messageType?: boolean;
      content?: boolean;
      mediaUrl?: boolean;
      status?: boolean;
      sentAt?: boolean;
      deliveredAt?: boolean;
      readAt?: boolean;
      sender?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["message"]
  >;

  export type MessageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      senderId?: boolean;
      receiverId?: boolean;
      messageType?: boolean;
      content?: boolean;
      mediaUrl?: boolean;
      status?: boolean;
      sentAt?: boolean;
      deliveredAt?: boolean;
      readAt?: boolean;
      sender?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["message"]
  >;

  export type MessageSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      senderId?: boolean;
      receiverId?: boolean;
      messageType?: boolean;
      content?: boolean;
      mediaUrl?: boolean;
      status?: boolean;
      sentAt?: boolean;
      deliveredAt?: boolean;
      readAt?: boolean;
      sender?: boolean | UserDefaultArgs<ExtArgs>;
      receiver?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["message"]
  >;

  export type MessageSelectScalar = {
    id?: boolean;
    senderId?: boolean;
    receiverId?: boolean;
    messageType?: boolean;
    content?: boolean;
    mediaUrl?: boolean;
    status?: boolean;
    sentAt?: boolean;
    deliveredAt?: boolean;
    readAt?: boolean;
  };

  export type MessageOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "senderId"
    | "receiverId"
    | "messageType"
    | "content"
    | "mediaUrl"
    | "status"
    | "sentAt"
    | "deliveredAt"
    | "readAt",
    ExtArgs["result"]["message"]
  >;
  export type MessageInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sender?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sender?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sender?: boolean | UserDefaultArgs<ExtArgs>;
    receiver?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $MessagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Message";
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>;
      receiver: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        senderId: string;
        receiverId: string;
        messageType: $Enums.MessageType;
        content: string | null;
        mediaUrl: string | null;
        status: $Enums.MessageStatus;
        sentAt: Date;
        deliveredAt: Date | null;
        readAt: Date | null;
      },
      ExtArgs["result"]["message"]
    >;
    composites: {};
  };

  type MessageGetPayload<
    S extends boolean | null | undefined | MessageDefaultArgs,
  > = $Result.GetResult<Prisma.$MessagePayload, S>;

  type MessageCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<MessageFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: MessageCountAggregateInputType | true;
  };

  export interface MessageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Message"];
      meta: { name: "Message" };
    };
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     *
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MessageFindManyArgs>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     *
     */
    create<T extends MessageCreateArgs>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MessageCreateManyArgs>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     *
     */
    delete<T extends MessageDeleteArgs>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MessageUpdateArgs>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MessageDeleteManyArgs>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MessageUpdateManyArgs>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
     **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", unknown>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], MessageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MessageAggregateArgs>(
      args: Subset<T, MessageAggregateArgs>
    ): Prisma.PrismaPromise<GetMessageAggregateType<T>>;

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs["orderBy"] }
        : { orderBy?: MessageGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ' in "having" needs to be provided in "by"',
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetMessageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Message model
     */
    readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: unknown) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", "String">;
    readonly senderId: FieldRef<"Message", "String">;
    readonly receiverId: FieldRef<"Message", "String">;
    readonly messageType: FieldRef<"Message", "MessageType">;
    readonly content: FieldRef<"Message", "String">;
    readonly mediaUrl: FieldRef<"Message", "String">;
    readonly status: FieldRef<"Message", "MessageStatus">;
    readonly sentAt: FieldRef<"Message", "DateTime">;
    readonly deliveredAt: FieldRef<"Message", "DateTime">;
    readonly readAt: FieldRef<"Message", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message create
   */
  export type MessageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
  };

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message update
   */
  export type MessageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
  };

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput;
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
  };

  /**
   * Message delete
   */
  export type MessageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to delete.
     */
    limit?: number;
  };

  /**
   * Message without action
   */
  export type MessageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
  };

  /**
   * Model ScheduledCall
   */

  export type AggregateScheduledCall = {
    _count: ScheduledCallCountAggregateOutputType | null;
    _avg: ScheduledCallAvgAggregateOutputType | null;
    _sum: ScheduledCallSumAggregateOutputType | null;
    _min: ScheduledCallMinAggregateOutputType | null;
    _max: ScheduledCallMaxAggregateOutputType | null;
  };

  export type ScheduledCallAvgAggregateOutputType = {
    duration: number | null;
  };

  export type ScheduledCallSumAggregateOutputType = {
    duration: number | null;
  };

  export type ScheduledCallMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    callType: $Enums.CallType | null;
    scheduledAt: Date | null;
    duration: number | null;
    status: $Enums.ScheduledCallStatus | null;
    createdAt: Date | null;
    actualCallId: string | null;
  };

  export type ScheduledCallMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    callType: $Enums.CallType | null;
    scheduledAt: Date | null;
    duration: number | null;
    status: $Enums.ScheduledCallStatus | null;
    createdAt: Date | null;
    actualCallId: string | null;
  };

  export type ScheduledCallCountAggregateOutputType = {
    id: number;
    userId: number;
    expertId: number;
    callType: number;
    scheduledAt: number;
    duration: number;
    status: number;
    createdAt: number;
    actualCallId: number;
    _all: number;
  };

  export type ScheduledCallAvgAggregateInputType = {
    duration?: true;
  };

  export type ScheduledCallSumAggregateInputType = {
    duration?: true;
  };

  export type ScheduledCallMinAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    scheduledAt?: true;
    duration?: true;
    status?: true;
    createdAt?: true;
    actualCallId?: true;
  };

  export type ScheduledCallMaxAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    scheduledAt?: true;
    duration?: true;
    status?: true;
    createdAt?: true;
    actualCallId?: true;
  };

  export type ScheduledCallCountAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    callType?: true;
    scheduledAt?: true;
    duration?: true;
    status?: true;
    createdAt?: true;
    actualCallId?: true;
    _all?: true;
  };

  export type ScheduledCallAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ScheduledCall to aggregate.
     */
    where?: ScheduledCallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ScheduledCalls to fetch.
     */
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ScheduledCallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ScheduledCalls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ScheduledCalls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ScheduledCalls
     **/
    _count?: true | ScheduledCallCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ScheduledCallAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ScheduledCallSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ScheduledCallMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ScheduledCallMaxAggregateInputType;
  };

  export type GetScheduledCallAggregateType<
    T extends ScheduledCallAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateScheduledCall]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduledCall[P]>
      : GetScalarType<T[P], AggregateScheduledCall[P]>;
  };

  export type ScheduledCallGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ScheduledCallWhereInput;
    orderBy?:
      | ScheduledCallOrderByWithAggregationInput
      | ScheduledCallOrderByWithAggregationInput[];
    by: ScheduledCallScalarFieldEnum[] | ScheduledCallScalarFieldEnum;
    having?: ScheduledCallScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ScheduledCallCountAggregateInputType | true;
    _avg?: ScheduledCallAvgAggregateInputType;
    _sum?: ScheduledCallSumAggregateInputType;
    _min?: ScheduledCallMinAggregateInputType;
    _max?: ScheduledCallMaxAggregateInputType;
  };

  export type ScheduledCallGroupByOutputType = {
    id: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date;
    duration: number | null;
    status: $Enums.ScheduledCallStatus;
    createdAt: Date;
    actualCallId: string | null;
    _count: ScheduledCallCountAggregateOutputType | null;
    _avg: ScheduledCallAvgAggregateOutputType | null;
    _sum: ScheduledCallSumAggregateOutputType | null;
    _min: ScheduledCallMinAggregateOutputType | null;
    _max: ScheduledCallMaxAggregateOutputType | null;
  };

  type GetScheduledCallGroupByPayload<T extends ScheduledCallGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ScheduledCallGroupByOutputType, T["by"]> & {
          [P in keyof T &
            keyof ScheduledCallGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduledCallGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduledCallGroupByOutputType[P]>;
        }
      >
    >;

  export type ScheduledCallSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      scheduledAt?: boolean;
      duration?: boolean;
      status?: boolean;
      createdAt?: boolean;
      actualCallId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
      actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
    },
    ExtArgs["result"]["scheduledCall"]
  >;

  export type ScheduledCallSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      scheduledAt?: boolean;
      duration?: boolean;
      status?: boolean;
      createdAt?: boolean;
      actualCallId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
      actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
    },
    ExtArgs["result"]["scheduledCall"]
  >;

  export type ScheduledCallSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      callType?: boolean;
      scheduledAt?: boolean;
      duration?: boolean;
      status?: boolean;
      createdAt?: boolean;
      actualCallId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
      actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
    },
    ExtArgs["result"]["scheduledCall"]
  >;

  export type ScheduledCallSelectScalar = {
    id?: boolean;
    userId?: boolean;
    expertId?: boolean;
    callType?: boolean;
    scheduledAt?: boolean;
    duration?: boolean;
    status?: boolean;
    createdAt?: boolean;
    actualCallId?: boolean;
  };

  export type ScheduledCallOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | "id"
    | "userId"
    | "expertId"
    | "callType"
    | "scheduledAt"
    | "duration"
    | "status"
    | "createdAt"
    | "actualCallId",
    ExtArgs["result"]["scheduledCall"]
  >;
  export type ScheduledCallInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
    actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
  };
  export type ScheduledCallIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
    actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
  };
  export type ScheduledCallIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
    actualCall?: boolean | ScheduledCall$actualCallArgs<ExtArgs>;
  };

  export type $ScheduledCallPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "ScheduledCall";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      expert: Prisma.$UserPayload<ExtArgs>;
      actualCall: Prisma.$CallPayload<ExtArgs> | null;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        expertId: string;
        callType: $Enums.CallType;
        scheduledAt: Date;
        duration: number | null;
        status: $Enums.ScheduledCallStatus;
        createdAt: Date;
        actualCallId: string | null;
      },
      ExtArgs["result"]["scheduledCall"]
    >;
    composites: {};
  };

  type ScheduledCallGetPayload<
    S extends boolean | null | undefined | ScheduledCallDefaultArgs,
  > = $Result.GetResult<Prisma.$ScheduledCallPayload, S>;

  type ScheduledCallCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ScheduledCallFindManyArgs,
    "select" | "include" | "distinct" | "omit"
  > & {
    select?: ScheduledCallCountAggregateInputType | true;
  };

  export interface ScheduledCallDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["ScheduledCall"];
      meta: { name: "ScheduledCall" };
    };
    /**
     * Find zero or one ScheduledCall that matches the filter.
     * @param {ScheduledCallFindUniqueArgs} args - Arguments to find a ScheduledCall
     * @example
     * // Get one ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduledCallFindUniqueArgs>(
      args: SelectSubset<T, ScheduledCallFindUniqueArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ScheduledCall that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduledCallFindUniqueOrThrowArgs} args - Arguments to find a ScheduledCall
     * @example
     * // Get one ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduledCallFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ScheduledCallFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ScheduledCall that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallFindFirstArgs} args - Arguments to find a ScheduledCall
     * @example
     * // Get one ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduledCallFindFirstArgs>(
      args?: SelectSubset<T, ScheduledCallFindFirstArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ScheduledCall that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallFindFirstOrThrowArgs} args - Arguments to find a ScheduledCall
     * @example
     * // Get one ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduledCallFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ScheduledCallFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ScheduledCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduledCalls
     * const scheduledCalls = await prisma.scheduledCall.findMany()
     *
     * // Get first 10 ScheduledCalls
     * const scheduledCalls = await prisma.scheduledCall.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const scheduledCallWithIdOnly = await prisma.scheduledCall.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ScheduledCallFindManyArgs>(
      args?: SelectSubset<T, ScheduledCallFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ScheduledCall.
     * @param {ScheduledCallCreateArgs} args - Arguments to create a ScheduledCall.
     * @example
     * // Create one ScheduledCall
     * const ScheduledCall = await prisma.scheduledCall.create({
     *   data: {
     *     // ... data to create a ScheduledCall
     *   }
     * })
     *
     */
    create<T extends ScheduledCallCreateArgs>(
      args: SelectSubset<T, ScheduledCallCreateArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ScheduledCalls.
     * @param {ScheduledCallCreateManyArgs} args - Arguments to create many ScheduledCalls.
     * @example
     * // Create many ScheduledCalls
     * const scheduledCall = await prisma.scheduledCall.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ScheduledCallCreateManyArgs>(
      args?: SelectSubset<T, ScheduledCallCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ScheduledCalls and returns the data saved in the database.
     * @param {ScheduledCallCreateManyAndReturnArgs} args - Arguments to create many ScheduledCalls.
     * @example
     * // Create many ScheduledCalls
     * const scheduledCall = await prisma.scheduledCall.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ScheduledCalls and only return the `id`
     * const scheduledCallWithIdOnly = await prisma.scheduledCall.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ScheduledCallCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ScheduledCallCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ScheduledCall.
     * @param {ScheduledCallDeleteArgs} args - Arguments to delete one ScheduledCall.
     * @example
     * // Delete one ScheduledCall
     * const ScheduledCall = await prisma.scheduledCall.delete({
     *   where: {
     *     // ... filter to delete one ScheduledCall
     *   }
     * })
     *
     */
    delete<T extends ScheduledCallDeleteArgs>(
      args: SelectSubset<T, ScheduledCallDeleteArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ScheduledCall.
     * @param {ScheduledCallUpdateArgs} args - Arguments to update one ScheduledCall.
     * @example
     * // Update one ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ScheduledCallUpdateArgs>(
      args: SelectSubset<T, ScheduledCallUpdateArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ScheduledCalls.
     * @param {ScheduledCallDeleteManyArgs} args - Arguments to filter ScheduledCalls to delete.
     * @example
     * // Delete a few ScheduledCalls
     * const { count } = await prisma.scheduledCall.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ScheduledCallDeleteManyArgs>(
      args?: SelectSubset<T, ScheduledCallDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ScheduledCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduledCalls
     * const scheduledCall = await prisma.scheduledCall.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ScheduledCallUpdateManyArgs>(
      args: SelectSubset<T, ScheduledCallUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ScheduledCalls and returns the data updated in the database.
     * @param {ScheduledCallUpdateManyAndReturnArgs} args - Arguments to update many ScheduledCalls.
     * @example
     * // Update many ScheduledCalls
     * const scheduledCall = await prisma.scheduledCall.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ScheduledCalls and only return the `id`
     * const scheduledCallWithIdOnly = await prisma.scheduledCall.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ScheduledCallUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ScheduledCallUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ScheduledCall.
     * @param {ScheduledCallUpsertArgs} args - Arguments to update or create a ScheduledCall.
     * @example
     * // Update or create a ScheduledCall
     * const scheduledCall = await prisma.scheduledCall.upsert({
     *   create: {
     *     // ... data to create a ScheduledCall
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduledCall we want to update
     *   }
     * })
     */
    upsert<T extends ScheduledCallUpsertArgs>(
      args: SelectSubset<T, ScheduledCallUpsertArgs<ExtArgs>>
    ): Prisma__ScheduledCallClient<
      $Result.GetResult<
        Prisma.$ScheduledCallPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ScheduledCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallCountArgs} args - Arguments to filter ScheduledCalls to count.
     * @example
     * // Count the number of ScheduledCalls
     * const count = await prisma.scheduledCall.count({
     *   where: {
     *     // ... the filter for the ScheduledCalls we want to count
     *   }
     * })
     **/
    count<T extends ScheduledCallCountArgs>(
      args?: Subset<T, ScheduledCallCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", unknown>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ScheduledCallCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ScheduledCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ScheduledCallAggregateArgs>(
      args: Subset<T, ScheduledCallAggregateArgs>
    ): Prisma.PrismaPromise<GetScheduledCallAggregateType<T>>;

    /**
     * Group by ScheduledCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledCallGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ScheduledCallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduledCallGroupByArgs["orderBy"] }
        : { orderBy?: ScheduledCallGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ' in "having" needs to be provided in "by"',
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ScheduledCallGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetScheduledCallGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ScheduledCall model
     */
    readonly fields: ScheduledCallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduledCall.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduledCallClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    expert<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    actualCall<T extends ScheduledCall$actualCallArgs<ExtArgs> = {}>(
      args?: Subset<T, ScheduledCall$actualCallArgs<ExtArgs>>
    ): Prisma__CallClient<
      $Result.GetResult<
        Prisma.$CallPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: unknown) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ScheduledCall model
   */
  interface ScheduledCallFieldRefs {
    readonly id: FieldRef<"ScheduledCall", "String">;
    readonly userId: FieldRef<"ScheduledCall", "String">;
    readonly expertId: FieldRef<"ScheduledCall", "String">;
    readonly callType: FieldRef<"ScheduledCall", "CallType">;
    readonly scheduledAt: FieldRef<"ScheduledCall", "DateTime">;
    readonly duration: FieldRef<"ScheduledCall", "Int">;
    readonly status: FieldRef<"ScheduledCall", "ScheduledCallStatus">;
    readonly createdAt: FieldRef<"ScheduledCall", "DateTime">;
    readonly actualCallId: FieldRef<"ScheduledCall", "String">;
  }

  // Custom InputTypes
  /**
   * ScheduledCall findUnique
   */
  export type ScheduledCallFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter, which ScheduledCall to fetch.
     */
    where: ScheduledCallWhereUniqueInput;
  };

  /**
   * ScheduledCall findUniqueOrThrow
   */
  export type ScheduledCallFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter, which ScheduledCall to fetch.
     */
    where: ScheduledCallWhereUniqueInput;
  };

  /**
   * ScheduledCall findFirst
   */
  export type ScheduledCallFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter, which ScheduledCall to fetch.
     */
    where?: ScheduledCallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ScheduledCalls to fetch.
     */
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ScheduledCalls.
     */
    cursor?: ScheduledCallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ScheduledCalls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ScheduledCalls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ScheduledCalls.
     */
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * ScheduledCall findFirstOrThrow
   */
  export type ScheduledCallFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter, which ScheduledCall to fetch.
     */
    where?: ScheduledCallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ScheduledCalls to fetch.
     */
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ScheduledCalls.
     */
    cursor?: ScheduledCallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ScheduledCalls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ScheduledCalls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ScheduledCalls.
     */
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * ScheduledCall findMany
   */
  export type ScheduledCallFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter, which ScheduledCalls to fetch.
     */
    where?: ScheduledCallWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ScheduledCalls to fetch.
     */
    orderBy?:
      | ScheduledCallOrderByWithRelationInput
      | ScheduledCallOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ScheduledCalls.
     */
    cursor?: ScheduledCallWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ScheduledCalls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ScheduledCalls.
     */
    skip?: number;
    distinct?: ScheduledCallScalarFieldEnum | ScheduledCallScalarFieldEnum[];
  };

  /**
   * ScheduledCall create
   */
  export type ScheduledCallCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * The data needed to create a ScheduledCall.
     */
    data: XOR<ScheduledCallCreateInput, ScheduledCallUncheckedCreateInput>;
  };

  /**
   * ScheduledCall createMany
   */
  export type ScheduledCallCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ScheduledCalls.
     */
    data: ScheduledCallCreateManyInput | ScheduledCallCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ScheduledCall createManyAndReturn
   */
  export type ScheduledCallCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * The data used to create many ScheduledCalls.
     */
    data: ScheduledCallCreateManyInput | ScheduledCallCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ScheduledCall update
   */
  export type ScheduledCallUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * The data needed to update a ScheduledCall.
     */
    data: XOR<ScheduledCallUpdateInput, ScheduledCallUncheckedUpdateInput>;
    /**
     * Choose, which ScheduledCall to update.
     */
    where: ScheduledCallWhereUniqueInput;
  };

  /**
   * ScheduledCall updateMany
   */
  export type ScheduledCallUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ScheduledCalls.
     */
    data: XOR<
      ScheduledCallUpdateManyMutationInput,
      ScheduledCallUncheckedUpdateManyInput
    >;
    /**
     * Filter which ScheduledCalls to update
     */
    where?: ScheduledCallWhereInput;
    /**
     * Limit how many ScheduledCalls to update.
     */
    limit?: number;
  };

  /**
   * ScheduledCall updateManyAndReturn
   */
  export type ScheduledCallUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * The data used to update ScheduledCalls.
     */
    data: XOR<
      ScheduledCallUpdateManyMutationInput,
      ScheduledCallUncheckedUpdateManyInput
    >;
    /**
     * Filter which ScheduledCalls to update
     */
    where?: ScheduledCallWhereInput;
    /**
     * Limit how many ScheduledCalls to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ScheduledCall upsert
   */
  export type ScheduledCallUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * The filter to search for the ScheduledCall to update in case it exists.
     */
    where: ScheduledCallWhereUniqueInput;
    /**
     * In case the ScheduledCall found by the `where` argument doesn't exist, create a new ScheduledCall with this data.
     */
    create: XOR<ScheduledCallCreateInput, ScheduledCallUncheckedCreateInput>;
    /**
     * In case the ScheduledCall was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduledCallUpdateInput, ScheduledCallUncheckedUpdateInput>;
  };

  /**
   * ScheduledCall delete
   */
  export type ScheduledCallDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
    /**
     * Filter which ScheduledCall to delete.
     */
    where: ScheduledCallWhereUniqueInput;
  };

  /**
   * ScheduledCall deleteMany
   */
  export type ScheduledCallDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ScheduledCalls to delete
     */
    where?: ScheduledCallWhereInput;
    /**
     * Limit how many ScheduledCalls to delete.
     */
    limit?: number;
  };

  /**
   * ScheduledCall.actualCall
   */
  export type ScheduledCall$actualCallArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Call
     */
    select?: CallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Call
     */
    omit?: CallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallInclude<ExtArgs> | null;
    where?: CallWhereInput;
  };

  /**
   * ScheduledCall without action
   */
  export type ScheduledCallDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ScheduledCall
     */
    select?: ScheduledCallSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ScheduledCall
     */
    omit?: ScheduledCallOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduledCallInclude<ExtArgs> | null;
  };

  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
  };

  export type ReviewAvgAggregateOutputType = {
    rating: number | null;
  };

  export type ReviewSumAggregateOutputType = {
    rating: number | null;
  };

  export type ReviewMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    rating: number | null;
    comment: string | null;
    createdAt: Date | null;
  };

  export type ReviewMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expertId: string | null;
    rating: number | null;
    comment: string | null;
    createdAt: Date | null;
  };

  export type ReviewCountAggregateOutputType = {
    id: number;
    userId: number;
    expertId: number;
    rating: number;
    comment: number;
    createdAt: number;
    _all: number;
  };

  export type ReviewAvgAggregateInputType = {
    rating?: true;
  };

  export type ReviewSumAggregateInputType = {
    rating?: true;
  };

  export type ReviewMinAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
  };

  export type ReviewMaxAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
  };

  export type ReviewCountAggregateInputType = {
    id?: true;
    userId?: true;
    expertId?: true;
    rating?: true;
    comment?: true;
    createdAt?: true;
    _all?: true;
  };

  export type ReviewAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Reviews
     **/
    _count?: true | ReviewCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ReviewAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ReviewSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ReviewMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ReviewMaxAggregateInputType;
  };

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateReview]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>;
  };

  export type ReviewGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ReviewWhereInput;
    orderBy?:
      | ReviewOrderByWithAggregationInput
      | ReviewOrderByWithAggregationInput[];
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum;
    having?: ReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReviewCountAggregateInputType | true;
    _avg?: ReviewAvgAggregateInputType;
    _sum?: ReviewSumAggregateInputType;
    _min?: ReviewMinAggregateInputType;
    _max?: ReviewMaxAggregateInputType;
  };

  export type ReviewGroupByOutputType = {
    id: string;
    userId: string;
    expertId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    _count: ReviewCountAggregateOutputType | null;
    _avg: ReviewAvgAggregateOutputType | null;
    _sum: ReviewSumAggregateOutputType | null;
    _min: ReviewMinAggregateOutputType | null;
    _max: ReviewMaxAggregateOutputType | null;
  };

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ReviewGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ReviewGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>;
        }
      >
    >;

  export type ReviewSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      rating?: boolean;
      comment?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["review"]
  >;

  export type ReviewSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      rating?: boolean;
      comment?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["review"]
  >;

  export type ReviewSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      expertId?: boolean;
      rating?: boolean;
      comment?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      expert?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["review"]
  >;

  export type ReviewSelectScalar = {
    id?: boolean;
    userId?: boolean;
    expertId?: boolean;
    rating?: boolean;
    comment?: boolean;
    createdAt?: boolean;
  };

  export type ReviewOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    "id" | "userId" | "expertId" | "rating" | "comment" | "createdAt",
    ExtArgs["result"]["review"]
  >;
  export type ReviewInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ReviewIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ReviewIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    expert?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ReviewPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: "Review";
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      expert: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        expertId: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
      },
      ExtArgs["result"]["review"]
    >;
    composites: {};
  };

  type ReviewGetPayload<
    S extends boolean | null | undefined | ReviewDefaultArgs,
  > = $Result.GetResult<Prisma.$ReviewPayload, S>;

  type ReviewCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ReviewFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: ReviewCountAggregateInputType | true;
  };

  export interface ReviewDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Review"];
      meta: { name: "Review" };
    };
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(
      args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(
      args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     *
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ReviewFindManyArgs>(
      args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     *
     */
    create<T extends ReviewCreateArgs>(
      args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ReviewCreateManyArgs>(
      args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     *
     */
    delete<T extends ReviewDeleteArgs>(
      args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ReviewUpdateArgs>(
      args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ReviewDeleteManyArgs>(
      args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ReviewUpdateManyArgs>(
      args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(
      args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>
    ): Prisma__ReviewClient<
      $Result.GetResult<
        Prisma.$ReviewPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
     **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", unknown>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ReviewCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ReviewAggregateArgs>(
      args: Subset<T, ReviewAggregateArgs>
    ): Prisma.PrismaPromise<GetReviewAggregateType<T>>;

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs["orderBy"] }
        : { orderBy?: ReviewGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? 'Error: "by" must not be empty.'
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      "Field ",
                      P,
                      ' in "having" needs to be provided in "by"',
                    ];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetReviewGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Review model
     */
    readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    expert<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: unknown) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", "String">;
    readonly userId: FieldRef<"Review", "String">;
    readonly expertId: FieldRef<"Review", "String">;
    readonly rating: FieldRef<"Review", "Int">;
    readonly comment: FieldRef<"Review", "String">;
    readonly createdAt: FieldRef<"Review", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput;
  };

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput;
  };

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[];
  };

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[];
  };

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reviews.
     */
    skip?: number;
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[];
  };

  /**
   * Review create
   */
  export type ReviewCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>;
  };

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Review update
   */
  export type ReviewUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>;
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput;
  };

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>;
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput;
    /**
     * Limit how many Reviews to update.
     */
    limit?: number;
  };

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>;
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput;
    /**
     * Limit how many Reviews to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput;
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>;
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>;
  };

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput;
  };

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput;
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number;
  };

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    email: "email";
    role: "role";
    createdAt: "createdAt";
    firstName: "firstName";
    lastName: "lastName";
    updatedAt: "updatedAt";
    gender: "gender";
    bio: "bio";
    externalId: "externalId";
    expertise: "expertise";
    profilePic: "profilePic";
    phone: "phone";
    username: "username";
    certifications: "certifications";
    yearsOfExperience: "yearsOfExperience";
    availability: "availability";
    hourlyRate: "hourlyRate";
    interests: "interests";
    preferences: "preferences";
    skills: "skills";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const CallScalarFieldEnum: {
    id: "id";
    userId: "userId";
    expertId: "expertId";
    callType: "callType";
    duration: "duration";
    status: "status";
    startedAt: "startedAt";
    endedAt: "endedAt";
  };

  export type CallScalarFieldEnum =
    (typeof CallScalarFieldEnum)[keyof typeof CallScalarFieldEnum];

  export const MessageScalarFieldEnum: {
    id: "id";
    senderId: "senderId";
    receiverId: "receiverId";
    messageType: "messageType";
    content: "content";
    mediaUrl: "mediaUrl";
    status: "status";
    sentAt: "sentAt";
    deliveredAt: "deliveredAt";
    readAt: "readAt";
  };

  export type MessageScalarFieldEnum =
    (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];

  export const ScheduledCallScalarFieldEnum: {
    id: "id";
    userId: "userId";
    expertId: "expertId";
    callType: "callType";
    scheduledAt: "scheduledAt";
    duration: "duration";
    status: "status";
    createdAt: "createdAt";
    actualCallId: "actualCallId";
  };

  export type ScheduledCallScalarFieldEnum =
    (typeof ScheduledCallScalarFieldEnum)[keyof typeof ScheduledCallScalarFieldEnum];

  export const ReviewScalarFieldEnum: {
    id: "id";
    userId: "userId";
    expertId: "expertId";
    rating: "rating";
    comment: "comment";
    createdAt: "createdAt";
  };

  export type ReviewScalarFieldEnum =
    (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Role"
  >;

  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Role[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'CallType'
   */
  export type EnumCallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "CallType"
  >;

  /**
   * Reference to a field of type 'CallType[]'
   */
  export type ListEnumCallTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "CallType[]"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'CallStatus'
   */
  export type EnumCallStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "CallStatus"
  >;

  /**
   * Reference to a field of type 'CallStatus[]'
   */
  export type ListEnumCallStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "CallStatus[]"
  >;

  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "MessageType"
  >;

  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "MessageType[]">;

  /**
   * Reference to a field of type 'MessageStatus'
   */
  export type EnumMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "MessageStatus"
  >;

  /**
   * Reference to a field of type 'MessageStatus[]'
   */
  export type ListEnumMessageStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "MessageStatus[]">;

  /**
   * Reference to a field of type 'ScheduledCallStatus'
   */
  export type EnumScheduledCallStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "ScheduledCallStatus">;

  /**
   * Reference to a field of type 'ScheduledCallStatus[]'
   */
  export type ListEnumScheduledCallStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, "ScheduledCallStatus[]">;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    role?: EnumRoleNullableFilter<"User"> | $Enums.Role | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    firstName?: StringNullableFilter<"User"> | string | null;
    lastName?: StringNullableFilter<"User"> | string | null;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
    gender?: StringNullableFilter<"User"> | string | null;
    bio?: StringNullableFilter<"User"> | string | null;
    externalId?: StringNullableFilter<"User"> | string | null;
    expertise?: StringNullableFilter<"User"> | string | null;
    profilePic?: StringNullableFilter<"User"> | string | null;
    phone?: StringNullableFilter<"User"> | string | null;
    username?: StringNullableFilter<"User"> | string | null;
    certifications?: StringNullableFilter<"User"> | string | null;
    yearsOfExperience?: StringNullableFilter<"User"> | string | null;
    availability?: StringNullableFilter<"User"> | string | null;
    hourlyRate?: StringNullableFilter<"User"> | string | null;
    interests?: StringNullableFilter<"User"> | string | null;
    preferences?: StringNullableFilter<"User"> | string | null;
    skills?: StringNullableListFilter<"User">;
    userCalls?: CallListRelationFilter;
    expertCalls?: CallListRelationFilter;
    scheduledCalls?: ScheduledCallListRelationFilter;
    expertSchedules?: ScheduledCallListRelationFilter;
    sentMessages?: MessageListRelationFilter;
    receivedMessages?: MessageListRelationFilter;
    reviewsGiven?: ReviewListRelationFilter;
    reviewsReceived?: ReviewListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    firstName?: SortOrderInput | SortOrder;
    lastName?: SortOrderInput | SortOrder;
    updatedAt?: SortOrder;
    gender?: SortOrderInput | SortOrder;
    bio?: SortOrderInput | SortOrder;
    externalId?: SortOrderInput | SortOrder;
    expertise?: SortOrderInput | SortOrder;
    profilePic?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    username?: SortOrderInput | SortOrder;
    certifications?: SortOrderInput | SortOrder;
    yearsOfExperience?: SortOrderInput | SortOrder;
    availability?: SortOrderInput | SortOrder;
    hourlyRate?: SortOrderInput | SortOrder;
    interests?: SortOrderInput | SortOrder;
    preferences?: SortOrderInput | SortOrder;
    skills?: SortOrder;
    userCalls?: CallOrderByRelationAggregateInput;
    expertCalls?: CallOrderByRelationAggregateInput;
    scheduledCalls?: ScheduledCallOrderByRelationAggregateInput;
    expertSchedules?: ScheduledCallOrderByRelationAggregateInput;
    sentMessages?: MessageOrderByRelationAggregateInput;
    receivedMessages?: MessageOrderByRelationAggregateInput;
    reviewsGiven?: ReviewOrderByRelationAggregateInput;
    reviewsReceived?: ReviewOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      externalId?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      role?: EnumRoleNullableFilter<"User"> | $Enums.Role | null;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      firstName?: StringNullableFilter<"User"> | string | null;
      lastName?: StringNullableFilter<"User"> | string | null;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
      gender?: StringNullableFilter<"User"> | string | null;
      bio?: StringNullableFilter<"User"> | string | null;
      expertise?: StringNullableFilter<"User"> | string | null;
      profilePic?: StringNullableFilter<"User"> | string | null;
      phone?: StringNullableFilter<"User"> | string | null;
      username?: StringNullableFilter<"User"> | string | null;
      certifications?: StringNullableFilter<"User"> | string | null;
      yearsOfExperience?: StringNullableFilter<"User"> | string | null;
      availability?: StringNullableFilter<"User"> | string | null;
      hourlyRate?: StringNullableFilter<"User"> | string | null;
      interests?: StringNullableFilter<"User"> | string | null;
      preferences?: StringNullableFilter<"User"> | string | null;
      skills?: StringNullableListFilter<"User">;
      userCalls?: CallListRelationFilter;
      expertCalls?: CallListRelationFilter;
      scheduledCalls?: ScheduledCallListRelationFilter;
      expertSchedules?: ScheduledCallListRelationFilter;
      sentMessages?: MessageListRelationFilter;
      receivedMessages?: MessageListRelationFilter;
      reviewsGiven?: ReviewListRelationFilter;
      reviewsReceived?: ReviewListRelationFilter;
    },
    "id" | "email" | "externalId"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    firstName?: SortOrderInput | SortOrder;
    lastName?: SortOrderInput | SortOrder;
    updatedAt?: SortOrder;
    gender?: SortOrderInput | SortOrder;
    bio?: SortOrderInput | SortOrder;
    externalId?: SortOrderInput | SortOrder;
    expertise?: SortOrderInput | SortOrder;
    profilePic?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    username?: SortOrderInput | SortOrder;
    certifications?: SortOrderInput | SortOrder;
    yearsOfExperience?: SortOrderInput | SortOrder;
    availability?: SortOrderInput | SortOrder;
    hourlyRate?: SortOrderInput | SortOrder;
    interests?: SortOrderInput | SortOrder;
    preferences?: SortOrderInput | SortOrder;
    skills?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    role?: EnumRoleNullableWithAggregatesFilter<"User"> | $Enums.Role | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null;
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null;
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null;
    externalId?: StringNullableWithAggregatesFilter<"User"> | string | null;
    expertise?: StringNullableWithAggregatesFilter<"User"> | string | null;
    profilePic?: StringNullableWithAggregatesFilter<"User"> | string | null;
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null;
    username?: StringNullableWithAggregatesFilter<"User"> | string | null;
    certifications?: StringNullableWithAggregatesFilter<"User"> | string | null;
    yearsOfExperience?:
      | StringNullableWithAggregatesFilter<"User">
      | string
      | null;
    availability?: StringNullableWithAggregatesFilter<"User"> | string | null;
    hourlyRate?: StringNullableWithAggregatesFilter<"User"> | string | null;
    interests?: StringNullableWithAggregatesFilter<"User"> | string | null;
    preferences?: StringNullableWithAggregatesFilter<"User"> | string | null;
    skills?: StringNullableListFilter<"User">;
  };

  export type CallWhereInput = {
    AND?: CallWhereInput | CallWhereInput[];
    OR?: CallWhereInput[];
    NOT?: CallWhereInput | CallWhereInput[];
    id?: StringFilter<"Call"> | string;
    userId?: StringFilter<"Call"> | string;
    expertId?: StringFilter<"Call"> | string;
    callType?: EnumCallTypeFilter<"Call"> | $Enums.CallType;
    duration?: IntFilter<"Call"> | number;
    status?: EnumCallStatusFilter<"Call"> | $Enums.CallStatus;
    startedAt?: DateTimeFilter<"Call"> | Date | string;
    endedAt?: DateTimeNullableFilter<"Call"> | Date | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
    ScheduledCall?: ScheduledCallListRelationFilter;
  };

  export type CallOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    startedAt?: SortOrder;
    endedAt?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
    expert?: UserOrderByWithRelationInput;
    ScheduledCall?: ScheduledCallOrderByRelationAggregateInput;
  };

  export type CallWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: CallWhereInput | CallWhereInput[];
      OR?: CallWhereInput[];
      NOT?: CallWhereInput | CallWhereInput[];
      userId?: StringFilter<"Call"> | string;
      expertId?: StringFilter<"Call"> | string;
      callType?: EnumCallTypeFilter<"Call"> | $Enums.CallType;
      duration?: IntFilter<"Call"> | number;
      status?: EnumCallStatusFilter<"Call"> | $Enums.CallStatus;
      startedAt?: DateTimeFilter<"Call"> | Date | string;
      endedAt?: DateTimeNullableFilter<"Call"> | Date | string | null;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
      ScheduledCall?: ScheduledCallListRelationFilter;
    },
    "id"
  >;

  export type CallOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    startedAt?: SortOrder;
    endedAt?: SortOrderInput | SortOrder;
    _count?: CallCountOrderByAggregateInput;
    _avg?: CallAvgOrderByAggregateInput;
    _max?: CallMaxOrderByAggregateInput;
    _min?: CallMinOrderByAggregateInput;
    _sum?: CallSumOrderByAggregateInput;
  };

  export type CallScalarWhereWithAggregatesInput = {
    AND?:
      | CallScalarWhereWithAggregatesInput
      | CallScalarWhereWithAggregatesInput[];
    OR?: CallScalarWhereWithAggregatesInput[];
    NOT?:
      | CallScalarWhereWithAggregatesInput
      | CallScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Call"> | string;
    userId?: StringWithAggregatesFilter<"Call"> | string;
    expertId?: StringWithAggregatesFilter<"Call"> | string;
    callType?: EnumCallTypeWithAggregatesFilter<"Call"> | $Enums.CallType;
    duration?: IntWithAggregatesFilter<"Call"> | number;
    status?: EnumCallStatusWithAggregatesFilter<"Call"> | $Enums.CallStatus;
    startedAt?: DateTimeWithAggregatesFilter<"Call"> | Date | string;
    endedAt?:
      | DateTimeNullableWithAggregatesFilter<"Call">
      | Date
      | string
      | null;
  };

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[];
    OR?: MessageWhereInput[];
    NOT?: MessageWhereInput | MessageWhereInput[];
    id?: StringFilter<"Message"> | string;
    senderId?: StringFilter<"Message"> | string;
    receiverId?: StringFilter<"Message"> | string;
    messageType?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
    content?: StringNullableFilter<"Message"> | string | null;
    mediaUrl?: StringNullableFilter<"Message"> | string | null;
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus;
    sentAt?: DateTimeFilter<"Message"> | Date | string;
    deliveredAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
    readAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>;
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder;
    senderId?: SortOrder;
    receiverId?: SortOrder;
    messageType?: SortOrder;
    content?: SortOrderInput | SortOrder;
    mediaUrl?: SortOrderInput | SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    deliveredAt?: SortOrderInput | SortOrder;
    readAt?: SortOrderInput | SortOrder;
    sender?: UserOrderByWithRelationInput;
    receiver?: UserOrderByWithRelationInput;
  };

  export type MessageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MessageWhereInput | MessageWhereInput[];
      OR?: MessageWhereInput[];
      NOT?: MessageWhereInput | MessageWhereInput[];
      senderId?: StringFilter<"Message"> | string;
      receiverId?: StringFilter<"Message"> | string;
      messageType?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
      content?: StringNullableFilter<"Message"> | string | null;
      mediaUrl?: StringNullableFilter<"Message"> | string | null;
      status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus;
      sentAt?: DateTimeFilter<"Message"> | Date | string;
      deliveredAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
      readAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
      sender?: XOR<UserScalarRelationFilter, UserWhereInput>;
      receiver?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id"
  >;

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder;
    senderId?: SortOrder;
    receiverId?: SortOrder;
    messageType?: SortOrder;
    content?: SortOrderInput | SortOrder;
    mediaUrl?: SortOrderInput | SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    deliveredAt?: SortOrderInput | SortOrder;
    readAt?: SortOrderInput | SortOrder;
    _count?: MessageCountOrderByAggregateInput;
    _max?: MessageMaxOrderByAggregateInput;
    _min?: MessageMinOrderByAggregateInput;
  };

  export type MessageScalarWhereWithAggregatesInput = {
    AND?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    OR?: MessageScalarWhereWithAggregatesInput[];
    NOT?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Message"> | string;
    senderId?: StringWithAggregatesFilter<"Message"> | string;
    receiverId?: StringWithAggregatesFilter<"Message"> | string;
    messageType?:
      | EnumMessageTypeWithAggregatesFilter<"Message">
      | $Enums.MessageType;
    content?: StringNullableWithAggregatesFilter<"Message"> | string | null;
    mediaUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null;
    status?:
      | EnumMessageStatusWithAggregatesFilter<"Message">
      | $Enums.MessageStatus;
    sentAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string;
    deliveredAt?:
      | DateTimeNullableWithAggregatesFilter<"Message">
      | Date
      | string
      | null;
    readAt?:
      | DateTimeNullableWithAggregatesFilter<"Message">
      | Date
      | string
      | null;
  };

  export type ScheduledCallWhereInput = {
    AND?: ScheduledCallWhereInput | ScheduledCallWhereInput[];
    OR?: ScheduledCallWhereInput[];
    NOT?: ScheduledCallWhereInput | ScheduledCallWhereInput[];
    id?: StringFilter<"ScheduledCall"> | string;
    userId?: StringFilter<"ScheduledCall"> | string;
    expertId?: StringFilter<"ScheduledCall"> | string;
    callType?: EnumCallTypeFilter<"ScheduledCall"> | $Enums.CallType;
    scheduledAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
    duration?: IntNullableFilter<"ScheduledCall"> | number | null;
    status?:
      | EnumScheduledCallStatusFilter<"ScheduledCall">
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
    actualCallId?: StringNullableFilter<"ScheduledCall"> | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
    actualCall?: XOR<CallNullableScalarRelationFilter, CallWhereInput> | null;
  };

  export type ScheduledCallOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    scheduledAt?: SortOrder;
    duration?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    actualCallId?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
    expert?: UserOrderByWithRelationInput;
    actualCall?: CallOrderByWithRelationInput;
  };

  export type ScheduledCallWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ScheduledCallWhereInput | ScheduledCallWhereInput[];
      OR?: ScheduledCallWhereInput[];
      NOT?: ScheduledCallWhereInput | ScheduledCallWhereInput[];
      userId?: StringFilter<"ScheduledCall"> | string;
      expertId?: StringFilter<"ScheduledCall"> | string;
      callType?: EnumCallTypeFilter<"ScheduledCall"> | $Enums.CallType;
      scheduledAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
      duration?: IntNullableFilter<"ScheduledCall"> | number | null;
      status?:
        | EnumScheduledCallStatusFilter<"ScheduledCall">
        | $Enums.ScheduledCallStatus;
      createdAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
      actualCallId?: StringNullableFilter<"ScheduledCall"> | string | null;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
      actualCall?: XOR<CallNullableScalarRelationFilter, CallWhereInput> | null;
    },
    "id"
  >;

  export type ScheduledCallOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    scheduledAt?: SortOrder;
    duration?: SortOrderInput | SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    actualCallId?: SortOrderInput | SortOrder;
    _count?: ScheduledCallCountOrderByAggregateInput;
    _avg?: ScheduledCallAvgOrderByAggregateInput;
    _max?: ScheduledCallMaxOrderByAggregateInput;
    _min?: ScheduledCallMinOrderByAggregateInput;
    _sum?: ScheduledCallSumOrderByAggregateInput;
  };

  export type ScheduledCallScalarWhereWithAggregatesInput = {
    AND?:
      | ScheduledCallScalarWhereWithAggregatesInput
      | ScheduledCallScalarWhereWithAggregatesInput[];
    OR?: ScheduledCallScalarWhereWithAggregatesInput[];
    NOT?:
      | ScheduledCallScalarWhereWithAggregatesInput
      | ScheduledCallScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"ScheduledCall"> | string;
    userId?: StringWithAggregatesFilter<"ScheduledCall"> | string;
    expertId?: StringWithAggregatesFilter<"ScheduledCall"> | string;
    callType?:
      | EnumCallTypeWithAggregatesFilter<"ScheduledCall">
      | $Enums.CallType;
    scheduledAt?: DateTimeWithAggregatesFilter<"ScheduledCall"> | Date | string;
    duration?: IntNullableWithAggregatesFilter<"ScheduledCall"> | number | null;
    status?:
      | EnumScheduledCallStatusWithAggregatesFilter<"ScheduledCall">
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeWithAggregatesFilter<"ScheduledCall"> | Date | string;
    actualCallId?:
      | StringNullableWithAggregatesFilter<"ScheduledCall">
      | string
      | null;
  };

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[];
    OR?: ReviewWhereInput[];
    NOT?: ReviewWhereInput | ReviewWhereInput[];
    id?: StringFilter<"Review"> | string;
    userId?: StringFilter<"Review"> | string;
    expertId?: StringFilter<"Review"> | string;
    rating?: IntFilter<"Review"> | number;
    comment?: StringNullableFilter<"Review"> | string | null;
    createdAt?: DateTimeFilter<"Review"> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    rating?: SortOrder;
    comment?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    expert?: UserOrderByWithRelationInput;
  };

  export type ReviewWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId_expertId?: ReviewUserIdExpertIdCompoundUniqueInput;
      AND?: ReviewWhereInput | ReviewWhereInput[];
      OR?: ReviewWhereInput[];
      NOT?: ReviewWhereInput | ReviewWhereInput[];
      userId?: StringFilter<"Review"> | string;
      expertId?: StringFilter<"Review"> | string;
      rating?: IntFilter<"Review"> | number;
      comment?: StringNullableFilter<"Review"> | string | null;
      createdAt?: DateTimeFilter<"Review"> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      expert?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    "id" | "userId_expertId"
  >;

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    rating?: SortOrder;
    comment?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    _count?: ReviewCountOrderByAggregateInput;
    _avg?: ReviewAvgOrderByAggregateInput;
    _max?: ReviewMaxOrderByAggregateInput;
    _min?: ReviewMinOrderByAggregateInput;
    _sum?: ReviewSumOrderByAggregateInput;
  };

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?:
      | ReviewScalarWhereWithAggregatesInput
      | ReviewScalarWhereWithAggregatesInput[];
    OR?: ReviewScalarWhereWithAggregatesInput[];
    NOT?:
      | ReviewScalarWhereWithAggregatesInput
      | ReviewScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Review"> | string;
    userId?: StringWithAggregatesFilter<"Review"> | string;
    expertId?: StringWithAggregatesFilter<"Review"> | string;
    rating?: IntWithAggregatesFilter<"Review"> | number;
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
  };

  export type CallCreateInput = {
    id?: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    user: UserCreateNestedOneWithoutUserCallsInput;
    expert: UserCreateNestedOneWithoutExpertCallsInput;
    ScheduledCall?: ScheduledCallCreateNestedManyWithoutActualCallInput;
  };

  export type CallUncheckedCreateInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedCreateNestedManyWithoutActualCallInput;
  };

  export type CallUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: UserUpdateOneRequiredWithoutUserCallsNestedInput;
    expert?: UserUpdateOneRequiredWithoutExpertCallsNestedInput;
    ScheduledCall?: ScheduledCallUpdateManyWithoutActualCallNestedInput;
  };

  export type CallUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedUpdateManyWithoutActualCallNestedInput;
  };

  export type CallCreateManyInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
  };

  export type CallUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type CallUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageCreateInput = {
    id?: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
    sender: UserCreateNestedOneWithoutSentMessagesInput;
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput;
  };

  export type MessageUncheckedCreateInput = {
    id?: string;
    senderId: string;
    receiverId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput;
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput;
  };

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    senderId?: StringFieldUpdateOperationsInput | string;
    receiverId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageCreateManyInput = {
    id?: string;
    senderId: string;
    receiverId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    senderId?: StringFieldUpdateOperationsInput | string;
    receiverId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ScheduledCallCreateInput = {
    id?: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutScheduledCallsInput;
    expert: UserCreateNestedOneWithoutExpertSchedulesInput;
    actualCall?: CallCreateNestedOneWithoutScheduledCallInput;
  };

  export type ScheduledCallUncheckedCreateInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type ScheduledCallUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutScheduledCallsNestedInput;
    expert?: UserUpdateOneRequiredWithoutExpertSchedulesNestedInput;
    actualCall?: CallUpdateOneWithoutScheduledCallNestedInput;
  };

  export type ScheduledCallUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ScheduledCallCreateManyInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type ScheduledCallUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScheduledCallUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ReviewCreateInput = {
    id?: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutReviewsGivenInput;
    expert: UserCreateNestedOneWithoutReviewsReceivedInput;
  };

  export type ReviewUncheckedCreateInput = {
    id?: string;
    userId: string;
    expertId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput;
    expert?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
  };

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReviewCreateManyInput = {
    id?: string;
    userId: string;
    expertId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type EnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type CallListRelationFilter = {
    every?: CallWhereInput;
    some?: CallWhereInput;
    none?: CallWhereInput;
  };

  export type ScheduledCallListRelationFilter = {
    every?: ScheduledCallWhereInput;
    some?: ScheduledCallWhereInput;
    none?: ScheduledCallWhereInput;
  };

  export type MessageListRelationFilter = {
    every?: MessageWhereInput;
    some?: MessageWhereInput;
    none?: MessageWhereInput;
  };

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput;
    some?: ReviewWhereInput;
    none?: ReviewWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type CallOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ScheduledCallOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    updatedAt?: SortOrder;
    gender?: SortOrder;
    bio?: SortOrder;
    externalId?: SortOrder;
    expertise?: SortOrder;
    profilePic?: SortOrder;
    phone?: SortOrder;
    username?: SortOrder;
    certifications?: SortOrder;
    yearsOfExperience?: SortOrder;
    availability?: SortOrder;
    hourlyRate?: SortOrder;
    interests?: SortOrder;
    preferences?: SortOrder;
    skills?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    updatedAt?: SortOrder;
    gender?: SortOrder;
    bio?: SortOrder;
    externalId?: SortOrder;
    expertise?: SortOrder;
    profilePic?: SortOrder;
    phone?: SortOrder;
    username?: SortOrder;
    certifications?: SortOrder;
    yearsOfExperience?: SortOrder;
    availability?: SortOrder;
    hourlyRate?: SortOrder;
    interests?: SortOrder;
    preferences?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
    firstName?: SortOrder;
    lastName?: SortOrder;
    updatedAt?: SortOrder;
    gender?: SortOrder;
    bio?: SortOrder;
    externalId?: SortOrder;
    expertise?: SortOrder;
    profilePic?: SortOrder;
    phone?: SortOrder;
    username?: SortOrder;
    certifications?: SortOrder;
    yearsOfExperience?: SortOrder;
    availability?: SortOrder;
    hourlyRate?: SortOrder;
    interests?: SortOrder;
    preferences?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type EnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?:
      | NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel>
      | $Enums.Role
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>;
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type EnumCallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCallTypeFilter<$PrismaModel> | $Enums.CallType;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumCallStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CallStatus | EnumCallStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumCallStatusFilter<$PrismaModel> | $Enums.CallStatus;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type CallCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    startedAt?: SortOrder;
    endedAt?: SortOrder;
  };

  export type CallAvgOrderByAggregateInput = {
    duration?: SortOrder;
  };

  export type CallMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    startedAt?: SortOrder;
    endedAt?: SortOrder;
  };

  export type CallMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    startedAt?: SortOrder;
    endedAt?: SortOrder;
  };

  export type CallSumOrderByAggregateInput = {
    duration?: SortOrder;
  };

  export type EnumCallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCallTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.CallType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCallTypeFilter<$PrismaModel>;
    _max?: NestedEnumCallTypeFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumCallStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallStatus | EnumCallStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCallStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.CallStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCallStatusFilter<$PrismaModel>;
    _max?: NestedEnumCallStatusFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageType[]
      | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
  };

  export type EnumMessageStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.MessageStatus
      | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus;
  };

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder;
    senderId?: SortOrder;
    receiverId?: SortOrder;
    messageType?: SortOrder;
    content?: SortOrder;
    mediaUrl?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    deliveredAt?: SortOrder;
    readAt?: SortOrder;
  };

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder;
    senderId?: SortOrder;
    receiverId?: SortOrder;
    messageType?: SortOrder;
    content?: SortOrder;
    mediaUrl?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    deliveredAt?: SortOrder;
    readAt?: SortOrder;
  };

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder;
    senderId?: SortOrder;
    receiverId?: SortOrder;
    messageType?: SortOrder;
    content?: SortOrder;
    mediaUrl?: SortOrder;
    status?: SortOrder;
    sentAt?: SortOrder;
    deliveredAt?: SortOrder;
    readAt?: SortOrder;
  };

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageType[]
      | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>;
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>;
  };

  export type EnumMessageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.MessageStatus
      | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>;
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type EnumScheduledCallStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ScheduledCallStatus
      | EnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumScheduledCallStatusFilter<$PrismaModel>
      | $Enums.ScheduledCallStatus;
  };

  export type CallNullableScalarRelationFilter = {
    is?: CallWhereInput | null;
    isNot?: CallWhereInput | null;
  };

  export type ScheduledCallCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    scheduledAt?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    actualCallId?: SortOrder;
  };

  export type ScheduledCallAvgOrderByAggregateInput = {
    duration?: SortOrder;
  };

  export type ScheduledCallMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    scheduledAt?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    actualCallId?: SortOrder;
  };

  export type ScheduledCallMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    callType?: SortOrder;
    scheduledAt?: SortOrder;
    duration?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    actualCallId?: SortOrder;
  };

  export type ScheduledCallSumOrderByAggregateInput = {
    duration?: SortOrder;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type EnumScheduledCallStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ScheduledCallStatus
      | EnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumScheduledCallStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ScheduledCallStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumScheduledCallStatusFilter<$PrismaModel>;
    _max?: NestedEnumScheduledCallStatusFilter<$PrismaModel>;
  };

  export type ReviewUserIdExpertIdCompoundUniqueInput = {
    userId: string;
    expertId: string;
  };

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    rating?: SortOrder;
    comment?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder;
  };

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    rating?: SortOrder;
    comment?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expertId?: SortOrder;
    rating?: SortOrder;
    comment?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder;
  };

  export type UserCreateskillsInput = {
    set: string[];
  };

  export type CallCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<CallCreateWithoutUserInput, CallUncheckedCreateWithoutUserInput>
      | CallCreateWithoutUserInput[]
      | CallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutUserInput
      | CallCreateOrConnectWithoutUserInput[];
    createMany?: CallCreateManyUserInputEnvelope;
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
  };

  export type CallCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<CallCreateWithoutExpertInput, CallUncheckedCreateWithoutExpertInput>
      | CallCreateWithoutExpertInput[]
      | CallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutExpertInput
      | CallCreateOrConnectWithoutExpertInput[];
    createMany?: CallCreateManyExpertInputEnvelope;
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
  };

  export type ScheduledCallCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutUserInput,
          ScheduledCallUncheckedCreateWithoutUserInput
        >
      | ScheduledCallCreateWithoutUserInput[]
      | ScheduledCallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutUserInput
      | ScheduledCallCreateOrConnectWithoutUserInput[];
    createMany?: ScheduledCallCreateManyUserInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type ScheduledCallCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutExpertInput,
          ScheduledCallUncheckedCreateWithoutExpertInput
        >
      | ScheduledCallCreateWithoutExpertInput[]
      | ScheduledCallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutExpertInput
      | ScheduledCallCreateOrConnectWithoutExpertInput[];
    createMany?: ScheduledCallCreateManyExpertInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?:
      | XOR<
          MessageCreateWithoutSenderInput,
          MessageUncheckedCreateWithoutSenderInput
        >
      | MessageCreateWithoutSenderInput[]
      | MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutSenderInput
      | MessageCreateOrConnectWithoutSenderInput[];
    createMany?: MessageCreateManySenderInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?:
      | XOR<
          MessageCreateWithoutReceiverInput,
          MessageUncheckedCreateWithoutReceiverInput
        >
      | MessageCreateWithoutReceiverInput[]
      | MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReceiverInput
      | MessageCreateOrConnectWithoutReceiverInput[];
    createMany?: MessageCreateManyReceiverInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
      | ReviewCreateWithoutUserInput[]
      | ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutUserInput
      | ReviewCreateOrConnectWithoutUserInput[];
    createMany?: ReviewCreateManyUserInputEnvelope;
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
  };

  export type ReviewCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<
          ReviewCreateWithoutExpertInput,
          ReviewUncheckedCreateWithoutExpertInput
        >
      | ReviewCreateWithoutExpertInput[]
      | ReviewUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutExpertInput
      | ReviewCreateOrConnectWithoutExpertInput[];
    createMany?: ReviewCreateManyExpertInputEnvelope;
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
  };

  export type CallUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<CallCreateWithoutUserInput, CallUncheckedCreateWithoutUserInput>
      | CallCreateWithoutUserInput[]
      | CallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutUserInput
      | CallCreateOrConnectWithoutUserInput[];
    createMany?: CallCreateManyUserInputEnvelope;
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
  };

  export type CallUncheckedCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<CallCreateWithoutExpertInput, CallUncheckedCreateWithoutExpertInput>
      | CallCreateWithoutExpertInput[]
      | CallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutExpertInput
      | CallCreateOrConnectWithoutExpertInput[];
    createMany?: CallCreateManyExpertInputEnvelope;
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
  };

  export type ScheduledCallUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutUserInput,
          ScheduledCallUncheckedCreateWithoutUserInput
        >
      | ScheduledCallCreateWithoutUserInput[]
      | ScheduledCallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutUserInput
      | ScheduledCallCreateOrConnectWithoutUserInput[];
    createMany?: ScheduledCallCreateManyUserInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type ScheduledCallUncheckedCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutExpertInput,
          ScheduledCallUncheckedCreateWithoutExpertInput
        >
      | ScheduledCallCreateWithoutExpertInput[]
      | ScheduledCallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutExpertInput
      | ScheduledCallCreateOrConnectWithoutExpertInput[];
    createMany?: ScheduledCallCreateManyExpertInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?:
      | XOR<
          MessageCreateWithoutSenderInput,
          MessageUncheckedCreateWithoutSenderInput
        >
      | MessageCreateWithoutSenderInput[]
      | MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutSenderInput
      | MessageCreateOrConnectWithoutSenderInput[];
    createMany?: MessageCreateManySenderInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?:
      | XOR<
          MessageCreateWithoutReceiverInput,
          MessageUncheckedCreateWithoutReceiverInput
        >
      | MessageCreateWithoutReceiverInput[]
      | MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReceiverInput
      | MessageCreateOrConnectWithoutReceiverInput[];
    createMany?: MessageCreateManyReceiverInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
      | ReviewCreateWithoutUserInput[]
      | ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutUserInput
      | ReviewCreateOrConnectWithoutUserInput[];
    createMany?: ReviewCreateManyUserInputEnvelope;
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
  };

  export type ReviewUncheckedCreateNestedManyWithoutExpertInput = {
    create?:
      | XOR<
          ReviewCreateWithoutExpertInput,
          ReviewUncheckedCreateWithoutExpertInput
        >
      | ReviewCreateWithoutExpertInput[]
      | ReviewUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutExpertInput
      | ReviewCreateOrConnectWithoutExpertInput[];
    createMany?: ReviewCreateManyExpertInputEnvelope;
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableEnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type UserUpdateskillsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type CallUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<CallCreateWithoutUserInput, CallUncheckedCreateWithoutUserInput>
      | CallCreateWithoutUserInput[]
      | CallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutUserInput
      | CallCreateOrConnectWithoutUserInput[];
    upsert?:
      | CallUpsertWithWhereUniqueWithoutUserInput
      | CallUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: CallCreateManyUserInputEnvelope;
    set?: CallWhereUniqueInput | CallWhereUniqueInput[];
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[];
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    update?:
      | CallUpdateWithWhereUniqueWithoutUserInput
      | CallUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | CallUpdateManyWithWhereWithoutUserInput
      | CallUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[];
  };

  export type CallUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<CallCreateWithoutExpertInput, CallUncheckedCreateWithoutExpertInput>
      | CallCreateWithoutExpertInput[]
      | CallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutExpertInput
      | CallCreateOrConnectWithoutExpertInput[];
    upsert?:
      | CallUpsertWithWhereUniqueWithoutExpertInput
      | CallUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: CallCreateManyExpertInputEnvelope;
    set?: CallWhereUniqueInput | CallWhereUniqueInput[];
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[];
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    update?:
      | CallUpdateWithWhereUniqueWithoutExpertInput
      | CallUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | CallUpdateManyWithWhereWithoutExpertInput
      | CallUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[];
  };

  export type ScheduledCallUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutUserInput,
          ScheduledCallUncheckedCreateWithoutUserInput
        >
      | ScheduledCallCreateWithoutUserInput[]
      | ScheduledCallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutUserInput
      | ScheduledCallCreateOrConnectWithoutUserInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutUserInput
      | ScheduledCallUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ScheduledCallCreateManyUserInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutUserInput
      | ScheduledCallUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutUserInput
      | ScheduledCallUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type ScheduledCallUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutExpertInput,
          ScheduledCallUncheckedCreateWithoutExpertInput
        >
      | ScheduledCallCreateWithoutExpertInput[]
      | ScheduledCallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutExpertInput
      | ScheduledCallCreateOrConnectWithoutExpertInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutExpertInput
      | ScheduledCallUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: ScheduledCallCreateManyExpertInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutExpertInput
      | ScheduledCallUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutExpertInput
      | ScheduledCallUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutSenderInput,
          MessageUncheckedCreateWithoutSenderInput
        >
      | MessageCreateWithoutSenderInput[]
      | MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutSenderInput
      | MessageCreateOrConnectWithoutSenderInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutSenderInput
      | MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: MessageCreateManySenderInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutSenderInput
      | MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutSenderInput
      | MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutReceiverInput,
          MessageUncheckedCreateWithoutReceiverInput
        >
      | MessageCreateWithoutReceiverInput[]
      | MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReceiverInput
      | MessageCreateOrConnectWithoutReceiverInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutReceiverInput
      | MessageUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: MessageCreateManyReceiverInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutReceiverInput
      | MessageUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutReceiverInput
      | MessageUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
      | ReviewCreateWithoutUserInput[]
      | ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutUserInput
      | ReviewCreateOrConnectWithoutUserInput[];
    upsert?:
      | ReviewUpsertWithWhereUniqueWithoutUserInput
      | ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ReviewCreateManyUserInputEnvelope;
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    update?:
      | ReviewUpdateWithWhereUniqueWithoutUserInput
      | ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ReviewUpdateManyWithWhereWithoutUserInput
      | ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
  };

  export type ReviewUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<
          ReviewCreateWithoutExpertInput,
          ReviewUncheckedCreateWithoutExpertInput
        >
      | ReviewCreateWithoutExpertInput[]
      | ReviewUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutExpertInput
      | ReviewCreateOrConnectWithoutExpertInput[];
    upsert?:
      | ReviewUpsertWithWhereUniqueWithoutExpertInput
      | ReviewUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: ReviewCreateManyExpertInputEnvelope;
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    update?:
      | ReviewUpdateWithWhereUniqueWithoutExpertInput
      | ReviewUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | ReviewUpdateManyWithWhereWithoutExpertInput
      | ReviewUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
  };

  export type CallUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<CallCreateWithoutUserInput, CallUncheckedCreateWithoutUserInput>
      | CallCreateWithoutUserInput[]
      | CallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutUserInput
      | CallCreateOrConnectWithoutUserInput[];
    upsert?:
      | CallUpsertWithWhereUniqueWithoutUserInput
      | CallUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: CallCreateManyUserInputEnvelope;
    set?: CallWhereUniqueInput | CallWhereUniqueInput[];
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[];
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    update?:
      | CallUpdateWithWhereUniqueWithoutUserInput
      | CallUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | CallUpdateManyWithWhereWithoutUserInput
      | CallUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[];
  };

  export type CallUncheckedUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<CallCreateWithoutExpertInput, CallUncheckedCreateWithoutExpertInput>
      | CallCreateWithoutExpertInput[]
      | CallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | CallCreateOrConnectWithoutExpertInput
      | CallCreateOrConnectWithoutExpertInput[];
    upsert?:
      | CallUpsertWithWhereUniqueWithoutExpertInput
      | CallUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: CallCreateManyExpertInputEnvelope;
    set?: CallWhereUniqueInput | CallWhereUniqueInput[];
    disconnect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    delete?: CallWhereUniqueInput | CallWhereUniqueInput[];
    connect?: CallWhereUniqueInput | CallWhereUniqueInput[];
    update?:
      | CallUpdateWithWhereUniqueWithoutExpertInput
      | CallUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | CallUpdateManyWithWhereWithoutExpertInput
      | CallUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?: CallScalarWhereInput | CallScalarWhereInput[];
  };

  export type ScheduledCallUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutUserInput,
          ScheduledCallUncheckedCreateWithoutUserInput
        >
      | ScheduledCallCreateWithoutUserInput[]
      | ScheduledCallUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutUserInput
      | ScheduledCallCreateOrConnectWithoutUserInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutUserInput
      | ScheduledCallUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ScheduledCallCreateManyUserInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutUserInput
      | ScheduledCallUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutUserInput
      | ScheduledCallUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutExpertInput,
          ScheduledCallUncheckedCreateWithoutExpertInput
        >
      | ScheduledCallCreateWithoutExpertInput[]
      | ScheduledCallUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutExpertInput
      | ScheduledCallCreateOrConnectWithoutExpertInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutExpertInput
      | ScheduledCallUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: ScheduledCallCreateManyExpertInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutExpertInput
      | ScheduledCallUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutExpertInput
      | ScheduledCallUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutSenderInput,
          MessageUncheckedCreateWithoutSenderInput
        >
      | MessageCreateWithoutSenderInput[]
      | MessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutSenderInput
      | MessageCreateOrConnectWithoutSenderInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutSenderInput
      | MessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: MessageCreateManySenderInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutSenderInput
      | MessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutSenderInput
      | MessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutReceiverInput,
          MessageUncheckedCreateWithoutReceiverInput
        >
      | MessageCreateWithoutReceiverInput[]
      | MessageUncheckedCreateWithoutReceiverInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutReceiverInput
      | MessageCreateOrConnectWithoutReceiverInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutReceiverInput
      | MessageUpsertWithWhereUniqueWithoutReceiverInput[];
    createMany?: MessageCreateManyReceiverInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutReceiverInput
      | MessageUpdateWithWhereUniqueWithoutReceiverInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutReceiverInput
      | MessageUpdateManyWithWhereWithoutReceiverInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
      | ReviewCreateWithoutUserInput[]
      | ReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutUserInput
      | ReviewCreateOrConnectWithoutUserInput[];
    upsert?:
      | ReviewUpsertWithWhereUniqueWithoutUserInput
      | ReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ReviewCreateManyUserInputEnvelope;
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    update?:
      | ReviewUpdateWithWhereUniqueWithoutUserInput
      | ReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ReviewUpdateManyWithWhereWithoutUserInput
      | ReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
  };

  export type ReviewUncheckedUpdateManyWithoutExpertNestedInput = {
    create?:
      | XOR<
          ReviewCreateWithoutExpertInput,
          ReviewUncheckedCreateWithoutExpertInput
        >
      | ReviewCreateWithoutExpertInput[]
      | ReviewUncheckedCreateWithoutExpertInput[];
    connectOrCreate?:
      | ReviewCreateOrConnectWithoutExpertInput
      | ReviewCreateOrConnectWithoutExpertInput[];
    upsert?:
      | ReviewUpsertWithWhereUniqueWithoutExpertInput
      | ReviewUpsertWithWhereUniqueWithoutExpertInput[];
    createMany?: ReviewCreateManyExpertInputEnvelope;
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[];
    update?:
      | ReviewUpdateWithWhereUniqueWithoutExpertInput
      | ReviewUpdateWithWhereUniqueWithoutExpertInput[];
    updateMany?:
      | ReviewUpdateManyWithWhereWithoutExpertInput
      | ReviewUpdateManyWithWhereWithoutExpertInput[];
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutUserCallsInput = {
    create?: XOR<
      UserCreateWithoutUserCallsInput,
      UserUncheckedCreateWithoutUserCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutUserCallsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutExpertCallsInput = {
    create?: XOR<
      UserCreateWithoutExpertCallsInput,
      UserUncheckedCreateWithoutExpertCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExpertCallsInput;
    connect?: UserWhereUniqueInput;
  };

  export type ScheduledCallCreateNestedManyWithoutActualCallInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutActualCallInput,
          ScheduledCallUncheckedCreateWithoutActualCallInput
        >
      | ScheduledCallCreateWithoutActualCallInput[]
      | ScheduledCallUncheckedCreateWithoutActualCallInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutActualCallInput
      | ScheduledCallCreateOrConnectWithoutActualCallInput[];
    createMany?: ScheduledCallCreateManyActualCallInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type ScheduledCallUncheckedCreateNestedManyWithoutActualCallInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutActualCallInput,
          ScheduledCallUncheckedCreateWithoutActualCallInput
        >
      | ScheduledCallCreateWithoutActualCallInput[]
      | ScheduledCallUncheckedCreateWithoutActualCallInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutActualCallInput
      | ScheduledCallCreateOrConnectWithoutActualCallInput[];
    createMany?: ScheduledCallCreateManyActualCallInputEnvelope;
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
  };

  export type EnumCallTypeFieldUpdateOperationsInput = {
    set?: $Enums.CallType;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumCallStatusFieldUpdateOperationsInput = {
    set?: $Enums.CallStatus;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type UserUpdateOneRequiredWithoutUserCallsNestedInput = {
    create?: XOR<
      UserCreateWithoutUserCallsInput,
      UserUncheckedCreateWithoutUserCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutUserCallsInput;
    upsert?: UserUpsertWithoutUserCallsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutUserCallsInput,
        UserUpdateWithoutUserCallsInput
      >,
      UserUncheckedUpdateWithoutUserCallsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutExpertCallsNestedInput = {
    create?: XOR<
      UserCreateWithoutExpertCallsInput,
      UserUncheckedCreateWithoutExpertCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExpertCallsInput;
    upsert?: UserUpsertWithoutExpertCallsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutExpertCallsInput,
        UserUpdateWithoutExpertCallsInput
      >,
      UserUncheckedUpdateWithoutExpertCallsInput
    >;
  };

  export type ScheduledCallUpdateManyWithoutActualCallNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutActualCallInput,
          ScheduledCallUncheckedCreateWithoutActualCallInput
        >
      | ScheduledCallCreateWithoutActualCallInput[]
      | ScheduledCallUncheckedCreateWithoutActualCallInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutActualCallInput
      | ScheduledCallCreateOrConnectWithoutActualCallInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutActualCallInput
      | ScheduledCallUpsertWithWhereUniqueWithoutActualCallInput[];
    createMany?: ScheduledCallCreateManyActualCallInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutActualCallInput
      | ScheduledCallUpdateWithWhereUniqueWithoutActualCallInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutActualCallInput
      | ScheduledCallUpdateManyWithWhereWithoutActualCallInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type ScheduledCallUncheckedUpdateManyWithoutActualCallNestedInput = {
    create?:
      | XOR<
          ScheduledCallCreateWithoutActualCallInput,
          ScheduledCallUncheckedCreateWithoutActualCallInput
        >
      | ScheduledCallCreateWithoutActualCallInput[]
      | ScheduledCallUncheckedCreateWithoutActualCallInput[];
    connectOrCreate?:
      | ScheduledCallCreateOrConnectWithoutActualCallInput
      | ScheduledCallCreateOrConnectWithoutActualCallInput[];
    upsert?:
      | ScheduledCallUpsertWithWhereUniqueWithoutActualCallInput
      | ScheduledCallUpsertWithWhereUniqueWithoutActualCallInput[];
    createMany?: ScheduledCallCreateManyActualCallInputEnvelope;
    set?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    disconnect?:
      | ScheduledCallWhereUniqueInput
      | ScheduledCallWhereUniqueInput[];
    delete?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    connect?: ScheduledCallWhereUniqueInput | ScheduledCallWhereUniqueInput[];
    update?:
      | ScheduledCallUpdateWithWhereUniqueWithoutActualCallInput
      | ScheduledCallUpdateWithWhereUniqueWithoutActualCallInput[];
    updateMany?:
      | ScheduledCallUpdateManyWithWhereWithoutActualCallInput
      | ScheduledCallUpdateManyWithWhereWithoutActualCallInput[];
    deleteMany?:
      | ScheduledCallScalarWhereInput
      | ScheduledCallScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<
      UserCreateWithoutSentMessagesInput,
      UserUncheckedCreateWithoutSentMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<
      UserCreateWithoutReceivedMessagesInput,
      UserUncheckedCreateWithoutReceivedMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType;
  };

  export type EnumMessageStatusFieldUpdateOperationsInput = {
    set?: $Enums.MessageStatus;
  };

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<
      UserCreateWithoutSentMessagesInput,
      UserUncheckedCreateWithoutSentMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput;
    upsert?: UserUpsertWithoutSentMessagesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSentMessagesInput,
        UserUpdateWithoutSentMessagesInput
      >,
      UserUncheckedUpdateWithoutSentMessagesInput
    >;
  };

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<
      UserCreateWithoutReceivedMessagesInput,
      UserUncheckedCreateWithoutReceivedMessagesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput;
    upsert?: UserUpsertWithoutReceivedMessagesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReceivedMessagesInput,
        UserUpdateWithoutReceivedMessagesInput
      >,
      UserUncheckedUpdateWithoutReceivedMessagesInput
    >;
  };

  export type UserCreateNestedOneWithoutScheduledCallsInput = {
    create?: XOR<
      UserCreateWithoutScheduledCallsInput,
      UserUncheckedCreateWithoutScheduledCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutScheduledCallsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutExpertSchedulesInput = {
    create?: XOR<
      UserCreateWithoutExpertSchedulesInput,
      UserUncheckedCreateWithoutExpertSchedulesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExpertSchedulesInput;
    connect?: UserWhereUniqueInput;
  };

  export type CallCreateNestedOneWithoutScheduledCallInput = {
    create?: XOR<
      CallCreateWithoutScheduledCallInput,
      CallUncheckedCreateWithoutScheduledCallInput
    >;
    connectOrCreate?: CallCreateOrConnectWithoutScheduledCallInput;
    connect?: CallWhereUniqueInput;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumScheduledCallStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScheduledCallStatus;
  };

  export type UserUpdateOneRequiredWithoutScheduledCallsNestedInput = {
    create?: XOR<
      UserCreateWithoutScheduledCallsInput,
      UserUncheckedCreateWithoutScheduledCallsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutScheduledCallsInput;
    upsert?: UserUpsertWithoutScheduledCallsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutScheduledCallsInput,
        UserUpdateWithoutScheduledCallsInput
      >,
      UserUncheckedUpdateWithoutScheduledCallsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutExpertSchedulesNestedInput = {
    create?: XOR<
      UserCreateWithoutExpertSchedulesInput,
      UserUncheckedCreateWithoutExpertSchedulesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutExpertSchedulesInput;
    upsert?: UserUpsertWithoutExpertSchedulesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutExpertSchedulesInput,
        UserUpdateWithoutExpertSchedulesInput
      >,
      UserUncheckedUpdateWithoutExpertSchedulesInput
    >;
  };

  export type CallUpdateOneWithoutScheduledCallNestedInput = {
    create?: XOR<
      CallCreateWithoutScheduledCallInput,
      CallUncheckedCreateWithoutScheduledCallInput
    >;
    connectOrCreate?: CallCreateOrConnectWithoutScheduledCallInput;
    upsert?: CallUpsertWithoutScheduledCallInput;
    disconnect?: CallWhereInput | boolean;
    delete?: CallWhereInput | boolean;
    connect?: CallWhereUniqueInput;
    update?: XOR<
      XOR<
        CallUpdateToOneWithWhereWithoutScheduledCallInput,
        CallUpdateWithoutScheduledCallInput
      >,
      CallUncheckedUpdateWithoutScheduledCallInput
    >;
  };

  export type UserCreateNestedOneWithoutReviewsGivenInput = {
    create?: XOR<
      UserCreateWithoutReviewsGivenInput,
      UserUncheckedCreateWithoutReviewsGivenInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutReviewsReceivedInput = {
    create?: XOR<
      UserCreateWithoutReviewsReceivedInput,
      UserUncheckedCreateWithoutReviewsReceivedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutReviewsGivenNestedInput = {
    create?: XOR<
      UserCreateWithoutReviewsGivenInput,
      UserUncheckedCreateWithoutReviewsGivenInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReviewsGivenInput;
    upsert?: UserUpsertWithoutReviewsGivenInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReviewsGivenInput,
        UserUpdateWithoutReviewsGivenInput
      >,
      UserUncheckedUpdateWithoutReviewsGivenInput
    >;
  };

  export type UserUpdateOneRequiredWithoutReviewsReceivedNestedInput = {
    create?: XOR<
      UserCreateWithoutReviewsReceivedInput,
      UserUncheckedCreateWithoutReviewsReceivedInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput;
    upsert?: UserUpsertWithoutReviewsReceivedInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutReviewsReceivedInput,
        UserUpdateWithoutReviewsReceivedInput
      >,
      UserUncheckedUpdateWithoutReviewsReceivedInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedEnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null;
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null;
      in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
      notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null;
      not?:
        | NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel>
        | $Enums.Role
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedEnumRoleNullableFilter<$PrismaModel>;
      _max?: NestedEnumRoleNullableFilter<$PrismaModel>;
    };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedEnumCallTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumCallTypeFilter<$PrismaModel> | $Enums.CallType;
  };

  export type NestedEnumCallStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CallStatus | EnumCallStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumCallStatusFilter<$PrismaModel> | $Enums.CallStatus;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumCallTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallType | EnumCallTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallType[] | ListEnumCallTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCallTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.CallType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCallTypeFilter<$PrismaModel>;
    _max?: NestedEnumCallTypeFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumCallStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CallStatus | EnumCallStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.CallStatus[] | ListEnumCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumCallStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.CallStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumCallStatusFilter<$PrismaModel>;
    _max?: NestedEnumCallStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageType[]
      | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType;
  };

  export type NestedEnumMessageStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.MessageStatus
      | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumMessageStatusFilter<$PrismaModel> | $Enums.MessageStatus;
  };

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.MessageType[]
        | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.MessageType[]
        | ListEnumMessageTypeFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel>
        | $Enums.MessageType;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumMessageTypeFilter<$PrismaModel>;
      _max?: NestedEnumMessageTypeFilter<$PrismaModel>;
    };

  export type NestedEnumMessageStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.MessageStatus
      | EnumMessageStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.MessageStatus[]
      | ListEnumMessageStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumMessageStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.MessageStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumMessageStatusFilter<$PrismaModel>;
    _max?: NestedEnumMessageStatusFilter<$PrismaModel>;
  };

  export type NestedEnumScheduledCallStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.ScheduledCallStatus
      | EnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumScheduledCallStatusFilter<$PrismaModel>
      | $Enums.ScheduledCallStatus;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedEnumScheduledCallStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.ScheduledCallStatus
      | EnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.ScheduledCallStatus[]
      | ListEnumScheduledCallStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumScheduledCallStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.ScheduledCallStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumScheduledCallStatusFilter<$PrismaModel>;
    _max?: NestedEnumScheduledCallStatusFilter<$PrismaModel>;
  };

  export type CallCreateWithoutUserInput = {
    id?: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    expert: UserCreateNestedOneWithoutExpertCallsInput;
    ScheduledCall?: ScheduledCallCreateNestedManyWithoutActualCallInput;
  };

  export type CallUncheckedCreateWithoutUserInput = {
    id?: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedCreateNestedManyWithoutActualCallInput;
  };

  export type CallCreateOrConnectWithoutUserInput = {
    where: CallWhereUniqueInput;
    create: XOR<
      CallCreateWithoutUserInput,
      CallUncheckedCreateWithoutUserInput
    >;
  };

  export type CallCreateManyUserInputEnvelope = {
    data: CallCreateManyUserInput | CallCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type CallCreateWithoutExpertInput = {
    id?: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    user: UserCreateNestedOneWithoutUserCallsInput;
    ScheduledCall?: ScheduledCallCreateNestedManyWithoutActualCallInput;
  };

  export type CallUncheckedCreateWithoutExpertInput = {
    id?: string;
    userId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedCreateNestedManyWithoutActualCallInput;
  };

  export type CallCreateOrConnectWithoutExpertInput = {
    where: CallWhereUniqueInput;
    create: XOR<
      CallCreateWithoutExpertInput,
      CallUncheckedCreateWithoutExpertInput
    >;
  };

  export type CallCreateManyExpertInputEnvelope = {
    data: CallCreateManyExpertInput | CallCreateManyExpertInput[];
    skipDuplicates?: boolean;
  };

  export type ScheduledCallCreateWithoutUserInput = {
    id?: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    expert: UserCreateNestedOneWithoutExpertSchedulesInput;
    actualCall?: CallCreateNestedOneWithoutScheduledCallInput;
  };

  export type ScheduledCallUncheckedCreateWithoutUserInput = {
    id?: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type ScheduledCallCreateOrConnectWithoutUserInput = {
    where: ScheduledCallWhereUniqueInput;
    create: XOR<
      ScheduledCallCreateWithoutUserInput,
      ScheduledCallUncheckedCreateWithoutUserInput
    >;
  };

  export type ScheduledCallCreateManyUserInputEnvelope = {
    data: ScheduledCallCreateManyUserInput | ScheduledCallCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ScheduledCallCreateWithoutExpertInput = {
    id?: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutScheduledCallsInput;
    actualCall?: CallCreateNestedOneWithoutScheduledCallInput;
  };

  export type ScheduledCallUncheckedCreateWithoutExpertInput = {
    id?: string;
    userId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type ScheduledCallCreateOrConnectWithoutExpertInput = {
    where: ScheduledCallWhereUniqueInput;
    create: XOR<
      ScheduledCallCreateWithoutExpertInput,
      ScheduledCallUncheckedCreateWithoutExpertInput
    >;
  };

  export type ScheduledCallCreateManyExpertInputEnvelope = {
    data:
      | ScheduledCallCreateManyExpertInput
      | ScheduledCallCreateManyExpertInput[];
    skipDuplicates?: boolean;
  };

  export type MessageCreateWithoutSenderInput = {
    id?: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput;
  };

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string;
    receiverId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutSenderInput,
      MessageUncheckedCreateWithoutSenderInput
    >;
  };

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[];
    skipDuplicates?: boolean;
  };

  export type MessageCreateWithoutReceiverInput = {
    id?: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
    sender: UserCreateNestedOneWithoutSentMessagesInput;
  };

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: string;
    senderId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutReceiverInput,
      MessageUncheckedCreateWithoutReceiverInput
    >;
  };

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[];
    skipDuplicates?: boolean;
  };

  export type ReviewCreateWithoutUserInput = {
    id?: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    expert: UserCreateNestedOneWithoutReviewsReceivedInput;
  };

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string;
    expertId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput;
    create: XOR<
      ReviewCreateWithoutUserInput,
      ReviewUncheckedCreateWithoutUserInput
    >;
  };

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ReviewCreateWithoutExpertInput = {
    id?: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutReviewsGivenInput;
  };

  export type ReviewUncheckedCreateWithoutExpertInput = {
    id?: string;
    userId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type ReviewCreateOrConnectWithoutExpertInput = {
    where: ReviewWhereUniqueInput;
    create: XOR<
      ReviewCreateWithoutExpertInput,
      ReviewUncheckedCreateWithoutExpertInput
    >;
  };

  export type ReviewCreateManyExpertInputEnvelope = {
    data: ReviewCreateManyExpertInput | ReviewCreateManyExpertInput[];
    skipDuplicates?: boolean;
  };

  export type CallUpsertWithWhereUniqueWithoutUserInput = {
    where: CallWhereUniqueInput;
    update: XOR<
      CallUpdateWithoutUserInput,
      CallUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      CallCreateWithoutUserInput,
      CallUncheckedCreateWithoutUserInput
    >;
  };

  export type CallUpdateWithWhereUniqueWithoutUserInput = {
    where: CallWhereUniqueInput;
    data: XOR<CallUpdateWithoutUserInput, CallUncheckedUpdateWithoutUserInput>;
  };

  export type CallUpdateManyWithWhereWithoutUserInput = {
    where: CallScalarWhereInput;
    data: XOR<
      CallUpdateManyMutationInput,
      CallUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type CallScalarWhereInput = {
    AND?: CallScalarWhereInput | CallScalarWhereInput[];
    OR?: CallScalarWhereInput[];
    NOT?: CallScalarWhereInput | CallScalarWhereInput[];
    id?: StringFilter<"Call"> | string;
    userId?: StringFilter<"Call"> | string;
    expertId?: StringFilter<"Call"> | string;
    callType?: EnumCallTypeFilter<"Call"> | $Enums.CallType;
    duration?: IntFilter<"Call"> | number;
    status?: EnumCallStatusFilter<"Call"> | $Enums.CallStatus;
    startedAt?: DateTimeFilter<"Call"> | Date | string;
    endedAt?: DateTimeNullableFilter<"Call"> | Date | string | null;
  };

  export type CallUpsertWithWhereUniqueWithoutExpertInput = {
    where: CallWhereUniqueInput;
    update: XOR<
      CallUpdateWithoutExpertInput,
      CallUncheckedUpdateWithoutExpertInput
    >;
    create: XOR<
      CallCreateWithoutExpertInput,
      CallUncheckedCreateWithoutExpertInput
    >;
  };

  export type CallUpdateWithWhereUniqueWithoutExpertInput = {
    where: CallWhereUniqueInput;
    data: XOR<
      CallUpdateWithoutExpertInput,
      CallUncheckedUpdateWithoutExpertInput
    >;
  };

  export type CallUpdateManyWithWhereWithoutExpertInput = {
    where: CallScalarWhereInput;
    data: XOR<
      CallUpdateManyMutationInput,
      CallUncheckedUpdateManyWithoutExpertInput
    >;
  };

  export type ScheduledCallUpsertWithWhereUniqueWithoutUserInput = {
    where: ScheduledCallWhereUniqueInput;
    update: XOR<
      ScheduledCallUpdateWithoutUserInput,
      ScheduledCallUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ScheduledCallCreateWithoutUserInput,
      ScheduledCallUncheckedCreateWithoutUserInput
    >;
  };

  export type ScheduledCallUpdateWithWhereUniqueWithoutUserInput = {
    where: ScheduledCallWhereUniqueInput;
    data: XOR<
      ScheduledCallUpdateWithoutUserInput,
      ScheduledCallUncheckedUpdateWithoutUserInput
    >;
  };

  export type ScheduledCallUpdateManyWithWhereWithoutUserInput = {
    where: ScheduledCallScalarWhereInput;
    data: XOR<
      ScheduledCallUpdateManyMutationInput,
      ScheduledCallUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ScheduledCallScalarWhereInput = {
    AND?: ScheduledCallScalarWhereInput | ScheduledCallScalarWhereInput[];
    OR?: ScheduledCallScalarWhereInput[];
    NOT?: ScheduledCallScalarWhereInput | ScheduledCallScalarWhereInput[];
    id?: StringFilter<"ScheduledCall"> | string;
    userId?: StringFilter<"ScheduledCall"> | string;
    expertId?: StringFilter<"ScheduledCall"> | string;
    callType?: EnumCallTypeFilter<"ScheduledCall"> | $Enums.CallType;
    scheduledAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
    duration?: IntNullableFilter<"ScheduledCall"> | number | null;
    status?:
      | EnumScheduledCallStatusFilter<"ScheduledCall">
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFilter<"ScheduledCall"> | Date | string;
    actualCallId?: StringNullableFilter<"ScheduledCall"> | string | null;
  };

  export type ScheduledCallUpsertWithWhereUniqueWithoutExpertInput = {
    where: ScheduledCallWhereUniqueInput;
    update: XOR<
      ScheduledCallUpdateWithoutExpertInput,
      ScheduledCallUncheckedUpdateWithoutExpertInput
    >;
    create: XOR<
      ScheduledCallCreateWithoutExpertInput,
      ScheduledCallUncheckedCreateWithoutExpertInput
    >;
  };

  export type ScheduledCallUpdateWithWhereUniqueWithoutExpertInput = {
    where: ScheduledCallWhereUniqueInput;
    data: XOR<
      ScheduledCallUpdateWithoutExpertInput,
      ScheduledCallUncheckedUpdateWithoutExpertInput
    >;
  };

  export type ScheduledCallUpdateManyWithWhereWithoutExpertInput = {
    where: ScheduledCallScalarWhereInput;
    data: XOR<
      ScheduledCallUpdateManyMutationInput,
      ScheduledCallUncheckedUpdateManyWithoutExpertInput
    >;
  };

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutSenderInput,
      MessageUncheckedUpdateWithoutSenderInput
    >;
    create: XOR<
      MessageCreateWithoutSenderInput,
      MessageUncheckedCreateWithoutSenderInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutSenderInput,
      MessageUncheckedUpdateWithoutSenderInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutSenderInput
    >;
  };

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[];
    OR?: MessageScalarWhereInput[];
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[];
    id?: StringFilter<"Message"> | string;
    senderId?: StringFilter<"Message"> | string;
    receiverId?: StringFilter<"Message"> | string;
    messageType?: EnumMessageTypeFilter<"Message"> | $Enums.MessageType;
    content?: StringNullableFilter<"Message"> | string | null;
    mediaUrl?: StringNullableFilter<"Message"> | string | null;
    status?: EnumMessageStatusFilter<"Message"> | $Enums.MessageStatus;
    sentAt?: DateTimeFilter<"Message"> | Date | string;
    deliveredAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
    readAt?: DateTimeNullableFilter<"Message"> | Date | string | null;
  };

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutReceiverInput,
      MessageUncheckedUpdateWithoutReceiverInput
    >;
    create: XOR<
      MessageCreateWithoutReceiverInput,
      MessageUncheckedCreateWithoutReceiverInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutReceiverInput,
      MessageUncheckedUpdateWithoutReceiverInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutReceiverInput
    >;
  };

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput;
    update: XOR<
      ReviewUpdateWithoutUserInput,
      ReviewUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ReviewCreateWithoutUserInput,
      ReviewUncheckedCreateWithoutUserInput
    >;
  };

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput;
    data: XOR<
      ReviewUpdateWithoutUserInput,
      ReviewUncheckedUpdateWithoutUserInput
    >;
  };

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput;
    data: XOR<
      ReviewUpdateManyMutationInput,
      ReviewUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
    OR?: ReviewScalarWhereInput[];
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[];
    id?: StringFilter<"Review"> | string;
    userId?: StringFilter<"Review"> | string;
    expertId?: StringFilter<"Review"> | string;
    rating?: IntFilter<"Review"> | number;
    comment?: StringNullableFilter<"Review"> | string | null;
    createdAt?: DateTimeFilter<"Review"> | Date | string;
  };

  export type ReviewUpsertWithWhereUniqueWithoutExpertInput = {
    where: ReviewWhereUniqueInput;
    update: XOR<
      ReviewUpdateWithoutExpertInput,
      ReviewUncheckedUpdateWithoutExpertInput
    >;
    create: XOR<
      ReviewCreateWithoutExpertInput,
      ReviewUncheckedCreateWithoutExpertInput
    >;
  };

  export type ReviewUpdateWithWhereUniqueWithoutExpertInput = {
    where: ReviewWhereUniqueInput;
    data: XOR<
      ReviewUpdateWithoutExpertInput,
      ReviewUncheckedUpdateWithoutExpertInput
    >;
  };

  export type ReviewUpdateManyWithWhereWithoutExpertInput = {
    where: ReviewScalarWhereInput;
    data: XOR<
      ReviewUpdateManyMutationInput,
      ReviewUncheckedUpdateManyWithoutExpertInput
    >;
  };

  export type UserCreateWithoutUserCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutUserCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutUserCallsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutUserCallsInput,
      UserUncheckedCreateWithoutUserCallsInput
    >;
  };

  export type UserCreateWithoutExpertCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutExpertCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutExpertCallsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutExpertCallsInput,
      UserUncheckedCreateWithoutExpertCallsInput
    >;
  };

  export type ScheduledCallCreateWithoutActualCallInput = {
    id?: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutScheduledCallsInput;
    expert: UserCreateNestedOneWithoutExpertSchedulesInput;
  };

  export type ScheduledCallUncheckedCreateWithoutActualCallInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
  };

  export type ScheduledCallCreateOrConnectWithoutActualCallInput = {
    where: ScheduledCallWhereUniqueInput;
    create: XOR<
      ScheduledCallCreateWithoutActualCallInput,
      ScheduledCallUncheckedCreateWithoutActualCallInput
    >;
  };

  export type ScheduledCallCreateManyActualCallInputEnvelope = {
    data:
      | ScheduledCallCreateManyActualCallInput
      | ScheduledCallCreateManyActualCallInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutUserCallsInput = {
    update: XOR<
      UserUpdateWithoutUserCallsInput,
      UserUncheckedUpdateWithoutUserCallsInput
    >;
    create: XOR<
      UserCreateWithoutUserCallsInput,
      UserUncheckedCreateWithoutUserCallsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutUserCallsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutUserCallsInput,
      UserUncheckedUpdateWithoutUserCallsInput
    >;
  };

  export type UserUpdateWithoutUserCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutUserCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserUpsertWithoutExpertCallsInput = {
    update: XOR<
      UserUpdateWithoutExpertCallsInput,
      UserUncheckedUpdateWithoutExpertCallsInput
    >;
    create: XOR<
      UserCreateWithoutExpertCallsInput,
      UserUncheckedCreateWithoutExpertCallsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutExpertCallsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutExpertCallsInput,
      UserUncheckedUpdateWithoutExpertCallsInput
    >;
  };

  export type UserUpdateWithoutExpertCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutExpertCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type ScheduledCallUpsertWithWhereUniqueWithoutActualCallInput = {
    where: ScheduledCallWhereUniqueInput;
    update: XOR<
      ScheduledCallUpdateWithoutActualCallInput,
      ScheduledCallUncheckedUpdateWithoutActualCallInput
    >;
    create: XOR<
      ScheduledCallCreateWithoutActualCallInput,
      ScheduledCallUncheckedCreateWithoutActualCallInput
    >;
  };

  export type ScheduledCallUpdateWithWhereUniqueWithoutActualCallInput = {
    where: ScheduledCallWhereUniqueInput;
    data: XOR<
      ScheduledCallUpdateWithoutActualCallInput,
      ScheduledCallUncheckedUpdateWithoutActualCallInput
    >;
  };

  export type ScheduledCallUpdateManyWithWhereWithoutActualCallInput = {
    where: ScheduledCallScalarWhereInput;
    data: XOR<
      ScheduledCallUpdateManyMutationInput,
      ScheduledCallUncheckedUpdateManyWithoutActualCallInput
    >;
  };

  export type UserCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSentMessagesInput,
      UserUncheckedCreateWithoutSentMessagesInput
    >;
  };

  export type UserCreateWithoutReceivedMessagesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReceivedMessagesInput,
      UserUncheckedCreateWithoutReceivedMessagesInput
    >;
  };

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<
      UserUpdateWithoutSentMessagesInput,
      UserUncheckedUpdateWithoutSentMessagesInput
    >;
    create: XOR<
      UserCreateWithoutSentMessagesInput,
      UserUncheckedCreateWithoutSentMessagesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSentMessagesInput,
      UserUncheckedUpdateWithoutSentMessagesInput
    >;
  };

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<
      UserUpdateWithoutReceivedMessagesInput,
      UserUncheckedUpdateWithoutReceivedMessagesInput
    >;
    create: XOR<
      UserCreateWithoutReceivedMessagesInput,
      UserUncheckedCreateWithoutReceivedMessagesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReceivedMessagesInput,
      UserUncheckedUpdateWithoutReceivedMessagesInput
    >;
  };

  export type UserUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserCreateWithoutScheduledCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutScheduledCallsInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutScheduledCallsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutScheduledCallsInput,
      UserUncheckedCreateWithoutScheduledCallsInput
    >;
  };

  export type UserCreateWithoutExpertSchedulesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutExpertSchedulesInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutExpertSchedulesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutExpertSchedulesInput,
      UserUncheckedCreateWithoutExpertSchedulesInput
    >;
  };

  export type CallCreateWithoutScheduledCallInput = {
    id?: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
    user: UserCreateNestedOneWithoutUserCallsInput;
    expert: UserCreateNestedOneWithoutExpertCallsInput;
  };

  export type CallUncheckedCreateWithoutScheduledCallInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
  };

  export type CallCreateOrConnectWithoutScheduledCallInput = {
    where: CallWhereUniqueInput;
    create: XOR<
      CallCreateWithoutScheduledCallInput,
      CallUncheckedCreateWithoutScheduledCallInput
    >;
  };

  export type UserUpsertWithoutScheduledCallsInput = {
    update: XOR<
      UserUpdateWithoutScheduledCallsInput,
      UserUncheckedUpdateWithoutScheduledCallsInput
    >;
    create: XOR<
      UserCreateWithoutScheduledCallsInput,
      UserUncheckedCreateWithoutScheduledCallsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutScheduledCallsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutScheduledCallsInput,
      UserUncheckedUpdateWithoutScheduledCallsInput
    >;
  };

  export type UserUpdateWithoutScheduledCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutScheduledCallsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserUpsertWithoutExpertSchedulesInput = {
    update: XOR<
      UserUpdateWithoutExpertSchedulesInput,
      UserUncheckedUpdateWithoutExpertSchedulesInput
    >;
    create: XOR<
      UserCreateWithoutExpertSchedulesInput,
      UserUncheckedCreateWithoutExpertSchedulesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutExpertSchedulesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutExpertSchedulesInput,
      UserUncheckedUpdateWithoutExpertSchedulesInput
    >;
  };

  export type UserUpdateWithoutExpertSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutExpertSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type CallUpsertWithoutScheduledCallInput = {
    update: XOR<
      CallUpdateWithoutScheduledCallInput,
      CallUncheckedUpdateWithoutScheduledCallInput
    >;
    create: XOR<
      CallCreateWithoutScheduledCallInput,
      CallUncheckedCreateWithoutScheduledCallInput
    >;
    where?: CallWhereInput;
  };

  export type CallUpdateToOneWithWhereWithoutScheduledCallInput = {
    where?: CallWhereInput;
    data: XOR<
      CallUpdateWithoutScheduledCallInput,
      CallUncheckedUpdateWithoutScheduledCallInput
    >;
  };

  export type CallUpdateWithoutScheduledCallInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: UserUpdateOneRequiredWithoutUserCallsNestedInput;
    expert?: UserUpdateOneRequiredWithoutExpertCallsNestedInput;
  };

  export type CallUncheckedUpdateWithoutScheduledCallInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type UserCreateWithoutReviewsGivenInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsReceived?: ReviewCreateNestedManyWithoutExpertInput;
  };

  export type UserUncheckedCreateWithoutReviewsGivenInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutExpertInput;
  };

  export type UserCreateOrConnectWithoutReviewsGivenInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReviewsGivenInput,
      UserUncheckedCreateWithoutReviewsGivenInput
    >;
  };

  export type UserCreateWithoutReviewsReceivedInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallCreateNestedManyWithoutUserInput;
    expertCalls?: CallCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutReviewsReceivedInput = {
    id?: string;
    email: string;
    role?: $Enums.Role | null;
    createdAt?: Date | string;
    firstName?: string | null;
    lastName?: string | null;
    updatedAt?: Date | string;
    gender?: string | null;
    bio?: string | null;
    externalId?: string | null;
    expertise?: string | null;
    profilePic?: string | null;
    phone?: string | null;
    username?: string | null;
    certifications?: string | null;
    yearsOfExperience?: string | null;
    availability?: string | null;
    hourlyRate?: string | null;
    interests?: string | null;
    preferences?: string | null;
    skills?: UserCreateskillsInput | string[];
    userCalls?: CallUncheckedCreateNestedManyWithoutUserInput;
    expertCalls?: CallUncheckedCreateNestedManyWithoutExpertInput;
    scheduledCalls?: ScheduledCallUncheckedCreateNestedManyWithoutUserInput;
    expertSchedules?: ScheduledCallUncheckedCreateNestedManyWithoutExpertInput;
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput;
    reviewsGiven?: ReviewUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutReviewsReceivedInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutReviewsReceivedInput,
      UserUncheckedCreateWithoutReviewsReceivedInput
    >;
  };

  export type UserUpsertWithoutReviewsGivenInput = {
    update: XOR<
      UserUpdateWithoutReviewsGivenInput,
      UserUncheckedUpdateWithoutReviewsGivenInput
    >;
    create: XOR<
      UserCreateWithoutReviewsGivenInput,
      UserUncheckedCreateWithoutReviewsGivenInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReviewsGivenInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReviewsGivenInput,
      UserUncheckedUpdateWithoutReviewsGivenInput
    >;
  };

  export type UserUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsReceived?: ReviewUpdateManyWithoutExpertNestedInput;
  };

  export type UserUncheckedUpdateWithoutReviewsGivenInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutExpertNestedInput;
  };

  export type UserUpsertWithoutReviewsReceivedInput = {
    update: XOR<
      UserUpdateWithoutReviewsReceivedInput,
      UserUncheckedUpdateWithoutReviewsReceivedInput
    >;
    create: XOR<
      UserCreateWithoutReviewsReceivedInput,
      UserUncheckedCreateWithoutReviewsReceivedInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutReviewsReceivedInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutReviewsReceivedInput,
      UserUncheckedUpdateWithoutReviewsReceivedInput
    >;
  };

  export type UserUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    firstName?: NullableStringFieldUpdateOperationsInput | string | null;
    lastName?: NullableStringFieldUpdateOperationsInput | string | null;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    gender?: NullableStringFieldUpdateOperationsInput | string | null;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    externalId?: NullableStringFieldUpdateOperationsInput | string | null;
    expertise?: NullableStringFieldUpdateOperationsInput | string | null;
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    username?: NullableStringFieldUpdateOperationsInput | string | null;
    certifications?: NullableStringFieldUpdateOperationsInput | string | null;
    yearsOfExperience?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    availability?: NullableStringFieldUpdateOperationsInput | string | null;
    hourlyRate?: NullableStringFieldUpdateOperationsInput | string | null;
    interests?: NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: NullableStringFieldUpdateOperationsInput | string | null;
    skills?: UserUpdateskillsInput | string[];
    userCalls?: CallUncheckedUpdateManyWithoutUserNestedInput;
    expertCalls?: CallUncheckedUpdateManyWithoutExpertNestedInput;
    scheduledCalls?: ScheduledCallUncheckedUpdateManyWithoutUserNestedInput;
    expertSchedules?: ScheduledCallUncheckedUpdateManyWithoutExpertNestedInput;
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput;
    reviewsGiven?: ReviewUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type CallCreateManyUserInput = {
    id?: string;
    expertId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
  };

  export type CallCreateManyExpertInput = {
    id?: string;
    userId: string;
    callType: $Enums.CallType;
    duration: number;
    status: $Enums.CallStatus;
    startedAt: Date | string;
    endedAt?: Date | string | null;
  };

  export type ScheduledCallCreateManyUserInput = {
    id?: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type ScheduledCallCreateManyExpertInput = {
    id?: string;
    userId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
    actualCallId?: string | null;
  };

  export type MessageCreateManySenderInput = {
    id?: string;
    receiverId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type MessageCreateManyReceiverInput = {
    id?: string;
    senderId: string;
    messageType: $Enums.MessageType;
    content?: string | null;
    mediaUrl?: string | null;
    status?: $Enums.MessageStatus;
    sentAt?: Date | string;
    deliveredAt?: Date | string | null;
    readAt?: Date | string | null;
  };

  export type ReviewCreateManyUserInput = {
    id?: string;
    expertId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type ReviewCreateManyExpertInput = {
    id?: string;
    userId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date | string;
  };

  export type CallUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expert?: UserUpdateOneRequiredWithoutExpertCallsNestedInput;
    ScheduledCall?: ScheduledCallUpdateManyWithoutActualCallNestedInput;
  };

  export type CallUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedUpdateManyWithoutActualCallNestedInput;
  };

  export type CallUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type CallUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: UserUpdateOneRequiredWithoutUserCallsNestedInput;
    ScheduledCall?: ScheduledCallUpdateManyWithoutActualCallNestedInput;
  };

  export type CallUncheckedUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    ScheduledCall?: ScheduledCallUncheckedUpdateManyWithoutActualCallNestedInput;
  };

  export type CallUncheckedUpdateManyWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    duration?: IntFieldUpdateOperationsInput | number;
    status?: EnumCallStatusFieldUpdateOperationsInput | $Enums.CallStatus;
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ScheduledCallUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expert?: UserUpdateOneRequiredWithoutExpertSchedulesNestedInput;
    actualCall?: CallUpdateOneWithoutScheduledCallNestedInput;
  };

  export type ScheduledCallUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ScheduledCallUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ScheduledCallUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutScheduledCallsNestedInput;
    actualCall?: CallUpdateOneWithoutScheduledCallNestedInput;
  };

  export type ScheduledCallUncheckedUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type ScheduledCallUncheckedUpdateManyWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    actualCallId?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput;
  };

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    receiverId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string;
    receiverId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput;
  };

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    senderId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string;
    senderId?: StringFieldUpdateOperationsInput | string;
    messageType?:
      | EnumMessageTypeFieldUpdateOperationsInput
      | $Enums.MessageType;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null;
    status?: EnumMessageStatusFieldUpdateOperationsInput | $Enums.MessageStatus;
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    deliveredAt?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    readAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
  };

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    expert?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput;
  };

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReviewUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutReviewsGivenNestedInput;
  };

  export type ReviewUncheckedUpdateWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ReviewUncheckedUpdateManyWithoutExpertInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    rating?: IntFieldUpdateOperationsInput | number;
    comment?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScheduledCallCreateManyActualCallInput = {
    id?: string;
    userId: string;
    expertId: string;
    callType: $Enums.CallType;
    scheduledAt: Date | string;
    duration?: number | null;
    status?: $Enums.ScheduledCallStatus;
    createdAt?: Date | string;
  };

  export type ScheduledCallUpdateWithoutActualCallInput = {
    id?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutScheduledCallsNestedInput;
    expert?: UserUpdateOneRequiredWithoutExpertSchedulesNestedInput;
  };

  export type ScheduledCallUncheckedUpdateWithoutActualCallInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ScheduledCallUncheckedUpdateManyWithoutActualCallInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expertId?: StringFieldUpdateOperationsInput | string;
    callType?: EnumCallTypeFieldUpdateOperationsInput | $Enums.CallType;
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    duration?: NullableIntFieldUpdateOperationsInput | number | null;
    status?:
      | EnumScheduledCallStatusFieldUpdateOperationsInput
      | $Enums.ScheduledCallStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
