import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const messagesTable = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  chatId: text('chat_id').notNull(),
  senderId: text('sender_id').notNull(),
  receiverId: text('receiver_id').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Message = typeof messagesTable.$inferSelect
export type NewMessage = typeof messagesTable.$inferInsert
