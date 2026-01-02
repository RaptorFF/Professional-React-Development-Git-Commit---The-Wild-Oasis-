import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

// Function to create a new cabin in the database using Supabase;
// accepts a newCabin object as input and returns the created cabin data;
// newCabin object should contain necessary fields like name, maxCapacity, regularPrice,
// discount, description, image, etc. same as defined in the database schema in supabase.
export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }
  return data;
}

export async function deleteRow(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}
