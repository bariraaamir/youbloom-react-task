import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

function renderLogin() {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}

describe("Login Page", () => {
  it("shows an error when phone number is empty", () => {
    renderLogin();

    const button = screen.getByRole("button", { name: "Login" });
    fireEvent.click(button);

    expect(
      screen.getByText("Phone number is required")
    ).toBeInTheDocument();
  });

  it("shows an error when phone number does not start with +254", () => {
    renderLogin();

    const input = screen.getByPlaceholderText("+254712345678");
    fireEvent.change(input, { target: { value: "12345" } });

    const button = screen.getByRole("button", { name: "Login" });
    fireEvent.click(button);

    expect(
      screen.getByText("Phone number must start with +254")
    ).toBeInTheDocument();
  });
});