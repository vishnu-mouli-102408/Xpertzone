Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require("./runtime/edge.js");

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable",
});

exports.Prisma.UserScalarFieldEnum = {
  id: "id",
  email: "email",
  role: "role",
  createdAt: "createdAt",
  firstName: "firstName",
  lastName: "lastName",
  updatedAt: "updatedAt",
  gender: "gender",
  bio: "bio",
  externalId: "externalId",
  expertise: "expertise",
  profilePic: "profilePic",
  phone: "phone",
  username: "username",
  certifications: "certifications",
  yearsOfExperience: "yearsOfExperience",
  availability: "availability",
  hourlyRate: "hourlyRate",
  interests: "interests",
  preferences: "preferences",
  skills: "skills",
};

exports.Prisma.CallScalarFieldEnum = {
  id: "id",
  userId: "userId",
  expertId: "expertId",
  callType: "callType",
  duration: "duration",
  status: "status",
  startedAt: "startedAt",
  endedAt: "endedAt",
};

exports.Prisma.MessageScalarFieldEnum = {
  id: "id",
  senderId: "senderId",
  receiverId: "receiverId",
  messageType: "messageType",
  content: "content",
  mediaUrl: "mediaUrl",
  status: "status",
  sentAt: "sentAt",
  deliveredAt: "deliveredAt",
  readAt: "readAt",
};

exports.Prisma.ScheduledCallScalarFieldEnum = {
  id: "id",
  userId: "userId",
  expertId: "expertId",
  callType: "callType",
  scheduledAt: "scheduledAt",
  duration: "duration",
  status: "status",
  createdAt: "createdAt",
  actualCallId: "actualCallId",
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  expertId: "expertId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
};

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
};

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
};

exports.Prisma.NullsOrder = {
  first: "first",
  last: "last",
};
exports.Role = exports.$Enums.Role = {
  USER: "USER",
  ADMIN: "ADMIN",
  EXPERT: "EXPERT",
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
};

exports.CallType = exports.$Enums.CallType = {
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
};

exports.Plan = exports.$Enums.Plan = {
  FREE: "FREE",
  PRO: "PRO",
  ENTERPRISE: "ENTERPRISE",
};

exports.CallStatus = exports.$Enums.CallStatus = {
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  MISSED: "MISSED",
  CANCELED: "CANCELED",
};

exports.MessageType = exports.$Enums.MessageType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  FILE: "FILE",
};

exports.MessageStatus = exports.$Enums.MessageStatus = {
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  READ: "READ",
};

exports.ScheduledCallStatus = exports.$Enums.ScheduledCallStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
  COMPLETED: "COMPLETED",
};

exports.Prisma.ModelName = {
  User: "User",
  Call: "Call",
  Message: "Message",
  ScheduledCall: "ScheduledCall",
  Review: "Review",
};
/**
 * Create the Client
 */
