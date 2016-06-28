// todo: find out why the typeguards do not work.

abstract class $Option<A> {
    isDefined():this is Some<A> {
        return this instanceof $Some;
    }

    isEmpty():this is None {
        return this instanceof $None;
    }

    flatMap<B>(f:(a:A) => Option<B>):Option<B> {
        return this.isDefined() ? f((this as any).unwrap()) : None;
    }

    getOrElse(a:A):A {
        return this.isDefined() ? (this as any).unwrap() : a;
    }

    orElse(o:Option<A>):Option<A> {
        return this.map(a => Some(a) as Option<A>)
            .getOrElse(o);
    }

    map<B>(f:(a:A) => B):Option<B> {
        return this.flatMap(a =>
            Some(f(a))
        );
    }

    filter(f:(a:A) => boolean):Option<A> {
        return this.flatMap(a =>
            f(a) ? Some(a) : None
        );
    }

    fold<B>(ifEmpty:() => B, f:(a:A) => B):B {
        return this.map(a => () => f(a))
            .getOrElse(ifEmpty)();
    }

    foreach<B>(f:(a:A) => void):void {
        return this.fold(
            () => void 0,
            a => f(a)
        );
    }

    toString():string {
        return this.map(a => `Some(${a})`)
            .getOrElse(`None`);
    }

    toArray():A[] {
        return this.map(a => [a])
            .getOrElse([]);
    }
}

class $Some<A> extends $Option<A> {
    constructor(private a:A) {
        super();
    }

    unwrap():A {
        return this.a;
    }
}

class $None extends $Option<any> {
    constructor() {
        super();
    }
}

export type Some<A> =
    $Some<A>;

export type None =
    $None;

export type Option<A> =
    $Option<A>;

export function Some<A>(a:A):Some<A> {
    return new $Some(a);
}

export const None =
    new $None() as None;

export function Option<A>(a:A):Option<A> {
    return Some(a).filter(a =>
        a !== undefined && a !== null
    );
}
