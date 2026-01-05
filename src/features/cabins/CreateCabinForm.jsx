import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ editCabin = {} }) {
  // Destructure editCabin to separate id from the rest of the data
  const { id: editCabinId, ...editCabinData } = editCabin;
  // Determine if we are in edit mode based on the presence of editCabinId
  const isEditMode = Boolean(editCabinId);

  // Initialize the form using react-hook-form
  const {
    register, // Register form fields
    handleSubmit, // Handle form submission
    reset, // Reset the form
    getValues, // Get current form values
    formState, // Form validation errors
  } = useForm({ defaultValues: isEditMode ? editCabinData : {} }); // Set default values for edit mode or empty for create mode

  // Extract errors from form state
  const { errors } = formState;

  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: (data) => {
      toast.success("Cabin created:", data);
      // Invalidate and refetch cabins query to reflect the new cabin
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // Reset the form after successful submission
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: editCabinMutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: (data) => {
      toast.success("Cabin successfully updated:", data);
      // Invalidate and refetch cabins query to reflect the new cabin
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(); // Reset the form after successful submission
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Determine if the form is currently working (creating or editing)
  const isWorking = isCreating || isEditing;

  // Handle form submission
  function onSubmit(data) {
    //console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditMode)
      editCabinMutate({
        newCabinData: { ...data, image: image },
        id: editCabinId,
      });
    else createCabinMutate({ ...data, image: image });
  }

  // Handle form submission errors
  function onError(errors) {
    //console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" errors={errors.name && errors.name.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        errors={errors.maxCapacity && errors.maxCapacity.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity must be at least 1" },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        errors={errors.regularPrice && errors.regularPrice.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Discount"
        errors={errors.discount && errors.discount.message}
      >
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            // Custom validation to ensure discount is less than regular price
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount cannot be greater than regular price",
          })}
          disabled={isWorking}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        errors={errors.description && errors.description.message}
      >
        <Textarea
          type="number"
          id="description"
          required="This field is required"
          {...register("description")}
          defaultValue=""
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Photo"
        disabled={isWorking}
        errors={errors.location && errors.location.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image")}
          required={isEditMode ? false : "This field is required"}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset" /* Reset button to clear the form */
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
