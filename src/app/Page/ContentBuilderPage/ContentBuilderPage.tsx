import { useState } from "react";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentBuilderTable from "../../components/tables/ContentBuilderTable";
import CustomeDialog from "src/app/components/common/dialog/CustomDialog";
import ComponentForm from "src/app/components/common/form/componentForm/ComponentForm";
import ConfirmDialog from "src/app/components/common/confirmDialog/confirmDialog";
import { FIND_COLLECTIONS } from "src/GraphQl/Query";
import { useMutation } from "@apollo/client";
import { DELETE_COLLECTION } from "src/GraphQl/Mutation";
import { useSelector } from "react-redux";
import { store } from "src/app/Redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
export default function ContentBuilderPage() {
  const [dilaogState, setDialogState] = useState(false);
  const { currunt_collectionName } = useSelector((state: any) => state.dynamic);
  const [openDeleteDilaog, setOpenDeleteDialog] = useState(false);
  const [deleteCollection, { loading: DeleteLoading, error: CollectionError, data }] = useMutation(DELETE_COLLECTION, {
    refetchQueries: [{ query: FIND_COLLECTIONS }],
  });

  const handleDeleteCollection = async () => {
    const id = store.getState().dynamic.currunt_collectionId;
    await deleteCollection({ variables: { id: id } });
    setOpenDeleteDialog(false);
    window.location.reload();
  };
  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="column" justifyContent="center" spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4">{currunt_collectionName} Builder</Typography>
              <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setOpenDeleteDialog(true)}>
                Drop Collection
              </Button>
            </Stack>
            <Box>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setDialogState(!dilaogState)}>
                Add another field
              </Button>
            </Box>
          </Stack>
          <Typography variant="caption">Build the data architecture of your content</Typography>
        </Stack>
        <ContentBuilderTable />
      </Container>

      <CustomeDialog open={dilaogState} setOpen={() => setDialogState(!dilaogState)} title="Create a new field">
        <ComponentForm />
      </CustomeDialog>
      <ConfirmDialog
        onConfirm={handleDeleteCollection}
        subTitle="This action cannot be undone"
        title="Are you sure you want to delete this collection?"
        open={openDeleteDilaog}
        isOpen={() => setOpenDeleteDialog((prev) => !prev)}
        loading={DeleteLoading}
      />
    </>
  );
}
