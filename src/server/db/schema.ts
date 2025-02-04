import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  real,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gifts_beauty_${name}`);


export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);


export const products = createTable("products", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: varchar("image", { length: 255 }),
  name: varchar("name", {length: 255}).notNull(),
  description: text("description"),
  price: real("price"),
  is_available: boolean("is_available").default(true),
})
export const productsRelations = relations(products, ({ many }) => ({
  productsToOrders: many(productsToOrders)
}))
export const orders = createTable("orders", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  amount: real("amount").notNull(),
  date: date("date").defaultNow()
})

export const ordersRelations = relations(orders, ({ many }) => ({
  productsToOrders: many(productsToOrders)
}))

export const productsToOrders = createTable("products_to_orders", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: varchar("product_id", { length: 255 })
  .notNull()
  .references(() => products.id),
  orderId: varchar("order_id", { length: 255 })
  .notNull()
  .references(() => orders.id),
},
)

export const productsToOrdersRelations = relations(productsToOrders, ({ one }) => ({
  order: one(orders, {
    fields: [productsToOrders.orderId],
    references: [orders.id]
  }),
  product: one(products, {
    fields: [productsToOrders.productId],
    references: [products.id],
  })
}))

export const expenses = createTable("expenses", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255}).notNull(),
  category: varchar("category", { length: 255}).notNull(),
  amount: real("amount").notNull(),
  date: date("date").defaultNow()
})

export const credits = createTable("credits", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  debtor_name: varchar("name", { length: 255}).notNull(),
  amount: real("amount").notNull(),
  date: date("date").defaultNow(),
  status: varchar("status", { length: 255}).notNull(),
  description: text("description")
})

export type NewProduct = typeof products.$inferInsert