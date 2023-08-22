export const Avatar = () =>{
    return (
        <div className="avatar online dropdown">
        <div tabIndex={0} className="w-10 sm:w-12 rounded-xl">
            <img  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
        <ul tabIndex={0} className="dropdown-content z-50 right-0 top-10 menu p-2  shadow bg-base-100 rounded-box w-52">
            <li className="hover:bg-primary hover:rounded-xl transform duration-500"><a>Settings</a></li>
            <li className="hover:bg-primary hover:rounded-xl transform duration-500"><a>Profile</a></li>
        </ul>
        </div>
        
           
           
    )
}
