import { LegacyObserver } from "./RelayNetworkTypes"
import { Disposable } from "./RelayRuntimeTypes"

export type Subscription = {
    readonly unsubscribe: () => void
    readonly closed: boolean
}
/**
 * An Observer is an object of optional callback functions provided to
 * .subscribe(). Each callback function is invoked when that event occurs.
 */

export type Observer<T> = {
    readonly start?: (a: Subscription) => {} | null
    readonly next?: (a: T) => {} | null
    readonly error?: (a: Error) => {} | null
    readonly complete?: () => {} | null
    readonly unsubscribe?: (a: Subscription) => {} | null
}
/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */

export type Sink<T> = {
    readonly next: (a: T) => void
    readonly error: (a: Error, isUncaughtThrownError: boolean) => void
    readonly complete: () => void
    readonly closed: boolean
}
/**
 * A Source is the required argument when constructing a new Observable. Similar
 * to a Promise constructor, this is a function which is invoked with a Sink,
 * and may return either a cleanup function or a Subscription instance (for use
 * when composing Observables).
 */

export type Source<T> = (a: Sink<T>) => void | Subscription | (() => {})
/**
 * A Subscribable is an interface describing any object which can be subscribed.
 *
 * Note: A sink may be passed directly to .subscribe() as its observer,
 * allowing for easily composing Subscribables.
 */

export type Subscribable<T> = {
    subscribe: (observer: Observer<T> | Sink<T>) => Subscription
} // Note: This should accept Subscribable<T> instead of RelayObservable<T>,
// however Flow cannot yet distinguish it from T.

export type ObservableFromValue<T> = RelayObservable<T> | Promise<T> | T
/**
 * Limited implementation of ESObservable, providing the limited set of behavior
 * Relay networking requires.
 *
 * Observables retain the benefit of callbacks which can be called
 * synchronously, avoiding any UI jitter, while providing a compositional API,
 * which simplifies logic and prevents mishandling of errors compared to
 * the direct use of callback functions.
 *
 * ESObservable: https://github.com/tc39/proposal-observable
 */

export class RelayObservable<T> implements Subscribable<T> {
    static create<V>(source: Source<V>): RelayObservable<V>
    constructor(source: never)
    /**
     * When an emitted error event is not handled by an Observer, it is reported
     * to the host environment (what the ESObservable spec refers to as
     * "HostReportErrors()").
     *
     * The default implementation in development rethrows thrown errors, and
     * logs emitted error events to the console, while in production does nothing
     * (swallowing unhandled errors).
     *
     * Called during application initialization, this method allows
     * application-specific handling of unhandled errors. Allowing, for example,
     * integration with error logging or developer tools.
     *
     * A second parameter `isUncaughtThrownError` is true when the unhandled error
     * was thrown within an Observer handler, and false when the unhandled error
     * was an unhandled emitted event.
     *
     *  - Uncaught thrown errors typically represent avoidable errors thrown from
     *    application code, which should be handled with a try/catch block, and
     *    usually have useful stack traces.
     *
     *  - Unhandled emitted event errors typically represent unavoidable events in
     *    application flow such as network failure, and may not have useful
     *    stack traces.
     */

    static onUnhandledError(callback: (a: Error, isUncaughtThrownError: boolean) => {}): void
    /**
     * Accepts various kinds of data sources, and always returns a RelayObservable
     * useful for accepting the result of a user-provided FetchFunction.
     */

    static from<V>(obj: ObservableFromValue<V>): RelayObservable<V>
    /**
     * Creates a RelayObservable, given a function which expects a legacy
     * Relay Observer as the last argument and which returns a Disposable.
     *
     * To support migration to Observable, the function may ignore the
     * legacy Relay observer and directly return an Observable instead.
     */

    static fromLegacy<V>(callback: (a: LegacyObserver<V>) => Disposable | RelayObservable<V>): RelayObservable<V>
    /**
     * Similar to promise.catch(), observable.catch() handles error events, and
     * provides an alternative observable to use in it's place.
     *
     * If the catch handler throws a new error, it will appear as an error event
     * on the resulting Observable.
     */

    catch<U>(fn: (a: Error) => RelayObservable<U>): RelayObservable<T | U>
    /**
     * Returns a new Observable which returns the same values as this one, but
     * modified so that the provided Observer is called to perform a side-effects
     * for all events emitted by the source.
     *
     * Any errors that are thrown in the side-effect Observer are unhandled, and
     * do not affect the source Observable or its Observer.
     *
     * This is useful for when debugging your Observables or performing other
     * side-effects such as logging or performance monitoring.
     */

    do(observer: Observer<T>): RelayObservable<T>
    /**
     * Returns a new Observable which returns the same values as this one, but
     * modified so that the finally callback is performed after completion,
     * whether normal or due to error or unsubscription.
     *
     * This is useful for cleanup such as resource finalization.
     */

    finally(fn: () => {}): RelayObservable<T>
    /**
     * Returns a new Observable which is identical to this one, unless this
     * Observable completes before yielding any values, in which case the new
     * Observable will yield the values from the alternate Observable.
     *
     * If this Observable does yield values, the alternate is never subscribed to.
     *
     * This is useful for scenarios where values may come from multiple sources
     * which should be tried in order, i.e. from a cache before a network.
     */

    ifEmpty<U>(alternate: RelayObservable<U>): RelayObservable<T | U>
    /**
     * Observable's primary API: returns an unsubscribable Subscription to the
     * source of this Observable.
     *
     * Note: A sink may be passed directly to .subscribe() as its observer,
     * allowing for easily composing Observables.
     */

    subscribe(observer: Observer<T> | Sink<T>): Subscription
    /**
     * Supports subscription of a legacy Relay Observer, returning a Disposable.
     */

    subscribeLegacy(legacyObserver: LegacyObserver<T>): Disposable
    /**
     * Returns a new Observerable where each value has been transformed by
     * the mapping function.
     */

    map<U>(fn: (a: T) => U): RelayObservable<U>
    /**
     * Returns a new Observable where each value is replaced with a new Observable
     * by the mapping function, the results of which returned as a single
     * merged Observable.
     */

    mergeMap<U>(fn: (a: T) => ObservableFromValue<U>): RelayObservable<U>
    /**
     * Returns a new Observable which first mirrors this Observable, then when it
     * completes, waits for `pollInterval` milliseconds before re-subscribing to
     * this Observable again, looping in this manner until unsubscribed.
     *
     * The returned Observable never completes.
     */

    poll(pollInterval: number): RelayObservable<T>
    /**
     * Returns a Promise which resolves when this Observable yields a first value
     * or when it completes with no value.
     */

    toPromise(): Promise<T | void>
}

export { RelayObservable as Observable }
