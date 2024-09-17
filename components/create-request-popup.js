import React, { useEffect } from "react";
import Link from "next/link";

import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";

export default function Create_Request_info({preferred_pharmacy, memberRow}) {
  const {
      register,
      control,
      watch,
      formState: { errors },
      handleSubmit,
      setValue,
      reset
  } = useForm();
  useEffect(() => {
      if (memberRow?.id > 0) {
          setValue("mem_address1", memberRow?.mem_address1)
          setValue("preferred_pharmacy", memberRow?.preferred_pharmacy)
      }
  }, [memberRow]);

  const handleRequestForm = (frmData) => {
    return frmData;
  }
  return (
    <div className="request-popup">
      <h4>Please confirm your address and preferred pharmacy</h4>
      <form onSubmit={handleSubmit(handleRequestForm)}>
        <div className="form_blk">
          <label>Address</label>
          <input
            id=""
            type=""
            name=""
            autoComplete=""
            placeholder="Sydney Olympic Park"
            className="input"
            defaultValue={memberRow?.mem_address1 ? memberRow?.mem_address1 : ""}
            {...register("mem_address1", {
                required: 'Address is required',
                minLength: {
                    value: 5,
                    message: 'Address must be at least 5 characters long',
                },
                maxLength: {
                    value: 100,
                    message: 'Address must be less than 100 characters long',
                },
                pattern: {
                    value: /^[a-zA-Z0-9\s,'-]*$/,
                    message: 'Invalid address format!',
                }
            })}
          />
          <ErrorMessage
              errors={errors}
              name="mem_address1"
              render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
          />
        </div>
        <div className="form_blk ">
          <label>Preferred Pharmacy</label>
            <select
                className="input" 
                selected={memberRow?.preferred_pharmacy ? memberRow?.preferred_pharmacy : ""}
                {...register("preferred_pharmacy", { required: 'Please select a pharmacy' })}>
                <option value="">Select Pharmacy</option>
                {preferred_pharmacy.length > 0 ? (
                    preferred_pharmacy.map((pharmacy, index) => (
                        <option key={pharmacy.id} value={pharmacy.name}>
                            {pharmacy.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No pharmacies available</option>
                )}
            </select>
            <ErrorMessage
                errors={errors}
                name="preferred_pharmacy"
                render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
            />
        </div>
        <div className="btn_blk">
          <Link
            href={{
              pathname: "/dashboard/create-new-request",
              query: {
                mem_address1: watch("mem_address1"),
                preferred_pharmacy: watch("preferred_pharmacy"),
              },
            }}
            className="site_btn green"
          >
            Confirm
          </Link>
        </div>
      </form>
    </div>
  );
}
