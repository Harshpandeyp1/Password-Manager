import React, { useEffect, useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes("eye.png")) {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    let newPasswords;

    if (editIndex !== null) {
      newPasswords = [...passwordArray];
      newPasswords[editIndex] = form;
      setEditIndex(null);
    } else {
      newPasswords = [...passwordArray, form];
    }

    setpasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = (index) => {
    const newPasswords = passwordArray.filter((_, i) => i !== index);
    setpasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));
  };

  const editPassword = (index) => {
    setform(passwordArray[index]);
    setEditIndex(index);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 -z-10 
        [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
      ></div>

      <h1 className="text-4xl font-bold text-center py-2 border border-white">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
      </h1>

      <p className="text-green-900 text-center py-2 border border-white text-lg font-semibold">
        Your own Password Manager
      </p>

      <div className="flex flex-col p-4 text-black gap-8 max-w-2xl mx-auto items-center">
        <input
          name="site"
          value={form.site}
          onChange={handleChange}
          placeholder="Enter Website Url"
          className="rounded-full border border-green-500 w-full py-2 px-4"
        />

        <div className="flex w-full gap-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="rounded-full border border-green-500 w-full py-2 px-4"
          />

          <div className="relative w-full">
            <input
              ref={passwordRef}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-full border border-green-500 w-full py-2 px-4"
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={showPassword}
            >
              <img
                ref={ref}
                width={26}
                src="icons/eye.png"
                alt="Show Password"
                className="p-1"
              />
            </span>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="font-serif flex items-center py-2 border border-white gap-2 rounded-full bg-green-500 hover:bg-green-300 px-4 border-green-900"
        >
          <lord-icon
            src="https://cdn.lordicon.com/tsrgicte.json"
            trigger="hover"
            style={{ width: "28px", height: "28px" }}
          ></lord-icon>
          {editIndex !== null ? "Update Password" : "Add Password"}
        </button>
      </div>

      <div>
        <div className="passwords text-center font-serif pt-2.5">
          <h1 className="text-2xl">Your Passwords</h1>
        </div>

        {passwordArray.length === 0 && (
          <div className="text-center font-bold py-4">
            No password to show
          </div>
        )}

        {passwordArray.length !== 0 && (
          <table className="table-auto rounded-md overflow-hidden max-w-4xl w-full mx-auto">
            <thead className="bg-green-700 text-white">
              <tr>
                <th>Site</th>
                <th>User-Name</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="bg-purple-100">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td
                    className="text-center py-2 border border-white cursor-pointer"
                    onClick={() => copyText(item.site)}
                  >
                    <a href={item.site} target="_blank" rel="noreferrer">
                      {item.site}
                    </a>
                    <lord-icon
                      src="https://cdn.lordicon.com/cfkiwvcc.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </td>

                  <td
                    className="text-center py-2 border border-white cursor-pointer"
                    onClick={() => copyText(item.username)}
                  >
                    {item.username}
                    <lord-icon
                      src="https://cdn.lordicon.com/cfkiwvcc.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </td>

                  <td
                    className="text-center py-2 border border-white cursor-pointer"
                    onClick={() => copyText(item.password)}
                  >
                    {item.password}
                    <lord-icon
                      src="https://cdn.lordicon.com/cfkiwvcc.json"
                      trigger="hover"
                      style={{ width: "25px", height: "25px" }}
                    ></lord-icon>
                  </td>

                  <td className="text-center py-2 border border-white flex justify-center gap-3">
                    {/* EDIT */}
                    <span
                      onClick={() => editPassword(index)}
                      className="cursor-pointer"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover"
                        style={{ width: "28px", height: "28px" }}
                      ></lord-icon>
                    </span>

                    {/* DELETE */}
                    <span
                      onClick={() => deletePassword(index)}
                      className="cursor-pointer"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/jzinekkv.json"
                        trigger="hover"
                        style={{ width: "28px", height: "28px" }}
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
