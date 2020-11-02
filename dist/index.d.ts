declare type PickProperty<TObj, TProp extends keyof TObj> = TObj[TProp];
declare type TMilliseconds = number;
declare type TRepetition = number;
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
export declare type SpacedRepetitionOptions = {
    /**
     * Should return a date to be used as right now. Default date uses UTC.
     */
    nowFn?: () => TMilliseconds;
    /**
     * Enable debug logs
     */
    debug?: boolean;
};
export declare const DAY_IN_MILLISECONDS: number;
declare class SpacedRepetition {
    private options;
    constructor(options?: SpacedRepetitionOptions);
    private getDay;
    private computeNextRepetition;
    getDueCards(cards: ISpacedRepetitionCard[], reviews: ISpacedRepetitionReview[]): [ISpacedRepetitionCard, TRepetition][];
}
declare const getDueCards: (cards: ISpacedRepetitionCard[], reviews: ISpacedRepetitionReview[]) => [ISpacedRepetitionCard, TRepetition][];
export { SpacedRepetition, getDueCards };