const config = {
  generator: {
    name: "client",
    provider: {
      fromEnvVar: null,
      value: "prisma-client-js",
    },
    output: {
      value:
        "/Users/shipmantra/Documents/Developer/Work/xpertzone/packages/db/generated/client",
      fromEnvVar: null,
    },
    config: {
      engineType: "library",
    },
    binaryTargets: [
      {
        fromEnvVar: null,
        value: "darwin-arm64",
        native: true,
      },
    ],
    previewFeatures: [],
    sourceFilePath:
      "/Users/shipmantra/Documents/Developer/Work/xpertzone/packages/db/prisma/schema.prisma",
    isCustomOutput: true,
  },
  relativeEnvPaths: {
    rootEnvPath: null,
    schemaEnvPath: "../../.env",
  },
  relativePath: "../../prisma",
  clientVersion: "6.5.0",
  engineVersion: "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  datasourceNames: ["db"],
  activeProvider: "postgresql",
  postinstall: false,
  inlineDatasources: {
    db: {
      url: {
        fromEnvVar: "DATABASE_URL",
        value: null,
      },
    },
  },
  inlineSchema:
    'generator client {\n  provider = "prisma-client-js"\n  output   = "../generated/client"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nenum Role {\n  USER\n  ADMIN\n  EXPERT\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n}\n\nenum CallType {\n  AUDIO\n  VIDEO\n}\n\nenum Plan {\n  FREE\n  PRO\n  ENTERPRISE\n}\n\nenum CallStatus {\n  ONGOING\n  COMPLETED\n  MISSED\n  CANCELED\n}\n\nenum MessageType {\n  TEXT\n  IMAGE\n  FILE\n}\n\nenum MessageStatus {\n  SENT\n  DELIVERED\n  READ\n}\n\nenum ScheduledCallStatus {\n  PENDING\n  CONFIRMED\n  CANCELED\n  COMPLETED\n}\n\nmodel User {\n  id                String   @id @default(uuid())\n  email             String   @unique\n  role              Role?\n  createdAt         DateTime @default(now())\n  firstName         String?\n  lastName          String?\n  updatedAt         DateTime @updatedAt\n  gender            String?\n  bio               String?\n  externalId        String?  @unique\n  expertise         String?\n  profilePic        String?\n  phone             String?\n  username          String?\n  certifications    String?\n  yearsOfExperience String?\n  availability      String?\n  hourlyRate        String?\n  interests         String?\n  preferences       String?\n  skills            String[] @default([])\n\n  userCalls        Call[]          @relation("UserCalls") // Calls initiated by user\n  expertCalls      Call[]          @relation("ExpertCalls") // Calls received as an expert\n  scheduledCalls   ScheduledCall[] @relation("UserScheduledCalls") // Calls user has scheduled\n  expertSchedules  ScheduledCall[] @relation("ExpertScheduledCalls") // Calls expert is booked for\n  sentMessages     Message[]       @relation("SenderMessages")\n  receivedMessages Message[]       @relation("ReceiverMessages")\n\n  reviewsGiven    Review[] @relation(name: "UserReviews")\n  reviewsReceived Review[] @relation(name: "ExpertReviews")\n\n  @@index([email])\n  @@index([role], name: "idx_user_role") // Index for filtering by role\n  @@index([expertise], name: "idx_user_expertise") // Index for filtering by expertise\n  @@index([hourlyRate], name: "idx_user_hourly_rate") // Index for filtering by hourly rate\n  @@index([skills], name: "idx_user_skills") // Index for searching within skills array\n  @@index([firstName], name: "idx_user_first_name") // For name searches\n  @@index([lastName], name: "idx_user_last_name") // For name searches\n  @@index([username], name: "idx_user_username") // For username searches\n}\n\nmodel Call {\n  id        String     @id @default(uuid())\n  userId    String\n  expertId  String\n  callType  CallType\n  duration  Int // in seconds\n  status    CallStatus\n  startedAt DateTime\n  endedAt   DateTime?\n\n  user   User @relation(fields: [userId], references: [id], name: "UserCalls", onDelete: Cascade)\n  expert User @relation(fields: [expertId], references: [id], name: "ExpertCalls", onDelete: Cascade)\n\n  ScheduledCall ScheduledCall[]\n\n  @@index([userId])\n  @@index([expertId])\n}\n\nmodel Message {\n  id          String        @id @default(uuid())\n  senderId    String\n  receiverId  String\n  messageType MessageType\n  content     String? // Only for TEXT messages\n  mediaUrl    String? // For IMAGE or FILE messages\n  status      MessageStatus @default(SENT)\n  sentAt      DateTime      @default(now())\n  deliveredAt DateTime?\n  readAt      DateTime?\n\n  sender   User @relation(fields: [senderId], references: [id], name: "SenderMessages", onDelete: Cascade)\n  receiver User @relation(fields: [receiverId], references: [id], name: "ReceiverMessages", onDelete: Cascade)\n\n  @@index([senderId])\n  @@index([receiverId])\n}\n\nmodel ScheduledCall {\n  id          String              @id @default(uuid())\n  userId      String\n  expertId    String\n  callType    CallType\n  scheduledAt DateTime // When the call is scheduled\n  duration    Int? // Estimated duration in minutes\n  status      ScheduledCallStatus @default(PENDING)\n  createdAt   DateTime            @default(now())\n\n  // Relations\n  user   User @relation(fields: [userId], references: [id], name: "UserScheduledCalls", onDelete: Cascade)\n  expert User @relation(fields: [expertId], references: [id], name: "ExpertScheduledCalls", onDelete: Cascade)\n\n  actualCallId String? // Nullable since call may not have happened yet\n  actualCall   Call?   @relation(fields: [actualCallId], references: [id], onDelete: Cascade) // Links to completed call\n\n  @@index([userId])\n  @@index([expertId])\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  user   User   @relation(name: "UserReviews", fields: [userId], references: [id], onDelete: Cascade)\n  userId String\n\n  expert   User   @relation(name: "ExpertReviews", fields: [expertId], references: [id], onDelete: Cascade)\n  expertId String\n\n  rating    Int\n  comment   String? // Optional comment\n  createdAt DateTime @default(now())\n\n  @@unique([userId, expertId]) // Ensures a user can review an expert only once\n}\n',
  inlineSchemaHash:
    "6c33fa11095ee2ff158f1858e749b5ec6b286a120355acff211425ec73258009",
  copyEngine: true,
};
config.dirname = "/";

