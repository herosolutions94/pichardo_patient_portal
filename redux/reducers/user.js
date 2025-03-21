import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from "../../helpers/http";
import { doObjToFormData } from "../../helpers/helpers";
import { authToken } from "../../helpers/authToken";
import { deleteCookie, removeCookies } from 'cookies-next';
import * as links from "../../constants/link.js";
import toast from 'react-hot-toast';
import Text from '@/components/components/text';
export const fetchSiteSettings = createAsyncThunk(
    'member/site-settings',
    async (type = 'member', { rejectWithValue }) => {
        try {
            const response = await http.post("site-settings", doObjToFormData({ type, token: authToken() }));
            return response.data;
        } catch (error) {
            // if (error.response.status === 401) {
            //     removeCookies("authToken");
            // }
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchMemberData = createAsyncThunk(
    'member/fetchMemberData',
    async (type = 'member', { rejectWithValue }) => {
        try {
            const response = await http.post("member-settings", doObjToFormData({ type, token: authToken() }));
            // console.log(response.data.preferred_pharmacy);
            return response.data;
        } catch (error) {
            console.log(error)
            // if (error.response.status === 401) {
            //     removeCookies("authToken");
            // }
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateMEmbersState = createAsyncThunk(
    'member/update_members_State',
    async (memberRow, { rejectWithValue }) => {
        return memberRow;
    }
);

export const verifyOtp = createAsyncThunk(
    'verifyOtp',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("verify-otp", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const resendOtpCode = createAsyncThunk(
    'reset-otp',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("resend-email", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updateProfileSettings = createAsyncThunk(
    'update-profile',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("update-profile", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    if (formData?.complete_profile === 1) {
                        window.location.href = "/"
                    }
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const updatePassword = createAsyncThunk(
    'update-password',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("update-password", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const deactivateUserAccount = createAsyncThunk(
    'deactivate-account',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("deactivate-account", doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const uploadProfileDp = createAsyncThunk(
    'profile-dp',
    async (formData, { rejectWithValue, dispatch }) => {
        const fd = new FormData();
        fd.append("image", formData);
        fd.append("token", authToken());
        try {
            const response = await http.post("save-image", fd);
            const { data } = response;
            if (data?.status === 1) {

            } else {
                toast.error(<Text string={data?.msg} />)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const uploadRandomImage = createAsyncThunk(
    'upload-image-new',
    async (frmData, { rejectWithValue, dispatch }) => {
        console.log(frmData?.image, frmData?.type)
        const fd = new FormData();
        fd.append("image", frmData?.image);
        fd.append("type", frmData?.type);
        fd.append("token", authToken());
        try {
            const response = await http.post("upload-image", fd);
            const { data } = response;
            console.log(data)
            if (data?.status === 1) {

            } else {
                toast.error(<Text string={data?.msg} />)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const emptyUploadRandomPhoto = createAsyncThunk(
    'user/empty-upload-image-new',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const uploadRandomFile = createAsyncThunk(
    'upload-file-new',
    async (frmData, { rejectWithValue, dispatch }) => {
        console.log(frmData?.image, frmData?.type)
        const fd = new FormData();
        fd.append("file", frmData?.file);
        fd.append("token", authToken());
        try {
            const response = await http.post("upload-file", fd);
            const { data } = response;
            console.log(data)
            if (data?.status === 1) {

            } else {
                toast.error(<Text string={data?.msg} />)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const emptyUploadRandomFile = createAsyncThunk(
    'user/empty-upload-file-new',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const uploadMultipleFiles = createAsyncThunk(
    'upload-files-new',
    async (frmData, { rejectWithValue, dispatch }) => {
        console.log(frmData?.image, frmData?.type)
        const fd = new FormData();
        frmData?.files?.forEach((file) => {
            fd.append('files[]', file); // Add each file to FormData
        });
        fd.append("token", authToken());
        try {
            const response = await http.post("upload-files", fd);
            const { data } = response;
            console.log(data)
            if (data?.status === 1) {

            } else {
                toast.error(<Text string={data?.msg} />)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const emptyUploadMultipleFiles = createAsyncThunk(
    'user/empty-upload-multiple-files-new',
    async (newNotification, { rejectWithValue }) => {
        return newNotification;
    }
);
export const deleteUserNotification = createAsyncThunk(
    'delete-notification',
    async (formData, { rejectWithValue, dispatch }) => {

        try {
            const response = await http.post("delete-notification/" + formData?.id, doObjToFormData({ ...formData, token: authToken() }));
            const { data } = response;
            if (data.validationErrors) {
                toast.error(<Text string={data?.validationErrors} />)
            } else if (data?.status === 1) {
                toast.success(data?.msg)
                setTimeout(() => {
                    // Redirect logic
                }, 2000);
            } else {
                toast.error(data?.msg)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    error: false,
    isFetching: false,
    data: null,
    member: null,
    isFormProcessing: false,
    isResendFormProcessing: false,
    expire_time: null,
    mem_image: null,
    mem_name: null,
    mem_email: null,
    unread_msgs: null,
    isProfileImageLoading: false,
    is_dp_uploaded: false,
    isPasswordFormProcessing: false,
    passwordUpdated: false,
    isDeactivateLoading: false,
    isDeactivated: false,
    is_deactivated: null,
    site_settings: null,
    preferred_pharmacy: null,
    isNotificationDeleted: false,
    image_name: null,
    isImageUploading: false,
    is_image_uploaded: false,
    file_name: null,
    file_names: [],
    isFilesUploaded: false,
    isFileUploading: false,
    mem_chat_id: null
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteSettings.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchSiteSettings.fulfilled, (state, action) => {
                state.isFetching = false;
                state.site_settings = action?.payload?.site_settings;
            })
            .addCase(fetchSiteSettings.rejected, (state, action) => {
                state.isFetching = false;
                state.error = true;
            })
            .addCase(fetchMemberData.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchMemberData.fulfilled, (state, action) => {
                state.isFetching = false;
                state.preferred_pharmacy = action?.payload?.preferred_pharmacy;
                if (action?.payload?.member) {
                    // if(action?.payload?.member?.is_deleted===0){
                    state.data = action?.payload;
                    state.member = action?.payload?.member;
                    state.expire_time = action?.payload?.expire_time;
                    state.mem_image = action?.payload?.mem_image;
                    state.mem_name = action?.payload?.mem_name;
                    state.mem_email = action?.payload?.mem_email;
                    state.is_deactivated = action?.payload?.is_deactivated;
                    state.unread_msgs = action?.payload?.unread_msgs;
                    state.mem_chat_id = action?.payload?.mem_chat_id;
                    // }
                    // else{
                    //     deleteCookie("authToken");
                    //     window.location.href="/login"
                    // }

                }
                else {
                    deleteCookie("authToken");
                }

            })
            .addCase(fetchMemberData.rejected, (state, action) => {
                if (action?.payload?.error === 1) {
                    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    window.location.href = "/login"
                }
                state.isFetching = false;
                state.error = true;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                if (action?.payload?.status === 1) {
                    setTimeout(() => {
                        window.location.replace("/dashboard/profile-settings");
                    }, 2000);
                }

                state.isFormProcessing = false;
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(resendOtpCode.pending, (state) => {
                state.isResendFormProcessing = true;
            })
            .addCase(resendOtpCode.fulfilled, (state, action) => {

                state.expire_time = action?.payload?.expire_time
                state.isResendFormProcessing = false;
            })
            .addCase(resendOtpCode.rejected, (state) => {
                state.isResendFormProcessing = false;
            })
            .addCase(uploadProfileDp.pending, (state) => {
                state.is_dp_uploaded = false;
                state.isProfileImageLoading = true;
            })
            .addCase(uploadProfileDp.fulfilled, (state, action) => {

                state.isProfileImageLoading = false;
                state.is_dp_uploaded = true;
                state.mem_image = action?.payload?.mem_image;
            })
            .addCase(uploadProfileDp.rejected, (state) => {
                state.isProfileImageLoading = false;
            })
            .addCase(uploadRandomImage.pending, (state) => {
                state.is_image_uploaded = false;
                state.isImageUploading = true;
            })
            .addCase(uploadRandomImage.fulfilled, (state, action) => {

                state.isImageUploading = false;
                state.is_image_uploaded = true;
                state.image_name = action?.payload?.image_name;
            })
            .addCase(uploadRandomImage.rejected, (state) => {
                state.isImageUploading = false;
            })
            .addCase(emptyUploadRandomPhoto.fulfilled, (state, action) => {
                state.is_image_uploaded = false;
                state.image_name = null;
            })
            .addCase(uploadRandomFile.pending, (state) => {
                state.isFilesUploaded = false;
                state.isFileUploading = true;
            })
            .addCase(uploadRandomFile.fulfilled, (state, action) => {

                state.isFileUploading = false;
                state.isFilesUploaded = true;
                state.file_name = action?.payload?.file_name;
            })
            .addCase(uploadRandomFile.rejected, (state) => {
                state.isFileUploading = false;
            })
            .addCase(emptyUploadRandomFile.fulfilled, (state, action) => {
                state.isFilesUploaded = false;
                state.file_name = null;
            })
            .addCase(uploadMultipleFiles.pending, (state) => {
                state.isFilesUploaded = false;
                state.isFileUploading = true;
            })
            .addCase(uploadMultipleFiles.fulfilled, (state, action) => {

                state.isFileUploading = false;
                state.isFilesUploaded = true;
                state.file_names = action?.payload?.file_names;
            })
            .addCase(uploadMultipleFiles.rejected, (state) => {
                state.isFileUploading = false;
            })
            .addCase(emptyUploadMultipleFiles.fulfilled, (state, action) => {
                state.isFilesUploaded = false;
                state.file_names = null;
            })
            .addCase(updateProfileSettings.pending, (state) => {
                state.isFormProcessing = true;
            })
            .addCase(updateProfileSettings.fulfilled, (state, action) => {
                state.mem_name = action?.payload?.mem_name;
                state.isFormProcessing = false;
            })
            .addCase(updateProfileSettings.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(updatePassword.pending, (state) => {
                state.passwordUpdated = false;
                state.isPasswordFormProcessing = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isPasswordFormProcessing = false;
                if (action?.payload?.status) {
                    state.passwordUpdated = true;
                }
            })
            .addCase(updatePassword.rejected, (state) => {
                state.isPasswordFormProcessing = false;
            })
            .addCase(deactivateUserAccount.pending, (state) => {
                state.isDeactivated = false;
                state.isDeactivateLoading = true;
            })
            .addCase(deactivateUserAccount.fulfilled, (state, action) => {
                state.isDeactivateLoading = false;

                if (action?.payload?.status) {
                    state.is_deactivated = action?.payload?.is_deactivated;
                    state.isDeactivated = true;
                    setTimeout(() => {
                        window.location.replace("/dashboard/account-deactivated");
                    }, 2000);
                }
            })
            .addCase(deactivateUserAccount.rejected, (state) => {
                state.isDeactivateLoading = false;
            })
            .addCase(deleteUserNotification.pending, (state) => {
                state.isNotificationDeleted = false;
                state.isFormProcessing = true;
            })
            .addCase(deleteUserNotification.fulfilled, (state, action) => {
                state.isFormProcessing = false;

                if (action?.payload?.status) {
                    state.isNotificationDeleted = true;
                }
            })
            .addCase(deleteUserNotification.rejected, (state) => {
                state.isFormProcessing = false;
            })
            .addCase(updateMEmbersState.fulfilled, (state, action) => {
                state.member = action?.payload;
            })

    },
});

export default memberSlice.reducer;