import { useState } from "react";
import { Box, List } from "@mui/material";
import DrawerLink, { TextSize } from "../DrawerLink/DrawerLink";
import CustomLoader from "src/app/components/common/CustomLoader/CustomLoader";
import CustomLink from "src/app/components/common/CustomLink/CustomLink";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_COLLECTIONS } from "src/GraphQl/Query";
import { DELETE_COLLECTION } from "src/GraphQl/Mutation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { store } from "src/app/Redux/store";
import { cleanUp, setCollectionData } from "src/app/Redux/dynamicSlice";
import { toTitleCase } from "src/app/util/util";
import { useNavigate } from "react-router-dom";
import CustomeDialog from "src/app/components/common/dialog/CustomDialog";
import CollectionForm from "src/app/components/common/form/collectionForm/CollectionForm";
import GrainIcon from "@mui/icons-material/Grain";
interface ICollection {
  id: string | number;
  collectionName: string;
}

export default function ContentTypeBuilder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data: collections, error: collectionErr } = useQuery(FIND_COLLECTIONS);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDilaog, setOpenDeleteDialog] = useState(false);
  const [deleteCollection, { loading: DeleteLoading, error: CollectionError, data }] = useMutation(DELETE_COLLECTION, {
    refetchQueries: [{ query: FIND_COLLECTIONS }],
  });

  const handleViewCollection = (id: string | number, name: string) => {
    dispatch(cleanUp({ id: "", collectionName: "" }));
    dispatch(setCollectionData({ id: id, collectionName: toTitleCase(name) }));
  };

  return (
    <>
      <List>
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            {collections?.FindAllCollection?.map((data: ICollection, index: number) => (
              <div key={data.id}>
                <DrawerLink label={data.collectionName} icon={<GrainIcon />} handleClick={() => handleViewCollection(data.id, data.collectionName)} />
              </div>
            ))}
            <CustomLink
              label={"Create new collection"}
              icon={<AddIcon />}
              btn={TextSize.small}
              textcolor="#000000"
              onClick={() => setOpenDialog(!openDialog)}
            />
          </>
        )}
      </List>

      <CustomeDialog open={openDialog} setOpen={setOpenDialog} title="Create a collection">
        <CollectionForm setOpen={setOpenDialog} />
      </CustomeDialog>
    </>
  );
}
