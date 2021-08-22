import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import Button from "../components/auth/Button";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import FormError from "../components/auth/FormError";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String
    $file: Uplaod
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
      file: $file
    ) {
      ok
      error
    }
  }
`;

function AddShop() {
  const { register, handleSubmit, setError, formState } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
  };
  const [createCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION,
    { onCompleted }
  );
  const onValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShopMutation({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("name", {
              required: "Shop name is required",
            })}
            type="text"
            placeholder="Shop Name"
          />
          <FormError message={formState.errors?.name?.message} />
          <Input
            {...register("latitude", {
              required: "Latitude is required",
            })}
            type="text"
            placeholder="Latitude"
          />
          <FormError message={formState.errors?.latitude?.message} />
          <Input
            {...register("longitude", {
              required: "Longitude is required",
            })}
            type="text"
            placeholder="Longitude"
          />
          <FormError message={formState.errors?.longitude?.message} />

          <Input {...register("category")} type="text" placeholder="Category" />
          <FormError message={formState.errors?.category?.message} />

          <Input {...register("file")} type="file" />
          <FormError message={formState.errors?.file?.message} />

          <Button
            type="submit"
            value={loading ? "loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState.errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

AddShop.propTypes = {
  name: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  category: PropTypes.string,
  file: PropTypes.string,
};

export default AddShop;
