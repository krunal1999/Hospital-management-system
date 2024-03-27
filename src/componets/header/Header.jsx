import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// import { AuthContext } from "./../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/finddoctors",
    display: "Find a Doctor",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  //   const { user, token, role } = useContext(AuthContext);

  const authState = useSelector((state) => state.auth);
  const { user, status } = authState;
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user === null) {
      setRole("");
    } else {
      setRole(user.role);
    }
  }, [user]);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =========== logo ========== */}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/* ========== nav menu =========== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-[#0067FF] font-[600] text-[16px] leading-7"
                        : "text-textColor font-[500] text-[16px] leading-7"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ========= nav right ========== */}
          <div className="flex items-center gap-4">
            {user !== null && status && role ? (
              <div>
                <Link
                  to={`${
                    role === "doctor" ? "/doctor/profile" : "/patient/profile"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer ">
                    {role === "doctor" ? (
                      <img
                        className="w-full rounded-full"
                        src={
                          user?.loggedUser.photo
                            ? user?.loggedUser.photo
                            : "https://png.pngtree.com/png-clipart/20220911/original/pngtree-male-doctor-avatar-icon-illustration-png-image_8537702.png"
                        }
                        alt="Profile Photo"
                      />
                    ) : (
                      <img
                        className="w-full rounded-full"
                        src={
                          user?.loggedUser.photo
                            ? user?.loggedUser.photo
                            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                        }
                        alt="Profile Photo"
                      />
                    )}
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-white font-[600] h-[44px] flex items-center justify-center">
                  Log In
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
