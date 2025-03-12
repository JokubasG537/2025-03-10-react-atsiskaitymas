import { createContext, useReducer } from "react";
import useFetchData from "../hooks/useFetchData"; // Import your hook

const CommentContext = createContext();

const initialState = {
  comments: [],
  adminId: 1, // Assuming Admin is always ID 1
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };
    case "DELETE_COMMENT":
      return { ...state, comments: state.comments.filter(c => c.id !== action.payload) };
    default:
      return state;
  }
};

export const CommentProvider = ({ children }) => {
  const { data, loading, error } = useFetchData("http://localhost:3000/comments");
  const [state, dispatch] = useReducer(commentReducer, { ...initialState, comments: data || [] });


  const addComment = async (postId, content) => {
    const newComment = {
      id: Date.now(), 
      post_id: postId,
      user_id: state.adminId,
      content,
    };

    try {
      const response = await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) throw new Error("Failed to add comment");

      dispatch({ type: "ADD_COMMENT", payload: newComment });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to Delete Comment
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3000/comments/${commentId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete comment");

      dispatch({ type: "DELETE_COMMENT", payload: commentId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentContext.Provider value={{ ...state, loading, error, addComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
