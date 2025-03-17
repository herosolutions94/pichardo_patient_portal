import ThumbnailAttachment from "@/components/components/thumbnail-attachment";
import { imageValidation } from "@/components/helpers/helpers";
import { updateProfileSettings, uploadProfileDp, uploadRandomImage } from "@/components/redux/reducers/user";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import toast from "react-hot-toast";
import IdentificationAttachment from "@/components/components/identification-attachment";

export default function ProfileSettingsForm() {
    const [identificationPhoto, setIdentificationPhoto] = useState(null);

    const dispatch = useDispatch();
    const [imageThumbnail, setThumbnail] = useState(null);
    const handleUploadThumbnail = (e) => {
        const files = e.target.files[0];
        let valid = imageValidation(files);
        if (valid.error) {
            toast.error(valid?.error)
        }
        else {
            dispatch(uploadProfileDp(files))
        }
    }

    const memberRow = useSelector(state => state.user.member);
    const mem_image = useSelector(state => state.user.mem_image);
    const is_dp_uploaded = useSelector(state => state.user.is_dp_uploaded);
    const isProfileImageLoading = useSelector(state => state.user.isProfileImageLoading);
    const isFormProcessing = useSelector(state => state.user.isFormProcessing);
    const preferred_pharmacy = useSelector(state => state.user.preferred_pharmacy) || [];
    useEffect(() => {
        setThumbnail(mem_image)
    }, [mem_image]);
    useEffect(() => {
        if (is_dp_uploaded) {
            setTimeout(() => {
                document.getElementById('input_id').value = '';
            }, 1000);
        }

    }, [is_dp_uploaded]);

    const [pharmacies, setPharmacies] = useState([
        {
          id: Date.now(),
          name: "",
          
        },
      ]);
      const handleAddRow = () => {
        setPharmacies((prevRows) => [
          ...prevRows,
          {
            id: Date.now(),
            name: "",
            
          },
        ]);
      };
    
      // Remove a row by ID
      const handleRemoveRow = (id) => {
        setPharmacies((prevRows) => prevRows.filter((row) => row.id !== id));
      };


      const handleInputChange = (id, field, value) => {
        setPharmacies((prevRows) =>
          prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
      };

    const {
        register,
        control,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
    } = useForm();
    const watchAllFields = watch()


    useEffect(() => {
        if (memberRow?.id > 0) {
            setValue("mem_fname", memberRow?.mem_fname)
            setValue("mem_lname", memberRow?.mem_lname)
            setValue("phone", memberRow?.mem_phone)
            setValue("mem_address1", memberRow?.mem_address1)
            setValue("gender", memberRow?.gender)
            setValue("allergies", memberRow?.allergies)
            setValue("surgical_history", memberRow?.surgical_history)
            setValue("pregnancy_status", memberRow?.pregnancy_status)
            setValue("smoking_history", memberRow?.smoking_history)
            // setValue("preferred_pharmacy", memberRow?.preferred_pharmacy)
            setIdentificationPhoto(memberRow?.identification_photo ? memberRow?.identification_photo : null)

            if (preferred_pharmacy?.length > 0) {
                const updatedPharmacies = preferred_pharmacy.map((pharmacy, index) => ({
                  id: Date.now() + index,
                  ...pharmacy,
                }));
      
                setPharmacies(updatedPharmacies);
              }
        }
    }, [memberRow]);

    const handleUpdateProfile = (frmData) => {
        const errors = [];
        pharmacies.forEach((pharmacy, index) => {
            if (!pharmacy.name) {
              errors.push(`Pharmacy Name is required in block ${index + 1}.`);
            }
            
          });
          if (errors.length > 0) {
            // Display the errors
            toast.error(errors.join(" ")); // You can use any toast notification library here
            return;
          }
        if (identificationPhoto) {

            frmData = { ...frmData, identification_photo: identificationPhoto, preferred_pharmacies: JSON.stringify(pharmacies) }
            dispatch(updateProfileSettings(frmData))
        }
        else {
            toast.error('Identification photo is required');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <h3>Profile Information</h3>
                <div className="form_blk">
                    <ThumbnailAttachment imageThumbnail={imageThumbnail} handleUploadThumbnail={handleUploadThumbnail} path="members" isProfileImageLoading={isProfileImageLoading} />

                </div>
                <div className="col-xs-12 head">
                    <h3>Basic information</h3>
                </div>
                <div className="flex">
                    <div className="form_blk col-xs-6">
                        <label>First Name</label>
                        <input
                            id=""
                            type=""
                            name="mem_fname"
                            autoComplete=""
                            className="input"
                            defaultValue={watchAllFields?.name ? watchAllFields?.mem_fname : ""}
                            {...register("mem_fname", {
                                pattern: {
                                    value: /^[a-zA-Z][a-zA-Z ]*$/,
                                    message: 'Invalid Value!',
                                },
                                required: 'Required'
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="mem_fname"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                    <div className="form_blk col-xs-6">
                        <label>Last Name</label>
                        <input
                            id=""
                            type=""
                            name="mem_lname"
                            autoComplete=""
                            className="input"
                            defaultValue={watchAllFields?.name ? watchAllFields?.mem_lname : ""}
                            {...register("mem_lname", {
                                pattern: {
                                    value: /^[a-zA-Z][a-zA-Z ]*$/,
                                    message: 'Invalid Value!',
                                },
                                required: 'Required'
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="mem_lname"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                    <div className="form_blk col-xs-6">
                        <label>Email</label>
                        <input
                            id=""
                            type=""
                            name="mem_email"
                            autoComplete=""
                            className="input"
                            defaultValue={memberRow?.mem_email ? memberRow?.mem_email : ""}
                            readOnly
                        />
                    </div>
                    <div className="form_blk col-xs-6">
                        <label>Phone</label>
                        <input
                            id=""
                            type="text"
                            name="phone"
                            autoComplete=""
                            className="input"
                            defaultValue={watchAllFields?.phone ? watchAllFields?.phone : ""}
                            {...register("phone", {
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: 'Invalid phone number!',
                                },
                                required: 'Phone number is required'
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="phone"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>
                    <div className="form_blk col-xs-12">
                        <label>Address</label>
                        <input
                            id=""
                            type="text"
                            name="mem_address1"
                            autoComplete=""
                            placeholder="Sydney Olympic Park"
                            className="input"
                            defaultValue={watchAllFields?.mem_address1 ? watchAllFields?.mem_address1 : ""}
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

                    <div className="form_blk col-xs-6">
                        <label>Preferred Pharmacies</label>
                        
                        {pharmacies?.map((row, index) => (
                      <div key={row.id} className="d-flex align-items-center mb-3">
                            <input
                              type="text"
                              placeholder="Enter pharmcy name"
                              className="input"
                              value={row.name}
                              onChange={(e) =>
                                handleInputChange(
                                  row.id,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          
                          {index > 0 && (
                          <button
                            type="button"
                        
                            className="site_btn x_btn"
                            style={{position: 'relative', top: '0rem', left:'2rem'}}
                            onClick={() => handleRemoveRow(row.id)}
                          ></button>
                        )}
                          
                        
                        
                        
                      </div>
                    ))}
                    <div className="add_more_more d-flex justify-content-end">
                      <button type="button" className="site_btn md" onClick={handleAddRow}>
                        Add more
                      </button>
                    </div>
                        {/* <select
                            className="input" {...register("preferred_pharmacy", { required: 'Please select a pharmacy' })}>
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
                        </select> */}
                        {/* <ErrorMessage
                            errors={errors}
                            name="preferred_pharmacy"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        /> */}
                    </div>
                    <div className="col-xs-12 head">
                        <h3>Other information</h3>
                    </div>
                    <div className="form_blk col-xs-6">
                        <label>Gender</label>
                        <select
                            className="input"
                            selected={watchAllFields?.gender ? watchAllFields?.gender : ""}
                            {...register("gender", {
                                required: "Gender is required",
                            })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <ErrorMessage
                            errors={errors}
                            name="gender"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>

                    <div className="form_blk col-xs-12">
                        <label>Allergies</label>
                        <textarea
                            id=""
                            name="allergies"
                            autoComplete=""
                            placeholder=""
                            className="input"
                            defaultValue={watchAllFields?.allergies ? watchAllFields?.allergies : ""}
                            {...register("allergies", {
                                required: "Allergies information is required",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="allergies"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>

                    <div className="form_blk col-xs-12">
                        <label>Surgical History</label>
                        <textarea
                            id=""
                            name="surgical_history"
                            autoComplete=""
                            placeholder=""
                            className="input"
                            defaultValue={watchAllFields?.surgical_history ? watchAllFields?.surgical_history : ""}
                            {...register("surgical_history", {
                                required: "Surgical history is required",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="surgical_history"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>

                    <div className="form_blk col-xs-6">
                        <label>Pregnancy Status</label>
                        <select
                            id=""
                            name="pregnancy_status"
                            className="input"
                            defaultValue={watchAllFields?.pregnancy_status ? watchAllFields?.pregnancy_status : ""}
                            {...register("pregnancy_status", {
                                required: "Pregnancy status is required",
                            })}
                        >
                            <option value="Not Pregnant">Not Pregnant</option>
                            <option value="Pregnant">Pregnant</option>
                        </select>
                        <ErrorMessage
                            errors={errors}
                            name="pregnancy_status"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>

                    <div className="form_blk col-xs-6">
                        <label>Smoking History</label>
                        <select
                            id=""
                            name="smoking_history"
                            className="input"
                            defaultValue={watchAllFields?.smoking_history ? watchAllFields?.smoking_history : ""}
                            {...register("smoking_history", {
                                required: "Smoking history is required",
                            })}
                        >
                            <option value="Former Smoker">Former Smoker</option>
                            <option value="Current Smoker">Current Smoker</option>
                            <option value="Never Smoked">Never Smoked</option>
                        </select>
                        <ErrorMessage
                            errors={errors}
                            name="smoking_history"
                            render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                        />
                    </div>


                    <div className="col-xs-12 head">
                        <h3>
                            Upload Photo Identification (Drivers License, State ID, or
                            Passport)
                        </h3>
                    </div>

                    <div className="form_blk">
                        <IdentificationAttachment identificationPhoto={identificationPhoto} setIdentificationPhoto={setIdentificationPhoto} />
                    </div>

                </div>
                <div className="btn_blk">
                    <button type="submit" className="site_btn green" disabled={isFormProcessing}>
                        Update Information <IsFormProcessingSpinner isProcessing={isFormProcessing} />
                    </button>
                </div>
            </form>
        </>
    );
}
