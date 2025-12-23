'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button';
import { useAlert } from '@/context/AlertContext';
import { UserCircle,  } from "lucide-react";
import ApiSercies from '@/services/CommonApi';
import { StudentCard } from './StudentCard';
import { AddStudentModal } from './AddStudentModal';

interface Student {
  name: string
  email: string
  course: string
  enrlDate: string
  studentId: string
}

const User = () => {
   const [user, setUser] = useState<Student | null>(null);
    const {setAlert} = useAlert();
const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUserData = async () => {
      try {
        const id = sessionStorage.getItem("student_id");
        if(!id) return;

        let res = await ApiSercies.get_profile(id);
        console.log(res);
        const userData = {
          name: res.data.student.userId.name,
          email: res.data.student.userId.email,
          course: res.data.student.course,
          enrlDate: res.data.student.enrlDate,
          studentId: res.data.student._id
        }
        if(res.data){
          setUser(userData);
        }
      } catch (error) {
        
      }
    }

    // sign out function to remove user data from sessionStorage and redirect to home page
    const signOut = () => {
      sessionStorage.removeItem("student_id");
      localStorage.removeItem("token");
      window.location.href = "/";
        setAlert("success", "Signed out successfully!");
    }

    useEffect(() => {
      fetchUserData();
    }, []);
  return (
   
    <div className="min-h-screen bg-background">
      {/* Header with logged in user */}
      <header className="border-b border-border bg-card">
        <div className='flex justify-between'>
<div className='flex justify-center items-center ml-8'>
     <div className="flex justify-end items-center gap-2">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{user?.name}</span>
          </div>
    
</div>
<div className="container mx-auto px-4 py-4">
          <div className="flex justify-end items-center gap-2">

          
          <Button size="md" variant='secondary' onClick={signOut} className="gap-2 px-8">
            Logout
          </Button>
          </div>
        </div>
        </div>
        
      </header>
       <main className="container mx-auto px-4 py-12">
        {
          user && <StudentCard 
          key={user?.studentId}
                    name={user?.name}
                    email={user?.email}
                    course={user?.course}
                    enrollmentDate={user?.enrlDate}
                    studentId={user?.studentId}
                     onEdit={() => {
                      setIsModalOpen(true);
                    }}
                    fetchStudents={fetchUserData}
        />
        }
        
       </main>
        
        
                {
                        isModalOpen && <AddStudentModal closeFunc={() =>{
                             setIsModalOpen(false);
                        }} fetchStudents={fetchUserData} editStudent={user} />
                      }
      </div>
  );
}

export default User