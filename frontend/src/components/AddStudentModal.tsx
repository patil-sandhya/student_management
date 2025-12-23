"use client"

import React, { useEffect, useRef, useState } from "react"

import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Button } from "./ui/Button"
import CustomSelect from "./ui/Select"
import ApiSercies from "@/services/CommonApi"
import { useAlert } from "@/context/AlertContext"


interface Student {
  name: string
  email: string
  course: string
  enrlDate: string
  studentId?: string
}

interface AddStudentModalProps {
  closeFunc: () => void
  fetchStudents: () => void
  editStudent?: Student | null
}

interface FormErrors {
  name?: string
  email?: string
  course?: string
}

const courseOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Engineering", label: "Engineering" },
    { value: "Psychology", label: "Psychology" },
    { value: "Mathematics", label: "Mathematics" },
  ]

export function AddStudentModal({ closeFunc,fetchStudents, editStudent }: AddStudentModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [course, setCourse] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const {setAlert} = useAlert();

 useEffect(() => {
    if (editStudent) {
      setName(editStudent.name)
      setEmail(editStudent.email)
      const matchedOption = courseOptions.find((opt) => opt.label === editStudent.course)
      setCourse(matchedOption?.value || "")
    } else {
      setName("")
      setEmail("")
      setCourse("")
    }
    setErrors({})
  }, [editStudent, open])

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: FormErrors = {}
    if (!name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!course) {
      newErrors.course = "Please select a course"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
let res;
        if(editStudent){
            console.log("edit student api call")
res = await ApiSercies.update_profile(editStudent.studentId, { name, email, course, enrlDate: new Date().toISOString() });
if (res?.data?.msg === "Student updated successfully" && res?.data?.student) {
    fetchStudents();
          setAlert("success", "Student updated successfully")

      }else{
        setAlert("error", "Failed to update student. Please try again.")
      }
        }else{
 res = await ApiSercies.add_student({ name, email, course, enrlDate: new Date().toISOString() });
 if (res?.data?.msg === "Student created successfully" && res?.data?.student) {
    fetchStudents();
          setAlert("success", "Student added successfully")

      }else{
        setAlert("error", "Failed to add student. Please try again.")
      }
        }
      


        return
      

    
    } catch (error: any) {
      console.error("Error adding student:", error)
      if(editStudent){
        setAlert("error", "Failed to update student. Please try again.")
      }else{
 setAlert("error", "Failed to add student. Please try again.")
      }
       
    
    } finally {
      setIsLoading(false)
        setName("")
        setEmail("")
        setCourse("")
        setErrors({})
      closeFunc()

    }
  }

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40" >
       <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          <div className="bg-white max-w-md w-full rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editStudent ? "Edit Profile" : "Add New Student"}
                </h2>
                <button onClick={closeFunc} className="text-red-500 cursor-pointer text-lg font-bold">
                    ✕
                </button>
              </div>
        <div>
          {
           editStudent ? <p>Update the details below. Click save when you're done.</p> :<p>Enter the student details below. Click save when you're done.</p>
          }
          
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Name field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              disabled={isLoading}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              disabled={isLoading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Course field */}
           <div className="flex flex-col gap-2">
            <Label htmlFor="course">Course</Label>
            <CustomSelect
              value={course}
              onChange={(value) => {
                setCourse(value)
                if (errors.course) setErrors({ ...errors, course: undefined })
              }}
              placeholder="Select a course"
              disabled={isLoading}
              error={!!errors.course}
              options={courseOptions}
            />
            {errors.course && (
              <p id="course-error" className="text-sm text-destructive">
                {errors.course}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={isLoading} className="w-full mt-2">
           {isLoading
              ? editStudent
                ? "Updating..."
                : "Adding Student..."
              : editStudent
                ? "Update Student"
                : "Add Student"}
          </Button>
        </form>
      </div>
    </div>
    </div>
  )
}
