"use client";

import classes from "./styles.module.css";
import ActionBar from "@/app/components/ActionBar";
import Link from "next/link";
import { getUserProfile, updateUserProfile } from "@/app/_db/srvactions/UserProfile";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

const UserProfile = {
  _id: null,
  email: null,
  family_name: null,
  given_name: null,
  picture: null,
  sub: null,
  birthdate: null,
  first_name: null,
  middle_name_initial: null,
  last_name_initial: null,
  county_name: null,
  join_date: null,
}

function FormInputLabel(props) {
  var label = props.label;
  var formItem = props.formItem;

  return (
    <label className={classes.label}>
      {label}
      {formItem}
    </label>
  );
}

export default function Profile() {
  const { user, error, isLoading } = useUser();

  const [formState, formAction] = useFormState(updateUserProfile, UserProfile);

  const [userInfo, setUserInfo] = useState(UserProfile);

  useEffect(() => {
    try {
      getUserProfile(user.sub.substring(6)).then((data) => {
        setUserInfo(data);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  if (!user) {
    redirect("/api/auth/login");
  }

  return (
    <main>
      <ActionBar title="Edit Profile" />
      <form className={classes.profileForm} action={formAction}>
        <FormInputLabel label="First Name"
          formItem = { <input className={classes.formInput}
            type="text"
            name="first_name"
            value={userInfo?.given_name || ""}
            onChange={handleChange}
            placeholder="First Name"/>
          }/>

        <FormInputLabel label="Middle Name Initial"
          formItem = { <input className={classes.formInput}
            type="text"
            name="middle_name_initial"
            value={userInfo?.middle_name_initial || ""}
            onChange={handleChange}
            placeholder="Middle Name"/>
          } />

        <FormInputLabel label="Last Name Initial"
          formItem = { <input className={classes.formInput}
            type="text"
            name="last_name_initial"
            value={userInfo?.last_name_initial || ""}
            onChange={handleChange}
            placeholder="Last Name"/>
          } />

        <FormInputLabel label="Birthdate"
          formItem = { <input className={classes.formInput}
            type="date"
            name="birthdate"
            value={userInfo ? new Date(userInfo.birthdate).toISOString().split('T')[0] : ""}
            onChange={handleChange}
            placeholder="Birthdate"/>
          } />

        <FormInputLabel label="County"
          formItem = { <input className={classes.formInput}
            type="text"
            name="county_name"
            value={userInfo?.county_name || ""}
            onChange={handleChange}
            placeholder="County"/>
          } />

        <FormInputLabel label="When I Joined 4-H"
          formItem = { <input className={classes.formInput}
            type="date"
            name="join_date"
            value={userInfo ? new Date(userInfo.join_date).toISOString().split('T')[0] : ""}
            onChange={handleChange}
            placeholder="Join Date"/>
          } />

        <div className={classes.btns}>
          <button type="submit" className={classes.submitBtn}>
            Update Profile
          </button>
          <Link href={{ pathname: "/dashboard/account/" }}>
            <button type="submit" className={classes.submitBtn}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}
