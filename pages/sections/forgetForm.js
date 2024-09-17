import Link from "next/link";
import React from "react";

import { useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useSelector, useDispatch } from 'react-redux';
import { postForgot } from "../../redux/reducers/auth";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";

export default function ForgetForm() {
    const isFormProcessing = useSelector(state => state.auth.isFormProcessing);
    const dispatch = useDispatch();

    const handleSaveForm = (formData) => {
        formData = { ...formData, type: "normal" }
        dispatch(postForgot(formData));
    };
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm();

    return <>
        <form method="POST" onSubmit={handleSubmit(handleSaveForm)}>
            <div className="form_blk">
                <label>Email</label>
                <input type="text" className="input" placeholder="hi@example.com"  {...register("email", {
                    required: 'Required', pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                        message: 'Invalid Email Format'
                    }
                })} />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
            </div>

            <div className="btn_blk">
                <button
                    className="site_btn block"
                    type="submit" disabled={isFormProcessing}
                >Submit <IsFormProcessingSpinner isProcessing={isFormProcessing} /></button>
            </div>
        </form>
    </>;
}