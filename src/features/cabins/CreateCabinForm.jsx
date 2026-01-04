import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

//This is the TEST

function CreateCabinForm() {
  // Initialize the form using react-hook-form
  const {
    register, // Register form fields
    handleSubmit, // Handle form submission
    reset, // Reset the form
    getValues, // Get current form values
    formState, // Form validation errors
  } = useForm();

  // Extract errors from form state
  const { errors } = formState;

  // Get the query client for invalidating queries
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
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

  // Handle form submission
  function onSubmit(data) {
    //console.log(data);
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          {...register("description")}
          defaultValue=""
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Photo"
        disabled={isCreating}
        errors={errors.location && errors.location.message}
      >
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset" /* Reset button to clear the form */
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
