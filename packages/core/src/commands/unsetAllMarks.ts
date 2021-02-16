import { Command, RawCommands } from '../types'

declare module '@tiptap/core' {
  interface Commands {
    unsetAllMarks: {
      /**
       * Remove all marks in the current selection.
       */
      unsetAllMarks: () => Command,
    }
  }
}

export const unsetAllMarks: RawCommands['unsetAllMarks'] = () => ({ tr, state, dispatch }) => {
  const { selection } = tr
  const { from, to, empty } = selection

  if (empty) {
    return true
  }

  if (dispatch) {
    Object
      .entries(state.schema.marks)
      .forEach(([, mark]) => {
        tr.removeMark(from, to, mark as any)
      })
  }

  return true
}
