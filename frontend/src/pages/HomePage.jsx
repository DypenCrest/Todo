import React from "react";
import AddTodoForm from "../components/addTodoForm";
import Todos from "../components/todos";

const HomePage = () => {
  return (
    <div>
      <AddTodoForm />
      <Todos />
    </div>
  );
};

export default HomePage;
