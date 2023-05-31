import { createSlice } from "@reduxjs/toolkit";
import deputyService from "../services/deputy.service";

const deputySlice = createSlice({
  name: "deputies",
  initialState: {
    entities: null,
    isLoading: true,
    deputyLoading: false,
    deputy: null,
    error: null,
  },
  reducers: {
    deputiesListRequested: (state) => {
      state.isLoading = true;
    },
    deputiesListReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    deputiesListRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    oneDeputyRequested: (state) => {
      state.deputyLoading = true;
    },
    oneDeputyReceived: (state, action) => {
      state.deputy = action.payload;
      state.deputyLoading = false;
    },
    oneDeputyRequestFailed: (state, action) => {
      state.deputyLoading = false;
      state.error = action.payload;
    },
    taskRatingUpdated: (state, action) => {
      state.deputy = action.payload;
    },    
  },
});

const { reducer: deputyReducer, actions } = deputySlice;
const {
  deputiesListRequested,
  deputiesListReceived,
  deputiesListRequestFailed,
  oneDeputyRequested,
  oneDeputyReceived,
  oneDeputyRequestFailed,
  taskRatingUpdated
} = actions;

export const loadDeputyList = () => async (dispatch) => {
  dispatch(deputiesListRequested());
  try {
    const deputyData = await deputyService.getTotalDeputiesList(); // Получение с сервера данных по депутатам
    dispatch(deputiesListReceived(deputyData));
  } catch (error) {
    dispatch(deputiesListRequestFailed(error));
  }
};

export const loadOneDeputy = (deputyName, currentUser) => async (dispatch) => {
  dispatch(oneDeputyRequested());
  try {
    const oneDeputyData = await deputyService.getOneDeputy(
      deputyName,
      currentUser
    );
    dispatch(oneDeputyReceived(oneDeputyData));
  } catch (error) {
    dispatch(oneDeputyRequestFailed());
  }
};

export const increaseLikeTask = (likeData) => async (dispatch) => {
  try {
    await deputyService.postLikeTask(likeData);
  } catch (error) {
    console.log("Ошибка из deputy.js в increaseLikeTask ", error);
  }
};

export const decreaseLikeTask = (likeData) => async (dispatch) => {
  try {
    await deputyService.postWithdrawLikeTask(likeData);
  } catch (error) {
    console.log("Ошибка из deputy.js в decreaseLikeTask ", error);
  }
};

export const minusLikeForStore = (taskId) => async (dispatch, getState) => {
  const deputy = getState().deputies.deputy;
  const deputyTasksList = getState().deputies.deputy.others.deputyTasksList;

  // Выбираю задачу с нужным id и уменьшаю рейтинг
  const deputyTasksListUpdated = deputyTasksList.map((item) => {
    if (Number(item.id) === Number(taskId)) {
      const currentRating = item.task_rating;
      return { ...item, task_rating: currentRating - 1, currentUserLiked: false };
    } else return item;
  });

  // Новый объект с изменённым рейтингом для обновления в store
  const newDeputy = {
    ...deputy,
    others: { ...deputy.others, deputyTasksList: deputyTasksListUpdated },
  };
  dispatch(taskRatingUpdated(newDeputy))
};

export const plusLikeForStore = (taskId) => async (dispatch, getState) => {
  const deputy = getState().deputies.deputy;
  const deputyTasksList = getState().deputies.deputy.others.deputyTasksList;

  // Выбираю задачу с нужным id и увеличиваю рейтинг
  const deputyTasksListUpdated = deputyTasksList.map((item) => {
    if (Number(item.id) === Number(taskId)) {
      const currentRating = item.task_rating;
      return { ...item, task_rating: currentRating + 1, currentUserLiked: true };
    } else return item;
  });

  // Новый объект с изменённым рейтингом для обновления в store
  const newDeputy = {
    ...deputy,
    others: { ...deputy.others, deputyTasksList: deputyTasksListUpdated },
  };
  dispatch(taskRatingUpdated(newDeputy))
};

export const getDeputy = () => (state) => state.deputies.entities;
export const getOneDeputy = () => (state) => state.deputies.deputy;

export default deputyReducer;
