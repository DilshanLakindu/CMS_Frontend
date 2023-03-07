import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import ContentManagerPage from "./ContentManagerPage/ContentManagerPage";
import ContentBuilderPage from "./ContentBuilderPage/ContentBuilderPage";

export default function Home() {
  const { isContetntManager, isContentTypeBuilder } = useSelector((state: any) => state.mainDrawer);
  return <Container maxWidth="lg">{isContetntManager ? <ContentManagerPage /> : isContentTypeBuilder ? <ContentBuilderPage /> : null}</Container>;
}
