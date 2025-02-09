'use client'
import { register } from '@/api/services/authService';
import UserForm from '@/components/CreateUsers/UserForm'
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const CreateUser = () => {
  const router = useRouter()

    async function createUserApi(userData) {
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("phone", userData.phone);
        formData.append("password", userData.password);

        const response = await register(formData, userData.role);

        if(response.success){
          toast.success(response.message);
          router.push('/dashboard/users')
        }
        
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong!");
      }
    }

    return <UserForm onSubmit={createUserApi} />;
}

export default CreateUser;
