export class Left<L, A> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  left(): L {
    return this.value
  }

  right(): A {
    throw new Error('Cannot get right in left.')
  }

  isLeft(): this is Left<L, A> {
    return true
  }

  isRight(): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  readonly value: A

  constructor(value: A) {
    this.value = value
  }

  left(): L {
    throw new Error('Cannot get left in right.')
  }

  right(): A {
    return this.value
  }

  isLeft(): this is Left<L, A> {
    return false
  }

  isRight(): this is Right<L, A> {
    return true
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}
