import { createAction, createAsyncThunk, createReducer, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { Post, PostService } from "laerte_fernandes-sdk";

interface PostSliceState {
  paginated?: Post.Paginated;
  fetching: boolean
  counter: number
}

const initialState: PostSliceState = {
  fetching: false,
  counter: 0,
  paginated: {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 1,
    content: []
  }
}

// thunk assincrona, é apenas uma função que pode ser utilizada como action, no código abaixo dos reducers essa função tem uma reação adicionada quando a promise
// chega ao estado de fulfilled. Thunks são uteis porque ao podem ser async e outras actions adicionadas ao reducer não
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async function (query: Post.Query) {
    const posts = await PostService.getAllPosts(query)
    posts.page = query.page ? query.page : 0
    return posts;
  }
)

export const increment = createAction('post/increment')

export const postReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(increment, (state) => {
    state.counter++;
  })
  .addCase(fetchPosts.fulfilled, (state, action) => {
    state.paginated = action.payload;
  })
  .addMatcher(isPending, (state) => {
    state.fetching = true;
  })
  .addMatcher(isFulfilled, (state) => {
    state.fetching = false;
  })
  .addMatcher(isRejected, (state) => {
    state.fetching = false;
  })  
}) 
