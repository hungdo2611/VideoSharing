import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "../pages/Register";
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { registerAPI } from "../apis/authenAPI";

jest.mock('../apis/authenAPI')
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
    useLocation: () => mockUsedNavigate

}));
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe("register", () => {
    test("Register form validate", async () => {
        render(<BrowserRouter><Register /></BrowserRouter>);
        const email = screen.getByTestId("email")
        const password = screen.getByTestId("password")
        const register = screen.getByTestId("register-btn")

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(register).toBeInTheDocument();
        fireEvent.change(email, { target: { value: 'hungdv' } });
        fireEvent.change(password, { target: { value: '12345' } });
        fireEvent.click(register);
        await waitFor(async () => {
            const validate_email = screen.getByTestId("err-validate-email")
            const validate_password = screen.getByTestId("err-validate-password");

            await expect(validate_email).toBeInTheDocument();
            await expect(validate_password).toBeInTheDocument();
        });




    });
});
describe("register", () => {
    test("Register form validate", async () => {

        render(<BrowserRouter><Register /></BrowserRouter>);
        const email = screen.getByTestId("email")
        const password = screen.getByTestId("password")
        const register = screen.getByTestId("register-btn")

        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(register).toBeInTheDocument();
        fireEvent.change(email, { target: { value: 'hungdv@gmail.com' } });
        fireEvent.change(password, { target: { value: '123453' } });
        fireEvent.click(register);
        await waitFor(async () => {
            // const validate_email = screen.getByTestId("err-validate-email")
            // const validate_password = screen.getByTestId("err-validate-password");

            expect(registerAPI).toBeCalledWith({email: 'hungdv@gmail.com', password: '123453' });
        });




    });
});