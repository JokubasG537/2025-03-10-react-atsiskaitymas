import { useState, useEffect } from "react";
import useFetchData from "../components/hooks/fetchData";
import { Link } from "react-router-dom";
import "../style/Posts.scss";

const Posts = () => {
  const { data: postsData, loading: postsLoading, error: postsError } = useFetchData('http://localhost:3000/posts');
  const { data: usersData, loading: usersLoading, error: usersError } = useFetchData('http://localhost:3000/users');
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useFetchData('http://localhost:3000/categories');

  if (postsLoading || usersLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (postsError) {
    return <div>Error loading posts: {postsError}</div>;
  }

  if (usersError) {
    return <div>Error loading users: {usersError}</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories: {categoriesError}</div>;
  }

  const postsWithUserDataAndCategory = postsData.map((post) => {
    const user = usersData.find((user) => user.id === post.user_id);
    const category = categoriesData.find((category) => category.id === post.category_id);
    return { ...post, user, category };
  });

  return (
    <div className="posts">
      <h2>Posts</h2>
      <div className="posts-wrapper">
        {postsWithUserDataAndCategory.map((post) => (
          <div className="post-item" key={post.id}>
            <Link to={`/posts/${post.id}`}>
            <div className="title-author-wrapper">
              <span className="post-title">{post.title}</span>
              <span className="post-author">Author: {post.user.name}</span>
            </div>
              <span className="post-category">Category: {post.category.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
