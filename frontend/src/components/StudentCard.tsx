"use client"

import { Mail, GraduationCap, Calendar, Pencil, Trash2 } from "lucide-react"
import { Button } from '../components/ui/Button';
import { useState } from "react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import ApiSercies from "@/services/CommonApi";
import { useAlert } from "@/context/AlertContext";

interface StudentCardProps {
  name: string
  email: string
  course: string
  enrollmentDate: string
  onEdit?: () => void
  fetchStudents: () => void
studentId: string
type?: "admin" | "user"
}

export function StudentCard({type, name, email, course, enrollmentDate, onEdit, fetchStudents, studentId }: StudentCardProps) {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const {setAlert} = useAlert();

   const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

const formattedDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
}).format(new Date(enrollmentDate));

const handleDelete = async () => {
    try {
        let res = await ApiSercies.delete_student(studentId);
       if (res?.data?.msg === "Student deleted successfully") {
    fetchStudents();
          setAlert("success", "Student deleted successfully")

      }else{
        setAlert("error", "Failed to delete student. Please try again.")
      }
    } catch (error) {
         setAlert("error", "Failed to delete student. Please try again.")
    }finally{
        setIsDeleteModalOpen(false);
    }
}
  return (
    <div className="w-full min-w-md max-w-md rounded-2xl border-border bg-gray-100 shadow-lg">
      <div className="p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
         <div className="flex justify-center items-center h-full">
  <div
    className="h-24 w-24 rounded-full bg-primary text-primary-foreground text-2xl font-semibold flex items-center justify-center shrink-0 overflow-hidden"
    aria-label={`Avatar for ${name}`}
    title={name}
  >
    {initials}
  </div>
</div>

          {/* Student Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{name}</h2>
              <p className="text-muted-foreground text-sm">Student Profile</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{email}</span>
              </div>

              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{course}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">Enrolled: {formattedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button onClick={onEdit} variant="edit" className="gap-2 bg-transparent">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              {
                type === "admin" && (
 <Button onClick={() => setIsDeleteModalOpen(true)} variant="delete" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
                )
              }
             
            </div>
          </div>
        </div>
      </div>
      {
        isDeleteModalOpen && (
            <DeleteConfirmationModal onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} studentName={name} />
        )
      }
    </div>
  )
}
