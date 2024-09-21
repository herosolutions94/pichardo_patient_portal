import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import http from "@/components/helpers/http";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {  doObjToFormData } from "@/components/helpers/helpers";
import { authToken } from "@/components/helpers/authToken";
import { useRouter } from "next/router";
import toast from "react-hot-toast";


export default function CheckoutForm({ request_data, member, countries }) {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
    } = useForm();
    const watchAllFields=watch()
    useEffect(() => {
        if (member?.id > 0) {
            setValue("fname", member?.mem_fname ? member?.mem_fname : "")
            setValue("lname", member?.mem_lname ? member?.mem_lname : "")
            setValue("email", member?.mem_email ? member?.mem_email : "")
            setValue("phone", member?.mem_phone ? member?.mem_phone : "")
            setValue("address", member?.mem_address1 ? member?.mem_address1 : "")
            setValue("country_id", member?.mem_country ? member?.mem_country : "")
            setValue("state_id", member?.mem_state ? member?.mem_state : "")
            setValue("zip_code", member?.mem_zip ? member?.mem_zip : "")
            setValue("city", member?.mem_city ? member?.mem_city : "")
            setValue('payment_method','credit-card')
        }
    }, [member])
    
    const [states, setStates] = useState([]);
    const [isStateLoading, setStateLoading] = useState(false);
    const handleChangeCountry = async (e) => {
        const value = e.target.value;
        setValue("country_id", value, { shouldValidate: true });
        trigger("country_id");

        if (value) {
            setStateLoading(true);
            const result = await http
                .get("/get-states/" + value)
                .then((response) => response.data)
                .catch((error) => error);

            setStates(result);
            setStateLoading(false);
        }
    }
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const handleCardDetailsChange = (ev) => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    };
    const stripe = useStripe();
    const elements = useElements();
    const onSubmit = async(frmData) => {
        // Handle form submission
        console.log(frmData);
        if (watchAllFields?.payment_method === 'credit-card') {
            setCheckoutError("")
            if (!stripe || !elements) {
                return;
            }
            setProcessingTo(true);
            const cardElement = elements.getElement(CardElement);
            try {
                const paymentMethodReq = await stripe.createPaymentMethod({
                    type: "card",
                    card: cardElement,
                    // billing_details: billingDetails
                });
                if (paymentMethodReq.error) {
                    setCheckoutError(paymentMethodReq.error.message);
                    setProcessingTo(false);
                    return;
                } else {
                    frmData = { ...frmData, payment_method_id: paymentMethodReq.paymentMethod.id, request_id: request_data?.encoded_id }
                    const result = await http
                        .post("/create-payment-intent", doObjToFormData({ ...frmData, token: authToken() }))
                        .then((response) => response.data)
                        .catch((error) => error);
                        console.log(result)
                    if (result?.status) {
                        let client_secret = result?.arr?.client_secret;
                        let payment_method_id = paymentMethodReq.paymentMethod.id
                        let customer_id = result.arr.customer
                        const confirm_result = await stripe.confirmCardPayment(client_secret, {
                            payment_method: payment_method_id,
                            setup_future_usage: "off_session",
                        });
                        if (confirm_result.error) {
                            setCheckoutError(confirm_result.error.message);
                            setProcessingTo(false);
                            return;
                        } else if ((confirm_result.status = "succeeded")) {

                            frmData = { ...frmData, payment_intent: confirm_result.paymentIntent.id, customer_id: customer_id }
                            const response = await http
                                .post("/pay-invoice", doObjToFormData({ ...frmData, token: authToken() }))
                                .then((response) => response.data)
                                .catch((error) => error);
                            setProcessingTo(false);
                            if (response?.status) {
                                toast.success(response?.msg)
                                setTimeout(() => {
                                    router.push('/dashboard/requests/view/'+request_data?.encoded_id);
                                }, 2000);
                            }
                            else {
                                setProcessingTo(false);
                                toast.error(response?.msg)
                            }
                        }
                    }
                    else {
                        toast.error(result?.msg)
                    }
                }
            }
            catch (err) {
                setCheckoutError(err.message);
            }
        }
        else{
            console.log("invalid method!")
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
                <div className="form_blk col-xs-6">
                    <input
                        {...register("fname", { required: "First name is required" })}
                        className="input"
                        placeholder="First name"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="fname"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <input
                        {...register("lname", { required: "Last name is required" })}
                        className="input"
                        placeholder="Last name"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="lname"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="input"
                        placeholder="Email"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <input
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be 10 digits",
                            },
                        })}
                        className="input"
                        placeholder="Phone number"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="phone"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <select
                        {...register("country_id", {
                            required: 'Country is required',
                            onChange: handleChangeCountry
                        })}
                        className="input"
                    >
                        <option value="">Country</option>
                        {
                            countries?.map((country, index) => {
                                return (
                                    <option value={country?.id} key={index}>{country?.name}</option>
                                )
                            })
                        }
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="country"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <select className="input" {...register("state_id", {
                        required: 'State is required'
                    })}>
                        <option value="">State</option>
                        {
                            states?.map((state, index) => {
                                return (
                                    <option value={state?.id} key={index} selected={member?.mem_state === state?.id ? true : false}>{state?.name}</option>
                                )
                            })
                        }
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="state_id"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <input
                        {...register("city", { required: "City is required" })}
                        className="input"
                        placeholder="City"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="city"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-6">
                    <input
                        {...register("zip_code", { required: "Zip Code is required" })}
                        className="input"
                        placeholder="Zip Code"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="zip_code"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>
                <div className="form_blk col-xs-12">
                    <input
                        {...register("address", { required: "Address is required" })}
                        className="input"
                        placeholder="Address"
                    />
                    <ErrorMessage
                        errors={errors}
                        name="address"
                        render={({ message }) => (
                            <p className="error">
                                <i className="warning"></i> {message}
                            </p>
                        )}
                    />
                </div>



            </div>

            <div className="col-xs-12">
                <h4 className="red_heading">PAYMENT METHOD</h4>
            </div>
            <div className="bulk green_border">
                <div className="head_">
                    <div className="checkbox">
                        <input
                            {...register("payment_method", { required: "Payment method is required" })}
                            type="radio"
                            value="credit-card"
                        />
                        <label>
                            <h4>Credit Card</h4>
                            <p>Securely Pay with Your Card – Effortless Transactions Await!</p>
                        </label>
                    </div>
                    <div className="images">
                        <img src="/images/ca1.png" alt="Card 1" />
                        <img src="/images/ca2.png" alt="Card 2" />
                        <img src="/images/ca3.png" alt="Card 3" />
                    </div>
                </div>
                <div className="flex">
                    
                    <div className="form_blk col-xs-6">
                        <input
                            {...register("card_holder_name", { required: "Card holder name is required" })}
                            className="input"
                            placeholder="Card holder name"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="card_holder_name"
                            render={({ message }) => (
                                <p className="error">
                                    <i className="warning"></i> {message}
                                </p>
                            )}
                        />
                    </div>
                    <div className="form_blk col-xs-6">
                    <CardElement
                                                options={{
                                                    hidePostalCode: true,
                                                    style: {
                                                        base: {
                                                            fontSize: "14px",
                                                            color: "#424770",
                                                            "::placeholder": {
                                                                color: "#aab7c4",
                                                            },
                                                        },
                                                        invalid: {
                                                            color: "#9e2146",
                                                        },
                                                    },
                                                }}
                                                onChange={handleCardDetailsChange}
                                            />
                                            {checkoutError && (
                                            <div className="alert alert-danger">
                                                {checkoutError}
                                            </div>
                                        )}
                    </div>                                      
                </div>
                <div className="btn_blk">
                    <button type="submit" className="site_btn green" disabled={isStateLoading || isProcessing}>Check Out {isStateLoading || isProcessing ? <IsFormProcessingSpinner isProcessing={isStateLoading || isProcessing} /> : ""}</button>
                </div>
            </div>
        </form>
    );
}
