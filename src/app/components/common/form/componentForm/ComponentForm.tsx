import * as React from "react";
import { useEffect, useState } from "react";
import { Button, MenuItem, Stack, TextField, Box } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../CustomLoader/CustomLoader";
import { GET_ENUM } from "../../../../../GraphQl/Query";
import { toTitleCase } from "src/app/util/util";
import { setBuilderCreated } from "src/app/Redux/dynamicSlice";

enum DataType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  DATE = "DATE",
}
const initialInputState = {
  htmlInputType: "",
  name: "",
};

interface Props {
  isUpdate?: boolean;
  updateId?: number;
  updateData?: typeof initialInputState;
}
export default function ComponentForm({ isUpdate, updateId, updateData }: Props) {
  const { currunt_collectionId, currunt_collectionName } = useSelector((state: any) => state.dynamic);
  const [dataType, setDataType] = useState(DataType.STRING);
  const [value, setValue] = useState<any>(initialInputState);
  const [error, setError] = useState(initialInputState);
  const { loading: EnumLoading, data: EnumData, error: EnumError } = useQuery(GET_ENUM);
  const dispatch = useDispatch();
  const HTMLInputTypes = EnumData?.__type.enumValues.map((item: any) => item.name);

  const createComponentInput = gql`
  mutation createComponent($htmlInputType: HTMLInputType, $dataType: DataType, $name: String!, $collectionId: Int!) {
    create${currunt_collectionName}Component(create${currunt_collectionName}ComponentInput: { htmlInputType: $htmlInputType, dataType: $dataType, name: $name, collectionId: $collectionId }) {
      id
      htmlInputType
      name
    }
  }
`;

  const FIND_ALL_COMPONENTS = gql`
 query FIND_ALL_COMPONENTS {
   findAll${toTitleCase(currunt_collectionName)}Components {
     id,
     name,
   }
 }
`;

  const [create_aliment, { loading: submitLoading, error: mutationError, data: reduxData }] = useMutation(createComponentInput, {
    refetchQueries: [{ query: FIND_ALL_COMPONENTS }],
  });

  const addComponent = async () => {
    try {
      await create_aliment({
        variables: {
          htmlInputType: value.htmlInputType,
          dataType: dataType,
          name: value.name,
          collectionId: currunt_collectionId,
        },
      });
      dispatch(setBuilderCreated({ created: true, collectionName: currunt_collectionName }));
    } catch (e) {
      console.log(e);
    }
  };

  const UPDATE_COMPONENT = gql`
  mutation UPDATE_COMPONENT($collectionName:String!,$id: Int!, $htmlInputType: HTMLInputType, $dataType: DataType, $name: String!, $componentId: String!,$label:String!) {
    update${currunt_collectionName}Component(collectionName:$collectionName,update${currunt_collectionName}ComponentInput: { id: $id, htmlInputType: $htmlInputType, dataType: $dataType, name: $name, componentId: $componentId,label:$label }) {
      id
    }

  }
  `;

  const [updateComponent, { loading: updateLoading, error: updateError, data: updatedValue }] = useMutation(UPDATE_COMPONENT, {
    refetchQueries: [{ query: FIND_ALL_COMPONENTS }],
  });

  //update component method
  const updateComponentData = async () => {
    try {
      await updateComponent({
        variables: {
          collectionName: currunt_collectionName.toLowerCase(),
          id: updateId,
          htmlInputType: value.htmlInputType,
          dataType: dataType,
          name: value.name,
          componentId: value.name,
          label: value.name,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  //handle select changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: data } = e.target;

    if (name === "htmlInputType") {
      switch (data) {
        case "DATE":
          console.log("date", data);
          setDataType(DataType.DATE);
          break;
        case "NUMBER":
          console.log("number", data);
          setDataType(DataType.NUMBER);
          break;
        case "CHECKBOX":
          console.log("checkbox", data);
          setDataType(DataType.BOOLEAN);
          break;
        default:
          console.log("text", data);
          setDataType(DataType.STRING);
      }
    }
    setValue({ ...value, [name]: data });
  };

  const validate = () => {
    let temp: any = {
      htmlInputType: "",
      name: "",
    };
    temp.htmlInputType = value.htmlInputType === "" ? "Please Select Input Type Name" : "";
    temp.name = value.name === "" ? "Please Add Unique Name" : "";
    setError({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      if (isUpdate) {
        updateComponentData();
      } else {
        addComponent();
      }
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setValue({
        htmlInputType: updateData?.htmlInputType.toUpperCase(),
        name: updateData?.name,
      });
    }
  }, [isUpdate]);
  return (
    <>
      {EnumLoading ? (
        <CustomLoader />
      ) : (
        <>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <TextField
                id="outlined-select-currency"
                select
                name="htmlInputType"
                label="Select"
                helperText={error.htmlInputType ? error.htmlInputType : "Please select what type of input you want"}
                fullWidth
                error={error.htmlInputType !== "" ? true : false}
                value={value.htmlInputType}
                onChange={handleChange}
              >
                {HTMLInputTypes?.map((type: any, index: any) => (
                  <MenuItem key={`${type + index}`} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={error.name !== "" ? true : false}
                helperText={error.name}
                name="name"
                fullWidth
                id="outlined-basic"
                label="Enter Attribute Name"
                variant="outlined"
                value={value.name}
                onChange={handleChange}
              />
              {submitLoading || updateLoading ? (
                <CustomLoader />
              ) : (
                <Button variant="outlined" color="inherit" type="submit">
                  {isUpdate ? "Update Filed" : "Add Filed"}
                </Button>
              )}
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
