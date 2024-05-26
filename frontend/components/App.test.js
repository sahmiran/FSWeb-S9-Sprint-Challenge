// Write your tests here

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppFunctional from "./AppFunctional";

test("App function render oldumu", () => {
  render(<AppFunctional />);
});

test("kordinat degeri", () => {
  render(<AppFunctional />);
  const kordinatDegeri = screen.getByTestId("data-test-1");
  expect(kordinatDegeri).toHaveTextContent(`Koordinatlar (2,2)`);
});

test("adim degeri", () => {
  render(<AppFunctional />);
  const adimDegeri = screen.getByTestId("data-test-2");
  expect(adimDegeri).toHaveTextContent(`0 kere ilerlediniz`);
});

test("mesaj degeri", () => {
  render(<AppFunctional />);
  const mesejDegeri = screen.getByTestId("data-test-3");
  expect(mesejDegeri).toHaveTextContent(``);
});

test("sol butonuna basilma testi", () => {
  render(<AppFunctional />);
  const kordinatDegeri = screen.getByTestId("data-test-1");
  const solButton = screen.getByTestId("sol-button-testi");
  userEvent.click(solButton);

  expect(kordinatDegeri).toHaveTextContent(`Koordinatlar (1,2)`);
});

test("sag butonuna basilma testi", () => {
  render(<AppFunctional />);
  const kordinatDegeri = screen.getByTestId("data-test-1");
  const sagButton = screen.getByTestId("sag-button-testi");
  userEvent.click(sagButton);

  expect(kordinatDegeri).toHaveTextContent(`Koordinatlar (3,2)`);
});
