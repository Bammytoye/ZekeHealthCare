import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [role, setRole] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()


        try {
            if (role === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/admin/login`, {
                    email,
                    password
                })

                if (data.token) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success('Admin login successful');
                } else {
                    toast.error(data.message || 'Login failed. Check your credentials');
                }
            } else  {
                const { data } = await axios.post(`${backendUrl}/doctors/login`, {
                    email,
                    password
                })

                if (data.token) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    toast.success('Doctor login successful');
                    console.log(data.token)
                } else {
                    toast.error(data.message || 'Login failed. Check your credentials');
                }
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed. Check credentials';
            toast.error(msg);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-[80vh] flex items-center bg-gray-50"
        >
            <div className="flex flex-col gap-4 m-auto items-center p-10 min-w-[340px] sm:min-w-96 bg-white border border-gray-200 rounded-2xl shadow-xl">

                <p className="text-2xl font-semibold text-gray-800">
                    <span className="text-primary">{role}</span> Login
                </p>

                <p className="text-sm text-gray-500 -mt-2">
                    Welcome back, please sign in
                </p>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white w-full py-2.5 rounded-lg font-medium hover:bg-secondary transition-all duration-200"
                >
                    Login
                </button>

                {/* Role switcher */}
                {role === 'Admin' ? (
                    <p className="text-sm mt-2">
                        Doctor Login{' '}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => setRole('Doctor')}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p className="text-sm mt-2">
                        Admin Login{' '}
                        <span
                            className="text-primary cursor-pointer underline"
                            onClick={() => setRole('Admin')}
                        >
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    )
}

export default Login
