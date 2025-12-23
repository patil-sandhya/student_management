import React, { useEffect, useState } from 'react'
import { UserCircle, Plus } from "lucide-react";
import { Button } from '../components/ui/Button';
import { StudentCard } from '../components/StudentCard';
import Pagination from './Pagination';
import { AddStudentModal } from './AddStudentModal';
import ApiSercies from '@/services/CommonApi';
import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/navigation';

const Admin = () => {
     const [result, setResult]= useState([])
     const [role, setRole] = useState<string | null>(null)
     const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setAlert} = useAlert();
  const [editingStudent, setEditingStudent] = useState<{
    name: string
    email: string
    course: string
    enrlDate: string
    studentId?: string
  } | null>(null)

const router = useRouter()

  const fetchStudents = async ()=>{
    // console.log("fetch menu val",filterVal)
    setLoading(true)
    try {
      let res = await ApiSercies.get_students(currentPage, 4);
      console.log(res)
        // setAlert('success', "data fetch successfuly")
      if(res.data){
        setResult(res.data.students)
        setTotalRecords(res.data.total)
      }
    } catch (error) {
      console.log(error)
      setAlert("error", "Something went wrong, try after sometime")
    }finally{
      setLoading(false)
    }
  } 

  const handleAddStudent = () => {
    setIsModalOpen(true)
  }

  const handleLogout = () => {  
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
    setAlert("success", "Logged out successfully!");
  }
  
   const handlePageChange = async (pageNo : any) => {
    setCurrentPage(pageNo);
  };

  // useEffect(() => {
  //   // read role from localStorage only on client
  //   if (typeof window !== 'undefined') {
  //     const r = localStorage.getItem('role')
  //     setRole(r)
  //   }
  // }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const r = localStorage.getItem('role')
    if(r === "Admin"){
      console.log("fetching students for admin")
    fetchStudents();
    }else{
      console.log("not admin, redirecting to home")
        router.push("/");
    }
  }
  }, [currentPage, role]);

   const currentUser = "Super Admin"

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logged in user */}
      <header className="border-b border-border bg-card">
        <div className='flex justify-between'>
<div className='flex justify-center items-center ml-8'>
     <div className="flex justify-end items-center gap-2">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{currentUser}</span>
          </div>
    
</div>
<div className="container mx-auto px-4 py-4">
          <div className="flex justify-end items-center gap-2">
           <Button size="md" onClick={handleAddStudent} className="gap-2 px-8">
            <Plus className="h-5 w-5" />
            Add Student
          </Button>
          <Button size="md" variant='secondary' onClick={handleLogout} className="gap-2 px-8">
            Logout
          </Button>
          </div>
        </div>
        </div>
        
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center items-start gap-8">
            {
                loading ? <p>Loading...</p> : result.length === 0 ? <p>No students found.</p> :
                result.map((student:any)=>(
                    <StudentCard 
                    key={student.studentId}
                    name={student.name}
                    email={student.email}
                    course={student.course}
                    enrollmentDate={student.enrlDate}
                    studentId={student.studentId}
                    onEdit={() => {
                      setEditingStudent(student);
                      setIsModalOpen(true);
                    }}
                    type= {"admin"}
                    fetchStudents={fetchStudents}
                    />))
            }
          
          
        </div>
        <div className='mt-10 flex justify-end'>
            <Pagination totalItems={totalRecords} currentPage={currentPage} limit={4} 
            setter={handlePageChange} />

           
        </div>
      </main>
      {
        isModalOpen && <AddStudentModal closeFunc={() =>{
             setIsModalOpen(false);
             setEditingStudent(null);
        }} fetchStudents={fetchStudents} editStudent={editingStudent} />
      }
    </div>
  )
}

export default Admin