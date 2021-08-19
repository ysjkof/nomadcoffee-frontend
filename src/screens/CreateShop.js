import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String # $file: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category # file: $file
    ) {
      ok
      error
    }
  }
`;

function CreateShop() {
  const history = useHistory();
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Shop created.",
    });
  };
  const [createCoffeeShop, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createCoffeeShop({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>Registration your Coffee Shop.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("name", {
              required: "Name is required.",
            })}
            type="text"
            placeholder="Shop Name"
          />
          <Input
            {...register("latitude", {
              required: "latitude is required.",
            })}
            type="text"
            placeholder="latitude"
          />
          <Input
            {...register("longitude", {
              required: "longitude is required.",
            })}
            type="text"
            placeholder="longitude"
          />
          <Input
            {...register("category", {})}
            type="text"
            placeholder="category"
          />
          {/* <Input {...register("file", {})} type="file" placeholder="file" /> */}
          <Button
            type="submit"
            value={loading ? "Loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default CreateShop;
