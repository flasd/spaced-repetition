type PickProperty<TObj, TProp extends keyof TObj> = TObj[TProp];

type TMilliseconds = number;

type TRepetition = number;

export interface ISpacedRepetitionCard {
  id: string;
}

export interface ISpacedRepetitionReview {
  /**
   * Id of the card this review belongs to
   */
  card: PickProperty<ISpacedRepetitionCard, 'id'>;

  /**
   * Timestamp of the review in milliseconds
   */
  timestamp: TMilliseconds;

  /**
   * Difficulty divided in:
   * 1 - Complete blackout.
   * 2 - Incorrect response; almost remembered.
   * 3 - Correct response; recalled with serious difficulty.
   * 4 - Perfect response.
   */
  difficulty: 1 | 2 | 3 | 4;
}

export type SpacedRepetitionOptions = {
  /**
   * Should return a date to be used as right now. Default date uses UTC.
   */
  nowFn?: () => TMilliseconds;

  /**
   * Enable debug logs
   */
  debug?: boolean;
};

export const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

class SpacedRepetition {
  private options: SpacedRepetitionOptions;

  constructor(options: SpacedRepetitionOptions = {}) {
    this.options = { debug: options.debug, nowFn: options.nowFn };
    this.getDueCards = this.getDueCards.bind(this);
  }

  private getDay(
    { forDate }: { forDate: TMilliseconds } = {
      forDate: Date.now(),
    },
  ) {
    let millis: number = forDate;

    try {
      if (typeof this.options.nowFn === 'function') {
        millis = this.options.nowFn();
      }
    } catch (error) {
      if (this.options.debug) {
        console.error(error);
      }
    }

    return Math.floor(millis / DAY_IN_MILLISECONDS);
  }

  private computeNextRepetition(reviews: ISpacedRepetitionReview[]) {
    if (reviews.length === 0) {
      return this.getDay() - 1;
    }

    const lastReview = reviews[reviews.length - 1];
    const lastReviewDay = this.getDay({ forDate: lastReview.timestamp });

    if (lastReview.difficulty >= 3) {
      if (reviews.length === 1) {
        return lastReviewDay + 1;
      }

      if (reviews.length === 2) {
        return lastReviewDay + 6;
      }

      let efactor = 2.5;

      reviews.forEach((review) => {
        efactor += +(
          0.1 -
          (4 - review.difficulty) * (0.08 + (4 - review.difficulty) * 0.02)
        );
      });

      if (efactor < 1.3) {
        efactor = 1.3;
      }

      return lastReviewDay + Math.ceil(reviews.length * efactor);
    }

    return lastReviewDay;
  }

  getDueCards(
    cards: ISpacedRepetitionCard[],
    reviews: ISpacedRepetitionReview[],
  ): [ISpacedRepetitionCard, TRepetition][] {
    const today = this.getDay();

    return cards
      .map((card): [ISpacedRepetitionCard, TRepetition] => {
        const reviewsForCard = reviews.filter((candidate) => {
          return candidate.card === card.id;
        });

        return [card, this.computeNextRepetition(reviewsForCard)];
      })
      .filter(([, nextRepetition]) => nextRepetition <= today);
  }
}

const { getDueCards } = new SpacedRepetition();

export { SpacedRepetition, getDueCards };