config.runtimeDataModel = JSON.parse(
  '{"models":{"User":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Role","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"firstName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"gender","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bio","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"externalId","kind":"scalar","isList":false,"isRequired":false,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expertise","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profilePic","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"phone","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"username","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"certifications","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"yearsOfExperience","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"availability","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"hourlyRate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"interests","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"preferences","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"skills","kind":"scalar","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":[],"isGenerated":false,"isUpdatedAt":false},{"name":"userCalls","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Call","nativeType":null,"relationName":"UserCalls","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"expertCalls","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Call","nativeType":null,"relationName":"ExpertCalls","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"scheduledCalls","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ScheduledCall","nativeType":null,"relationName":"UserScheduledCalls","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"expertSchedules","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ScheduledCall","nativeType":null,"relationName":"ExpertScheduledCalls","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"sentMessages","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Message","nativeType":null,"relationName":"SenderMessages","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"receivedMessages","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Message","nativeType":null,"relationName":"ReceiverMessages","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"reviewsGiven","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Review","nativeType":null,"relationName":"UserReviews","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"reviewsReceived","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Review","nativeType":null,"relationName":"ExpertReviews","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Call":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expertId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"callType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CallType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CallStatus","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"startedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"endedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserCalls","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"expert","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ExpertCalls","relationFromFields":["expertId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"ScheduledCall","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"ScheduledCall","nativeType":null,"relationName":"CallToScheduledCall","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Message":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"senderId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"receiverId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"messageType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"MessageType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"mediaUrl","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"MessageStatus","nativeType":null,"default":"SENT","isGenerated":false,"isUpdatedAt":false},{"name":"sentAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"deliveredAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"readAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"sender","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"SenderMessages","relationFromFields":["senderId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"receiver","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ReceiverMessages","relationFromFields":["receiverId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"ScheduledCall":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expertId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"callType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"CallType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scheduledAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ScheduledCallStatus","nativeType":null,"default":"PENDING","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserScheduledCalls","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"expert","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ExpertScheduledCalls","relationFromFields":["expertId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"actualCallId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"actualCall","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Call","nativeType":null,"relationName":"CallToScheduledCall","relationFromFields":["actualCallId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Review":{"dbName":null,"schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserReviews","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expert","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ExpertReviews","relationFromFields":["expertId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"expertId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rating","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"comment","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["userId","expertId"]],"uniqueIndexes":[{"name":null,"fields":["userId","expertId"]}],"isGenerated":false}},"enums":{"Role":{"values":[{"name":"USER","dbName":null},{"name":"ADMIN","dbName":null},{"name":"EXPERT","dbName":null}],"dbName":null},"BookingStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"CONFIRMED","dbName":null},{"name":"COMPLETED","dbName":null},{"name":"CANCELLED","dbName":null}],"dbName":null},"PaymentStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"PAID","dbName":null},{"name":"FAILED","dbName":null}],"dbName":null},"CallType":{"values":[{"name":"AUDIO","dbName":null},{"name":"VIDEO","dbName":null}],"dbName":null},"Plan":{"values":[{"name":"FREE","dbName":null},{"name":"PRO","dbName":null},{"name":"ENTERPRISE","dbName":null}],"dbName":null},"CallStatus":{"values":[{"name":"ONGOING","dbName":null},{"name":"COMPLETED","dbName":null},{"name":"MISSED","dbName":null},{"name":"CANCELED","dbName":null}],"dbName":null},"MessageType":{"values":[{"name":"TEXT","dbName":null},{"name":"IMAGE","dbName":null},{"name":"FILE","dbName":null}],"dbName":null},"MessageStatus":{"values":[{"name":"SENT","dbName":null},{"name":"DELIVERED","dbName":null},{"name":"READ","dbName":null}],"dbName":null},"ScheduledCallStatus":{"values":[{"name":"PENDING","dbName":null},{"name":"CONFIRMED","dbName":null},{"name":"CANCELED","dbName":null},{"name":"COMPLETED","dbName":null}],"dbName":null}},"types":{}}'
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;
config.compilerWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      (typeof globalThis !== "undefined" && globalThis["DATABASE_URL"]) ||
      (typeof process !== "undefined" &&
        process.env &&
        process.env.DATABASE_URL) ||
      undefined,
  },
});

if (
  (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
  (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
  undefined
) {
  Debug.enable(
    (typeof globalThis !== "undefined" && globalThis["DEBUG"]) ||
      (typeof process !== "undefined" && process.env && process.env.DEBUG) ||
      undefined
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
