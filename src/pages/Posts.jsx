import { useState, useEffect } from "react";
import useFetchData from "../components/hooks/fetchData";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Posts</h1>
      {postsWithUserDataAndCategory && postsWithUserDataAndCategory.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <h3>{post.title}</h3>
          <p>Author: {post.user.name}</p>
          <p>Categories: {post.category.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
