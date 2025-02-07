'use client'
import EventForm from '@/components/CreateEvents/EventForm'
import React from 'react'

const CreateEventPage = () => {

    async function createEventApi(eventData){
        alert('Event Created Successfully', eventData)
    }

  return (
    <EventForm onSubmit={createEventApi}/>
  )
}

export default CreateEventPage