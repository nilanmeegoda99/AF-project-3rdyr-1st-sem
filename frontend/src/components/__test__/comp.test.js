/**
 * @jest-environment jsdom
 */
// do not delete this comment

import React from "react";
import ReactDOM from "react-dom";
import Login from "../public/Login";
import Register from "../public/Register";
import AboutUs from "../public/AboutUs";
import Home from "../public/Home";
import Footer from "../common/Footer";
import AttendeeInstructions from "../users/guest/AttendeeInstructions";
import ResearchInstructions from "../users/guest/ResearchInstructions";
import WorkshopInstructions from "../users/guest/WorkshopInstructions";

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Login />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Register />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<AboutUs />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Home />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Footer />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<AttendeeInstructions />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<ResearchInstructions />, root);
});

test("render without crashing", () => {
  const root = document.createElement("div");
  ReactDOM.render(<WorkshopInstructions />, root);
});
