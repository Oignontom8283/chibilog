import Logger, { generateId } from "src";

/**
 * The `LoggersInstances` class provides a centralized management system for `Logger` instances.
 * It allows adding, retrieving, removing, and redefining instances, as well as generating unique
 * identifiers for new instances. This class ensures that each `Logger` instance is unique within
 * its collection.
 *
 * ### Features:
 * - Add new `Logger` instances to the collection.
 * - Retrieve a specific `Logger` instance by its unique identifier.
 * - Retrieve all stored `Logger` instances.
 * - Remove a `Logger` instance by its unique identifier.
 * - Redefine the collection of instances using a custom handler function.
 * - Generate unique identifiers for `Logger` instances.
 *
 * ### Example Usage:
 * ```typescript
 * const logger = new Logger();
 * const id = logger.id;
 * console.log(id);
 * 
 * const retrievedLogger = LoggersInstances.get(id);
 * console.log(retrievedLogger);
 * 
 * LoggersInstances.remove(logger.id);
 * ```
 */
export class LoggersInstances {

    private static instances:Logger[] = [];

    /**
     * Adds a new `Logger` instance to the collection of instances.
     * 
     * @param instance - The `Logger` instance to be added.
     * @throws {Error} Throws an error if the instance already exists in the collection.
     */
    public static add(instance:Logger) {
        
        if (this.isExist(instance)) {
            throw new Error("The instance already exists")
        }

        this.instances.push(instance)
    }

    /**
     * Retrieves an instance from the collection of instances by its unique identifier.
     *
     * @param id - The unique identifier of the instance to retrieve.
     * @returns The instance with the matching identifier, or `undefined` if no match is found.
     */
    public static get(id:string) {
        return this.instances.find((i) => i.id === id)
    }

    /**
     * Retrieves all instances stored in the `instances` property.
     *
     * @returns An array containing all the instances.
     */
    public static getAll() {
        return this.instances;
    }

    /**
     * Removes an instance from the collection of instances by its unique identifier.
     *
     * @param id - The unique identifier of the instance to be removed.
     * @returns A boolean indicating whether an instance was removed (`true` if an instance was removed, `false` otherwise).
     */
    public static remove(id:string) {
        const olderInstances = this.instances.length;
        this.instances = this.instances.filter((i) => i.id !== id);

        return olderInstances !== this.instances.length;
    }

    /**
     * Redefines the current `instances` by applying a handler function.
     *
     * @param handler - A function that takes the current `instances` as an argument
     * and returns a new `instances` object. The handler allows for custom modification
     * or replacement of the `instances`.
     */
    public static redefine(handler:(instances:typeof LoggersInstances.instances) => typeof LoggersInstances.instances) {
        this.instances = handler(this.instances);
    }

    /**
     * Generates a unique identifier of a fixed length.
     * 
     * This method creates an ID using the `generateId` function and ensures
     * its uniqueness by checking against existing IDs using the `get` method.
     * If a conflict is found, it regenerates the ID until a unique one is produced.
     * 
     * @returns {string} A unique identifier.
     */
    public static createId() {
        
        let id = generateId(5);

        while (this.get(id)) {
            id = generateId(5);
        };

        return id;
    };
     
    /**
     * Checks if a given Logger instance already exists in the collection of instances.
     *
     * @param instance - The Logger instance to check for existence.
     * @returns A boolean indicating whether the instance exists (`true`) or not (`false`).
     */
    private static isExist(instance:Logger) {
        return this.instances.some((i) => i.id === instance.id)
    }
}