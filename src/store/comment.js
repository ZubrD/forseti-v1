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
    commentsUpdated: (state, action) => {
      state.entities = action.payload;
  }
  },
});

const { reducer: commentReducer, actions } = commentSlice;

const { commentRequested, commentReceived, commentRequestFailed, commentsUpdated } = actions;

export const loadCommentsList = (ruleNumber) => async (dispatch) => {
  dispatch(commentRequested());

  try {
    const commentsData = await commentService.getComments(ruleNumber); // Получение с сервера данных по законам
    dispatch(commentReceived(commentsData));
  } catch (error) {
    dispatch(commentRequestFailed(error));
  }
};

export const createComment = (comment) => async (dispatch, getState) => {
  const commentsList = getState().comments.entities;
  const commentsListUpdated = [...commentsList];
  try {
      const { content } = await commentService.addComment(comment);
      commentsListUpdated.push(comment);
      dispatch(commentsUpdated(commentsListUpdated));
  } catch (error) {
      console.log(error);
  }
};

export const getComments=()=>(state)=> state.comments.entities

export default commentReducer;
