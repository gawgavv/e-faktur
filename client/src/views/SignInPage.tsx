export default function SignInPage() {
    return <>
    <div className="bg-slate-50 flex h-screen">
        <div className="bg-slate-50 w-2/3 m-5 flex justify-center items-center">
            <form  className="bg-white flex flex-col p-10 h-2/3 w-full shadow-2xl gap-y-7">
                <div className="flex justify-center font-extrabold text-3xl text-slate-700">
                    <h1>Sign-in to Dashboard</h1>
                </div>
                <div className="flex flex-col">
                    <input type="email" name="email" placeholder="Email address" className="border-2 border-slate-200 p-2 text-xl"/>
                </div>
                <div className="flex flex-col">
                    <input type="password" name="password" placeholder="Password" className="border-2 border-slate-200 p-2 text-xl"/>
                </div>

                <button type="submit" className="bg-violet-800 p-2 font-bold text-white hover:bg-violet-600">Sign-in</button>
            </form>
        </div>
        <div className="bg-violet-900 w-1/3 flex justify-center items-center">
            <h1 className="font-extrabold text-[56px] text-white">Admin Panel</h1>
        </div>
    </div>
    </>
}