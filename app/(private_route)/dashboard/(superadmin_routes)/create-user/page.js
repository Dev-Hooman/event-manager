'use client'
import UserForm from '@/components/CreateUsers/UserForm'
import React from 'react'

const CreateUser = () => {

    async function createUserApi(userData){
        console.log(userData)
        alert('User Created Successfully', userData)
    }

  return (
    <UserForm onSubmit={createUserApi}/>
  )
}

export default CreateUser