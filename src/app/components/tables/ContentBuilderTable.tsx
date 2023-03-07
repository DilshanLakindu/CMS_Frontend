import { useRef, useState, useEffect, useMemo } from "react";
import { Box, Container, IconButton, Stack, Tooltip } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import CustomLoader from "../common/CustomLoader/CustomLoader";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toTitleCase } from "../../util/util";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography/Typography";
import ConfirmDialog from "../common/confirmDialog/confirmDialog";
import CustomeDialog from "../common/dialog/CustomDialog";
import ValueAddForm from "../common/form/valueAddForm/valueAddForm";
import ComponentForm from "../common/form/componentForm/ComponentForm";

function ContentBuilderTable() {
  const [rowData, setRowData] = useState([]);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  const [openUpdateDialog, setUpdateDialog] = useState(false);
  const [id, setId] = useState<number>();
  const [updateData, setUpdateData] = useState<any>();
  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Unique Name",
      },
      {
        accessorKey: "htmlInputType",
        header: "HTML Input Type",
      },
    ],
    []
  );
  const { currunt_collectionId, currunt_collectionName, builder_created } = useSelector((state: any) => state.dynamic);

  const FIND_COMPONENTS = gql`
  query FIND_COMPONENTS {
    findAll${toTitleCase(currunt_collectionName)}Components {
      id,
      name,
      htmlInputType
    }
  }
`;

  const { refetch, loading, error, data } = useQuery(FIND_COMPONENTS, {
    variables: { id: parseInt(currunt_collectionId) },
  });

  const DELETE_COMPONENT = gql`
  mutation DELETE_COMPONENT($id: Int!, $collectionName: String!) {
    remove${currunt_collectionName}Component(id:$id,collectionName:$collectionName){
    id
  }
  }
  `;

  const [DELETE_COMPONENT_ACTION, { loading: deleteLoading, error: DeleteError }] = useMutation(DELETE_COMPONENT, {
    refetchQueries: [{ query: FIND_COMPONENTS }],
  });

  const handleDeleteAction = async () => {
    console.log("id", id);
    await DELETE_COMPONENT_ACTION({ variables: { id: id, collectionName: currunt_collectionName } });
    setConfirmDialog(false);
  };

  useEffect(() => {
    refetch();
  }, [currunt_collectionName]);

  useEffect(() => {
    if (data) {
      setRowData(data[`findAll${currunt_collectionName}Components`]);
    }
  }, [data]);

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Box sx={{ mt: 10 }}> </Box>
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
                    setUpdateData(row?.original);
                    const original: any = row?.original;
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
                    const original: any = row?.original;
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
      <CustomeDialog open={openUpdateDialog} setOpen={() => setUpdateDialog(!openUpdateDialog)} title={`Update field`}>
        <ComponentForm isUpdate={true} updateData={updateData} updateId={id} />
      </CustomeDialog>
    </div>
  );
}

export default ContentBuilderTable;
