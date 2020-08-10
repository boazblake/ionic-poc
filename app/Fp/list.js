import { Nothing, Just } from 'data.maybe'
import { equals } from 'ramda'

class Nil {
  constructor() {
    this.head = undefined
    this.tail = undefined
    this.isNil = true
    this.isCons = false
  }
}

class Cons {
  constructor(x, xs) {
    this.head = x
    this.tail = xs
    this.isNil = false
    this.isCons = true
  }
}

//curry :: (a -> b -> c) -> a -> b -> c
const curry = (f) => (x) => (y) => f(x, y)

//uncurry :: (a -> b -> c) -> (a, b) -> c
const uncurry = (f) => (x, y) => f(x)(y)

//o :: ((b -> c), (a -> b)) -> a -> c
const o = (f, g) => (x) => f(g(x))

//id :: a -> a
const id = (x) => x

//flip :: (a -> b -> c) -> (b, a) -> c
const flip = (f) => (x, y) => f(y, x)

//cons :: (a, List a) -> List a
const cons = (x, xs) => new Cons(x, xs)

//snoc :: (List a, a) -> List a
const snoc = (xs, x) => new Cons(x, xs)

//ccons :: a -> List a -> List a
const ccons = curry(cons)

//csnoc :: List a -> a -> List a
//const csnoc = curry(snoc)

//nil :: () => List a
const nil = () => new Nil()

//head :: List a -> a | undefined
const head = ({ head }) => head

//tail :: List a -> List a | undefined
const tail = ({ tail }) => tail

//concat :: List a -> List a -> List a
const concat = (xs) => (ys) => foldr(cons)(ys)(xs)

//foldl :: ((a, b) -> a) -> a -> List b -> a
const foldl = (f) => {
  const go = (b) => ({ isNil, head, tail }) =>
    isNil ? b : go(f(b, head))(tail)
  return go
}

//foldr :: ((a, b) -> a) -> a -> List b -> a
const foldr = (f) => (b) => {
  const rev = (acc) => ({ isNil, head, tail }) =>
    isNil ? acc : rev(cons(head, acc))(tail)

  return o(foldl(flip(f))(b), rev(nil()))
}

//foldMap :: Monoid m => (a -> m) -> List a -> m
const foldMap = (f) =>
  foldl((acc, x) => (acc || f(x).empty()).concat(f(x)))(null)

//foldM :: Monad m => (a -> m a) -> (a -> b -> m a) -> a -> List b -> m a
const foldM = (point) => (f) => {
  const go = (a) => ({ isNil, head, tail }) =>
    isNil ? point(a) : f(a, head).chain((x) => go(x)(tail))
  return go
}

//map :: (a -> b) -> List a -> List b
const map = (f) => ({ isNil, head, tail }) =>
  isNil ? nil() : cons(f(head), map(f)(tail))

//ap :: List (a -> b) -> List a -> List b
const ap = ({ isNil, head: f, tail: fs }) => (xs) =>
  isNil ? nil() : concat(map(f)(xs))(ap(fs)(xs))

//pure :: a -> List a
const pure = (a) => cons(a, nil())

//chain :: (a -> List b) -> List a -> List b
const chain = ({ isNil, head, tail }) => (f) =>
  isNil ? nil() : concat(f(head))(chain(tail)(f))

//join :: List (List a -> List a)
const join = foldr(uncurry(concat))(nil())

//traverse :: Applicative f => (a -> f a) -> (a -> f b) -> List a -> f (List b)
const traverse = (point, f) => {
  const con_f = (x, ys) =>
    f(x)
      .map(ccons)
      .ap(ys)

  return foldr(con_f)(point(nil()))
}

//sequenceA :: Applicative f => (a -> f a) -> List (f a) -> f (List a)
const sequenceA = (point) => traverse(point, id)

//length :: List a -> Int
const length = (xs) => {
  const go = (b) => ({ isCons, tail }) => (isCons ? go(b + 1)(tail) : b)

  return go(0)(xs)
}

//findIndex :: (a -> Boolean) -> List a -> Maybe Int
const findIndex = (f) => (xs) => {
  const go = (n) => ({ isNil, head, tail }) =>
    isNil ? Nothing() : f(head) ? Just(n) : go(n + 1)(tail)

  return go(0)(xs)
}

//index :: Int -> List a -> Maybe a
const index = (i) => (xs) => {
  const go = (n) => ({ isNil, head, tail }) =>
    isNil ? Nothing() : n === i ? Just(head) : go(n + 1)(tail)
  return go(0)(xs)
}

//reverse :: List a -> List a
const reverse = (xs) => {
  const go = (acc) => ({ isNil, head, tail }) =>
    isNil ? acc : go(cons(head, acc))(tail)

  return go(nil())(xs)
}

//contains :: Eq a => List a -> a -> Boolean
const contains = (xs) => (x) => findIndex(equals(x))(xs).isJust

//unique :: Eq a => List a -> List a
const unique = o(
  reverse,
  foldl((acc, x) => (contains(acc)(x) ? acc : cons(x, acc)))(nil())
)

//toArray :: List a -> [a]
const toArray = foldl((acc, x) => acc.concat([x]))([])

//toList :: [a] -> List a
const toList = (xs) => xs.reduceRight((acc, x) => cons(x, acc), nil())

//List :: a -> ... -> List a
const list = (...args) => toList(args)

export let List = {
  list,
  cons,
  snoc,
  nil,
  head,
  tail,
  foldl,
  foldr,
  foldMap,
  foldM,
  concat,
  map,
  ap,
  pure,
  join,
  chain,
  traverse,
  sequenceA,
  findIndex,
  index,
  length,
  reverse,
  contains,
  unique,
  toArray,
  toList,
}
