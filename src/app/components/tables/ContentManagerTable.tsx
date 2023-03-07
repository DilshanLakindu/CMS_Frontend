import { useRef, useState, useEffect } from "react";
import { Box, Container, IconButton, Stack, Tooltip } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import CustomLoader from "../common/CustomLoader/CustomLoader";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toTitleCase } from "../../util/util";
import Typography from "@mui/material/Typography/Typography";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../common/confirmDialog/confirmDialog";
import CustomeDialog from "../common/dialog/CustomDialog";
import ValueAddForm from "../common/form/valueAddForm/valueAddForm";

function ContentManagerTable() {
  const { currunt_collectionName } = useSelector((state: any) => state.dynamic);
  const [rowData, setRowData] = useState([]);
  const [columns, setColums] = useState<any>([]);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [updateData, setUpdateData] = useState<any>();
  const [id, setId] = useState<number>();
  const FIND_ALL_COMPONENTS = gql`
  query FIND_ALL_COMPONENTS {
    findAll${toTitleCase(currunt_collectionName)}Components {
      id,
      name,
    }
  }
`;
  const { refetch: refetchcolums, loading: loadColums, error, data: colums } = useQuery(FIND_ALL_COMPONENTS);

  const FIND_COLLECTIONS_VALUES = gql`
    query FIND_COLLECTIONS_VALUES {
      findAll${toTitleCase(currunt_collectionName)} {
        id,
        ${colums?.[`findAll${currunt_collectionName}Components`]?.map((item: any) => item.name).join(",")}
      }
    }
  `;

  const { refetch, loading, error: columError, data } = useQuery(FIND_COLLECTIONS_VALUES);

  const DELETE_COMPONENT = gql`
  mutation DELETE_COMPONENT($id: Int!) {
    remove${currunt_collectionName}(id:$id){
    id
  }
  }
  `;

  const [DELETE_COMPONENT_ACTION, { loading: deleteLoading, error: DeleteError }] = useMutation(DELETE_COMPONENT, {
    refetchQueries: [{ query: FIND_COLLECTIONS_VALUES }],
  });

  const handleDeleteAction = async () => {
    console.log("id", id);
    await DELETE_COMPONENT_ACTION({ variables: { id: id } });
    setConfirmDialog(false);
  };

  useEffect(() => {
    setRowData([]);
    setColums([]);
    refetchcolums();
    refetch();
  }, [currunt_collectionName]);

  const NoShowDataAssest = () => {
    return (
      <Stack sx={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4" sx={{ color: "#BDBDBD" }}>
          No Data Found
        </Typography>
      </Stack>
    );
  };

  const getDynamicColumns = (obj: any) => {
    return Object.keys(obj).map((key) => ({ accessorKey: key, header: toTitleCase(key) }));
  };

  useEffect(() => {
    if (data && data[`findAll${currunt_collectionName}`]?.length > 0) {
      console.log(data);
      const { __typename, id, ...keys } = data[`findAll${currunt_collectionName}`][0];
      console.log("keys", keys);
      setColums(getDynamicColumns(keys));
      setRowData(data[`findAll${currunt_collectionName}`]);
    }
  }, [data]);

  if (loadColums)
    return (
      <div
        style={{
          margin: "auto",
          display: "flex",
          width: "80vw",
          height: "80vh",
          justifyContent: "center",
        }}
      >
        <CustomLoader />
      </div>
    );

  return (
    <div className="App">
      <Container maxWidth="xl" sx={{ width: "1000px", height: "400px" }}>
        <Box sx={{ mt: 10 }}></Box>
        <MaterialReactTable
          columns={columns}
          data={rowData}
          enableColumnFilters={false}
          enableSorting={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          positionActionsColumn="last"
          enableRowActions={true}
          enableRowNumbers={true}
          state={{ isLoading: loading }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  onClick={() => {
                    setUpdateDialog(true);
                    console.log("row", row);
                    const original: any = row?.original;
                    setUpdateData(row?.original);
                    console.log("original", original.id);
                    setId(original.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton
                  color="error"
                  onClick={() => {
                    setConfirmDialog(true);
                    console.log("row", row);
                    const original: any = row?.original;
                    console.log("original", original.id);
                    setId(original.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </Container>
      <ConfirmDialog
        open={openConfirmDialog}
        title="Delete"
        isOpen={() => setConfirmDialog(false)}
        subTitle="Are you sure you want to delete this item?"
        loading={deleteLoading}
        onConfirm={handleDeleteAction}
      />
      <CustomeDialog open={openUpdateDialog} setOpen={() => setUpdateDialog(!openUpdateDialog)} title="Update field">
        <ValueAddForm isUpdate={true} updateData={updateData} updateId={id} />
      </CustomeDialog>
    </div>
  );
}

export default ContentManagerTable;
