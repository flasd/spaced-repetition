import SpacedRepetition, {
  ISpacedRepetitionCard,
  ISpacedRepetitionReview,
  getDueCards,
} from './index';

describe('SpacedRepetition', () => {
  it('should create an instance without exploding', () => {
    expect(() => new SpacedRepetition()).not.toThrow();
  });

  it('should use nowFn to calculate current day', () => {
    const jamesBond = jest.fn();
    jamesBond.mockReturnValue(0);

    const instance = new SpacedRepetition({ nowFn: jamesBond });
    instance.getDueCards([], []);

    expect(jamesBond).toHaveBeenCalled();
  });

  it('should output the correct due cards when used adhoc', () => {
    const cards: ISpacedRepetitionCard[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];

    const reviews: ISpacedRepetitionReview[] = [
      { card: '1', timestamp: Date.now(), difficulty: 1 },
      { card: '2', timestamp: Date.now(), difficulty: 2 },
      { card: '3', timestamp: Date.now(), difficulty: 3 },
    ];

    const instace = new SpacedRepetition();
    expect(instace.getDueCards(cards, reviews)).toHaveLength(2);

    // Add a bad review at the end
    reviews.push({ card: '3', timestamp: Date.now(), difficulty: 2 });

    // Remove the only review for card 1
    reviews.shift();

    expect(instace.getDueCards(cards, reviews)).toHaveLength(3);
  });

  it('should output the correct due cards', () => {
    const cards: ISpacedRepetitionCard[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];

    const reviews: ISpacedRepetitionReview[] = [
      { card: '1', timestamp: Date.now(), difficulty: 1 },
      { card: '2', timestamp: Date.now(), difficulty: 2 },
      { card: '3', timestamp: Date.now(), difficulty: 3 },
    ];

    expect(getDueCards(cards, reviews)).toHaveLength(2);

    // Add a bad review at the end
    reviews.push({ card: '3', timestamp: Date.now(), difficulty: 2 });

    // Remove the only review for card 1
    reviews.shift();

    expect(getDueCards(cards, reviews)).toHaveLength(3);
  });
});
