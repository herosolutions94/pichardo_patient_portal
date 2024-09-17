import { updatePassword} from "@/components/redux/reducers/user";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";

export default function UpdatePasswordForm({memberRow}) {
    const dispatch = useDispatch();
    const isPasswordFormProcessing = useSelector(state => state.user.isPasswordFormProcessing);
    const passwordUpdated = useSelector(state => state.user.passwordUpdated);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm();
    const handleUpdatePassword = (frmData) => {
        dispatch(updatePassword(frmData))
    }
    useEffect(() => {
        if (passwordUpdated) {
            reset()
        }
    }, [passwordUpdated]);

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <div className="flex">
            <div className="col-xs-12 head">
                <h3>Update Password</h3>
            </div>
            <div className="form_blk col-xs-6">
                <label>Current Password</label>
                <input
                    type="password"
                    name="current_password"
                    className="input"
                    {...register("old_password", {
                        required: "Required."
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="old_password"
                    render={({ message }) => <p className='error'><i className="fi-warning"></i> {message}</p>}
                />
            </div>
            
            <div className="form_blk col-xs-6">
                <label>New Password</label>
                <input
                    type="password"
                    name="new_password"
                    className="input"
                    {...register("new_password", {
                        required: "Required", pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]{8,}$/,
                            message: 'The password should contain at least 8 characters, that contain at least one lowercase letter, one uppercase letter and one numeric digit.'
                        }
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="new_password"
                    render={({ message }) => <p className='error'><i className="fi-warning"></i> {message}</p>}
                />
            </div>
            <div className="form_blk col-xs-6">
                <label>Repeat Password</label>
                <input
                    type="password"
                    name="repeat_password"
                    className="input"
                    {...register("confirm_password", {
                        required: "Required",
                        validate: (val) => {
                            if (watch('new_password') != val) {
                                return 'Your passwords do no match';
                            }
                        },
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="confirm_password"
                    render={({ message }) => <p className='error'><i className="fi-warning"></i> {message}</p>}
                />
            </div>
        </div>
        <div className="btn_blk">
            <button type="submit" className="site_btn green" disabled={isPasswordFormProcessing}>
            Update Password  <IsFormProcessingSpinner isProcessing={isPasswordFormProcessing} />
            </button>
        </div>
    </form>
    </>
  );
}
