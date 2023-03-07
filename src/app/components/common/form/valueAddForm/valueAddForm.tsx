import { gql, useMutation, useQuery } from "@apollo/client";
import { TextField, Button, Checkbox, FormGroup, } from "@mui/material";
import { Container, Box, Stack } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../CustomLoader/CustomLoader";
import { pascalCase } from "change-case";
import { setValueCreated } from "src/app/Redux/dynamicSlice";
import { toTitleCase } from "src/app/util/util";

interface Props {
  isUpdate?: boolean;
  updateId?: number;
  updateData?: any;
}

function ValueAddForm({ isUpdate, updateId, updateData }: Props) {
  const { currunt_collectionName } = useSelector((state: any) => state.dynamic);

  const disptach = useDispatch();
  const findAllComponents = gql`
  query findAllComponents{
    findAll${currunt_collectionName}Components{
      id
      htmlInputType
      name
      label
      dataType
    }
  }
`;

  const { refetch, loading, error: findError, data } = useQuery(findAllComponents);
  const [showTextField, setShowTextField] = useState(false);

  useEffect(() => {
    refetch();
  }, [currunt_collectionName]);
  const makeinitObject = () => {
    const obj: any = {};
    data?.findAllComponentsByCollectionId?.map((item: any) => {
      obj[item.name] = "";
    });

    return obj;

  };


  const [value, setValue] = useState<any>(updateData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: data } = e.target;
    setValue({ ...value, [inputName]: data });
  };

  // add value dynamic mutation
  const ADD_VALUE = gql`
      mutation createValue($Input: ${pascalCase(currunt_collectionName)}Input!) {
        create${pascalCase(currunt_collectionName)}(${pascalCase(currunt_collectionName)}Input: $Input) {
          id
        }
      }
  `;

  const FIND_COLLECTIONS_VALUES = gql`
query FIND_COLLECTIONS_VALUES {
  findAll${toTitleCase(currunt_collectionName)} {
    id,
    ${data?.[`findAll${currunt_collectionName}Components`]?.map((item: any) => item.name).join(",")}
  }
}
`;

  const [addValue, { loading: addLoading, error: addError, data: reduxData }] = useMutation(ADD_VALUE, {
    refetchQueries: [{ query: FIND_COLLECTIONS_VALUES }],
  });

  const UPDATE_VALUE = gql`
  mutation updateValue($Input: Update${pascalCase(currunt_collectionName)}Input!) {
    update${pascalCase(currunt_collectionName)}(update${pascalCase(currunt_collectionName)}Input: $Input) {
      id
    }
  }
  `;
  const [updateValue, { loading: updateLoading, error: updateError, data: updatedData }] = useMutation(UPDATE_VALUE, {
    refetchQueries: [{ query: FIND_COLLECTIONS_VALUES }],
  });

  useEffect(() => {
    if (!isUpdate) {
      setValue(makeinitObject());
    }
  }, [data]);

  useEffect(() => {
    if (isUpdate) {
      setValue(updateData);
    }
  }, [isUpdate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdate) {
      await updateValue({
        variables: {
          Input: { id: updateId, ...value },
        },
      });
    } else {
      await addValue({
        variables: {
          Input: value,
        },
      });
    }

    disptach(setValueCreated({ valueCreated: true, collectionName: currunt_collectionName }));
  };

  const handleHtmpInputType = (obj: any) => {
    if (data) {
      switch (obj.htmlInputType) {
        case "number":
          return <TextField type={obj?.dataType} fullWidth key={obj?.id} name={obj?.name} label={obj?.label} value={value?.name} onChange={handleChange} />;
        case "email":
          return <TextField type={obj?.dataType} fullWidth key={obj?.id} name={obj?.name} label={obj?.label} value={value?.name} onChange={handleChange} />;
        case "password":
          return <TextField type={obj?.dataType} fullWidth key={obj?.id} name={obj?.name} label={obj?.label} value={value?.name} onChange={handleChange} />;
        case "textarea":
          return <TextField type={obj?.dataType} fullWidth key={obj?.id} name={obj?.name} label={obj?.label} value={value?.name} onChange={handleChange} />;
        case "time":
          return (
            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type={obj?.dataType}
              fullWidth
              key={obj?.id}
              name={obj?.name}
              label={obj?.label}
              value={value?.name}
              onChange={handleChange}
            />
          );
        case "date":
          return (
            <TextField
              InputLabelProps={{ shrink: true, required: true }}
              type={obj?.dataType}
              fullWidth
              key={obj?.id}
              name={obj?.name}
              label={obj?.label}
              value={value?.name}
              onChange={handleChange}
            />
          );
        case "checkbox": return (<Checkbox name={obj?.name} value={value?.[obj?.name]} />);
        default:
          return <TextField fullWidth key={obj?.id} name={obj?.name} label={obj?.label} value={value?.[obj?.name]} onChange={handleChange} />;
      }
    }
  };

  if (loading) return <CustomLoader />;

  return (
    <Stack direction="row" justifyContent="center" alignItems="start" spacing={2}>
      <Container maxWidth="md">
        <Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"} spacing={3}>
              {data && data[`findAll${currunt_collectionName}Components`]?.map((obj: any) => handleHtmpInputType(obj))}
              {addLoading ? (
                <CustomLoader />
              ) : (
                <Button type="submit" color="inherit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
                  {isUpdate ? "Update" : "Submit"}
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Stack>
  );
}
export default ValueAddForm;
