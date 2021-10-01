import { createAsyncThunk, createReducer, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { User, UserService } from "laerte_fernandes-sdk";

export const fetchAllEditors = createAsyncThunk(
  "editor/fetchAllEditors",
  async function () {
    return UserService.getAllEditors();
  }
)

interface EditorStoreState {
  fetching: boolean
  editorList: User.EditorSummary[]
}

const initialState: EditorStoreState = {
  fetching: false,
  editorList: []
}

export const editorReducer = createReducer(initialState, (builder) => {
  const pending = isPending(fetchAllEditors);
  const rejected = isRejected(fetchAllEditors);
  const fulfilled = isFulfilled(fetchAllEditors);

  builder.addCase(fetchAllEditors.fulfilled, (state, action) => {
    state.editorList = action.payload
  }).addMatcher(pending, (state) => {
    state.fetching = true;
  })
  .addMatcher(rejected, (state) => {
    state.fetching = false;
  })
  .addMatcher(fulfilled, (state) => {
    state.fetching = false;
  })
})