import { useState } from "react";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomeDialog from "src/app/components/common/dialog/CustomDialog";
import { useSelector } from "react-redux";
import ContentManagerTable from "src/app/components/tables/ContentManagerTable";
import ValueAddForm from "src/app/components/common/form/valueAddForm/valueAddForm";

export default function ContentManagerPage() {
  const [dilaogState, setDialogState] = useState(false);
  const { currunt_collectionName } = useSelector((state: any) => state.dynamic);

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="column" justifyContent="center" spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h4">{currunt_collectionName}</Typography>
            </Stack>
            <Box>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setDialogState(!dilaogState)}>
                Create new entry
              </Button>
            </Box>
          </Stack>
        </Stack>
        <ContentManagerTable />
      </Container>

      <CustomeDialog open={dilaogState} setOpen={() => setDialogState(!dilaogState)} title={`Add new${currunt_collectionName}field`}>
        <ValueAddForm />
      </CustomeDialog>
    </>
  );
}
