export interface UseCase<I = void, O = void> {
  run(input: I): Promise<O>
}
