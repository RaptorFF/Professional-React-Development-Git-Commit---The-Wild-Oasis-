import supabase, { supabaseUrl } from "./supabase";

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
  const imageName = `˘${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //https://tppgusakbpaaclxsoiew.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  // 1) Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  // 2) Upload image to storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3) Delete cabin if there was an error uploading the image
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(
      "Image could not be uploaded and the cabin was not created."
    );
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
