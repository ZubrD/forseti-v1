import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    commentRequested: (state) => {
      state.isLoading = true;
    },
    commentReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: commentReducer, actions } = commentSlice;

const { commentRequested, commentReceived, commentRequestFailed } = actions;

export const loadCommentsList = (ruleNumber, userId) => async (dispatch) => {
  dispatch(commentRequested());

  try {
    const commentsData = await commentService.getComments(ruleNumber); // Получение с сервера данных по законам
    console.log(commentsData);
    dispatch(commentReceived(commentsData));
  } catch (error) {
    dispatch(commentRequestFailed(error));
  }
};

export default commentReducer;
