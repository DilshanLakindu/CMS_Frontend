import { List } from "@mui/material";
import { TextSize } from "../DrawerLink/DrawerLink";
import CustomLoader from "src/app/components/common/CustomLoader/CustomLoader";
import CustomLink from "src/app/components/common/CustomLink/CustomLink";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { FIND_COLLECTIONS } from "src/GraphQl/Query";
import { cleanUp, setCollectionData } from "src/app/Redux/dynamicSlice";
import { toTitleCase } from "src/app/util/util";
import { useNavigate } from "react-router-dom";
import GrainIcon from "@mui/icons-material/Grain";
interface ICollection {
  id: string | number;
  collectionName: string;
}

export default function ContentManager() {
  const dispatch = useDispatch();
  const { loading, data: collections, error: collectionErr } = useQuery(FIND_COLLECTIONS);
  const handleViewCollection = (id: string | number, name: string) => {
    dispatch(cleanUp({ id: "", collectionName: "" }));
    dispatch(setCollectionData({ id: id, collectionName: toTitleCase(name) }));
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
        }}
      >
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            {collections?.FindAllCollection?.map((data: ICollection, index: number) => (
              <div key={data.id} style={{ display: "flex", alignItems: "center" }}>
                <CustomLink
                  icon={<GrainIcon />}
                  label={data.collectionName}
                  btn={TextSize.medium}
                  textcolor="#808080"
                  onClick={() => handleViewCollection(data.id, data.collectionName)}
                />
              </div>
            ))}
          </>
        )}
      </List>
    </>
  );
}
