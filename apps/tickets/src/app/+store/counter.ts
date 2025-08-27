import {
  createActionGroup,
  createFeature,
  createReducer,
  createSelector,
  emptyProps,
  on,
  props,
} from '@ngrx/store';

const initialCounterState = {
  count: 0,
  lastCounts: [] as number[],
};

export const counterActions = createActionGroup({
  source: 'counter',
  events: {
    increment: emptyProps(),
    decrement: emptyProps(),
    incrementBy: props<{ number: number }>(),
    decrementBy: props<{ number: number }>(),
  },
});

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialCounterState,
    on(counterActions.increment, (state) => ({
      ...state,
      count: state.count + 1,
    })),
    on(counterActions.decrement, (state) => ({
      ...state,
      count: state.count - 1,
    })),
    on(counterActions.incrementBy, (state, { number }) => ({
      ...state,
      count: state.count + number,
    })),
    on(counterActions.decrementBy, (state, { number }) => ({
      ...state,
      count: state.count - number,
    }))
  ),
  extraSelectors: ({ selectCount }) => ({
    selectDoubleCount: createSelector(selectCount, (count) => count * 2),
  }),
});
