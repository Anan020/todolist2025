import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';




import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import { db } from '../utils/firebase'




const Todolist = () => {
  const [form, setForm] = useState({})
  const [data, setData] = useState([])
  const [update, setUpdate] = useState(null)

  const nuchinRef = collection(db, 'user')


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    // handleGet()
    const unsubscribe = loadRialtime()
    return () => {
      unsubscribe()
    }
    handleEdit(item)
  }, [])


  const handleAdd = async () => {
    await addDoc(nuchinRef, form)
      .then((res) => {
        console.log(res)
        // handleGet()
         toast.success('ເພີ່ມສຳເລັດ')
      })
      .catch(err => console.log(err))
  }

  const loadRialtime = () => {
    const unsubscribe = onSnapshot(nuchinRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => (
        {
          id: doc.id,
          ...doc.data()
        }
      ))
      // console.log(newData)
      setData(newData)
    })
    return () => {
      unsubscribe()
    };
  }

  // const handleGet = async () => {
  //   await getDocs(nuchinRef)
  //     .then((query) => {
  //       const newData = query.docs.map((doc) => (
  //         {
  //           id: doc.id,
  //           ...doc.data()
  //         }
  //       ))
  //       console.log(newData)
  //       setData(newData)
  //     })
  //     .catch(err => console.log(err))
  // }

  const handleDelete = async (id) => {
    // console.log(id)
    await deleteDoc(doc(nuchinRef, id))
      .then((res) => {
        console.log(res)
        toast.success('Delete successful!')
        // handleGet()
      })
      .catch(err => err)
  }

  const handleEdit = (item) => {
    setUpdate(item.id)
    setForm(item)
  }

  const handleSave = async (update) => {
    // console.log(update)
    try {
      await updateDoc(doc(nuchinRef, update), form)
      setUpdate(null)
      setForm('')
      toast.success("ອັບເດດສຳເລັດ")
    }
    catch (err) {
      console.log(err)
    }
  }



  // console.log(update)
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* ฟอร์ม (แคบและอยู่ซ้าย) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ເພີ່ມຂໍ້ມູນ</h2>
            <div className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="ຊື່ຂອງທ່ານ"
                value={form.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="lastname"
                type="text"
                placeholder="ນາມສະກຸນຂອງທ່ານ"
                value={form.lastname || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="age"
                type="number"
                placeholder="ອາຍຸຂອງທ່ານ"
                value={form.age || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {
                update ? (
                  <button
                    onClick={() => handleSave(update)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                  > ອັບເດດ
                  </button>
                ) : (
                  <button
                    onClick={handleAdd}
                    className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                  > ເພີ່ມ
                  </button>
                )
              }
            </div>
          </div>
        </div>

        {/* ตาราง (กว้างกว่า และอยู่ขวา) */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-2xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 font-medium text-gray-500"> ຊື່</th>
                  <th className="p-4 font-medium text-gray-500">ນາມສະກຸນ</th>
                  <th className="p-4 font-medium text-gray-500">ອາຍຸ</th>
                  <th className="flex items-center justify-center p-4 font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {
                  data?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-4">{index + 1}.{item.name}</td>
                      <td className="p-4">{item.lastname}</td>
                      <td className="p-4">{item.age}</td>
                      <td className="flex items-center justify-center gap-2 p-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <SquarePen size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todolist
