import type { ClientEvents, Awaitable, Client } from 'discord.js';
// Export events enum through here to reduce the amounts of imports.
export { Events } from 'discord.js';

export type LogMethod = (...args: unknown[]) => void;
export type EventKeys = keyof ClientEvents;

// Props that will be passed through the event callback
export interface EventProps {
    client: Client;
    log: LogMethod;
}
export type EventCallback<T extends EventKeys> = (
    props: EventProps,
    ...args: ClientEvents[T]
) => Awaitable<unknown>;

// Internal structure to represent an event.
export interface Event<T extends EventKeys = EventKeys> {
    key: T;
    callback: EventCallback<T>;
}

// Create an event struct
export function event<T extends EventKeys>(key: T, callback: EventCallback<T>): Event<T> {
    return { key, callback };
}

// Register events to the Client
export function registerEvents(client: Client, events:Event[]): void {
    for (const { key, callback } of events) {
        client.on(key, (...args) => {
            // Create new log method for this event.
            const log = console.log.bind(console, `[Event: ${key}]`);

            // Try to catch uncaught errors.
            try {
                callback({ client, log }, ...args);
            } catch (err) {
                log('[Uncaught Error]', err);
            }
        })
    }
}