import supabase from "./supabase";
import { supabaseUrl } from "../services/supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options to set additional user metadata during signup
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUserData({ fullName, password, avatar }) {
  // 1. Update full name OR password
  let updateData;
  if (password) {
    updateData = {
      password,
    };
  }
  if (fullName) {
    updateData = {
      data: { full_name: fullName },
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) {
    return data;
  }

  // 2. Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) {
    throw new Error(uploadError.message);
  }
  // 3. Update avatar in user metadata
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) {
    throw new Error(updateError.message);
  }
  return updatedUser;
}
