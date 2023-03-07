import React, { useEffect, useState } from "react";
import CustomTextField from "../../textfield/CustomTextField";
import { Button, Stack } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_COLLECTION } from "../../../../../GraphQl/Mutation";
import { FIND_COLLECTIONS } from "../../../../../GraphQl/Query";
import CustomLoader from "../../CustomLoader/CustomLoader";
import { useDispatch } from "react-redux";
import { setCollectionData } from "src/app/Redux/dynamicSlice";

interface IFormInit {
  collectionName: string;
}

interface ICollectionFormProps {
  setOpen: (val: boolean) => void;
}

const initialValues: IFormInit = {
  collectionName: "",
};

export default function CollectionForm({ setOpen: CloseDialog }: ICollectionFormProps) {
  const dispatch = useDispatch();
  const [createCollection, { loading, error: CollectionError, data }] = useMutation(CREATE_COLLECTION, {
    refetchQueries: [{ query: FIND_COLLECTIONS }],
  });

  const [value, setValue] = useState<IFormInit>(initialValues);
  const [error, setError] = useState<IFormInit>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: dataValue } = e.target;
    setValue({ ...value, [name]: dataValue });
  };

  const validate = () => {
    let temp: IFormInit = {
      collectionName: "",
    };
    temp.collectionName = value.collectionName === "" ? "Please Enter Collection Name" : "";

    setError({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const collectioNameAfterFilter = value.collectionName.split(" ").join("").toLowerCase();
        await createCollection({
          variables: {
            collectionName: collectioNameAfterFilter,
          },
        });
        dispatch(setCollectionData(data.createCollection));
        CloseDialog(false);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <CustomTextField
            name="collectionName"
            value={value.collectionName}
            onChange={handleChange}
            label="Collection Name"
            error={error.collectionName ? true : false}
            helperText={error.collectionName}
          />
          {loading ? (
            <CustomLoader />
          ) : (
            <Button sx={{ width: "50%" }} type="submit" variant="outlined" color="inherit">
              Add
            </Button>
          )}
        </Stack>
      </form>
    </>
  );
}
