import { parse } from '../src/fen';

test('read fen', () => {
  const pos = parse('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')!;
  expect(pos.board['e2']).toEqual({role: 'pawn', color: 'white'});
  expect(pos.turn).toBe('white');
  expect(pos.epSquare).toBeUndefined();
  expect(pos.halfmoves).toBe(0);
  expect(pos.fullmoves).toBe(1);
});

test('invalid fen', () => {
  expect(parse('8/8/8/8/8/8/8/8 w · - 0 1')).toBeUndefined();
});

test('remaining checks', () => {
  const pos = parse('8/8/8/8/8/8/8/8 w - - 1+2 12 42')!;
  expect(pos.remainingChecks).toEqual({ white: 1, black: 2});
  expect(pos.halfmoves).toBe(12);
  expect(pos.fullmoves).toBe(42);
});

test('lichess remaining checks', () => {
  const pos = parse('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 2 +0+0')!;
  expect(pos.remainingChecks).toEqual({ white: 3, black: 3});
  expect(pos.halfmoves).toBe(1);
  expect(pos.fullmoves).toBe(2);
});