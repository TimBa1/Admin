import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../features/auth/authSlice";

let schema = yup.object().shape({
    employeeId: yup
        .string()
        .required("Empoyee Id is Required"),
    phoneNumber: yup
        .string()
        .matches(/^\+1\d{10}$/, "Invalid US phone number")
        .required("Phone number is required"),
    password: yup.string().required("Password is Required"),
    email: yup.string().required("Email is Required"),
    token: yup.string().required("Token is Required")
});
const UpdateAdmin = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    console.log(token)
    console.log(email)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({

        initialValues: {
            email: email,
            password: '',
            token: token,
            phoneNumber: '',
            employeeId: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(updateAdmin(values));
        },
    });

    const authState = useSelector((state) => state);

    const { accesstoken, user, isError, isSuccess, isLoading, message } = authState.auth;

    useEffect(() => {
        if (isSuccess && accesstoken) {
            navigate("admin");
        } else {
            navigate("/admin/update");
        }
    }, [user, isError, isSuccess, isLoading, accesstoken, navigate]);
    return (
        <div className="py-5" style={{ background: "#0057FF", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <div className="error text-center">
                    {message.message == "Rejected" ? "You are not an Admin" : ""}
                </div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Employee Id"
                        id="employeeId"
                        name="employeeId"
                        onChng={formik.handleChange("employeeId")}
                        onBlr={formik.handleBlur("employeeId")}
                        val={formik.values.employeeId}
                    />
                    <div className="error mt-2">
                        {formik.touched.employeeId && formik.errors.employeeId}
                    </div>
                    {/* <CustomInput
                        type="number"
                        label="Phone Number"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChng={formik.handleChange("phoneNumber")}
                        onBlr={formik.handleBlur("phoneNumber")}
                        val={formik.values.phoneNumber}
                    />
                    <div className="error mt-2">
                        {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </div> */}
                    <CustomInput
                        type="password"
                        label="Password"
                        id="pass"
                        name="password"
                        onChng={formik.handleChange("password")}
                        onBlr={formik.handleBlur("password")}
                        val={formik.values.password}
                    />
                    <div className="error mt-2">
                        {formik.touched.password && formik.errors.password}
                    </div>
                    <div className="mb-3 text-end">
                        <Link to="forgot-password" className="">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAdmin;
