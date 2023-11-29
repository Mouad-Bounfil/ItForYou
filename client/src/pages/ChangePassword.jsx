import React from 'react'

function ChangePassword() {
    return (

        <div className='flex flex-col items-center justify-center p-4 h-[500px]'> <div className="w-[600px]  bg-white p-8 border rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">New Password</h2>
            <p className="bg-green-100 text-green-700 text-sm p-4 rounded-lg">
                Please create a new password that you dont use on any other site.
            </p>
            <form>
                <label className="block mb-4">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Create new password</span>
                    <input type="password" className="form-input mt-1 block w-full px-3 py-2 border rounded-md" placeholder="Create new password" />
                </label>
                <label className="block mb-6">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Confirm your password</span>
                    <input type="password" className="form-input mt-1 block w-full px-3 py-2 border rounded-md" placeholder="Confirm your password" />
                </label>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Change
                </button>
            </form>
        </div></div>


    )
}

export default ChangePassword
