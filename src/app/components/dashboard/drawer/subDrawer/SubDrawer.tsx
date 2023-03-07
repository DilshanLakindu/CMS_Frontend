import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DrawerLink, { TextSize } from "../DrawerLink/DrawerLink";
import SegmentIcon from "@mui/icons-material/Segment";
import { Button, IconButton, useTheme, Avatar } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_COLLECTIONS } from "../../../../../GraphQl/Query";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomeDialog from "../../../common/dialog/CustomDialog";
import CollectionForm from "../../../common/form/collectionForm/CollectionForm";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setCollectionData, cleanUp } from "../../../../Redux/dynamicSlice";
import { toTitleCase } from "../../../../util/util";
import ComponentForm from "../../../common/form/componentForm/ComponentForm";
import ConfirmDialog from "../../../common/confirmDialog/confirmDialog";
import { DELETE_COLLECTION } from "../../../../../GraphQl/Mutation";
import { store } from "../../../../Redux/store";
import CustomLink from "src/app/components/common/CustomLink/CustomLink";
import ContentTypeBuilder from "./ContentTypeBuilder";
import ContentManager from "./ContentManager";
import { logOut } from "../../../../Redux/authSlice";
import { capitalCase } from "change-case";
const drawerWidth = 240;

interface ICollection {
  id: string | number;
  collectionName: string;
}

export default function SubDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dilaogState } = useSelector((state: any) => state.dynamic);
  const { drawerState, isContetntManager, isContentTypeBuilder } = useSelector((state: any) => state.mainDrawer);
  const { userName, access_token, userRole } = useSelector((state: any) => state.auth);
  const { loading, data: collections, error: collectionErr } = useQuery(FIND_COLLECTIONS);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDilaog, setOpenDeleteDialog] = useState(false);
  const [deleteCollection, { loading: DeleteLoading, error: CollectionError, data }] = useMutation(DELETE_COLLECTION, {
    refetchQueries: [{ query: FIND_COLLECTIONS }],
  });

  const handleViewCollection = (id: string | number, name: string) => {
    dispatch(cleanUp({ id: "", collectionName: "" }));
    dispatch(setCollectionData({ id: id, collectionName: toTitleCase(name) }));
    navigate("/");
  };

  const handleConfirmDialog = (id: string | number, name: string) => {
    setOpenDeleteDialog(true);
    dispatch(setCollectionData({ id: id, collectionName: toTitleCase(name) }));
  };

  const handleSubDrawer = () => {
    if (userRole === "user") {
      return <ContentManager />;
    }

    return isContentTypeBuilder ? <ContentTypeBuilder /> : isContetntManager ? <ContentManager /> : null;
  };

  const handleDeleteCollection = async () => {
    const id = store.getState().dynamic.currunt_collectionId;
    await deleteCollection({ variables: { id: id } });
    setOpenDeleteDialog(false);
    window.location.reload();
  };
  return (
    <>
      <AppBar sx={{ p: 0 }} position="fixed" elevation={0}>
        <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
          <Typography>{capitalCase(userRole)}</Typography>

          <Button color="inherit" onClick={() => dispatch(logOut(true))}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginLeft: drawerWidth,
          ["& .MuiDrawer-paper"]: {
            width: userRole === "user" ? drawerWidth : `calc(100% - 100)`,
            // width: drawerWidth,
            left: userRole === "user" ? "0px" : drawerState ? `220px` : "60px",
            boxSizing: "border-box",
            transition: theme.transitions.create("left", {
              easing: drawerState ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
              duration: drawerState ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
            }),
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        >
          <Typography align="left" variant="h6" noWrap component="div">
            {userRole === "user" ? "Content Manager" : isContetntManager ? "Content Manager" : isContentTypeBuilder ? "Content Type Builder" : null}
          </Typography>
        </Box>

        <Divider />

        {handleSubDrawer()}
      </Drawer>

      <Box component="main" sx={{ marginLeft: 30, p: 5 }}>
        <Box sx={{ ...theme.mixins.toolbar }}></Box>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      <CustomeDialog open={openDialog} setOpen={setOpenDialog} title="Create a collection">
        <CollectionForm setOpen={setOpenDialog} />
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
