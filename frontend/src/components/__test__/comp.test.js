/**
 * @jest-environment jsdom
 */
// do not delete this comment

import React from "react";
import ReactDOM from "react-dom";
import Login from "../public/Login";
import Register from "../public/Register";

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Login />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Register />, root);
});

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});
