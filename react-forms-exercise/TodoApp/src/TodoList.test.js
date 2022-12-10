import React from "react";
import { render, fireEvent, } from "@testing-library/react";
import '@testing-library/jest-dom'
import TodoList from "./TodoList";

function addTodo(TodoList, item = "Jelly") {
  const itemInput = TodoList.getByLabelText("Item");
  fireEvent.change(itemInput, { target: { value: item } });
  const button = TodoList.getByText("Add Item");
  fireEvent.click(button);
}

it("renders without crashing", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new Todo", function() {
  const todoList = render(<TodoList />);

  addTodo(todoList);

  // expect to see a Todo
  const removeButton = todoList.getByText("X");
  expect(removeButton).toBeInTheDocument();

  // expect form to be empty
  expect(todoList.getAllByDisplayValue("")).toHaveLength(1);

});

it("can remove a Todo", function() {
  const todoList = render(<TodoList />);
  addTodo(todoList);

  const removeButton = todoList.getByText("X");

  // click the remove button and the Todo should be gone
  fireEvent.click(removeButton);
  expect(removeButton).not.toBeInTheDocument();
});
